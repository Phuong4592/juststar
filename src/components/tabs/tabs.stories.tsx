import type { Meta, StoryObj } from "@storybook/react-vite"

import { Typography } from "@enosta/en-ui"

import { Tabs, TabsList, TabsPanel, TabsTab, type TabsSize } from "./tabs"

const SIZES = ["sm", "default", "lg"] as const

function Panel({ children }: { children: string }) {
  return (
    <TabsPanel value={children}>
      <p className="p-3xl text-center text-body-xs text-neutral-600">{children} content</p>
    </TabsPanel>
  )
}

function TabbedContent({ size, variant }: { size?: TabsSize; variant?: "default" | "underline" }) {
  return (
    <Tabs defaultValue="tab-1">
      <TabsList size={size} variant={variant}>
        <TabsTab value="tab-1">Tab 1</TabsTab>
        <TabsTab value="tab-2">Tab 2</TabsTab>
        <TabsTab value="tab-3">Tab 3</TabsTab>
      </TabsList>
      <Panel>tab-1</Panel>
      <Panel>tab-2</Panel>
      <Panel>tab-3</Panel>
    </Tabs>
  )
}

function UnderlineContent({ orientation }: { orientation?: "horizontal" | "vertical" }) {
  return (
    <Tabs
      defaultValue="tab-1"
      orientation={orientation}
      className={orientation === "vertical" ? "w-full flex-row" : "w-full"}
    >
      {orientation === "vertical" ? (
        <div className="flex h-full border-s border-neutral-200">
          <TabsList variant="underline">
            <TabsTab value="tab-1">Tab 1</TabsTab>
            <TabsTab value="tab-2">Tab 2</TabsTab>
            <TabsTab value="tab-3">Tab 3</TabsTab>
          </TabsList>
        </div>
      ) : (
        <div className="border-b border-neutral-200">
          <TabsList variant="underline">
            <TabsTab value="tab-1">Tab 1</TabsTab>
            <TabsTab value="tab-2">Tab 2</TabsTab>
            <TabsTab value="tab-3">Tab 3</TabsTab>
          </TabsList>
        </div>
      )}
      <Panel>tab-1</Panel>
      <Panel>tab-2</Panel>
      <Panel>tab-3</Panel>
    </Tabs>
  )
}

function VerticalContent() {
  return (
    <Tabs defaultValue="tab-1" orientation="vertical" className="w-full">
      <TabsList>
        <TabsTab value="tab-1">Tab 1</TabsTab>
        <TabsTab value="tab-2">Tab 2</TabsTab>
        <TabsTab value="tab-3">Tab 3</TabsTab>
      </TabsList>
      <Panel>tab-1</Panel>
      <Panel>tab-2</Panel>
      <Panel>tab-3</Panel>
    </Tabs>
  )
}

function OverviewPage() {
  return (
    <div className="space-y-6xl">
      <section>
        <Typography.H5 as="h2" className="mb-xl text-neutral-900">
          Default
        </Typography.H5>
        <TabbedContent />
      </section>

      <section>
        <Typography.H5 as="h2" className="mb-xl text-neutral-900">
          Sizes
        </Typography.H5>
        <div className="space-y-5xl">
          {SIZES.map((size) => (
            <div key={size}>
              <Typography.Small as="h3" className="mb-md font-semibold text-neutral-600 capitalize">
                {size}
              </Typography.Small>
              <TabbedContent size={size} />
            </div>
          ))}
        </div>
      </section>

      <section>
        <Typography.H5 as="h2" className="mb-xl text-neutral-900">
          Underline variant
        </Typography.H5>
        <UnderlineContent />
      </section>

      <section>
        <Typography.H5 as="h2" className="mb-xl text-neutral-900">
          Vertical orientation
        </Typography.H5>
        <VerticalContent />
      </section>

      <section>
        <Typography.H5 as="h2" className="mb-xl text-neutral-900">
          Underline with vertical orientation
        </Typography.H5>
        <UnderlineContent orientation="vertical" />
      </section>

      <section>
        <Typography.H5 as="h2" className="mb-xl text-neutral-900">
          States
        </Typography.H5>
        <Tabs defaultValue="tab-1">
          <TabsList>
            <TabsTab value="tab-1">Tab 1</TabsTab>
            <TabsTab value="tab-2" disabled>
              Tab 2
            </TabsTab>
            <TabsTab value="tab-3">Tab 3</TabsTab>
          </TabsList>
          <Panel>tab-1</Panel>
          <Panel>tab-2</Panel>
          <Panel>tab-3</Panel>
        </Tabs>
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
  title: "Navigation/Tabs",
  component: Tabs,
} satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof meta>

const SOURCE = (listProps = "") => `<Tabs defaultValue="tab-1">
  <TabsList${listProps}>
    <TabsTab value="tab-1">Tab 1</TabsTab>
    <TabsTab value="tab-2">Tab 2</TabsTab>
    <TabsTab value="tab-3">Tab 3</TabsTab>
  </TabsList>
  <TabsPanel value="tab-1">Tab 1 content</TabsPanel>
  <TabsPanel value="tab-2">Tab 2 content</TabsPanel>
  <TabsPanel value="tab-3">Tab 3 content</TabsPanel>
</Tabs>`

export const Basic: Story = {
  render: () => <TabbedContent />,
  parameters: { docs: { source: { code: SOURCE(), language: "tsx" } } },
}

export const Small: Story = {
  render: () => <TabbedContent size="sm" />,
  parameters: { docs: { source: { code: SOURCE(' size="sm"'), language: "tsx" } } },
}

export const Large: Story = {
  render: () => <TabbedContent size="lg" />,
  parameters: { docs: { source: { code: SOURCE(' size="lg"'), language: "tsx" } } },
}

export const Underline: Story = {
  render: () => <UnderlineContent />,
  parameters: {
    docs: {
      source: {
        code: `<Tabs defaultValue="tab-1">
  <div className="border-b border-neutral-200">
    <TabsList variant="underline">
      <TabsTab value="tab-1">Tab 1</TabsTab>
      <TabsTab value="tab-2">Tab 2</TabsTab>
      <TabsTab value="tab-3">Tab 3</TabsTab>
    </TabsList>
  </div>
  <TabsPanel value="tab-1">Tab 1 content</TabsPanel>
  <TabsPanel value="tab-2">Tab 2 content</TabsPanel>
  <TabsPanel value="tab-3">Tab 3 content</TabsPanel>
</Tabs>`,
        language: "tsx",
      },
    },
  },
}

export const Vertical: Story = {
  render: () => <VerticalContent />,
  parameters: {
    docs: {
      source: {
        code: `<Tabs defaultValue="tab-1" orientation="vertical" className="w-full">
  <TabsList>
    <TabsTab value="tab-1">Tab 1</TabsTab>
    <TabsTab value="tab-2">Tab 2</TabsTab>
    <TabsTab value="tab-3">Tab 3</TabsTab>
  </TabsList>
  <TabsPanel value="tab-1">Tab 1 content</TabsPanel>
  <TabsPanel value="tab-2">Tab 2 content</TabsPanel>
  <TabsPanel value="tab-3">Tab 3 content</TabsPanel>
</Tabs>`,
        language: "tsx",
      },
    },
  },
}

export const UnderlineVertical: Story = {
  render: () => <UnderlineContent orientation="vertical" />,
  parameters: {
    docs: {
      source: {
        code: `<Tabs defaultValue="tab-1" orientation="vertical" className="w-full flex-row">
  <div className="border-s border-neutral-200">
    <TabsList variant="underline">
      <TabsTab value="tab-1">Tab 1</TabsTab>
      <TabsTab value="tab-2">Tab 2</TabsTab>
      <TabsTab value="tab-3">Tab 3</TabsTab>
    </TabsList>
  </div>
  <TabsPanel value="tab-1">Tab 1 content</TabsPanel>
  <TabsPanel value="tab-2">Tab 2 content</TabsPanel>
  <TabsPanel value="tab-3">Tab 3 content</TabsPanel>
</Tabs>`,
        language: "tsx",
      },
    },
  },
}

export const Disabled: Story = {
  render: () => (
    <Tabs defaultValue="tab-1">
      <TabsList>
        <TabsTab value="tab-1">Tab 1</TabsTab>
        <TabsTab value="tab-2" disabled>
          Tab 2
        </TabsTab>
        <TabsTab value="tab-3">Tab 3</TabsTab>
      </TabsList>
      <Panel>tab-1</Panel>
      <Panel>tab-2</Panel>
      <Panel>tab-3</Panel>
    </Tabs>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Tabs defaultValue="tab-1">
  <TabsList>
    <TabsTab value="tab-1">Tab 1</TabsTab>
    <TabsTab value="tab-2" disabled>Tab 2</TabsTab>
    <TabsTab value="tab-3">Tab 3</TabsTab>
  </TabsList>
  <TabsPanel value="tab-1">Tab 1 content</TabsPanel>
  <TabsPanel value="tab-2">Tab 2 content</TabsPanel>
  <TabsPanel value="tab-3">Tab 3 content</TabsPanel>
</Tabs>`,
        language: "tsx",
      },
    },
  },
}
