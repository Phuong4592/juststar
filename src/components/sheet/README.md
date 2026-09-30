# Sheet

Contract ID: `component.sheet`

Opens modal content as a flyout from a screen edge for a focused task.

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
  Sheet,
  SheetClose,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetPanel,
  SheetPopup,
  SheetTitle,
  SheetTrigger,
} from "@enosta/en-ui"

;<Sheet>
  <SheetTrigger render={<Button />}>Edit profile</SheetTrigger>
  <SheetPopup>
    <SheetHeader>
      <SheetTitle>Edit profile</SheetTitle>
      <SheetDescription>Update your account details.</SheetDescription>
    </SheetHeader>
    <SheetPanel>Form content</SheetPanel>
    <SheetFooter>
      <SheetClose render={<Button />}>Save</SheetClose>
    </SheetFooter>
  </SheetPopup>
</Sheet>
```

## Guidelines

- Use side sheets for inspect-asides and quick edits that keep page context visible; use `side="bottom"` on mobile-first flows.
- Every sheet needs a descriptive `SheetTitle`; add `SheetDescription` when the task needs context.
- Use `SheetPanel` for scrollable body content and `SheetFooter` for actions.
- Do not replace built-in focus trapping, Escape dismissal, or focus restoration.

## Anatomy

```tsx
<Sheet>
  <SheetTrigger render={<Button />}>Open</SheetTrigger>
  <SheetPopup side="right">
    <SheetHeader>
      <SheetTitle>Title</SheetTitle>
      <SheetDescription>Description</SheetDescription>
    </SheetHeader>
    <SheetPanel>Content</SheetPanel>
    <SheetFooter>Actions</SheetFooter>
  </SheetPopup>
</Sheet>
```

Public exports: `sheetVariants`, `Sheet`, `SheetPortal`, `SheetTrigger`, `SheetClose`, `SheetBackdrop`, `SheetPopupProps`, `SheetPopup`, `SheetHeader`, `SheetFooterProps`, `SheetFooter`, `SheetTitle`, `SheetDescription`, `SheetPanelProps`, `SheetPanel`, `SheetOverlay`, `SheetContent`.

## API Reference

| Prop              | Type                                     | Default     | Description                                                                       |
| ----------------- | ---------------------------------------- | ----------- | --------------------------------------------------------------------------------- |
| `side`            | `"right" \| "left" \| "top" \| "bottom"` | `"right"`   | Screen edge the sheet opens from.                                                 |
| `variant`         | `"default" \| "inset"`                   | `"default"` | `SheetPopup` treatment. `inset` floats the sheet with spacing on desktop screens. |
| `showCloseButton` | `boolean`                                | `true`      | Renders a ghost icon close button in the popup's top corner.                      |
| `variant`         | `"default" \| "bare"`                    | `"default"` | `SheetFooter` treatment. `default` renders a separated footer surface.            |
| `scrollFade`      | `boolean`                                | `true`      | `SheetPanel` scroll fade effect on overflowing content.                           |
| `closeProps`      | `SheetClose.Props`                       | -           | Props forwarded to the built-in close button.                                     |
| `portalProps`     | `SheetPortal.Props`                      | -           | Props forwarded to the portal that mounts the popup.                              |

Native and Base UI props pass through where supported. Use `className` for consumer styling without replacing protected interaction or accessibility behavior.

## Accessibility

The component preserves its native or Base UI keyboard behavior, focus management, disabled semantics, and accessible relationships. Keep visible labels, focus indicators, and error descriptions intact. Test compositions against WCAG 2.2 AA.

## Storybook

Stories are split by usage scenario and include copyable TSX source in the Docs source panel. Start with `Basic`, then review state, composition, and variant stories relevant to the feature.

## Migration

Classification: `compatible`. Introduces the Sheet component with styles mapped to En UI theme variables.
