import { spawnSync } from "node:child_process"
import { mkdir, mkdtemp, readFile, rm, symlink, writeFile } from "node:fs/promises"
import os from "node:os"
import path from "node:path"
import { fileURLToPath } from "node:url"

const scriptsDirectory = path.dirname(fileURLToPath(import.meta.url))

describe("packaged consumer commands", () => {
  it("runs en-ui-check through a symlinked bin entry", async () => {
    const temporary = await mkdtemp(path.join(os.tmpdir(), "en-ui-check-bin-"))

    try {
      const entry = path.join(temporary, "en-ui-check.mjs")
      const sourceDirectory = path.join(temporary, "src")
      const source = path.join(sourceDirectory, "invalid.tsx")
      await symlink(path.join(scriptsDirectory, "en-ui-check.mjs"), entry)
      await mkdir(sourceDirectory)
      await writeFile(
        source,
        'export function Invalid() { return <div className="animate-pulse"><input style={{ color: "#ff0000" }} /><img alt="Missing" /></div> }\n',
      )

      const result = spawnSync(process.execPath, [entry, sourceDirectory, "--json"], {
        encoding: "utf8",
      })
      const report = JSON.parse(result.stdout)

      expect(result.status).toBe(1)
      expect(report.valid).toBe(false)
      expect(report.diagnostics.map((item: { ruleId: string }) => item.ruleId)).toEqual(
        expect.arrayContaining([
          "en-ui/no-inline-visual-style",
          "en-ui/no-native-control",
          "en-ui/no-placeholder-image",
          "en-ui/no-raw-color",
        ]),
      )
    } finally {
      await rm(temporary, { force: true, recursive: true })
    }
  })

  it("runs en-ui-init-ai through a symlinked bin entry", async () => {
    const temporary = await mkdtemp(path.join(os.tmpdir(), "en-ui-init-bin-"))

    try {
      const entry = path.join(temporary, "en-ui-init-ai.mjs")
      const target = path.join(temporary, "consumer")
      await symlink(path.join(scriptsDirectory, "en-ui-init-ai.mjs"), entry)

      const result = spawnSync(process.execPath, [entry, target], { encoding: "utf8" })
      const installedSkill = await readFile(
        path.join(target, ".agents", "skills", "en-ui-consumer", "SKILL.md"),
        "utf8",
      )
      const installedAudit = await readFile(
        path.join(target, ".agents", "skills", "en-ui-visual-audit", "SKILL.md"),
        "utf8",
      )

      expect(result.status).toBe(0)
      expect(result.stdout).toContain("Installed En UI product composition instructions")
      expect(installedSkill).toContain("# En UI Consumer")
      expect(installedAudit).toContain("# En UI Visual Audit")
    } finally {
      await rm(temporary, { force: true, recursive: true })
    }
  })

  it("installs AI instructions at the workspace root from a member package", async () => {
    const temporary = await mkdtemp(path.join(os.tmpdir(), "en-ui-init-workspace-bin-"))

    try {
      const entry = path.join(temporary, "en-ui-init-ai.mjs")
      const memberRoot = path.join(temporary, "apps", "web")
      await symlink(path.join(scriptsDirectory, "en-ui-init-ai.mjs"), entry)
      await mkdir(memberRoot, { recursive: true })
      await writeFile(path.join(temporary, "pnpm-workspace.yaml"), "packages:\n  - apps/*\n")

      const result = spawnSync(process.execPath, [entry], {
        cwd: memberRoot,
        encoding: "utf8",
      })
      const installedSkill = await readFile(
        path.join(temporary, ".agents", "skills", "en-ui-consumer", "SKILL.md"),
        "utf8",
      )

      expect(result.status).toBe(0)
      expect(result.stdout).toContain("Installed En UI product composition instructions")
      expect(installedSkill).toContain("# En UI Consumer")
    } finally {
      await rm(temporary, { force: true, recursive: true })
    }
  })
})
