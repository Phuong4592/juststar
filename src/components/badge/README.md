# Badge

Contract ID: `component.badge`

Displays a compact label, category, count, or status.

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
import { Badge } from "@enosta/en-ui"

;<Badge variant="success">Published</Badge>
```

With an icon:

```tsx
<Badge variant="success">
  <VerifiedIcon />
  Verified
</Badge>
```

As a link:

```tsx
<Badge render={<a href="/pricing" />} variant="info">
  New plan
</Badge>
```

## Guidelines

- Use semantic variants consistently and pair color with meaningful text or an icon.
- Keep labels concise and avoid placing interactive controls inside a badge.
- Use `render` when the badge itself must be a link or another element.
- Badge does not announce updates. Add live-region semantics to the surrounding status when changes must be announced.

## Anatomy

```tsx
<Badge>Content</Badge>
```

Public exports: `badgeVariants`, `BadgeProps`, `Badge`.

## API Reference

| Prop        | Type                                                                                                                  | Default   | Description                                                |
| ----------- | --------------------------------------------------------------------------------------------------------------------- | --------- | ---------------------------------------------------------- |
| `variant`   | `"default"` \| `"secondary"` \| `"outline"` \| `"success"` \| `"warning"` \| `"error"` \| `"info"` \| `"destructive"` | `default` | Visual and semantic color style.                           |
| `size`      | `"sm"` \| `"md"` \| `"lg"`                                                                                            | `md`      | Badge size.                                                |
| `render`    | `ReactElement` \| `(props, state) => ReactElement`                                                                    | -         | Replaces the rendered `span`. Passed through from Base UI. |
| `className` | `string`                                                                                                              | -         | Consumer styling; merged with variant classes.             |

Native span props pass through where supported. When `render` replaces the root, the rendered element receives the badge classes, content, and `data-slot="badge"` marker.

## Guidance

- Prefer `success`, `warning`, `error`, and `info` for statuses with matching meaning.
- Use `destructive` for high-emphasis destructive context, not as a general error status.
- Use `secondary` or `outline` for neutral metadata and counts.
- Use `render` for navigation instead of nesting a link inside Badge.

## Accessibility

Badge is non-interactive by default and renders a native `span`. A link supplied through `render` keeps its native link semantics and keyboard behavior. Do not rely on color alone to communicate status, and provide an accessible name when visible content is insufficient.

## Storybook

Stories cover every variant and size plus icon, link, and count compositions with copyable TSX source.

## Migration

Classification: `compatible`. Existing span usage is unchanged; `render` adds element composition without an additional wrapper.
