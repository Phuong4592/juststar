import { expect, test } from "@playwright/test"

const foundationStories = {
  button: "actions-button--overview",
} as const

function storyUrl(id: string) {
  return `/iframe.html?id=${id}&viewMode=story`
}

for (const [name, story] of Object.entries(foundationStories)) {
  test(`@visual ${name} foundation matches its approved baseline`, async ({ page }) => {
    await page.setViewportSize({ width: 1024, height: 768 })
    await page.goto(storyUrl(story))
    await expect(page.locator("#storybook-root")).not.toBeEmpty()
    await expect(page).toHaveScreenshot(`${name}-foundation.png`, { fullPage: true })
  })
}
