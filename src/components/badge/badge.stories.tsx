import type { Meta, StoryObj } from "@storybook/react-vite"
import { Icon } from "@iconify/react"

import { Badge, Typography } from "@enosta/en-ui"

const VARIANTS = [
  "default",
  "secondary",
  "outline",
  "success",
  "warning",
  "error",
  "info",
  "destructive",
] as const
const SIZES = ["sm", "md", "lg"] as const

function OverviewPage() {
  return (
    <div className="space-y-6xl">
      <section>
        <Typography.H5 as="h2" className="mb-xl text-neutral-900">
          Variants
        </Typography.H5>
        <div className="flex flex-wrap gap-xl">
          {VARIANTS.map((variant) => (
            <Badge key={variant} variant={variant}>
              {variant}
            </Badge>
          ))}
        </div>
      </section>

      <section>
        <Typography.H5 as="h2" className="mb-xl text-neutral-900">
          Sizes
        </Typography.H5>
        <div className="flex flex-wrap items-center gap-xl">
          {SIZES.map((size) => (
            <Badge key={size} size={size}>
              {size}
            </Badge>
          ))}
        </div>
      </section>

      <section>
        <Typography.H5 as="h2" className="mb-xl text-neutral-900">
          Compositions
        </Typography.H5>
        <div className="flex flex-wrap items-center gap-xl">
          <Badge variant="success">
            <Icon icon="solar:verified-check-linear" />
            Verified
          </Badge>
          <Badge render={<a href="#badge-link" />} variant="info">
            New plan
          </Badge>
          <Badge variant="secondary">24</Badge>
        </div>
      </section>
    </div>
  )
}

const meta = {
  title: "Data Display/Badge",
  component: Badge,
} satisfies Meta<typeof Badge>

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
  args: { children: "New" },
  parameters: { docs: { source: { code: `<Badge>New</Badge>`, language: "tsx" } } },
}

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-xl">
      {VARIANTS.map((variant) => (
        <Badge key={variant} variant={variant}>
          {variant}
        </Badge>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Badge variant="default">Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="outline">Outline</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="error">Error</Badge>
<Badge variant="info">Info</Badge>
<Badge variant="destructive">Destructive</Badge>`,
        language: "tsx",
      },
    },
  },
}

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-xl">
      {SIZES.map((size) => (
        <Badge key={size} size={size}>
          {size}
        </Badge>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Badge size="sm">Small</Badge>
<Badge size="md">Medium</Badge>
<Badge size="lg">Large</Badge>`,
        language: "tsx",
      },
    },
  },
}

export const WithIcon: Story = {
  render: () => (
    <Badge variant="success">
      <Icon icon="solar:verified-check-linear" />
      Verified
    </Badge>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Badge variant="success">
  <VerifiedIcon />
  Verified
</Badge>`,
        language: "tsx",
      },
    },
  },
}

export const Link: Story = {
  render: () => (
    <Badge render={<a href="#badge-link" />} variant="info">
      New plan
    </Badge>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Badge render={<a href="/pricing" />} variant="info">New plan</Badge>`,
        language: "tsx",
      },
    },
  },
}

export const Count: Story = {
  render: () => <Badge variant="secondary">24</Badge>,
  parameters: {
    docs: { source: { code: `<Badge variant="secondary">24</Badge>`, language: "tsx" } },
  },
}
