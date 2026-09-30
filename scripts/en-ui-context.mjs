#!/usr/bin/env node

import { realpathSync } from "node:fs"
import { readFile } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"

const packageRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")

function normalizeTerms(value) {
  const terms = value
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((term) => term.length > 1)
  const relatedTerms = {
    autocomplete: ["search", "filter", "combobox"],
    modal: ["dialog", "overlay"],
    notification: ["alert", "toast", "feedback"],
    searchable: ["search", "filter"],
  }
  return [...new Set(terms.flatMap((term) => [term, ...(relatedTerms[term] ?? [])]))]
}

function componentName(component) {
  return component.id.replace(/^component\./, "")
}

function readSummary(readme) {
  const paragraphs = readme
    .replace(/```[\s\S]*?```/g, "")
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.replace(/\s+/g, " ").trim())

  return (
    paragraphs.find(
      (paragraph) =>
        paragraph &&
        !paragraph.startsWith("#") &&
        !paragraph.startsWith("Contract ID:") &&
        !paragraph.startsWith("|") &&
        !paragraph.startsWith("-"),
    ) ?? ""
  )
}

function componentDetails(component, readme) {
  return {
    anatomy: component.anatomy.structure,
    capabilities: component.behaviorOwner.capabilities,
    documentation: component.documentation,
    exports: component.exports,
    name: componentName(component),
    props: (component.props ?? []).map((prop) => ({
      default: prop.default,
      description: prop.description,
      name: prop.name,
      values: prop.values,
    })),
    states: component.states,
    status: component.status,
    summary: readSummary(readme),
  }
}

function scoreComponent(details, terms, readme) {
  if (terms.length === 0) return 0
  const searchable = [
    details.name,
    details.summary,
    details.anatomy,
    details.exports.join(" "),
    details.capabilities.join(" "),
    details.states.join(" "),
    details.props.map((prop) => `${prop.name} ${prop.description}`).join(" "),
    readme,
  ]
    .join(" ")
    .toLowerCase()

  let coveredTerms = 0
  const score = terms.reduce((total, term) => {
    const matches = searchable.split(term).length - 1
    const nameBonus = details.name.includes(term) ? 8 : 0
    const exportBonus = details.exports.some((item) => item.toLowerCase().includes(term)) ? 4 : 0
    if (matches > 0) coveredTerms += 1
    return total + Math.min(matches, 6) + nameBonus + exportBonus
  }, 0)
  return score + coveredTerms * 10 + (coveredTerms === terms.length ? 20 : 0)
}

export function parseContextArgs(args) {
  const options = { components: [], json: false, limit: 8, query: "" }
  const query = []

  for (let index = 0; index < args.length; index += 1) {
    const argument = args[index]
    if (argument === "--json") options.json = true
    else if (argument === "--components") {
      options.components = (args[index + 1] ?? "").split(",").filter(Boolean)
      index += 1
    } else if (argument === "--limit") {
      options.limit = Math.max(1, Number.parseInt(args[index + 1] ?? "8", 10) || 8)
      index += 1
    } else query.push(argument)
  }

  options.query = query.join(" ").trim()
  return options
}

export async function buildComponentContext(options = {}) {
  const contract = JSON.parse(
    await readFile(path.join(packageRoot, "contracts", "design-system.contract.json"), "utf8"),
  )
  const requested = new Set(options.components ?? [])
  const terms = normalizeTerms(options.query ?? "")
  const entries = await Promise.all(
    contract.components.map(async (component) => {
      const readmePath = path.join(packageRoot, component.documentation)
      const readme = await readFile(readmePath, "utf8")
      const details = componentDetails(component, readme)
      return { details, readme, score: scoreComponent(details, terms, readme) }
    }),
  )

  let selected
  if (requested.size > 0) {
    selected = entries.filter(({ details }) => requested.has(details.name))
  } else if (terms.length > 0) {
    selected = entries
      .filter(({ score }) => score > 0)
      .sort(
        (left, right) =>
          right.score - left.score || left.details.name.localeCompare(right.details.name),
      )
      .slice(0, options.limit ?? 8)
  } else {
    selected = entries.sort((left, right) => left.details.name.localeCompare(right.details.name))
  }

  return {
    components: selected.map(({ details }) => details),
    designSystemVersion: contract.designSystemVersion,
    package: contract.package,
    query: options.query ?? "",
  }
}

export function formatComponentContext(context) {
  const lines = [
    `# ${context.package} component context`,
    "",
    `Installed version: ${context.designSystemVersion}`,
  ]
  if (context.query) lines.push(`Query: ${context.query}`)

  for (const component of context.components) {
    const displayedExports = component.exports.slice(0, 12)
    const remainingExports = component.exports.length - displayedExports.length
    lines.push(
      "",
      `## ${component.name}`,
      "",
      `${component.summary} Status: ${component.status}.`,
      "",
      `- Exports: ${displayedExports.map((item) => `\`${item}\``).join(", ")}${remainingExports > 0 ? `, plus ${remainingExports} more in the contract` : ""}`,
      `- Anatomy: \`${component.anatomy}\``,
      `- States: ${component.states.join(", ")}`,
      `- Capabilities: ${component.capabilities.join(", ")}`,
      `- Guidance: \`${component.documentation}\``,
      `- Contract: \`src/components/${component.name}/${component.name}.contract.json\``,
    )
    if (component.props.length > 0) {
      lines.push(
        `- Props: ${component.props
          .map((prop) => {
            const values = prop.values?.length ? ` (${prop.values.join(" | ")})` : ""
            return `\`${prop.name}\`${values}`
          })
          .join(", ")}`,
      )
    }
  }

  if (context.components.length === 0) {
    lines.push(
      "",
      "No matching public component was found. Use semantic HTML or report a package capability gap; do not invent an export.",
    )
  }

  return `${lines.join("\n")}\n`
}

async function run() {
  const options = parseContextArgs(process.argv.slice(2))
  const context = await buildComponentContext(options)
  console.log(options.json ? JSON.stringify(context, null, 2) : formatComponentContext(context))
}

function isDirectExecution() {
  if (!process.argv[1]) return false
  try {
    return realpathSync(fileURLToPath(import.meta.url)) === realpathSync(process.argv[1])
  } catch {
    return false
  }
}

if (isDirectExecution()) await run()
