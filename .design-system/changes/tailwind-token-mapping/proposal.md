# Evolution Proposal: tailwind-token-mapping

- Type: `token-taxonomy`
- Scope: `catalog-wide`
- Compatibility: `compatible`
- Placement: `standalone/workspace-packages`
- Release classification: `minor`

## Intent

Introduce a Tailwind CSS v4 semantic mapping layer and tailwind-variants implementation pattern while preserving En UI CSS variables, public APIs, visuals, behavior, and accessibility.

## Decision History

- .design-system/decisions/001-standalone-extraction.md

## Target Rules

- a11y.accessible-name
- a11y.focus-visible
- a11y.keyboard
- component.colocation
- package.single-boundary

## Vertical Slice

**Core action and form feedback** — Enter a labelled value, submit an action, and receive persistent feedback through Button, Field/Input, and Alert.

Evidence: Existing component tests, required Storybook stories, contract checks, package archive smoke tests, and live Storybook startup.
