# Evolution Proposal: visual-quality-redesign

- Type: `visual-direction`
- Scope: `focused`
- Compatibility: `compatible`
- Placement: `standalone/workspace-packages`
- Release classification: `minor`

## Intent

Redesign the experimental list-page vertical slice into an intentional operational roster and establish visual-quality governance with semantic contrast pairs, WCAG 2.2 AA gates, AAA reporting, responsive geometry assertions, and approved screenshot baselines.

## Decision History

- .design-system/decisions/001-standalone-extraction.md

## Target Rules

- package.single-boundary
- component.colocation
- a11y.accessible-name
- a11y.focus-visible
- a11y.keyboard

## Vertical Slice

**Operational people roster** — Search and filter people, scan identity and assignment metadata, distinguish status, inspect long content, recover from empty results, and act at mobile, tablet, and desktop widths.

Evidence: Experimental contract, redesigned Storybook stories, WCAG AA token audit, AAA report, responsive geometry tests, accessibility scan, candidate screenshot baselines, and human visual review.
