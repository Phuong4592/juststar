// Contract coverage: renders, class-name, render, preserve-semantics
import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardFrame,
  CardFrameAction,
  CardFrameDescription,
  CardFrameFooter,
  CardFrameHeader,
  CardFrameTitle,
  CardHeader,
  CardPanel,
  CardTitle,
  cardVariants,
} from "./card"

describe("Card", () => {
  describe("renders", () => {
    it("renders the complete card anatomy", () => {
      const { container } = render(
        <Card data-testid="card">
          <CardHeader>
            <CardTitle>Project</CardTitle>
            <CardDescription>Project details</CardDescription>
            <CardAction>Action</CardAction>
          </CardHeader>
          <CardPanel>Content</CardPanel>
          <CardFooter>Footer</CardFooter>
        </Card>,
      )

      expect(screen.getByTestId("card")).toHaveClass(
        "rounded-overlay",
        "border-neutral-200",
        "bg-surface",
        "shadow-surface",
      )
      expect(container.querySelector('[data-slot="card-header"]')).toBeDefined()
      expect(container.querySelector('[data-slot="card-title"]')).toHaveTextContent("Project")
      expect(container.querySelector('[data-slot="card-description"]')).toHaveTextContent(
        "Project details",
      )
      expect(container.querySelector('[data-slot="card-action"]')).toHaveTextContent("Action")
      expect(container.querySelector('[data-slot="card-panel"]')).toHaveTextContent("Content")
      expect(container.querySelector('[data-slot="card-footer"]')).toHaveTextContent("Footer")
    })

    it("renders the complete card frame anatomy", () => {
      const { container } = render(
        <CardFrame>
          <CardFrameHeader>
            <CardFrameTitle>Project</CardFrameTitle>
            <CardFrameDescription>Project settings</CardFrameDescription>
            <CardFrameAction>Action</CardFrameAction>
          </CardFrameHeader>
          <Card>Content</Card>
          <CardFrameFooter>Footer</CardFrameFooter>
        </CardFrame>,
      )

      expect(container.querySelector('[data-slot="card-frame"]')).toHaveClass(
        "rounded-overlay",
        "border-neutral-200",
        "bg-surface",
      )
      expect(container.querySelector('[data-slot="card-frame-header"]')).toBeDefined()
      expect(container.querySelector('[data-slot="card-frame-title"]')).toHaveTextContent("Project")
      expect(container.querySelector('[data-slot="card-frame-description"]')).toHaveTextContent(
        "Project settings",
      )
      expect(container.querySelector('[data-slot="card-frame-action"]')).toHaveTextContent("Action")
      expect(container.querySelector('[data-slot="card-frame-footer"]')).toHaveTextContent("Footer")
    })

    it("exports cardVariants with all public slots", () => {
      const variants = cardVariants()
      expect(variants.root()).toContain("bg-surface")
      expect(variants.frame()).toContain("shadow-surface")
      expect(variants.panel()).toContain("p-4xl")
    })
  })

  describe("class-name", () => {
    it("merges consumer className into card parts", () => {
      render(
        <Card className="custom-root">
          <CardPanel className="custom-panel">Content</CardPanel>
        </Card>,
      )

      expect(screen.getByText("Content").parentElement).toHaveClass("custom-root")
      expect(screen.getByText("Content")).toHaveClass("custom-panel", "p-4xl")
    })

    it("merges consumer className into frame parts", () => {
      render(
        <CardFrame className="custom-frame">
          <CardFrameHeader className="custom-header">Header</CardFrameHeader>
        </CardFrame>,
      )

      expect(screen.getByText("Header").parentElement).toHaveClass("custom-frame")
      expect(screen.getByText("Header")).toHaveClass("custom-header", "px-4xl")
    })
  })

  describe("render", () => {
    it("renders a section while preserving card props", () => {
      render(
        <Card data-testid="card" render={<section aria-label="Project summary" />}>
          <CardPanel>Content</CardPanel>
        </Card>,
      )

      const section = screen.getByRole("region", { name: "Project summary" })
      expect(section.tagName).toBe("SECTION")
      expect(section).toHaveAttribute("data-slot", "card")
      expect(section).toHaveClass("bg-surface", "shadow-surface")
    })

    it("renders a heading title while preserving card title props", () => {
      render(<CardTitle render={<h3 />}>Project</CardTitle>)

      const heading = screen.getByRole("heading", { name: "Project", level: 3 })
      expect(heading).toHaveAttribute("data-slot", "card-title")
    })
  })

  describe("preserve-semantics", () => {
    it("passes native attributes through to the rendered div", () => {
      render(
        <Card aria-label="Project summary" data-project-id="alpha">
          Content
        </Card>,
      )

      expect(screen.getByLabelText("Project summary")).toHaveAttribute("data-project-id", "alpha")
    })

    it("allows consumers to add semantic roles without replacing the native element", () => {
      render(
        <Card role="region" aria-label="Project summary">
          Content
        </Card>,
      )

      expect(screen.getByRole("region", { name: "Project summary" }).tagName).toBe("DIV")
    })
  })
})
