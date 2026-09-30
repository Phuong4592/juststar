# Separator

Contract ID: `component.separator`

Visually or semantically separates adjacent content.

## Installation

```bash
pnpm add @enosta/en-ui
```

Import the package styles once at the application entry point:

```tsx
import "@enosta/en-ui/styles.css"
```

## Usage

```tsx
import { Separator } from "@enosta/en-ui"

;<Separator />
```

Vertical between inline items:

```tsx
<div className="flex h-5xl items-center gap-xl">
  <span>Overview</span>
  <Separator orientation="vertical" />
  <span>Activity</span>
</div>
```

## Guidelines

- **Default orientation**: Horizontal is the default and fills the width of its container.
- **Vertical stretch**: Give a vertical separator a parent with an explicit height so it can stretch.
- **Exhaust spacing first**: Start with semantic spacing and heading hierarchy. Add a separator only when those do not make a meaningful boundary clear.
- **One boundary per break**: Do not combine spacing, a separator, and a card edge to express the same section break.

## Anatomy

```tsx
<Separator />
```

The root renders a non-interactive separator element owned by the Base UI adapter, which provides the separator semantics and orientation attribute.

Public exports: `separatorVariants`, `SeparatorProps`, `Separator`.

## API Reference

| Prop          | Type                                        | Default      | Description                                                 |
| ------------- | ------------------------------------------- | ------------ | ----------------------------------------------------------- |
| `orientation` | `"horizontal"` \| `"vertical"`              | `horizontal` | Orientation of the separator line.                          |
| `render`      | `ReactElement` \| `(props) => ReactElement` | -            | Replaces the rendered element. Passed through from Base UI. |
| `className`   | `string`                                    | -            | Consumer styling merged with the base classes.              |

Native and Base UI props pass through where supported. Use `className` for consumer styling without replacing protected interaction or accessibility behavior.

## Guidance

- Appropriate uses include a group transition, sticky-region edge, split-pane handle, or dense ledger boundary.
- Do not rely on a separator as the only section label; pair it with headings or visible group names.
- Use the underlying semantic or decorative props appropriately for the context.

## Accessibility

Separator exposes `role="separator"` with its orientation through the Base UI adapter and is not focusable. Do not use it as the sole means of conveying grouping; keep visible headings and structure intact. Test compositions against WCAG 2.2 AA.

## Storybook

Stories are split by usage scenario and include copyable TSX source in the Docs source panel. Start with `Overview`, which shows horizontal and vertical usage side by side.

## Migration

Classification: `compatible`. Styles mapped to En UI theme variables.
