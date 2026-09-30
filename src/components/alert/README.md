# Alert

Contract ID: `component.alert`

A callout for displaying important information with a semantic color scheme.

## Installation

```bash
pnpm add @enosta/en-ui
```

Import the styles once in your application entry:

```ts
import "@enosta/en-ui/styles.css"
```

## Usage

```tsx
import { Alert, AlertDescription, AlertTitle } from "@enosta/en-ui"

;<Alert>
  <AlertTitle>Heads up!</AlertTitle>
  <AlertDescription>
    You can add components and dependencies to your app using the cli.
  </AlertDescription>
</Alert>
```

With a variant:

```tsx
<Alert variant="error">
  <AlertTitle>Something went wrong</AlertTitle>
  <AlertDescription>We could not save your changes. Please try again.</AlertDescription>
</Alert>
```

With a leading icon and actions:

```tsx
import { Icon } from "@iconify/react"

;<Alert variant="warning">
  <Icon icon="solar:danger-triangle-linear" />
  <AlertTitle>Session expiring</AlertTitle>
  <AlertDescription>Your session expires in 5 minutes.</AlertDescription>
  <AlertAction>
    <Button size="sm">Extend session</Button>
  </AlertAction>
</Alert>
```

## Guidelines

- **Choose the semantic variant**, not a color: use `info` for notices, `success` for confirmations, `warning` for time-sensitive risks, and `error` for failures. Use `default` for neutral content that still needs emphasis.
- **Icons** are composed by rendering an `Icon` as the first child of `Alert`. It shares the first line with `AlertTitle`, and the title and description align in a second column beside it. Icons default to `size-3xl`; pass a `size-*` class to override.
- **Actions** go inside `AlertAction`. They pin to the end of the callout, vertically centered beside the text, on larger screens and drop below the text column on small screens. Keep at most two actions per alert; prefer a single primary action.
- **Do not wrap interactive widgets** such as forms inside an Alert. Use a dialog or an inline panel for that.
- **Alerts are non-dismissable.** For transient notifications use the Toast component instead.

## Anatomy

```tsx
<Alert>
  <AlertTitle>Title</AlertTitle>
  <AlertDescription>Description</AlertDescription>
  <AlertAction>Actions</AlertAction>
</Alert>
```

Public exports: `alertVariants`, `AlertProps`, `Alert`, `AlertTitle`, `AlertDescription`, `AlertAction`.

## API Reference

| Prop        | Type                                                               | Default   | Description                                                         |
| ----------- | ------------------------------------------------------------------ | --------- | ------------------------------------------------------------------- |
| `variant`   | `"default"` \| `"info"` \| `"success"` \| `"warning"` \| `"error"` | `default` | Semantic color scheme rendered with the matching tinted token pair. |
| `children`  | `ReactNode`                                                        | —         | Alert content: title, description, optional icon, optional actions. |
| `className` | `string`                                                           | —         | Consumer styling; merged with variant classes.                      |

Native `div` props pass through to each part. `AlertTitle`, `AlertDescription`, and `AlertAction` accept `className` and native `div` props.

## Guidance

- The root renders `role="alert"` so assistive technology announces the content. Keep alert copy short and self-contained.
- Each variant resolves the tinted token pair from the theme (for example `info-25` surface with `info-200` border and `info-900` text); do not override these with raw colors.
- The root is a grid that adapts its columns automatically: one column by default, an icon column when a leading `svg` is present, and an action column when `AlertAction` is rendered. Do not insert elements between `Alert` and its parts; keep the icon, title, description, and action as direct children.
- Use the `default` variant when no semantic status applies.

## Accessibility

The component renders with `role="alert"` and preserves its native semantics. Keep visible titles and descriptions intact, maintain the tinted foreground/background pairs for WCAG 2.2 AA contrast, and never remove the alert role when composing.

## Storybook

Stories are split by usage scenario and include copyable TSX source in the Docs source panel. Start with `Basic`, then review `WithIcon` and `WithActions` for composition patterns.

## Migration

Classification: `compatible`. Introduces Alert.
