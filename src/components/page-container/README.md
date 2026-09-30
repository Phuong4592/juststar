# Page Container

Contract ID: `component.page-container`

Use `PageContainer` to establish consistent page width and responsive horizontal gutters. It is a structural primitive: it does not render a page landmark, heading, surface, or vertical spacing.

## Usage

```tsx
import { PageContainer } from "@enosta/en-ui"

;<main>
  <PageContainer size="wide">Page content</PageContainer>
</main>
```

## Anatomy

```tsx
<PageContainer size="default" gutter="default">
  Content
</PageContainer>
```

Public part: `page-container`.

Public exports: `pageContainerVariants`, `PageContainerProps`, `PageContainer`.

## API Reference

| Prop     | Type                                             | Default   | Description                          |
| -------- | ------------------------------------------------ | --------- | ------------------------------------ |
| `size`   | `"narrow" \| "default" \| "wide" \| "full"`      | `default` | Declared maximum content width.      |
| `gutter` | `"none" \| "compact" \| "default" \| "spacious"` | `default` | Responsive horizontal content inset. |

Native `div` props pass through, including React 19 `ref` as a prop.

## Guidance

- Use `narrow` for forms, prose, settings, and focused review flows.
- Use `default` for routine operational pages and `wide` for data-heavy pages.
- Use `full` only when another pattern, such as a split workspace, owns internal geometry.
- Nest containers only when an inner workflow intentionally needs a narrower reading measure.
- Use `gutter="none"` only when a parent already provides the approved page inset.

## Accessibility

`PageContainer` is intentionally a non-landmark `div`. Place it inside the correct `main`, `section`, or other semantic owner. The component preserves native attributes and does not alter focus order.

## Migration

Classification: `compatible`. New in `0.4.0`.
