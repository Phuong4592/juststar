import type { Meta, StoryObj } from "@storybook/react-vite"
import { Icon } from "@iconify/react"

import {
  Badge,
  Button,
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardFrame as CardFrameComponent,
  CardFrameAction,
  CardFrameDescription,
  CardFrameFooter,
  CardFrameHeader,
  CardFrameTitle,
  CardHeader,
  CardPanel,
  CardTitle,
  Typography,
} from "@enosta/en-ui"

function OverviewPage() {
  return (
    <div className="space-y-6xl">
      <section>
        <Typography.H5 as="h2" className="mb-xl text-neutral-900">
          Structure
        </Typography.H5>
        <div className="grid items-start gap-4xl lg:grid-cols-3">
          <div>
            <Typography.Small as="h3" className="mb-md font-semibold text-neutral-600 capitalize">
              Header
            </Typography.Small>
            <Card>
              <CardHeader>
                <CardTitle>Project revenue</CardTitle>
                <CardDescription>Monthly recurring revenue overview</CardDescription>
              </CardHeader>
            </Card>
          </div>
          <div>
            <Typography.Small as="h3" className="mb-md font-semibold text-neutral-600 capitalize">
              Header + panel
            </Typography.Small>
            <Card>
              <CardHeader>
                <CardTitle>Project revenue</CardTitle>
                <CardDescription>Monthly recurring revenue overview</CardDescription>
              </CardHeader>
              <CardPanel>
                <Typography.Text className="text-neutral-600">
                  Growth was driven by three new enterprise accounts.
                </Typography.Text>
              </CardPanel>
            </Card>
          </div>
          <div>
            <Typography.Small as="h3" className="mb-md font-semibold text-neutral-600 capitalize">
              Full card
            </Typography.Small>
            <Card>
              <CardHeader>
                <CardTitle>Project revenue</CardTitle>
                <CardDescription>Monthly recurring revenue overview</CardDescription>
              </CardHeader>
              <CardPanel>
                <Typography.Text className="text-neutral-600">
                  Growth was driven by three new enterprise accounts.
                </Typography.Text>
              </CardPanel>
              <CardFooter className="gap-md">
                <Button size="sm">View report</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      <section>
        <Typography.H5 as="h2" className="mb-xl text-neutral-900">
          With action
        </Typography.H5>
        <div className="grid items-start gap-4xl lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Project revenue</CardTitle>
              <CardDescription>Monthly recurring revenue overview</CardDescription>
              <CardAction>
                <Badge variant="success">+12.5%</Badge>
              </CardAction>
            </CardHeader>
            <CardPanel>
              <Typography.Text className="text-neutral-600">
                Growth was driven by three new enterprise accounts.
              </Typography.Text>
            </CardPanel>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Team members</CardTitle>
              <CardDescription>Manage who can access this workspace</CardDescription>
              <CardAction>
                <Button
                  icon={<Icon icon="solar:add-circle-linear" className="size-3xl" />}
                  size="sm"
                  variant="secondary"
                >
                  Invite
                </Button>
              </CardAction>
            </CardHeader>
            <CardPanel>
              <Typography.Text className="text-neutral-600">
                Eight members currently have access.
              </Typography.Text>
            </CardPanel>
          </Card>
        </div>
      </section>

      <section>
        <Typography.H5 as="h2" className="mb-xl text-neutral-900">
          Footer composition
        </Typography.H5>
        <div className="grid items-start gap-4xl lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Deploy preview</CardTitle>
              <CardDescription>Ready to promote to production</CardDescription>
            </CardHeader>
            <CardPanel>
              <Typography.Text className="text-neutral-600">
                Build 1f8a4c2 passed all checks and is ready to promote.
              </Typography.Text>
            </CardPanel>
            <CardFooter className="justify-end gap-md">
              <Button size="sm" variant="secondary">
                Cancel
              </Button>
              <Button size="sm">Deploy</Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>API keys</CardTitle>
              <CardDescription>Keys with access to this project</CardDescription>
            </CardHeader>
            <CardPanel>
              <Typography.Text className="text-neutral-600">
                Two active keys. Last used 3 days ago.
              </Typography.Text>
            </CardPanel>
            <CardFooter className="justify-between gap-md">
              <Typography.Small className="text-neutral-500">sk_live_…9f2c</Typography.Small>
              <Button
                icon={<Icon icon="solar:trash-bin-trash-bold" className="size-3xl" />}
                size="sm"
                variant="danger"
              >
                Revoke
              </Button>
            </CardFooter>
          </Card>
        </div>
      </section>

      <section>
        <Typography.H5 as="h2" className="mb-xl text-neutral-900">
          Card frame
        </Typography.H5>
        <div className="grid items-start gap-4xl lg:grid-cols-2">
          <CardFrameComponent>
            <CardFrameHeader>
              <CardFrameTitle>Project settings</CardFrameTitle>
              <CardFrameDescription>Manage configuration and access</CardFrameDescription>
              <CardFrameAction>
                <Button
                  icon={<Icon icon="solar:add-circle-linear" className="size-3xl" />}
                  size="sm"
                  variant="secondary"
                >
                  Add
                </Button>
              </CardFrameAction>
            </CardFrameHeader>
            <Card>
              <CardPanel>
                <div className="flex items-center justify-between gap-lg">
                  <Typography.Label>Production</Typography.Label>
                  <Badge variant="success">Connected</Badge>
                </div>
              </CardPanel>
            </Card>
            <CardFrameFooter>
              <Button size="sm" variant="secondary">
                Manage project
              </Button>
            </CardFrameFooter>
          </CardFrameComponent>
          <CardFrameComponent>
            <CardFrameHeader>
              <CardFrameTitle>Environments</CardFrameTitle>
              <CardFrameDescription>Deployment targets for this project</CardFrameDescription>
            </CardFrameHeader>
            <Card>
              <CardPanel>
                <div className="flex items-center justify-between gap-lg">
                  <Typography.Label>Production</Typography.Label>
                  <Badge variant="success">Connected</Badge>
                </div>
              </CardPanel>
            </Card>
            <Card>
              <CardPanel>
                <div className="flex items-center justify-between gap-lg">
                  <Typography.Label>Staging</Typography.Label>
                  <Badge variant="warning">Degraded</Badge>
                </div>
              </CardPanel>
            </Card>
          </CardFrameComponent>
        </div>
      </section>

      <section>
        <Typography.H5 as="h2" className="mb-xl text-neutral-900">
          Custom element
        </Typography.H5>
        <div className="grid items-start gap-4xl lg:grid-cols-2">
          <Card render={<section aria-label="Deployment status" />}>
            <CardHeader>
              <CardTitle render={<h3 />}>Deployment status</CardTitle>
              <CardDescription>Last deploy finished 4 minutes ago</CardDescription>
            </CardHeader>
            <CardPanel>
              <Typography.Text className="text-neutral-600">
                The rendered element receives the card classes and data-slot marker.
              </Typography.Text>
            </CardPanel>
          </Card>
          <CardFrameComponent render={<article aria-label="Billing" />}>
            <CardFrameHeader>
              <CardFrameTitle render={<h3 />}>Billing</CardFrameTitle>
              <CardFrameDescription>Usage for the current period</CardFrameDescription>
            </CardFrameHeader>
            <Card>
              <CardHeader>
                <CardTitle>Seats</CardTitle>
              </CardHeader>
              <CardPanel>
                <div className="flex items-center justify-between gap-lg">
                  <Typography.Text className="text-neutral-600">Current usage</Typography.Text>
                  <Typography.Small className="text-neutral-900">12 of 25</Typography.Small>
                </div>
              </CardPanel>
            </Card>
          </CardFrameComponent>
        </div>
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
  title: "Data Display/Card",
  component: Card,
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  args: { children: "All systems operational." },
  render: () => (
    <Card>
      <CardHeader>
        <CardTitle>Project status</CardTitle>
        <CardDescription>Updated a few seconds ago.</CardDescription>
      </CardHeader>
      <CardPanel>All systems operational.</CardPanel>
      <CardFooter>Last checked today</CardFooter>
    </Card>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Card>
  <CardHeader>
    <CardTitle>Project status</CardTitle>
    <CardDescription>Updated a few seconds ago.</CardDescription>
  </CardHeader>
  <CardPanel>All systems operational.</CardPanel>
  <CardFooter>Last checked today</CardFooter>
</Card>`,
        language: "tsx",
      },
    },
  },
}

export const WithActions: Story = {
  render: () => (
    <Card>
      <CardHeader>
        <CardTitle>Invite members</CardTitle>
        <CardDescription>Manage who can access this workspace.</CardDescription>
        <CardAction>
          <Button size="sm">Invite</Button>
        </CardAction>
      </CardHeader>
      <CardPanel>Eight members currently have access.</CardPanel>
    </Card>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Card>
  <CardHeader>
    <CardTitle>Invite members</CardTitle>
    <CardDescription>Manage who can access this workspace.</CardDescription>
    <CardAction>
      <Button size="sm">Invite</Button>
    </CardAction>
  </CardHeader>
  <CardPanel>Eight members currently have access.</CardPanel>
</Card>`,
        language: "tsx",
      },
    },
  },
}

export const WithFooter: Story = {
  render: () => (
    <Card>
      <CardHeader>
        <CardTitle>Deploy preview</CardTitle>
        <CardDescription>Build 1f8a4c2 passed all checks.</CardDescription>
      </CardHeader>
      <CardPanel>
        <Typography.Text className="text-neutral-600">
          The deployment is ready to be promoted to production.
        </Typography.Text>
      </CardPanel>
      <CardFooter className="justify-end gap-md">
        <Button size="sm" variant="secondary">
          Cancel
        </Button>
        <Button size="sm">Deploy</Button>
      </CardFooter>
    </Card>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Card>
  <CardHeader>
    <CardTitle>Deploy preview</CardTitle>
    <CardDescription>Build 1f8a4c2 passed all checks.</CardDescription>
  </CardHeader>
  <CardPanel>
    The deployment is ready to be promoted to production.
  </CardPanel>
  <CardFooter className="justify-end gap-md">
    <Button size="sm" variant="secondary">Cancel</Button>
    <Button size="sm">Deploy</Button>
  </CardFooter>
</Card>`,
        language: "tsx",
      },
    },
  },
}

export const CardFrame: Story = {
  name: "CardFrame",
  render: () => (
    <CardFrameComponent>
      <CardFrameHeader>
        <CardFrameTitle>Project</CardFrameTitle>
        <CardFrameDescription>Manage project settings and configuration.</CardFrameDescription>
        <CardFrameAction>
          <Button
            icon={<Icon icon="solar:add-circle-linear" className="size-3xl" />}
            size="sm"
            variant="secondary"
          >
            Add
          </Button>
        </CardFrameAction>
      </CardFrameHeader>
      <Card>
        <CardPanel>Project content</CardPanel>
      </Card>
      <CardFrameFooter>Updated today</CardFrameFooter>
    </CardFrameComponent>
  ),
  parameters: {
    docs: {
      source: {
        code: `<CardFrame>
  <CardFrameHeader>
    <CardFrameTitle>Project</CardFrameTitle>
    <CardFrameDescription>Manage project settings and configuration.</CardFrameDescription>
    <CardFrameAction>
      <Button variant="secondary">Add</Button>
    </CardFrameAction>
  </CardFrameHeader>
  <Card>
    <CardPanel>Project content</CardPanel>
  </Card>
  <CardFrameFooter>Updated today</CardFrameFooter>
</CardFrame>`,
        language: "tsx",
      },
    },
  },
}

export const WithRender: Story = {
  render: () => (
    <Card render={<section aria-label="Deployment status" />}>
      <CardHeader>
        <CardTitle render={<h3 />}>Deployment status</CardTitle>
        <CardDescription>Last deploy finished 4 minutes ago</CardDescription>
      </CardHeader>
      <CardPanel>All systems operational.</CardPanel>
    </Card>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Card render={<section aria-label="Deployment status" />}>
  <CardHeader>
    <CardTitle render={<h3 />}>Deployment status</CardTitle>
    <CardDescription>Last deploy finished 4 minutes ago</CardDescription>
  </CardHeader>
  <CardPanel>All systems operational.</CardPanel>
</Card>`,
        language: "tsx",
      },
    },
  },
}
