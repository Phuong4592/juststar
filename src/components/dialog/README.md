# Dialog

Contract ID: `component.dialog`

Opens modal content above the page for a focused task.

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
  Dialog,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPanel,
  DialogPopup,
  DialogTitle,
  DialogTrigger,
} from "@enosta/en-ui"

;<Dialog>
  <DialogTrigger render={<Button />}>Edit profile</DialogTrigger>
  <DialogPopup>
    <DialogHeader>
      <DialogTitle>Edit profile</DialogTitle>
      <DialogDescription>Update your account details.</DialogDescription>
    </DialogHeader>
    <DialogPanel>Form content</DialogPanel>
    <DialogFooter>
      <DialogClose render={<Button />}>Save</DialogClose>
    </DialogFooter>
  </DialogPopup>
</Dialog>
```

## Anatomy

```tsx
<Dialog>
  <DialogTrigger render={<Button />}>Open</DialogTrigger>
  <DialogPopup>
    <DialogHeader>
      <DialogTitle>Title</DialogTitle>
      <DialogDescription>Description</DialogDescription>
    </DialogHeader>
    <DialogPanel>Content</DialogPanel>
    <DialogFooter>Actions</DialogFooter>
  </DialogPopup>
</Dialog>
```

Public exports: `dialogVariants`, `Dialog`, `DialogCreateHandle`, `DialogPortal`, `DialogTrigger`, `DialogClose`, `DialogBackdrop`, `DialogViewport`, `DialogPopupProps`, `DialogPopup`, `DialogHeader`, `DialogFooterProps`, `DialogFooter`, `DialogTitle`, `DialogDescription`, `DialogPanelProps`, `DialogPanel`, `DialogOverlay`, `DialogContent`.

## API Reference

| Prop                  | Type                  | Default     | Description                                                                           |
| --------------------- | --------------------- | ----------- | ------------------------------------------------------------------------------------- |
| `showCloseButton`     | `boolean`             | `true`      | Renders a ghost icon close button in the popup's top corner.                          |
| `bottomStickOnMobile` | `boolean`             | `true`      | Anchors the popup to the viewport bottom on small screens with a slide-up transition. |
| `variant`             | `"default" \| "bare"` | `"default"` | `DialogFooter` treatment. `default` renders a separated footer surface.               |
| `scrollFade`          | `boolean`             | `true`      | `DialogPanel` scroll fade effect on overflowing content.                              |
| `closeProps`          | `DialogClose.Props`   | -           | Props forwarded to the built-in close button.                                         |
| `portalProps`         | `DialogPortal.Props`  | -           | Props forwarded to the portal that mounts the popup.                                  |

Native and Base UI props pass through where supported. Use `className` for consumer styling without replacing protected interaction or accessibility behavior.

## Guidance

- Every dialog needs a descriptive `DialogTitle`; add `DialogDescription` when the task needs context.
- Use `DialogPanel` for scrollable body content and `DialogFooter` for actions.
- Do not replace built-in focus trapping, Escape dismissal, or focus restoration.

## Accessibility

The component preserves its native or Base UI keyboard behavior, focus management, disabled semantics, and accessible relationships. Keep visible labels, focus indicators, and error descriptions intact. Test compositions against WCAG 2.2 AA.

## Storybook

Stories are split by usage scenario and include copyable TSX source in the Docs source panel. Start with `Basic`, then review state, composition, and variant stories relevant to the feature.

## Migration

Classification: `compatible`. Styles mapped to En UI theme variables.
