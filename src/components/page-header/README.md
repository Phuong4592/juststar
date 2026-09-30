# Page Header

Contract ID: `component.page-header`

Use `PageHeader` once at the start of an application page. It owns the page `h1`, introductory hierarchy, responsive actions, and optional page-level navigation context.

## Usage

```tsx
import { Button, PageHeader } from "@enosta/en-ui"

;<PageHeader
  breadcrumbs={<a href="/projects">Projects</a>}
  title="Website redesign"
  description="Delivery status, ownership, and project activity."
  actions={<Button>New task</Button>}
/>
```

## Anatomy

```tsx
<PageHeader
  breadcrumbs={...}
  eyebrow={...}
  title={...}
  description={...}
  actions={...}
  metadata={...}
  tabs={...}
/>
```

Public exports: `pageHeaderVariants`, `PageHeaderProps`, `PageHeader`.

## API Reference

| Prop          | Type                     | Default   | Description                                       |
| ------------- | ------------------------ | --------- | ------------------------------------------------- |
| `title`       | `ReactNode`              | required  | Single page-level `h1`.                           |
| `description` | `ReactNode`              | -         | Supporting copy below the heading.                |
| `eyebrow`     | `ReactNode`              | -         | Short context label above the heading.            |
| `breadcrumbs` | `ReactNode`              | -         | Breadcrumb or back-navigation content.            |
| `actions`     | `ReactNode`              | -         | Page actions that wrap below copy when necessary. |
| `metadata`    | `ReactNode`              | -         | Status, ownership, or operational metadata.       |
| `tabs`        | `ReactNode`              | -         | Page-level navigation after the introduction.     |
| `density`     | `"compact" \| "default"` | `default` | Vertical spacing density.                         |

Native `header` props pass through except the native `title` attribute, which is replaced by the required heading slot.

## Guidance

- Render only one `PageHeader` per page.
- Keep primary actions first in the `actions` slot and allow them to wrap naturally on narrow screens.
- Use `metadata` for status and ownership, not for long descriptive prose.
- Use `tabs` only for navigation within the current page entity or workflow.
- Use `PageSection` for headings inside the page instead of adding another `h1`.

## Accessibility

The component renders one `h1` and labels the header boundary with it. Breadcrumbs and tabs must preserve their own navigation labels. Action controls retain their native focus order after the page copy.

## Migration

Classification: `compatible`. New in `0.4.0`.
