import type { DateRange } from "@daypicker/react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"

import { Calendar, Typography } from "@enosta/en-ui"

function OverviewPage() {
  const [single, setSingle] = useState<Date | undefined>(new Date())
  const [range, setRange] = useState<DateRange | undefined>()

  return (
    <div className="space-y-6xl">
      <section>
        <Typography.H5 as="h2" className="mb-xl text-neutral-900">
          Single selection
        </Typography.H5>
        <Calendar mode="single" onSelect={setSingle} selected={single} />
      </section>

      <section>
        <Typography.H5 as="h2" className="mb-xl text-neutral-900">
          Range selection
        </Typography.H5>
        <Calendar mode="range" onSelect={setRange} selected={range} />
      </section>

      <section>
        <Typography.H5 as="h2" className="mb-xl text-neutral-900">
          Dropdown navigation
        </Typography.H5>
        <Calendar captionLayout="dropdown" />
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
  title: "Forms/Calendar",
  component: Calendar,
} satisfies Meta<typeof Calendar>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  args: { mode: "single" },
  parameters: {
    docs: { source: { code: `<Calendar mode="single" />`, language: "tsx" } },
  },
}

export const Multiple: Story = {
  render: () => <Calendar mode="multiple" />,
  parameters: {
    docs: {
      source: {
        code: `<Calendar mode="multiple" onSelect={(dates) => setSelected(dates)} />`,
        language: "tsx",
      },
    },
  },
}

export const Range: Story = {
  render: () => <Calendar mode="range" />,
  parameters: {
    docs: {
      source: {
        code: `<Calendar mode="range" onSelect={(range) => setRange(range)} />`,
        language: "tsx",
      },
    },
  },
}

export const DropdownNavigation: Story = {
  render: () => (
    <Calendar
      captionLayout="dropdown"
      endMonth={new Date(2030, 11)}
      startMonth={new Date(2020, 0)}
    />
  ),
  parameters: {
    docs: {
      source: {
        code: `<Calendar captionLayout="dropdown" startMonth={new Date(2020, 0)} endMonth={new Date(2030, 11)} />`,
        language: "tsx",
      },
    },
  },
}

export const DisabledDates: Story = {
  render: () => <Calendar disabled={{ after: new Date() }} mode="single" />,
  parameters: {
    docs: {
      source: {
        code: `<Calendar mode="single" disabled={{ after: new Date() }} />`,
        language: "tsx",
      },
    },
  },
}
