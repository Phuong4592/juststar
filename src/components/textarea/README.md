# Textarea

Contract ID: `component.textarea`

Provides a styled native textarea with sizes, row control, and an unstyled mode.

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
import { Textarea } from "@enosta/en-ui"

;<Textarea name="bio" placeholder="Tell us about yourself…" rows={4} />
```

Integrates with `Field` out of the box; the label, description, and error are wired automatically:

```tsx
import { Field, FieldDescription, FieldError, FieldLabel, Textarea } from "@enosta/en-ui"

;<Field invalid>
  <FieldLabel>Bio</FieldLabel>
  <Textarea defaultValue="Too short" rows={4} />
  <FieldDescription>Write a short bio.</FieldDescription>
  <FieldError match>Bio must be at least 20 characters.</FieldError>
</Field>
```

Use `unstyled` to drop the surface chrome while keeping the native element:

```tsx
<Textarea placeholder="Compose your own surface" rows={3} unstyled />
```

## Guidelines

- Pair textareas with `Field` and `FieldLabel`; placeholders do not replace labels.
- Control the visible height with the native `rows` attribute; `size` controls padding, text size, and the single-line minimum height.
- Announce validation with `aria-invalid` (or the Field `invalid` flag) plus a visible error description; the invalid border reacts to `aria-invalid`.
- Use `unstyled` only for compositions that supply their own surface.

## Anatomy

```tsx
<Textarea />
```

Public exports: `textareaVariants`, `Textarea`, `TextareaProps`.

## API Reference

| Prop        | Type                       | Default | Description                                                     |
| ----------- | -------------------------- | ------- | --------------------------------------------------------------- |
| `size`      | `"sm"` \| `"md"` \| `"lg"` | `md`    | Control min-height, padding, and text size.                     |
| `unstyled`  | `boolean`                  | `false` | Removes the surface styling; keeps the native textarea element. |
| `rows`      | `number`                   | Native  | Native row count; sets the visible height.                      |
| `className` | `string`                   | —       | Consumer styling; merged with variant classes on the textarea.  |

Native textarea attributes (`value`, `defaultValue`, `disabled`, `readOnly`, `maxLength`, `onChange`, refs, and more) pass through to the element. Use `className` for consumer styling without replacing protected interaction or accessibility behavior.

## Guidance

- Pair textareas with `Field` and `FieldLabel`; placeholders do not replace labels.
- The component renders a native `<textarea>`; `rows`, `cols`, and `resize` behavior stay native.
- Validation, character limits, and refs pass through to the textarea.

## Accessibility

The component preserves its native keyboard behavior, focus management, disabled semantics, and accessible relationships. Keep visible labels, focus indicators, and error descriptions intact. Test compositions against WCAG 2.2 AA.

## Storybook

Stories are split by usage scenario and include copyable TSX source in the Docs source panel. Start with `Basic`, then review state, composition, and variant stories relevant to the feature.

## Migration

Classification: `compatible`. Introduces Textarea.
