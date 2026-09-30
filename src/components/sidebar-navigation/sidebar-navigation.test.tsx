// Contract coverage: navigation-landmark, active-page, disabled-item, disabled-reason, nested-navigation, collapsed-labels
import { render, screen, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import {
  SidebarNavigation,
  SidebarNavigationGroup,
  SidebarNavigationGroupLabel,
  SidebarNavigationItem,
  SidebarNavigationList,
} from "./sidebar-navigation"

function Navigation({ collapsed = false }: { collapsed?: boolean }) {
  return (
    <SidebarNavigation collapsed={collapsed} label="Primary">
      <SidebarNavigationGroup>
        <SidebarNavigationGroupLabel>Workspace</SidebarNavigationGroupLabel>
        <SidebarNavigationList>
          <SidebarNavigationItem active href="#projects" label="Projects">
            <SidebarNavigationList aria-label="Projects" level="secondary">
              <SidebarNavigationItem href="#project-settings" label="Settings" />
              <SidebarNavigationItem href="#project-api" label="API keys" />
            </SidebarNavigationList>
          </SidebarNavigationItem>
          <SidebarNavigationItem
            disabled
            disabledReason="Coming soon"
            href="#reports"
            label="Reports"
          />
        </SidebarNavigationList>
      </SidebarNavigationGroup>
    </SidebarNavigation>
  )
}

describe("SidebarNavigation", () => {
  it("provides the navigation-landmark and active-page state", () => {
    render(<Navigation />)
    expect(screen.getByRole("navigation", { name: "Primary" })).toBeInTheDocument()
    expect(screen.getByRole("link", { name: "Projects" })).toHaveAttribute("aria-current", "page")
  })

  it("prevents a disabled-item from navigating", async () => {
    const user = userEvent.setup()
    render(<Navigation />)
    const reports = screen.getByText("Reports").closest("a")
    expect(reports).toHaveAttribute("aria-disabled", "true")
    expect(reports).toHaveAttribute("tabindex", "-1")
    expect(reports).toHaveAccessibleDescription("Coming soon")
    await user.click(reports as HTMLAnchorElement)
    expect(window.location.hash).not.toBe("#reports")
  })

  it("preserves nested-navigation list semantics", () => {
    render(<Navigation />)
    const nestedList = screen.getByRole("list", { name: "Projects" })
    expect(nestedList).toHaveAttribute("data-level", "secondary")
    expect(within(nestedList).getByRole("link", { name: "API keys" })).toHaveAttribute(
      "data-level",
      "secondary",
    )
  })

  it("preserves accessible collapsed-labels", () => {
    render(<Navigation collapsed />)
    expect(screen.getByRole("link", { name: "Projects" })).toHaveAttribute("title", "Projects")
    expect(screen.getByText("Workspace")).toHaveClass("sr-only")
    expect(screen.getByRole("list", { name: "Projects" })).toHaveClass("hidden")
  })
})
