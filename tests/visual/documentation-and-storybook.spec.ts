import { expect, test } from "@playwright/test"
import { createRequire } from "node:module"

const require = createRequire(import.meta.url)
const axePath = require.resolve("axe-core/axe.min.js")

const siteThemes = [
  { label: "Default light", value: "default" },
  { label: "Default dark", value: "default-dark" },
  { label: "Neobrutalism", value: "neobrutalism" },
  { label: "Glassmorphism", value: "glassmorphism" },
  { label: "Neumorphism", value: "neumorphism" },
  { label: "Bauhaus", value: "bauhaus" },
  { label: "Terminal", value: "terminal" },
  { label: "Editorial", value: "editorial" },
  { label: "Pop", value: "pop" },
  { label: "High contrast", value: "high-contrast" },
] as const

const sitePages = [
  "http://127.0.0.1:4173/",
  "http://127.0.0.1:4173/canvas/",
  "http://127.0.0.1:4173/docs/",
  "http://127.0.0.1:4173/design/",
]

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

test("documentation primary links preserve the Button foreground token", async ({ page }) => {
  const pages = [
    {
      labels: ["Get started", "Install En UI", "Read the installation guide"],
      url: "http://127.0.0.1:4173/",
    },
    {
      labels: ["Get started", "Open the Storybook catalog"],
      url: "http://127.0.0.1:4173/docs/",
    },
    {
      labels: ["Get started", "Install En UI"],
      url: "http://127.0.0.1:4173/design/",
    },
  ]

  for (const entry of pages) {
    await page.goto(entry.url)
    for (const label of entry.labels) {
      const links = page.getByRole("link", { exact: true, name: label })
      for (const link of await links.all()) {
        const colors = await link.evaluate((element) => {
          const styles = getComputedStyle(element)
          return { background: styles.backgroundColor, foreground: styles.color }
        })
        expect(luminance(colors.foreground), `${label} foreground`).toBeGreaterThan(0.95)
        expect(contrast(colors.foreground, colors.background), label).toBeGreaterThanOrEqual(4.5)
      }
    }
  }
})

test("the site theme selection persists between landing and documentation", async ({ page }) => {
  await page.goto(sitePages[0])
  await page.getByRole("combobox", { name: "Site theme" }).click()
  await page.getByRole("option", { name: "Terminal" }).click()
  await expect(page.locator("html")).toHaveAttribute("data-theme", "terminal")

  await page.goto(sitePages[2])
  await expect(page.locator("html")).toHaveAttribute("data-theme", "terminal")
  await expect(page.getByRole("combobox", { name: "Site theme" })).toContainText("Terminal")

  await page.goto(sitePages[1])
  await expect(page.locator("html")).toHaveAttribute("data-theme", "terminal")
  await expect(page.getByRole("combobox", { name: "Site theme" })).toContainText("Terminal")
})

test("contract canvas exposes declared parts and slots without horizontal overflow", async ({
  page,
}) => {
  for (const viewport of [
    { height: 812, width: 375 },
    { height: 1024, width: 768 },
    { height: 900, width: 1280 },
  ]) {
    await page.setViewportSize(viewport)
    await page.goto("http://127.0.0.1:4173/canvas/")
    await expect(page.getByRole("heading", { name: "Card" })).toBeVisible()

    await page.locator(".contract-catalog > summary").click()
    await page.getByRole("button", { name: "Table, Component" }).click()
    const canvasRoot = page.locator(".contract-root-node")
    const blueprint = page.locator('.contract-canvas-grid[data-layout="data"]')
    const headerRegion = blueprint.locator('[data-region="header"]')
    const bodyRegion = blueprint.locator('[data-region="body"]')
    await expect(headerRegion).toBeVisible()
    await expect(bodyRegion).toBeVisible()
    await expect(bodyRegion.locator(".contract-node-disclosure > summary")).toHaveAttribute(
      "aria-label",
      "About the Body part",
    )
    await expect(
      canvasRoot.getByText("Body section containing data rows.", { exact: true }),
    ).toBeHidden()
    await bodyRegion.locator(".contract-node-disclosure > summary").click()
    await expect(
      canvasRoot.getByText("Body section containing data rows.", { exact: true }),
    ).toBeVisible()

    await expect(canvasRoot.locator('[data-slot-name="children"]')).toBeVisible()

    const [canvasBox, workbenchBox] = await Promise.all([
      page.locator(".contract-canvas-stage").boundingBox(),
      page.locator(".contract-workbench").boundingBox(),
    ])
    expect(canvasBox).not.toBeNull()
    expect(workbenchBox).not.toBeNull()
    expect(canvasBox!.width).toBeGreaterThanOrEqual(workbenchBox!.width - 1)

    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    )
    expect(overflow, `contract canvas overflow at ${viewport.width}px`).toBeLessThanOrEqual(1)
  }
})

test("contract canvas pairs contract annotations with package-shaped specimens", async ({
  page,
}) => {
  await page.setViewportSize({ height: 900, width: 1280 })
  await page.goto("http://127.0.0.1:4173/canvas/")

  await page.locator(".contract-catalog > summary").click()
  await page.getByRole("button", { name: "Button, Component" }).click()
  const buttonSpecimen = page.locator('.contract-component-specimen[data-component="button"]')
  await expect(buttonSpecimen).toHaveAttribute("inert", "")
  await expect(buttonSpecimen.locator("button")).toContainText("Create record")

  await page.locator(".contract-catalog > summary").click()
  await page.getByRole("button", { name: "Card, Component" }).click()
  await expect(
    page.locator('.contract-component-specimen[data-component="card"] [data-slot="card"]'),
  ).toBeVisible()

  await page.locator(".contract-catalog > summary").click()
  await page.getByRole("button", { name: "Table, Component" }).click()
  const tableSpecimen = page.locator('.contract-component-specimen[data-component="table"]')
  await expect(tableSpecimen.locator('[data-slot="table"]')).toBeVisible()
  await expect(
    tableSpecimen.locator('[data-slot="table-body"] [data-slot="table-row"]'),
  ).toHaveCount(3)
})

test("public Storybook pages stay on the documented default theme", async ({ page }) => {
  test.setTimeout(60_000)

  await page.goto(
    "http://127.0.0.1:6008/iframe.html?id=actions-button--overview&viewMode=story&globals=theme:default-dark",
  )
  await expect(page.locator("html")).toHaveAttribute("data-theme", "default", { timeout: 30_000 })
  await expect(page.locator("html")).toHaveAttribute("data-mode", "light", { timeout: 30_000 })
})

test("the consumer-owned landing composition keeps the queue first and contains overflow", async ({
  page,
}) => {
  const viewports = [
    { height: 812, width: 375 },
    { height: 1024, width: 768 },
    { height: 900, width: 1280 },
  ]

  for (const viewport of viewports) {
    await page.setViewportSize(viewport)
    await page.goto("http://127.0.0.1:4173/")

    const landingOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    )
    expect(landingOverflow, `landing overflow at ${viewport.width}px`).toBeLessThanOrEqual(1)

    const landingQueue = page.locator(".renewal-queue")
    const landingDetail = page.locator(".renewal-detail")
    const landingMetrics = page.locator(".operations-metrics")
    const [landingQueueBox, landingDetailBox, landingMetricsBox] = await Promise.all([
      landingQueue.boundingBox(),
      landingDetail.boundingBox(),
      landingMetrics.boundingBox(),
    ])
    expect(landingQueueBox).not.toBeNull()
    expect(landingDetailBox).not.toBeNull()
    expect(landingMetricsBox).not.toBeNull()

    if (viewport.width < 1024) {
      expect(landingQueueBox!.y).toBeLessThan(landingDetailBox!.y)
      expect(landingDetailBox!.y).toBeLessThan(landingMetricsBox!.y)
    } else {
      expect(landingQueueBox!.x).toBeLessThan(landingDetailBox!.x)
    }

    const landingTable = await page
      .locator(".operations-table-scroll [data-slot='table-container']")
      .evaluate((element) => ({
        clientWidth: element.clientWidth,
        scrollWidth: element.scrollWidth,
      }))
    if (viewport.width === 375)
      expect(landingTable.scrollWidth).toBeGreaterThan(landingTable.clientWidth)
  }
})

test("landing and documentation themes pass automated WCAG 2.2 AA checks", async ({ page }) => {
  test.setTimeout(180_000)
  const failures: Array<{ page: string; theme: string; violations: string[] }> = []

  for (const url of sitePages) {
    await page.goto(url)
    await page.addScriptTag({ path: axePath })

    for (const theme of siteThemes) {
      await page.getByRole("combobox", { name: "Site theme" }).click()
      await page.getByRole("option", { name: theme.label }).click()
      await expect(page.locator("html")).toHaveAttribute("data-theme", theme.value)
      await page.waitForTimeout(400)

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
        const report = await axe.run(document, {
          runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"] },
        })
        return report.violations.map(
          (violation) =>
            `${violation.id}: ${violation.nodes.map((node) => node.target.join(" ")).join(", ")}`,
        )
      })

      if (violations.length > 0) failures.push({ page: url, theme: theme.value, violations })
    }
  }

  expect(failures).toEqual([])
})
