# Evolution Proposal: ai-composition-guardrails

- Type: `public-anatomy`
- Scope: `focused`
- Compatibility: `compatible`
- Placement: `standalone/workspace-packages`
- Release classification: `minor`

## Intent

Introduce an experimental layout and list-page composition slice with AI-consumer instructions and automated checks so teams assemble En UI pages using approved components, tokens, spacing, responsive behavior, truncation, and accessibility rules.

## Decision History

- .design-system/decisions/001-standalone-extraction.md

## Target Rules

- package.single-boundary
- component.colocation
- a11y.accessible-name
- a11y.focus-visible
- a11y.keyboard

## Vertical Slice

**Responsive list page** — Compose a page header, token-spaced filter toolbar, responsive results layout, accessible truncation, and empty state using En UI primitives.

Evidence: Experimental contracts, colocated tests and stories, mobile/tablet/desktop Storybook review, accessibility checks, and consumer guardrail fixtures.
