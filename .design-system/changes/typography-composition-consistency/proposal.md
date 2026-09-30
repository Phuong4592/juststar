# Evolution Proposal: typography-composition-consistency

- Type: `typography-icons-motion`
- Scope: `catalog-wide`
- Compatibility: `breaking`
- Placement: `standalone/workspace-packages`
- Release classification: `major`

## Intent

Make Typography the single public text API, align every preset to the compact Nunito foundation, restrict alternate fonts to purposeful technical content, reduce decorative separators, and make alternating table rows the accessible default.

## Decision History

- .design-system/changes/dense-data-foundations/evolution.json
- .design-system/changes/dense-composition-anti-slop/evolution.json
- .design-system/changes/ai-composition-guardrails/evolution.json

## Target Rules

- package.single-boundary
- component.colocation
- a11y.accessible-name
- a11y.focus-visible
- a11y.keyboard
- visual.wcag-aa-contrast
- visual.wcag-aaa-report
- visual.composition-spacing
- visual.responsive-geometry
- visual.baseline-review
- visual.typography-density
- visual.elevation-hierarchy
- visual.interaction-state-contrast

## Vertical Slice

**Canonical operational typography** — Scan page and section hierarchy, operate dialogs and cards, compare dense table rows, and review navigation and authentication compositions across narrow, medium, and wide viewports.

Evidence: Typography and Table contracts, component stories and tests, consumer guardrail tests, package typecheck and build, deterministic token checks, responsive layout checks, and visual diffs held for human approval.
