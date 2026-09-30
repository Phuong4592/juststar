#!/usr/bin/env node

import { createHash } from "node:crypto"
import { existsSync, realpathSync } from "node:fs"
import { cp, mkdir, readFile, readdir, writeFile } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"

const packageRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const skillNames = ["en-ui-consumer", "en-ui-visual-audit"]
const installManifestName = "en-ui-install.json"

async function directoryDigest(directory) {
  const hash = createHash("sha256")

  async function visit(current, prefix = "") {
    const entries = await readdir(current, { withFileTypes: true })
    entries.sort((left, right) => left.name.localeCompare(right.name))
    for (const entry of entries) {
      const relative = path.posix.join(prefix, entry.name)
      const resolved = path.join(current, entry.name)
      hash.update(relative)
      if (entry.isDirectory()) await visit(resolved, relative)
      else hash.update(await readFile(resolved))
    }
  }

  await visit(directory)
  return hash.digest("hex")
}

async function sourceManifest() {
  const packageManifest = JSON.parse(await readFile(path.join(packageRoot, "package.json"), "utf8"))
  const skills = {}
  for (const skillName of skillNames) {
    skills[skillName] = await directoryDigest(
      path.join(packageRoot, ".agents", "skills", skillName),
    )
  }
  return { package: packageManifest.name, version: packageManifest.version, skills }
}

export function findInstallRoot(requestedRoot = process.cwd()) {
  const startingRoot = path.resolve(requestedRoot)
  let currentRoot = startingRoot

  while (true) {
    if (existsSync(path.join(currentRoot, "pnpm-workspace.yaml"))) return currentRoot

    const parentRoot = path.dirname(currentRoot)
    if (parentRoot === currentRoot) return startingRoot
    currentRoot = parentRoot
  }
}

export async function installAiInstructions(requestedRoot) {
  const targetRoot = requestedRoot ? path.resolve(requestedRoot) : findInstallRoot()
  const targetDirectories = {}

  for (const skillName of skillNames) {
    const sourceDirectory = path.join(packageRoot, ".agents", "skills", skillName)
    const targetDirectory = path.join(targetRoot, ".agents", "skills", skillName)

    await mkdir(path.dirname(targetDirectory), { recursive: true })
    await cp(sourceDirectory, targetDirectory, { force: true, recursive: true })
    targetDirectories[skillName] = targetDirectory
  }

  const manifest = await sourceManifest()
  await writeFile(
    path.join(targetRoot, ".agents", installManifestName),
    `${JSON.stringify(manifest, null, 2)}\n`,
  )

  return {
    targetDirectory: targetDirectories["en-ui-consumer"],
    targetDirectories,
    targetRoot,
  }
}

export async function checkAiInstructions(requestedRoot) {
  const targetRoot = requestedRoot ? path.resolve(requestedRoot) : findInstallRoot()
  const expected = await sourceManifest()
  let installed
  try {
    installed = JSON.parse(
      await readFile(path.join(targetRoot, ".agents", installManifestName), "utf8"),
    )
  } catch {
    return { current: false, reason: "missing install manifest", targetRoot }
  }

  if (installed.package !== expected.package || installed.version !== expected.version) {
    return { current: false, reason: "package version changed", targetRoot }
  }

  for (const skillName of skillNames) {
    const targetDirectory = path.join(targetRoot, ".agents", "skills", skillName)
    let digest
    try {
      digest = await directoryDigest(targetDirectory)
    } catch {
      return { current: false, reason: `${skillName} is missing`, targetRoot }
    }
    if (digest !== expected.skills[skillName] || installed.skills?.[skillName] !== digest) {
      return {
        current: false,
        reason: `${skillName} differs from the installed package`,
        targetRoot,
      }
    }
  }

  return { current: true, targetRoot }
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
if (isCli) {
  const args = process.argv.slice(2)
  if (args[0] === "--check") {
    const result = await checkAiInstructions(args[1])
    if (result.current) console.log(`En UI AI instructions are current in ${result.targetRoot}.`)
    else {
      console.error(`En UI AI instructions are stale: ${result.reason}. Run en-ui-init-ai.`)
      process.exitCode = 1
    }
  } else {
    const { targetDirectories, targetRoot } = await installAiInstructions(args[0])
    const installed = skillNames
      .map((skillName) => path.relative(targetRoot, targetDirectories[skillName]))
      .join(" and ")
    console.log(`Installed En UI product composition instructions at ${installed}.`)
  }
}
