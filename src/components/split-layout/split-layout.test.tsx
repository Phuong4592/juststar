// Contract coverage: responsive-grid, density, secondary-position, sticky-secondary, content-slots
import { render, screen } from "@testing-library/react"

import { SplitLayout } from "./split-layout"

describe("SplitLayout", () => {
  it("provides the declared responsive-grid", () => {
    render(<SplitLayout primary="Primary" secondary="Secondary" />)
    expect(screen.getByText("Primary").parentElement).toHaveClass(
      "grid-cols-1",
      "lg:grid-cols-[minmax(0,2fr)_minmax(16rem,1fr)]",
    )
  })

  it("applies the declared density", () => {
    render(<SplitLayout density="compact" primary="Primary" secondary="Secondary" />)
    expect(screen.getByText("Primary").parentElement).toHaveClass("gap-lg", "lg:gap-xl")
    expect(screen.getByText("Primary").parentElement).toHaveAttribute("data-density", "compact")
  })

  it("changes only desktop secondary-position", () => {
    render(<SplitLayout primary="Primary" secondary="Secondary" secondaryPosition="start" />)
    expect(screen.getByText("Primary")).toHaveClass("lg:col-start-2", "lg:row-start-1")
    expect(screen.getByText("Secondary")).toHaveClass("lg:col-start-1", "lg:row-start-1")
  })

  it("supports a sticky-secondary region", () => {
    render(<SplitLayout primary="Primary" secondary="Secondary" stickySecondary />)
    expect(screen.getByText("Secondary")).toHaveClass("lg:sticky", "lg:top-xl")
  })

  it("renders both content-slots in primary-first document order", () => {
    render(<SplitLayout primary="Primary" secondary="Secondary" />)
    const primary = screen.getByText("Primary")
    const secondary = screen.getByText("Secondary")
    expect(primary).toHaveAttribute("data-en-part", "split-layout-primary")
    expect(secondary).toHaveAttribute("data-en-part", "split-layout-secondary")
    expect(
      primary.compareDocumentPosition(secondary) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy()
  })
})
