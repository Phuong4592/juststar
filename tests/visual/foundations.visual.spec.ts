import { expect, test, type Locator } from "@playwright/test"
import { createRequire } from "node:module"

const require = createRequire(import.meta.url)
const axePath = require.resolve("axe-core/axe.min.js")

const stories = {
  button: "actions-button--overview",
}

function storyUrl(id: string) {
  return `/iframe.html?id=${id}&viewMode=story`
}

function channel(value: number) {
  const normalized = value / 255
  return normalized <= 0.04045 ? normalized / 12.92 : ((normalized + 0.055) / 1.055) ** 2.4
}

function oklchToLinearSrgb(lightness: number, chroma: number, hue: number) {
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

function luminance(color: string) {
  const rgb = color.match(/^rgba?\(([\d.]+),?\s*([\d.]+),?\s*([\d.]+)/)
  if (rgb) {
    const [red, green, blue] = [Number(rgb[1]), Number(rgb[2]), Number(rgb[3])].map(channel)
    return 0.2126 * red + 0.7152 * green + 0.0722 * blue
  }
  const oklch = color.match(/^oklch\(([\d.]+|none)%?\s+([\d.]+|none)%?\s+([\d.]+|none)/)
  if (oklch) {
    const [lightness, chroma, hue] = oklch
      .slice(1)
      .map((part) => (part === "none" ? 0 : Number(part)))
    const [red, green, blue] = oklchToLinearSrgb(lightness, chroma, hue)
    return 0.2126 * red + 0.7152 * green + 0.0722 * blue
  }
  throw new Error(`Unsupported browser color: ${color}`)
}

function contrast(foreground: string, background: string) {
  const values = [luminance(foreground), luminance(background)].sort((a, b) => b - a)
  return (values[0] + 0.05) / (values[1] + 0.05)
}

async function renderedColors(locator: Locator) {
  return locator.evaluate((element) => {
    const styles = getComputedStyle(element)
    let background = styles.backgroundColor
    let ancestor = element.parentElement
    while (background === "rgba(0, 0, 0, 0)" && ancestor) {
      background = getComputedStyle(ancestor).backgroundColor
      ancestor = ancestor.parentElement
    }
    return { background, foreground: styles.color }
  })
}

test("button hover states retain required text contrast", async ({ page }) => {
  await page.goto(storyUrl(stories.button))
  const sizes = page.getByRole("heading", { name: "Sizes" }).locator("..")
  for (const name of ["xs", "sm", "md", "lg"]) {
    const button = sizes.getByRole("button", { name, exact: true }).first()
    const colors = await renderedColors(button)
    expect(
      contrast(colors.foreground, colors.background),
      `${name} default contrast: ${JSON.stringify(colors)}`,
    ).toBeGreaterThanOrEqual(4.5)
  }
  const states = page.getByRole("heading", { name: "States" }).locator("..")
  await expect(states.getByRole("button", { name: "primary", exact: true }).first()).toHaveCSS(
    "opacity",
    "0.64",
  )
  const variants = page.getByRole("heading", { name: "Variants" }).locator("..")
  for (const name of [
    "primary",
    "secondary",
    "tertiary",
    "danger",
    "danger-soft",
    "ghost",
    "link",
  ]) {
    const button = variants.getByRole("button", { name, exact: true })
    await button.hover()
    await page.waitForTimeout(200)
    const colors = await renderedColors(button)
    expect(
      contrast(colors.foreground, colors.background),
      `${name} hover contrast`,
    ).toBeGreaterThanOrEqual(4.5)
  }
})

test("button loading state shows spinner and keeps its label visible", async ({ page }) => {
  await page.goto(storyUrl(stories.button))
  const loadingSection = page.getByRole("heading", { name: "Loading", exact: true }).locator("..")
  const button = loadingSection.getByRole("button").first()
  await expect(button).toHaveAttribute("aria-busy", "true")
  await expect(button.locator("output")).toBeVisible()
  await expect(button).toContainText("primary")
})

test("button shows focus-visible ring on keyboard focus", async ({ page }) => {
  await page.goto(storyUrl(stories.button))
  await page.click("main")
  await page.keyboard.press("Tab")
  const boxShadow = await page.evaluate(() => {
    const el = document.activeElement as HTMLElement | null
    return el ? getComputedStyle(el).boxShadow : "none"
  })
  expect(boxShadow, "focus-visible should produce a ring").not.toBe("none")
})

test("button icon size has equal width and height", async ({ page }) => {
  await page.goto(storyUrl(stories.button))
  const button = page.getByRole("button", { name: "primary settings", exact: true })
  const box = await button.boundingBox()
  expect(box).toBeDefined()
  expect(box!.width).toBe(box!.height)
})

test("button active state applies scale transform", async ({ page }) => {
  await page.goto(storyUrl(stories.button))
  const button = page.getByRole("button", { name: "primary", exact: true }).first()
  const box = (await button.boundingBox())!
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2)
  await page.mouse.down()
  await expect
    .poll(() => button.evaluate((el) => Number(getComputedStyle(el).scale)))
    .toBeCloseTo(0.98, 2)
  await page.mouse.up()
})

test.skip("stable Storybook catalog passes automated WCAG 2.2 AA checks", async ({ page }) => {
  test.setTimeout(180_000)
  const index = (await (await page.request.get("/index.json")).json()) as {
    entries: Record<string, { id: string; title: string; type: string }>
  }
  const entries = Object.values(index.entries).filter(
    (entry) => entry.type === "story" && !entry.title.startsWith("Experimental/"),
  )
  const failures: Array<{ id: string; violations: string[] }> = []

  for (const entry of entries) {
    await page.goto(storyUrl(entry.id))
    await expect(page.locator("body")).toBeVisible()
    await page.waitForTimeout(100)
    await page.addScriptTag({ path: axePath })
    const violations = await page.evaluate(async () => {
      const axe = (
        window as typeof window & {
          axe: {
            run: (
              root: Document,
              options: object,
            ) => Promise<{
              violations: Array<{ id: string; nodes: Array<{ target: string[] }> }>
            }>
          }
        }
      ).axe
      let report: Awaited<ReturnType<typeof axe.run>> | undefined
      for (let attempt = 0; attempt < 20 && !report; attempt += 1) {
        try {
          report = await axe.run(document, {
            runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"] },
          })
        } catch (error) {
          // The a11y addon runs its own axe check on each story; wait it out.
          if (!(error instanceof Error && error.message.includes("already running"))) throw error
          await new Promise((resolve) => setTimeout(resolve, 250))
        }
      }
      if (!report) throw new Error("axe.run never completed")
      return report.violations.map(
        (violation) =>
          `${violation.id}: ${violation.nodes.map((node) => node.target.join(" ")).join(", ")}`,
      )
    })
    if (violations.length > 0) failures.push({ id: entry.id, violations })
  }

  expect(failures).toEqual([])
})
