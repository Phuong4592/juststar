# Input

Contract ID: `component.input`

Provides a styled native input with sizes, affixes, and an unstyled mode.

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
import { Input } from "@enosta/en-ui"

;<Input name="email" type="email" placeholder="you@example.com" />
```

With icon and text affixes:

```tsx
<Input prefix="solar:magnifer-linear" placeholder="Search" />
<Input
  prefix="solar:letter-linear"
  suffix={<span>@example.com</span>}
  placeholder="username"
/>
```

Native types pass through, including `file`:

```tsx
<Input accept="image/*" type="file" />
```

Use `unstyled` to drop the surface chrome while keeping size and layout:

```tsx
<Input placeholder="Paste a link" prefix="solar:link-linear" unstyled />
```

## Guidelines

- Pair inputs with `Field` and `FieldLabel`; placeholders do not replace labels.
- `prefix` and `suffix` are decorative and do not change the accessible name. A string renders an icon; a ReactNode renders as-is.
- Announce validation with `aria-invalid` plus a visible error description; the invalid border reacts to `aria-invalid` on the input.
- Use `unstyled` only for compositions that supply their own surface.

## Anatomy

```tsx
<Input />
```

Public exports: `inputVariants`, `InputProps`, `Input`.

## API Reference

| Prop        | Type                       | Default | Description                                                      |
| ----------- | -------------------------- | ------- | ---------------------------------------------------------------- |
| `size`      | `"sm"` \| `"md"` \| `"lg"` | `md`    | Control height and text size.                                    |
| `unstyled`  | `boolean`                  | `false` | Removes the surface styling; keeps layout and the input element. |
| `prefix`    | `string` \| `ReactNode`    | —       | Decorative content before the input. A string renders an icon.   |
| `suffix`    | `string` \| `ReactNode`    | —       | Decorative content after the input. A string renders an icon.    |
| `type`      | `string`                   | Native  | Native input type. `file` gets muted root text.                  |
| `className` | `string`                   | —       | Consumer styling; merged with variant classes on the root.       |

Native and Base UI props pass through where supported. Use `className` for consumer styling without replacing protected interaction or accessibility behavior.

## CSS Variables

| Variable              | Description                                         |
| --------------------- | --------------------------------------------------- |
| `--input-autofill-bg` | Root background while the browser reports autofill. |

Settable by consumers; defaults to the neutral-50 theme color.

## Guidance

- Pair inputs with `Field` and `FieldLabel`; placeholders do not replace labels.
- `prefix` and `suffix` are decorative affordances and do not change the accessible name.
- Native attributes, validation, autofill, and refs pass through to the input.

## Accessibility

The component preserves its native or Base UI keyboard behavior, focus management, disabled semantics, and accessible relationships. Keep visible labels, focus indicators, and error descriptions intact. Test compositions against WCAG 2.2 AA.

## Storybook

Stories are split by usage scenario and include copyable TSX source in the Docs source panel. Start with `Basic`, then review state, composition, and variant stories relevant to the feature.

## Migration

Classification: `breaking`. Styles mapped to En UI theme variables.
