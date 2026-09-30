# Change Proposal: contract-anatomy-canvas

- Category: `tooling`
- Compatibility: `compatible`
- Placement: `standalone/workspace-packages`
- Requested maturity: Not requested.

## Intent

Add a standalone, full-width documentation-site canvas that combines realistic En UI component specimens with the existing component and pattern contract anatomy, parts, and slots. Keep secondary descriptions and metadata available through compact, accessible disclosure controls without changing the contract schema or Storybook.

## Contract Impact

Component and pattern contracts remain authoritative and schema-compatible. The documentation build reads their existing `anatomy.structure`, `anatomy.parts`, `slots`, status, and behavior-owner fields for annotations, then uses package components and token-aligned illustrative content to make the geometry recognizable without adding contract fields.

## Source Boundary

- `docs`
- `scripts`

## Consumer Boundary

None declared.

## Required Evidence

- `docs`
- `implementation`
- `tests`

## Approval

Approved by the user on 2026-09-03.
