import type { ComponentType } from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { Icon } from "@iconify/react"

import {
  Tooltip,
  TooltipCreateHandle,
  TooltipPopup,
  TooltipProvider,
  TooltipRoot,
  TooltipTrigger,
  Typography,
} from "@enosta/en-ui"

const SIDES = ["top", "right", "bottom", "left"] as const
const ALIGNS = ["start", "center", "end"] as const

function OverviewPage() {
  return (
    <div className="space-y-6xl">
      <section>
        <Typography.H5 as="h2" className="mb-xl text-neutral-900">
          Placement
        </Typography.H5>
        <div className="flex flex-wrap gap-xl">
          {SIDES.map((side) => (
            <Tooltip
              key={side}
              popup={`Side: ${side}`}
              side={side}
              trigger={<button type="button">{side}</button>}
            />
          ))}
        </div>
      </section>

      <section>
        <Typography.H5 as="h2" className="mb-xl text-neutral-900">
          Align
        </Typography.H5>
        <div className="flex flex-wrap gap-xl">
          {ALIGNS.map((align) => (
            <Tooltip
              key={align}
              align={align}
              popup={`Align: ${align}`}
              trigger={<button type="button">{align}</button>}
            />
          ))}
        </div>
      </section>

      <section>
        <Typography.H5 as="h2" className="mb-xl text-neutral-900">
          Custom trigger
        </Typography.H5>
        <div className="flex flex-wrap gap-xl">
          <Tooltip
            popup="Opens to the right of the anchor"
            side="right"
            trigger={
              <button
                aria-label="Settings"
                className="rounded-control border border-neutral-200 bg-surface px-lg py-xs text-body-sm text-neutral-900"
                type="button"
              >
                Custom trigger
              </button>
            }
          />
        </div>
      </section>
    </div>
  )
}

export const Overview: Story = {
  args: { popup: null, trigger: null },
  tags: ["!autodocs"],
  parameters: { layout: "fullscreen" },
  render: () => (
    <main className="bg-canvas p-3xl text-on-canvas">
      <OverviewPage />
    </main>
  ),
}

const meta = {
  title: "Overlays/Tooltip",
  component: Tooltip,
} satisfies Meta<typeof Tooltip>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  args: { popup: "Open settings", trigger: <button type="button">Settings</button> },
  parameters: {
    docs: {
      source: {
        code: `<Tooltip popup="Open settings" trigger={<button type="button">Settings</button>} />`,
        language: "tsx",
      },
    },
  },
}

export const Positioned: Story = {
  args: { popup: "Keyboard shortcuts", trigger: <button type="button">Help</button> },
  render: (args) => <Tooltip {...args} side="right" />,
  parameters: {
    docs: {
      source: {
        code: `<Tooltip popup="Keyboard shortcuts" side="right" trigger={<button type="button">Help</button>} />`,
        language: "tsx",
      },
    },
  },
}

export const Aligned: Story = {
  args: {
    align: "start",
    popup: "Aligned to the start edge",
    trigger: <button type="button">Align</button>,
  },
  parameters: {
    docs: {
      source: {
        code: `<Tooltip align="start" popup="Aligned to the start edge" trigger={<button type="button">Align</button>} />`,
        language: "tsx",
      },
    },
  },
}

const toolbarTriggerClass =
  "relative min-h-5xl min-w-5xl cursor-pointer rounded-control border border-neutral-200 bg-surface p-sm text-neutral-900 hover:bg-neutral-50"

export const Grouped: Story = {
  args: { popup: null, trigger: null },
  render: () => (
    <TooltipProvider>
      <div className="flex gap-xs">
        <Tooltip
          popup="Bold"
          trigger={
            <button aria-label="Bold" className={toolbarTriggerClass} type="button">
              <Icon icon="lucide:bold" className="size-3xl" />
            </button>
          }
        />
        <Tooltip
          popup="Italic"
          trigger={
            <button aria-label="Italic" className={toolbarTriggerClass} type="button">
              <Icon icon="lucide:italic" className="size-3xl" />
            </button>
          }
        />
        <Tooltip
          popup="Underline"
          trigger={
            <button aria-label="Underline" className={toolbarTriggerClass} type="button">
              <Icon icon="lucide:underline" className="size-3xl" />
            </button>
          }
        />
      </div>
    </TooltipProvider>
  ),
  parameters: {
    docs: {
      source: {
        code: `<TooltipProvider>
  <div className="flex gap-xs">
    <Tooltip popup="Bold" trigger={<button aria-label="Bold" className={toolbarTriggerClass} type="button"><BoldIcon /></button>} />
    <Tooltip popup="Italic" trigger={<button aria-label="Italic" className={toolbarTriggerClass} type="button"><ItalicIcon /></button>} />
    <Tooltip popup="Underline" trigger={<button aria-label="Underline" className={toolbarTriggerClass} type="button"><UnderlineIcon /></button>} />
  </div>
</TooltipProvider>`,
        language: "tsx",
      },
    },
  },
}

type Payload = ComponentType

const animatedHandle = TooltipCreateHandle<Payload>()

function BoldContent() {
  return <span>Make text bold</span>
}
function ItalicContent() {
  return <span>Apply italic formatting to text</span>
}
function UnderlineContent() {
  return <span>Underline text</span>
}

const ANIMATED_TRIGGERS = [
  { ariaLabel: "Bold", content: BoldContent, icon: "lucide:bold" },
  { ariaLabel: "Italic", content: ItalicContent, icon: "lucide:italic" },
  { ariaLabel: "Underline", content: UnderlineContent, icon: "lucide:underline" },
]

export const Animated: Story = {
  args: { popup: null, trigger: null },
  render: () => (
    <TooltipProvider>
      <div className="flex gap-xs">
        {ANIMATED_TRIGGERS.map(({ ariaLabel, content, icon }) => (
          <TooltipTrigger
            key={ariaLabel}
            aria-label={ariaLabel}
            className={`${toolbarTriggerClass} after:absolute after:left-full after:h-full after:w-2xs`}
            handle={animatedHandle}
            payload={content}
            render={<button type="button" />}
          >
            <Icon icon={icon} className="size-3xl" />
          </TooltipTrigger>
        ))}
      </div>
      <TooltipRoot handle={animatedHandle}>
        {({ payload: Payload }) => <TooltipPopup>{Payload != null && <Payload />}</TooltipPopup>}
      </TooltipRoot>
    </TooltipProvider>
  ),
  parameters: {
    docs: {
      source: {
        code: `const animatedHandle = TooltipCreateHandle<ComponentType>()

<TooltipProvider>
  <div className="flex gap-xs">
    <TooltipTrigger aria-label="Bold" className={toolbarTriggerClass} handle={animatedHandle} payload={BoldContent} render={<button type="button" />}><BoldIcon /></TooltipTrigger>
    <TooltipTrigger aria-label="Italic" className={toolbarTriggerClass} handle={animatedHandle} payload={ItalicContent} render={<button type="button" />}><ItalicIcon /></TooltipTrigger>
    <TooltipTrigger aria-label="Underline" className={toolbarTriggerClass} handle={animatedHandle} payload={UnderlineContent} render={<button type="button" />}><UnderlineIcon /></TooltipTrigger>
  </div>
  <TooltipRoot handle={animatedHandle}>
    {({ payload: Payload }) => <TooltipPopup>{Payload != null && <Payload />}</TooltipPopup>}
  </TooltipRoot>
</TooltipProvider>`,
        language: "tsx",
      },
    },
  },
}
