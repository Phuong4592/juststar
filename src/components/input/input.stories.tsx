import type { Meta, StoryObj } from "@storybook/react-vite"
import type { ComponentProps } from "react"

import { Input, Typography } from "@enosta/en-ui"

type InputFieldProps = ComponentProps<typeof Input> & {
  label: string
  error?: string
}

function InputField({ label, error, id, ...props }: InputFieldProps) {
  const inputId = id ?? `input-${label.toLowerCase().replaceAll(" ", "-")}`
  const hasError = error !== undefined
  const errorId = hasError ? `${inputId}-error` : undefined

  return (
    <div className="flex min-w-0 flex-col gap-md">
      <Typography.Label as="label" className="text-neutral-700" htmlFor={inputId}>
        {label}
      </Typography.Label>
      <Input
        aria-describedby={errorId}
        aria-invalid={hasError ? true : props["aria-invalid"]}
        id={inputId}
        {...props}
      />
      {hasError && (
        <Typography.Small className="text-error-700" id={errorId}>
          {error}
        </Typography.Small>
      )}
    </div>
  )
}

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
            <InputField
              key={size}
              label={`${size.toUpperCase()} input`}
              placeholder={`${size} input`}
              size={size}
            />
          ))}
        </div>
      </section>

      <section>
        <Typography.H5 as="h2" className="mb-xl text-neutral-900">
          Affixes
        </Typography.H5>
        <div className="grid gap-xl sm:grid-cols-2">
          <InputField
            label="Search projects"
            placeholder="Search projects"
            prefix="solar:magnifer-linear"
          />
          <InputField label="Start date" placeholder="Pick a date" suffix="solar:calendar-linear" />
          <InputField
            label="Username"
            placeholder="username"
            prefix="solar:letter-linear"
            suffix={
              <Typography.Text as="span" className="text-neutral-500">
                @example.com
              </Typography.Text>
            }
          />
          <InputField
            defaultValue="Verified account"
            label="Account"
            prefix="solar:verified-check-linear"
            suffix="solar:alt-arrow-down-linear"
          />
        </div>
      </section>

      <section>
        <Typography.H5 as="h2" className="mb-xl text-neutral-900">
          States
        </Typography.H5>
        <div className="grid gap-xl sm:grid-cols-2">
          <InputField label="Default" placeholder="Default" />
          <InputField defaultValue="Filled value" label="Filled" />
          <InputField disabled label="Disabled" placeholder="Disabled" />
          <InputField defaultValue="Read only" label="Read only" readOnly />
          <InputField
            defaultValue="not-an-email"
            error="Enter a valid email address."
            label="Email address"
          />
          <InputField
            defaultValue="password"
            label="Password"
            prefix="solar:lock-password-linear"
            type="password"
          />
        </div>
      </section>

      <section>
        <Typography.H5 as="h2" className="mb-xl text-neutral-900">
          Input types
        </Typography.H5>
        <div className="grid gap-xl sm:grid-cols-2">
          <InputField
            label="Email"
            placeholder="you@example.com"
            prefix="solar:letter-linear"
            type="email"
          />
          <InputField label="Quantity" min={0} placeholder="Quantity" type="number" />
          <InputField label="Delivery date" type="date" />
          <InputField accept="image/*" label="Profile image" type="file" />
        </div>
      </section>

      <section>
        <Typography.H5 as="h2" className="mb-xl text-neutral-900">
          Unstyled
        </Typography.H5>
        <InputField
          label="Website"
          placeholder="Paste a link"
          prefix="solar:link-linear"
          unstyled
        />
      </section>
    </div>
  )
}

const meta = {
  title: "Forms/Input",
  component: Input,
} satisfies Meta<typeof Input>

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
  args: { placeholder: "you@example.com", type: "email" },
  parameters: {
    docs: {
      source: { code: `<Input type="email" placeholder="you@example.com" />`, language: "tsx" },
    },
  },
}

export const Sizes: Story = {
  render: () => (
    <div className="space-y-xl">
      <Input placeholder="Small" size="sm" />
      <Input placeholder="Medium" size="md" />
      <Input placeholder="Large" size="lg" />
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `<div className="space-y-xl">
  <Input placeholder="Small" size="sm" />
  <Input placeholder="Medium" size="md" />
  <Input placeholder="Large" size="lg" />
</div>`,
        language: "tsx",
      },
    },
  },
}

export const WithAffixes: Story = {
  args: { placeholder: "Search", prefix: "solar:magnifer-linear", suffix: "⌘K" },
  parameters: {
    docs: {
      source: {
        code: `<Input prefix="solar:magnifer-linear" suffix="⌘K" placeholder="Search" />`,
        language: "tsx",
      },
    },
  },
}

export const Disabled: Story = {
  args: { "aria-label": "Disabled input", defaultValue: "Disabled value", disabled: true },
  parameters: {
    docs: {
      source: {
        code: `<Input aria-label="Disabled input" defaultValue="Disabled value" disabled />`,
        language: "tsx",
      },
    },
  },
}

export const Invalid: Story = {
  args: {
    "aria-invalid": true,
    "aria-label": "Email",
    defaultValue: "not-an-email",
    type: "email",
  },
  parameters: {
    docs: {
      source: {
        code: `<Input aria-invalid aria-label="Email" type="email" defaultValue="not-an-email" />`,
        language: "tsx",
      },
    },
  },
}

export const InputTypes: Story = {
  render: () => (
    <div className="space-y-xl">
      <Input aria-label="Email" placeholder="you@example.com" type="email" />
      <Input aria-label="Quantity" min={0} placeholder="Quantity" type="number" />
      <Input aria-label="Delivery date" type="date" />
      <Input accept="image/*" aria-label="Profile image" type="file" />
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `<div className="space-y-xl">
  <Input placeholder="you@example.com" type="email" />
  <Input min={0} placeholder="Quantity" type="number" />
  <Input type="date" />
  <Input accept="image/*" type="file" />
</div>`,
        language: "tsx",
      },
    },
  },
}

export const Unstyled: Story = {
  args: { placeholder: "Paste a link", prefix: "solar:link-linear", unstyled: true },
  parameters: {
    docs: {
      source: {
        code: `<Input placeholder="Paste a link" prefix="solar:link-linear" unstyled />`,
        language: "tsx",
      },
    },
  },
}
