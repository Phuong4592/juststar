// Contract coverage: container-width, responsive-gutter, native-props
import { render, screen } from "@testing-library/react"

import { PageContainer } from "./page-container"

describe("PageContainer", () => {
  it("applies the declared container-width", () => {
    render(<PageContainer size="narrow">Focused content</PageContainer>)
    expect(screen.getByText("Focused content")).toHaveClass("max-w-[48rem]")
  })

  it("applies the declared responsive-gutter", () => {
    render(<PageContainer>Page content</PageContainer>)
    expect(screen.getByText("Page content")).toHaveClass("px-lg", "md:px-xl", "xl:px-2xl")
  })

  it("passes through native-props", () => {
    render(<PageContainer aria-label="Project content">Content</PageContainer>)
    expect(screen.getByLabelText("Project content")).toHaveAttribute(
      "data-en-part",
      "page-container",
    )
  })
})
