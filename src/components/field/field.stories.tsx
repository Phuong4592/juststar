import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"

import {
  Checkbox,
  Field,
  FieldDescription,
  FieldError,
  FieldItem,
  FieldLabel,
  FieldValidity,
  Input,
  Typography,
} from "@enosta/en-ui"

function OverviewPage() {
  const [email, setEmail] = useState("team@example")

  return (
    <div className="max-w-[600px] space-y-6xl">
      <header className="space-y-md">
        <Typography.H1 className="text-neutral-900">Field</Typography.H1>
        <Typography.Lead className="text-neutral-600">
          Labelling, description, and validation for form controls.
        </Typography.Lead>
      </header>

      <section>
        <Typography.H5 as="h2" className="mb-xl text-neutral-900">
          Default
        </Typography.H5>
        <Field>
          <FieldLabel>Name</FieldLabel>
          <Input placeholder="Enter your name" />
          <FieldDescription>Visible on your profile.</FieldDescription>
        </Field>
      </section>

      <section>
        <Typography.H5 as="h2" className="mb-xl text-neutral-900">
          Required
        </Typography.H5>
        <Field>
          <FieldLabel>Email</FieldLabel>
          <Input required type="email" placeholder="you@example.com" />
          <FieldDescription>We&apos;ll never share your email.</FieldDescription>
        </Field>
      </section>

      <section>
        <Typography.H5 as="h2" className="mb-xl text-neutral-900">
          Disabled
        </Typography.H5>
        <Field disabled>
          <FieldLabel>Username</FieldLabel>
          <Input value="johndoe" />
          <FieldDescription>This field cannot be edited.</FieldDescription>
        </Field>
      </section>

      <section>
        <Typography.H5 as="h2" className="mb-xl text-neutral-900">
          Invalid
        </Typography.H5>
        <Field invalid>
          <FieldLabel>Email</FieldLabel>
          <Input aria-invalid defaultValue="not-an-email" type="email" />
          <FieldError match>Enter a valid email address.</FieldError>
        </Field>
      </section>

      <section>
        <Typography.H5 as="h2" className="mb-xl text-neutral-900">
          Live validation
        </Typography.H5>
        <Field
          validationMode="onChange"
          validate={(value) =>
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value)) ? null : "Enter a valid email."
          }
        >
          <FieldLabel>Work email</FieldLabel>
          <Input
            name="work-email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onValueChange={setEmail}
          />
          <FieldValidity>
            {(validity) =>
              validity.value ? (
                <Typography.Small
                  className={validity.validity.valid ? "text-success-600" : "text-error-700"}
                >
                  {validity.validity.valid ? "Looks good." : validity.error}
                </Typography.Small>
              ) : null
            }
          </FieldValidity>
        </Field>
      </section>

      <section>
        <Typography.H5 as="h2" className="mb-xl text-neutral-900">
          Item group
        </Typography.H5>
        <Field>
          <FieldLabel>Notifications</FieldLabel>
          <FieldItem className="items-center gap-sm">
            <Checkbox aria-label="Email me about product updates" />
            <FieldDescription>Email me about product updates.</FieldDescription>
          </FieldItem>
        </Field>
      </section>
    </div>
  )
}

const meta = {
  title: "Forms/Field",
  component: Field,
} satisfies Meta<typeof Field>

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
  render: () => (
    <Field>
      <FieldLabel>Email</FieldLabel>
      <Input name="email" type="email" placeholder="you@example.com" />
      <FieldDescription>Used for account notifications.</FieldDescription>
    </Field>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Field>
  <FieldLabel>Email</FieldLabel>
  <Input name="email" type="email" placeholder="you@example.com" />
  <FieldDescription>Used for account notifications.</FieldDescription>
</Field>`,
        language: "tsx",
      },
    },
  },
}

export const Required: Story = {
  render: () => (
    <Field>
      <FieldLabel>Email</FieldLabel>
      <Input name="email" required type="email" placeholder="you@example.com" />
      <FieldDescription>We'll never share your email.</FieldDescription>
    </Field>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Field>
  <FieldLabel>Email</FieldLabel>
  <Input name="email" required type="email" placeholder="you@example.com" />
  <FieldDescription>We'll never share your email.</FieldDescription>
</Field>`,
        language: "tsx",
      },
    },
  },
}

export const Disabled: Story = {
  render: () => (
    <Field disabled>
      <FieldLabel>Username</FieldLabel>
      <Input name="username" value="johndoe" />
      <FieldDescription>This field cannot be edited.</FieldDescription>
    </Field>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Field disabled>
  <FieldLabel>Username</FieldLabel>
  <Input name="username" value="johndoe" />
  <FieldDescription>This field cannot be edited.</FieldDescription>
</Field>`,
        language: "tsx",
      },
    },
  },
}

export const Invalid: Story = {
  render: () => (
    <Field invalid>
      <FieldLabel>Email</FieldLabel>
      <Input aria-invalid defaultValue="not-an-email" name="email" type="email" />
      <FieldError match>Enter a valid email address.</FieldError>
    </Field>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Field invalid>
  <FieldLabel>Email</FieldLabel>
  <Input aria-invalid defaultValue="not-an-email" name="email" type="email" />
  <FieldError match>Enter a valid email address.</FieldError>
</Field>`,
        language: "tsx",
      },
    },
  },
}

export const Validity: Story = {
  render: () => (
    <Field validationMode="onChange">
      <FieldLabel>Email</FieldLabel>
      <Input name="email" required type="email" placeholder="you@example.com" />
      <FieldValidity>
        {(validity) =>
          validity.value ? (
            <Typography.Small
              className={validity.validity.valid ? "text-success-600" : "text-error-700"}
            >
              {validity.validity.valid ? "Looks good." : validity.error}
            </Typography.Small>
          ) : null
        }
      </FieldValidity>
    </Field>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Field validationMode="onChange">
  <FieldLabel>Email</FieldLabel>
  <Input name="email" required type="email" placeholder="you@example.com" />
  <FieldValidity>
    {(validity) =>
      validity.value ? (
        <Typography.Small className={validity.validity.valid ? "text-success-600" : "text-error-700"}>
          {validity.validity.valid ? "Looks good." : validity.error}
        </Typography.Small>
      ) : null
    }
  </FieldValidity>
</Field>`,
        language: "tsx",
      },
    },
  },
}

export const Item: Story = {
  render: () => (
    <Field>
      <FieldLabel>Notifications</FieldLabel>
      <FieldItem className="items-center gap-sm">
        <Checkbox aria-label="Email me about product updates" />
        <FieldDescription>Email me about product updates.</FieldDescription>
      </FieldItem>
    </Field>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Field>
  <FieldLabel>Notifications</FieldLabel>
  <FieldItem className="items-center gap-sm">
    <Checkbox aria-label="Email me about product updates" />
    <FieldDescription>Email me about product updates.</FieldDescription>
  </FieldItem>
</Field>`,
        language: "tsx",
      },
    },
  },
}
