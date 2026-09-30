import { defineConfig } from "@playwright/test"
import { existsSync } from "node:fs"

const executablePath = [
  process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH,
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
].find((candidate): candidate is string => Boolean(candidate && existsSync(candidate)))

export default defineConfig({
  testDir: "tests/visual",
  fullyParallel: false,
  reporter: "line",
  snapshotPathTemplate: "{testDir}/__screenshots__/{arg}{ext}",
  expect: { toHaveScreenshot: { animations: "disabled", maxDiffPixels: 100 } },
  use: {
    baseURL: "http://127.0.0.1:6008",
    browserName: "chromium",
    colorScheme: "light",
    launchOptions: executablePath ? { executablePath } : undefined,
  },
  webServer: [
    {
      command: "pnpm exec storybook dev -p 6008 --ci",
      reuseExistingServer: true,
      timeout: 120_000,
      url: "http://127.0.0.1:6008",
    },
    {
      command: "pnpm exec vite --config docs/site/vite.config.ts --host 127.0.0.1 --port 4173",
      reuseExistingServer: true,
      timeout: 120_000,
      url: "http://127.0.0.1:4173",
    },
  ],
})
