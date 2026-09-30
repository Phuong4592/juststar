import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { defineConfig } from "vite"

import packageManifest from "../../package.json"

const siteRoot = path.dirname(fileURLToPath(import.meta.url))
const repositoryRoot = path.resolve(siteRoot, "../..")

export default defineConfig({
  base: "./",
  root: siteRoot,
  plugins: [
    {
      name: "package-version-html",
      transformIndexHtml: {
        order: "pre",
        handler: (html) => html.replaceAll("__PACKAGE_VERSION__", packageManifest.version),
      },
    },
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@enosta/en-ui": path.join(repositoryRoot, "src/index.ts"),
    },
  },
  build: {
    emptyOutDir: true,
    outDir: path.join(repositoryRoot, "site-static"),
    rollupOptions: {
      input: {
        canvas: path.join(siteRoot, "canvas/index.html"),
        design: path.join(siteRoot, "design/index.html"),
        docs: path.join(siteRoot, "docs/index.html"),
        landing: path.join(siteRoot, "index.html"),
      },
    },
  },
})
