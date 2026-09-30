# Change Proposal: separate-visual-checks

- Category: `tooling`
- Compatibility: `compatible`
- Placement: `standalone/workspace-packages`
- Requested maturity: Not requested.

## Intent

Keep deterministic browser quality checks in the default design-system gate while moving pixel screenshot comparisons and baseline updates to explicit visual-review commands.

## Contract Impact

No public component, token, behavior, or accessibility contract changes. Repository tooling continues to enforce WCAG 2.2 AA, contrast, responsive geometry, overflow, target sizes, and interaction behavior by default; pixel baselines become an explicit advisory review workflow.

## Source Boundary

- `docs/ai-composition.md`

## Consumer Boundary

None declared.

## Required Evidence

- `docs`
- `implementation`
- `tests`

## Approval

Proposal approval remains explicit and target-owned.
