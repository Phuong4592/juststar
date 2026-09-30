# Combobox

Contract ID: `component.combobox`

An input combined with a filterable list of predefined items, supporting single and multiple selection.

## Installation

```bash
pnpm add @enosta/en-ui
```

Import the package styles once at the application entry point:

```tsx
import "@enosta/en-ui/styles.css"
```

## Usage

Single selection:

```tsx
import {
  Combobox,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxPopup,
} from "@enosta/en-ui"

;<Combobox items={items}>
  <ComboboxInput placeholder="Select a fruit..." />
  <ComboboxPopup>
    <ComboboxEmpty>No results found.</ComboboxEmpty>
    <ComboboxList>
      {(item) => (
        <ComboboxItem key={item.value} value={item}>
          {item.label}
        </ComboboxItem>
      )}
    </ComboboxList>
  </ComboboxPopup>
</Combobox>
```

Multiple selection with removable chips:

```tsx
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxPopup,
  ComboboxValue,
} from "@enosta/en-ui"

;<Combobox items={items} multiple>
  <ComboboxChips>
    <ComboboxValue>
      {(value) => (
        <>
          {value?.map((item) => (
            <ComboboxChip key={item.value} aria-label={item.value}>
              {item.label}
            </ComboboxChip>
          ))}
          <ComboboxChipsInput
            aria-label="Select fruits"
            placeholder={value.length > 0 ? undefined : "Select fruits..."}
          />
        </>
      )}
    </ComboboxValue>
  </ComboboxChips>
  <ComboboxPopup>
    <ComboboxEmpty>No results found.</ComboboxEmpty>
    <ComboboxList>{(item) => <ComboboxItem value={item}>{item.label}</ComboboxItem>}</ComboboxList>
  </ComboboxPopup>
</Combobox>
```

## Guidelines

- **Combobox is a filterable select.** Use it when the input is restricted to a set of predefined items and the list is large enough to warrant filtering. For free-form text, use an Input; for short lists without filtering, use Select.
- Pass the same item objects to `items` and `ComboboxItem.value`. Selection props and events receive the item objects.
- Use `ComboboxChips`, `ComboboxChip`, and `ComboboxChipsInput` for multiple selection. Render them through `ComboboxValue` so chips follow the current value.
- Use `startAddon` for a leading search icon on `ComboboxInput` or `ComboboxChips`; pass an icon name string or any ReactNode.
- Use `showClear` to let users reset a single selection, and `autoHighlight` to highlight the first matching option while typing.
- Provide a visible `FieldLabel`, or an `aria-label` on the input when no visible label is rendered.
- In multiple mode, selecting an item clears the filter. Cancel the `item-press` close request in `onOpenChange` (or the item-press clear in `onInputValueChange` when the input is inside the popup) to keep the popup open for multi-pick flows.
- Provide a useful empty state with `ComboboxEmpty` and preserve the built-in keyboard, focus, and announcement behavior.

## Anatomy

```tsx
<Combobox items={items}>
  <ComboboxInput />
  <ComboboxPopup>
    <ComboboxEmpty />
    <ComboboxList>
      <ComboboxGroup>
        <ComboboxGroupLabel />
        <ComboboxCollection />
      </ComboboxGroup>
      <ComboboxItem />
    </ComboboxList>
  </ComboboxPopup>
</Combobox>
```

Multiple selection replaces `ComboboxInput` with `ComboboxChips` containing `ComboboxChip` (with its remove button) and `ComboboxChipsInput`.

Public exports: `comboboxVariants`, `Combobox`, `ComboboxChipsInputProps`, `ComboboxChipsInput`, `ComboboxTrigger`, `ComboboxClear`, `ComboboxInputProps`, `ComboboxInput`, `ComboboxPopupProps`, `ComboboxPopup`, `ComboboxItem`, `ComboboxSeparator`, `ComboboxGroup`, `ComboboxGroupLabel`, `ComboboxEmpty`, `ComboboxRow`, `ComboboxStatus`, `ComboboxList`, `ComboboxChipRemove`, `ComboboxChipProps`, `ComboboxChip`, `ComboboxChipsProps`, `ComboboxChips`, `ComboboxValue`, `ComboboxCollection`, `useComboboxFilter`.

## API Reference

### Combobox

Root that manages value, open state, and filtering.

| Prop                                       | Type                        | Description                                                              |
| ------------------------------------------ | --------------------------- | ------------------------------------------------------------------------ |
| `items`                                    | `readonly unknown[]`        | Source items rendered as `ComboboxItem` elements through `ComboboxList`. |
| `multiple`                                 | `boolean`                   | Allows multiple selection and enables chips parts.                       |
| `value` / `defaultValue` / `onValueChange` | —                           | Controlled selection. Receives item objects (an array in `multiple`).    |
| `autoHighlight`                            | `boolean`                   | Highlights the first matching option while filtering.                    |
| `disabled`                                 | `boolean`                   | Disables the input and popup.                                            |
| `name`, `required`                         | —                           | Form integration; selected labels submit with the form.                  |
| `...props`                                 | Base UI Combobox Root props | All Base UI Combobox root props are supported.                           |

### ComboboxInput

| Prop           | Type                         | Default | Description                                                                      |
| -------------- | ---------------------------- | ------- | -------------------------------------------------------------------------------- |
| `size`         | `"sm"` \| `"md"` \| `"lg"`   | `md`    | Control height, aligned with Input sizes. A number sets the native input `size`. |
| `startAddon`   | `ReactNode`                  | —       | Leading addon, such as a search icon. A string renders as an Iconify icon name.  |
| `showTrigger`  | `boolean`                    | `true`  | Chevron trigger that opens the popup at the end of the input.                    |
| `showClear`    | `boolean`                    | `false` | Clear selection button at the end of the input.                                  |
| `triggerProps` | `Combobox.Trigger.Props`     | —       | Props forwarded to the internal trigger, e.g. to override `aria-label`.          |
| `clearProps`   | `Combobox.Clear.Props`       | —       | Props forwarded to the internal clear button, e.g. to override `aria-label`.     |
| `className`    | `string`                     | —       | Consumer styling; merged with variant classes.                                   |
| `...props`     | Base UI Combobox Input props | —       | All standard combobox input attributes are supported.                            |

### ComboboxPopup

| Prop          | Type                                           | Description                                                               |
| ------------- | ---------------------------------------------- | ------------------------------------------------------------------------- |
| `side`        | `"top"` \| `"bottom"` \| `"left"` \| `"right"` | Preferred side of the input to position the popup. Default `bottom`.      |
| `align`       | `"start"` \| `"center"` \| `"end"`             | Alignment on the chosen side. Default `start`.                            |
| `sideOffset`  | `number`                                       | Distance from the anchor along the side axis. Default `4`.                |
| `alignOffset` | `number`                                       | Offset along the alignment axis.                                          |
| `anchor`      | `Element \| RefObject \| VirtualElement`       | Anchor override. Defaults to the chips container in multiple mode.        |
| `portalProps` | `Combobox.Portal.Props`                        | Props forwarded to the internal portal (`keepMounted`, `container`, ...). |
| `className`   | `string`                                       | Consumer styling on the popup surface.                                    |
| `...props`    | Base UI Combobox Popup props                   | All standard combobox popup attributes are supported.                     |

### ComboboxList

Scrollable container for items. Wraps content in the package `ScrollArea`.

| Prop        | Type                        | Description                                          |
| ----------- | --------------------------- | ---------------------------------------------------- |
| `className` | `string`                    | Consumer styling.                                    |
| `...props`  | Base UI Combobox List props | All standard combobox list attributes are supported. |

### ComboboxItem

| Prop        | Type                        | Description                                                      |
| ----------- | --------------------------- | ---------------------------------------------------------------- |
| `value`     | `unknown`                   | The item being rendered; received by selection props and events. |
| `className` | `string`                    | Consumer styling.                                                |
| `...props`  | Base UI Combobox Item props | All standard combobox item attributes are supported.             |

### ComboboxChips

| Prop         | Type                         | Description                                           |
| ------------ | ---------------------------- | ----------------------------------------------------- |
| `startAddon` | `ReactNode`                  | Leading addon at the start of the chips area.         |
| `className`  | `string`                     | Consumer styling.                                     |
| `...props`   | Base UI Combobox Chips props | All standard combobox chips attributes are supported. |

### ComboboxChipsInput

| Prop        | Type                         | Default | Description                                           |
| ----------- | ---------------------------- | ------- | ----------------------------------------------------- |
| `size`      | `"sm"` \| `"md"` \| `"lg"`   | `md`    | Matches the surrounding chips size.                   |
| `className` | `string`                     | —       | Consumer styling.                                     |
| `...props`  | Base UI Combobox Input props | —       | All standard combobox input attributes are supported. |

### ComboboxChip

| Prop          | Type                        | Description                                                       |
| ------------- | --------------------------- | ----------------------------------------------------------------- |
| `removeProps` | `Combobox.ChipRemove.Props` | Props forwarded to the internal remove button, e.g. `aria-label`. |
| `className`   | `string`                    | Consumer styling.                                                 |
| `...props`    | Base UI Combobox Chip props | All standard combobox chip attributes are supported.              |

### Other parts

`ComboboxTrigger`, `ComboboxClear`, `ComboboxEmpty`, `ComboboxGroup`, `ComboboxGroupLabel`, `ComboboxCollection`, `ComboboxSeparator`, `ComboboxRow`, `ComboboxStatus`, `ComboboxValue`, and `useComboboxFilter` pass through their Base UI Combobox equivalents with En UI styling and `data-slot` attributes. `className` merges with the default classes.

Native and Base UI props pass through where supported. Use `className` for consumer styling without replacing protected interaction or accessibility behavior.

## Guidance

- Use `Combobox` instead of `Select` when the option list benefits from filtering; use `Select` when no input should be rendered.
- Keep item labels short; the input fills with the selected item label on a single line.
- Style a select-like trigger with `ComboboxTrigger` plus the `ComboboxValue` render prop, as shown in the `InputInsidePopup` story.
- Combine `ComboboxGroup`, `ComboboxGroupLabel`, and `ComboboxCollection` for grouped sources, separating groups with `ComboboxSeparator`.

## Accessibility

The component preserves its native or Base UI keyboard behavior, focus management, disabled semantics, and accessible relationships. Keep visible labels, focus indicators, and error descriptions intact. Test compositions against WCAG 2.2 AA.

## Storybook

Stories are split by usage scenario and include copyable TSX source in the Docs source panel. Start with `Basic`, then review state, composition, and variant stories relevant to the feature.

## Migration

Classification: `breaking`. Styles mapped to En UI theme variables; `ComboboxInput` size value `default` renamed to `md`.
