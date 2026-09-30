# Toast

Contract ID: `component.toast`

Announces temporary feedback without interrupting the current task.

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
import { Button, ToastProvider, toast } from "@enosta/en-ui"

<ToastProvider>
  <App />
</ToastProvider>

<Button onClick={() => toast.add({ title: "Saved", description: "Your changes are live." })}>
  Save
</Button>
```

## Anatomy

```tsx
<ToastProvider>Content</ToastProvider>
```

Public exports: `ToastPosition`, `ToastsProps`, `toast`, `ToastProviderProps`, `ToastProvider`, `Toast`.

## API Reference

| Prop       | Type         | Default        | Description   |
| ---------- | ------------ | -------------- | ------------- |
| `position` | `"top-left"` | `"top-center"` | `"top-right"` | `"bottom-left"` | `"bottom-center"` | `"bottom-right"` | `bottom-right` | position option for the component. |

Native and Base UI props pass through where supported. Use `className` for consumer styling without replacing protected interaction or accessibility behavior.

## Guidance

- Mount one `ToastProvider` near the application root.
- Use stable `id` values to update or deduplicate repeated feedback.
- Use status types consistently and keep actionable or critical information available elsewhere.

## Accessibility

The component preserves its native or Base UI keyboard behavior, focus management, disabled semantics, and accessible relationships. Keep visible labels, focus indicators, and error descriptions intact. Test compositions against WCAG 2.2 AA.

## Storybook

Stories are split by usage scenario and include copyable TSX source in the Docs source panel. Start with `Basic`, then review state, composition, and variant stories relevant to the feature.

## Migration

Classification: `breaking`. Styles mapped to En UI theme variables.
