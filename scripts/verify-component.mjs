import { access, readFile } from "node:fs/promises"
import path from "node:path"
import ts from "typescript"

import { components } from "./catalog.mjs"
import {
  componentDirectory,
  componentSource,
  contractPath,
  createContractValidator,
  root,
  schemaErrors,
  tokenToVariable,
} from "./contract-utils.mjs"

const requested = process.argv.slice(2)
const names = requested.length > 0 ? requested : components
const failures = []
const tokenSource = await readFile(path.join(root, "src", "style", "themes", "default.css"), "utf8")
const colorPrefixes =
  "bg|text|border|ring|ring-offset|from|to|via|divide|outline|decoration|fill|stroke|accent|caret|shadow|inset-shadow"
const colorTokenNames = new Set(
  [...tokenSource.matchAll(/^( {2})(--color-[a-z0-9-]+):/gm)].map(([_, _indent, name]) =>
    name.replace("--color-", ""),
  ),
)
const radiusTokenNames = new Set(
  [...tokenSource.matchAll(/^( {2})(--radius-[a-z0-9-]+):/gm)].map(([_, _indent, name]) =>
    name.replace("--radius-", ""),
  ),
)
const shadowTokenNames = new Set(
  [...tokenSource.matchAll(/^( {2})(--shadow-[a-z0-9-]+):/gm)].map(([_, _indent, name]) =>
    name.replace("--shadow-", ""),
  ),
)
const spaceTokenNames = new Set(
  [...tokenSource.matchAll(/^( {2})(--space-[a-z0-9-]+):/gm)].map(([_, _indent, name]) =>
    name.replace("--space-", ""),
  ),
)
const spaceClassPrefixes =
  "gap-x|gap-y|gap|space-x|space-y|px|py|pt|pr|pb|pl|ps|pe|p|mx|my|mt|mr|mb|ml|ms|me|m|scroll-mx|scroll-my|scroll-mt|scroll-mr|scroll-mb|scroll-ml|scroll-ms|scroll-me|scroll-m|scroll-px|scroll-py|scroll-pt|scroll-pr|scroll-pb|scroll-pl|scroll-ps|scroll-pe|scroll-p|translate-x|translate-y|min-w|max-w|min-h|max-h|inset-x|inset-y|inset-s|inset-e|inset|top|right|bottom|left|w|h|size"
const validate = await createContractValidator()

function resolveModule(from, specifier) {
  const base = path.resolve(path.dirname(from), specifier)
  return [base, `${base}.ts`, `${base}.tsx`, path.join(base, "index.ts")].find((candidate) =>
    ts.sys.fileExists(candidate),
  )
}

function collectExports(filename, visited = new Set()) {
  if (!filename || visited.has(filename)) return new Set()
  visited.add(filename)
  const source = ts.createSourceFile(
    filename,
    ts.sys.readFile(filename) ?? "",
    ts.ScriptTarget.Latest,
    true,
  )
  const names = new Set()
  for (const statement of source.statements) {
    if (ts.isExportDeclaration(statement)) {
      if (statement.exportClause && ts.isNamedExports(statement.exportClause)) {
        for (const element of statement.exportClause.elements) names.add(element.name.text)
      } else if (statement.moduleSpecifier && ts.isStringLiteral(statement.moduleSpecifier)) {
        for (const name of collectExports(
          resolveModule(filename, statement.moduleSpecifier.text),
          visited,
        ))
          names.add(name)
      }
      continue
    }
    const exported = statement.modifiers?.some(
      (modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword,
    )
    if (!exported) continue
    if (
      ts.isFunctionDeclaration(statement) ||
      ts.isClassDeclaration(statement) ||
      ts.isInterfaceDeclaration(statement) ||
      ts.isTypeAliasDeclaration(statement) ||
      ts.isEnumDeclaration(statement)
    ) {
      if (statement.name) names.add(statement.name.text)
    } else if (ts.isVariableStatement(statement)) {
      for (const declaration of statement.declarationList.declarations) {
        if (ts.isIdentifier(declaration.name)) names.add(declaration.name.text)
      }
    }
  }
  return names
}

for (const name of names) {
  if (!components.includes(name)) {
    failures.push(`${name}: not found in scripts/catalog.mjs`)
    continue
  }
  const directory = componentDirectory(name)
  const required = [
    `${name}.tsx`,
    `${name}.test.tsx`,
    `${name}.stories.tsx`,
    `${name}.contract.json`,
    "README.md",
    "index.ts",
  ]
  for (const filename of required) {
    try {
      await access(path.join(directory, filename))
    } catch {
      failures.push(`${name}: missing ${filename}`)
    }
  }

  let contract
  try {
    contract = JSON.parse(await readFile(contractPath(name), "utf8"))
  } catch (error) {
    failures.push(`${name}: cannot read contract (${error.message})`)
    continue
  }
  if (!validate(contract)) failures.push(`${name}: ${schemaErrors(validate)}`)
  if (contract.id !== `component.${name}`) failures.push(`${name}: unexpected contract id`)
  if (contract.documentation !== `${componentSource(name)}/README.md`) {
    failures.push(`${name}: documentation path is not colocated`)
  }

  const [story, test, docs, css, implementation] = await Promise.all([
    readFile(path.join(directory, `${name}.stories.tsx`), "utf8"),
    readFile(path.join(directory, `${name}.test.tsx`), "utf8"),
    readFile(path.join(directory, "README.md"), "utf8"),
    readFile(path.join(directory, `${name}.css`), "utf8").catch(() => ""),
    readFile(path.join(directory, `${name}.tsx`), "utf8"),
  ])

  if (!docs.includes(`Contract ID: \`component.${name}\``)) {
    failures.push(`${name}: README must identify its contract id`)
  }
  for (const heading of [
    "## Installation",
    "## Usage",
    "## Anatomy",
    "## API Reference",
    "## Accessibility",
    "## Storybook",
    "## Migration",
  ]) {
    if (!docs.includes(heading)) failures.push(`${name}: README is missing ${heading}`)
  }
  if (!docs.includes("## Guidelines") && !docs.includes("## Guidance")) {
    failures.push(`${name}: README must include component-specific Guidelines or Guidance`)
  }
  if (
    /Define usage|Describe the component's product purpose|Replace this scaffold guidance/.test(
      docs,
    )
  ) {
    failures.push(`${name}: README still contains scaffold placeholder guidance`)
  }
  if (!docs.includes('import "@enosta/en-ui/styles.css"')) {
    failures.push(`${name}: README must use the public @enosta/en-ui/styles.css entry point`)
  }
  if (
    /\b(?:font-(?:sans|serif|mono|thin|light|normal|medium|semibold|bold)|text-(?:xs|sm|base|lg|xl|[2-9]xl)|leading-(?:none|tight|snug|normal|relaxed|loose)|tracking-(?:tighter|tight|wide|wider|widest))\b/.test(
      docs,
    )
  ) {
    failures.push(
      `${name}: README examples must use Typography roles instead of ad-hoc type utilities`,
    )
  }
  for (const expected of contract.exports) {
    if (!docs.includes(`\`${expected}\``)) {
      failures.push(`${name}: README public exports must include ${expected}`)
    }
  }
  for (const requiredStory of contract.requiredStories) {
    if (!new RegExp(`export\\s+const\\s+${requiredStory}\\b`).test(story)) {
      failures.push(`${name}: story ${requiredStory} is required by the contract`)
    }
  }
  for (const requiredTest of contract.requiredTests) {
    if (!test.includes(requiredTest)) {
      failures.push(`${name}: test coverage marker ${requiredTest} is required by the contract`)
    }
  }

  const actualExports = collectExports(path.join(directory, "index.ts"))
  for (const expected of contract.exports) {
    if (!actualExports.has(expected)) failures.push(`${name}: missing declared export ${expected}`)
  }
  for (const token of contract.tokens.required) {
    const variable = tokenToVariable(token)
    if (!tokenSource.includes(variable))
      failures.push(`${name}: missing token ${token} (${variable})`)
  }
  const parts = new Set(contract.publicParts)
  for (const item of contract.anatomy.parts ?? []) {
    if (!parts.has(item.part)) failures.push(`${name}: anatomy part ${item.part} is not public`)
  }
  for (const prop of contract.props ?? []) {
    if (prop.kind === "enum" && prop.default !== undefined && !prop.values.includes(prop.default))
      failures.push(`${name}: prop ${prop.name} default is not one of its values`)
  }
  const componentText = `${css}\n${implementation}`
  if (!implementation.includes('from "../../tailwind-variants"')) {
    failures.push(
      `${name}: styling must import tv/cn from "../../tailwind-variants" (token-aware merge config), not from "tailwind-variants" directly`,
    )
  }
  const authoredCssLines = css
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .split("\n")
    .filter((line) => line.trim().length > 0).length
  if (authoredCssLines > 24) {
    failures.push(
      `${name}: colocated CSS exceeds the 24-line protected-style budget (${authoredCssLines})`,
    )
  }
  for (const variable of [
    ...(contract.componentVariables?.customizable ?? []),
    ...(contract.componentVariables?.protected ?? []),
  ]) {
    if (!componentText.includes(variable)) {
      failures.push(`${name}: component variable ${variable} is declared but unused`)
    }
  }
  const declaredTokens = new Set(contract.tokens.required.map((token) => tokenToVariable(token)))
  const ownVariables = new Set([
    ...(contract.componentVariables?.customizable ?? []),
    ...(contract.componentVariables?.protected ?? []),
  ])
  const referencedVariables = new Set(
    [...componentText.matchAll(/var\((--[a-z0-9-]+)\)|\((--[a-z0-9-]+)\)|:[ ]?(--[a-z0-9-]+)\)/g)]
      .flatMap((match) => [match[1], match[2], match[3]])
      .filter(Boolean),
  )
  for (const match of componentText.matchAll(
    new RegExp(`(?<![\\w-])(${colorPrefixes})-([a-z0-9-]+)(?![\\w-])`, "g"),
  )) {
    if (match[1] === "shadow" && shadowTokenNames.has(match[2])) continue
    if (colorTokenNames.has(match[2])) referencedVariables.add(`--color-${match[2]}`)
  }
  for (const match of componentText.matchAll(
    new RegExp(
      `(?<![\\w-])rounded(-(t|b|s|e|tl|tr|bl|br|ss|se|es|ee))?(-(${[...radiusTokenNames].join("|")}))(?![\\w-])`,
      "g",
    ),
  )) {
    referencedVariables.add(`--radius-${match[3].slice(1)}`)
  }
  for (const match of componentText.matchAll(
    /(?<![\w-])shadow-([a-z0-9-]+)(\/[0-9.]+)?(?![\w-])/g,
  )) {
    if (shadowTokenNames.has(match[1])) referencedVariables.add(`--shadow-${match[1]}`)
  }
  for (const match of componentText.matchAll(/(?<![\w-])font-(sans|mono)(?![\w-])/g)) {
    referencedVariables.add(`--font-family-${match[1]}`)
  }
  for (const match of componentText.matchAll(
    new RegExp(`(?<![\\w-])(${spaceClassPrefixes})-([a-z0-9]+)(?![\\w-])`, "g"),
  )) {
    if (spaceTokenNames.has(match[2])) referencedVariables.add(`--space-${match[2]}`)
  }
  for (const variable of referencedVariables) {
    if (!ownVariables.has(variable) && !declaredTokens.has(variable))
      failures.push(
        `${name}: theme variable ${variable} is used by the implementation but missing from tokens.required`,
      )
  }
  for (const variable of declaredTokens) {
    if (!referencedVariables.has(variable))
      failures.push(`${name}: token ${variable} is declared but unused by the implementation`)
  }
  if (JSON.stringify(contract).includes("@en/react")) failures.push(`${name}: stale package name`)
}

if (failures.length > 0) {
  console.error(failures.join("\n"))
  process.exit(1)
}

console.log(`Verified ${names.length} component contract${names.length === 1 ? "" : "s"}.`)
