import type { Meta, StoryObj } from "@storybook/react-vite"

import { Badge, Button, Card, CardPanel, PageContainer, PageSection } from "@enosta/en-ui"

const meta = {
  title: "Layout/Page section",
  component: PageSection,
  args: { children: "Section content", title: "Members" },
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof PageSection>

export default meta
type Story = StoryObj<typeof meta>

function StoryFrame({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-svh bg-canvas py-2xl">
      <PageContainer>{children}</PageContainer>
    </main>
  )
}

function MemberRows() {
  return (
    <Card>
      <CardPanel className="grid gap-md">
        <div className="flex items-center justify-between gap-lg">
          <span>Mai Nguyen</span>
          <Badge variant="success">Active</Badge>
        </div>
        <div className="flex items-center justify-between gap-lg">
          <span>Tom Richards</span>
          <Badge variant="secondary">Invited</Badge>
        </div>
      </CardPanel>
    </Card>
  )
}

export const Default: Story = {
  render: () => (
    <StoryFrame>
      <PageSection
        actions={<Button>Invite member</Button>}
        description="People who can access this workspace."
        title="Members"
      >
        <MemberRows />
      </PageSection>
    </StoryFrame>
  ),
}

export const Surface: Story = {
  render: () => (
    <StoryFrame>
      <PageSection
        actions={<Button variant="secondary">Manage roles</Button>}
        description="Default access assigned to new members."
        title="Workspace access"
        variant="surface"
      >
        <p className="m-0 text-neutral-700">
          Members can view projects and contribute to assigned delivery work.
        </p>
      </PageSection>
    </StoryFrame>
  ),
}

export const CompactSurface: Story = {
  render: () => (
    <StoryFrame>
      <PageSection
        actions={<Button variant="secondary">Manage roles</Button>}
        density="compact"
        description="A compact surface keeps operational content close without shrinking controls or text."
        title="Workspace access"
        variant="surface"
      >
        <p className="m-0 text-neutral-700">
          Members can view projects and contribute to assigned delivery work.
        </p>
      </PageSection>
    </StoryFrame>
  ),
}

export const LongContent: Story = {
  render: () => (
    <StoryFrame>
      <PageSection
        actions={
          <>
            <Button variant="secondary">Download access report</Button>
            <Button>Review pending invitations</Button>
          </>
        }
        description="This longer description verifies that section copy remains readable while multiple actions wrap without squeezing the heading or creating horizontal overflow."
        title="Workspace members, external collaborators, and pending access requests"
      >
        <MemberRows />
      </PageSection>
    </StoryFrame>
  ),
}
