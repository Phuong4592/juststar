# Dense-data foundations baseline audit

Date: 2026-08-25

## Findings

1. **Typography is undocumented and oversized for the product direction.** Storybook has no typography foundation page, the default body is 16px, and the experimental page title can reach 60px. This reduces useful information density and leaves teams and AI agents without a named type-role contract.
2. **Spacing has a scale but weak semantic coverage.** Component values mostly use the 4px scale, while composition jumps to 32px sections and 48px pages. There are no semantic inset or stack roles for dense application layouts.
3. **Elevation is incomplete.** The system exposes structure, overlay, and dragged shadows but no low or raised level. Components therefore choose between flat borders and large floating shadows.
4. **Interactive contrast is not audited by state.** Default semantic color pairs pass AA, but hover combinations for Button and IconButton are not declared. IconButton primary can inherit the generic subtle hover surface while retaining on-action text.
5. **Selection controls need stronger anatomy.** Checkbox draws its tick with pixel-positioned CSS borders. Switch combines label, state text, and control into a large setting row, which limits reuse in dense forms and tables.
6. **Component tests protect behavior, not rendered states.** Unit tests cover core semantics, but there is no catalog-wide automated Storybook accessibility pass or visual coverage for hover, checked, mixed, disabled, and density states.

## Direction

Adopt a dense operational foundation: restrained typography, semantic compact spacing, border-led depth with a complete elevation ladder, explicit interaction-state color pairs, icon-based selection marks, and automated component-story accessibility coverage.
