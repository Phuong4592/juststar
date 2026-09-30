import type { Meta, StoryObj } from "@storybook/react-vite"

import { Typography } from "@enosta/en-ui"

const steps = ["25", "50", "100", "200", "300", "400", "500", "600", "700", "800", "900", "950"]

const families = ["neutral", "brand", "accent", "info", "success", "warning", "error"]

const semanticPairs = [
  ["Canvas", "--color-canvas", "--color-on-canvas"],
  ["Surface", "--color-surface", "--color-on-surface"],
  ["Container", "--color-container", "--color-on-container"],
  ["Overlay", "--color-overlay", "--color-on-overlay"],
  ["Brand", "--color-bg-brand", "--color-on-brand"],
  ["Accent", "--color-bg-accent", "--color-on-accent"],
  ["Info", "--color-bg-info", "--color-on-info"],
  ["Success", "--color-bg-success", "--color-on-success"],
  ["Warning", "--color-bg-warning", "--color-on-warning"],
  ["Error", "--color-bg-error", "--color-on-error"],
] as const

const meta = {
  title: "Foundations/Colors",
  parameters: { layout: "fullscreen", themeAware: true },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

function ColorsPage() {
  return (
    <main className="min-h-svh space-y-6xl bg-canvas p-3xl text-on-canvas sm:p-5xl md:p-6xl">
      <header className="space-y-md">
        <Typography.H1>Color tokens</Typography.H1>
        <Typography.Lead className="text-neutral-600">
          Semantic pairs carry meaning in components; ramps support intentional state and hierarchy.
        </Typography.Lead>
      </header>

      <section className="space-y-xl" aria-labelledby="semantic-colors">
        <Typography.H3 as="h2" id="semantic-colors">
          Semantic pairs
        </Typography.H3>
        <div className="grid gap-xl sm:grid-cols-2 lg:grid-cols-5">
          {semanticPairs.map(([label, background, foreground]) => (
            <div
              className="min-h-[7rem] rounded-surface border border-neutral-200 p-3xl shadow-surface"
              key={label}
              style={{ backgroundColor: `var(${background})`, color: `var(${foreground})` }}
            >
              <Typography.Label as="p">{label}</Typography.Label>
              <Typography.MonoCaption as="p" className="mt-md">
                {background}
              </Typography.MonoCaption>
              <Typography.MonoCaption as="p">{foreground}</Typography.MonoCaption>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4xl" aria-labelledby="color-ramps">
        <div className="space-y-md">
          <Typography.H3 as="h2" id="color-ramps">
            Color ramps
          </Typography.H3>
          <Typography.Text className="text-neutral-600">
            Use ramps when a component contract calls for a specific interaction or status step.
          </Typography.Text>
        </div>
        {families.map((family) => (
          <div className="space-y-md" key={family}>
            <Typography.Label as="h3" className="capitalize">
              {family}
            </Typography.Label>
            <div className="grid grid-cols-2 gap-sm sm:grid-cols-6 xl:grid-cols-12">
              {steps.map((step) => {
                const variable = `--color-${family}-${step}`
                return (
                  <div
                    className="overflow-hidden rounded-control border border-neutral-200 bg-surface"
                    key={variable}
                  >
                    <div
                      aria-hidden="true"
                      className="h-5xl"
                      style={{ backgroundColor: `var(${variable})` }}
                    />
                    <Typography.MonoCaption as="p" className="px-sm py-xs text-neutral-600">
                      {step}
                    </Typography.MonoCaption>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </section>
    </main>
  )
}

export const Overview: Story = {
  tags: ["!autodocs"],
  render: () => <ColorsPage />,
}
