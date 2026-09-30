# Evolution Proposal: application-ai-workspace-patterns

- Type: `public-anatomy`
- Scope: `focused`
- Compatibility: `compatible`
- Placement: `standalone/workspace-packages`
- Release classification: `minor`

## Intent

Add a coherent application-layout and AI-workspace pattern layer so consumers can assemble responsive product shells, bounded page content, reusable in-page sections, full-page conversations, and parallel chat-and-preview workflows from En UI-owned anatomy.

## Decision History

- .design-system/decisions/001-standalone-extraction.md
- .design-system/changes/ai-composition-guardrails/evolution.json
- .design-system/changes/stable-product-patterns/evolution.json
- .design-system/changes/dense-data-foundations/evolution.json

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

**AI-assisted operational workspace** — Navigate an application shell, open a bounded work page, start an AI conversation, stream a response, inspect and resize an artifact preview, recover from preview errors, and switch between Chat and Preview on a narrow viewport.

Evidence: Authoritative contracts, colocated React implementations, Storybook scenarios, unit and interaction tests, keyboard-resize coverage, accessibility scans, mobile/tablet/desktop screenshots, long-content checks, and consumer composition guidance.
