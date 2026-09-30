# Prototype and specification flows

Prototype generation, specification, and production implementation are separate tasks. Connect them through discoverable artifacts, but do not require all three for every feature.

## Choose the prototype format

Use the cheapest artifact that resolves the important uncertainty:

- Use ASCII for information architecture, hierarchy, navigation, block relationships, content order, and rough responsive transformations.
- Use responsive HTML when geometry, density, interaction, scrolling, responsive transformation, or component behavior needs realistic validation.
- Use an image when visual direction, atmosphere, imagery, or composition is the main uncertainty. En UI remains the atom and token authority, not the owner of page art direction.

Do not generate all formats by default. A small change may need no durable prototype.

## Prototype flow

Before producing the artifact:

1. Read product and feature context using [context-discovery.md](context-discovery.md).
2. Identify the primary user, job to be done, decision or action, and success state.
3. Inspect nearby application screens and installed En UI capabilities.
4. Select the prototype format based on the uncertainty being tested.
5. Use [component-selection.md](component-selection.md) to record consequential component decisions before the prototype establishes misleading anatomy.

Every substantial prototype should make these decisions visible:

- Interface purpose, intended experience, and primary content or task.
- Content and action priority.
- Major regions and their hierarchy.
- The hierarchy and visual emphasis that communicate the intended purpose, story, or task.
- Likely En UI atoms, verified against the installed version, plus consumer-owned semantic and layout structures.
- Default, loading, empty, error, long-content, disabled, and permission-sensitive states that affect layout.
- Narrow, medium, and wide behavior derived from consumer configuration, including whether each major region stays, wraps, reorders, condenses, becomes a disclosure, scrolls, or changes representation.
- Assumptions, unresolved decisions, and deliberate departures from nearby screens.

For a substantial page, shell, or feature surface, include the compact decision record from [composition-quality.md](composition-quality.md) in the prototype or working notes. Its purpose is to make intent, hierarchy, and responsive transformations explicit before implementation, not to prescribe one layout.

Run the composition checklist in [composition-quality.md](composition-quality.md) before presenting the prototype. Place durable artifacts beside the consumer's related specifications or design work.
Use [composition-exploration.md](composition-exploration.md) when the product does not already have an accepted direction. Explore from the brief rather than copying a stock page shape.

A prototype task stops after the requested prototype and its rationale. Do not modify production code unless the user also asked for implementation.

## Specification flow

When converting an accepted prototype into a specification:

1. Store the specification beside the accepted prototype or in the consumer's established specification location.
2. Link to the prototype rather than restating every visual detail.
3. Record product purpose, user roles, permissions, page anatomy, content hierarchy, responsive transformations, states, interactions, data assumptions, and acceptance criteria.
4. Distinguish En UI-owned behavior from application-owned domain behavior.
5. Name unavailable En UI capabilities as gaps; do not specify imports that the installed package does not provide.
6. Preserve unresolved decisions explicitly instead of filling them with generic product or category defaults.

The specification becomes implementation context in a later task. It does not itself authorize production implementation.

## Implementation discovery

An implementation task should search for accepted prototypes and specifications using the feature name and local artifact conventions. When found, treat them as context according to the authority order in `SKILL.md`.

If none exists, continue from the user's request, `PRODUCT.md`, requirements, existing routes, and installed En UI guidance. For substantial page work, still record the lightweight composition decisions required by `SKILL.md`; do not create a placeholder prototype merely to satisfy process.
