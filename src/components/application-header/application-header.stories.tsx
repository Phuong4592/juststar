import type { Meta, StoryObj } from "@storybook/react-vite"

import { ApplicationHeader, Avatar, Button, Input } from "@enosta/en-ui"

const meta = {
  title: "Layout/Application header",
  component: ApplicationHeader,
  args: { brand: "Enosta" },
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof ApplicationHeader>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    actions: <Avatar fallback={{ children: "MN" }} />,
    brand: "Enosta",
    context: "Delivery workspace",
  },
}

export const WithSearch: Story = {
  args: {
    actions: <Avatar fallback={{ children: "MN" }} />,
    brand: "Enosta",
    context: "Delivery workspace",
    search: <Input aria-label="Search workspace" placeholder="Search workspace" />,
  },
}

export const Responsive: Story = {
  args: {
    actions: (
      <>
        <Button variant="secondary">Help</Button>
        <Avatar fallback={{ children: "MN" }} />
      </>
    ),
    brand: "Enosta Operations",
    context: "Customer delivery workspace",
    search: <Input aria-label="Search workspace" placeholder="Search projects and people" />,
  },
}
