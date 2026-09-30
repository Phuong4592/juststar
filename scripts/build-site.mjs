import { mkdtemp, readFile, readdir, rm, writeFile } from "node:fs/promises"
import { tmpdir } from "node:os"
import path from "node:path"
import { pathToFileURL } from "node:url"

import { build } from "vite"

const repositoryRoot = process.cwd()
const configFile = path.join(repositoryRoot, "docs/site/vite.config.ts")
const serverEntry = path.join(repositoryRoot, "docs/site/src/entry-server.tsx")
const outputDirectory = path.join(repositoryRoot, "site-static")
const serverOutput = await mkdtemp(path.join(tmpdir(), "en-ui-site-ssr-"))

await build({ configFile })

try {
  await build({
    configFile,
    ssr: { noExternal: true },
    build: {
      emptyOutDir: true,
      outDir: serverOutput,
      rollupOptions: {
        input: serverEntry,
        output: { entryFileNames: "entry-server.mjs" },
      },
      ssr: serverEntry,
    },
  })

  const serverFiles = await readdir(serverOutput)
  const bundle = serverFiles.find((file) => file === "entry-server.mjs")
  if (!bundle) throw new Error("The documentation server-render bundle was not generated.")

  const { render } = await import(pathToFileURL(path.join(serverOutput, bundle)).href)
  const pages = [
    { file: path.join(outputDirectory, "index.html"), pathname: "/" },
    { file: path.join(outputDirectory, "canvas/index.html"), pathname: "/canvas/" },
    { file: path.join(outputDirectory, "design/index.html"), pathname: "/design/" },
    { file: path.join(outputDirectory, "docs/index.html"), pathname: "/docs/" },
  ]

  for (const page of pages) {
    const html = await readFile(page.file, "utf8")
    const marker = '<div id="root"></div>'
    if (!html.includes(marker)) throw new Error(`Missing React root marker in ${page.file}.`)

    const rendered = render(page.pathname)
    const prerendered = html.replace(marker, `<div id="root">${rendered}</div>`)
    if (!prerendered.includes("<main")) {
      throw new Error(`Static page content was not rendered into ${page.file}.`)
    }
    await writeFile(page.file, prerendered)
  }
} finally {
  await rm(serverOutput, { force: true, recursive: true })
}

console.log("Built and pre-rendered the React landing page and documentation site.")
