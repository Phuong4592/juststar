# Change Proposal: documentation-site

- Category: `tooling`
- Compatibility: `compatible`
- Placement: `standalone/workspace-packages`
- Requested maturity: Not requested.

## Intent

Add a light-mode React documentation site that consumes En UI components for the landing page and installation/customization guide while keeping Storybook as the interactive catalog.

## Contract Impact

The package exports, component contracts, semantic tokens, runtime behavior, and accessibility guarantees remain unchanged. The repository-hosted documentation becomes a first-party consumer of the existing package source and remains outside the published archive.

## Source Boundary

- `docs`
- `.storybook`

## Consumer Boundary

None declared.

## Required Evidence

- `docs`
- `implementation`
- `tests`

## Approval

Proposal approval remains explicit and target-owned.
