# Avatar

Contract ID: `component.avatar`

Displays a person or entity using an image with a resilient text or icon fallback.

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
import { Avatar } from "@enosta/en-ui"

;<Avatar image={{ alt: "Ada Lovelace", src: avatarUrl }} fallback={{ children: "AL" }} />
```

Fallback-only avatar:

```tsx
<Avatar fallback={{ children: "AL" }} />
```

Avatar sizes:

```tsx
<Avatar size="xs" fallback={{ children: "XS" }} />
<Avatar size="sm" fallback={{ children: "SM" }} />
<Avatar size="md" fallback={{ children: "MD" }} />
<Avatar size="lg" fallback={{ children: "LG" }} />
```

## Guidelines

- **Images**: Provide both `image.src` and meaningful `image.alt` text. Use an empty `alt` only when adjacent text already identifies the person or entity.
- **Fallbacks**: Always provide a fallback when an image is used so loading and failed-image states remain understandable.
- **Initials**: Keep fallback initials to one or two characters so they remain legible at every size.
- **Groups**: Label the surrounding group when the avatars collectively convey membership or presence.

## Anatomy

```tsx
<Avatar image={{ alt: "Ada Lovelace", src: avatarUrl }} fallback={{ children: "AL" }} />
```

The root renders a non-interactive `<span>`. Base UI owns image loading state, showing the fallback while the image loads or after it fails and mounting the `<img>` once it loads.

Public exports: `avatarVariants`, `AvatarImageProps`, `AvatarFallbackProps`, `AvatarProps`, `Avatar`.

## API Reference

| Prop        | Type                                      | Default | Description                                                                                 |
| ----------- | ----------------------------------------- | ------- | ------------------------------------------------------------------------------------------- |
| `size`      | `"xs" \| "sm" \| "md" \| "lg"`            | `md`    | Avatar size.                                                                                |
| `image`     | `AvatarImageProps`                        | -       | Props passed to the Base UI image, including `src`, `alt`, `srcSet`, and loading callbacks. |
| `fallback`  | `AvatarFallbackProps`                     | -       | Props passed to the Base UI fallback; `children` renders initials or an icon.               |
| `render`    | `ReactElement \| (props) => ReactElement` | -       | Replaces the root element. Passed through from Base UI.                                     |
| `className` | `string`                                  | -       | Consumer styling merged with root variant classes. Part classes use their matching prop.    |

Native root, image, and fallback props pass through where supported. Set part-specific classes through `image.className` and `fallback.className`.

## Guidance

- Use the smallest size that preserves recognizability and keeps fallback content legible.
- Keep the image and fallback descriptions aligned so failed images do not change the represented identity.
- Prefer a visible name beside an avatar when identity is important; an avatar alone is not always recognizable.

## Accessibility

Avatar is non-interactive and does not add a role or keyboard behavior. Give informative images meaningful `alt` text, or `alt=""` when nearby text identifies the same person or entity. Do not use Avatar itself as a button or link; place it inside the appropriate interactive component instead. Test compositions against WCAG 2.2 AA.

## Storybook

Stories are split by usage scenario and include copyable TSX source in the Docs source panel. Start with `Basic`, then review `WithImage`, `Sizes`, `Fallback`, and `Groups`.

## Migration

Classification: `compatible`. The existing 32px appearance remains the default `md` size; consumers can now select `xs`, `sm`, or `lg` without custom size classes.
