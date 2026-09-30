import { mkdir, readFile, writeFile } from "node:fs/promises"
import path from "node:path"

import { generatedOutputs, root } from "./contract-utils.mjs"

const check = process.argv.includes("--check")
const outputs = await generatedOutputs()
const targets = [
  [path.join(root, "contracts", "design-system.contract.json"), outputs.aggregate],
  [path.join(root, "contracts", "component-index.md"), outputs.componentIndex],
]

if (check) {
  const stale = []
  for (const [target, expected] of targets) {
    let actual = ""
    try {
      actual = await readFile(target, "utf8")
    } catch {
      // A missing generated file is stale by definition.
    }
    if (actual !== expected) stale.push(path.relative(root, target))
  }
  if (stale.length > 0) {
    console.error(`Generated contract output is stale: ${stale.join(", ")}`)
    console.error("Run pnpm contract:generate and commit the result.")
    process.exit(1)
  }
  console.log("Generated contract outputs are current.")
} else {
  await mkdir(path.join(root, "contracts"), { recursive: true })
  for (const [target, contents] of targets) await writeFile(target, contents)
  console.log("Generated aggregate contract.")
}
