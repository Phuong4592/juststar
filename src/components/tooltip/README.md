# Tooltip

Contract ID: `component.tooltip`

Shows a short, non-interactive hint on hover or keyboard focus.

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
import { Tooltip } from "@enosta/en-ui"

;<Tooltip popup="Open settings" trigger={<button type="button">Settings</button>} />
```

Position relative to the trigger:

```tsx
<Tooltip
  align="start"
  popup="Keyboard shortcuts"
  side="right"
  trigger={<button type="button">Help</button>}
/>
```

Anchor to a custom element instead of the trigger:

```tsx
<Tooltip anchor={anchorElement} popup="Copied" trigger={<button type="button">Copy</button>} />
```

### Grouped tooltips

Wrap multiple tooltips in a `TooltipProvider` so hovering across adjacent triggers shows each tooltip instantly, without reapplying the open delay:

```tsx
import { Tooltip, TooltipProvider } from "@enosta/en-ui"

;<TooltipProvider>
  <Tooltip
    popup="Bold"
    trigger={
      <button aria-label="Bold" type="button">
        <BoldIcon />
      </button>
    }
  />
  <Tooltip
    popup="Italic"
    trigger={
      <button aria-label="Italic" type="button">
        <ItalicIcon />
      </button>
    }
  />
</TooltipProvider>
```

### Animated tooltips

For one shared popup that animates smoothly between triggers, connect detached `TooltipTrigger`s to a single `TooltipRoot` through a handle created with `TooltipCreateHandle`:

```tsx
import {
  TooltipCreateHandle,
  TooltipPopup,
  TooltipProvider,
  TooltipRoot,
  TooltipTrigger,
} from "@enosta/en-ui"

const handle = TooltipCreateHandle<ComponentType>()

;<TooltipProvider>
  <TooltipTrigger
    aria-label="Bold"
    handle={handle}
    payload={BoldContent}
    render={<button type="button" />}
  >
    <BoldIcon />
  </TooltipTrigger>
  <TooltipTrigger
    aria-label="Italic"
    handle={handle}
    payload={ItalicContent}
    render={<button type="button" />}
  >
    <ItalicIcon />
  </TooltipTrigger>
  <TooltipRoot handle={handle}>
    {({ payload: Payload }) => <TooltipPopup>{Payload != null && <Payload />}</TooltipPopup>}
  </TooltipRoot>
</TooltipProvider>
```

## Anatomy

```tsx
<Tooltip popup="Hint text" trigger={<button type="button">Label</button>} />
```

Renders a trigger, a portalled positioner, and a popup surface. Composable parts (`TooltipProvider`, `TooltipRoot`, `TooltipTrigger`, `TooltipPopup`, `TooltipCreateHandle`) are available for grouped and animated compositions.

Public exports: `TooltipProps`, `Tooltip`, `tooltipVariants`, `TooltipProvider`, `TooltipRoot`, `TooltipCreateHandle`, `TooltipTrigger`, `TooltipTriggerProps`, `TooltipPopup`, `TooltipPopupProps`.

## API Reference

| Prop         | Type                                        | Default    | Description                                                                                            |
| ------------ | ------------------------------------------- | ---------- | ------------------------------------------------------------------------------------------------------ |
| `trigger`    | `ReactNode`                                 | —          | Trigger content. An element is rendered as-is; otherwise a default focusable button wraps the content. |
| `popup`      | `ReactNode`                                 | —          | Tooltip content shown on hover or focus.                                                               |
| `side`       | `"top" \| "right" \| "bottom" \| "left"`    | `"top"`    | Preferred side of the trigger. May flip to fit the viewport.                                           |
| `align`      | `"start" \| "center" \| "end"`              | `"center"` | Alignment along the chosen side.                                                                       |
| `sideOffset` | `number`                                    | `4`        | Distance in pixels between the popup and the trigger.                                                  |
| `anchor`     | Base UI anchor (`Element`, ref, or virtual) | —          | Element or virtual anchor the tooltip positions against.                                               |
| `classNames` | `{ popup?: string; positioner?: string }`   | —          | Consumer classes merged into the corresponding slots.                                                  |

### Composable parts

| Part                  | Type / Props                                                                             | Description                                               |
| --------------------- | ---------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| `TooltipProvider`     | `TooltipProvider.Props` (`delay`, `closeDelay`, `timeout`)                               | Shares open delay across grouped tooltips.                |
| `TooltipRoot`         | `TooltipRoot.Props<Payload>` (`handle`, render-function `children`)                      | Composable root for detached triggers.                    |
| `TooltipCreateHandle` | `TooltipCreateHandle<Payload>()`                                                         | Creates a handle linking triggers to a root.              |
| `TooltipTrigger`      | `TooltipTriggerProps` (`handle`, `payload`, `render`, ...)                               | Detached trigger element (`data-slot="tooltip-trigger"`). |
| `TooltipPopup`        | `TooltipPopupProps` (`side`, `align`, `sideOffset`, `anchor`, `classNames`, `className`) | Portalled popup surface.                                  |

## Guidance

- Tooltip content should supplement, not replace, a control accessible name.
- Do not place links, buttons, or required instructions inside a tooltip.
- The trigger must be keyboard focusable; wrap disabled controls in a focusable element if a hint is required.
- Keep popup content short; `side` is a preference and Base UI may flip it to stay in the viewport.
- Wrap toolbar groups in `TooltipProvider` so moving between adjacent triggers opens tooltips instantly.
- For a single animated popup shared across triggers, prefer the handle-based `TooltipRoot` composition over stacking individual tooltips.
- Add a hover bridge (an `after:` strip extending over the gap) to detached triggers so the pointer never leaves hover while moving between adjacent buttons.

## Accessibility

The component preserves its Base UI keyboard behavior, focus management, and accessible relationships: the popup opens on hover and keyboard focus and closes on Escape or blur. Keep visible labels, focus indicators, and error descriptions intact. Test compositions against WCAG 2.2 AA.

## Storybook

Stories are split by usage scenario and include copyable TSX source in the Docs source panel. Start with `Basic`, then review the `Positioned` and `Aligned` placement stories and the `Overview` page.

## Migration

Classification: `compatible`. Styles mapped to En UI theme variables.
