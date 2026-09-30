# Audit Report: visual-quality-baseline

- Placement: `standalone/workspace-packages`
- Commands: 5
- Findings: 6

## Commands

- `pnpm check`: recorded
- `pnpm test`: recorded
- `pnpm typecheck`: recorded
- `pnpm build`: recorded
- `pnpm dev`: recorded

## Findings

### review.weak-page-hierarchy

- Kind: `review`
- Severity: `observation`
- Source: `src/components/experimental-list-page/experimental-list-page.stories.tsx`
- Message: The page header, filter panel, results heading, and result cards use nearly identical surface and border treatments, so primary task, supporting controls, and content have weak visual hierarchy.
- Remediation: Establish a deliberate page composition with a distinct masthead, compact task-focused filter region, and a single structured results surface rather than isolated generic cards.
- Documentation: En UI visual-quality review rubric

### review.monotone-spacing-rhythm

- Kind: `review`
- Severity: `observation`
- Source: `src/components/experimental-list-page/experimental-list-page.tsx`
- Message: Most relationships reuse 16px or 24px spacing without distinguishing tightly related content, component internals, section boundaries, and page-level rhythm.
- Remediation: Define named composition spacing roles and verify rendered relationships at mobile, tablet, and desktop widths.
- Documentation: En UI visual-quality review rubric

### review.filter-action-misalignment

- Kind: `review`
- Severity: `observation`
- Source: `src/components/experimental-list-page/experimental-list-page.stories.tsx`
- Message: The clear action is visually detached from the fields and aligns with the control edge rather than the filter task, producing an accidental floating-button appearance.
- Remediation: Give the toolbar explicit anatomy for search, secondary filters, result count, and reset action with breakpoint-specific alignment.
- Documentation: En UI visual-quality review rubric

### review.unowned-result-layout

- Kind: `review`
- Severity: `observation`
- Source: `src/components/experimental-list-page/experimental-list-page.stories.tsx`
- Message: Result cards are authored directly in the story, leaving identity, metadata, status, action alignment, truncation, and responsive behavior outside the pattern contract.
- Remediation: Move result-row anatomy into the experimental pattern so consumers and AI agents cannot invent these relationships independently.
- Documentation: En UI composition contract guidance

### review.aa-contrast-risk

- Kind: `review`
- Severity: `observation`
- Source: `src/tokens/tokens.css`
- Message: The danger action color is approximately 4.26:1 on the default surface and the strong control border is approximately 2.79:1 on a raised surface, below WCAG AA expectations for normal text and required UI boundaries.
- Remediation: Adopt explicit semantic contrast pairs, darken the danger text role and control-boundary role, and enforce their ratios with deterministic token tests.
- Documentation: WCAG 2.2 SC 1.4.3 and SC 1.4.11

### review.missing-visual-quality-gate

- Kind: `review`
- Severity: `observation`
- Source: `.design-system/project.json`
- Message: Current checks validate code, contracts, packaging, and accessibility semantics but have no approved screenshot baseline, rendered geometry assertions, or token contrast audit.
- Remediation: Add a design-check command covering WCAG AA token pairs, AAA reporting, responsive geometry, overflow, target sizes, and approved visual snapshots.
- Documentation: En UI visual-quality governance
