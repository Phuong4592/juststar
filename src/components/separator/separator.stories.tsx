import type { Meta, StoryObj } from "@storybook/react-vite"

import { Button, Separator, Typography } from "@enosta/en-ui"

const meta = {
  title: "Data Display/Separator",
  component: Separator,
} satisfies Meta<typeof Separator>

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
            Horizontal
          </Typography.H5>
          <div className="grid gap-md">
            <div className="grid gap-xs">
              <Typography.H4>Workspace access</Typography.H4>
              <Typography.Small className="text-neutral-600">
                Manage ordinary membership through spacing and heading hierarchy.
              </Typography.Small>
            </div>
            <Separator />
            <div className="grid gap-sm">
              <Typography.H4>Danger zone</Typography.H4>
              <Button variant="danger-soft">Delete workspace</Button>
            </div>
          </div>
        </section>

        <section>
          <Typography.H5 as="h2" className="mb-xl text-neutral-900">
            Vertical
          </Typography.H5>
          <div className="flex h-5xl items-center gap-xl">
            <span>Overview</span>
            <Separator orientation="vertical" />
            <span>Activity</span>
            <Separator orientation="vertical" />
            <span>Settings</span>
          </div>
        </section>
      </div>
    </main>
  ),
}
