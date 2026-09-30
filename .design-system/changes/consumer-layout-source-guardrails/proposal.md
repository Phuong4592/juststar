# Change Proposal: consumer-layout-source-guardrails

- Category: `component`
- Compatibility: `compatible`
- Placement: `standalone/workspace-packages`
- Requested maturity: Not requested.

## Intent

Prevent wrapped fixed-height button labels, under-padded summary cells, and nested-pane overflow, and require composed Storybook stories to expose complete copyable source.

## Contract Impact

Button preserves existing APIs and interaction behavior while guaranteeing a single-line visible label within its fixed control height. Consumer compositions reflow against their split or resizable pane width. Rendered audits add diagnostics for control-label overflow, bordered summary cells without minimum inline insets, and nested responsive regions wider than their pane. Storybook composition stories retain their rendered output while exposing generated full implementation source.

## Source Boundary

- `src/components/button`
- `src/patterns/consumer-pages.stories.tsx`
- `.storybook`
- `scripts`
- `.agents/skills/en-ui-consumer`

## Consumer Boundary

None declared.

## Required Evidence

- `accessibility`
- `contract`
- `docs`
- `implementation`
- `stories`
- `tests`

## Approval

Approved by the user on 2026-08-31.
