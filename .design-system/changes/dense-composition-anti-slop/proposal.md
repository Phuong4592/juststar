# Evolution Proposal: dense-composition-anti-slop

- Type: `modes-density`
- Scope: `focused`
- Compatibility: `compatible`
- Placement: `standalone/workspace-packages`
- Release classification: `minor`

## Intent

Tune En UI application compositions toward comfortable operational density and add a complete anti-slop prevention catalog for generated interfaces without shrinking readable type, controls, focus treatment, or narrow-screen gutters.

## Decision History

- .design-system/changes/dense-data-foundations/evolution.json
- .design-system/changes/application-ai-workspace-patterns/evolution.json
- .design-system/changes/visual-quality-redesign/evolution.json

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

**Comfortably dense operational and AI workspaces** — Triage incidents and release findings with realistic data while scanning the primary queue, supporting status, parallel AI conversation, and artifact preview at narrow, medium, and wide widths.

Evidence: Updated Storybook examples, source guardrails, accessibility checks, narrow/medium/wide screenshots, first-viewport review, overflow checks, and explicit human visual approval before any baseline or guarded contract change.
