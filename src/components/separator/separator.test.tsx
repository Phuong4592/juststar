// Contract coverage: renders, class-name
import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { Separator, separatorVariants } from "./separator"

describe("Separator", () => {
  it("is exported", () => {
    expect(Separator).toBeDefined()
  })

  describe("renders", () => {
    it("renders a semantic separator element", () => {
      render(<Separator />)
      expect(screen.getByRole("separator")).toBeDefined()
    })

    it("exposes the root data slot", () => {
      render(<Separator />)
      expect(screen.getByRole("separator")).toHaveAttribute("data-slot", "separator")
    })

    it("passes native props through to the root", () => {
      render(<Separator data-testid="boundary" />)
      expect(screen.getByTestId("boundary")).toHaveAttribute("role", "separator")
    })
  })

  describe("class-name", () => {
    it("applies consumer className to the root element", () => {
      render(<Separator className="custom-class" />)
      expect(screen.getByRole("separator").className).toContain("custom-class")
    })

    it("preserves token classes alongside consumer className", () => {
      render(<Separator className="opacity-50" />)
      const cls = screen.getByRole("separator").className

      expect(cls).toContain("opacity-50")
      expect(cls).toContain("bg-neutral-200")
    })
  })

  describe("orientation", () => {
    it("defaults to horizontal orientation", () => {
      render(<Separator />)
      expect(screen.getByRole("separator")).toHaveAttribute("data-orientation", "horizontal")
    })

    it("renders vertical orientation", () => {
      render(<Separator orientation="vertical" />)
      expect(screen.getByRole("separator")).toHaveAttribute("data-orientation", "vertical")
    })
  })

  it("exports separatorVariants with token classes", () => {
    expect(separatorVariants()).toContain("bg-neutral-200")
  })
})
