import type { Meta, StoryObj } from "@storybook/react-vite"
import type { ReactNode } from "react"

import { Typography } from "@enosta/en-ui"

const meta = {
  title: "Foundations/Typography",
  component: Typography,
} satisfies Meta<typeof Typography>

export default meta
type Story = StoryObj<typeof meta>

function SpecimenRow({ children, meta }: { children: ReactNode; meta: string }) {
  return (
    <div className="grid items-baseline gap-md px-4xl py-3xl sm:grid-cols-[1fr_auto]">
      <div className="min-w-0">{children}</div>
      <Typography.MonoCaption className="shrink-0 text-neutral-500">{meta}</Typography.MonoCaption>
    </div>
  )
}

function OverviewPage() {
  return (
    <div className="space-y-6xl">
      <header className="max-w-[42rem] space-y-md">
        <Typography.H1>Typography</Typography.H1>
        <Typography.Lead className="text-neutral-600">
          Nunito carries product content. Geist Mono is reserved for code and machine syntax.
        </Typography.Lead>
      </header>

      <section>
        <Typography.H5 as="h2" className="mb-xl text-neutral-900">
          Headings
        </Typography.H5>
        <div className="divide-y divide-neutral-200 rounded-surface border border-neutral-200 bg-surface">
          <SpecimenRow meta="display/sm · 40/46 · bold">
            <Typography.Display as="p">Design system foundations</Typography.Display>
          </SpecimenRow>
          <SpecimenRow meta="heading/1 · 32/38 · semibold">
            <Typography.H1>Account settings</Typography.H1>
          </SpecimenRow>
          <SpecimenRow meta="heading/2 · 28/34 · semibold">
            <Typography.H2>Profile and preferences</Typography.H2>
          </SpecimenRow>
          <SpecimenRow meta="heading/3 · 24/29 · semibold">
            <Typography.H3>Notification rules</Typography.H3>
          </SpecimenRow>
          <SpecimenRow meta="heading/4 · 20/25 · semibold">
            <Typography.H4>Email digests</Typography.H4>
          </SpecimenRow>
        </div>
      </section>

      <section>
        <Typography.H5 as="h2" className="mb-xl text-neutral-900">
          Body and labels
        </Typography.H5>
        <div className="divide-y divide-neutral-200 rounded-surface border border-neutral-200 bg-surface">
          <SpecimenRow meta="body/lg · 18/28">
            <Typography.Lead>
              Introductory copy that sets expectations before the reader commits.
            </Typography.Lead>
          </SpecimenRow>
          <SpecimenRow meta="body/md · 16/24">
            <Typography.Text>
              Default interface copy for forms, lists, and descriptions.
            </Typography.Text>
          </SpecimenRow>
          <SpecimenRow meta="body/sm · 14/20">
            <Typography.Small>
              Supporting detail that stays readable in dense views.
            </Typography.Small>
          </SpecimenRow>
          <SpecimenRow meta="body/xs · 12/17">
            <Typography.Caption as="p">Updated 18 minutes ago</Typography.Caption>
          </SpecimenRow>
          <SpecimenRow meta="label/md · 14/17 · semibold">
            <Typography.Label as="p">Plan usage</Typography.Label>
          </SpecimenRow>
          <SpecimenRow meta="eyebrow/md · 11/13 · semibold · upper">
            <Typography.Eyebrow as="p">Release notes</Typography.Eyebrow>
          </SpecimenRow>
        </div>
      </section>

      <section>
        <Typography.H5 as="h2" className="mb-xl text-neutral-900">
          Operational values use Nunito
        </Typography.H5>
        <div className="divide-y divide-neutral-200 rounded-surface border border-neutral-200 bg-surface">
          <SpecimenRow meta="heading/5 · 16/21 · semibold">
            <Typography.H5 as="p">INC-4821</Typography.H5>
          </SpecimenRow>
          <SpecimenRow meta="body/md · 16/24">
            <Typography.Text>10:42 UTC · $1.84M</Typography.Text>
          </SpecimenRow>
          <SpecimenRow meta="body/xs · 12/17">
            <Typography.Caption as="p">production · v1.4.2</Typography.Caption>
          </SpecimenRow>
        </div>
      </section>

      <section>
        <Typography.H5 as="h2" className="mb-xl text-neutral-900">
          Code and machine syntax
        </Typography.H5>
        <div className="divide-y divide-neutral-200 rounded-surface border border-neutral-200 bg-surface">
          <SpecimenRow meta="mono/md · code semantics">
            <Typography.Code as="p">pnpm component:check typography</Typography.Code>
          </SpecimenRow>
          <SpecimenRow meta="mono/md · 16/24">
            <Typography.Mono as="p">src/components/typography/typography.tsx</Typography.Mono>
          </SpecimenRow>
          <SpecimenRow meta="mono/sm · 14/21">
            <Typography.MonoSmall as="p">sha256:7f83b1657ff1fc53</Typography.MonoSmall>
          </SpecimenRow>
          <SpecimenRow meta="mono/xs · 12/16">
            <Typography.MonoCaption as="p">{`{"status":"ok"}`}</Typography.MonoCaption>
          </SpecimenRow>
        </div>
      </section>

      <section>
        <Typography.H5 as="h2" className="mb-xl text-neutral-900">
          In context
        </Typography.H5>
        <div className="max-w-[42rem] rounded-surface border border-neutral-200 bg-surface p-4xl">
          <Typography.Eyebrow as="p" className="mb-lg text-neutral-500">
            Workspace
          </Typography.Eyebrow>
          <Typography.H3>Notification rules</Typography.H3>
          <Typography.Text className="mt-sm text-neutral-600">
            Choose which product events send email digests to your team.
          </Typography.Text>
          <div className="my-3xl border-t border-neutral-200" />
          <Typography.Label as="p">Digest frequency</Typography.Label>
          <Typography.Small className="mt-2xs text-neutral-500">
            Weekly summaries for mentions and approvals.
          </Typography.Small>
          <Typography.Caption as="p" className="mt-3xl text-neutral-500">
            Last synced 10:42 UTC
          </Typography.Caption>
        </div>
      </section>
    </div>
  )
}

export const Overview: Story = {
  tags: ["!autodocs"],
  parameters: { layout: "fullscreen" },
  render: () => (
    <main className="bg-canvas p-3xl text-on-canvas sm:p-5xl md:p-6xl">
      <OverviewPage />
    </main>
  ),
}

export const Basic: Story = {
  args: { children: "Clear typography creates a readable interface.", variant: "body/md" },
  parameters: {
    docs: {
      source: {
        code: `<Typography variant="body/md">Clear typography creates a readable interface.</Typography>`,
        language: "tsx",
      },
    },
  },
}

export const Compound: Story = {
  render: () => (
    <div className="grid gap-lg">
      <Typography.Display as="p">Rare display heading</Typography.Display>
      <Typography.H1>Page heading</Typography.H1>
      <Typography.H2>Section heading</Typography.H2>
      <Typography.H3>Panel heading</Typography.H3>
      <Typography.Text>Default interface text uses the compact body role.</Typography.Text>
      <Typography.Small>Supporting text stays readable in dense views.</Typography.Small>
      <Typography.Caption as="p">Short metadata uses the caption role.</Typography.Caption>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Typography.H1>Page heading</Typography.H1>
<Typography.H2>Section heading</Typography.H2>
<Typography.H3>Panel heading</Typography.H3>
<Typography.Text>Default interface text.</Typography.Text>
<Typography.Small>Supporting text.</Typography.Small>`,
        language: "tsx",
      },
    },
  },
}

export const Scale: Story = {
  render: () => (
    <div className="grid gap-md">
      <Typography.H1>32px page heading</Typography.H1>
      <Typography.H2>28px section heading</Typography.H2>
      <Typography.H3>24px panel heading</Typography.H3>
      <Typography.H4>20px compact heading</Typography.H4>
      <Typography.Lead>18px introductory text</Typography.Lead>
      <Typography.Text>16px default text</Typography.Text>
      <Typography.Small>14px supporting text</Typography.Small>
      <Typography.Caption as="p">12px metadata</Typography.Caption>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Typography.H1>32px page heading</Typography.H1>
<Typography.H2>28px section heading</Typography.H2>
<Typography.H3>24px panel heading</Typography.H3>
<Typography.H4>20px compact heading</Typography.H4>
<Typography.Lead>18px introductory text</Typography.Lead>
<Typography.Text>16px default text</Typography.Text>
<Typography.Small>14px supporting text</Typography.Small>
<Typography.Caption>12px metadata</Typography.Caption>`,
        language: "tsx",
      },
    },
  },
}

export const Technical: Story = {
  name: "Code and machine syntax",
  render: () => (
    <div className="grid gap-sm">
      <Typography.Text>INC-4821 · 10:42 UTC · $1.84M · production v1.4.2</Typography.Text>
      <Typography.Code as="p">pnpm component:check typography</Typography.Code>
      <Typography.Mono as="p">src/components/typography/typography.tsx</Typography.Mono>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Typography.Text>
  INC-4821 · 10:42 UTC · $1.84M · production v1.4.2
</Typography.Text>
<Typography.Code>pnpm component:check typography</Typography.Code>
<Typography.Mono>src/components/typography/typography.tsx</Typography.Mono>`,
        language: "tsx",
      },
    },
  },
}

export const SemanticOverride: Story = {
  render: () => <Typography.H3 as="h2">Visually compact section heading</Typography.H3>,
  parameters: {
    docs: {
      source: {
        code: `<Typography.H3 as="h2">
  Visually compact section heading
</Typography.H3>`,
        language: "tsx",
      },
    },
  },
}

export const Demo: Story = Basic
