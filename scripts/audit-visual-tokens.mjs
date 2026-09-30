import { readFile } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const contract = JSON.parse(
  await readFile(path.join(root, "contracts", "theme.contract.json"), "utf8"),
)
const tokenSource = await readFile(path.join(root, "src", "style", "themes", "default.css"), "utf8")

function declarationsFor(selector) {
  const match = [...tokenSource.matchAll(/([^{}]+)\{([^{}]*)\}/g)].find(([_, selectors]) =>
    selectors.split(",").some((item) => item.trim() === selector),
  )
  return Object.fromEntries(
    [...(match?.[2] ?? "").matchAll(/(--[a-z0-9-]+)\s*:\s*([^;]+);/g)].map((item) => [
      item[1],
      item[2].trim(),
    ]),
  )
}

const tokens = declarationsFor(":root")

function resolveToken(name, seen = new Set()) {
  if (seen.has(name)) throw new Error(`Circular token reference: ${name}`)
  seen.add(name)
  const value = tokens[name]
  if (!value) throw new Error(`Missing token: ${name}`)
  const reference = value.match(/^var\((--[a-z0-9-]+)\)$/)?.[1]
  return reference ? resolveToken(reference, seen) : value
}

function oklchToLinearSrgb(lightness, chroma, hue) {
  const radians = (hue * Math.PI) / 180
  const a = chroma * Math.cos(radians)
  const b = chroma * Math.sin(radians)
  const l = (lightness + 0.3963377774 * a + 0.2158037573 * b) ** 3
  const m = (lightness - 0.1055613458 * a - 0.0638541728 * b) ** 3
  const s = (lightness - 0.0894841775 * a - 1.291485548 * b) ** 3
  return [
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
  ].map((value) => Math.min(Math.max(value, 0), 1))
}

function luminance(color) {
  const hex = color.match(/^#([0-9a-f]{6})$/i)
  if (hex) {
    const linear = [0, 2, 4].map((offset) => {
      const value = Number.parseInt(hex[1].slice(offset, offset + 2), 16) / 255
      return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4
    })
    return 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2]
  }
  const oklch = color.match(/^oklch\(([\d.]+)(%)?\s+([\d.]+)\s+([\d.]+)\)$/)
  if (oklch) {
    const lightness = oklch[2] ? Number(oklch[1]) / 100 : Number(oklch[1])
    const linear = oklchToLinearSrgb(lightness, Number(oklch[3]), Number(oklch[4]))
    return 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2]
  }
  throw new Error(`Unsupported contrast color: ${color}`)
}

function contrast(foreground, background) {
  const values = [luminance(foreground), luminance(background)].sort((a, b) => b - a)
  return (values[0] + 0.05) / (values[1] + 0.05)
}

const results = contract.contrastPairs.map((pair) => {
  const ratio = contrast(resolveToken(pair.foreground), resolveToken(pair.background))
  const aaMinimum = pair.usage === "non-text" ? 3 : 4.5
  const aaaMinimum = pair.usage === "non-text" ? 3 : 7
  return {
    ...pair,
    aaMinimum,
    aaaMinimum,
    ratio: Number(ratio.toFixed(2)),
    aa: ratio >= aaMinimum,
    aaa: ratio >= aaaMinimum,
  }
})

const shadows = contract.shadowRoles.map((role) => ({
  role,
  actual: tokens[role],
  valid: Boolean(tokens[role]),
}))
const heights = Object.entries(contract.controlHeightRoles).map(([role, expected]) => ({
  role,
  expected: expected.expected,
  actual: tokens[expected.token],
  valid: tokens[expected.token] === expected.expected,
}))
const spacing = Object.entries(contract.spacingScale).map(([role, expected]) => ({
  role,
  expected,
  actual: tokens[role],
  valid: tokens[role] === expected,
}))
const typography = Object.entries(contract.typographyRoles ?? {}).flatMap(([role, values]) =>
  Object.entries(values).map(([property, expected]) => ({
    role: `${role}.${property}`,
    token: expected.token,
    expected: expected.expected,
    actual: tokens[expected.token],
    valid: tokens[expected.token] === expected.expected,
  })),
)
const fontFamilies = Object.entries(contract.fontFamilies ?? {}).map(([role, expected]) => ({
  role,
  token: expected.token,
  family: expected.family,
  actual: tokens[expected.token],
  valid: Boolean(tokens[expected.token]?.includes(`"${expected.family}"`)),
}))

const aaFailures = results.filter((item) => item.blocking !== false && !item.aa)
const knownGaps = results.filter((item) => item.blocking === false && !item.aa)
const aaaGaps = results.filter((item) => item.aaa)
const shadowFailures = shadows.filter((item) => !item.valid)
const heightFailures = heights.filter((item) => !item.valid)
const spacingFailures = spacing.filter((item) => !item.valid)
const typographyFailures = typography.filter((item) => !item.valid)
const fontFamilyFailures = fontFamilies.filter((item) => !item.valid)
const report = {
  standard: contract.standard,
  required: contract.requiredConformance,
  results,
  shadows,
  heights,
  spacing,
  typography,
  fontFamilies,
  aaFailures,
  knownGaps,
  aaaGaps,
}

if (process.argv.includes("--json")) console.log(JSON.stringify(report, null, 2))
else {
  for (const item of results) {
    const label = item.blocking === false ? "GAP " : item.aa ? "PASS" : "FAIL"
    console.log(
      `${label} ${item.id}: ${item.ratio}:1 (AA ${item.aaMinimum}:1, AAA ${item.aaa ? "pass" : "gap"})`,
    )
  }
  for (const item of [...heightFailures, ...spacingFailures, ...typographyFailures]) {
    console.error(`FAIL ${item.role}: expected ${item.expected}, received ${item.actual}`)
  }
  for (const item of fontFamilyFailures) {
    console.error(`FAIL font.${item.role}: expected ${item.family}, received ${item.actual}`)
  }
  for (const item of shadowFailures) {
    console.error(`FAIL ${item.role}: token is not declared`)
  }
  for (const item of knownGaps) {
    console.warn(
      `GAP ${item.id}: ${item.ratio}:1 is a declared non-blocking gap. ${item.note ?? ""}`,
    )
  }
  if (aaaGaps.length > 0) {
    console.warn(`AAA advisory: ${aaaGaps.length} declared pair(s) remain below AAA.`)
  }
}

if (
  aaFailures.length > 0 ||
  shadowFailures.length > 0 ||
  heightFailures.length > 0 ||
  spacingFailures.length > 0 ||
  typographyFailures.length > 0 ||
  fontFamilyFailures.length > 0
)
  process.exitCode = 1
