# Evolution Proposal: dense-data-foundations

- Type: `modes-density`
- Scope: `focused`
- Compatibility: `compatible`
- Placement: `standalone/workspace-packages`
- Release classification: `minor`

## Intent

Tune En UI for dense operational products with a documented compact typography scale, semantic spacing roles, a complete elevation ladder, explicit interaction-state contrast pairs, and improved selection-control anatomy.

## Decision History

- .design-system/decisions/001-standalone-extraction.md
- .design-system/changes/visual-quality-redesign/evolution.json

## Target Rules

- package.single-boundary
- component.colocation
- a11y.accessible-name
- a11y.focus-visible
- a11y.keyboard
- visual.wcag-aa-contrast
- visual.wcag-aaa-report
- visual.typography-density
- visual.elevation-hierarchy
- visual.interaction-state-contrast
- visual.baseline-review

## Vertical Slice

**Dense operational foundations** — Scan foundation roles, operate primary and destructive actions, select rows, toggle settings, and review the people roster across supported density and viewport settings.

Evidence: Foundation contract and Storybook stories, token audit, component unit tests, catalog accessibility scan, state screenshots, and responsive roster baselines.
