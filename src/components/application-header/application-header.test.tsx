// Contract coverage: header-landmark, navigation-trigger, sidebar-trigger, optional-slots
import { render, screen } from "@testing-library/react"

import { ApplicationShell } from "../application-shell/application-shell"
import { ApplicationHeader } from "./application-header"

describe("ApplicationHeader", () => {
  it("provides a header-landmark and optional-slots", () => {
    render(
      <ApplicationHeader
        actions={<button>Account</button>}
        brand="Enosta"
        context="Delivery"
        search={
          <label>
            Search
            <input />
          </label>
        }
      />,
    )
    expect(screen.getByRole("banner")).toBeInTheDocument()
    expect(screen.getByText("Enosta")).toBeInTheDocument()
    expect(screen.getByText("Delivery")).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Account" })).toBeInTheDocument()
  })

  it("provides shell navigation-trigger and sidebar-trigger controls", () => {
    render(
      <ApplicationShell
        header={<ApplicationHeader brand="Enosta" />}
        navigation={<nav aria-label="Primary" />}
      >
        Content
      </ApplicationShell>,
    )
    expect(screen.getByRole("button", { name: "Open Navigation" })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Collapse Navigation" })).toBeInTheDocument()
  })
})
