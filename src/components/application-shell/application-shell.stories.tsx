import type { Meta, StoryObj } from "@storybook/react-vite"

import {
  ApplicationHeader,
  ApplicationShell,
  Avatar,
  Badge,
  Button,
  Input,
  PageContainer,
  PageHeader,
  PageSection,
  SidebarNavigation,
  SidebarNavigationGroup,
  SidebarNavigationGroupLabel,
  SidebarNavigationItem,
  SidebarNavigationList,
} from "@enosta/en-ui"

const meta = {
  title: "Layout/Application shell",
  component: ApplicationShell,
  args: { children: null, header: null, navigation: null },
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof ApplicationShell>

export default meta
type Story = StoryObj<typeof meta>

function Navigation() {
  return (
    <SidebarNavigation header={<strong>Enosta</strong>} label="Primary">
      <SidebarNavigationGroup>
        <SidebarNavigationGroupLabel>Workspace</SidebarNavigationGroupLabel>
        <SidebarNavigationList>
          <SidebarNavigationItem active href="#overview" icon="O" label="Overview" />
          <SidebarNavigationItem href="#projects" icon="P" label="Projects" />
          <SidebarNavigationItem
            badge={<Badge variant="secondary">8</Badge>}
            href="#tasks"
            icon="T"
            label="Tasks"
          />
        </SidebarNavigationList>
      </SidebarNavigationGroup>
    </SidebarNavigation>
  )
}

function ShellSpecimen({ collapsed = false }: { collapsed?: boolean }) {
  return (
    <ApplicationShell
      defaultSidebarCollapsed={collapsed}
      header={
        <ApplicationHeader
          actions={<Avatar fallback={{ children: "MN" }} />}
          brand="Enosta"
          context="Delivery workspace"
          search={<Input aria-label="Search workspace" placeholder="Search workspace" />}
        />
      }
      navigation={<Navigation />}
    >
      <PageContainer className="grid gap-2xl py-2xl" size="wide">
        <PageHeader
          actions={<Button>New project</Button>}
          description="Operational delivery health across active customer work."
          title="Workspace overview"
        />
        <PageSection title="Active work" variant="surface">
          <div className="min-h-[20rem]">Project and delivery content</div>
        </PageSection>
      </PageContainer>
    </ApplicationShell>
  )
}

export const Default: Story = { render: () => <ShellSpecimen /> }
export const Collapsed: Story = { render: () => <ShellSpecimen collapsed /> }
export const MobileNavigation: Story = {
  render: () => <ShellSpecimen />,
  parameters: { viewport: { defaultViewport: "mobile1" } },
}
