// Contract coverage: renders, class-name, single-line-label
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"

import { Button, buttonVariants } from "./button"

describe("Button", () => {
  it("is exported", () => {
    expect(Button).toBeDefined()
  })

  describe("renders", () => {
    it("renders a button element with children", () => {
      render(<Button>Save changes</Button>)
      expect(screen.getByRole("button", { name: "Save changes" })).toBeDefined()
    })

    it("renders without children", () => {
      render(<Button />)
      expect(screen.getByRole("button")).toBeDefined()
    })
  })

  describe("class-name", () => {
    it("applies consumer className to the root element", () => {
      render(<Button className="custom-class">Save</Button>)
      const button = screen.getByRole("button")
      expect(button.className).toContain("custom-class")
    })

    it("preserves variant classes alongside consumer className", () => {
      render(
        <Button className="custom-class" variant="danger">
          Delete
        </Button>,
      )
      const button = screen.getByRole("button")
      expect(button.className).toContain("custom-class")
      expect(button.className).toContain("bg-error-700")
    })
  })

  describe("variants", () => {
    it("defaults to primary variant", () => {
      render(<Button>Save</Button>)
      expect(screen.getByRole("button").className).toContain("bg-brand-500")
    })

    it("applies danger variant", () => {
      render(<Button variant="danger">Delete</Button>)
      expect(screen.getByRole("button").className).toContain("bg-error-700")
    })

    it("applies ghost variant", () => {
      render(<Button variant="ghost">Cancel</Button>)
      const cls = screen.getByRole("button").className
      expect(cls).toContain("bg-transparent")
      expect(cls).toContain("text-neutral-900")
    })

    it("applies link variant", () => {
      render(<Button variant="link">Learn more</Button>)
      expect(screen.getByRole("button").className).toContain("hover:underline")
    })

    it("applies secondary variant", () => {
      render(<Button variant="secondary">Save</Button>)
      expect(screen.getByRole("button").className).toContain("bg-surface")
    })

    it("applies tertiary variant", () => {
      render(<Button variant="tertiary">More</Button>)
      expect(screen.getByRole("button").className).toContain("bg-neutral-50")
    })

    it("applies danger-soft variant", () => {
      render(<Button variant="danger-soft">Delete</Button>)
      expect(screen.getByRole("button").className).toContain("text-error-700")
    })

    it("exports buttonVariants as a callable function", () => {
      expect(buttonVariants).toBeInstanceOf(Function)
      const result = buttonVariants({ variant: "secondary" })
      expect(result).toContain("bg-surface")
      expect(result).toContain("[--btn-press-scale:0.98]")
      expect(result).toContain("active:scale-(--btn-press-scale)")
    })
  })

  describe("sizes", () => {
    it("defaults to md size", () => {
      render(<Button>Save</Button>)
      expect(screen.getByRole("button").className).toContain("h-6xl")
    })

    it("applies xs size", () => {
      render(<Button size="xs">Save</Button>)
      expect(screen.getByRole("button").className).toContain("h-5xl")
    })

    it("applies sm size", () => {
      render(<Button size="sm">Save</Button>)
      expect(screen.getByRole("button").className).toContain("h-[1.75rem]")
    })

    it("applies lg size", () => {
      render(<Button size="lg">Save</Button>)
      expect(screen.getByRole("button").className).toContain("h-[2.25rem]")
    })

    it("applies icon size", () => {
      render(<Button aria-label="Settings" size="icon" />)
      expect(screen.getByRole("button").className).toContain("size-6xl")
    })
  })

  describe("loading", () => {
    it("sets aria-busy when loading", () => {
      render(<Button loading>Save</Button>)
      expect(screen.getByRole("button")).toHaveAttribute("aria-busy", "true")
    })

    it("does not set aria-busy when not loading", () => {
      render(<Button>Save</Button>)
      expect(screen.getByRole("button")).not.toHaveAttribute("aria-busy")
    })

    it("renders a spinner when loading", () => {
      render(<Button loading>Save</Button>)
      expect(screen.getByRole("status")).toBeDefined()
    })

    it("keeps the label visible when loading", () => {
      render(<Button loading>Save</Button>)
      expect(screen.getByText("Save")).toBeDefined()
    })

    it("replaces the start icon with the spinner and hides the end icon when loading", () => {
      render(
        <Button
          icon={{
            start: <span data-testid="start">S</span>,
            end: <span data-testid="end">E</span>,
          }}
          loading
        >
          Save
        </Button>,
      )
      expect(screen.queryByTestId("start")).toBeNull()
      expect(screen.queryByTestId("end")).toBeNull()
      expect(screen.getByRole("status")).toBeDefined()
    })

    it("renders start and end icons when not loading", () => {
      render(
        <Button
          icon={{
            start: <span data-testid="start">S</span>,
            end: <span data-testid="end">E</span>,
          }}
        >
          Save
        </Button>,
      )
      expect(screen.getByTestId("start")).toBeDefined()
      expect(screen.getByTestId("end")).toBeDefined()
    })

    it("does not render a spinner when not loading", () => {
      render(<Button>Save</Button>)
      expect(screen.queryByRole("status")).toBeNull()
    })
  })

  describe("disabled", () => {
    it("sets disabled attribute", () => {
      render(<Button disabled>Save</Button>)
      expect(screen.getByRole("button")).toBeDisabled()
    })

    it("blocks click when disabled", async () => {
      const onClick = vi.fn()
      render(
        <Button disabled onClick={onClick}>
          Save
        </Button>,
      )
      await userEvent.click(screen.getByRole("button"))
      expect(onClick).not.toHaveBeenCalled()
    })

    it("allows click when not disabled", async () => {
      const onClick = vi.fn()
      render(<Button onClick={onClick}>Save</Button>)
      await userEvent.click(screen.getByRole("button"))
      expect(onClick).toHaveBeenCalledTimes(1)
    })
  })

  describe("icon", () => {
    it("renders a single icon as start icon", () => {
      render(<Button icon={<span data-testid="icon">Icon</span>}>Save</Button>)
      expect(screen.getByTestId("icon")).toBeDefined()
    })

    it("renders start and end icons from object", () => {
      render(
        <Button
          icon={{
            start: <span data-testid="start">S</span>,
            end: <span data-testid="end">E</span>,
          }}
        >
          Save
        </Button>,
      )
      expect(screen.getByTestId("start")).toBeDefined()
      expect(screen.getByTestId("end")).toBeDefined()
    })

    it("renders only start icon when end is omitted", () => {
      render(<Button icon={{ start: <span data-testid="start">S</span> }}>Save</Button>)
      expect(screen.getByTestId("start")).toBeDefined()
      expect(screen.queryByTestId("end")).toBeNull()
    })

    it("does not render icon elements when no icon prop", () => {
      render(<Button>Save</Button>)
      const button = screen.getByRole("button")
      expect(button.querySelectorAll("[data-testid]").length).toBe(0)
    })
  })

  describe("native props passthrough", () => {
    it("passes type attribute through", () => {
      render(<Button type="submit">Save</Button>)
      expect(screen.getByRole("button")).toHaveAttribute("type", "submit")
    })

    it("passes onClick handler through", async () => {
      const onClick = vi.fn()
      render(<Button onClick={onClick}>Save</Button>)
      await userEvent.click(screen.getByRole("button"))
      expect(onClick).toHaveBeenCalledTimes(1)
    })

    it("passes aria-label through", () => {
      render(<Button aria-label="Save document">Save</Button>)
      expect(screen.getByRole("button", { name: "Save document" })).toBeDefined()
    })
  })

  it("keeps a single-line-label inside fixed control heights", () => {
    render(<Button>Review production readiness</Button>)
    expect(screen.getByRole("button", { name: "Review production readiness" })).toHaveClass(
      "whitespace-nowrap",
      "shrink-0",
    )
  })
})
