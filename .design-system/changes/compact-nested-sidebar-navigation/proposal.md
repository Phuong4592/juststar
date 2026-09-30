# Change Proposal: compact-nested-sidebar-navigation

- Category: `component`
- Compatibility: `compatible`
- Placement: `standalone/workspace-packages`
- Requested maturity: Not requested.

## Intent

Tighten SidebarNavigation's default operational density and add semantic two-level navigation with accessible unavailable-item guidance.

## Contract Impact

SidebarNavigation retains existing landmarks, active, disabled, and collapsed behavior while adding nested-list anatomy, a secondary list level, and an optional disabled reason. Default insets and item geometry become more compact without falling below WCAG 2.2 AA target-size requirements.

## Source Boundary

- `src/components/sidebar-navigation`
- `src/patterns/consumer-pages.stories.tsx`
- `contracts/design-system.contract.json`
- `docs/ai-composition.md`

## Consumer Boundary

None declared.

## Required Evidence

- `contract`
- `docs`
- `implementation`
- `stories`
- `tests`

## Approval

Approved by the user on 2026-08-31.
