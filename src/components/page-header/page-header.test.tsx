// Contract coverage: page-heading, responsive-actions, optional-slots, native-props
import { render, screen } from "@testing-library/react"

import { PageHeader } from "./page-header"

describe("PageHeader", () => {
  it("provides the page-heading", () => {
    render(<PageHeader title="Project overview" />)
    expect(screen.getByRole("heading", { level: 1, name: "Project overview" })).toBeInTheDocument()
    expect(screen.getByRole("banner")).toHaveAccessibleName("Project overview")
  })

  it("provides responsive-actions after the page copy", () => {
    render(<PageHeader actions={<button>New task</button>} title="Project overview" />)
    expect(screen.getByRole("button", { name: "New task" }).parentElement).toHaveAttribute(
      "data-en-part",
      "page-header-actions",
    )
  })

  it("renders optional-slots", () => {
    render(
      <PageHeader
        breadcrumbs={<a href="/projects">Projects</a>}
        metadata={<span>Updated today</span>}
        tabs={<nav aria-label="Project views">Overview</nav>}
        title="Project overview"
      />,
    )
    expect(screen.getByRole("link", { name: "Projects" })).toBeInTheDocument()
    expect(screen.getByText("Updated today")).toBeInTheDocument()
    expect(screen.getByRole("navigation", { name: "Project views" })).toBeInTheDocument()
  })

  it("passes through native-props", () => {
    render(<PageHeader data-testid="page-header" title="Project overview" />)
    expect(screen.getByTestId("page-header")).toHaveAttribute("data-en-part", "page-header")
  })
})
