import { cp, mkdir, rm } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const output = path.join(root, "pages-static")

await rm(output, { force: true, recursive: true })
await mkdir(output, { recursive: true })

await cp(path.join(root, "site-static"), output, { recursive: true })
await cp(path.join(root, "storybook-static"), path.join(output, "storybook"), { recursive: true })

console.log("Built landing page, contract canvas, documentation, and Storybook in pages-static/")
