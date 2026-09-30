import type { StorybookConfig } from "@storybook/react-vite"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { mergeConfig } from "vite"

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")

const config: StorybookConfig = {
  stories: [
    "../src/foundations/**/*.stories.@(ts|tsx)",
    "../src/components/!(application-header|application-shell|page-container|page-header|page-section|sidebar-navigation|split-layout)/*.stories.@(ts|tsx)",
  ],

  addons: ["@storybook/addon-docs", "@storybook/addon-a11y"],

  framework: {
    name: "@storybook/react-vite",
    options: {},
  },

  viteFinal: async (viteConfig) => {
    const { default: tailwindcss } = await import("@tailwindcss/vite")
    return mergeConfig(viteConfig, {
      plugins: [tailwindcss()],
      resolve: {
        alias: {
          "@enosta/en-ui": path.join(root, "src", "index.ts"),
        },
      },
    })
  },

  features: {
    experimentalReview: true,
    experimentalDocgenServer: true,
  },
}

export default config
