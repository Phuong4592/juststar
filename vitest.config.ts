import { configDefaults, defineConfig } from "vitest/config"

export default defineConfig({
  test: {
    environment: "jsdom",
    exclude: [...configDefaults.exclude, "tests/visual/**"],
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
  },
})
