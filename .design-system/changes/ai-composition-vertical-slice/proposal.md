# Change Proposal: ai-composition-vertical-slice

- Category: `pattern`
- Compatibility: `compatible`
- Placement: `standalone/workspace-packages`
- Requested maturity: Not requested.

## Intent

Add an experimental responsive list-page composition, accessible truncation behavior, AI-consumer instructions, and deterministic guardrail checks without expanding the stable package API.

## Contract Impact

A colocated experimental contract defines the responsive list-page pattern and truncation accessibility behavior. Stable component contracts, exports, tokens, and package behavior remain unchanged.

## Source Boundary

- `src/components/experimental-list-page`
- `docs`
- `.storybook`

## Consumer Boundary

None declared.

## Required Evidence

- `contract`
- `docs`
- `implementation`
- `tests`

## Approval

Proposal approval remains explicit and target-owned.
