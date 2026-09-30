import type { Meta, StoryObj } from "@storybook/react-vite"

import {
  Badge,
  Button,
  Frame,
  FrameDescription,
  FrameFooter,
  FrameHeader,
  FramePanel,
  FrameTitle,
  Typography,
} from "@enosta/en-ui"

function OverviewPage() {
  return (
    <div className="space-y-6xl">
      <section>
        <Typography.H5 as="h2" className="mb-xl text-neutral-900">
          Basic
        </Typography.H5>
        <Frame>
          <FrameHeader>
            <FrameTitle>Section header</FrameTitle>
            <FrameDescription>Brief description about the section</FrameDescription>
          </FrameHeader>
          <FramePanel>
            <Typography.Text className="font-semibold text-neutral-900">
              Section title
            </Typography.Text>
            <Typography.Small className="text-neutral-500">Section description</Typography.Small>
          </FramePanel>
        </Frame>
      </section>

      <section>
        <Typography.H5 as="h2" className="mb-xl text-neutral-900">
          With footer
        </Typography.H5>
        <Frame>
          <FrameHeader>
            <div className="flex items-center justify-between">
              <FrameTitle>Usage</FrameTitle>
              <Badge variant="warning">85%</Badge>
            </div>
            <FrameDescription>API calls this month</FrameDescription>
          </FrameHeader>
          <FramePanel>
            <Typography.Text className="font-semibold text-neutral-900">Team plan</Typography.Text>
            <Typography.Small className="text-neutral-500">
              850,000 of 1M requests used
            </Typography.Small>
          </FramePanel>
          <FrameFooter>
            <Button size="sm">Upgrade plan</Button>
          </FrameFooter>
        </Frame>
      </section>

      <section>
        <Typography.H5 as="h2" className="mb-xl text-neutral-900">
          Separated panels
        </Typography.H5>
        <Frame>
          <FrameHeader>
            <FrameTitle>Notifications</FrameTitle>
            <FrameDescription>Activity from your workspace</FrameDescription>
          </FrameHeader>
          <FramePanel>
            <Typography.Text className="font-semibold text-neutral-900">Mentions</Typography.Text>
            <Typography.Small className="text-neutral-500">
              You have 3 unread mentions
            </Typography.Small>
          </FramePanel>
          <FramePanel>
            <Typography.Text className="font-semibold text-neutral-900">
              Team updates
            </Typography.Text>
            <Typography.Small className="text-neutral-500">
              2 new comments on Projects
            </Typography.Small>
          </FramePanel>
        </Frame>
      </section>
    </div>
  )
}

const meta = {
  title: "Data Display/Frame",
  component: Frame,
} satisfies Meta<typeof Frame>

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
    <Frame>
      <FrameHeader>
        <FrameTitle>Section header</FrameTitle>
        <FrameDescription>Brief description about the section</FrameDescription>
      </FrameHeader>
      <FramePanel>
        <Typography.Text className="font-semibold text-neutral-900">Section title</Typography.Text>
        <Typography.Small className="text-neutral-500">Section description</Typography.Small>
      </FramePanel>
    </Frame>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Frame>
  <FrameHeader>
    <FrameTitle>Section header</FrameTitle>
    <FrameDescription>Brief description about the section</FrameDescription>
  </FrameHeader>
  <FramePanel>
    <Typography.Text className="font-semibold text-neutral-900">Section title</Typography.Text>
    <Typography.Small className="text-neutral-500">Section description</Typography.Small>
  </FramePanel>
</Frame>`,
        language: "tsx",
      },
    },
  },
}

export const WithFooter: Story = {
  render: () => (
    <Frame>
      <FrameHeader>
        <div className="flex items-center justify-between">
          <FrameTitle>Usage</FrameTitle>
          <Badge variant="warning">85%</Badge>
        </div>
        <FrameDescription>API calls this month</FrameDescription>
      </FrameHeader>
      <FramePanel>
        <Typography.Text className="font-semibold text-neutral-900">Team plan</Typography.Text>
        <Typography.Small className="text-neutral-500">
          850,000 of 1M requests used
        </Typography.Small>
      </FramePanel>
      <FrameFooter>
        <Button size="sm">Upgrade plan</Button>
      </FrameFooter>
    </Frame>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Frame>
  <FrameHeader>
    <div className="flex items-center justify-between">
      <FrameTitle>Usage</FrameTitle>
      <Badge variant="warning">85%</Badge>
    </div>
    <FrameDescription>API calls this month</FrameDescription>
  </FrameHeader>
  <FramePanel>
    <Typography.Text className="font-semibold text-neutral-900">Team plan</Typography.Text>
    <Typography.Small className="text-neutral-500">850,000 of 1M requests used</Typography.Small>
  </FramePanel>
  <FrameFooter>
    <Button size="sm">Upgrade plan</Button>
  </FrameFooter>
</Frame>`,
        language: "tsx",
      },
    },
  },
}

export const MultiplePanels: Story = {
  render: () => (
    <Frame>
      <FrameHeader>
        <FrameTitle>Notifications</FrameTitle>
        <FrameDescription>Activity from your workspace</FrameDescription>
      </FrameHeader>
      <FramePanel>
        <Typography.Text className="font-semibold text-neutral-900">Mentions</Typography.Text>
        <Typography.Small className="text-neutral-500">You have 3 unread mentions</Typography.Small>
      </FramePanel>
      <FramePanel>
        <Typography.Text className="font-semibold text-neutral-900">Team updates</Typography.Text>
        <Typography.Small className="text-neutral-500">2 new comments on Projects</Typography.Small>
      </FramePanel>
    </Frame>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Frame>
  <FrameHeader>
    <FrameTitle>Notifications</FrameTitle>
    <FrameDescription>Activity from your workspace</FrameDescription>
  </FrameHeader>
  <FramePanel>...</FramePanel>
  <FramePanel>...</FramePanel>
</Frame>`,
        language: "tsx",
      },
    },
  },
}
