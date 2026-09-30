# Dense composition and anti-slop research

## Outcome

En UI should become denser through composition choices, not a global token squeeze. The target is a comfortable operational mode that removes repeated empty space and unnecessary card depth while preserving readable 14px body text, 28px to 32px controls, focus treatment, line height, and at least 16px narrow-screen gutters.

## Current pressure points

- `PageSection` surface padding rises from 16px to 24px and repeats inside pages that already have 24px section gaps.
- `SplitLayout` rises from 16px to 24px to 32px between columns even when both regions are dense operational surfaces.
- Consumer examples commonly combine 24px page padding, 24px page gaps, 24px surface padding, repeated descriptions, and nested secondary surfaces.
- Passive metric rows can displace the primary queue from the first viewport, especially when every metric gets equal geometry.
- Current example slop includes routine eyebrow labels, thick one-sided accent borders, and a generated-artifact kicker above a normal heading.

## Proposed comfortable-density values

| Relationship               |      Narrow | Medium and wide | Guardrail                                                          |
| -------------------------- | ----------: | --------------: | ------------------------------------------------------------------ |
| Page gutter                |        16px |            24px | Never remove the narrow gutter.                                    |
| Major page regions         |        16px |            24px | Use 32px only for true page landmarks or mode changes.             |
| Split-layout columns       |        16px |            24px | Avoid 32px by default in operational workspaces.                   |
| Surface inset              |        12px |            16px | Keep at least 8px for any bounded colored or bordered region.      |
| Section heading to content |        12px |            16px | Heading stays closer to its own content than the previous section. |
| Related rows or controls   | 8px to 12px |     8px to 12px | Do not reuse one gap at every hierarchy level.                     |

The values reuse existing En UI spacing roles. No new raw token or theme edit is required for the representative slice.

## Surface strategy

1. Use one dominant surface for the primary task.
2. Keep supporting rails plain or separated by dividers unless they need an independent scroll, selection, or stacking boundary.
3. Avoid a card around a table when the table already owns a card treatment.
4. Remove repeated descriptions or metadata before reducing type size.
5. Keep shadows for overlays and real stacking; use borders for ordinary structure.

## Impeccable catalog mapping

The rendered catalog was inspected on 2026-08-31. It currently renders 65 cards: 4 personalized drift checks, 38 AI-slop patterns, and 23 general-quality patterns. It labels 48 as CLI/source, 12 as browser/rendered, and 5 as LLM-only. The page header still says 64 patterns and 59 deterministic rules, so En UI records the rendered names and categories rather than relying on those totals.

The complete adapted list lives in `.agents/skills/en-ui-consumer/references/anti-slop-catalog.md`.

## Enforcement map

| Layer                       | Best use                                     | Initial En UI targets                                                                                                                                                                     |
| --------------------------- | -------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Consumer source checker     | High-confidence syntax and imports           | Raw colors, arbitrary values, foreign libraries, decorative gradients, one-sided thick borders, pulse/marquee/bounce motion, layout-property animation, tiny type, invalid image sources. |
| Contract and skill guidance | Composition rules and approved exceptions    | Density values, card justification, eyebrow semantics, metric placement, surface flattening, font/radius/type authority.                                                                  |
| Rendered validation         | Geometry and runtime evidence                | Overflow, clipping, edge gutters, line length, first-viewport column balance, heading spacing, target sizes, contrast, load errors.                                                       |
| Human visual review         | Product meaning and recognizable AI defaults | Glassmorphism, extreme rounding, amateur illustration, hero metrics, identical card grids, palette intent, imagery quality.                                                               |

## Representative slice

### Service Operations

- Keep the incident queue as the dominant work surface.
- Move the passive metric ledger after the primary work rather than ahead of it.
- Reduce page and supporting-rail gaps from repeated 24px/32px rhythm to 16px/24px.
- Replace the date eyebrow with ordinary page metadata.
- Preserve the data table, full values, status badges, and responsive scroll ownership.

### AI Release Review

- Reduce chat header, message-list, and preview insets to the comfortable-density range.
- Remove the routine generated-artifact kicker and one-sided assistant-message accent.
- Replace the hero-like metric strip with a compact neutral decision summary.
- Preserve the resizable parallel layout, narrow Chat/Preview switching, message log semantics, and composer target sizes.

## Approval gates

- The consumer-skill catalog and representative stories can be refined without guarded-file edits.
- Adding density props or changing defaults in `*.contract.json` requires explicit user approval.
- Changing `src/style/themes/default.css` is not required by this direction and remains out of scope.
- Candidate screenshots require human review; visual baselines must not be updated automatically.
