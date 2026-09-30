# Login Page

Contract ID: `component.login-page`

Use `LoginPage` as the stable responsive shell for sign-in and account-access workflows. Compose the `form` slot only from En UI fields, controls, feedback, and links. The pattern owns the page landmark, one `h1`, a readable form measure, the responsive two-panel layout, and the product-context aside.

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
import { Button, Field, Input, LoginPage } from "@enosta/en-ui"

;<LoginPage
  brand="Enosta workspace"
  title="Welcome back."
  description="Use your Enosta account to continue to the operations workspace."
  asideTitle="Move from intent to operational clarity."
  asideItems={["Shared patterns", "Accessible controls"]}
  form={
    <form>
      <Field label="Work email">
        <Input name="email" type="email" />
      </Field>
      <Button type="submit">Sign in</Button>
    </form>
  }
/>
```

## Anatomy

```tsx
<LoginPage brand={...} title={...} description={...} form={...} footer={...} asideTitle={...} asideDescription={...} asideItems={[...]} />
```

Public parts: `login-page` (main landmark), `login-brand` (identity row), `login-form` (bounded form slot).

Public exports: `LoginPage`, `LoginPageProps`.

## API Reference

| Prop               | Type          | Default                     | Description                                  |
| ------------------ | ------------- | --------------------------- | -------------------------------------------- |
| `brand`            | `ReactNode`   | required                    | Product or organization identity.            |
| `title`            | `ReactNode`   | required                    | The single `h1` authentication heading.      |
| `form`             | `ReactNode`   | required                    | En UI sign-in fields, actions, and feedback. |
| `brandMark`        | `ReactNode`   | `"EN"`                      | Decorative mark in the brand tile.           |
| `eyebrow`          | `ReactNode`   | `"Secure workspace access"` | Short uppercase label above the heading.     |
| `description`      | `ReactNode`   | -                           | Supporting copy under the heading.           |
| `footer`           | `ReactNode`   | -                           | Recovery and support links under the form.   |
| `asideTitle`       | `ReactNode`   | -                           | Heading for the product-context aside.       |
| `asideDescription` | `ReactNode`   | -                           | Supporting copy for the aside.               |
| `asideItems`       | `ReactNode[]` | `[]`                        | Numbered product-context statements.         |

Native `main` element props pass through where supported. Use `className` on the root without replacing protected landmark, heading, or responsive behavior.

## Guidance

- The `form` slot is bounded to a readable measure; do not widen it past `max-w-md`.
- Compose the slot from En UI components only: `Field`, `Input`, `Checkbox`, `Button`, `Separator`, `Spinner`, and links.
- Show validation and authentication errors inside the `form` slot with En UI feedback, keep recovery links visible, and include loading and disabled submission behavior in consumer tests.
- The aside renders only at `lg` and above; mobile relies on the brand and heading hierarchy alone.

## Accessibility

- Renders one `main` landmark named by the single `h1`; never add another `h1` inside the `form` slot.
- The aside is a `complementary` landmark labeled "Product access context" and renders only on wide layouts.
- The brand mark is decorative (`aria-hidden`); the `brand` text carries the identity.
- Test compositions against WCAG 2.2 AA, including focus order across the two panels and reduced-motion needs.

## Storybook

Stories live under `Patterns/Login page` with `Default` and `ValidationError` scenarios covering desktop, mobile, empty, and error compositions.

## Migration

Classification: `compatible`. New in `0.3.0` as the stable authentication page composition.
