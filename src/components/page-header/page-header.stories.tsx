import type { Meta, StoryObj } from "@storybook/react-vite"

import { Badge, Button, PageContainer, PageHeader } from "@enosta/en-ui"

const meta = {
  title: "Layout/Page header",
  component: PageHeader,
  args: { title: "Website redesign" },
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof PageHeader>

export default meta
type Story = StoryObj<typeof meta>

function StoryFrame({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-svh bg-canvas py-2xl">
      <PageContainer size="wide">{children}</PageContainer>
    </main>
  )
}

export const Default: Story = {
  render: () => (
    <StoryFrame>
      <PageHeader
        actions={
          <>
            <Button variant="secondary">Export</Button>
            <Button>New task</Button>
          </>
        }
        description="Delivery status, ownership, and project activity for the client website redesign."
        eyebrow="Active project"
        metadata={
          <>
            <Badge variant="success">On track</Badge>
            <span>Updated 20 minutes ago</span>
          </>
        }
        title="Website redesign"
      />
    </StoryFrame>
  ),
}

export const WithNavigation: Story = {
  render: () => (
    <StoryFrame>
      <PageHeader
        breadcrumbs={
          <nav aria-label="Breadcrumb">
            <a className="hover:underline" href="#projects">
              Projects
            </a>{" "}
            / Website redesign
          </nav>
        }
        description="Review the work, activity, and delivery health."
        tabs={
          <nav aria-label="Project views" className="flex gap-xl">
            <a className="border-b-2 border-brand-500 pb-sm" href="#overview">
              Overview
            </a>
            <a className="pb-sm text-neutral-600" href="#activity">
              Activity
            </a>
          </nav>
        }
        title="Website redesign"
      />
    </StoryFrame>
  ),
}

export const LongContent: Story = {
  render: () => (
    <StoryFrame>
      <PageHeader
        actions={
          <>
            <Button variant="secondary">Open delivery report</Button>
            <Button>Schedule stakeholder review</Button>
          </>
        }
        description="A deliberately long description confirms that operational context remains readable while the action group wraps below the introduction on constrained viewports."
        title="Customer onboarding and service-delivery transformation programme"
      />
    </StoryFrame>
  ),
}
