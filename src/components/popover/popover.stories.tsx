import type { Meta, StoryObj } from "@storybook/react-vite"

import {
  Button,
  Popover,
  PopoverClose,
  PopoverDescription,
  PopoverPopup,
  PopoverTitle,
  PopoverTrigger,
  Typography,
} from "@enosta/en-ui"

const SIDES = ["top", "bottom", "left", "right"] as const

const meta = {
  title: "Overlays/Popover",
  component: Popover,
} satisfies Meta<typeof Popover>

export default meta
type Story = StoryObj<typeof meta>

export const Overview: Story = {
  tags: ["!autodocs"],
  parameters: { layout: "fullscreen" },
  render: () => (
    <main className="bg-canvas p-3xl text-on-canvas">
      <div className="space-y-6xl">
        <header className="space-y-md">
          <Typography.H1 className="text-neutral-900">Popover</Typography.H1>
          <Typography.Text className="text-neutral-600">
            Floating panels anchored to a trigger, with title, description, and close actions.
          </Typography.Text>
        </header>

        <section>
          <Typography.H2 as="h2" className="mb-xl text-neutral-900">
            Default
          </Typography.H2>
          <Popover>
            <PopoverTrigger render={<Button variant="secondary" />}>Open popover</PopoverTrigger>
            <PopoverPopup className="w-[420px]">
              <div className="space-y-md">
                <PopoverTitle>Notifications</PopoverTitle>
                <PopoverDescription>
                  Stay notified about mentions, replies, and project updates.
                </PopoverDescription>
                <PopoverClose render={<Button className="w-full" size="sm" />}>Close</PopoverClose>
              </div>
            </PopoverPopup>
          </Popover>
        </section>

        <section>
          <Typography.H2 as="h2" className="mb-xl text-neutral-900">
            Sides
          </Typography.H2>
          <div className="flex flex-wrap gap-md">
            {SIDES.map((side) => (
              <Popover key={side}>
                <PopoverTrigger render={<Button variant="secondary" />}>{side}</PopoverTrigger>
                <PopoverPopup side={side}>
                  <Typography.Text className="text-neutral-700">
                    Anchored to the {side} side.
                  </Typography.Text>
                </PopoverPopup>
              </Popover>
            ))}
          </div>
        </section>

        <section>
          <Typography.H2 as="h2" className="mb-xl text-neutral-900">
            Tooltip style
          </Typography.H2>
          <Popover>
            <PopoverTrigger render={<Button variant="secondary" />}>Tooltip style</PopoverTrigger>
            <PopoverPopup tooltipStyle>Compact, tooltip-like popover.</PopoverPopup>
          </Popover>
        </section>
      </div>
    </main>
  ),
}

export const Basic: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger render={<Button variant="secondary" />}>Open details</PopoverTrigger>
      <PopoverPopup>
        <PopoverTitle>Workspace</PopoverTitle>
        <PopoverDescription>Shared with four members.</PopoverDescription>
        <PopoverClose>Close</PopoverClose>
      </PopoverPopup>
    </Popover>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Popover>
  <PopoverTrigger render={<Button />}>Open details</PopoverTrigger>
  <PopoverPopup>
    <PopoverTitle>Workspace</PopoverTitle>
    <PopoverDescription>Shared with four members.</PopoverDescription>
    <PopoverClose>Close</PopoverClose>
  </PopoverPopup>
</Popover>`,
        language: "tsx",
      },
    },
  },
}

export const TooltipStyle: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger render={<Button variant="secondary" />}>Hover or click</PopoverTrigger>
      <PopoverPopup tooltipStyle>Compact supporting content.</PopoverPopup>
    </Popover>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Popover>
  <PopoverTrigger render={<Button />}>Hover or click</PopoverTrigger>
  <PopoverPopup tooltipStyle>Compact supporting content.</PopoverPopup>
</Popover>`,
        language: "tsx",
      },
    },
  },
}
