# Change Proposal: minor-ui-release-fixes

- Category: `tooling`
- Compatibility: `compatible`
- Placement: `standalone/workspace-packages`
- Requested maturity: Not requested.

## Intent

Correct documentation-site button foreground colors, keep Alert Dialog stories closed until viewers trigger them, and apply the queued minor release version.

## Contract Impact

No component, token, behavior, or accessibility contract changes. The fixes affect repository documentation styling, Storybook presentation defaults, and release metadata only.

## Source Boundary

- `docs/site/src`
- `src/components/alert-dialog/alert-dialog.stories.tsx`

## Consumer Boundary

None declared.

## Required Evidence

- `docs`
- `implementation`
- `tests`

## Approval

Proposal approval remains explicit and target-owned.
