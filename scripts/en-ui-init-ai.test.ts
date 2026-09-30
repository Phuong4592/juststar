import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises"
import os from "node:os"
import path from "node:path"

import { checkAiInstructions, findInstallRoot, installAiInstructions } from "./en-ui-init-ai.mjs"

describe("En UI consumer skill installer", () => {
  it("installs the consumer and visual-audit skills with supporting resources", async () => {
    const targetRoot = await mkdtemp(path.join(os.tmpdir(), "en-ui-consumer-skill-"))

    try {
      const { targetDirectory, targetDirectories } = await installAiInstructions(targetRoot)
      const skill = await readFile(path.join(targetDirectory, "SKILL.md"), "utf8")
      const prototype = await readFile(
        path.join(targetDirectory, "references", "prototype-and-spec.md"),
        "utf8",
      )
      const productTemplate = await readFile(
        path.join(targetDirectory, "assets", "PRODUCT.template.md"),
        "utf8",
      )
      const compositionExploration = await readFile(
        path.join(targetDirectory, "references", "composition-exploration.md"),
        "utf8",
      )
      const renderedAudit = await readFile(
        path.join(targetDirectory, "scripts", "rendered-page-audit.mjs"),
        "utf8",
      )
      const componentSelection = await readFile(
        path.join(targetDirectory, "references", "component-selection.md"),
        "utf8",
      )
      const visualQualityLoop = await readFile(
        path.join(targetDirectory, "references", "visual-quality-loop.md"),
        "utf8",
      )
      const workflowIntegration = await readFile(
        path.join(targetDirectory, "references", "workflow-integration.md"),
        "utf8",
      )
      const wcagPolicy = await readFile(
        path.join(targetDirectory, "references", "wcag-policy.md"),
        "utf8",
      )
      const visualAudit = await readFile(
        path.join(targetDirectories["en-ui-visual-audit"], "SKILL.md"),
        "utf8",
      )

      expect(skill).toContain("Do not load the other references")
      expect(skill).toContain("pnpm exec en-ui-context")
      expect(skill).toContain("Consumer-owned semantic layout tokens are allowed")
      expect(prototype).toContain("Use the cheapest artifact")
      expect(productTemplate).toContain("## Register")
      expect(compositionExploration).toContain("Preserve creative range")
      expect(renderedAudit).toContain("text-horizontal-clipping")
      expect(componentSelection).toContain("Component selection record")
      expect(componentSelection).toContain("consumer-owned semantic `section`")
      expect(componentSelection).toContain("contracts/component-index.md")
      expect(componentSelection).toContain("src/components/<name>/<name>.contract.json")
      expect(visualQualityLoop).toContain("Screenshot-first structural review")
      expect(visualQualityLoop).toContain("Review foundations")
      expect(workflowIntegration).toContain("Smallest complete change")
      expect(workflowIntegration).toContain("cannot substitute for browser evidence")
      expect(wcagPolicy).toContain("WCAG 2.2 AA target size")
      expect(visualAudit).toContain("# En UI Visual Audit")
      expect(visualAudit).toContain("consumer WCAG policy")
      expect(visualAudit).toContain("Use `en-ui-context`")
      expect(await checkAiInstructions(targetRoot)).toEqual(
        expect.objectContaining({ current: true, targetRoot }),
      )

      await writeFile(path.join(targetDirectory, "SKILL.md"), `${skill}\nlocal change\n`)
      expect(await checkAiInstructions(targetRoot)).toEqual(
        expect.objectContaining({
          current: false,
          reason: "en-ui-consumer differs from the installed package",
        }),
      )
    } finally {
      await rm(targetRoot, { force: true, recursive: true })
    }
  })

  it("targets the pnpm workspace root when invoked from a member package", async () => {
    const workspaceRoot = await mkdtemp(path.join(os.tmpdir(), "en-ui-consumer-workspace-"))
    const memberRoot = path.join(workspaceRoot, "apps", "web")

    try {
      await mkdir(memberRoot, { recursive: true })
      await writeFile(path.join(workspaceRoot, "pnpm-workspace.yaml"), "packages:\n  - apps/*\n")

      expect(findInstallRoot(memberRoot)).toBe(workspaceRoot)
    } finally {
      await rm(workspaceRoot, { force: true, recursive: true })
    }
  })

  it("keeps standalone installs in the requested directory", async () => {
    const standaloneRoot = await mkdtemp(path.join(os.tmpdir(), "en-ui-consumer-standalone-"))

    try {
      expect(findInstallRoot(standaloneRoot)).toBe(standaloneRoot)
    } finally {
      await rm(standaloneRoot, { force: true, recursive: true })
    }
  })
})
