import { readdir, readFile } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const roots = [
  path.join(root, "src", "foundations"),
  path.join(root, "src", "components"),
  path.join(root, "src", "patterns"),
]
const themeSource = await readFile(path.join(root, "src", "style", "themes", "default.css"), "utf8")

const colorTokens = new Set(
  [...themeSource.matchAll(/^( {2})(--color-[a-z0-9-]+):/gm)].map(([_, _indent, name]) => name),
)

const ownFamilies = ["neutral", "brand", "accent", "info", "success", "error", "warning"]
const tailwindDefaults =
  "red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose|slate|gray|zinc|stone"
const colorPrefixes =
  "bg|text|border|ring|ring-offset|from|to|via|divide|outline|decoration|fill|stroke|accent|caret|shadow|inset-shadow"

const defaultPalette = new RegExp(
  `(?<![\\w-])(${colorPrefixes})-(${tailwindDefaults})(-[0-9]+)?(?![\\w-])`,
  "g",
)
const shorthandResidual = /-\(--color-[a-z0-9-]+\)/
const familyStep = new RegExp(
  `(?<![\\w-])(${colorPrefixes})-(${ownFamilies.join("|")})-([0-9]+)(?![\\w-])`,
  "g",
)

const radiusNames = new Set(
  [...themeSource.matchAll(/^( {2})(--radius-[a-z0-9-]+):/gm)].map(([_, _indent, name]) =>
    name.replace("--radius-", ""),
  ),
)
const radiusCorners = new Set(["t", "b", "s", "e", "tl", "tr", "bl", "br", "ss", "se", "es", "ee"])
const shadowNames = new Set(
  [...themeSource.matchAll(/^( {2})(--shadow-[a-z0-9-]+):/gm)].map(([_, _indent, name]) =>
    name.replace("--shadow-", ""),
  ),
)
const fontSizeNames = new Set(
  [...themeSource.matchAll(/^( {2})(--font-size-[a-z0-9-]+):/gm)].map(([_, _indent, name]) =>
    name.replace("--font-size-", ""),
  ),
)
const lineHeightNames = new Set(
  [...themeSource.matchAll(/^( {2})(--line-height-[a-z0-9-]+):/gm)].map(([_, _indent, name]) =>
    name.replace("--line-height-", ""),
  ),
)
const fontWeightNames = new Set(
  [...themeSource.matchAll(/^( {2})(--font-weight-[a-z0-9-]+):/gm)].map(([_, _indent, name]) =>
    name.replace("--font-weight-", ""),
  ),
)
const fontFamilyNames = new Set(
  [...themeSource.matchAll(/^( {2})(--font-family-[a-z0-9-]+):/gm)].map(([_, _indent, name]) =>
    name.replace("--font-family-", ""),
  ),
)
const letterSpacingNames = new Set(
  [...themeSource.matchAll(/^( {2})(--letter-spacing-[a-z0-9-]+):/gm)].map(([_, _indent, name]) =>
    name.replace("--letter-spacing-", ""),
  ),
)

const textNonSizeNames = new Set([
  "left",
  "right",
  "center",
  "justify",
  "start",
  "end",
  "wrap",
  "nowrap",
  "balance",
  "pretty",
  "inherit",
  "current",
  "transparent",
])
const arbitraryLength = /\[[-0-9.]+(px|rem|em|%)/

const spaceTokenNames = new Set(
  [...themeSource.matchAll(/^( {2})(--space-[a-z0-9-]+):/gm)].map(([_, _indent, name]) =>
    name.replace("--space-", ""),
  ),
)
const spaceClassPrefixes =
  "gap-x|gap-y|gap|space-x|space-y|px|py|pt|pr|pb|pl|ps|pe|p|mx|my|mt|mr|mb|ml|ms|me|m|scroll-mx|scroll-my|scroll-mt|scroll-mr|scroll-mb|scroll-ml|scroll-ms|scroll-me|scroll-m|scroll-px|scroll-py|scroll-pt|scroll-pr|scroll-pb|scroll-pl|scroll-ps|scroll-pe|scroll-p|translate-x|translate-y|min-w|max-w|min-h|max-h|inset-x|inset-y|inset-s|inset-e|inset|top|right|bottom|left|w|h|size"
const spacingScaleNumeric = new RegExp(
  `(?<![\\w-])(${spaceClassPrefixes})-(\\d+(?:\\.\\d+)?)(?![\\w./%])`,
  "g",
)
const spacingShorthandResidual =
  /(?<![\w-])(?:gap-x|gap-y|gap|space-x|space-y|px|py|pt|pr|pb|pl|ps|pe|p|mx|my|mt|mr|mb|ml|ms|me|m|scroll-mx|scroll-my|scroll-mt|scroll-mr|scroll-mb|scroll-ml|scroll-ms|scroll-me|scroll-m|scroll-px|scroll-py|scroll-pt|scroll-pr|scroll-pb|scroll-pl|scroll-ps|scroll-pe|scroll-p|translate-x|translate-y|min-w|min-h|inset|top|right|bottom|left|w|h|size)-\(--space-/g
const containerNamesOnMaxWidth =
  /(?<![\w-])max-w-(3xs|xs|sm|md|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl|prose)(?![\w-])/g
const spacingFnResidual = /--spacing\(/

async function collectTsxFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  const files = await Promise.all(
    entries.map((entry) => {
      const full = path.join(dir, entry.name)
      return entry.isDirectory() ? collectTsxFiles(full) : full.endsWith(".tsx") ? [full] : []
    }),
  )
  return files.flat()
}

const files = (await Promise.all(roots.map((dir) => collectTsxFiles(dir)))).flat()
const violations = []

for (const file of files) {
  const source = await readFile(file, "utf8")
  const relative = path.relative(root, file)
  const lines = source.split("\n")

  lines.forEach((line, index) => {
    const location = `${relative}:${index + 1}`

    for (const match of line.matchAll(defaultPalette)) {
      violations.push(
        `${location}: default Tailwind color "${match[0]}" — use a themes/default.css token instead`,
      )
    }

    if (shorthandResidual.test(line)) {
      violations.push(
        `${location}: shorthand "x-(--color-*)" syntax — use the named token class instead`,
      )
    }

    for (const match of line.matchAll(familyStep)) {
      const token = `--color-${match[2]}-${match[3]}`
      if (!colorTokens.has(token)) {
        violations.push(`${location}: "${match[0]}" references undefined token "${token}"`)
      }
    }

    for (const match of line.matchAll(/(?<![\w-])rounded[^\s"']*/g)) {
      const suffix = match[0].slice("rounded".length)
      if (suffix === "") {
        violations.push(
          `${location}: bare "rounded" class — use a themes/default.css radius token instead`,
        )
        continue
      }
      if (suffix.includes("[--radius-")) {
        violations.push(
          `${location}: shorthand "rounded-(--radius-*)" syntax — use the named token class instead`,
        )
        continue
      }
      if (suffix.includes("[")) {
        if (!suffix.includes("--radius-") && !suffix.includes("inherit")) {
          violations.push(
            `${location}: "${match[0]}" with a non-token value — reference a --radius-* token or inherit`,
          )
        }
        continue
      }
      const parts = suffix.slice(1).split("-")
      const corner = parts.length === 2 ? parts[0] : undefined
      const name = corner ? parts[1] : parts[0]
      const knownCorner = corner === undefined || radiusCorners.has(corner)
      if (!knownCorner || parts.length > 2 || !radiusNames.has(name)) {
        violations.push(`${location}: "${match[0]}" is not a themes/default.css radius token class`)
      }
    }

    for (const match of line.matchAll(/(?<![\w-])shadow[^\s"']*/g)) {
      const suffix = match[0].slice("shadow".length)
      if (suffix === "") {
        violations.push(
          `${location}: bare "shadow" class — use a themes/default.css shadow token instead`,
        )
        continue
      }
      if (suffix.startsWith("-(")) {
        if (suffix.includes("(--shadow-")) {
          violations.push(
            `${location}: shorthand "shadow-(--shadow-*)" syntax — use the named token class instead`,
          )
        }
        continue
      }
      if (suffix.includes("[")) {
        if (
          !suffix.includes("--shadow-") &&
          !suffix.includes("inherit") &&
          !suffix.includes("inset_0_0_0_1000px")
        ) {
          violations.push(
            `${location}: "${match[0]}" with a non-token value — reference a --shadow-* token, inherit, or the autofill technique`,
          )
        }
        continue
      }
      const name = suffix.slice(1).split("/")[0]
      if (!shadowNames.has(name) && !colorTokens.has(`--color-${name}`)) {
        violations.push(`${location}: "${match[0]}" is not a themes/default.css shadow token class`)
      }
    }

    for (const match of line.matchAll(/(?<![\w-])text-[^\s"']*/g)) {
      const suffix = match[0].slice("text-".length).split("/")[0]
      if (suffix.includes("[")) {
        if (arbitraryLength.test(suffix) && !suffix.includes("--font-size-")) {
          violations.push(
            `${location}: "${match[0]}" with a raw length — reference a --font-size-* token`,
          )
        }
        continue
      }
      if (suffix.startsWith("(")) {
        if (suffix.includes("--font-size-")) {
          violations.push(
            `${location}: shorthand "text-(--font-size-*)" syntax — use the named token class instead`,
          )
        }
        continue
      }
      if (
        textNonSizeNames.has(suffix) ||
        colorTokens.has(`--color-${suffix}`) ||
        fontSizeNames.has(suffix)
      ) {
        continue
      }
      violations.push(
        `${location}: "text-${suffix}" is not a themes/default.css font-size or color token class`,
      )
    }

    for (const match of line.matchAll(/(?<![\w-])(leading|tracking)-[^\s"']*/g)) {
      const kind = match[1]
      const prefix = kind === "leading" ? "--line-height-" : "--letter-spacing-"
      const names = kind === "leading" ? lineHeightNames : letterSpacingNames
      const suffix = match[0].slice(kind.length + 1).split("/")[0]
      if (suffix.includes("[")) {
        if (arbitraryLength.test(suffix) && !suffix.includes(prefix)) {
          violations.push(
            `${location}: "${match[0]}" with a raw length — reference a ${prefix}* token`,
          )
        }
        continue
      }
      if (suffix.startsWith("(")) {
        if (suffix.includes(prefix)) {
          violations.push(
            `${location}: shorthand "${kind}-(${prefix}*)" syntax — use the named token class instead`,
          )
        }
        continue
      }
      if (!names.has(suffix)) {
        violations.push(
          `${location}: "${match[0]}" is not a themes/default.css ${kind} token class`,
        )
      }
    }

    for (const match of line.matchAll(spacingScaleNumeric)) {
      if (match[2] === "0") continue
      violations.push(
        `${location}: "${match[0]}" uses the default Tailwind numeric spacing scale — use a --space-* token class or an arbitrary value`,
      )
    }
    if (spacingShorthandResidual.test(line)) {
      violations.push(
        `${location}: shorthand "x-(--space-*)" syntax — use the named token class instead`,
      )
    }
    if (spacingFnResidual.test(line)) {
      violations.push(`${location}: "--spacing(...)" function syntax — use var(--space-*) instead`)
    }
    for (const match of line.matchAll(containerNamesOnMaxWidth)) {
      violations.push(
        `${location}: "${match[0]}" resolves to a spacing token in px — use an arbitrary rem value for container widths`,
      )
    }

    for (const match of line.matchAll(/(?<![\w-])font-([a-z0-9-]+)/g)) {
      const name = match[1]
      if (fontFamilyNames.has(name) || fontWeightNames.has(name)) continue
      violations.push(
        `${location}: "font-${name}" is not a themes/default.css font-family or font-weight token class`,
      )
    }
  })
}

if (violations.length > 0) {
  console.error(`audit-token-classes: ${violations.length} violation(s)`)
  for (const violation of violations) console.error(`  ${violation}`)
  process.exit(1)
}

console.log(
  `audit-token-classes: OK (${files.length} files, ${colorTokens.size} color tokens, ${radiusNames.size} radius tokens, ${shadowNames.size} shadow tokens, ${fontSizeNames.size} font-size tokens, ${spaceTokenNames.size} spacing tokens)`,
)
