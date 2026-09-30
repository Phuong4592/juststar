import { spawnSync } from "node:child_process"
import path from "node:path"

import { components } from "./catalog.mjs"
import { root } from "./contract-utils.mjs"

for (const script of ["validate-contracts.mjs", "verify-component.mjs"]) {
  const result = spawnSync(process.execPath, [path.join(root, "scripts", script)], {
    cwd: root,
    stdio: "inherit",
  })
  if (result.status !== 0) process.exit(result.status ?? 1)
}

console.log(`Verified ${components.length} contract-first component boundaries.`)
