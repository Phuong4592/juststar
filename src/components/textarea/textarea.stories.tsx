import type { Meta, StoryObj } from "@storybook/react-vite"

import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
  Textarea,
  Typography,
} from "@enosta/en-ui"

const SIZES = ["sm", "md", "lg"] as const

function OverviewPage() {
  return (
    <div className="space-y-6xl">
      <section>
        <Typography.H5 as="h2" className="mb-xl text-neutral-900">
          Sizes
        </Typography.H5>
        <div className="space-y-5xl">
          {SIZES.map((size) => (
            <Field key={size}>
              <FieldLabel>{size.toUpperCase()} textarea</FieldLabel>
              <Textarea placeholder={`${size} textarea`} rows={3} size={size} />
            </Field>
          ))}
        </div>
      </section>

      <section>
        <Typography.H5 as="h2" className="mb-xl text-neutral-900">
          Rows
        </Typography.H5>
        <div className="grid gap-xl sm:grid-cols-2">
          <Field>
            <FieldLabel>Short note</FieldLabel>
            <Textarea placeholder="Two rows" rows={2} />
          </Field>
          <Field>
            <FieldLabel>Detailed description</FieldLabel>
            <Textarea placeholder="Six rows" rows={6} />
          </Field>
        </div>
      </section>

      <section>
        <Typography.H5 as="h2" className="mb-xl text-neutral-900">
          States
        </Typography.H5>
        <div className="grid gap-xl sm:grid-cols-2">
          <Field>
            <FieldLabel>Default</FieldLabel>
            <Textarea placeholder="Default" rows={3} />
          </Field>
          <Field>
            <FieldLabel>Filled</FieldLabel>
            <Textarea defaultValue="Filled value" rows={3} />
          </Field>
          <Field disabled>
            <FieldLabel>Disabled</FieldLabel>
            <Textarea placeholder="Disabled" rows={3} />
          </Field>
          <Field>
            <FieldLabel>Read only</FieldLabel>
            <Textarea defaultValue="Locked value" readOnly rows={3} />
          </Field>
          <Field invalid>
            <FieldLabel>Bio</FieldLabel>
            <Textarea defaultValue="Too short" rows={3} />
            <FieldError match>Bio must be at least 20 characters.</FieldError>
          </Field>
        </div>
      </section>

      <section>
        <Typography.H5 as="h2" className="mb-xl text-neutral-900">
          Field integration
        </Typography.H5>
        <Field>
          <FieldLabel>Bio</FieldLabel>
          <Textarea placeholder="Tell us about yourself…" rows={4} />
          <FieldDescription>Write a short bio. Markdown is supported.</FieldDescription>
        </Field>
      </section>

      <section>
        <Typography.H5 as="h2" className="mb-xl text-neutral-900">
          Unstyled
        </Typography.H5>
        <Field>
          <FieldLabel>Notes</FieldLabel>
          <Textarea placeholder="Compose your own surface" rows={3} unstyled />
        </Field>
      </section>
    </div>
  )
}

const meta = {
  title: "Forms/Textarea",
  component: Textarea,
} satisfies Meta<typeof Textarea>

export default meta
type Story = StoryObj<typeof meta>

export const Overview: Story = {
  tags: ["!autodocs"],
  parameters: { layout: "fullscreen" },
  render: () => (
    <main className="bg-canvas p-3xl text-on-canvas">
      <OverviewPage />
    </main>
  ),
}

export const Basic: Story = {
  args: { placeholder: "Tell us about yourself…" },
  parameters: {
    docs: {
      source: { code: `<Textarea placeholder="Tell us about yourself…" />`, language: "tsx" },
    },
  },
}

export const Sizes: Story = {
  render: () => (
    <div className="space-y-xl">
      <Textarea placeholder="Small" rows={3} size="sm" />
      <Textarea placeholder="Medium" rows={3} size="md" />
      <Textarea placeholder="Large" rows={3} size="lg" />
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `<div className="space-y-xl">
  <Textarea placeholder="Small" rows={3} size="sm" />
  <Textarea placeholder="Medium" rows={3} size="md" />
  <Textarea placeholder="Large" rows={3} size="lg" />
</div>`,
        language: "tsx",
      },
    },
  },
}

export const Rows: Story = {
  render: () => (
    <div className="space-y-xl">
      <Textarea aria-label="Short note" placeholder="Two rows" rows={2} />
      <Textarea aria-label="Detailed description" placeholder="Six rows" rows={6} />
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `<div className="space-y-xl">
  <Textarea placeholder="Two rows" rows={2} />
  <Textarea placeholder="Six rows" rows={6} />
</div>`,
        language: "tsx",
      },
    },
  },
}

export const WithLabel: Story = {
  render: () => (
    <Field>
      <FieldLabel>Bio</FieldLabel>
      <Textarea placeholder="Tell us about yourself…" rows={4} />
      <FieldDescription>Write a short bio. Markdown is supported.</FieldDescription>
    </Field>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Field>
  <FieldLabel>Bio</FieldLabel>
  <Textarea placeholder="Tell us about yourself…" rows={4} />
  <FieldDescription>Write a short bio. Markdown is supported.</FieldDescription>
</Field>`,
        language: "tsx",
      },
    },
  },
}

export const Disabled: Story = {
  args: { "aria-label": "Disabled textarea", defaultValue: "Disabled value", disabled: true },
  parameters: {
    docs: {
      source: {
        code: `<Textarea aria-label="Disabled textarea" defaultValue="Disabled value" disabled />`,
        language: "tsx",
      },
    },
  },
}

export const Invalid: Story = {
  args: {
    "aria-invalid": true,
    "aria-label": "Bio",
    defaultValue: "Too short",
    rows: 3,
  },
  parameters: {
    docs: {
      source: {
        code: `<Textarea aria-invalid aria-label="Bio" defaultValue="Too short" rows={3} />`,
        language: "tsx",
      },
    },
  },
}

export const Unstyled: Story = {
  args: { placeholder: "Compose your own surface", rows: 3, unstyled: true },
  parameters: {
    docs: {
      source: {
        code: `<Textarea placeholder="Compose your own surface" rows={3} unstyled />`,
        language: "tsx",
      },
    },
  },
}
