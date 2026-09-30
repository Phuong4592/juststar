import type { Meta, StoryObj } from "@storybook/react-vite"
import { Icon } from "@iconify/react"
import { useState } from "react"

import {
  Button,
  Dialog,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPanel,
  DialogPopup,
  DialogTitle,
  DialogTrigger,
  Field,
  FieldLabel,
  Input,
  Popover,
  PopoverClose,
  PopoverPopup,
  PopoverTrigger,
  Typography,
} from "@enosta/en-ui"

function OverviewPage() {
  return (
    <div className="space-y-6xl">
      <section>
        <Typography.H5 as="h2" className="mb-xl text-neutral-900">
          Anatomy
        </Typography.H5>
        <EditProfileDialog />
      </section>

      <section>
        <Typography.H5 as="h2" className="mb-xl text-neutral-900">
          Footer variants
        </Typography.H5>
        <div className="flex flex-wrap gap-xl">
          <EditProfileDialog />
          <BareFooterDialog />
        </div>
      </section>

      <section>
        <Typography.H5 as="h2" className="mb-xl text-neutral-900">
          Title icons
        </Typography.H5>
        <div className="flex flex-wrap gap-xl">
          <InviteDialog />
          <DeleteProjectDialog />
        </div>
      </section>

      <section>
        <Typography.H5 as="h2" className="mb-xl text-neutral-900">
          Scrolling
        </Typography.H5>
        <ScrollDialog />
      </section>

      <section>
        <Typography.H5 as="h2" className="mb-xl text-neutral-900">
          States
        </Typography.H5>
        <div className="space-y-5xl">
          <div>
            <Typography.Small as="h3" className="mb-md font-semibold text-neutral-600">
              Opened from a menu
            </Typography.Small>
            <MenuDialog />
          </div>
          <div>
            <Typography.Small as="h3" className="mb-md font-semibold text-neutral-600">
              Nested dialogs
            </Typography.Small>
            <NestedDialogs />
          </div>
          <div>
            <Typography.Small as="h3" className="mb-md font-semibold text-neutral-600">
              Close confirmation
            </Typography.Small>
            <CloseConfirmationDialog />
          </div>
        </div>
      </section>
    </div>
  )
}

function EditProfileDialog() {
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="secondary" />}>Open dialog</DialogTrigger>
      <DialogPopup className="sm:max-w-[24rem]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <form className="contents">
          <DialogPanel className="grid gap-3xl">
            <Field>
              <FieldLabel>Name</FieldLabel>
              <Input defaultValue="Margaret Welsh" type="text" />
            </Field>
            <Field>
              <FieldLabel>Username</FieldLabel>
              <Input defaultValue="@maggie.welsh" type="text" />
            </Field>
          </DialogPanel>
          <DialogFooter>
            <DialogClose render={<Button variant="ghost" />}>Cancel</DialogClose>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </form>
      </DialogPopup>
    </Dialog>
  )
}

function MenuDialog() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Popover>
        <PopoverTrigger render={<Button variant="secondary" />}>Open menu</PopoverTrigger>
        <PopoverPopup className="w-[10rem]">
          <PopoverClose
            className="flex w-full cursor-pointer items-center rounded-control px-md py-sm text-neutral-900 hover:bg-neutral-50"
            onClick={() => setOpen(true)}
          >
            Open dialog
          </PopoverClose>
        </PopoverPopup>
      </Popover>

      <Dialog onOpenChange={setOpen} open={open}>
        <DialogPopup>
          <DialogHeader>
            <DialogTitle>Settings</DialogTitle>
            <DialogDescription>Change your preferences</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose render={<Button variant="ghost" />}>Close</DialogClose>
          </DialogFooter>
        </DialogPopup>
      </Dialog>
    </>
  )
}

function BareFooterDialog() {
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="secondary" />}>Bare footer</DialogTrigger>
      <DialogPopup className="sm:max-w-[24rem]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <form className="contents">
          <DialogPanel className="grid gap-3xl">
            <Field>
              <FieldLabel>Name</FieldLabel>
              <Input defaultValue="Margaret Welsh" type="text" />
            </Field>
            <Field>
              <FieldLabel>Username</FieldLabel>
              <Input defaultValue="@maggie.welsh" type="text" />
            </Field>
          </DialogPanel>
          <DialogFooter variant="bare">
            <DialogClose render={<Button variant="ghost" />}>Cancel</DialogClose>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </form>
      </DialogPopup>
    </Dialog>
  )
}

function InviteDialog() {
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="secondary" />}>Invite teammates</DialogTrigger>
      <DialogPopup className="sm:max-w-[24rem]">
        <DialogHeader>
          <div className="flex items-center gap-md">
            <Icon
              aria-hidden="true"
              className="size-5xl text-neutral-900"
              icon="lucide:user-plus"
            />
            <DialogTitle>Invite teammates</DialogTitle>
          </div>
          <DialogDescription>
            Send an invitation email to add new members to your workspace.
          </DialogDescription>
        </DialogHeader>
        <form className="contents">
          <DialogPanel className="grid gap-3xl">
            <Field>
              <FieldLabel>Email address</FieldLabel>
              <Input placeholder="name@company.com" type="email" />
            </Field>
          </DialogPanel>
          <DialogFooter>
            <DialogClose render={<Button variant="ghost" />}>Cancel</DialogClose>
            <Button type="submit">Send invite</Button>
          </DialogFooter>
        </form>
      </DialogPopup>
    </Dialog>
  )
}

function DeleteProjectDialog() {
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="secondary" />}>Delete project</DialogTrigger>
      <DialogPopup className="sm:max-w-[24rem]">
        <DialogHeader className="gap-lg">
          <div className="flex size-6xl items-center justify-center rounded-surface bg-error-50 text-error-600">
            <Icon aria-hidden="true" className="size-4xl" icon="lucide:trash-2" />
          </div>
          <div className="grid gap-sm">
            <DialogTitle>Delete project?</DialogTitle>
            <DialogDescription>
              This permanently removes the project and all of its data. This action cannot be
              undone.
            </DialogDescription>
          </div>
        </DialogHeader>
        <DialogFooter>
          <DialogClose render={<Button variant="ghost" />}>Cancel</DialogClose>
          <Button variant="danger">Delete project</Button>
        </DialogFooter>
      </DialogPopup>
    </Dialog>
  )
}

function ScrollDialog() {
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="secondary" />}>Terms & Conditions</DialogTrigger>
      <DialogPopup className="sm:max-w-[28rem]" showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Terms & Conditions</DialogTitle>
        </DialogHeader>
        <DialogPanel>
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
        </DialogPanel>
        <DialogFooter>
          <DialogClose render={<Button variant="ghost" />}>Cancel</DialogClose>
          <Button type="button">I agree</Button>
        </DialogFooter>
      </DialogPopup>
    </Dialog>
  )
}

function NestedDialogs() {
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="secondary" />}>Open parent</DialogTrigger>
      <DialogPopup showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Manage team member</DialogTitle>
          <DialogDescription>View and manage a user in your team.</DialogDescription>
        </DialogHeader>
        <DialogPanel className="grid gap-3xl">
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
        </DialogPanel>
        <DialogFooter>
          <Dialog>
            <DialogTrigger render={<Button variant="secondary" />}>Edit details</DialogTrigger>
            <DialogPopup showCloseButton={false}>
              <DialogHeader>
                <DialogTitle>Edit details</DialogTitle>
                <DialogDescription>
                  Make changes to the member&apos;s information.
                </DialogDescription>
              </DialogHeader>
              <DialogPanel className="grid gap-3xl">
                <Field>
                  <FieldLabel>Name</FieldLabel>
                  <Input defaultValue="Bora Baloglu" type="text" />
                </Field>
                <Field>
                  <FieldLabel>Email</FieldLabel>
                  <Input defaultValue="bora@example.com" type="text" />
                </Field>
              </DialogPanel>
              <DialogFooter>
                <DialogClose render={<Button variant="ghost" />}>Cancel</DialogClose>
                <Button type="submit">Save changes</Button>
              </DialogFooter>
            </DialogPopup>
          </Dialog>
        </DialogFooter>
      </DialogPopup>
    </Dialog>
  )
}

function CloseConfirmationDialog() {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [value, setValue] = useState("")

  return (
    <Dialog
      onOpenChange={(open) => {
        if (!open && value) {
          setConfirmOpen(true)
        } else {
          setDialogOpen(open)
        }
      }}
      open={dialogOpen}
    >
      <DialogTrigger render={<Button variant="secondary" />}>Compose</DialogTrigger>
      <DialogPopup showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>New message</DialogTitle>
          <DialogDescription>Type something and try closing.</DialogDescription>
        </DialogHeader>
        <form
          className="contents"
          onSubmit={(event) => {
            event.preventDefault()
            setDialogOpen(false)
          }}
        >
          <DialogPanel>
            <Field>
              <Input
                onChange={(event) => setValue(event.target.value)}
                placeholder="Type your message..."
                value={value}
              />
            </Field>
          </DialogPanel>
          <DialogFooter>
            <DialogClose render={<Button variant="ghost" />}>Cancel</DialogClose>
            <Button
              onClick={() => {
                setValue("")
                setDialogOpen(false)
              }}
            >
              Send
            </Button>
          </DialogFooter>
        </form>
      </DialogPopup>

      <Dialog onOpenChange={setConfirmOpen} open={confirmOpen}>
        <DialogPopup showCloseButton={false}>
          <DialogHeader>
            <DialogTitle>Discard changes?</DialogTitle>
            <DialogDescription>Your message will be lost.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose render={<Button variant="ghost" />}>Go back</DialogClose>
            <Button
              onClick={() => {
                setConfirmOpen(false)
                setValue("")
                setDialogOpen(false)
              }}
            >
              Discard
            </Button>
          </DialogFooter>
        </DialogPopup>
      </Dialog>
    </Dialog>
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
  title: "Overlays/Dialog",
  component: Dialog,
} satisfies Meta<typeof Dialog>

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
  render: () => <EditProfileDialog />,
  parameters: {
    docs: {
      source: {
        code: `<Dialog>
  <DialogTrigger render={<Button />}>Edit profile</DialogTrigger>
  <DialogPopup>
    <DialogHeader>
      <DialogTitle>Edit profile</DialogTitle>
      <DialogDescription>Update your account details.</DialogDescription>
    </DialogHeader>
    <DialogPanel>...</DialogPanel>
    <DialogFooter><DialogClose render={<Button />}>Save</DialogClose></DialogFooter>
  </DialogPopup>
</Dialog>`,
        language: "tsx",
      },
    },
  },
}

export const TitleWithIcon: Story = {
  render: () => <InviteDialog />,
  parameters: {
    docs: {
      source: {
        code: `<Dialog>
  <DialogTrigger render={<Button />}>Invite teammates</DialogTrigger>
  <DialogPopup>
    <DialogHeader>
      <div className="flex items-center gap-md">
        <Icon aria-hidden="true" className="size-5xl text-neutral-900" icon="lucide:user-plus" />
        <DialogTitle>Invite teammates</DialogTitle>
      </div>
      <DialogDescription>Send an invitation email.</DialogDescription>
    </DialogHeader>
    <DialogPanel>...</DialogPanel>
    <DialogFooter>...</DialogFooter>
  </DialogPopup>
</Dialog>`,
        language: "tsx",
      },
    },
  },
}

export const TitleWithIconTile: Story = {
  render: () => <DeleteProjectDialog />,
  parameters: {
    docs: {
      source: {
        code: `<Dialog>
  <DialogTrigger render={<Button />}>Delete project</DialogTrigger>
  <DialogPopup>
    <DialogHeader className="gap-lg">
      <div className="flex size-6xl items-center justify-center rounded-surface bg-error-50 text-error-600">
        <Icon aria-hidden="true" className="size-4xl" icon="lucide:trash-2" />
      </div>
      <div className="grid gap-sm">
        <DialogTitle>Delete project?</DialogTitle>
        <DialogDescription>This action cannot be undone.</DialogDescription>
      </div>
    </DialogHeader>
    <DialogFooter>
      <DialogClose render={<Button variant="ghost" />}>Cancel</DialogClose>
      <Button variant="danger">Delete project</Button>
    </DialogFooter>
  </DialogPopup>
</Dialog>`,
        language: "tsx",
      },
    },
  },
}

export const Scrollable: Story = {
  render: () => <ScrollDialog />,
  parameters: {
    docs: {
      source: {
        code: `<Dialog>
  <DialogTrigger render={<Button />}>Open</DialogTrigger>
  <DialogPopup>
    <DialogHeader>...</DialogHeader>
    <DialogPanel className="overflow-y-auto">...</DialogPanel>
  </DialogPopup>
</Dialog>`,
        language: "tsx",
      },
    },
  },
}
