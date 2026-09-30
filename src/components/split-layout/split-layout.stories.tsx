import type { Meta, StoryObj } from "@storybook/react-vite"

import {
  Button,
  Card,
  CardPanel,
  PageContainer,
  PageHeader,
  PageSection,
  SplitLayout,
  Typography,
} from "@enosta/en-ui"

const meta = {
  title: "Layout/Split layout",
  component: SplitLayout,
  args: { primary: "Primary", secondary: "Secondary" },
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof SplitLayout>

export default meta
type Story = StoryObj<typeof meta>

function Activity({ density = "comfortable" }: { density?: "comfortable" | "compact" }) {
  return (
    <PageSection
      density={density}
      description="Recent delivery activity and decisions."
      title="Activity"
    >
      <Card>
        <CardPanel className="grid min-h-[24rem] gap-lg">
          {Array.from({ length: 5 }, (_, index) => (
            <div className="grid gap-xs" key={index}>
              <Typography.Label as="p" className="text-neutral-900">
                Delivery update {index + 1}
              </Typography.Label>
              <Typography.Text className="text-neutral-600">
                The team completed a project milestone and recorded the next operational decision.
              </Typography.Text>
            </div>
          ))}
        </CardPanel>
      </Card>
    </PageSection>
  )
}

function Details({ density = "comfortable" }: { density?: "comfortable" | "compact" }) {
  return (
    <PageSection density={density} title="Project details" variant="surface">
      <dl className="grid gap-md">
        <div>
          <Typography.Small as="dt" className="text-neutral-600">
            Owner
          </Typography.Small>
          <Typography.Label as="dd" className="text-neutral-900">
            Mai Nguyen
          </Typography.Label>
        </div>
        <div>
          <Typography.Small as="dt" className="text-neutral-600">
            Delivery date
          </Typography.Small>
          <Typography.Small as="dd" className="text-neutral-900">
            12 September
          </Typography.Small>
        </div>
      </dl>
    </PageSection>
  )
}

function StoryFrame({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-svh bg-canvas py-2xl">
      <PageContainer size="wide">
        <div className="grid gap-2xl">
          <PageHeader
            actions={<Button>New update</Button>}
            description="Review delivery progress and operational context."
            title="Website redesign"
          />
          {children}
        </div>
      </PageContainer>
    </main>
  )
}

export const Default: Story = {
  render: () => (
    <StoryFrame>
      <SplitLayout primary={<Activity />} secondary={<Details />} />
    </StoryFrame>
  ),
}

export const Compact: Story = {
  render: () => (
    <StoryFrame>
      <SplitLayout
        density="compact"
        primary={<Activity density="compact" />}
        secondary={<Details density="compact" />}
      />
    </StoryFrame>
  ),
}

export const SecondaryStart: Story = {
  render: () => (
    <StoryFrame>
      <SplitLayout primary={<Activity />} secondary={<Details />} secondaryPosition="start" />
    </StoryFrame>
  ),
}

export const StickyAside: Story = {
  render: () => (
    <StoryFrame>
      <SplitLayout primary={<Activity />} secondary={<Details />} stickySecondary />
    </StoryFrame>
  ),
}
