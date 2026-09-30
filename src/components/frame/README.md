# Frame

Contract ID: `component.frame`

A framed container for grouping related panels with a unified background treatment.

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
  Frame,
  FrameDescription,
  FrameFooter,
  FrameHeader,
  FramePanel,
  FrameTitle,
  Typography,
} from "@enosta/en-ui"
```

```tsx
<Frame>
  <FrameHeader>
    <FrameTitle>Usage</FrameTitle>
    <FrameDescription>API calls this month</FrameDescription>
  </FrameHeader>
  <FramePanel>
    <Typography.Label as="p" className="text-neutral-900">
      Team plan
    </Typography.Label>
    <Typography.Small className="text-neutral-500">850,000 of 1M requests used</Typography.Small>
  </FramePanel>
  <FrameFooter>
    <Button size="sm">Upgrade plan</Button>
  </FrameFooter>
</Frame>
```

## Guidelines

- Compose `FrameHeader`, `FramePanel`, and `FrameFooter` as direct children of `Frame`.
- Use `FramePanel` for each content section and `FrameFooter` for frame-level actions.
- Prefer `Card` for a single independent content object; use `Frame` for connected panels.
- Use semantic headings inside titles when the frame is part of the document outline.
- Multiple panels are automatically separated with spacing.

## Anatomy

```tsx
<Frame>
  <FrameHeader>
    <FrameTitle>Title</FrameTitle>
    <FrameDescription>Description</FrameDescription>
  </FrameHeader>
  <FramePanel>Content</FramePanel>
  <FrameFooter>Footer</FrameFooter>
</Frame>
```

Public exports: `Frame`, `FramePanel`, `FrameHeader`, `FrameTitle`, `FrameDescription`, `FrameFooter`.

## API Reference

### Frame

The main container component for grouping related panels.

| Prop        | Type     | Default | Description                                 |
| ----------- | -------- | ------- | ------------------------------------------- |
| `className` | `string` | —       | Consumer styling; merged with base classes. |

### FramePanel

A panel container for frame content.

| Prop        | Type     | Default | Description                                 |
| ----------- | -------- | ------- | ------------------------------------------- |
| `className` | `string` | —       | Consumer styling; merged with base classes. |

### FrameHeader

Header section for the frame.

| Prop        | Type     | Default | Description                                 |
| ----------- | -------- | ------- | ------------------------------------------- |
| `className` | `string` | —       | Consumer styling; merged with base classes. |

### FrameTitle

Title text for the panel header.

| Prop        | Type     | Default | Description                                 |
| ----------- | -------- | ------- | ------------------------------------------- |
| `className` | `string` | —       | Consumer styling; merged with base classes. |

### FrameDescription

Description text for the panel header.

| Prop        | Type     | Default | Description                                 |
| ----------- | -------- | ------- | ------------------------------------------- |
| `className` | `string` | —       | Consumer styling; merged with base classes. |

### FrameFooter

Footer section for the frame.

| Prop        | Type     | Default | Description                                 |
| ----------- | -------- | ------- | ------------------------------------------- |
| `className` | `string` | —       | Consumer styling; merged with base classes. |

Native and Base UI props pass through where supported. Use `className` for consumer styling without replacing protected interaction or accessibility behavior.

## Guidance

- Compose `FrameHeader`, `FramePanel`, and `FrameFooter` as direct children of `Frame`.
- Use `FramePanel` for each content section and `FrameFooter` for frame-level actions.
- Prefer `Card` for a single independent content object; use `Frame` for connected panels.
- Use semantic headings inside titles when the frame is part of the document outline.

## Accessibility

The component preserves its native keyboard behavior, focus management, disabled semantics, and accessible relationships. Keep visible labels, focus indicators, and error descriptions intact. Test compositions against WCAG 2.2 AA.

## Storybook

Stories are split by usage scenario and include copyable TSX source in the Docs source panel. Start with `Basic`, then review state, composition, and variant stories relevant to the feature.

## Migration

Classification: `compatible`. Header, panel, and footer compose as direct children of `Frame`; styles mapped to En UI theme variables.
