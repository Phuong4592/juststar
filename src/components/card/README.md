# Card

Contract ID: `component.card`

Groups related information and actions on a single surface.

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
import { Card, CardDescription, CardFooter, CardHeader, CardPanel, CardTitle } from "@enosta/en-ui"

;<Card>
  <CardHeader>
    <CardTitle>Project status</CardTitle>
    <CardDescription>Updated a few seconds ago.</CardDescription>
  </CardHeader>
  <CardPanel>All systems operational.</CardPanel>
  <CardFooter>Last checked today</CardFooter>
</Card>
```

Use `CardFrame` when a shared header, action, and footer frame one or more cards:

```tsx
import {
  Button,
  Card,
  CardFrame,
  CardFrameAction,
  CardFrameDescription,
  CardFrameFooter,
  CardFrameHeader,
  CardFrameTitle,
  CardPanel,
} from "@enosta/en-ui"

;<CardFrame>
  <CardFrameHeader>
    <CardFrameTitle>Project</CardFrameTitle>
    <CardFrameDescription>Manage project settings and configuration.</CardFrameDescription>
    <CardFrameAction>
      <Button variant="secondary">Add</Button>
    </CardFrameAction>
  </CardFrameHeader>
  <Card>
    <CardPanel>Project content</CardPanel>
  </Card>
  <CardFrameFooter>Updated today</CardFrameFooter>
</CardFrame>
```

For operational data, place `Table variant="card"` inside `CardFrame` so its border and radius align with the frame.

## Guidelines

- Use `Card` to group one related unit of content; do not use it as generic page spacing.
- Use `CardHeader` for a title, description, and optional `CardAction`.
- Use `CardFrame` to frame one or more cards or a card-styled table beneath shared context and actions.
- Place `CardFrameAction` beside `CardFrameTitle` and `CardFrameDescription` inside `CardFrameHeader`.
- `CardContent` is an alias of `CardPanel`; prefer `CardPanel` in new code and use one name consistently within a feature.
- Use `render` when a part must be a semantic element, e.g. `<Card render={<section />} />` or `<CardTitle render={<h3 />} />` when the card participates in the page outline.

## Anatomy

```tsx
<Card>
  <CardHeader>
    <CardTitle />
    <CardDescription />
    <CardAction />
  </CardHeader>
  <CardPanel />
  <CardFooter />
</Card>
```

```tsx
<CardFrame>
  <CardFrameHeader>
    <CardFrameTitle />
    <CardFrameDescription />
    <CardFrameAction />
  </CardFrameHeader>
  <Card />
  <CardFrameFooter />
</CardFrame>
```

Public exports: `cardVariants`, `CardProps`, `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardAction`, `CardPanel`, `CardFooter`, `CardFrame`, `CardFrameHeader`, `CardFrameTitle`, `CardFrameDescription`, `CardFrameAction`, `CardFrameFooter`, `CardContent`.

## API Reference

All parts render a native `<div>` and accept its native props. Every part also supports the `render` prop for element composition.

| Prop         | Type                                               | Default | Description                                                 |
| ------------ | -------------------------------------------------- | ------- | ----------------------------------------------------------- |
| `children`   | `ReactNode`                                        | —       | Content rendered by the selected card part.                 |
| `className`  | `string`                                           | —       | Consumer classes merged with the part's classes.            |
| `render`     | `ReactElement` \| `(props, state) => ReactElement` | —       | Replaces the rendered `<div>`. Passed through from Base UI. |
| Native props | `useRender.ComponentProps<"div">`                  | —       | Passed through to the rendered element.                     |

`CardProps` is the shared public prop type for every card part. `cardVariants` exposes the token-backed classes for all parts when lower-level composition is required. When `render` replaces an element, it receives the part's classes, children, and `data-slot` marker.

## CSS Variables

| Variable        | Description                                                     |
| --------------- | --------------------------------------------------------------- |
| `--clip-top`    | Controls clipping where nested cards meet the frame's top edge. |
| `--clip-bottom` | Controls clipping where nested cards meet the frame's bottom.   |

These variables support `CardFrame` clipping and should normally keep their component defaults.

## Guidance

- Choose semantic headings inside `CardTitle` or `CardFrameTitle` when the content participates in the page outline.
- Keep actions concise and place actions that affect the entire framed group in `CardFrameAction`.
- Use `CardPanel` for primary content and `CardFooter` or `CardFrameFooter` for supporting actions and metadata.

## Accessibility

Card parts are non-interactive native containers. Add semantic roles, labels, and heading elements when the composition requires them; do not place click behavior on the card surface when a link or button can express the action directly. Test compositions against WCAG 2.2 AA.

## Storybook

Start with `Overview`, then review `Basic`, `WithActions`, `CardFrame`, and `WithRender` for focused, copyable compositions.

## Migration

Classification: `compatible`. Existing card usage is unchanged; `render` adds element composition without an additional wrapper.
