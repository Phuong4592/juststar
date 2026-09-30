# Field

Contract ID: `component.field`

Associates a form control with its label, help text, and validation message.

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
import { Field, FieldDescription, FieldError, FieldLabel, Input } from "@enosta/en-ui"

;<Field>
  <FieldLabel>Email</FieldLabel>
  <Input name="email" type="email" />
  <FieldDescription>Used for account notifications.</FieldDescription>
  <FieldError match>Enter a valid email address.</FieldError>
</Field>
```

Custom validity feedback with `FieldValidity`:

```tsx
<Field validationMode="onChange">
  <FieldLabel>Email</FieldLabel>
  <Input name="email" required type="email" />
  <FieldValidity>
    {(validity) =>
      validity.validity.valid ? <span>Looks good.</span> : <span>{validity.error}</span>
    }
  </FieldValidity>
</Field>
```

## Guidelines

- **Built-in controls**: `Input`, `Checkbox`, `Select`, and other Base UI-based controls integrate with `Field` out of the box; place them directly inside `Field` and omit `FieldControl`.
- **Third-party controls**: Wrap a custom or third-party control with `FieldControl` so it participates in labelling, validation, and error state.
- **App-controlled errors**: Set `invalid` on `Field` and render `FieldError` with `match` (boolean) to keep the message visible; native constraint feedback (for example `match="valueMissing"`) renders on real validation failures.
- **Grouped items**: Use `FieldItem` to group a control such as a checkbox with its description.
- Keep labels visible and place supporting text in `FieldDescription`; use `FieldError` only for validation messages.

## Anatomy

```tsx
<Field>
  <FieldLabel />
  <FieldControl />
  <FieldDescription />
  <FieldError />
</Field>
```

Public exports: `Field`, `FieldLabel`, `FieldItem`, `FieldDescription`, `FieldError`, `FieldControl`, `FieldValidity`, `FieldProps`, `fieldVariants`.

## API Reference

### Field

| Prop                     | Type                                   | Default      | Description                                                               |
| ------------------------ | -------------------------------------- | ------------ | ------------------------------------------------------------------------- |
| `name`                   | `string`                               | —            | Identifies the field on form submit; takes precedence over the control.   |
| `disabled`               | `boolean`                              | `false`      | Ignores user interaction; takes precedence over the control's `disabled`. |
| `invalid`                | `boolean`                              | —            | Marks the field invalid for external validation state.                    |
| `dirty`                  | `boolean`                              | —            | Value changed from its initial value (external library state).            |
| `touched`                | `boolean`                              | —            | Field has been touched (external library state).                          |
| `validate`               | `(value, formValues) => string \| ...` | —            | Custom validation; return error message(s) or nothing when valid.         |
| `validationMode`         | `"onSubmit" \| "onBlur" \| "onChange"` | `"onSubmit"` | When the field validates.                                                 |
| `validationDebounceTime` | `number`                               | `0`          | Debounce in milliseconds when `validationMode="onChange"`.                |
| `actionsRef`             | `RefObject<{ validate: () => void }>`  | —            | Imperative `validate` action.                                             |
| `render`                 | `ReactElement \| (props, state) => …`  | —            | Replaces the rendered element. Passed through from Base UI.               |
| `className`              | `string`                               | —            | Consumer styling; merged with `fieldVariants` classes.                    |

State data attributes (`data-disabled`, `data-valid`, `data-invalid`, `data-dirty`, `data-touched`, `data-filled`, `data-focused`) are set on the root and every part.

### FieldLabel

| Prop          | Type      | Default | Description                                                                                         |
| ------------- | --------- | ------- | --------------------------------------------------------------------------------------------------- |
| `nativeLabel` | `boolean` | `true`  | Set to `false` when `render` replaces the label with a non-label element, such as a button trigger. |

### FieldError

| Prop    | Type                             | Default | Description                                                                                          |
| ------- | -------------------------------- | ------- | ---------------------------------------------------------------------------------------------------- |
| `match` | `boolean \| keyof ValidityState` | —       | `true` always shows the message for app-controlled invalidity; a key maps to a `ValidityState` flag. |

### FieldControl, FieldValidity

Aliases for `Field.Control` and `Field.Validity` from Base UI. `FieldValidity` requires a render-prop child receiving the validity state (`validity`, `error`, `errors`, `value`).

Remaining props of each part pass through from Base UI. Use `className` for consumer styling without replacing protected interaction or accessibility behavior.

## Guidance

- Use `Field` for every labelled form control so labels, descriptions, and errors stay programmatically associated.
- Prefer `validationMode="onChange"` with a debounce for inline feedback; keep `"onSubmit"` for forms that validate on submission.
- Do not detach `FieldDescription` or `FieldError` from `Field`; the accessible description and error announcements rely on the field context.

## Accessibility

The component preserves its native or Base UI keyboard behavior, focus management, disabled semantics, and accessible relationships. Keep visible labels, focus indicators, and error descriptions intact. Test compositions against WCAG 2.2 AA.

## Storybook

Stories are split by usage scenario and include copyable TSX source in the Docs source panel. Start with `Basic`, then review state, composition, and variant stories relevant to the feature.

## Migration

Classification: `compatible`. Styles mapped to En UI theme variables.
