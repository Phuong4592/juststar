import type { Meta, StoryObj } from "@storybook/react-vite"

import {
  Badge,
  SidebarNavigation,
  SidebarNavigationGroup,
  SidebarNavigationGroupLabel,
  SidebarNavigationItem,
  SidebarNavigationList,
} from "@enosta/en-ui"

const meta = {
  title: "Navigation/Sidebar navigation",
  component: SidebarNavigation,
  args: { children: null, label: "Primary" },
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof SidebarNavigation>

export default meta
type Story = StoryObj<typeof meta>

function Specimen({ collapsed = false, states = false, twoLevel = false }) {
  return (
    <div className={collapsed ? "h-svh w-[4.5rem]" : "h-svh w-[16rem]"}>
      <SidebarNavigation collapsed={collapsed} header={<strong>EN</strong>} label="Primary">
        <SidebarNavigationGroup>
          <SidebarNavigationGroupLabel>Workspace</SidebarNavigationGroupLabel>
          <SidebarNavigationList>
            <SidebarNavigationItem active href="#projects" icon="P" label="Projects">
              {twoLevel ? (
                <SidebarNavigationList aria-label="Projects" level="secondary">
                  <SidebarNavigationItem href="#project-overview" label="Overview" />
                  <SidebarNavigationItem href="#project-members" label="Members" />
                  <SidebarNavigationItem href="#project-api" label="API keys" />
                </SidebarNavigationList>
              ) : null}
            </SidebarNavigationItem>
            <SidebarNavigationItem
              badge={<Badge variant="secondary">12</Badge>}
              href="#tasks"
              icon="T"
              label="Tasks"
            />
            <SidebarNavigationItem
              badge={states ? <Badge variant="secondary">Soon</Badge> : undefined}
              disabled={states}
              disabledReason={states ? "Coming soon" : undefined}
              href="#reports"
              icon="R"
              label="Reports"
            />
            {states ? (
              <SidebarNavigationItem
                badge={<Badge variant="secondary">No access</Badge>}
                disabled
                disabledReason="Requires workspace administrator permission"
                href="#billing"
                icon="B"
                label="Billing"
              />
            ) : null}
          </SidebarNavigationList>
        </SidebarNavigationGroup>
      </SidebarNavigation>
    </div>
  )
}

export const Default: Story = { render: () => <Specimen /> }
export const Collapsed: Story = { render: () => <Specimen collapsed twoLevel /> }
export const States: Story = { render: () => <Specimen states /> }
export const TwoLevel: Story = { render: () => <Specimen twoLevel /> }
