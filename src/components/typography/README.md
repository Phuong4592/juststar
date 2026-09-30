# Typography

Contract ID: `component.typography`

Provides the single public En UI text API through stable semantic compound presets.

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
import { Typography } from "@enosta/en-ui"

<Typography.H1>Account settings</Typography.H1>
<Typography.Text>Manage profile and security preferences.</Typography.Text>
```

## Anatomy

```tsx
<Typography.H1>Page heading</Typography.H1>
<Typography.H2>Section heading</Typography.H2>
<Typography.Text>Content</Typography.Text>
```

Public exports: `typographyVariants`, `TypographyElement`, `TypographyVariant`, `TypographyProps`, `Typography`.

## API Reference

| Prop      | Type                | Default    | Description                                      |
| --------- | ------------------- | ---------- | ------------------------------------------------ |
| `variant` | `TypographyVariant` | `body/md`  | Explicit root role; prefer a compound preset.    |
| `as`      | semantic element    | role-owned | Corrects semantics without changing visual role. |

Native and Base UI props pass through where supported. Use `className` for consumer styling without replacing protected interaction or accessibility behavior.

## Guidance

- Use `Typography.H1` through `Typography.H6` for document headings, preserving heading order.
- Use `Typography.Text` for default 16px copy, `Typography.Small` for 14px supporting copy, and `Typography.Caption` for short 12px metadata.
- `Typography.Caption` renders a `span` by default; use `as="figcaption"` only for an actual figure caption.
- Use `Typography.Label` for compact 14px labels and `Typography.Lead` for introductory 18px prose.
- Keep product identifiers, timestamps, dates, currency, counts, environment names, and versions in Nunito using the semantic role that matches their hierarchy.
- Use `Typography.Mono`, `Typography.MonoStrong`, `Typography.MonoSmall`, `Typography.MonoCaption`, or `Typography.Code` only for code, commands, file paths, hashes, serialized values, and other machine-oriented text.
- Use `Typography.Root` and `variant` only when no compound preset expresses the required role.
- Do not add font family, size, weight, line-height, or tracking utilities to create a new typography role.

## Accessibility

The component preserves its native or Base UI keyboard behavior, focus management, disabled semantics, and accessible relationships. Keep visible labels, focus indicators, and error descriptions intact. Test compositions against WCAG 2.2 AA.

## Storybook

Stories are split by usage scenario and include copyable TSX source in the Docs source panel. Start with `Compound`, then review scale, semantic override, and machine-syntax examples.

## Migration

Classification: `breaking`. `Typography` is now the canonical compound text API, and the overlapping public `Text` export has been removed.
