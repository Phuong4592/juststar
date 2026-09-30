import { access, copyFile, mkdir, readFile } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const stylesPath = path.join(root, "dist", "styles.css")
const styles = await readFile(stylesPath, "utf8")
const fontFiles = new Set(
  [...styles.matchAll(/url\(["']?\.\/files\/([^"')]+)["']?\)/g)].map((match) => match[1]),
)
const sources = [
  path.join(root, "node_modules", "@fontsource-variable", "nunito", "files"),
  path.join(root, "node_modules", "@fontsource-variable", "geist-mono", "files"),
]
const output = path.join(root, "dist", "files")

await mkdir(output, { recursive: true })

for (const filename of fontFiles) {
  let source
  for (const directory of sources) {
    const candidate = path.join(directory, filename)
    try {
      await access(candidate)
      source = candidate
      break
    } catch {
      // Continue until the owning Fontsource package is found.
    }
  }
  if (!source) throw new Error(`Unable to locate font asset referenced by styles.css: ${filename}`)
  await copyFile(source, path.join(output, filename))
}

console.log(`Copied ${fontFiles.size} font assets into dist/files.`)
