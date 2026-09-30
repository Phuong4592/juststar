// Contract coverage: main-landmark, skip-link, mobile-toggle, sidebar-collapse, escape-focus
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import { ApplicationHeader } from "../application-header/application-header"
import {
  SidebarNavigation,
  SidebarNavigationItem,
  SidebarNavigationList,
} from "../sidebar-navigation/sidebar-navigation"
import { ApplicationShell } from "./application-shell"

function ShellFixture() {
  return (
    <ApplicationShell
      header={<ApplicationHeader brand="Enosta" />}
      navigation={
        <SidebarNavigation label="Primary">
          <SidebarNavigationList>
            <SidebarNavigationItem href="#projects" label="Projects" />
          </SidebarNavigationList>
        </SidebarNavigation>
      }
    >
      Page content
    </ApplicationShell>
  )
}

describe("ApplicationShell", () => {
  it("owns the main-landmark and skip-link", () => {
    render(<ShellFixture />)
    const main = screen.getByRole("main")
    expect(main).toHaveTextContent("Page content")
    expect(screen.getByRole("link", { name: "Skip to content" })).toHaveAttribute(
      "href",
      `#${main.id}`,
    )
  })

  it("supports the mobile-toggle", async () => {
    const user = userEvent.setup()
    render(<ShellFixture />)
    await user.click(screen.getByRole("button", { name: "Open Navigation" }))
    expect(screen.getByRole("dialog", { name: "Application navigation" })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Close Navigation" })).toHaveAttribute(
      "aria-expanded",
      "true",
    )
  })

  it("supports desktop sidebar-collapse", async () => {
    const user = userEvent.setup()
    const { container } = render(<ShellFixture />)
    await user.click(screen.getByRole("button", { name: "Collapse Navigation" }))
    expect(container.querySelector('[data-en-part="sidebar-navigation"]')).toHaveAttribute(
      "data-collapsed",
      "true",
    )
  })

  it("supports escape-focus restoration", async () => {
    const user = userEvent.setup()
    render(<ShellFixture />)
    const trigger = screen.getByRole("button", { name: "Open Navigation" })
    await user.click(trigger)
    await user.keyboard("{Escape}")
    expect(trigger).toHaveFocus()
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument()
  })
})
