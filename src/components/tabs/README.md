# Tabs

Contract ID: `component.tabs`

Toggles between related panels on the same page.

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
import { Tabs, TabsList, TabsTab, TabsPanel } from "@enosta/en-ui"

;<Tabs defaultValue="tab-1">
  <TabsList>
    <TabsTab value="tab-1">Tab 1</TabsTab>
    <TabsTab value="tab-2">Tab 2</TabsTab>
    <TabsTab value="tab-3">Tab 3</TabsTab>
  </TabsList>
  <TabsPanel value="tab-1">Tab 1 content</TabsPanel>
  <TabsPanel value="tab-2">Tab 2 content</TabsPanel>
  <TabsPanel value="tab-3">Tab 3 content</TabsPanel>
</Tabs>
```

With the underline variant, the track border comes from a wrapper element:

```tsx
<Tabs defaultValue="tab-1">
  <div className="border-b border-neutral-200">
    <TabsList variant="underline">
      <TabsTab value="tab-1">Tab 1</TabsTab>
      <TabsTab value="tab-2">Tab 2</TabsTab>
      <TabsTab value="tab-3">Tab 3</TabsTab>
    </TabsList>
  </div>
  <TabsPanel value="tab-1">Tab 1 content</TabsPanel>
  <TabsPanel value="tab-2">Tab 2 content</TabsPanel>
  <TabsPanel value="tab-3">Tab 3 content</TabsPanel>
</Tabs>
```

## Guidelines

- **Choosing Tabs**: Use Tabs for switching between related views of the same object. Use Radio Group for form selection, Toggle Group for multi-state controls, and plain navigation links for leaving the current context.
- **Values**: Every `TabsTab` and `TabsPanel` needs a unique `value`; the root's `defaultValue` (or controlled `value`) must match one of them.
- **Indicator**: `TabsList` renders the active-tab indicator automatically; do not add it manually. The default variant shows an inset pill behind the active tab; the underline variant shows a brand line on the track.
- **Sizes and variants**: `size` and `variant` live on `TabsList` and style all tab triggers; a single `TabsTab` can override `size` for the segmented-control optical sizing. Sizes are slightly taller than a Button of the same step so the inset indicator stays balanced next to adjacent controls.
- **Vertical layouts**: Pass `orientation="vertical"` on the root; the list stacks and triggers align to the start. Wrap the list in `border-s` for a vertical underline track.
- **Controlled usage**: Pass `value` and `onValueChange` for controlled activation.
- **Links**: Use the `render` prop with `nativeButton={false}` on `TabsTab` to compose router links as tabs.

## Anatomy

```tsx
<Tabs defaultValue="tab-1">
  <TabsList>
    <TabsTab value="tab-1">Tab 1</TabsTab>
  </TabsList>
  <TabsPanel value="tab-1">Panel content</TabsPanel>
</Tabs>
```

Public exports: `tabsVariants`, `TabsProps`, `TabsListProps`, `TabsTabProps`, `TabsPanelProps`, `TabsSize`, `TabsVariant`, `Tabs`, `TabsList`, `TabsTab`, `TabsPanel`. The indicator part is rendered internally by `TabsList`.

## API Reference

| Prop            | Type                                               | Default      | Description                                                                                |
| --------------- | -------------------------------------------------- | ------------ | ------------------------------------------------------------------------------------------ |
| `defaultValue`  | `any`                                              | —            | Uncontrolled value of the active tab. `Tabs` passthrough from Base UI.                     |
| `value`         | `any`                                              | —            | Controlled value of the active tab. `Tabs` passthrough from Base UI.                       |
| `onValueChange` | `(value, eventDetails) => void`                    | —            | Fired when the active tab changes. `Tabs` passthrough from Base UI.                        |
| `orientation`   | `"horizontal"` \| `"vertical"`                     | `horizontal` | Orientation of the tab list and arrow-key navigation. Passed through from Base UI.         |
| `variant`       | `"default"` \| `"underline"`                       | `default`    | Visual style of the tab list. `underline` swaps the inset pill indicator for a brand line. |
| `size`          | `"sm"` \| `"default"` \| `"lg"`                    | `default`    | Control size of all tab triggers; propagated to `TabsTab` through context.                 |
| `size`          | `"sm"` \| `"default"` \| `"lg"`                    | —            | Per-trigger override on `TabsTab`.                                                         |
| `keepMounted`   | `boolean`                                          | `false`      | Keeps hidden panels in the DOM. `TabsPanel` passthrough from Base UI.                      |
| `disabled`      | `boolean`                                          | `false`      | Disables a tab trigger. `TabsTab` passthrough from Base UI.                                |
| `render`        | `ReactElement` \| `(props, state) => ReactElement` | —            | Replaces the rendered HTML element. Passed through from Base UI on every part.             |
| `className`     | `string`                                           | —            | Consumer styling; merged with variant classes on every part.                               |

Native and Base UI props pass through where supported. Use `className` for consumer styling without replacing protected interaction or accessibility behavior.

## CSS Variables

| Variable              | Description                                                                  |
| --------------------- | ---------------------------------------------------------------------------- |
| `--active-tab-left`   | Base UI-provided left offset of the active tab, consumed by the indicator.   |
| `--active-tab-width`  | Base UI-provided width of the active tab, consumed by the indicator.         |
| `--active-tab-height` | Base UI-provided height of the active tab, consumed by the indicator.        |
| `--active-tab-bottom` | Base UI-provided bottom offset of the active tab, consumed by the indicator. |

These are internal protected variables set by Base UI; consumers should not override them.

## Guidance

- Use `variant="underline"` for page-level sections; the default variant reads as a segmented control for in-page switching.
- Keep tab labels short and single-line; triggers are fixed-height controls and never wrap.
- Panels unmount when hidden. Pass `keepMounted` when hidden panels must stay in the DOM (for example, to preserve form state).
- Icons inside triggers shrink to fit, receive 80% opacity, and get negative inline margins for optical alignment; pass a `size-*` class to control an icon explicitly.

## Accessibility

The component preserves Base UI tab semantics: the list is a `tablist`, triggers are keyboard-focusable `tab` buttons with arrow-key navigation and loop focus, and panels carry their `tabpanel` relationships. Keep visible labels, focus indicators, and disabled states intact. Test compositions against WCAG 2.2 AA.

## Storybook

Stories are split by usage scenario and include copyable TSX source in the Docs source panel. Start with `Basic`, then review size, variant, orientation, and state stories relevant to the feature.

## Migration

Classification: `compatible`. Introduces Tabs.
