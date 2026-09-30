import type { Meta, StoryObj } from "@storybook/react-vite"
import type { ReactNode } from "react"

import { Button, Spinner, Typography } from "@enosta/en-ui"

function SpecimenRow({ children, meta }: { children: ReactNode; meta: string }) {
  return (
    <div className="grid items-center gap-md px-4xl py-3xl sm:grid-cols-[1fr_auto]">
      <div className="flex items-center gap-4xl">{children}</div>
      <Typography.MonoCaption className="shrink-0 text-neutral-500">{meta}</Typography.MonoCaption>
    </div>
  )
}

const SIZES = ["size-3xl", "size-4xl", "size-5xl", "size-6xl"] as const

const COLORS = [
  { meta: "text-brand-600", tone: "text-brand-600" },
  { meta: "text-success-600", tone: "text-success-600" },
  { meta: "text-warning-600", tone: "text-warning-600" },
  { meta: "text-error-600", tone: "text-error-600" },
  { meta: "text-neutral-900", tone: "text-neutral-900" },
] as const

function OverviewPage() {
  return (
    <div className="space-y-6xl">
      <section>
        <Typography.H5 as="h2" className="mb-xl text-neutral-900">
          Sizes
        </Typography.H5>
        <div className="divide-y divide-neutral-200 rounded-surface border border-neutral-200 bg-surface">
          {SIZES.map((size) => (
            <SpecimenRow key={size} meta={size}>
              <Spinner className={size} />
            </SpecimenRow>
          ))}
        </div>
      </section>

      <section>
        <Typography.H5 as="h2" className="mb-xl text-neutral-900">
          Colors
        </Typography.H5>
        <div className="divide-y divide-neutral-200 rounded-surface border border-neutral-200 bg-surface">
          {COLORS.map(({ meta, tone }) => (
            <SpecimenRow key={meta} meta={meta}>
              <Spinner className={`size-5xl ${tone}`} />
            </SpecimenRow>
          ))}
        </div>
      </section>

      <section>
        <Typography.H5 as="h2" className="mb-xl text-neutral-900">
          In context
        </Typography.H5>
        <div className="flex flex-wrap items-center gap-4xl">
          <div className="flex items-center gap-xl rounded-surface border border-neutral-200 bg-surface px-4xl py-3xl">
            <Spinner className="size-4xl text-brand-600" />
            <Typography.Text className="text-neutral-600">Syncing your workspace…</Typography.Text>
          </div>
          <Button disabled variant="secondary">
            <Spinner aria-hidden="true" /> Saving changes
          </Button>
        </div>
      </section>
    </div>
  )
}

const meta = {
  title: "Feedback/Spinner",
  component: Spinner,
} satisfies Meta<typeof Spinner>

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
  args: { "aria-label": "Loading" },
  parameters: { docs: { source: { code: `<Spinner aria-label="Loading" />`, language: "tsx" } } },
}

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4xl">
      <Spinner className="size-3xl" />
      <Spinner className="size-4xl" />
      <Spinner className="size-5xl" />
      <Spinner className="size-6xl" />
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `<div className="flex items-center gap-4xl">
  <Spinner className="size-3xl" />
  <Spinner className="size-4xl" />
  <Spinner className="size-5xl" />
  <Spinner className="size-6xl" />
</div>`,
        language: "tsx",
      },
    },
  },
}

export const Colors: Story = {
  render: () => (
    <div className="flex items-center gap-4xl">
      <Spinner className="size-5xl text-brand-600" />
      <Spinner className="size-5xl text-success-600" />
      <Spinner className="size-5xl text-warning-600" />
      <Spinner className="size-5xl text-error-600" />
      <Spinner className="size-5xl text-neutral-900" />
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `<div className="flex items-center gap-4xl">
  <Spinner className="size-5xl text-brand-600" />
  <Spinner className="size-5xl text-success-600" />
  <Spinner className="size-5xl text-warning-600" />
  <Spinner className="size-5xl text-error-600" />
  <Spinner className="size-5xl text-neutral-900" />
</div>`,
        language: "tsx",
      },
    },
  },
}

export const InButton: Story = {
  render: () => (
    <Button disabled variant="secondary">
      <Spinner aria-hidden="true" /> Saving changes
    </Button>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Button disabled variant="secondary">
  <Spinner aria-hidden="true" /> Saving changes
</Button>`,
        language: "tsx",
      },
    },
  },
}
