import type { Meta, StoryObj } from "@storybook/react-vite"
import type { ToastPosition } from "@enosta/en-ui"

import { Icon } from "@iconify/react"
import { useState } from "react"

import { Button, Toast, ToastProvider, Typography } from "@enosta/en-ui"

const TEXTS = [
  "Short message.",
  "A bit longer message that spans two lines.",
  "This is a longer description that intentionally takes more vertical space to demonstrate stacking with varying heights.",
  "An even longer description that should span multiple lines so we can verify the clamped collapsed height and smooth expansion animation when hovering or focusing the viewport.",
]

const POSITIONS: ToastPosition[] = [
  "top-left",
  "top-center",
  "top-right",
  "bottom-left",
  "bottom-center",
  "bottom-right",
]

const STATUS_TRIGGERS = [
  {
    description: "Your changes have been saved.",
    icon: "lucide:circle-check",
    label: "Success",
    textClass: "text-success-600",
    title: "Saved",
    type: "success",
  },
  {
    description: "There was a problem with your request.",
    icon: "lucide:circle-alert",
    label: "Error",
    textClass: "text-error-600",
    title: "Something went wrong",
    type: "error",
  },
  {
    description: "You can add components to your app using the cli.",
    icon: "lucide:info",
    label: "Info",
    textClass: "text-info-600",
    title: "Heads up",
    type: "info",
  },
  {
    description: "Your session is about to expire.",
    icon: "lucide:triangle-alert",
    label: "Warning",
    textClass: "text-warning-600",
    title: "Session expiring",
    type: "warning",
  },
] as const

async function fakePromise(): Promise<string> {
  await new Promise<void>((resolve) => {
    setTimeout(resolve, 2000)
  })

  const shouldSucceed = Math.random() > 0.3
  if (shouldSucceed) {
    return "Data loaded successfully"
  }
  throw new Error("Failed to load data")
}

function Section({
  children,
  description,
  title,
}: {
  children: React.ReactNode
  description?: string
  title: string
}) {
  return (
    <section>
      <Typography.H5 as="h2" className="mb-md text-neutral-900">
        {title}
      </Typography.H5>
      {description && (
        <Typography.Small as="p" className="mb-xl text-neutral-600">
          {description}
        </Typography.Small>
      )}
      <div className="flex flex-wrap items-center gap-md">{children}</div>
    </section>
  )
}

function OverviewPage() {
  const [demoToast] = useState(() => Toast.createToastManager())
  const [positionToast] = useState(() => Toast.createToastManager())
  const [varyingCount, setVaryingCount] = useState(0)
  const [position, setPosition] = useState<ToastPosition>("bottom-right")

  return (
    <ToastProvider position="bottom-right" toastManager={demoToast}>
      <div className="space-y-6xl">
        <header className="space-y-md">
          <Typography.H1 className="text-neutral-900">Toast</Typography.H1>
          <Typography.Lead className="max-w-[42rem] text-neutral-600">
            Transient feedback with statuses, actions, and async updates. Trigger a toast, then
            watch it stack, deduplicate, or resolve a promise.
          </Typography.Lead>
        </header>

        <Section title="Statuses">
          {STATUS_TRIGGERS.map(({ description, icon, label, textClass, title, type }) => (
            <Button
              key={type}
              onClick={() => {
                demoToast.add({ description, title, type })
              }}
              variant="secondary"
            >
              <Icon icon={icon} className={`size-3xl ${textClass}`} />
              {label}
            </Button>
          ))}
          <Button
            onClick={() => {
              demoToast.add({
                description: "Monday, January 3rd at 6:00pm",
                title: "Event has been created",
              })
            }}
            variant="secondary"
          >
            <Icon icon="lucide:bell" className="size-3xl text-neutral-600" />
            Default
          </Button>
          <Button
            onClick={() => {
              demoToast.add({
                description: "Please wait while we process your request.",
                title: "Loading…",
                type: "loading",
              })
            }}
            variant="secondary"
          >
            <Icon icon="lucide:loader-circle" className="size-3xl text-neutral-600" />
            Loading
          </Button>
        </Section>

        <Section
          description="Repeated clicks update the same toast instead of stacking another."
          title="Deduplicated"
        >
          <Button
            onClick={() => {
              demoToast.add({
                description: "Repeated clicks update this toast instead of stacking another.",
                id: "demo-dedup-toast",
                title: "Saved",
                type: "success",
              })
            }}
            variant="secondary"
          >
            Save again
          </Button>
        </Section>

        <Section
          description="The action button closes the toast and fires a follow-up."
          title="With action"
        >
          <Button
            onClick={() => {
              const id = demoToast.add({
                actionProps: {
                  children: "Undo",
                  onClick: () => {
                    demoToast.close(id)
                    demoToast.add({
                      description: "The action has been reverted.",
                      title: "Action undone",
                      type: "info",
                    })
                  },
                },
                description: "The release is available.",
                timeout: 10_000,
                title: "Published",
                type: "success",
              })
            }}
            variant="secondary"
          >
            Publish release
          </Button>
        </Section>

        <Section
          description="Loading, success, and error states resolve from one call."
          title="Promise"
        >
          <Button
            onClick={() => {
              void demoToast.promise(fakePromise(), {
                error: () => ({
                  description: "Please try again.",
                  title: "Something went wrong",
                }),
                loading: {
                  description: "Fetching the latest data.",
                  title: "Loading…",
                },
                success: (data: string) => ({
                  description: `Success: ${data}`,
                  title: "Data refreshed",
                }),
              })
            }}
            variant="secondary"
          >
            Refresh data
          </Button>
        </Section>

        <Section
          description="Stacking with clamped collapsed heights and smooth expansion."
          title="Varying heights"
        >
          <Button
            onClick={() => {
              setVaryingCount((prev) => prev + 1)
              const description = TEXTS[Math.floor(Math.random() * TEXTS.length)]
              demoToast.add({
                description,
                title: `Toast ${varyingCount + 1} created`,
              })
            }}
            variant="secondary"
          >
            Add a toast
          </Button>
        </Section>

        <Section
          description="Uses a separate toast manager so it does not interfere with the demos above."
          title="Position"
        >
          <ToastProvider position={position} toastManager={positionToast}>
            <div className="flex flex-wrap items-center gap-md">
              {POSITIONS.map((p) => (
                <Button
                  key={p}
                  onClick={() => {
                    setPosition(p)
                  }}
                  size="sm"
                  variant={position === p ? "primary" : "secondary"}
                >
                  {p}
                </Button>
              ))}
              <Button
                onClick={() => {
                  positionToast.add({
                    description: `This toast appeared at ${position}.`,
                    title: "Positioned toast",
                    type: "info",
                  })
                }}
                size="sm"
                variant="secondary"
              >
                Show toast
              </Button>
            </div>
          </ToastProvider>
        </Section>
      </div>
    </ToastProvider>
  )
}

function BasicStory() {
  const [storyToast] = useState(() => Toast.createToastManager())

  return (
    <ToastProvider toastManager={storyToast}>
      <Button
        onClick={() => storyToast.add({ title: "Saved", description: "Your changes are live." })}
      >
        Show toast
      </Button>
    </ToastProvider>
  )
}

function StatusStory() {
  const [storyToast] = useState(() => Toast.createToastManager())

  return (
    <ToastProvider toastManager={storyToast}>
      <div className="flex flex-wrap gap-md">
        {(["success", "error", "info", "warning"] as const).map((type) => (
          <Button
            key={type}
            onClick={() =>
              storyToast.add({
                title: type === "success" ? "Published" : `Toast type: ${type}`,
                description: "The release is available.",
                type,
              })
            }
            variant="secondary"
          >
            {type}
          </Button>
        ))}
      </div>
    </ToastProvider>
  )
}

const meta = {
  title: "Feedback/Toast",
  component: ToastProvider,
} satisfies Meta<typeof ToastProvider>

export default meta
type Story = StoryObj<typeof meta>

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
  render: () => <BasicStory />,
  parameters: {
    docs: {
      source: {
        code: `<ToastProvider>
  <App />
</ToastProvider>

<Button onClick={() => toast.add({ title: "Saved", description: "Your changes are live." })}>
  Show toast
</Button>`,
        language: "tsx",
      },
    },
  },
}

export const Status: Story = {
  render: () => <StatusStory />,
  parameters: {
    docs: {
      source: {
        code: `toast.add({
  title: "Published",
  description: "The release is available.",
  type: "success",
})`,
        language: "tsx",
      },
    },
  },
}
