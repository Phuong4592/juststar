# Scroll Area

Contract ID: `component.scroll-area`

Adds styled scrollbars and optional edge fades to overflowing content.

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
import { ScrollArea } from "@enosta/en-ui"

;<ScrollArea className="h-64" scrollFade>
  <ActivityList />
</ScrollArea>
```

## Anatomy

```tsx
<ScrollArea>Content</ScrollArea>
```

Public exports: `scrollAreaVariants`, `ScrollAreaProps`, `ScrollBarProps`, `ScrollArea`.

## API Reference

| Prop                   | Type      | Default | Description                                    |
| ---------------------- | --------- | ------- | ---------------------------------------------- |
| `fill`                 | `boolean` | `false` | fill option for the component.                 |
| `overscrollContain`    | `boolean` | `false` | overscrollContain option for the component.    |
| `scrollFade`           | `boolean` | `false` | scrollFade option for the component.           |
| `scrollbarGutter`      | `boolean` | `false` | scrollbarGutter option for the component.      |
| `clampContentMinWidth` | `boolean` | `true`  | clampContentMinWidth option for the component. |

Native and Base UI props pass through where supported. Use `className` for consumer styling without replacing protected interaction or accessibility behavior.

## Guidance

- Set an explicit width or height where overflow must occur.
- Use `clampContentMinWidth={false}` when horizontal content must retain its intrinsic width.
- Keep keyboard-focusable content reachable and do not hide important information only behind a fade.

## Accessibility

The component preserves its native or Base UI keyboard behavior, focus management, disabled semantics, and accessible relationships. Keep visible labels, focus indicators, and error descriptions intact. Test compositions against WCAG 2.2 AA.

## Storybook

Stories are split by usage scenario and include copyable TSX source in the Docs source panel. Start with `Basic`, then review state, composition, and variant stories relevant to the feature.

## Migration

Classification: `compatible`. Styles mapped to En UI theme variables.
