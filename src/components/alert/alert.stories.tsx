import type { Meta, StoryObj } from "@storybook/react-vite"
import { Icon } from "@iconify/react"

import { Alert, AlertAction, AlertDescription, AlertTitle, Button, Typography } from "@enosta/en-ui"

const DESCRIPTION = "You can add components and dependencies to your app using the cli."

const VARIANTS = [
  { label: "Default", value: "default" },
  { label: "Info", value: "info" },
  { label: "Success", value: "success" },
  { label: "Warning", value: "warning" },
  { label: "Error", value: "error" },
] as const

const ICONS: Record<(typeof VARIANTS)[number]["value"], string> = {
  default: "solar:bell-linear",
  error: "solar:danger-circle-linear",
  info: "solar:info-circle-linear",
  success: "solar:check-circle-linear",
  warning: "solar:danger-triangle-linear",
}

function OverviewPage() {
  return (
    <div className="space-y-6xl">
      <section>
        <Typography.H5 as="h2" className="mb-xl text-neutral-900">
          Variants
        </Typography.H5>
        <div className="space-y-xl">
          {VARIANTS.map(({ label, value }) => (
            <Alert key={value} variant={value}>
              <AlertTitle>{label}</AlertTitle>
              <AlertDescription>{DESCRIPTION}</AlertDescription>
            </Alert>
          ))}
        </div>
      </section>

      <section>
        <Typography.H5 as="h2" className="mb-xl text-neutral-900">
          With icon
        </Typography.H5>
        <div className="space-y-xl">
          {VARIANTS.slice(1).map(({ label, value }) => (
            <Alert key={value} variant={value}>
              <Icon icon={ICONS[value]} />
              <AlertTitle>{label}</AlertTitle>
              <AlertDescription>{DESCRIPTION}</AlertDescription>
            </Alert>
          ))}
        </div>
      </section>

      <section>
        <Typography.H5 as="h2" className="mb-xl text-neutral-900">
          With actions
        </Typography.H5>
        <Alert variant="warning">
          <Icon icon="solar:danger-triangle-linear" />
          <AlertTitle>Session expiring</AlertTitle>
          <AlertDescription>Your session expires in 5 minutes.</AlertDescription>
          <AlertAction>
            <Button size="sm" variant="ghost">
              Dismiss
            </Button>
            <Button size="sm">Extend</Button>
          </AlertAction>
        </Alert>
      </section>
    </div>
  )
}

export const Overview: Story = {
  tags: ["!autodocs"],
  parameters: { layout: "fullscreen" },
  render: () => (
    <main className="bg-canvas p-3xl text-on-canvas">
      <OverviewPage />
    </main>
  ),
}

const meta = {
  title: "Feedback/Alert",
  component: Alert,
} satisfies Meta<typeof Alert>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  render: () => (
    <Alert>
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>{DESCRIPTION}</AlertDescription>
    </Alert>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Alert>
  <AlertTitle>Heads up!</AlertTitle>
  <AlertDescription>
    You can add components and dependencies to your app using the cli.
  </AlertDescription>
</Alert>`,
        language: "tsx",
      },
    },
  },
}

export const Info: Story = {
  render: () => (
    <Alert variant="info">
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>{DESCRIPTION}</AlertDescription>
    </Alert>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Alert variant="info">
  <AlertTitle>Heads up!</AlertTitle>
  <AlertDescription>
    You can add components and dependencies to your app using the cli.
  </AlertDescription>
</Alert>`,
        language: "tsx",
      },
    },
  },
}

export const Success: Story = {
  render: () => (
    <Alert variant="success">
      <AlertTitle>Saved</AlertTitle>
      <AlertDescription>Your changes are live.</AlertDescription>
    </Alert>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Alert variant="success">
  <AlertTitle>Saved</AlertTitle>
  <AlertDescription>Your changes are live.</AlertDescription>
</Alert>`,
        language: "tsx",
      },
    },
  },
}

export const Warning: Story = {
  render: () => (
    <Alert variant="warning">
      <AlertTitle>Session expiring</AlertTitle>
      <AlertDescription>Your session expires in 5 minutes.</AlertDescription>
    </Alert>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Alert variant="warning">
  <AlertTitle>Session expiring</AlertTitle>
  <AlertDescription>Your session expires in 5 minutes.</AlertDescription>
</Alert>`,
        language: "tsx",
      },
    },
  },
}

export const Error: Story = {
  render: () => (
    <Alert variant="error">
      <AlertTitle>Something went wrong</AlertTitle>
      <AlertDescription>We could not save your changes. Please try again.</AlertDescription>
    </Alert>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Alert variant="error">
  <AlertTitle>Something went wrong</AlertTitle>
  <AlertDescription>We could not save your changes. Please try again.</AlertDescription>
</Alert>`,
        language: "tsx",
      },
    },
  },
}

export const WithIcon: Story = {
  render: () => (
    <Alert variant="info">
      <Icon icon="solar:info-circle-linear" />
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>{DESCRIPTION}</AlertDescription>
    </Alert>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Alert variant="info">
  <Icon icon="solar:info-circle-linear" />
  <AlertTitle>Heads up!</AlertTitle>
  <AlertDescription>
    You can add components and dependencies to your app using the cli.
  </AlertDescription>
</Alert>`,
        language: "tsx",
      },
    },
  },
}

export const WithActions: Story = {
  render: () => (
    <Alert variant="warning">
      <Icon icon="solar:danger-triangle-linear" />
      <AlertTitle>Session expiring</AlertTitle>
      <AlertDescription>Your session expires in 5 minutes.</AlertDescription>
      <AlertAction>
        <Button size="sm" variant="ghost">
          Dismiss
        </Button>
        <Button size="sm">Extend</Button>
      </AlertAction>
    </Alert>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Alert variant="warning">
  <Icon icon="solar:danger-triangle-linear" />
  <AlertTitle>Session expiring</AlertTitle>
  <AlertDescription>Your session expires in 5 minutes.</AlertDescription>
  <AlertAction>
    <Button size="sm">Extend session</Button>
    <Button size="sm" variant="ghost">Dismiss</Button>
  </AlertAction>
</Alert>`,
        language: "tsx",
      },
    },
  },
}
