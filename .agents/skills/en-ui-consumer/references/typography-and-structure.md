# Typography and structural separation

Use this guidance for every generated En UI page, component composition, prototype, specification, and visual review.

## Canonical typography

`Typography` is the only public En UI text API. Do not import the removed `Text` component and do not recreate typography roles with Tailwind font family, size, weight, line-height, or tracking utilities.

Use the smallest semantic preset that communicates the hierarchy:

| Intent                                   | Preset                   | Size / line height | Weight   |
| ---------------------------------------- | ------------------------ | ------------------ | -------- |
| Rare product masthead                    | `Typography.Display`     | 40px / 46px        | Bold     |
| Page title                               | `Typography.H1`          | 32px / 38px        | Semibold |
| Section or overlay title                 | `Typography.H2`          | 28px / 34px        | Semibold |
| Card or panel title                      | `Typography.H3`          | 24px / 29px        | Semibold |
| Compact subsection heading               | `Typography.H4`          | 20px / 25px        | Semibold |
| Nested heading                           | `Typography.H5`          | 16px / 21px        | Semibold |
| Small nested heading                     | `Typography.H6`          | 14px / 18px        | Semibold |
| Introductory prose                       | `Typography.Lead`        | 18px / 28px        | Regular  |
| Default interface copy                   | `Typography.Text`        | 16px / 24px        | Regular  |
| Supporting copy                          | `Typography.Small`       | 14px / 20px        | Regular  |
| Short metadata or caption                | `Typography.Caption`     | 12px / 17px        | Regular  |
| Field or compact data label              | `Typography.Label`       | 14px / 17px        | Semibold |
| Machine-oriented text                    | `Typography.Mono`        | 16px / 24px        | Regular  |
| Emphasized machine-oriented text         | `Typography.MonoStrong`  | 18px / 27px        | Semibold |
| Compact machine-oriented text            | `Typography.MonoSmall`   | 14px / 21px        | Regular  |
| Short code-like or machine-oriented text | `Typography.MonoCaption` | 12px / 16px        | Regular  |
| Code                                     | `Typography.Code`        | 16px / 24px        | Regular  |
| Restrained category label                | `Typography.Eyebrow`     | 11px / 13px        | Semibold |

Preserve heading order. When the semantic level differs from the visual role, use a compound preset's `as` prop, for example `<Typography.H3 as="h2">`, rather than selecting a different size or adding utility classes.

Nunito is the interface family, including product identifiers, timestamps, dates, currency, counts, environment names, and versions. Choose `Typography.H5`, `Typography.Label`, `Typography.Text`, `Typography.Small`, or `Typography.Caption` for those values according to hierarchy. Geist Mono is an intentional exception for code, commands, file paths, hashes, serialized values, and other machine-oriented text. Fallback fonts provide loading and failure resilience; they are not an alternate visual direction. Any other font requires an explicit product or design-system decision.

Use `className` on Typography for semantic color, width, alignment, wrapping, or spacing only. Do not use it to change font family, size, weight, line height, or tracking.

## Canonical spacing

Use the installed named spacing scale. `space.md` is 8px, exposed as `--space-md` in CSS and through utilities such as `gap-md`, `p-md`, and `space-y-md`.

| Token       | Value |
| ----------- | ----: |
| `space.2xs` |   2px |
| `space.xs`  |   4px |
| `space.sm`  |   6px |
| `space.md`  |   8px |
| `space.lg`  |  10px |
| `space.xl`  |  12px |
| `space.2xl` |  14px |
| `space.3xl` |  16px |
| `space.4xl` |  20px |
| `space.5xl` |  24px |
| `space.6xl` |  32px |

Spacing tokens define available distances, not a required page anatomy. Choose them from the consumer's content relationships and accepted pattern contract: 4-8px commonly keeps one compact group together, 10-16px separates related groups, and 20-32px separates larger regions. Consumer layouts may use different arrangements and responsive transformations while staying on this scale.

## Separation ladder

Choose the least structural device that makes the relationship clear:

1. Use semantic spacing to group related content and separate different thoughts. Build layout in the consumer with En UI spacing variables. Do not invent or import package layout helpers such as `Space`, `Stack`, page containers, shells, or sections.
2. Strengthen the title or supporting text hierarchy when a section boundary is already understandable from content and spacing.
3. Use `Separator` or a neutral border only for a meaningful boundary, such as a change of group, a sticky-region edge, a resizable split, or a dense ledger row that would otherwise be difficult to track.
4. Use a Card or raised surface only when the region is an independently actionable, selectable, movable, or stacked object.
5. Use Table only when users compare multiple records through stable columns. Preserve its installed row boundaries, hover treatment, and selected emphasis instead of restyling records as independent cards.

Do not stack several devices for the same boundary. A heading plus section spacing usually does not also need a separator and a card. A card usually does not need internal separators between every short text group. A table owns its row structure and should not be wrapped in repeated row cards.

Alternating table surfaces improve row tracking but do not replace semantic headers, accessible names, focus treatment, or a non-color selected-state cue.
