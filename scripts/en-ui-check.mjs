#!/usr/bin/env node

import { readFileSync, realpathSync } from "node:fs"
import { readFile, readdir, stat } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"

const sourceExtensions = new Set([".js", ".jsx", ".ts", ".tsx"])
const ignoredDirectories = new Set([".git", "coverage", "dist", "node_modules", "storybook-static"])
const packageRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const applicationCompositionExports = new Set([
  "AIChatPage",
  "AIChatPageProps",
  "AIWorkspace",
  "AIWorkspaceProps",
  "ApplicationHeader",
  "ApplicationHeaderProps",
  "ApplicationShell",
  "ApplicationShellProps",
  "LoginPage",
  "LoginPageProps",
  "PageContainer",
  "PageContainerProps",
  "PageHeader",
  "PageHeaderProps",
  "PageSection",
  "PageSectionProps",
  "SidebarNavigation",
  "SidebarNavigationFooter",
  "SidebarNavigationGroup",
  "SidebarNavigationGroupLabel",
  "SidebarNavigationGroupProps",
  "SidebarNavigationItem",
  "SidebarNavigationItemProps",
  "SidebarNavigationList",
  "SidebarNavigationListProps",
  "SidebarNavigationProps",
  "SplitLayout",
  "SplitLayoutProps",
  "applicationHeaderVariants",
  "applicationShellVariants",
  "pageContainerVariants",
  "pageHeaderVariants",
  "pageSectionVariants",
  "sidebarNavigationVariants",
  "splitLayoutVariants",
])

function loadPublicExports() {
  try {
    const contract = JSON.parse(
      readFileSync(path.join(packageRoot, "contracts", "design-system.contract.json"), "utf8"),
    )
    return new Set(contract.components.flatMap((component) => component.exports))
  } catch {
    return null
  }
}

const publicExports = loadPublicExports()

const rules = [
  {
    id: "en-ui/no-foreign-component-library",
    message: "Use an @enosta/en-ui component instead of another UI library.",
    pattern:
      /from\s+["'](?:@mui|antd|@chakra-ui|@mantine|semantic-ui|react-bootstrap|@radix-ui)\b/g,
  },
  {
    id: "en-ui/no-internal-import",
    message: "Import only from documented @enosta/en-ui package entry points.",
    pattern: /from\s+["']@enosta\/en-ui\/(?:dist|src|components|internal)\b/g,
  },
  {
    id: "en-ui/no-raw-color",
    message: "Use an En UI semantic color token instead of a raw color value.",
    pattern: /#[0-9a-f]{3,8}\b|\b(?:rgb|rgba|hsl|hsla|oklch)\s*\(/gi,
  },
  {
    id: "en-ui/no-inline-visual-style",
    message: "Use En UI components and semantic tokens instead of inline visual styles.",
    pattern: /style\s*=\s*\{\{/g,
  },
  {
    id: "en-ui/no-native-table",
    message:
      "Use En UI Table so semantic structure, responsive overflow, and row states remain protected.",
    pattern: /<table\b/g,
  },
  {
    id: "en-ui/no-arbitrary-tailwind",
    message: "Use a semantic CSS variable instead of an arbitrary Tailwind value.",
    pattern:
      /\b(?:bg|text|border|ring|fill|stroke|p[trblxy]?|m[trblxy]?|gap|space-[xy]|w|h|min-w|max-w|min-h|max-h)-\[(?![^\]]*var\(--[a-z0-9-]+\))[^\]]+\]/g,
  },
  {
    id: "en-ui/no-tailwind-spacing-scale",
    message: "Use an En UI spacing token instead of Tailwind's numeric spacing scale.",
    pattern: /\b(?:p[trblxy]?|m[trblxy]?|gap|space-[xy])-[0-9]+(?:\.[0-9]+)?\b/g,
  },
  {
    id: "en-ui/no-spacing-token-as-max-width",
    message:
      "Named or numeric max-width classes derive from spacing vocabularies. Use a consumer semantic variable such as max-w-[var(--content-width)] with an explicit width value.",
    pattern: /\bmax-w-(?:3xs|xs|sm|md|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl|prose|[0-9]+(?:\.[0-9]+)?)\b/g,
  },
  {
    id: "en-ui/no-ad-hoc-typography",
    message:
      "Use a Typography compound preset instead of choosing font family, size, weight, line height, or tracking in consumer code.",
    pattern:
      /\b(?:font-(?:sans|serif|mono|display|heading|thin|extralight|light|normal|medium|semibold|bold|extrabold|black|\[[^\]]+\]|\([^)]+\))|text-(?:xs|sm|base|lg|xl|[2-9]xl|\[[^\]]+\]|\(length:[^)]+\))(?:\/[^\s"'`}]+)?|leading-(?:none|tight|snug|normal|relaxed|loose|[0-9]+(?:\.[0-9]+)?|\[[^\]]+\]|\([^)]+\))|tracking-(?:tighter|tight|normal|wide|wider|widest|\[[^\]]+\]|\([^)]+\)))/g,
  },
  {
    id: "en-ui/no-layout-transition",
    message:
      "Animate transform or opacity instead of transition-all or layout properties such as width, height, padding, and margin.",
    pattern: /\btransition-all\b|\btransition-\[[^\]]*(?:width|height|padding|margin)[^\]]*\]/g,
  },
]

function lineAt(source, index) {
  return source.slice(0, index).split("\n").length
}

function addDiagnostic(diagnostics, source, filename, index, ruleId, message) {
  diagnostics.push({
    column: index - source.lastIndexOf("\n", index),
    file: filename,
    line: lineAt(source, index),
    message,
    ruleId,
  })
}

export function analyzeSource(source, filename = "source.tsx") {
  const diagnostics = []
  for (const rule of rules) {
    rule.pattern.lastIndex = 0
    for (const match of source.matchAll(rule.pattern)) {
      addDiagnostic(diagnostics, source, filename, match.index, rule.id, rule.message)
    }
  }

  const nativeControls = new Map([
    ["button", "Button"],
    ["input", "Input"],
    ["meter", "Meter"],
    ["progress", "Progress"],
    ["select", "Select"],
    ["textarea", "Textarea"],
  ])
  for (const match of source.matchAll(/<(button|input|meter|progress|select|textarea)\b/g)) {
    const nativeName = match[1]
    const enUiName = nativeControls.get(nativeName)
    if (publicExports?.has(enUiName)) {
      addDiagnostic(
        diagnostics,
        source,
        filename,
        match.index,
        "en-ui/no-native-control",
        `Use En UI ${enUiName} so accessibility and states remain protected.`,
      )
    }
  }

  for (const match of source.matchAll(/import\s*\{([\s\S]*?)\}\s*from\s*["']@enosta\/en-ui["']/g)) {
    const specifiers = match[1].split(",")
    for (const specifier of specifiers) {
      const imported = specifier
        .replace(/\/\*[\s\S]*?\*\//g, "")
        .trim()
        .replace(/^type\s+/, "")
        .split(/\s+as\s+/)[0]
        .trim()
      if (!/^[A-Za-z_$][\w$]*$/.test(imported)) continue
      const offset = match[0].indexOf(imported)
      if (applicationCompositionExports.has(imported)) {
        addDiagnostic(
          diagnostics,
          source,
          filename,
          match.index + Math.max(0, offset),
          "en-ui/no-package-composition",
          `"${imported}" is application composition. Define this layout or pattern in the consumer using semantic HTML and En UI atoms.`,
        )
        continue
      }
      if (!publicExports || publicExports.has(imported)) continue
      addDiagnostic(
        diagnostics,
        source,
        filename,
        match.index + Math.max(0, offset),
        "en-ui/no-unavailable-export",
        `"${imported}" is not exported by the installed @enosta/en-ui contract.`,
      )
    }
  }

  for (const match of source.matchAll(/\btext-\[([0-9]*\.?[0-9]+)(px|rem)\]/g)) {
    const size = Number(match[1]) * (match[2] === "rem" ? 16 : 1)
    if (size < 11) {
      addDiagnostic(
        diagnostics,
        source,
        filename,
        match.index,
        "en-ui/no-tiny-functional-text",
        "Keep functional text at 11px or larger and body content at 14px or larger.",
      )
    }
  }

  for (const match of source.matchAll(/<img\b[^>]*>/gs)) {
    const tag = match[0]
    const src = /\bsrc\s*=\s*(?:"([^"]*)"|'([^']*)'|\{\s*([^}]+?)\s*\})/s.exec(tag)
    const value = (src?.[1] ?? src?.[2] ?? src?.[3] ?? "").trim()
    const missingWithoutSpread = !src && !/\{\.\.\./.test(tag)
    const placeholder =
      value === "" ||
      value === "#" ||
      /^(?:null|undefined)$/i.test(value) ||
      /(?:^|[/_-])placeholder(?:[/_-]|\.|$)/i.test(value)
    if (missingWithoutSpread || (src && placeholder)) {
      addDiagnostic(
        diagnostics,
        source,
        filename,
        match.index,
        "en-ui/no-placeholder-image",
        "Use a valid image source, or remove the image element.",
      )
    }
  }

  const usesVisualTruncation = /\b(?:truncate|text-ellipsis|line-clamp-|textOverflow)\b/.test(
    source,
  )
  const usesProtectedTruncation = /\bTruncatedText\b/.test(source)
  if (usesVisualTruncation && !usesProtectedTruncation) {
    diagnostics.push({
      column: 1,
      file: filename,
      line: 1,
      message:
        "Preserve the complete value with wrapping, an accessible name, or a discoverable full-value affordance.",
      ruleId: "en-ui/accessible-truncation",
    })
  }
  return diagnostics
}

async function collectFiles(target) {
  const metadata = await stat(target)
  if (metadata.isFile()) return sourceExtensions.has(path.extname(target)) ? [target] : []
  const entries = await readdir(target, { withFileTypes: true })
  const files = []
  for (const entry of entries) {
    if (entry.isDirectory() && ignoredDirectories.has(entry.name)) continue
    const resolved = path.join(target, entry.name)
    if (entry.isDirectory()) files.push(...(await collectFiles(resolved)))
    else if (sourceExtensions.has(path.extname(entry.name))) files.push(resolved)
  }
  return files
}

async function run() {
  const json = process.argv.includes("--json")
  const requested = process.argv.slice(2).filter((argument) => argument !== "--json")
  const targets = requested.length > 0 ? requested : ["src"]
  const files = (
    await Promise.all(targets.map((target) => collectFiles(path.resolve(target))))
  ).flat()
  const diagnostics = (
    await Promise.all(
      files.map(async (file) =>
        analyzeSource(await readFile(file, "utf8"), path.relative(process.cwd(), file)),
      ),
    )
  ).flat()

  if (json) console.log(JSON.stringify({ diagnostics, valid: diagnostics.length === 0 }, null, 2))
  else if (diagnostics.length === 0)
    console.log(`En UI guardrails passed for ${files.length} file(s).`)
  else {
    for (const item of diagnostics) {
      console.error(`${item.file}:${item.line}:${item.column} ${item.ruleId} ${item.message}`)
    }
  }
  if (diagnostics.length > 0) process.exitCode = 1
}

function isDirectExecution() {
  if (!process.argv[1]) return false
  try {
    return realpathSync(fileURLToPath(import.meta.url)) === realpathSync(process.argv[1])
  } catch {
    return false
  }
}

const isCli = isDirectExecution()
if (isCli) await run()
