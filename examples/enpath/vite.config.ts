import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { defineConfig } from "vite"

const appRoot = path.dirname(fileURLToPath(import.meta.url))
const repositoryRoot = path.resolve(appRoot, "../..")

// Demo consumer app: resolves @enosta/en-ui to the package source, like Storybook and the docs site.
export default defineConfig({
  base: "./",
  root: appRoot,
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@enosta/en-ui": path.join(repositoryRoot, "src/index.ts"),
    },
  },
  build: {
    emptyOutDir: true,
    outDir: path.join(appRoot, "dist"),
  },
})
