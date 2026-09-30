import type { Meta, StoryObj } from "@storybook/react-vite"
import { Icon } from "@iconify/react"

import { ScrollArea, Typography } from "@enosta/en-ui"

const ACTIVITY = [
  { icon: "solar:document-add-linear", label: "Project brief created", time: "2 min" },
  { icon: "solar:user-plus-linear", label: "Maya joined the workspace", time: "18 min" },
  { icon: "solar:pallete-2-linear", label: "Design tokens updated", time: "43 min" },
  { icon: "solar:check-circle-linear", label: "Homepage review completed", time: "1 hr" },
  { icon: "solar:chat-round-dots-linear", label: "New feedback on navigation", time: "2 hr" },
  { icon: "solar:folder-with-files-linear", label: "Assets moved to Archive", time: "3 hr" },
  { icon: "solar:calendar-linear", label: "Launch review scheduled", time: "Yesterday" },
  { icon: "solar:link-linear", label: "Research notes shared", time: "Yesterday" },
] as const

const BOARD_COLUMNS = ["Backlog", "In progress", "Review", "Ready to ship"] as const

function ScrollAreaDemoPage() {
  return (
    <div className="space-y-6xl">
      <header className="max-w-[42rem] space-y-md">
        <Typography.H1>Scroll area</Typography.H1>
        <Typography.Lead className="text-neutral-600">
          Custom overflow for compact vertical and horizontal surfaces.
        </Typography.Lead>
      </header>

      <section>
        <Typography.H5 as="h2" className="mb-xl text-neutral-900">
          Vertical
        </Typography.H5>
        <ScrollArea className="h-[18rem] w-full max-w-[32rem] rounded-overlay border border-neutral-200 bg-surface shadow-surface">
          <div className="p-md">
            <Typography.Eyebrow as="div" className="px-xl py-md text-neutral-500">
              Recent activity
            </Typography.Eyebrow>
            {ACTIVITY.map((activity) => (
              <div
                key={activity.label}
                className="flex items-center gap-xl rounded-surface px-xl py-xl hover:bg-neutral-25"
              >
                <div className="grid size-[2.25rem] shrink-0 place-items-center rounded-surface bg-neutral-50 text-neutral-600">
                  <Icon className="size-3xl" icon={activity.icon} />
                </div>
                <div className="min-w-0 flex-1">
                  <Typography.Label as="p" className="truncate text-neutral-900">
                    {activity.label}
                  </Typography.Label>
                  <Typography.Caption as="p" className="text-neutral-500">
                    Northstar workspace
                  </Typography.Caption>
                </div>
                <Typography.Caption className="shrink-0 text-neutral-500">
                  {activity.time}
                </Typography.Caption>
              </div>
            ))}
          </div>
        </ScrollArea>
      </section>

      <section>
        <Typography.H5 as="h2" className="mb-xl text-neutral-900">
          Horizontal
        </Typography.H5>
        <ScrollArea
          className="h-[13rem] w-full max-w-[48rem] rounded-overlay border border-neutral-200 bg-neutral-25 shadow-surface"
          clampContentMinWidth={false}
          scrollbarGutter
        >
          <div className="flex w-max gap-xl p-3xl">
            {BOARD_COLUMNS.map((column, index) => (
              <article
                key={column}
                className="w-[14rem] shrink-0 rounded-surface border border-neutral-200 bg-surface p-xl"
              >
                <div className="mb-xl flex items-center justify-between">
                  <Typography.H4 as="h3" className="text-neutral-900">
                    {column}
                  </Typography.H4>
                  <Typography.Caption className="rounded-pill bg-neutral-50 px-md py-2xs text-neutral-500">
                    {index + 2}
                  </Typography.Caption>
                </div>
                <div className="space-y-md">
                  <Typography.Text as="div" className="rounded-control p-lg text-neutral-700">
                    Refine onboarding flow
                  </Typography.Text>
                  <Typography.Text as="div" className="rounded-control p-lg text-neutral-700">
                    Prepare release notes
                  </Typography.Text>
                </div>
              </article>
            ))}
          </div>
        </ScrollArea>
      </section>

      <section>
        <Typography.H5 as="h2" className="mb-xl text-neutral-900">
          Scroll fade
        </Typography.H5>
        <ScrollArea
          className="h-[14rem] w-full max-w-[32rem] rounded-overlay border border-neutral-200 bg-surface"
          overscrollContain
          scrollFade
        >
          <div className="space-y-3xl px-4xl py-3xl">
            <Typography.Text className="text-neutral-600">
              Good interfaces reveal complexity gradually. The first view should answer the
              immediate question, while the details remain close enough to discover without
              interrupting the task.
            </Typography.Text>
            <Typography.Text className="text-neutral-600">
              Scroll fades make hidden content feel intentional. As each edge is reached, the fade
              clears to confirm that the reader has seen the complete section.
            </Typography.Text>
            <Typography.Text className="text-neutral-600">
              This treatment works especially well for compact panels, menus, activity feeds, and
              any surface where native overflow needs a subtle visual cue.
            </Typography.Text>
            <Typography.Text className="text-neutral-600">
              Keyboard focus receives the same clear brand ring as the other controls in the design
              system.
            </Typography.Text>
          </div>
        </ScrollArea>
      </section>

      <section>
        <Typography.H5 as="h2" className="mb-xl text-neutral-900">
          Fill
        </Typography.H5>
        <ScrollArea
          className="h-[12rem] w-full max-w-[32rem] rounded-overlay border border-neutral-200 bg-neutral-25"
          fill
          scrollbarGutter
        >
          <div className="grid size-full place-items-center p-5xl text-center">
            <div>
              <Icon
                className="mx-auto mb-xl size-[1.75rem] text-neutral-400"
                icon="solar:widget-5-linear"
              />
              <Typography.H3 as="p" className="text-neutral-900">
                Content fills the scroll area
              </Typography.H3>
              <Typography.Text className="mt-xs text-neutral-500">
                Useful for centered empty states and full-height layouts.
              </Typography.Text>
            </div>
          </div>
        </ScrollArea>
      </section>
    </div>
  )
}

const meta = {
  title: "Primitives/Scroll Area",
  component: ScrollArea,
} satisfies Meta<typeof ScrollArea>

export default meta
type Story = StoryObj<typeof meta>

export const Overview: Story = {
  tags: ["!autodocs"],
  parameters: { layout: "fullscreen" },
  render: () => (
    <main className="bg-canvas p-3xl text-on-canvas sm:p-5xl md:p-6xl">
      <ScrollAreaDemoPage />
    </main>
  ),
}

export const Basic: Story = {
  render: () => (
    <ScrollArea className="h-[12rem] w-[18rem]">
      <div className="space-y-xl p-3xl">
        {Array.from({ length: 12 }, (_, index) => (
          <Typography.Text key={index}>Activity {index + 1}</Typography.Text>
        ))}
      </div>
    </ScrollArea>
  ),
  parameters: {
    docs: {
      source: {
        code: `<ScrollArea className="h-[12rem] w-[18rem]">
  <div className="space-y-xl p-3xl">...</div>
</ScrollArea>`,
        language: "tsx",
      },
    },
  },
}

export const Horizontal: Story = {
  render: () => (
    <ScrollArea className="w-[18rem]" clampContentMinWidth={false}>
      <div className="flex w-max gap-xl p-3xl">Wide horizontal content</div>
    </ScrollArea>
  ),
  parameters: {
    docs: {
      source: {
        code: `<ScrollArea className="w-[18rem]" clampContentMinWidth={false}>
  <div className="w-max">Wide horizontal content</div>
</ScrollArea>`,
        language: "tsx",
      },
    },
  },
}

export const ScrollFade: Story = {
  render: () => (
    <ScrollArea className="h-[12rem] w-[18rem]" scrollFade>
      <div className="space-y-xl p-3xl">
        {Array.from({ length: 12 }, (_, index) => (
          <Typography.Text key={index}>Activity {index + 1}</Typography.Text>
        ))}
      </div>
    </ScrollArea>
  ),
  parameters: {
    docs: {
      source: {
        code: `<ScrollArea className="h-[12rem] w-[18rem]" scrollFade>
  <ActivityList />
</ScrollArea>`,
        language: "tsx",
      },
    },
  },
}

export const Fill: Story = {
  render: () => (
    <ScrollArea className="h-[12rem] w-[18rem]" fill>
      <div className="grid size-full place-items-center">
        <Typography.Text>Content fills the scroll area.</Typography.Text>
      </div>
    </ScrollArea>
  ),
  parameters: {
    docs: {
      source: {
        code: `<ScrollArea className="h-[12rem] w-[18rem]" fill>
  <div className="grid size-full place-items-center">Content</div>
</ScrollArea>`,
        language: "tsx",
      },
    },
  },
}

export const Demo: Story = Basic
