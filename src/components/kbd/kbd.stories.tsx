import type { Meta, StoryObj } from "@storybook/react-vite"

import { Kbd, Typography } from "@enosta/en-ui"

const meta = {
  title: "Data Display/Kbd",
  component: Kbd,
} satisfies Meta<typeof Kbd>

export default meta
type Story = StoryObj<typeof meta>

export const Overview: Story = {
  tags: ["!autodocs"],
  parameters: { layout: "fullscreen" },
  render: () => (
    <main className="bg-canvas p-3xl text-on-canvas">
      <div className="space-y-6xl">
        <section>
          <Typography.H5 as="h2" className="mb-xl text-neutral-900">
            Single keys
          </Typography.H5>
          <div className="flex flex-wrap items-center gap-xl">
            <Kbd>A</Kbd>
            <Kbd>Enter</Kbd>
            <Kbd>Space</Kbd>
            <Kbd>Esc</Kbd>
            <Kbd>Tab</Kbd>
            <Kbd>Backspace</Kbd>
          </div>
        </section>

        <section>
          <Typography.H5 as="h2" className="mb-xl text-neutral-900">
            Key combinations
          </Typography.H5>
          <div className="flex flex-col items-start gap-xl">
            <Kbd.Group>
              <Kbd>⌘</Kbd>
              <Kbd>K</Kbd>
            </Kbd.Group>
            <Kbd.Group>
              <Kbd>Ctrl</Kbd>
              <Kbd>Shift</Kbd>
              <Kbd>S</Kbd>
            </Kbd.Group>
            <Kbd.Group>
              <Kbd>Alt</Kbd>
              <Kbd>F4</Kbd>
            </Kbd.Group>
          </div>
        </section>

        <section>
          <Typography.H5 as="h2" className="mb-xl text-neutral-900">
            Inline with text
          </Typography.H5>
          <Typography.Text className="text-neutral-600">
            Press <Kbd>⌘</Kbd> + <Kbd>K</Kbd> to open the command palette, or press <Kbd>Esc</Kbd>{" "}
            to close it.
          </Typography.Text>
        </section>
      </div>
    </main>
  ),
}

export const Basic: Story = {
  args: { children: "Esc" },
  parameters: { docs: { source: { code: `<Kbd>Esc</Kbd>`, language: "tsx" } } },
}

export const Shortcut: Story = {
  render: () => (
    <Kbd.Group>
      <Kbd>⌘</Kbd>
      <Kbd>K</Kbd>
    </Kbd.Group>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Kbd.Group>
  <Kbd>⌘</Kbd>
  <Kbd>K</Kbd>
</Kbd.Group>`,
        language: "tsx",
      },
    },
  },
}
