import { readdir, readFile, writeFile } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath, pathToFileURL } from "node:url"

import { format, resolveConfig } from "prettier"
import { storyNameFromExport, toId } from "storybook/internal/csf"
import ts from "typescript"

import { components } from "./catalog.mjs"

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const generatedFilename = path.join(repositoryRoot, ".storybook/generated-story-source.ts")

function propertyName(node) {
  if (ts.isIdentifier(node) || ts.isStringLiteral(node)) return node.text
  return undefined
}

function unwrapExpression(node) {
  let current = node
  while (
    current &&
    (ts.isAsExpression(current) ||
      ts.isParenthesizedExpression(current) ||
      ts.isSatisfiesExpression(current))
  ) {
    current = current.expression
  }
  return current
}

function propertyValue(object, name) {
  object = unwrapExpression(object)
  if (!object || !ts.isObjectLiteralExpression(object)) return undefined
  const property = object.properties.find(
    (item) => ts.isPropertyAssignment(item) && propertyName(item.name) === name,
  )
  return property?.initializer
}

function hasExplicitSourceCode(story) {
  const parameters = propertyValue(story, "parameters")
  const docs = propertyValue(parameters, "docs")
  const source = propertyValue(docs, "source")
  return Boolean(propertyValue(source, "code"))
}

function moduleName(statement) {
  return ts.isStringLiteral(statement.moduleSpecifier) ? statement.moduleSpecifier.text : ""
}

function isStorybookImport(statement) {
  const name = moduleName(statement)
  return name.startsWith("@storybook/") || name.startsWith("storybook/")
}

function declarationNames(statement) {
  const names = []
  if (
    (ts.isFunctionDeclaration(statement) ||
      ts.isClassDeclaration(statement) ||
      ts.isInterfaceDeclaration(statement) ||
      ts.isTypeAliasDeclaration(statement) ||
      ts.isEnumDeclaration(statement)) &&
    statement.name
  ) {
    names.push(statement.name.text)
  }
  if (ts.isVariableStatement(statement)) {
    for (const declaration of statement.declarationList.declarations) {
      if (ts.isIdentifier(declaration.name)) names.push(declaration.name.text)
    }
  }
  return names
}

function topLevelDeclarations(sourceFile) {
  const declarations = new Map()
  for (const statement of sourceFile.statements) {
    if (ts.isImportDeclaration(statement) || ts.isExportDeclaration(statement)) continue
    for (const name of declarationNames(statement)) declarations.set(name, statement)
  }
  return declarations
}

function referencedIdentifiers(node) {
  const names = new Set()
  const visit = (node) => {
    if (ts.isIdentifier(node)) names.add(node.text)
    ts.forEachChild(node, visit)
  }
  visit(node)
  return names
}

function referencedLocalComponents(render, declarations) {
  const names = new Set()
  const visit = (node) => {
    if (ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node)) {
      const tagName = node.tagName.getText()
      if (/^[A-Z]/.test(tagName) && declarations.has(tagName)) names.add(tagName)
    }
    ts.forEachChild(node, visit)
  }
  visit(render)
  return names
}

function metaTitle(sourceFile, declarations) {
  for (const statement of sourceFile.statements) {
    if (!ts.isExportAssignment(statement)) continue
    let meta = statement.expression
    if (ts.isIdentifier(meta)) {
      const declaration = declarations.get(meta.text)
      if (declaration && ts.isVariableStatement(declaration)) {
        const item = declaration.declarationList.declarations.find(
          (candidate) => ts.isIdentifier(candidate.name) && candidate.name.text === meta.text,
        )
        meta = item?.initializer
      }
    }
    const title = propertyValue(meta, "title")
    if (title && ts.isStringLiteralLike(title)) return title.text
  }
  return undefined
}

function dependencyStatements(render, declarations) {
  const selected = new Set()
  const pending = [...referencedIdentifiers(render)]
  while (pending.length > 0) {
    const name = pending.pop()
    const statement = declarations.get(name)
    if (!statement || selected.has(statement)) continue
    selected.add(statement)
    for (const dependency of referencedIdentifiers(statement)) pending.push(dependency)
  }
  return selected
}

function exampleFunction(render, storyName) {
  if (!ts.isArrowFunction(render) && !ts.isFunctionExpression(render)) return render.getText()
  const body = ts.isBlock(render.body)
    ? render.body
    : ts.factory.createBlock([ts.factory.createReturnStatement(render.body)], true)
  const declaration = ts.factory.createFunctionDeclaration(
    [
      ts.factory.createModifier(ts.SyntaxKind.ExportKeyword),
      ts.factory.createModifier(ts.SyntaxKind.DefaultKeyword),
      ...(render.modifiers?.filter((modifier) => modifier.kind === ts.SyntaxKind.AsyncKeyword) ??
        []),
    ],
    render.asteriskToken,
    `${storyName}Example`,
    render.typeParameters,
    render.parameters,
    render.type,
    body,
  )
  return ts
    .createPrinter({ newLine: ts.NewLineKind.LineFeed })
    .printNode(ts.EmitHint.Unspecified, declaration, render.getSourceFile())
}

export function extractStorySources(source, filename = "story.stories.tsx") {
  const sourceFile = ts.createSourceFile(
    filename,
    source,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX,
  )
  const declarations = topLevelDeclarations(sourceFile)
  const title = metaTitle(sourceFile, declarations)
  if (!title) return []
  const imports = sourceFile.statements.filter(
    (statement) => ts.isImportDeclaration(statement) && !isStorybookImport(statement),
  )
  const entries = []

  for (const statement of sourceFile.statements) {
    if (!ts.isVariableStatement(statement)) continue
    const exported = statement.modifiers?.some(
      (modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword,
    )
    if (!exported) continue

    for (const declaration of statement.declarationList.declarations) {
      if (
        !ts.isIdentifier(declaration.name) ||
        !ts.isObjectLiteralExpression(declaration.initializer)
      )
        continue
      const render = propertyValue(declaration.initializer, "render")
      if (!render) continue
      const helpers = referencedLocalComponents(render, declarations)
      if (helpers.size === 0 || hasExplicitSourceCode(declaration.initializer)) continue
      const dependencies = dependencyStatements(render, declarations)
      const statements = sourceFile.statements.filter((item) => dependencies.has(item))
      const code = [
        ...imports.map((item) => item.getText(sourceFile)),
        ...statements.map((item) => item.getText(sourceFile)),
        exampleFunction(render, declaration.name.text),
      ].join("\n\n")
      entries.push({
        code,
        file: filename,
        id: toId(title, storyNameFromExport(declaration.name.text)),
        story: declaration.name.text,
      })
    }
  }

  return entries
}

async function findStoryFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true })
  const files = []
  for (const entry of entries) {
    const target = path.join(directory, entry.name)
    if (entry.isDirectory()) files.push(...(await findStoryFiles(target)))
    else if (/\.stories\.tsx?$/.test(entry.name)) files.push(target)
  }
  return files
}

export async function createStorySourceModule(files) {
  const entries = []
  const config = (await resolveConfig(generatedFilename)) ?? {}
  for (const filename of files) {
    const source = await readFile(filename, "utf8")
    const extracted = extractStorySources(source, path.relative(repositoryRoot, filename))
    for (const entry of extracted) {
      entries.push({
        ...entry,
        code: await format(entry.code, { ...config, parser: "typescript" }),
      })
    }
  }
  entries.sort((left, right) => left.id.localeCompare(right.id))
  const sources = Object.fromEntries(entries.map((entry) => [entry.id, entry.code]))
  return format(
    `// Generated by scripts/verify-story-source.mjs. Do not edit manually.\n\nexport const storySources: Readonly<Record<string, string>> = ${JSON.stringify(sources, null, 2)}\n`,
    { ...config, parser: "typescript" },
  )
}

async function main() {
  const componentStoryFiles = await Promise.all(
    components.map((name) => findStoryFiles(path.join(repositoryRoot, "src", "components", name))),
  )
  const files = [
    ...(await findStoryFiles(path.join(repositoryRoot, "src", "foundations"))),
    ...componentStoryFiles.flat(),
  ]
  const generated = await createStorySourceModule(files)
  const write = process.argv.includes("--write")

  if (write) {
    await writeFile(generatedFilename, generated)
    console.log(`Generated full source for Storybook composition stories.`)
    return
  }

  let current
  try {
    current = await readFile(generatedFilename, "utf8")
  } catch {
    current = undefined
  }
  if (current !== generated) {
    console.error(
      `.storybook/generated-story-source.ts is missing or stale. Run pnpm story:source:generate.`,
    )
    process.exitCode = 1
    return
  }

  console.log(`Verified generated full source for ${files.length} Storybook files.`)
}

if (process.argv[1] && pathToFileURL(path.resolve(process.argv[1])).href === import.meta.url) {
  await main()
}
