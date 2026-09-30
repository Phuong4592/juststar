# Page Section

Contract ID: `component.page-section`

Use `PageSection` for a named group of related content inside a page. It owns the section landmark, heading relationship, responsive section actions, and spacing between its introduction and content.

## Usage

```tsx
import { Button, PageSection } from "@enosta/en-ui"

;<PageSection
  title="Members"
  description="People with workspace access"
  actions={<Button>Invite</Button>}
>
  Member content
</PageSection>
```

## Anatomy

```tsx
<PageSection
  title={...}
  description={...}
  actions={...}
  headingAs="h2"
  variant="plain"
  density="comfortable"
>
  Content
</PageSection>
```

Public exports: `pageSectionVariants`, `PageSectionProps`, `PageSection`.

## API Reference

| Prop          | Type                         | Default       | Description                          |
| ------------- | ---------------------------- | ------------- | ------------------------------------ |
| `title`       | `ReactNode`                  | required      | Section heading.                     |
| `description` | `ReactNode`                  | -             | Supporting section copy.             |
| `actions`     | `ReactNode`                  | -             | Controls scoped to this section.     |
| `headingAs`   | `"h2" \| "h3"`               | `h2`          | Heading level in the page hierarchy. |
| `variant`     | `"plain" \| "surface"`       | `plain`       | Structural or bordered presentation. |
| `density`     | `"comfortable" \| "compact"` | `comfortable` | Section rhythm and surface inset.    |

Native `section` props pass through except the native `title` attribute.

## Guidance

- Use `h2` for direct children of the page and `h3` only for nested sections.
- Use `surface` when the section needs a bounded container, not merely for decoration.
- Use `compact` for dense operational pages. It reduces section rhythm and surface insets without changing typography or control sizes.
- Keep section actions specific to the content within the landmark.
- Use `Frame` or `Card` for repeated content objects; use `PageSection` for page anatomy.

## Accessibility

The section is labelled by its generated heading ID. Do not add a conflicting `aria-label`. Preserve logical heading order and keep actions after the heading in keyboard order.

## Migration

Classification: `compatible`. New in `0.4.0`.
