import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"

import { Avatar, Button, Skeleton, Typography } from "@enosta/en-ui"

function ToggleLoadingExample() {
  const [loading, setLoading] = useState(true)

  return (
    <div className="space-y-xl">
      <Button onClick={() => setLoading((prev) => !prev)} variant="secondary">
        {loading ? "Show content" : "Show skeleton"}
      </Button>
      <div aria-busy={loading} aria-live="polite" className="w-[18rem]" role="status">
        {loading ? (
          <div className="space-y-xl">
            <Skeleton className="h-[8rem] w-full rounded-overlay" />
            <Skeleton className="h-3xl w-3/4" />
            <div className="flex items-center gap-xl">
              <Skeleton className="size-6xl rounded-pill" />
              <Skeleton className="h-xl w-[6rem]" />
            </div>
          </div>
        ) : (
          <div className="space-y-xl">
            <div className="flex h-[8rem] w-full items-center justify-center rounded-overlay bg-neutral-100">
              <Typography.Text className="font-semibold text-neutral-500">2026.09</Typography.Text>
            </div>
            <Typography.Text className="font-semibold text-neutral-900 mb-2">
              September release notes
            </Typography.Text>
            <div className="flex items-center gap-xl">
              <Avatar fallback={{ children: "EN" }} className="size-6xl" />
              <Typography.Small className="text-neutral-600">
                Enosta team · 2 min read
              </Typography.Small>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function OverviewPage() {
  return (
    <div className="space-y-6xl">
      <section>
        <Typography.H5 as="h2" className="mb-xl text-neutral-900">
          Shapes
        </Typography.H5>
        <div className="flex flex-wrap items-center gap-xl">
          <Skeleton className="size-5xl rounded-pill" />
          <Skeleton className="size-5xl" />
          <Skeleton className="h-3xl w-[6rem] rounded-none" />
          <Skeleton className="h-3xl w-[6rem] rounded-surface" />
          <Skeleton className="h-3xl w-[6rem] rounded-overlay" />
          <Skeleton className="h-[4rem] w-[6rem] rounded-overlay" />
        </div>
      </section>

      <section>
        <Typography.H5 as="h2" className="mb-xl text-neutral-900">
          Sizes
        </Typography.H5>
        <div className="space-y-5xl">
          <div>
            <Typography.Small as="h3" className="mb-md font-semibold text-neutral-600">
              Circles
            </Typography.Small>
            <div className="flex flex-wrap items-center gap-xl">
              <Skeleton className="size-3xl rounded-pill" />
              <Skeleton className="size-4xl rounded-pill" />
              <Skeleton className="size-5xl rounded-pill" />
              <Skeleton className="size-6xl rounded-pill" />
              <Skeleton className="size-[2.5rem] rounded-pill" />
            </div>
          </div>
          <div>
            <Typography.Small as="h3" className="mb-md font-semibold text-neutral-600">
              Bars
            </Typography.Small>
            <div className="flex flex-wrap items-center gap-xl">
              <Skeleton className="h-xl w-[6rem]" />
              <Skeleton className="h-3xl w-[6rem]" />
              <Skeleton className="h-4xl w-[6rem]" />
              <Skeleton className="h-[2.5rem] w-[6rem]" />
            </div>
          </div>
        </div>
      </section>

      <section>
        <Typography.H5 as="h2" className="mb-xl text-neutral-900">
          Article
        </Typography.H5>
        <div className="w-[22rem] space-y-xl">
          <Skeleton className="h-4xl w-2/3" />
          <Skeleton className="h-[8rem] w-full rounded-overlay" />
          <div className="space-y-md">
            <Skeleton className="h-3xl w-full" />
            <Skeleton className="h-3xl w-full" />
            <Skeleton className="h-3xl w-5/6" />
          </div>
        </div>
      </section>

      <section>
        <Typography.H5 as="h2" className="mb-xl text-neutral-900">
          Comments
        </Typography.H5>
        <div className="space-y-4xl">
          {Array.from({ length: 3 }).map((_, index) => (
            <div className="flex gap-xl" key={index}>
              <Skeleton className="size-5xl shrink-0 rounded-pill" />
              <div className="flex-1 space-y-md">
                <Skeleton className="h-xl w-[5rem]" />
                <Skeleton className="h-3xl w-full" />
                <Skeleton className="h-3xl w-2/3" />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <Typography.H5 as="h2" className="mb-xl text-neutral-900">
          Stat cards
        </Typography.H5>
        <div className="flex flex-wrap gap-xl">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              className="w-[10rem] space-y-md rounded-surface border border-neutral-200 p-xl"
              key={index}
            >
              <Skeleton className="h-xl w-[4rem]" />
              <Skeleton className="h-4xl w-[3rem]" />
              <Skeleton className="h-xl w-[5rem]" />
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

const meta = {
  title: "Data Display/Skeleton",
  component: Skeleton,
} satisfies Meta<typeof Skeleton>

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
  args: { className: "h-3xl w-[12rem]" },
  parameters: {
    docs: { source: { code: `<Skeleton className="h-3xl w-[12rem]" />`, language: "tsx" } },
  },
}

export const Text: Story = {
  render: () => (
    <div className="w-[18rem] space-y-md">
      <Skeleton className="h-3xl w-full" />
      <Skeleton className="h-3xl w-5/6" />
      <Skeleton className="h-3xl w-2/3" />
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `<div className="w-[18rem] space-y-md">
  <Skeleton className="h-3xl w-full" />
  <Skeleton className="h-3xl w-5/6" />
  <Skeleton className="h-3xl w-2/3" />
</div>`,
        language: "tsx",
      },
    },
  },
}

export const Profile: Story = {
  render: () => (
    <div
      role="status"
      aria-busy="true"
      aria-label="Loading profile"
      className="flex items-center gap-xl"
    >
      <Skeleton className="size-[2.5rem] rounded-pill" />
      <div className="space-y-md">
        <Skeleton className="h-xl w-[8rem]" />
        <Skeleton className="h-xl w-[5rem]" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `<div role="status" aria-busy="true" aria-label="Loading profile">
  <Skeleton className="size-[2.5rem] rounded-pill" />
  <div className="space-y-md">
    <Skeleton className="h-xl w-[8rem]" />
    <Skeleton className="h-xl w-[5rem]" />
  </div>
</div>`,
        language: "tsx",
      },
    },
  },
}

export const Card: Story = {
  render: () => (
    <div className="w-[18rem] space-y-xl">
      <Skeleton className="h-[8rem] w-full rounded-overlay" />
      <Skeleton className="h-3xl w-3/4" />
      <Skeleton className="h-3xl w-1/2" />
      <div className="flex items-center gap-xl pt-md">
        <Skeleton className="size-[2.5rem] rounded-pill" />
        <div className="flex-1 space-y-md">
          <Skeleton className="h-xl w-[6rem]" />
          <Skeleton className="h-xl w-[4rem]" />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `<div className="w-[18rem] space-y-xl">
  <Skeleton className="h-[8rem] w-full rounded-overlay" />
  <Skeleton className="h-3xl w-3/4" />
  <Skeleton className="h-3xl w-1/2" />
  <div className="flex items-center gap-xl pt-md">
    <Skeleton className="size-[2.5rem] rounded-pill" />
    <div className="flex-1 space-y-md">
      <Skeleton className="h-xl w-[6rem]" />
      <Skeleton className="h-xl w-[4rem]" />
    </div>
  </div>
</div>`,
        language: "tsx",
      },
    },
  },
}

export const TableRows: Story = {
  render: () => (
    <div className="space-y-2xl">
      {Array.from({ length: 4 }).map((_, index) => (
        <div className="flex items-center gap-xl" key={index}>
          <Skeleton className="size-4xl rounded-pill" />
          <Skeleton className="h-3xl flex-1" />
          <Skeleton className="h-3xl w-[4rem]" />
          <Skeleton className="h-3xl w-[3rem]" />
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `<div className="space-y-2xl">
  {rows.map((row) => (
    <div className="flex items-center gap-xl" key={row.id}>
      <Skeleton className="size-4xl rounded-pill" />
      <Skeleton className="h-3xl flex-1" />
      <Skeleton className="h-3xl w-[4rem]" />
      <Skeleton className="h-3xl w-[3rem]" />
    </div>
  ))}
</div>`,
        language: "tsx",
      },
    },
  },
}

export const ToggleLoading: Story = {
  render: () => <ToggleLoadingExample />,
  parameters: {
    docs: {
      source: {
        code: `function ToggleLoadingExample() {
  const [loading, setLoading] = useState(true)

  return (
    <div className="space-y-xl">
      <Button onClick={() => setLoading((prev) => !prev)} variant="secondary">
        {loading ? "Show content" : "Show skeleton"}
      </Button>
      <div aria-busy={loading} aria-live="polite" className="w-[18rem]" role="status">
        {loading ? (
          <div className="space-y-xl">
            <Skeleton className="h-[8rem] w-full rounded-overlay" />
            <Skeleton className="h-3xl w-3/4" />
            <div className="flex items-center gap-xl">
              <Skeleton className="size-5xl rounded-pill" />
              <Skeleton className="h-xl w-[6rem]" />
            </div>
          </div>
        ) : (
          <LoadedCard />
        )}
      </div>
    </div>
  )
}`,
        language: "tsx",
      },
    },
  },
}
