import type { Meta, StoryObj } from "@storybook/react-vite"

import { AIWorkspace, Button, Input, Spinner, Typography } from "@enosta/en-ui"

const meta = {
  title: "Patterns/AI workspace",
  component: AIWorkspace,
  args: { conversation: null, preview: null, title: "Page generator" },
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof AIWorkspace>

export default meta
type Story = StoryObj<typeof meta>

function Conversation() {
  return (
    <div className="flex min-h-full flex-col bg-canvas">
      <header className="border-b border-neutral-200 p-md">
        <Typography.H3 as="h2">Build with AI</Typography.H3>
        <Typography.Small className="mt-xs text-neutral-600">
          Generate and refine the customer portal.
        </Typography.Small>
      </header>
      <Typography.Text
        as="div"
        className="grid flex-1 place-items-center p-xl text-center text-neutral-600"
      >
        Describe the page you want to create.
      </Typography.Text>
      <div className="border-t border-neutral-200 p-md">
        <div className="flex gap-sm">
          <Input aria-label="Prompt" placeholder="Describe a change" />
          <Button>Send</Button>
        </div>
      </div>
    </div>
  )
}

function Preview() {
  return (
    <div className="grid min-h-full place-items-center bg-neutral-100 p-xl">
      <div className="min-h-[24rem] w-full max-w-[56rem] rounded-surface border border-neutral-200 bg-container p-xl shadow-raised">
        <Typography.H2>Customer portal preview</Typography.H2>
      </div>
    </div>
  )
}

export const Default: Story = {
  args: { conversation: <Conversation />, preview: <Preview />, title: "Page generator" },
}

export const PreviewLoading: Story = {
  args: {
    conversation: <Conversation />,
    preview: (
      <div className="grid min-h-full place-items-center">
        <Spinner aria-label="Generating preview" />
      </div>
    ),
    previewState: "loading",
    title: "Page generator",
  },
}

export const MobilePreview: Story = {
  args: {
    conversation: <Conversation />,
    defaultMobileView: "preview",
    preview: <Preview />,
    title: "Page generator",
  },
  parameters: { viewport: { defaultViewport: "mobile1" } },
}
