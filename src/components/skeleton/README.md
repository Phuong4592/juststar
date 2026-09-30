# Skeleton

Contract ID: `component.skeleton`

Shows a placeholder matching content that is still loading.

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
import { Skeleton } from "@enosta/en-ui"

;<div role="status" aria-busy="true" aria-label="Loading profile">
  <Skeleton className="size-5xl rounded-pill" />
  <Skeleton className="h-3xl w-[8rem]" />
</div>
```

Skeleton sizes itself entirely from `className`; always give it the width and height of the content it replaces.

## Guidelines

- Put `role="status"`, `aria-busy`, and any loading announcement on one containing region, not on every skeleton.
- Match placeholder dimensions to the final content to prevent layout shift. Set width and height via `className`; the shape follows the `rounded-*` tokens you apply.
- The shimmer is decorative and pauses automatically under `prefers-reduced-motion`.

## Anatomy

```tsx
<Skeleton>Content</Skeleton>
```

Public exports: `Skeleton`.

## API Reference

| Prop               | Type      | Default | Description                                               |
| ------------------ | --------- | ------- | --------------------------------------------------------- |
| Native `div` props | inherited | —       | Passed through to the rendered `div`.                     |
| `className`        | `string`  | —       | Sizing, shape, and consumer styling; merged with classes. |

Native props pass through where supported. Use `className` for consumer styling without replacing protected interaction or accessibility behavior.

## CSS Variables

| Variable               | Description                                             |
| ---------------------- | ------------------------------------------------------- |
| `--skeleton-highlight` | Highlight color of the shimmer band over the base fill. |

This is an internal protected variable; consumers should not override it.

## Guidance

- The shimmer band sweeps across the element via the protected `animate-skeleton` animation and `--color-neutral-100` fill; both resolve from theme tokens, so do not strip them with `className` overrides.

## Accessibility

The component preserves its native or Base UI keyboard behavior, focus management, disabled semantics, and accessible relationships. Keep visible labels, focus indicators, and error descriptions intact. Test compositions against WCAG 2.2 AA.

## Storybook

Stories are split by usage scenario and include copyable TSX source in the Docs source panel. Start with `Basic`, then review state, composition, and variant stories relevant to the feature.

## Migration

Classification: `compatible`. Styles mapped to En UI theme variables.
