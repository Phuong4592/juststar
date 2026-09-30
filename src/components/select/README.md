# Select

Contract ID: `component.select`

Lets users choose one or more predefined values from a popup list.

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
import { Select, SelectItem, SelectPopup, SelectTrigger, SelectValue } from "@enosta/en-ui"

;<Select items={frameworks}>
  <SelectTrigger>
    <SelectValue placeholder="Select a framework" />
  </SelectTrigger>
  <SelectPopup>
    {frameworks.map((item) => (
      <SelectItem key={item.value} value={item.value}>
        {item.label}
      </SelectItem>
    ))}
  </SelectPopup>
</Select>
```

## Anatomy

```tsx
<Select>Content</Select>
```

Public exports: `selectVariants`, `Select`, `SelectTrigger`, `SelectValue`, `SelectPopupProps`, `SelectPopup`, `SelectItem`, `SelectSeparator`, `SelectGroup`, `SelectLabel`, `SelectGroupLabel`.

## API Reference

| Prop                 | Type      | Default | Description                     |
| -------------------- | --------- | ------- | ------------------------------- |
| Native/Base UI props | inherited | —       | Passed through where supported. |

Native and Base UI props pass through where supported. Use `className` for consumer styling without replacing protected interaction or accessibility behavior.

## Guidance

- Use Select when values are predefined; use Combobox when users need filtering.
- Pair `SelectTrigger` with a visible field label or accessible name.
- Use `SelectGroup` and `SelectGroupLabel` for long categorized lists.

## Accessibility

The component preserves its native or Base UI keyboard behavior, focus management, disabled semantics, and accessible relationships. Keep visible labels, focus indicators, and error descriptions intact. Test compositions against WCAG 2.2 AA.

## Storybook

Stories are split by usage scenario and include copyable TSX source in the Docs source panel. Start with `Basic`, then review state, composition, and variant stories relevant to the feature.

## Migration

Classification: `compatible`. Styles mapped to En UI theme variables.
