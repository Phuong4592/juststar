# Change Proposal: complete-tailwind-component-migration

- Category: `component`
- Compatibility: `compatible`
- Placement: `standalone/workspace-packages`
- Requested maturity: Not requested.

## Intent

Migrate the remaining En UI component catalog from authored BEM styling to Tailwind CSS v4 utilities composed with tailwind-variants, retaining only minimal protected CSS.

## Contract Impact

Existing component variants, sizes, states, anatomy, and behavior remain unchanged while supported component-level CSS variables are made explicit where needed.

## Source Boundary

- `src/components`

## Consumer Boundary

None declared.

## Required Evidence

- `contract`
- `docs`
- `implementation`
- `tests`

## Approval

Proposal approval remains explicit and target-owned.
