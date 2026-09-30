import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"

import { Button, Checkbox, Typography } from "@enosta/en-ui"

type CheckboxOptionProps = {
  id: string
  label: string
  parent?: boolean
  value?: string
}

function CheckboxOption({ id, label, parent, value }: CheckboxOptionProps) {
  return (
    <label className="flex items-center gap-md text-neutral-700" htmlFor={id}>
      <Checkbox id={id} parent={parent} value={value} />
      {label}
    </label>
  )
}

function CheckboxDemoPage() {
  const [controlled, setControlled] = useState(false)
  const [controlledGroup, setControlledGroup] = useState(["email"])
  const [indeterminateChecked, setIndeterminateChecked] = useState(false)
  const [indeterminate, setIndeterminate] = useState(false)
  const [projectAccess, setProjectAccess] = useState(["issues", "pull-requests"])

  return (
    <div className="space-y-6xl">
      <section>
        <Typography.H5 as="h2" className="mb-xl text-neutral-900">
          States
        </Typography.H5>
        <div className="flex flex-wrap gap-xl">
          <label className="flex items-center gap-md text-neutral-700" htmlFor="state-checked">
            <Checkbox defaultChecked id="state-checked" />
            Checked
          </label>
          <label className="flex items-center gap-md text-neutral-700" htmlFor="state-unchecked">
            <Checkbox id="state-unchecked" />
            Unchecked
          </label>
          <label
            className="flex items-center gap-md text-neutral-700"
            htmlFor="state-disabled-checked"
          >
            <Checkbox defaultChecked disabled id="state-disabled-checked" />
            Disabled checked
          </label>
          <label
            className="flex items-center gap-md text-neutral-700"
            htmlFor="state-disabled-unchecked"
          >
            <Checkbox disabled id="state-disabled-unchecked" />
            Disabled unchecked
          </label>
          <div className="space-y-md">
            <label className="flex items-center gap-md text-neutral-700" htmlFor="state-invalid">
              <Checkbox
                aria-describedby="state-invalid-error"
                aria-invalid="true"
                id="state-invalid"
              />
              Invalid
            </label>
            <Typography.Small as="p" className="text-error-700" id="state-invalid-error">
              Accept the terms before continuing.
            </Typography.Small>
          </div>
        </div>
      </section>

      <section>
        <Typography.H5 as="h2" className="mb-xl text-neutral-900">
          Controlled
        </Typography.H5>
        <label className="flex items-center gap-md text-neutral-700" htmlFor="controlled">
          <Checkbox
            checked={controlled}
            id="controlled"
            onCheckedChange={(value) => {
              setControlled(value)
            }}
          />
          {controlled ? "Checked" : "Unchecked"}
        </label>
      </section>

      <section>
        <Typography.H5 as="h2" className="mb-xl text-neutral-900">
          Indeterminate
        </Typography.H5>
        <div className="flex flex-wrap items-center gap-xl">
          <label className="flex items-center gap-md text-neutral-700" htmlFor="indeterminate">
            <Checkbox
              checked={indeterminateChecked}
              id="indeterminate"
              indeterminate={indeterminate}
              onCheckedChange={(value) => {
                setIndeterminate(false)
                setIndeterminateChecked(value)
              }}
            />
            {getIndeterminateLabel(indeterminate, indeterminateChecked)}
          </label>
          <Button
            onClick={() => {
              setIndeterminate((prev) => !prev)
              setIndeterminateChecked(false)
            }}
            type="button"
            variant="link"
          >
            Toggle indeterminate
          </Button>
        </div>
      </section>

      <section>
        <Typography.H5 as="h2" className="mb-xl text-neutral-900" id="group-uncontrolled">
          Checkbox group
        </Typography.H5>
        <Checkbox.Group
          aria-labelledby="group-uncontrolled"
          defaultValue={["design", "engineering"]}
        >
          <CheckboxOption id="discipline-design" label="Design" value="design" />
          <CheckboxOption id="discipline-engineering" label="Engineering" value="engineering" />
          <CheckboxOption id="discipline-marketing" label="Marketing" value="marketing" />
        </Checkbox.Group>
      </section>

      <section>
        <Typography.H5 as="h2" className="mb-xl text-neutral-900" id="group-controlled">
          Controlled group
        </Typography.H5>
        <Checkbox.Group
          aria-labelledby="group-controlled"
          onValueChange={(value) => {
            setControlledGroup(value)
          }}
          value={controlledGroup}
        >
          <CheckboxOption id="notification-email" label="Email" value="email" />
          <CheckboxOption id="notification-push" label="Push notifications" value="push" />
          <CheckboxOption id="notification-sms" label="SMS" value="sms" />
        </Checkbox.Group>
        <Typography.Small as="p" className="mt-md text-neutral-500">
          Selected: {controlledGroup.length > 0 ? controlledGroup.join(", ") : "none"}
        </Typography.Small>
      </section>

      <section>
        <Typography.H5 as="h2" className="mb-xl text-neutral-900" id="group-parent">
          Parent checkbox
        </Typography.H5>
        <Checkbox.Group
          allValues={["issues", "pull-requests", "releases"]}
          aria-labelledby="group-parent"
          onValueChange={(value) => {
            setProjectAccess(value)
          }}
          value={projectAccess}
        >
          <CheckboxOption id="project-all" label="All project activity" parent />
          <div className="ml-5xl flex flex-col items-start gap-xl border-l border-neutral-200 pl-3xl">
            <CheckboxOption id="project-issues" label="Issues" value="issues" />
            <CheckboxOption
              id="project-pull-requests"
              label="Pull requests"
              value="pull-requests"
            />
            <CheckboxOption id="project-releases" label="Releases" value="releases" />
          </div>
        </Checkbox.Group>
      </section>

      <section>
        <Typography.H5 as="h2" className="mb-xl text-neutral-900" id="group-disabled">
          Disabled group
        </Typography.H5>
        <Checkbox.Group aria-labelledby="group-disabled" defaultValue={["analytics"]} disabled>
          <CheckboxOption id="disabled-analytics" label="Analytics" value="analytics" />
          <CheckboxOption id="disabled-reports" label="Weekly reports" value="reports" />
        </Checkbox.Group>
      </section>
    </div>
  )
}

function getIndeterminateLabel(indeterminate: boolean, checked: boolean) {
  if (indeterminate) {
    return "Indeterminate"
  }

  if (checked) {
    return "Checked"
  }

  return "Unchecked"
}

const meta = {
  title: "Forms/Checkbox",
  component: Checkbox,
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

export const Overview: Story = {
  tags: ["!autodocs"],
  parameters: { layout: "fullscreen" },
  render: () => (
    <main className="bg-canvas p-3xl text-on-canvas">
      <CheckboxDemoPage />
    </main>
  ),
}

export const Basic: Story = {
  render: () => (
    <label className="flex items-center gap-md text-neutral-700">
      <Checkbox defaultChecked /> Email notifications
    </label>
  ),
  parameters: {
    docs: {
      source: {
        code: `<label>
  <Checkbox defaultChecked />
  Email notifications
</label>`,
        language: "tsx",
      },
    },
  },
}

export const Indeterminate: Story = {
  render: () => (
    <label className="flex items-center gap-md text-neutral-700">
      <Checkbox indeterminate /> Select all
    </label>
  ),
  parameters: {
    docs: {
      source: {
        code: `<label>
  <Checkbox indeterminate />
  Select all
</label>`,
        language: "tsx",
      },
    },
  },
}

export const GroupBasic: Story = {
  render: () => (
    <Checkbox.Group aria-label="Notification channels" defaultValue={["email"]}>
      <label className="flex items-center gap-md text-neutral-700">
        <Checkbox value="email" /> Email
      </label>
      <label className="flex items-center gap-md text-neutral-700">
        <Checkbox value="sms" /> SMS
      </label>
      <label className="flex items-center gap-md text-neutral-700">
        <Checkbox value="push" /> Push
      </label>
    </Checkbox.Group>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Checkbox.Group defaultValue={["email"]} aria-label="Notification channels">
  <label><Checkbox value="email" /> Email</label>
  <label><Checkbox value="sms" /> SMS</label>
  <label><Checkbox value="push" /> Push</label>
</Checkbox.Group>`,
        language: "tsx",
      },
    },
  },
}

export const GroupDisabled: Story = {
  render: () => (
    <Checkbox.Group aria-label="Notification channels" disabled>
      <label className="flex items-center gap-md text-neutral-700">
        <Checkbox value="email" /> Email
      </label>
      <label className="flex items-center gap-md text-neutral-700">
        <Checkbox value="sms" /> SMS
      </label>
    </Checkbox.Group>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Checkbox.Group disabled aria-label="Notification channels">
  <label><Checkbox value="email" /> Email</label>
  <label><Checkbox value="sms" /> SMS</label>
</Checkbox.Group>`,
        language: "tsx",
      },
    },
  },
}
