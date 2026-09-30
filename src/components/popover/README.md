# Popover

Contract ID: `component.popover`

Displays focused supporting content next to a trigger.

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
import {
  Button,
  Popover,
  PopoverDescription,
  PopoverPopup,
  PopoverTitle,
  PopoverTrigger,
} from "@enosta/en-ui"

;<Popover>
  <PopoverTrigger render={<Button />}>Open details</PopoverTrigger>
  <PopoverPopup>
    <PopoverTitle>Workspace</PopoverTitle>
    <PopoverDescription>Shared with four members.</PopoverDescription>
  </PopoverPopup>
</Popover>
```

## Anatomy

```tsx
<Popover>Content</Popover>
```

Public exports: `Popover`, `PopoverCreateHandle`, `PopoverPopupProps`, `PopoverTrigger`, `PopoverPopup`, `PopoverClose`, `PopoverTitle`, `PopoverDescription`.

## API Reference

| Prop           | Type                                     | Default    | Description                                                              |
| -------------- | ---------------------------------------- | ---------- | ------------------------------------------------------------------------ |
| `side`         | `"top" \| "bottom" \| "left" \| "right"` | `"bottom"` | Preferred side of the anchor to position the popup.                      |
| `align`        | `"start" \| "center" \| "end"`           | `"center"` | Alignment of the popup relative to the anchor on the chosen side.        |
| `sideOffset`   | `number`                                 | `4`        | Distance in pixels between the popup and the anchor along the side axis. |
| `alignOffset`  | `number`                                 | `0`        | Offset in pixels along the alignment axis.                               |
| `anchor`       | `HTMLElement \| VirtualElement`          | —          | Element or virtual element the popup anchors to instead of the trigger.  |
| `tooltipStyle` | `boolean`                                | `false`    | Renders the popup as a compact, tooltip-like panel.                      |

Positioning props belong to `PopoverPopup`; Base UI portal props can be forwarded through `portalProps`. Native and Base UI props pass through where supported. Use `className` for consumer styling without replacing protected interaction or accessibility behavior.

## Guidance

- Use Popover for interactive or structured content; use Tooltip for short non-interactive hints.
- Give the popup a title or accessible name when its purpose is not obvious.
- Positioning, dismissal, and focus behavior come from Base UI props and should remain intact.

## Accessibility

The component preserves its native or Base UI keyboard behavior, focus management, disabled semantics, and accessible relationships. Keep visible labels, focus indicators, and error descriptions intact. Test compositions against WCAG 2.2 AA.

## Storybook

Stories are split by usage scenario and include copyable TSX source in the Docs source panel. Start with `Basic`, then review state, composition, and variant stories relevant to the feature.

## Migration

Classification: `compatible`. Styles mapped to En UI theme variables.
