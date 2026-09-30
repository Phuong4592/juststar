# Evolution Proposal: theme-exploration

- Type: `visual-direction`
- Scope: `focused`
- Compatibility: `compatible`
- Placement: `standalone/workspace-packages`
- Release classification: `minor`

## Intent

Explore a multi-theme direction for En UI through an opt-in Storybook vertical slice covering default light, default dark, neobrutalism, glassmorphism, neumorphism, Bauhaus, terminal, editorial, pop, and high-contrast styles without changing public component APIs or the published theme contract.

## Decision History

- .design-system/decisions/001-standalone-extraction.md
- .design-system/changes/dense-data-foundations/evolution.json
- .design-system/changes/visual-quality-redesign/evolution.json

## Target Rules

- a11y.accessible-name
- a11y.focus-visible
- a11y.keyboard
- visual.wcag-aa-contrast
- visual.wcag-aaa-report
- visual.responsive-geometry
- visual.baseline-review
- visual.typography-density
- visual.elevation-hierarchy
- visual.interaction-state-contrast

## Vertical Slice

**Multi-theme operations dashboard** — Scan ten renewal records, filter operational data, select accounts, compare risk and ownership, review activity and capacity, and trigger playbook actions across the proposed visual directions.

Evidence: Storybook theme toolbar, a responsive comparison story, a built Storybook, deterministic repository checks, and human review before any public contract or baseline change.
