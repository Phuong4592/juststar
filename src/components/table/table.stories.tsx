import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"

import {
  Badge,
  CardFrame,
  CardFrameDescription,
  CardFrameHeader,
  CardFrameTitle,
  Checkbox,
  Frame,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
  Typography,
} from "@enosta/en-ui"

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const projects = [
  { project: "Website Redesign", status: "Paid", team: "Frontend Team", budget: "$12,500" },
  { project: "Mobile App", status: "Unpaid", team: "Mobile Team", budget: "$8,750" },
  { project: "API Integration", status: "Pending", team: "Backend Team", budget: "$5,200" },
  { project: "Database Migration", status: "Paid", team: "DevOps Team", budget: "$3,800" },
  { project: "User Dashboard", status: "Paid", team: "UX Team", budget: "$7,200" },
  { project: "Security Audit", status: "Failed", team: "Security Team", budget: "$2,100" },
] as const

const members = [
  { member: "Ada Lovelace", role: "Owner" },
  { member: "Grace Hopper", role: "Editor" },
  { member: "Katherine Johnson", role: "Reviewer" },
  { member: "Margaret Hamilton", role: "Maintainer" },
]

const invoices = [
  { id: "INV-1042", amount: "$1,200", status: "Paid" },
  { id: "INV-1043", amount: "$840", status: "Pending" },
  { id: "INV-1044", amount: "$2,480", status: "Overdue" },
] as const

const STATUS_VARIANT = {
  Paid: "success",
  Unpaid: "secondary",
  Pending: "warning",
  Failed: "error",
  Overdue: "error",
} as const

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function StatusBadge({ status }: { status: keyof typeof STATUS_VARIANT }) {
  return <Badge variant={STATUS_VARIANT[status]}>{status}</Badge>
}

function ProjectsTable({ variant = "default" }: { variant?: "default" | "card" }) {
  return (
    <Table variant={variant}>
      <TableCaption>A list of current projects</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Project</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Team</TableHead>
          <TableHead className="text-right">Budget</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="bg-surface">
        {projects.map((row) => (
          <TableRow key={row.project}>
            <TableCell className="font-semibold text-neutral-900">{row.project}</TableCell>
            <TableCell>
              <StatusBadge status={row.status} />
            </TableCell>
            <TableCell>{row.team}</TableCell>
            <TableCell className="text-right">{row.budget}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total Budget</TableCell>
          <TableCell className="text-right">$39,550</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}

function MembersTable({ selected }: { selected?: string }) {
  return (
    <Table>
      <TableCaption>Workspace members</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Member</TableHead>
          <TableHead>Role</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {members.map((row) => (
          <TableRow data-state={selected === row.member ? "selected" : undefined} key={row.member}>
            <TableCell>{row.member}</TableCell>
            <TableCell>{row.role}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

function InvoicesTable() {
  return (
    <Table variant="card">
      <TableHeader>
        <TableRow>
          <TableHead>Invoice</TableHead>
          <TableHead className="text-right">Amount</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="bg-surface">
        {invoices.map((invoice) => (
          <TableRow key={invoice.id}>
            <TableCell>{invoice.id}</TableCell>
            <TableCell className="text-right">{invoice.amount}</TableCell>
            <TableCell>
              <StatusBadge status={invoice.status} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

function RowStatesTable() {
  const [selected, setSelected] = useState<string | null>("Grace Hopper")

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Member</TableHead>
          <TableHead>Role</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {members.map((row) => (
          <TableRow
            className="cursor-pointer"
            data-state={selected === row.member ? "selected" : undefined}
            key={row.member}
            onClick={() => {
              setSelected((prev) => (prev === row.member ? null : row.member))
            }}
          >
            <TableCell>{row.member}</TableCell>
            <TableCell>{row.role}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

function SelectionTable() {
  const [selected, setSelected] = useState<Set<string>>(new Set(["Ada Lovelace"]))

  const allSelected = selected.size === members.length
  const someSelected = selected.size > 0 && !allSelected

  const toggleRow = (name: string) => {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(name)) {
        next.delete(name)
      } else {
        next.add(name)
      }
      return next
    })
  }

  const toggleAll = () => {
    setSelected((prev) =>
      prev.size === members.length ? new Set() : new Set(members.map((m) => m.member)),
    )
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>
            <Checkbox
              aria-label="Select all members"
              checked={allSelected}
              indeterminate={someSelected}
              onCheckedChange={toggleAll}
            />
          </TableHead>
          <TableHead>Member</TableHead>
          <TableHead>Role</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {members.map((row) => (
          <TableRow data-state={selected.has(row.member) ? "selected" : undefined} key={row.member}>
            <TableCell>
              <Checkbox
                aria-label={`Select ${row.member}`}
                checked={selected.has(row.member)}
                onCheckedChange={() => toggleRow(row.member)}
              />
            </TableCell>
            <TableCell>{row.member}</TableCell>
            <TableCell>{row.role}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

function CardFrameComposition() {
  return (
    <CardFrame>
      <CardFrameHeader>
        <CardFrameTitle>Billing history</CardFrameTitle>
        <CardFrameDescription>Recent invoices for this workspace</CardFrameDescription>
      </CardFrameHeader>
      <InvoicesTable />
    </CardFrame>
  )
}

function FrameComposition() {
  return (
    <Frame>
      <ProjectsTable variant="card" />
    </Frame>
  )
}

/* ------------------------------------------------------------------ */
/*  Overview page                                                      */
/* ------------------------------------------------------------------ */

function OverviewPage() {
  return (
    <div className="space-y-6xl">
      <section>
        <Typography.H5 as="h2" className="mb-xl text-neutral-900">
          Variants
        </Typography.H5>
        <div className="space-y-5xl">
          <div>
            <Typography.Small as="h3" className="mb-md font-semibold text-neutral-600">
              Default
            </Typography.Small>
            <ProjectsTable />
          </div>
          <div>
            <Typography.Small as="h3" className="mb-md font-semibold text-neutral-600">
              Card
            </Typography.Small>
            <ProjectsTable variant="card" />
          </div>
        </div>
      </section>

      <section>
        <Typography.H5 as="h2" className="mb-xl text-neutral-900">
          States
        </Typography.H5>
        <div className="space-y-5xl">
          <div>
            <Typography.Small as="h3" className="mb-md font-semibold text-neutral-600">
              Selected row
            </Typography.Small>
            <MembersTable selected="Grace Hopper" />
          </div>
          <div>
            <Typography.Small as="h3" className="mb-md font-semibold text-neutral-600">
              Interactive: click a row to toggle
            </Typography.Small>
            <RowStatesTable />
          </div>
        </div>
      </section>

      <section>
        <Typography.H5 as="h2" className="mb-xl text-neutral-900">
          Selection
        </Typography.H5>
        <Typography.Small as="h3" className="mb-md font-semibold text-neutral-600">
          Checkbox column with select-all and indeterminate state
        </Typography.Small>
        <SelectionTable />
      </section>

      <section>
        <Typography.H5 as="h2" className="mb-xl text-neutral-900">
          Composition
        </Typography.H5>
        <div className="space-y-5xl">
          <div>
            <Typography.Small as="h3" className="mb-md font-semibold text-neutral-600">
              In CardFrame
            </Typography.Small>
            <CardFrameComposition />
          </div>
          <div>
            <Typography.Small as="h3" className="mb-md font-semibold text-neutral-600">
              In Frame
            </Typography.Small>
            <FrameComposition />
          </div>
        </div>
      </section>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Meta & stories                                                     */
/* ------------------------------------------------------------------ */

const meta = {
  title: "Data Display/Table",
  component: Table,
} satisfies Meta<typeof Table>

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
  render: () => <ProjectsTable />,
  parameters: {
    docs: {
      source: {
        code: `const STATUS_VARIANT = { Paid: "success", Unpaid: "secondary", Pending: "warning", Failed: "error" } as const

<Table>
  <TableCaption>A list of current projects</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead>Project</TableHead>
      <TableHead>Status</TableHead>
      <TableHead>Team</TableHead>
      <TableHead className="text-right">Budget</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {projects.map((row) => (
      <TableRow key={row.project}>
        <TableCell className="font-semibold text-neutral-900">{row.project}</TableCell>
        <TableCell>
          <Badge variant={STATUS_VARIANT[row.status]}>{row.status}</Badge>
        </TableCell>
        <TableCell>{row.team}</TableCell>
        <TableCell className="text-right">{row.budget}</TableCell>
      </TableRow>
    ))}
  </TableBody>
  <TableFooter>
    <TableRow>
      <TableCell colSpan={3}>Total Budget</TableCell>
      <TableCell className="text-right">$39,550</TableCell>
    </TableRow>
  </TableFooter>
</Table>`,
        language: "tsx",
      },
    },
  },
}

export const Card: Story = {
  render: () => <ProjectsTable variant="card" />,
  parameters: {
    docs: {
      source: {
        code: `<Table variant="card">
  <TableHeader>
    <TableRow>
      <TableHead>Project</TableHead>
      <TableHead>Status</TableHead>
      <TableHead>Team</TableHead>
      <TableHead className="text-right">Budget</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>...</TableBody>
  <TableFooter>...</TableFooter>
</Table>`,
        language: "tsx",
      },
    },
  },
}

export const InCardFrame: Story = {
  render: () => <CardFrameComposition />,
  parameters: {
    docs: {
      source: {
        code: `<CardFrame>
  <CardFrameHeader>
    <CardFrameTitle>Billing history</CardFrameTitle>
    <CardFrameDescription>Recent invoices for this workspace</CardFrameDescription>
  </CardFrameHeader>
  <Table variant="card">
    <TableHeader>...</TableHeader>
    <TableBody>...</TableBody>
  </Table>
</CardFrame>`,
        language: "tsx",
      },
    },
  },
}

export const InFrame: Story = {
  render: () => <FrameComposition />,
  parameters: {
    docs: {
      source: {
        code: `<Frame>
  <Table variant="card">
    <TableHeader>...</TableHeader>
    <TableBody>...</TableBody>
    <TableFooter>...</TableFooter>
  </Table>
</Frame>`,
        language: "tsx",
      },
    },
  },
}

export const SelectedRow: Story = {
  render: () => <MembersTable selected="Grace Hopper" />,
  parameters: {
    docs: {
      source: {
        code: `<TableRow data-state="selected">
  <TableCell>Grace Hopper</TableCell>
  <TableCell>Editor</TableCell>
</TableRow>`,
        language: "tsx",
      },
    },
  },
}

export const RowStates: Story = {
  render: () => <RowStatesTable />,
  parameters: {
    docs: {
      source: {
        code: `<TableRow
  className="cursor-pointer"
  data-state={selected === row.member ? "selected" : undefined}
  onClick={() => setSelected((prev) => (prev === row.member ? null : row.member))}
>
  <TableCell>{row.member}</TableCell>
  <TableCell>{row.role}</TableCell>
</TableRow>`,
        language: "tsx",
      },
    },
  },
}

export const Selection: Story = {
  render: () => <SelectionTable />,
  parameters: {
    docs: {
      source: {
        code: `function SelectionTable() {
  const [selected, setSelected] = useState<Set<string>>(new Set(["Ada Lovelace"]))
  const allSelected = selected.size === members.length
  const someSelected = selected.size > 0 && !allSelected
  // ...toggleRow, toggleAll
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>
            <Checkbox aria-label="Select all members" checked={allSelected} indeterminate={someSelected} onCheckedChange={toggleAll} />
          </TableHead>
          <TableHead>Member</TableHead>
          <TableHead>Role</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {members.map((row) => (
          <TableRow data-state={selected.has(row.member) ? "selected" : undefined} key={row.member}>
            <TableCell>
              <Checkbox aria-label={\`Select \${row.member}\`} checked={selected.has(row.member)} onCheckedChange={() => toggleRow(row.member)} />
            </TableCell>
            <TableCell>{row.member}</TableCell>
            <TableCell>{row.role}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}`,
        language: "tsx",
      },
    },
  },
}
