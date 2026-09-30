# Button

Contract ID: `component.button`

Triggers an action or submits a form.

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
import { Button } from "@enosta/en-ui"

;<Button type="submit">Save changes</Button>
```

With an icon and loading state:

```tsx
<Button icon={<SaveIcon />} loading={isSaving}>
  Save changes
</Button>
```

Icon-only button (requires `aria-label` and `size="icon"`):

```tsx
<Button aria-label="Settings" icon={<SettingsIcon />} size="icon" />
```

## Guidelines

- **Submit buttons**: Unlike a native `<button>`, Button defaults to `type="button"`. Specify `type="submit"` explicitly when the button should submit a form.
- **Links**: Navigation must keep link semantics. Compose Button styling with an anchor or router link through `render` and set `nativeButton={false}`; do not implement navigation with a button element.
- **Loading**: Use `loading` for in-progress actions. It keeps the label visible, replaces the start icon with a spinner, hides the end icon, and sets `aria-busy`.
- **Icon-only**: Always provide an `aria-label` and use `size="icon"`.
- **As another element**: Use the `render` prop (inherited from Base UI) to compose Button styles with another element, such as a router link. Set `nativeButton={false}` when the rendered element is not a `<button>`.
- **Disabled focus**: Pass `focusableWhenDisabled` when a button becomes disabled during loading to prevent focus loss and maintain tab order.
- **Wrapping**: Labels remain on one line because every size has a fixed control height. Let the surrounding action group wrap or reflow instead of creating multi-line buttons.

## Anatomy

```tsx
<Button>Content</Button>
```

Public exports: `buttonVariants`, `ButtonProps`, `Button`.

## API Reference

| Prop                    | Type                                                                                                   | Default   | Description                                                                                                        |
| ----------------------- | ------------------------------------------------------------------------------------------------------ | --------- | ------------------------------------------------------------------------------------------------------------------ |
| `variant`               | `"primary"` \| `"secondary"` \| `"tertiary"` \| `"danger"` \| `"danger-soft"` \| `"ghost"` \| `"link"` | `primary` | Visual and semantic style.                                                                                         |
| `size`                  | `"xs"` \| `"sm"` \| `"md"` \| `"lg"` \| `"icon"`                                                       | `md`      | Control size. `icon` is for icon-only buttons.                                                                     |
| `icon`                  | `ReactNode` \| `{ start?: ReactNode; end?: ReactNode }`                                                | —         | Icon placement. A single ReactNode renders as a leading icon. Pass an object for explicit start and end positions. |
| `loading`               | `boolean`                                                                                              | `false`   | Replaces the start icon with a spinner, hides the end icon, keeps the label visible, and sets `aria-busy`.         |
| `disabled`              | `boolean`                                                                                              | `false`   | Prevents interaction. Passed through to the underlying button element.                                             |
| `render`                | `ReactElement` \| `(props, state) => ReactElement`                                                     | —         | Replaces the rendered HTML element. Passed through from Base UI.                                                   |
| `focusableWhenDisabled` | `boolean`                                                                                              | `false`   | Keeps the button focusable when disabled. Passed through from Base UI.                                             |
| `nativeButton`          | `boolean`                                                                                              | `true`    | Set to `false` when `render` replaces with a non-button tag. Passed through from Base UI.                          |
| `className`             | `string`                                                                                               | —         | Consumer styling; merged with variant classes.                                                                     |

Native and Base UI props pass through where supported. Use `className` for consumer styling without replacing protected interaction or accessibility behavior.

## CSS Variables

| Variable            | Description                                                      |
| ------------------- | ---------------------------------------------------------------- |
| `--btn-edge`        | Inner edge shadow on bordered variants (secondary, danger-soft). |
| `--btn-highlight`   | Inner highlight on solid variants (primary, danger).             |
| `--btn-press`       | Inner shadow on active state.                                    |
| `--btn-press-scale` | Active-state press scale.                                        |

These are internal protected variables; consumers should not override them.

## Accessibility

The component preserves its native or Base UI keyboard behavior, focus management, disabled semantics, and accessible relationships. Keep visible labels, focus indicators, and error descriptions intact. Test compositions against WCAG 2.2 AA.

## Storybook

Stories are split by usage scenario and include copyable TSX source in the Docs source panel. Start with `Basic`, then review state, composition, and variant stories relevant to the feature.

## Migration

Classification: `breaking`. Styles mapped to En UI theme variables.
