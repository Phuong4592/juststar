// Contract coverage: section-landmark, heading-level, density, optional-slots, native-props
import { render, screen } from "@testing-library/react"

import { PageSection } from "./page-section"

describe("PageSection", () => {
  it("provides a named section-landmark", () => {
    render(<PageSection title="Members">Member content</PageSection>)
    expect(screen.getByRole("region", { name: "Members" })).toBeInTheDocument()
  })

  it("supports the declared heading-level", () => {
    render(
      <PageSection headingAs="h3" title="Permissions">
        Permission content
      </PageSection>,
    )
    expect(screen.getByRole("heading", { level: 3, name: "Permissions" })).toBeInTheDocument()
  })

  it("applies the declared density", () => {
    render(
      <PageSection density="compact" title="Members" variant="surface">
        Member content
      </PageSection>,
    )
    expect(screen.getByRole("region", { name: "Members" })).toHaveClass(
      "gap-md",
      "md:gap-lg",
      "p-md",
      "md:p-lg",
    )
    expect(screen.getByRole("region", { name: "Members" })).toHaveAttribute(
      "data-density",
      "compact",
    )
  })

  it("renders optional-slots", () => {
    render(
      <PageSection
        actions={<button>Invite</button>}
        description="People with workspace access"
        title="Members"
      >
        Member content
      </PageSection>,
    )
    expect(screen.getByText("People with workspace access")).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Invite" }).parentElement).toHaveAttribute(
      "data-en-part",
      "page-section-actions",
    )
  })

  it("passes through native-props", () => {
    render(
      <PageSection data-testid="members" title="Members">
        Member content
      </PageSection>,
    )
    expect(screen.getByTestId("members")).toHaveAttribute("data-en-part", "page-section")
  })
})
