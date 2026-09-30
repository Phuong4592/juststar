import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"

import {
  Button,
  Field,
  FieldLabel,
  Input,
  Sheet,
  SheetClose,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetPanel,
  SheetPopup,
  SheetTitle,
  SheetTrigger,
  Typography,
} from "@enosta/en-ui"

type SheetSide = "bottom" | "left" | "right" | "top"

function OverviewPage() {
  return (
    <div className="space-y-6xl">
      <section>
        <Typography.H5 as="h2" className="mb-xl text-neutral-900">
          Anatomy
        </Typography.H5>
        <EditProfileSheet />
      </section>

      <section>
        <Typography.H5 as="h2" className="mb-xl text-neutral-900">
          Sides
        </Typography.H5>
        <div className="flex flex-wrap gap-xl">
          <EditProfileSheet side="right" />
          <EditProfileSheet side="left" />
          <EditProfileSheet side="top" />
          <EditProfileSheet side="bottom" />
        </div>
      </section>

      <section>
        <Typography.H5 as="h2" className="mb-xl text-neutral-900">
          Inset
        </Typography.H5>
        <div className="flex flex-wrap gap-xl">
          <InsetSheet side="right" />
          <InsetSheet side="bottom" />
        </div>
      </section>

      <section>
        <Typography.H5 as="h2" className="mb-xl text-neutral-900">
          Footer variants
        </Typography.H5>
        <div className="flex flex-wrap gap-xl">
          <EditProfileSheet />
          <BareFooterSheet />
        </div>
      </section>

      <section>
        <Typography.H5 as="h2" className="mb-xl text-neutral-900">
          Scrolling
        </Typography.H5>
        <ScrollSheet />
      </section>

      <section>
        <Typography.H5 as="h2" className="mb-xl text-neutral-900">
          States
        </Typography.H5>
        <div className="space-y-5xl">
          <div>
            <Typography.Small as="h3" className="mb-md font-semibold text-neutral-600">
              Controlled
            </Typography.Small>
            <ControlledSheet />
          </div>
          <div>
            <Typography.Small as="h3" className="mb-md font-semibold text-neutral-600">
              Nested sheets
            </Typography.Small>
            <NestedSheets />
          </div>
        </div>
      </section>
    </div>
  )
}

function EditProfileSheet({ side = "right" }: { side?: SheetSide }) {
  return (
    <Sheet>
      <SheetTrigger render={<Button variant="secondary" />}>Open sheet</SheetTrigger>
      <SheetPopup side={side}>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </SheetDescription>
        </SheetHeader>
        <form className="contents">
          <SheetPanel className="grid gap-3xl">
            <Field>
              <FieldLabel>Name</FieldLabel>
              <Input defaultValue="Margaret Welsh" type="text" />
            </Field>
            <Field>
              <FieldLabel>Username</FieldLabel>
              <Input defaultValue="@maggie.welsh" type="text" />
            </Field>
          </SheetPanel>
          <SheetFooter>
            <SheetClose render={<Button variant="ghost" />}>Cancel</SheetClose>
            <Button type="submit">Save</Button>
          </SheetFooter>
        </form>
      </SheetPopup>
    </Sheet>
  )
}

function InsetSheet({ side = "right" }: { side?: SheetSide }) {
  return (
    <Sheet>
      <SheetTrigger render={<Button variant="secondary" />}>Inset {side}</SheetTrigger>
      <SheetPopup side={side} variant="inset">
        <SheetHeader>
          <SheetTitle>Notifications</SheetTitle>
          <SheetDescription>Choose what you want to be notified about.</SheetDescription>
        </SheetHeader>
        <SheetFooter variant="bare">
          <SheetClose render={<Button />}>Close</SheetClose>
        </SheetFooter>
      </SheetPopup>
    </Sheet>
  )
}

function BareFooterSheet() {
  return (
    <Sheet>
      <SheetTrigger render={<Button variant="secondary" />}>Bare footer</SheetTrigger>
      <SheetPopup>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </SheetDescription>
        </SheetHeader>
        <form className="contents">
          <SheetPanel className="grid gap-3xl">
            <Field>
              <FieldLabel>Name</FieldLabel>
              <Input defaultValue="Margaret Welsh" type="text" />
            </Field>
            <Field>
              <FieldLabel>Username</FieldLabel>
              <Input defaultValue="@maggie.welsh" type="text" />
            </Field>
          </SheetPanel>
          <SheetFooter variant="bare">
            <SheetClose render={<Button variant="ghost" />}>Cancel</SheetClose>
            <Button type="submit">Save</Button>
          </SheetFooter>
        </form>
      </SheetPopup>
    </Sheet>
  )
}

function ScrollSheet() {
  return (
    <Sheet>
      <SheetTrigger render={<Button variant="secondary" />}>Terms & Conditions</SheetTrigger>
      <SheetPopup showCloseButton={false}>
        <SheetHeader>
          <SheetTitle>Terms & Conditions</SheetTitle>
        </SheetHeader>
        <SheetPanel>
          <div className="flex flex-col gap-3xl">
            {TERMS_SECTIONS.map(({ heading, body }) => (
              <div key={heading} className="flex flex-col gap-xs">
                <Typography.Label as="p" className="text-neutral-900">
                  {heading}
                </Typography.Label>
                <Typography.Text className="text-neutral-700">{body}</Typography.Text>
              </div>
            ))}
          </div>
        </SheetPanel>
        <SheetFooter>
          <SheetClose render={<Button variant="ghost" />}>Cancel</SheetClose>
          <Button type="button">I agree</Button>
        </SheetFooter>
      </SheetPopup>
    </Sheet>
  )
}

function ControlledSheet() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)} variant="secondary">
        Open controlled sheet
      </Button>
      <Sheet onOpenChange={setOpen} open={open}>
        <SheetPopup>
          <SheetHeader>
            <SheetTitle>Settings</SheetTitle>
            <SheetDescription>Change your preferences</SheetDescription>
          </SheetHeader>
          <SheetFooter>
            <SheetClose render={<Button variant="ghost" />}>Close</SheetClose>
          </SheetFooter>
        </SheetPopup>
      </Sheet>
    </>
  )
}

function NestedSheets() {
  return (
    <Sheet>
      <SheetTrigger render={<Button variant="secondary" />}>Open parent</SheetTrigger>
      <SheetPopup showCloseButton={false}>
        <SheetHeader>
          <SheetTitle>Manage team member</SheetTitle>
          <SheetDescription>View and manage a user in your team.</SheetDescription>
        </SheetHeader>
        <SheetPanel className="grid gap-3xl">
          <div className="grid gap-xs">
            <Typography.Small className="text-neutral-500">Name</Typography.Small>
            <Typography.Label as="p" className="text-neutral-900">
              Bora Baloglu
            </Typography.Label>
          </div>
          <div className="grid gap-xs">
            <Typography.Small className="text-neutral-500">Email</Typography.Small>
            <Typography.Label as="p" className="text-neutral-900">
              bora@example.com
            </Typography.Label>
          </div>
        </SheetPanel>
        <SheetFooter>
          <Sheet>
            <SheetTrigger render={<Button variant="secondary" />}>Edit details</SheetTrigger>
            <SheetPopup side="left" showCloseButton={false}>
              <SheetHeader>
                <SheetTitle>Edit details</SheetTitle>
                <SheetDescription>Make changes to the member&apos;s information.</SheetDescription>
              </SheetHeader>
              <SheetPanel className="grid gap-3xl">
                <Field>
                  <FieldLabel>Name</FieldLabel>
                  <Input defaultValue="Bora Baloglu" type="text" />
                </Field>
                <Field>
                  <FieldLabel>Email</FieldLabel>
                  <Input defaultValue="bora@example.com" type="text" />
                </Field>
              </SheetPanel>
              <SheetFooter>
                <SheetClose render={<Button variant="ghost" />}>Cancel</SheetClose>
                <Button type="submit">Save changes</Button>
              </SheetFooter>
            </SheetPopup>
          </Sheet>
        </SheetFooter>
      </SheetPopup>
    </Sheet>
  )
}

const TERMS_SECTIONS = [
  {
    body: "By accessing and using this website, users agree to comply with and be bound by these Terms of Service. Users who do not agree with these terms should discontinue use of the website immediately.",
    heading: "Acceptance of Terms",
  },
  {
    body: "Users are responsible for maintaining the confidentiality of their account credentials. Any activities occurring under a user's account are the sole responsibility of the account holder. Users must notify the website administrators immediately of any unauthorized account access.",
    heading: "User Account Responsibilities",
  },
  {
    body: "The website and its original content are protected by intellectual property laws. Users may not reproduce, distribute, modify, create derivative works, or commercially exploit any content without explicit written permission from the website owners.",
    heading: "Content Usage and Restrictions",
  },
  {
    body: 'The website provides content "as is" without any warranties. The website owners shall not be liable for direct, indirect, incidental, consequential, or punitive damages arising from user interactions with the platform.',
    heading: "Limitation of Liability",
  },
  {
    body: "Respect the rights of other users, avoid harmful content, and comply with applicable local and international laws.",
    heading: "User Conduct Guidelines",
  },
  {
    body: "The website reserves the right to modify these terms at any time. Continued use of the website after changes constitutes acceptance of the new terms.",
    heading: "Modifications to Terms",
  },
  {
    body: "The website may terminate or suspend user access without prior notice for violations of these terms or for any other reason deemed appropriate by the administration.",
    heading: "Termination Clause",
  },
  {
    body: "These terms are governed by the laws of the jurisdiction where the website is primarily operated, without regard to conflict of law principles.",
    heading: "Governing Law",
  },
]

const meta = {
  title: "Overlays/Sheet",
  component: Sheet,
} satisfies Meta<typeof Sheet>

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
  render: () => <EditProfileSheet />,
  parameters: {
    docs: {
      source: {
        code: `<Sheet>
  <SheetTrigger render={<Button />}>Edit profile</SheetTrigger>
  <SheetPopup>
    <SheetHeader>
      <SheetTitle>Edit profile</SheetTitle>
      <SheetDescription>Update your account details.</SheetDescription>
    </SheetHeader>
    <SheetPanel>...</SheetPanel>
    <SheetFooter><SheetClose render={<Button />}>Save</SheetClose></SheetFooter>
  </SheetPopup>
</Sheet>`,
        language: "tsx",
      },
    },
  },
}

export const Sides: Story = {
  render: () => (
    <div className="flex flex-wrap gap-xl">
      <EditProfileSheet side="right" />
      <EditProfileSheet side="left" />
      <EditProfileSheet side="top" />
      <EditProfileSheet side="bottom" />
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `<SheetPopup side="right">...</SheetPopup>
<SheetPopup side="left">...</SheetPopup>
<SheetPopup side="top">...</SheetPopup>
<SheetPopup side="bottom">...</SheetPopup>`,
        language: "tsx",
      },
    },
  },
}

export const Inset: Story = {
  render: () => (
    <div className="flex flex-wrap gap-xl">
      <InsetSheet side="right" />
      <InsetSheet side="bottom" />
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `<SheetPopup side="right" variant="inset">
  ...
</SheetPopup>`,
        language: "tsx",
      },
    },
  },
}

export const BareFooter: Story = {
  render: () => <BareFooterSheet />,
  parameters: {
    docs: {
      source: {
        code: `<SheetPopup>
  ...
  <SheetFooter variant="bare">
    <SheetClose render={<Button variant="ghost" />}>Cancel</SheetClose>
    <Button type="submit">Save</Button>
  </SheetFooter>
</SheetPopup>`,
        language: "tsx",
      },
    },
  },
}

export const Scrollable: Story = {
  render: () => <ScrollSheet />,
  parameters: {
    docs: {
      source: {
        code: `<SheetPopup showCloseButton={false}>
  <SheetHeader>...</SheetHeader>
  <SheetPanel>Long content scrolls inside the sheet.</SheetPanel>
  <SheetFooter>...</SheetFooter>
</SheetPopup>`,
        language: "tsx",
      },
    },
  },
}
