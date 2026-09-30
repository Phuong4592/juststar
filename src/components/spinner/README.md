# Spinner

Contract ID: `component.spinner`

Indicates that an operation is in progress.

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
import { Spinner } from "@enosta/en-ui"

;<Spinner aria-label="Loading results" />
```

## Anatomy

```tsx
<Spinner>Content</Spinner>
```

Public exports: `SpinnerProps`, `Spinner`.

## API Reference

| Prop                 | Type      | Default | Description                     |
| -------------------- | --------- | ------- | ------------------------------- |
| Native/Base UI props | inherited | —       | Passed through where supported. |

Native and Base UI props pass through where supported. Use `className` for consumer styling without replacing protected interaction or accessibility behavior.

## Guidance

- Give a standalone spinner an accessible label.
- Use `aria-hidden="true"` when adjacent text already announces loading.
- Prefer `Button loading` instead of composing a spinner manually inside Button.

## Accessibility

The component preserves its native or Base UI keyboard behavior, focus management, disabled semantics, and accessible relationships. Keep visible labels, focus indicators, and error descriptions intact. Test compositions against WCAG 2.2 AA.

## Storybook

Stories are split by usage scenario and include copyable TSX source in the Docs source panel. Start with `Basic`, then review state, composition, and variant stories relevant to the feature.

## Migration

Classification: `compatible`. Styles mapped to En UI theme variables.
