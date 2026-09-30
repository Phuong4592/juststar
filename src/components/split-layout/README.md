# Split Layout

Contract ID: `component.split-layout`

Use `SplitLayout` for main-and-aside page geometry. It preserves primary content first in document and mobile order, then positions the supporting region on either side at desktop widths.

## Usage

```tsx
import { SplitLayout } from "@enosta/en-ui"

;<SplitLayout
  primary={<section>Project activity</section>}
  secondary={<aside>Project details</aside>}
  ratio="primary"
  stickySecondary
/>
```

## Anatomy

```tsx
<SplitLayout
  primary={...}
  secondary={...}
  ratio="primary"
  secondaryPosition="end"
  stickySecondary={false}
  density="comfortable"
/>
```

Public exports: `splitLayoutVariants`, `SplitLayoutProps`, `SplitLayout`.

## API Reference

| Prop                | Type                                     | Default       | Description                                    |
| ------------------- | ---------------------------------------- | ------------- | ---------------------------------------------- |
| `primary`           | `ReactNode`                              | required      | Primary workflow content.                      |
| `secondary`         | `ReactNode`                              | required      | Supporting or contextual content.              |
| `ratio`             | `"balanced" \| "primary" \| "secondary"` | `primary`     | Relative desktop region width.                 |
| `secondaryPosition` | `"start" \| "end"`                       | `end`         | Desktop side for the secondary region.         |
| `stickySecondary`   | `boolean`                                | `false`       | Keeps the secondary region visible on desktop. |
| `density`           | `"comfortable" \| "compact"`             | `comfortable` | Space between the two regions.                 |

Native `div` props pass through.

## Guidance

- Keep the primary workflow in the `primary` slot even when the secondary region appears on the left.
- Use `primary` ratio for detail pages, forms, and contextual asides.
- Use `balanced` for comparison or parallel work with equal importance.
- Use `compact` for operational pages that need 16px to 24px region gaps while preserving content and control sizes.
- Do not use this component for user-resizable workspaces; `AIWorkspace` owns that interaction.
- Sticky content must remain shorter than the available viewport or provide its own safe scrolling behavior.

## Accessibility

`SplitLayout` changes visual position only at desktop widths. Primary content remains first in document and mobile order. Supply semantic landmarks inside each slot where needed.

## Migration

Classification: `compatible`. New in `0.4.0`.
