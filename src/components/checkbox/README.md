# Checkbox

Contract ID: `component.checkbox`

Lets users toggle a binary or indeterminate choice, with `Checkbox.Group` coordinating the value and disabled state of related checkboxes.

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
import { Checkbox } from "@enosta/en-ui"

;<label>
  <Checkbox name="notifications" defaultChecked />
  Email notifications
</label>
```

Group of related checkboxes:

```tsx
;<Checkbox.Group aria-label="Notification channels" defaultValue={["email"]}>
  <label>
    <Checkbox value="email" /> Email
  </label>
  <label>
    <Checkbox value="sms" /> SMS
  </label>
</Checkbox.Group>
```

## Guidelines

- **Labels**: Associate every checkbox with visible label text or an `aria-label`.
- **Indeterminate**: Use `indeterminate` only for mixed child selections; it is a visual state, not a submitted value.
- **Groups**: Use `Checkbox.Group` for related choices. Provide a group label with `aria-label`, `aria-labelledby`, or surrounding fieldset semantics, and give each child `Checkbox` a unique `value` and an accessible label.
- **Select all**: Pass `allValues` to `Checkbox.Group` and mark the controlling checkbox with `parent` for parent and nested-parent behavior.

## Anatomy

```tsx
<Checkbox.Group>
  <Checkbox />
</Checkbox.Group>
```

Public exports: `checkboxVariants`, `CheckboxProps`, `Checkbox`, `CheckboxGroupProps`.

## API Reference

### Checkbox

| Prop              | Type                                               | Default | Description                                                          |
| ----------------- | -------------------------------------------------- | ------- | -------------------------------------------------------------------- |
| `checked`         | `boolean`                                          | —       | Controlled checked state. Passed through from Base UI.               |
| `defaultChecked`  | `boolean`                                          | —       | Initial checked state for uncontrolled usage.                        |
| `indeterminate`   | `boolean`                                          | —       | Mixed state shown with a minus indicator.                            |
| `value`           | `string`                                           | —       | Value contributed to the group when checked.                         |
| `name`            | `string`                                           | —       | Form field name for native form submission.                          |
| `disabled`        | `boolean`                                          | —       | Prevents interaction; inherited from the group when set there.       |
| `parent`          | `boolean`                                          | —       | Makes the checkbox toggle every group value declared in `allValues`. |
| `onCheckedChange` | `(checked: boolean) => void`                       | —       | Called when the checked state changes.                               |
| `render`          | `ReactElement` \| `(props, state) => ReactElement` | —       | Replaces the rendered HTML element. Passed through from Base UI.     |
| `className`       | `string`                                           | —       | Consumer styling; merged with variant classes.                       |

### Checkbox.Group

| Prop            | Type                        | Default | Description                                                 |
| --------------- | --------------------------- | ------- | ----------------------------------------------------------- |
| `value`         | `string[]`                  | —       | Controlled array of checked values.                         |
| `defaultValue`  | `string[]`                  | —       | Initial values for uncontrolled usage.                      |
| `onValueChange` | `(value: string[]) => void` | —       | Called when the set of checked values changes.              |
| `allValues`     | `string[]`                  | —       | Every child value, required for `parent` checkbox behavior. |
| `disabled`      | `boolean`                   | —       | Disables every child checkbox.                              |
| `className`     | `string`                    | —       | Consumer styling; merged with group layout classes.         |

Native and Base UI props pass through where supported. Use `className` for consumer styling without replacing protected interaction or accessibility behavior.

## Guidance

- Use `Checkbox.Group` for related choices and `parent` for select-all behavior.
- Do not nest other controls inside `Checkbox.Group`; it coordinates checkbox values only.

## Accessibility

The component preserves its native or Base UI keyboard behavior, focus management, disabled semantics, and accessible relationships. Keep visible labels, focus indicators, and error descriptions intact. Test compositions against WCAG 2.2 AA.

## Storybook

Stories are split by usage scenario and include copyable TSX source in the Docs source panel. Start with `Basic`, then review state, composition, and group stories (`GroupBasic`, `GroupDisabled`).

## Migration

Classification: `breaking`. `CheckboxGroup` merged into `Checkbox` as the compound part `Checkbox.Group`; the standalone `CheckboxGroup` export is removed.
