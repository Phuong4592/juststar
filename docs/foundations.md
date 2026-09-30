# En UI foundations

En UI uses a dense operational foundation for products that display large tables, filters, metadata, and multi-step workflows. CSS variables are the customization boundary; consumers should not replace component classes.

## Tailwind tokens

Consumers running their own Tailwind CSS v4 setup can generate the same design-token utilities as the library (`bg-brand-500`, `text-heading-2`, `rounded-surface`, `shadow-overlay`, `p-4xl`, ...). Import the token variables and the Tailwind theme aliases into your CSS entry:

```css
@import "tailwindcss";
@import "@enosta/en-ui/themes/default.css";
@import "@enosta/en-ui/tailwind.css";
```

`@enosta/en-ui/tailwind.css` only maps En UI tokens to Tailwind utility names; it does not disable any default Tailwind utilities, so it is safe to combine with your own theme. Design tokens also remain available directly as CSS variables, for example `var(--color-brand-500)` or `var(--shadow-overlay)`. Keep `@enosta/en-ui` on one version so components, tokens, and generated utilities stay in sync.

## Typography

| Role       | Component preset     | Default | Use                                      |
| ---------- | -------------------- | ------: | ---------------------------------------- |
| Caption    | `Typography.Caption` |  `12px` | Metadata and short captions              |
| Body small | `Typography.Small`   |  `14px` | Supporting copy and dense table content  |
| Body       | `Typography.Text`    |  `16px` | Default application and interface copy   |
| Body large | `Typography.Lead`    |  `18px` | Introductory or emphasized prose         |
| Heading 6  | `Typography.H6`      |  `14px` | Small nested headings                    |
| Heading 5  | `Typography.H5`      |  `16px` | Nested headings                          |
| Heading 4  | `Typography.H4`      |  `20px` | Compact subsections                      |
| Heading 3  | `Typography.H3`      |  `24px` | Cards, panels, and prominent subsections |
| Heading 2  | `Typography.H2`      |  `28px` | Page sections and overlays               |
| Heading 1  | `Typography.H1`      |  `32px` | Primary page titles                      |
| Display    | `Typography.Display` |  `40px` | Rare mastheads, not routine data views   |

Typography is the single public text API. Use Nunito for headings, prose, labels, interface text, product identifiers, timestamps, dates, currency, counts, environments, and versions. Use `Typography.Mono` or `Typography.Code` with Geist Mono only for code, commands, file paths, hashes, serialized values, and other machine-oriented text. Do not create new roles with font family, size, weight, line-height, or tracking utilities.

## Spacing

Use the named spacing scale in CSS variables and matching utilities:

| Contract token | CSS variable  | Value | Example utility |
| -------------- | ------------- | ----: | --------------- |
| `space.2xs`    | `--space-2xs` |   2px | `gap-2xs`       |
| `space.xs`     | `--space-xs`  |   4px | `gap-xs`        |
| `space.sm`     | `--space-sm`  |   6px | `gap-sm`        |
| `space.md`     | `--space-md`  |   8px | `gap-md`        |
| `space.lg`     | `--space-lg`  |  10px | `gap-lg`        |
| `space.xl`     | `--space-xl`  |  12px | `gap-xl`        |
| `space.2xl`    | `--space-2xl` |  14px | `gap-2xl`       |
| `space.3xl`    | `--space-3xl` |  16px | `gap-3xl`       |
| `space.4xl`    | `--space-4xl` |  20px | `gap-4xl`       |
| `space.5xl`    | `--space-5xl` |  24px | `gap-5xl`       |
| `space.6xl`    | `--space-6xl` |  32px | `gap-6xl`       |

The scale does not prescribe a page layout. Use smaller values within compact groups and larger values between distinct regions according to the consumer's content and responsive pattern contract.

Use one spacing role for one relationship. Do not distribute arbitrary gaps until a layout happens to fit.

## Structure and elevation

Use the least structural device that communicates the relationship: semantic spacing, then stronger title hierarchy, then a separator for a meaningful boundary, then an independent surface. Use a table only for comparable columnar records. Do not combine spacing, a separator, and a card edge for the same boundary.

Use the smallest shadow that communicates a real stacking change:

- `--shadow-none`: normal page and ledger content
- `--shadow-surface`: fields, table rows, and subtle container separation
- `--shadow-raised`: cards, sticky regions, and temporarily raised surfaces
- `--shadow-overlay`: popovers, menus, and tooltips
- `--shadow-modal`: dialogs and other full-attention overlays

Tables use consistent body-row surfaces with structural boundaries for tracking. Hover and selected states remain stronger, and selection must not rely on color alone.

## Density and accessibility

Compact, comfortable, and spacious controls use 28px, 32px, and 36px minimum targets. All exceed the WCAG 2.2 AA 24px requirement. The 44px AAA target remains an advisory goal for primary actions and touch-heavy workflows.
