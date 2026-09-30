import type { Meta, StoryObj } from "@storybook/react-vite"

import { AIChatPage, Button, Input, Typography } from "@enosta/en-ui"

const meta = {
  title: "Patterns/AI chat page",
  component: AIChatPage,
  args: {
    className: "[--ai-chat-page-height:100dvh]",
    composer: null,
    title: "Delivery assistant",
  },
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof AIChatPage>

export default meta
type Story = StoryObj<typeof meta>

function Composer() {
  return (
    <div className="grid min-w-0 grid-cols-[minmax(0,1fr)_auto] gap-sm">
      <Input aria-label="Message the assistant" placeholder="Ask about delivery work" />
      <Button>Send</Button>
    </div>
  )
}

function LongMessages() {
  return (
    <>
      {Array.from({ length: 24 }, (_, index) => (
        <article
          className={
            index % 2 === 0
              ? "ml-auto max-w-4/5 rounded-surface bg-neutral-100 p-md"
              : "max-w-4/5 rounded-surface border border-neutral-200 bg-container p-md"
          }
          key={index}
        >
          {index % 2 === 0
            ? `Review delivery risk ${index / 2 + 1} and identify the next owner.`
            : "The risk remains open until the dependency, responsible owner, and review date are confirmed. The assistant should keep the composer available while this history scrolls."}
        </article>
      ))}
    </>
  )
}

function Messages() {
  return (
    <>
      <article className="ml-auto max-w-4/5 rounded-surface bg-neutral-100 p-md">
        Summarize the delivery risks for this week.
      </article>
      <article className="max-w-4/5 rounded-surface border border-neutral-200 bg-container p-md">
        Three projects need attention: the website launch is waiting for content approval, the CRM
        migration needs a data owner, and the support rollout has two unresolved training dates.
      </article>
    </>
  )
}

export const Empty: Story = {
  args: {
    composer: <Composer />,
    description: "Ask about projects, delivery risks, and operational decisions.",
    emptyState: (
      <div className="grid gap-xs">
        <Typography.H2>What should we work through?</Typography.H2>
        <Typography.Text className="text-neutral-600">
          Start with a project, customer, or delivery question.
        </Typography.Text>
      </div>
    ),
    suggestions: (
      <>
        <Button variant="secondary">Summarize risks</Button>
        <Button variant="secondary">Draft an update</Button>
      </>
    ),
    title: "Delivery assistant",
  },
}

export const Conversation: Story = {
  args: { composer: <Composer />, messages: <Messages />, title: "Delivery assistant" },
}

export const LongConversation: Story = {
  args: {
    composer: <Composer />,
    messages: <LongMessages />,
    title: "Delivery assistant",
  },
}

export const Streaming: Story = {
  args: {
    busy: true,
    composer: <Composer />,
    messages: <Messages />,
    status: "Drafting response",
    title: "Delivery assistant",
  },
}
