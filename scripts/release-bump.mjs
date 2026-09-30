import fs from "node:fs"

const bump = process.argv[2]
if (!["patch", "minor", "major"].includes(bump)) {
  console.error(`Unknown bump type: ${bump ?? "(missing)"}. Expected patch, minor or major.`)
  process.exit(1)
}

let pending = 0
for (const file of fs.readdirSync(".changeset")) {
  if (!file.endsWith(".md")) continue
  const path = `.changeset/${file}`
  const source = fs.readFileSync(path, "utf8")
  const next = source.replace(/^("@enosta\/en-ui":\s*)[a-z]+$/m, `$1${bump}`)
  if (next !== source) {
    fs.writeFileSync(path, next)
    pending++
  }
}

if (pending === 0) {
  console.error("No pending changesets found in .changeset/, nothing to release.")
  process.exit(1)
}

console.log(`Forced ${pending} pending changeset(s) to ${bump}.`)
