# Change Proposal: contract-first-tooling

- Category: `tooling`
- Compatibility: `compatible`
- Placement: `standalone/workspace-packages`
- Requested maturity: Not requested.

## Intent

Make component contracts schema-validated, generation-backed, freshness-checked, and verified against implementation, stories, tests, documentation, and the packed consumer boundary.

## Contract Impact

Component JSON contracts become the authoritative source for generated variant and size metadata, with stronger repository checks preventing drift.

## Source Boundary

- `contracts/component.schema.json`

## Consumer Boundary

None declared.

## Required Evidence

- `docs`
- `implementation`
- `tests`

## Approval

Proposal approval remains explicit and target-owned.
