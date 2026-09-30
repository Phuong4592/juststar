import type { Meta, StoryObj } from "@storybook/react-vite"

import { PageContainer, Typography } from "@enosta/en-ui"

const meta = {
  title: "Layout/Page container",
  component: PageContainer,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof PageContainer>

export default meta
type Story = StoryObj<typeof meta>

function WidthSpecimen({ size }: { size: "narrow" | "default" | "wide" | "full" }) {
  return (
    <PageContainer size={size}>
      <div className="rounded-surface border border-neutral-200 bg-surface p-xl shadow-surface">
        <Typography.H3 as="p" className="text-neutral-900">
          {size} container
        </Typography.H3>
        <Typography.Text className="mt-sm text-neutral-600">
          The shaded region shows the declared content boundary and responsive page inset.
        </Typography.Text>
      </div>
    </PageContainer>
  )
}

export const Widths: Story = {
  render: () => (
    <main className="grid gap-2xl bg-canvas py-2xl">
      <WidthSpecimen size="narrow" />
      <WidthSpecimen size="default" />
      <WidthSpecimen size="wide" />
      <WidthSpecimen size="full" />
    </main>
  ),
}

export const ResponsiveGutters: Story = {
  render: () => (
    <main className="bg-canvas py-2xl">
      <PageContainer gutter="default" size="wide">
        <div className="min-h-[16rem] rounded-surface border border-neutral-200 bg-surface p-xl">
          Resize the viewport to inspect the mobile, tablet, and desktop gutters.
        </div>
      </PageContainer>
    </main>
  ),
}
