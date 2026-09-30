import { components } from "./catalog.mjs"
import { createContractValidator, readContracts, schemaErrors } from "./contract-utils.mjs"

const requested = process.argv.slice(2)
const names = requested.length > 0 ? requested : components
const validate = await createContractValidator()
const failures = []

for (const { contract, name } of await readContracts(names)) {
  if (!validate(contract)) failures.push(`${name}: ${schemaErrors(validate)}`)
}

if (failures.length > 0) {
  console.error(failures.join("\n"))
  process.exit(1)
}

console.log(`Schema-validated ${names.length} component contract${names.length === 1 ? "" : "s"}.`)
