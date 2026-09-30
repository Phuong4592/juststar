# Kbd

Contract ID: `component.kbd`

Represents a single keyboard key or a key combination inside running text.

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
import { Kbd } from "@enosta/en-ui"

;<Kbd>Esc</Kbd>
```

A key combination:

```tsx
<Kbd.Group>
  <Kbd>⌘</Kbd>
  <Kbd>K</Kbd>
</Kbd.Group>
```

Inline with text:

```tsx
<Typography.Text>
  Press <Kbd>⌘</Kbd> + <Kbd>K</Kbd> to open the command palette.
</Typography.Text>
```

## Guidelines

- **Combinations**: Wrap modifier-plus-key sequences in `Kbd.Group` so the keys read as one shortcut instead of scattered tokens.
- **Platform labels**: Match key labels to the active platform (`⌘` on macOS, `Ctrl` elsewhere) when the shortcut differs.
- **Technical font**: Keys render in the mono technical typography role; keep ordinary interface copy in the default text role.
- **Non-interactive**: Kbd only labels keys. Never attach handlers or focus behavior to it.

## Anatomy

```tsx
<Kbd.Group>
  <Kbd>⌘</Kbd>
  <Kbd>K</Kbd>
</Kbd.Group>
```

The root renders a native `<kbd>` element; `Kbd.Group` renders a non-interactive `<span>` wrapper that joins the keys of one shortcut.

Public exports: `kbdVariants`, `KbdProps`, `Kbd`, `KbdGroupProps`.

## API Reference

| Prop                 | Type      | Default | Description                                   |
| -------------------- | --------- | ------- | --------------------------------------------- |
| Native `<kbd>` props | inherited | -       | Passed through to the kbd element.            |
| `className`          | `string`  | -       | Consumer styling merged with the key classes. |

## Guidance

- Use one `Kbd` per physical key; the surrounding text explains what the combination does.
- Prefer short key names (`Esc`, `Tab`, `F4`) over sentences inside a key.
- Do not use `Kbd` for menu paths, buttons, or anything that is not a keyboard key.

## Accessibility

Kbd renders a native `<kbd>` element and adds no role, focus, or keyboard behavior. Adjacent text must state the action the shortcut performs; the key label alone is not a description. Test compositions against WCAG 2.2 AA.

## Storybook

Stories are split by usage scenario and include copyable TSX source in the Docs source panel. Start with `Basic`, then review `Shortcut`.

## Migration

Classification: `compatible`. Keyboard keys keep their appearance and now resolve the mono technical typography role through theme tokens.
