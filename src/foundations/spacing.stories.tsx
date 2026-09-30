import type { Meta, StoryObj } from "@storybook/react-vite"

import { Typography } from "@enosta/en-ui"

const spaces = [
  ["2xs", "2px"],
  ["xs", "4px"],
  ["sm", "6px"],
  ["md", "8px"],
  ["lg", "10px"],
  ["xl", "12px"],
  ["2xl", "14px"],
  ["3xl", "16px"],
  ["4xl", "20px"],
  ["5xl", "24px"],
  ["6xl", "32px"],
] as const

const meta = {
  title: "Foundations/Spacing",
  parameters: { layout: "fullscreen" },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

function SpacingPage() {
  return (
    <main className="min-h-svh space-y-6xl bg-canvas p-3xl text-on-canvas sm:p-5xl md:p-6xl">
      <header className="space-y-md">
        <Typography.H1>Spacing tokens</Typography.H1>
        <Typography.Lead className="text-neutral-600">
          A compact named scale for gaps, padding, margins, sizing, and responsive composition.
        </Typography.Lead>
      </header>

      <section className="space-y-xl" aria-labelledby="spacing-scale">
        <Typography.H3 as="h2" id="spacing-scale">
          Scale
        </Typography.H3>
        <div className="divide-y divide-neutral-200 rounded-surface border border-neutral-200 bg-surface">
          {spaces.map(([name, value]) => {
            const variable = `--space-${name}`
            return (
              <div
                className="grid items-center gap-xl px-3xl py-xl sm:grid-cols-[6rem_5rem_minmax(0,1fr)]"
                key={name}
              >
                <Typography.MonoSmall>{`space.${name}`}</Typography.MonoSmall>
                <Typography.Caption className="text-neutral-600">{value}</Typography.Caption>
                <div className="min-w-0 rounded-control bg-neutral-50 py-md">
                  <div
                    aria-hidden="true"
                    className="h-3xl rounded-control bg-brand-500"
                    style={{ inlineSize: `var(${variable})` }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </section>

      <section className="space-y-xl" aria-labelledby="spacing-relationships">
        <Typography.H3 as="h2" id="spacing-relationships">
          Relationships, not layouts
        </Typography.H3>
        <div className="grid gap-4xl md:grid-cols-3">
          <article className="rounded-surface border border-neutral-200 bg-surface p-4xl">
            <Typography.Label as="h3">Tight object</Typography.Label>
            <div className="mt-xl flex items-center gap-xs">
              <span className="size-3xl rounded-control bg-brand-500" />
              <Typography.Small>Icon and label</Typography.Small>
            </div>
            <Typography.MonoCaption as="p" className="mt-xl text-neutral-500">
              gap-xs · 4px
            </Typography.MonoCaption>
          </article>
          <article className="rounded-surface border border-neutral-200 bg-surface p-4xl">
            <Typography.Label as="h3">Related content</Typography.Label>
            <div className="mt-xl grid gap-md">
              <Typography.Text>Account settings</Typography.Text>
              <Typography.Small className="text-neutral-600">
                Manage profile and security preferences.
              </Typography.Small>
            </div>
            <Typography.MonoCaption as="p" className="mt-xl text-neutral-500">
              gap-md · 8px
            </Typography.MonoCaption>
          </article>
          <article className="rounded-surface border border-neutral-200 bg-surface p-4xl">
            <Typography.Label as="h3">Distinct regions</Typography.Label>
            <div className="mt-xl grid gap-5xl">
              <div className="h-4xl rounded-control bg-neutral-100" />
              <div className="h-4xl rounded-control bg-neutral-100" />
            </div>
            <Typography.MonoCaption as="p" className="mt-xl text-neutral-500">
              gap-5xl · 24px
            </Typography.MonoCaption>
          </article>
        </div>
      </section>
    </main>
  )
}

export const Overview: Story = {
  tags: ["!autodocs"],
  render: () => <SpacingPage />,
}
