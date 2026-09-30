import type { Meta, StoryObj } from "@storybook/react-vite"
import { Icon } from "@iconify/react"
import { useState } from "react"

import { Button, Typography } from "@enosta/en-ui"

function OverviewPage() {
  const VARIANTS = [
    "primary",
    "secondary",
    "tertiary",
    "danger",
    "danger-soft",
    "ghost",
    "link",
  ] as const

  const SIZES = ["xs", "sm", "md", "lg", "icon"] as const

  const [loading, setLoading] = useState(false)

  return (
    <div className="space-y-6xl">
      <section>
        <Typography.H5 as="h2" className="mb-xl text-neutral-900">
          Variants
        </Typography.H5>
        <div className="flex flex-wrap gap-xl">
          {VARIANTS.map((variant) => (
            <Button key={variant} variant={variant}>
              {variant}
            </Button>
          ))}
        </div>
      </section>

      <section>
        <Typography.H5 as="h2" className="mb-xl text-neutral-900">
          Sizes
        </Typography.H5>
        <div className="space-y-5xl">
          {VARIANTS.slice(0, 3).map((variant) => (
            <div key={variant}>
              <Typography.Small as="h3" className="mb-md font-semibold text-neutral-600 capitalize">
                {variant}
              </Typography.Small>
              <div className="flex flex-wrap items-center gap-xl">
                {SIZES.map((size) => (
                  <Button
                    key={size}
                    aria-label={size === "icon" ? `${variant} settings` : undefined}
                    size={size}
                    variant={variant}
                  >
                    {size === "icon" ? (
                      <Icon icon="solar:settings-linear" className="size-3xl" />
                    ) : (
                      size
                    )}
                  </Button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <Typography.H5 as="h2" className="mb-xl text-neutral-900">
          States
        </Typography.H5>

        <div className="space-y-5xl">
          <div>
            <Typography.Small as="h3" className="mb-md font-semibold text-neutral-600">
              Disabled
            </Typography.Small>
            <div className="flex flex-wrap gap-xl">
              {VARIANTS.map((variant) => (
                <Button key={variant} variant={variant} disabled>
                  {variant}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <Typography.Small as="h3" className="mb-md font-semibold text-neutral-600">
              Loading
            </Typography.Small>
            <div className="flex flex-wrap gap-xl">
              {VARIANTS.map((variant) => (
                <Button key={variant} variant={variant} loading>
                  {variant}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <Typography.Small as="h3" className="mb-md font-semibold text-neutral-600">
              Loading x Disabled
            </Typography.Small>
            <div className="flex flex-wrap gap-xl">
              {VARIANTS.map((variant) => (
                <Button key={variant} variant={variant} loading disabled>
                  {variant}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section>
        <Typography.H5 as="h2" className="mb-xl text-neutral-900">
          With icon
        </Typography.H5>
        <div className="flex flex-wrap gap-xl">
          <Button>
            <Icon icon="solar:settings-linear" className="size-3xl" />
            Settings
          </Button>
          <Button variant="secondary">
            <Icon icon="solar:download-minimalistic-bold" className="size-3xl" />
            Download
          </Button>
          <Button variant="danger">
            <Icon icon="solar:trash-bin-trash-bold" className="size-3xl" />
            Delete
          </Button>
          <Button variant="tertiary">
            <Icon icon="solar:add-circle-linear" className="size-3xl" />
            New item
          </Button>
        </div>
      </section>

      <section>
        <Typography.H5 as="h2" className="mb-xl text-neutral-900">
          Toggle loading
        </Typography.H5>
        <Button
          icon={<Icon icon="solar:download-minimalistic-bold" className="size-3xl" />}
          onClick={() => {
            setLoading((prev) => !prev)
          }}
          loading={loading}
        >
          Download
        </Button>
      </section>
    </div>
  )
}

export const Overview: Story = {
  tags: ["!autodocs"],
  parameters: { layout: "fullscreen" },
  render: () => (
    <main className="bg-canvas p-3xl text-on-canvas">
      <OverviewPage />
    </main>
  ),
}

const meta = {
  title: "Actions/Button",
  component: Button,
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  args: { children: "Save changes" },
  parameters: { docs: { source: { code: `<Button>Save changes</Button>`, language: "tsx" } } },
}

export const Loading: Story = {
  args: { children: "Saving", loading: true },
  parameters: { docs: { source: { code: `<Button loading>Saving</Button>`, language: "tsx" } } },
}

export const IconOnly: Story = {
  render: () => (
    <Button aria-label="Settings" icon={<Icon icon="solar:settings-linear" />} size="icon" />
  ),
  parameters: {
    docs: {
      source: {
        code: `<Button aria-label="Settings" icon={<SettingsIcon />} size="icon" />`,
        language: "tsx",
      },
    },
  },
}

export const Disabled: Story = {
  args: { children: "Save changes", disabled: true },
  parameters: {
    docs: {
      source: {
        code: `<Button disabled>Save changes</Button>`,
        language: "tsx",
      },
    },
  },
}

export const LongLabel: Story = {
  render: () => <Button variant="secondary">Review production readiness</Button>,
  parameters: {
    docs: {
      source: {
        code: `<Button variant="secondary">Review production readiness</Button>`,
        language: "tsx",
      },
    },
  },
}
