import { existsSync } from "node:fs"
import { readFile } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"

import Ajv2020 from "ajv/dist/2020.js"
import prettier from "prettier"

import { components } from "./catalog.mjs"

export const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")

export function componentDirectory(name) {
  const candidate = path.join(root, "src", "components", name)
  return existsSync(candidate) ? candidate : path.join(root, "src", "patterns", name)
}

export function componentSource(name) {
  return path.relative(root, componentDirectory(name)).split(path.sep).join("/")
}

export function contractPath(name) {
  return path.join(componentDirectory(name), `${name}.contract.json`)
}

export async function readContracts(names = components) {
  return Promise.all(
    names.map(async (name) => ({
      contract: JSON.parse(await readFile(contractPath(name), "utf8")),
      name,
    })),
  )
}

export async function createContractValidator() {
  const schema = JSON.parse(
    await readFile(path.join(root, "contracts", "component.schema.json"), "utf8"),
  )
  return new Ajv2020({ allErrors: true, strict: true }).compile(schema)
}

export function schemaErrors(validate) {
  return (validate.errors ?? [])
    .map((error) => `${error.instancePath || "/"} ${error.message}`)
    .join("; ")
}

export async function generatedOutputs() {
  const entries = await readContracts()
  const manifest = JSON.parse(await readFile(path.join(root, "package.json"), "utf8"))
  const prettierOptions = (await prettier.resolveConfig(path.join(root, "src", "index.ts"))) ?? {}
  const aggregate = {
    schemaVersion: "2.0.0",
    designSystemVersion: manifest.version,
    package: manifest.name,
    documentation: "DESIGN.md",
    components: entries.map(({ contract }) => contract),
  }
  const indexRows = await Promise.all(
    entries.map(async ({ contract, name }) => {
      const readme = await readFile(path.join(componentDirectory(name), "README.md"), "utf8")
      const summary = readme
        .replace(/```[\s\S]*?```/g, "")
        .split(/\n\s*\n/)
        .map((paragraph) => paragraph.replace(/\s+/g, " ").trim())
        .find(
          (paragraph) =>
            paragraph &&
            !paragraph.startsWith("#") &&
            !paragraph.startsWith("Contract ID:") &&
            !paragraph.startsWith("|") &&
            !paragraph.startsWith("-"),
        )
      const primaryExports = contract.exports
        .filter((item) => !item.endsWith("Props") && !item.endsWith("Variants"))
        .slice(0, 6)
        .map((item) => `\`${item}\``)
        .join(", ")

      return `| \`${name}\` | ${contract.status} | ${summary ?? ""} | ${primaryExports} |`
    }),
  )
  const componentIndex = `# En UI component index

Generated from the installed component contracts and READMEs. Use this compact file to discover components, then read only the selected component contract and README. The aggregate contract remains the authoritative export allowlist.

| Component | Status | Purpose | Primary exports |
| --- | --- | --- | --- |
${indexRows.join("\n")}
`

  return {
    aggregate: await prettier.format(JSON.stringify(aggregate), {
      ...prettierOptions,
      parser: "json",
    }),
    componentIndex: await prettier.format(componentIndex, {
      ...prettierOptions,
      parser: "markdown",
    }),
  }
}

export function tokenToVariable(token) {
  const kebab = token
    .split(".")
    .map((part) => part.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase())
    .join("-")
  return `--${kebab}`
}
