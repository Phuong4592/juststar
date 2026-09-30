import { spawnSync } from "node:child_process"
import { mkdir, mkdtemp, readFile, readdir, rm, writeFile } from "node:fs/promises"
import os from "node:os"
import path from "node:path"
import { fileURLToPath } from "node:url"
import ts from "typescript"

import { components } from "./catalog.mjs"
import { componentSource } from "./contract-utils.mjs"

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")

async function componentRuntimeExports(name) {
  const filename = path.join(root, componentSource(name), "index.ts")
  const source = ts.createSourceFile(
    filename,
    await readFile(filename, "utf8"),
    ts.ScriptTarget.Latest,
    true,
  )
  const exports = []

  for (const statement of source.statements) {
    if (!ts.isExportDeclaration(statement) || statement.isTypeOnly) continue
    if (!statement.exportClause || !ts.isNamedExports(statement.exportClause)) continue
    for (const element of statement.exportClause.elements) {
      if (!element.isTypeOnly) exports.push(element.name.text)
    }
  }

  return exports
}

const manifest = JSON.parse(await readFile(path.join(root, "package.json"), "utf8"))
if (manifest.name !== "@enosta/en-ui") throw new Error("Unexpected package name")
if (!/^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/.test(manifest.version)) {
  throw new Error("Package version must be valid semantic version metadata")
}
if (manifest.publishConfig?.registry !== "https://npm.pkg.github.com") {
  throw new Error("GitHub Packages registry is not configured")
}

const temporary = await mkdtemp(path.join(os.tmpdir(), "en-ui-package-"))
try {
  const packed = spawnSync("pnpm", ["pack", "--pack-destination", temporary], {
    cwd: root,
    encoding: "utf8",
    env: { ...process.env, npm_config_ignore_scripts: "true" },
  })
  if (packed.status !== 0) throw new Error(packed.stderr || packed.stdout || "pnpm pack failed")
  const archiveName = (await readdir(temporary)).find((name) => name.endsWith(".tgz"))
  if (!archiveName) throw new Error("pnpm pack did not create an archive")
  const archive = path.join(temporary, archiveName)
  const listed = spawnSync("tar", ["-tzf", archive], { encoding: "utf8" })
  if (listed.status !== 0) throw new Error(listed.stderr || "Unable to inspect package archive")
  const entries = listed.stdout.trim().split("\n")
  const required = [
    "package/dist/index.js",
    "package/dist/index.d.ts",
    "package/dist/styles.css",
    "package/src/style/themes/default.css",
    "package/src/style/tailwind-theme.css",
    "package/contracts/component.schema.json",
    "package/contracts/component-index.md",
    "package/contracts/design-system.contract.json",
    "package/contracts/theme.contract.json",
    "package/.agents/skills/en-ui-consumer/SKILL.md",
    "package/.agents/skills/en-ui-consumer/assets/PRODUCT.template.md",
    "package/.agents/skills/en-ui-consumer/references/composition-quality.md",
    "package/.agents/skills/en-ui-consumer/references/composition-exploration.md",
    "package/.agents/skills/en-ui-consumer/references/component-selection.md",
    "package/.agents/skills/en-ui-consumer/references/context-discovery.md",
    "package/.agents/skills/en-ui-consumer/references/application-pattern-contracts.md",
    "package/.agents/skills/en-ui-consumer/references/implementation.md",
    "package/.agents/skills/en-ui-consumer/references/prototype-and-spec.md",
    "package/.agents/skills/en-ui-consumer/references/rendered-validation.md",
    "package/.agents/skills/en-ui-consumer/references/visual-quality-loop.md",
    "package/.agents/skills/en-ui-consumer/references/wcag-policy.md",
    "package/.agents/skills/en-ui-consumer/scripts/rendered-page-audit.mjs",
    "package/.agents/skills/en-ui-visual-audit/SKILL.md",
    "package/.agents/skills/en-ui-visual-audit/agents/openai.yaml",
    "package/scripts/en-ui-audit.mjs",
    "package/scripts/en-ui-audit-options.mjs",
    "package/scripts/en-ui-check.mjs",
    "package/scripts/en-ui-context.mjs",
    "package/scripts/en-ui-init-ai.mjs",
    "package/AGENTS.md",
    "package/DESIGN.md",
    "package/docs/foundations.md",
    "package/llms.txt",
  ]
  for (const name of components) {
    const source = componentSource(name)
    required.push(`package/${source}/${name}.contract.json`)
    required.push(`package/${source}/README.md`)
  }
  const packedStyles = spawnSync("tar", ["-xOzf", archive, "package/dist/styles.css"], {
    encoding: "utf8",
  })
  if (packedStyles.status !== 0) {
    throw new Error(packedStyles.stderr || "Unable to inspect packaged styles")
  }
  const fontFiles = new Set(
    [...packedStyles.stdout.matchAll(/url\(["']?\.\/files\/([^"')]+)["']?\)/g)].map(
      (match) => match[1],
    ),
  )
  for (const filename of fontFiles) required.push(`package/dist/files/${filename}`)
  for (const expected of required) {
    if (!entries.includes(expected)) throw new Error(`Packed archive is missing ${expected}`)
  }
  const privateCompositionDirectories = [
    "package/src/components/application-header/",
    "package/src/components/application-shell/",
    "package/src/components/page-container/",
    "package/src/components/page-header/",
    "package/src/components/page-section/",
    "package/src/components/sidebar-navigation/",
    "package/src/components/split-layout/",
    "package/src/patterns/",
  ]
  const leakedComposition = entries.filter((entry) =>
    privateCompositionDirectories.some((directory) => entry.startsWith(directory)),
  )
  if (leakedComposition.length > 0) {
    throw new Error(`Application composition leaked into archive: ${leakedComposition.join(", ")}`)
  }
  const forbidden = entries.filter(
    (entry) =>
      entry.includes(".storybook") ||
      entry.includes("storybook-static") ||
      entry.endsWith(".stories.tsx") ||
      entry.endsWith(".test.tsx") ||
      entry.endsWith(".tsx"),
  )
  if (forbidden.length > 0)
    throw new Error(`Development files leaked into archive: ${forbidden.join(", ")}`)

  const consumer = path.join(temporary, "consumer")
  await mkdir(consumer)
  await writeFile(
    path.join(consumer, "package.json"),
    JSON.stringify({ private: true, type: "module" }),
  )
  const install = spawnSync(
    "pnpm",
    [
      "add",
      "--prefer-offline",
      "--ignore-scripts",
      archive,
      `react@${manifest.devDependencies.react}`,
      `react-dom@${manifest.devDependencies["react-dom"]}`,
    ],
    { cwd: consumer, encoding: "utf8" },
  )
  if (install.status !== 0)
    throw new Error(install.stderr || install.stdout || "Consumer install failed")

  const consumerSource = path.join(consumer, "src")
  await mkdir(consumerSource)
  await writeFile(
    path.join(consumerSource, "invalid.tsx"),
    'import { Stack } from "@enosta/en-ui"\nexport function Invalid() { return <input style={{ color: "#ff0000" }} /> }\n',
  )

  const initialize = spawnSync("pnpm", ["exec", "en-ui-init-ai"], {
    cwd: consumer,
    encoding: "utf8",
  })
  if (initialize.status !== 0)
    throw new Error(initialize.stderr || initialize.stdout || "Consumer skill install failed")
  if (!initialize.stdout.includes("Installed En UI product composition instructions")) {
    throw new Error("Consumer skill installer did not execute through pnpm")
  }
  const checkInstructions = spawnSync("pnpm", ["exec", "en-ui-init-ai", "--check"], {
    cwd: consumer,
    encoding: "utf8",
  })
  if (checkInstructions.status !== 0) {
    throw new Error(
      checkInstructions.stderr || checkInstructions.stdout || "Installed AI instructions are stale",
    )
  }
  const componentContext = spawnSync("pnpm", ["exec", "en-ui-context", "searchable", "selection"], {
    cwd: consumer,
    encoding: "utf8",
  })
  if (componentContext.status !== 0 || !componentContext.stdout.includes("## combobox")) {
    throw new Error(
      componentContext.stderr ||
        componentContext.stdout ||
        "Component context did not discover Combobox",
    )
  }
  const installedSkillFiles = [
    path.join(consumer, ".agents", "skills", "en-ui-consumer", "SKILL.md"),
    path.join(
      consumer,
      ".agents",
      "skills",
      "en-ui-consumer",
      "references",
      "prototype-and-spec.md",
    ),
    path.join(consumer, ".agents", "skills", "en-ui-consumer", "assets", "PRODUCT.template.md"),
    path.join(
      consumer,
      ".agents",
      "skills",
      "en-ui-consumer",
      "references",
      "component-selection.md",
    ),
    path.join(
      consumer,
      ".agents",
      "skills",
      "en-ui-consumer",
      "references",
      "visual-quality-loop.md",
    ),
    path.join(
      consumer,
      ".agents",
      "skills",
      "en-ui-consumer",
      "references",
      "workflow-integration.md",
    ),
    path.join(consumer, ".agents", "skills", "en-ui-consumer", "references", "wcag-policy.md"),
    path.join(
      consumer,
      ".agents",
      "skills",
      "en-ui-consumer",
      "scripts",
      "rendered-page-audit.mjs",
    ),
    path.join(consumer, ".agents", "skills", "en-ui-visual-audit", "SKILL.md"),
  ]
  for (const installed of installedSkillFiles) await readFile(installed, "utf8")

  const guardrails = spawnSync("pnpm", ["exec", "en-ui-check", "src", "--json"], {
    cwd: consumer,
    encoding: "utf8",
  })
  if (guardrails.status !== 1) {
    throw new Error(
      guardrails.stderr || guardrails.stdout || "Consumer guardrails returned an unexpected status",
    )
  }
  const guardrailReport = JSON.parse(guardrails.stdout)
  const guardrailRules = new Set(guardrailReport.diagnostics.map((item) => item.ruleId))
  for (const expected of [
    "en-ui/no-inline-visual-style",
    "en-ui/no-native-control",
    "en-ui/no-raw-color",
    "en-ui/no-unavailable-export",
  ]) {
    if (!guardrailRules.has(expected)) {
      throw new Error(`Consumer guardrails did not report ${expected} through pnpm`)
    }
  }

  const runtimeExports = []
  for (const name of components) {
    runtimeExports.push(...(await componentRuntimeExports(name)))
  }
  const smoke = spawnSync(
    process.execPath,
    [
      "--input-type=module",
      "--eval",
      `import { createRequire } from "node:module"; const ui = await import("@enosta/en-ui"); const missing = ${JSON.stringify(runtimeExports)}.filter((name) => !(name in ui)); if (missing.length) throw new Error("Missing exports: " + missing.join(", ")); const require = createRequire(process.cwd() + "/consumer.mjs"); require.resolve("@enosta/en-ui/styles.css"); require.resolve("@enosta/en-ui/themes/default.css"); require.resolve("@enosta/en-ui/tailwind.css"); require.resolve("@enosta/en-ui/fonts.css"); require.resolve("@enosta/en-ui/button.css"); require.resolve("@enosta/en-ui/contract.json"); require.resolve("@enosta/en-ui/theme.json"); require.resolve("@enosta/en-ui/foundations.md");`,
    ],
    { cwd: consumer, encoding: "utf8" },
  )
  if (smoke.status !== 0)
    throw new Error(smoke.stderr || smoke.stdout || "Consumer smoke test failed")

  const privateRuntimeExports = [
    "AIChatPage",
    "AIWorkspace",
    "ApplicationHeader",
    "ApplicationShell",
    "LoginPage",
    "PageContainer",
    "PageHeader",
    "PageSection",
    "SidebarNavigation",
    "SplitLayout",
  ]
  const privateSmoke = spawnSync(
    process.execPath,
    [
      "--input-type=module",
      "--eval",
      `const ui = await import("@enosta/en-ui"); const leaked = ${JSON.stringify(privateRuntimeExports)}.filter((name) => name in ui); if (leaked.length) throw new Error("Private composition exports: " + leaked.join(", "));`,
    ],
    { cwd: consumer, encoding: "utf8" },
  )
  if (privateSmoke.status !== 0) {
    throw new Error(
      privateSmoke.stderr || privateSmoke.stdout || "Private export smoke test failed",
    )
  }
} finally {
  await rm(temporary, { force: true, recursive: true })
}

console.log(`Packed, inspected, installed, and smoke-tested ${manifest.name}.`)
