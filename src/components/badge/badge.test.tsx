// Contract coverage: renders, class-name, variants, sizes, render, preserve-semantics
import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { Badge, badgeVariants } from "./badge"

const variants = {
  default: "bg-brand-500",
  destructive: "bg-error-600",
  error: "text-error-700",
  info: "text-info-700",
  outline: "border-neutral-300",
  secondary: "bg-neutral-100",
  success: "text-success-900",
  warning: "text-warning-800",
} as const

const sizes = {
  lg: "h-[26px]",
  md: "h-[22px]",
  sm: "h-4xl",
} as const

describe("Badge", () => {
  it("is exported", () => {
    expect(Badge).toBeDefined()
  })

  describe("renders", () => {
    it("renders a span with content", () => {
      render(<Badge>New</Badge>)
      expect(screen.getByText("New").tagName).toBe("SPAN")
    })
  })

  describe("class-name", () => {
    it("merges consumer classes with variant classes", () => {
      render(<Badge className="custom-class">New</Badge>)
      expect(screen.getByText("New")).toHaveClass("custom-class", "bg-brand-500")
    })
  })

  describe("variants", () => {
    it.each(Object.entries(variants))("applies the %s variant", (variant, className) => {
      render(<Badge variant={variant as keyof typeof variants}>{variant}</Badge>)
      expect(screen.getByText(variant)).toHaveClass(className)
    })

    it("exports badgeVariants as a callable function", () => {
      expect(badgeVariants({ variant: "success" })).toContain("text-success-900")
    })
  })

  describe("sizes", () => {
    it.each(Object.entries(sizes))("applies the %s size", (size, className) => {
      render(<Badge size={size as keyof typeof sizes}>{size}</Badge>)
      expect(screen.getByText(size)).toHaveClass(className)
    })

    it("defaults to md", () => {
      render(<Badge>Default size</Badge>)
      expect(screen.getByText("Default size")).toHaveClass("h-[22px]")
    })

    it("keeps custom font-size and color utilities", () => {
      expect(badgeVariants({ size: "md", variant: "default" })).toContain("text-body-xs")
      expect(badgeVariants({ size: "sm", variant: "success" })).toContain("text-body-xs")
      expect(badgeVariants({ size: "md", variant: "default" })).toContain("text-on-brand")
      expect(badgeVariants({ size: "sm", variant: "success" })).toContain("text-success-900")
    })
  })

  describe("render", () => {
    it("renders a link while preserving badge props", () => {
      render(
        <Badge render={<a href="/pricing" />} variant="info">
          New plan
        </Badge>,
      )
      expect(screen.getByRole("link", { name: "New plan" })).toHaveAttribute("href", "/pricing")
      expect(screen.getByRole("link")).toHaveClass("text-info-700")
    })
  })

  describe("preserve-semantics", () => {
    it("passes native attributes and keeps the slot marker", () => {
      render(
        <Badge aria-label="Status" data-testid="badge">
          Published
        </Badge>,
      )
      expect(screen.getByTestId("badge")).toHaveAttribute("aria-label", "Status")
      expect(screen.getByTestId("badge")).toHaveAttribute("data-slot", "badge")
    })
  })
})
