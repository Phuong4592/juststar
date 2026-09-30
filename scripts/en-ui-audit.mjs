#!/usr/bin/env node

import { existsSync, realpathSync } from "node:fs"
import { mkdir, writeFile } from "node:fs/promises"
import { createRequire } from "node:module"
import path from "node:path"
import { fileURLToPath, pathToFileURL } from "node:url"

import {
  auditRenderedPage,
  observePageIssues,
} from "../.agents/skills/en-ui-consumer/scripts/rendered-page-audit.mjs"
import { parseAuditArgs } from "./en-ui-audit-options.mjs"

async function loadChromium() {
  const requireFromConsumer = createRequire(path.join(process.cwd(), "package.json"))
  for (const packageName of ["@playwright/test", "playwright"]) {
    try {
      const modulePath = requireFromConsumer.resolve(packageName)
      const playwright = await import(pathToFileURL(modulePath).href)
      if (playwright.chromium) return playwright.chromium
      if (playwright.default?.chromium) return playwright.default.chromium
    } catch {
      // Try the next supported Playwright package.
    }
  }
  throw new Error(
    "en-ui-audit requires the consumer's existing @playwright/test or playwright installation.",
  )
}

export async function runAudit(options) {
  const chromium = await loadChromium()
  const outputDirectory = path.resolve(options.output)
  await mkdir(outputDirectory, { recursive: true })
  const executablePath = [
    process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH,
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/usr/bin/google-chrome",
    "/usr/bin/chromium",
  ].find((candidate) => Boolean(candidate && existsSync(candidate)))
  const browser = await chromium.launch({
    headless: true,
    ...(executablePath ? { executablePath } : {}),
  })
  const reports = []

  try {
    for (const viewport of options.viewports) {
      const browserContext = await browser.newContext({ viewport })
      const page = await browserContext.newPage()
      const observed = observePageIssues(page)
      let navigationError = null
      try {
        await page.goto(options.url, { waitUntil: "networkidle" })
      } catch (error) {
        navigationError = error instanceof Error ? error.message : String(error)
      }

      const rendered = navigationError
        ? { findings: [], rootSelector: options.rootSelector, summary: { total: 0 } }
        : await auditRenderedPage(page, { rootSelector: options.rootSelector })
      const runtime = observed.stop()
      if (navigationError) {
        runtime.push({ ruleId: "navigation-error", severity: "error", message: navigationError })
      }

      const label = `${viewport.width}x${viewport.height}`
      const screenshot = path.join(outputDirectory, `${label}.png`)
      if (!navigationError) await page.screenshot({ fullPage: true, path: screenshot })
      reports.push({ rendered, runtime, screenshot: navigationError ? null : screenshot, viewport })
      await browserContext.close()
    }
  } finally {
    await browser.close()
  }

  const reportPath = path.join(outputDirectory, "report.json")
  await writeFile(reportPath, `${JSON.stringify({ reports, url: options.url }, null, 2)}\n`)
  const blocking = reports.flatMap(({ rendered, runtime }) => [
    ...runtime.filter((finding) => finding.severity === "error"),
    ...rendered.findings.filter((finding) => finding.severity === "error"),
  ])

  return { blocking, reportPath, reports }
}

async function run() {
  const options = parseAuditArgs(process.argv.slice(2))
  const result = await runAudit(options)
  for (const report of result.reports) {
    const label = `${report.viewport.width}x${report.viewport.height}`
    console.log(
      `${label}: ${report.rendered.findings.length} rendered finding(s), ${report.runtime.length} runtime finding(s)`,
    )
  }
  console.log(`Audit report: ${result.reportPath}`)
  if (result.blocking.length > 0) {
    console.error(`${result.blocking.length} blocking rendered or runtime finding(s).`)
    process.exitCode = 1
  }
}

function isDirectExecution() {
  if (!process.argv[1]) return false
  try {
    return realpathSync(fileURLToPath(import.meta.url)) === realpathSync(process.argv[1])
  } catch {
    return false
  }
}

if (isDirectExecution()) {
  try {
    await run()
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error))
    process.exitCode = 1
  }
}
