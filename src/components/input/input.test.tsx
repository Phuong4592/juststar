// Contract coverage: renders, class-name
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"

import { Input, inputVariants } from "./input"

function getRoot() {
  return document.querySelector<HTMLElement>('[data-slot="input-root"]')
}

describe("Input", () => {
  it("is exported", () => {
    expect(Input).toBeDefined()
  })

  describe("renders", () => {
    it("renders a textbox", () => {
      render(<Input placeholder="Email" />)
      expect(screen.getByRole("textbox")).toBeDefined()
    })

    it("accepts typed input", async () => {
      render(<Input aria-label="Email" />)
      const input = screen.getByRole("textbox")
      await userEvent.type(input, "hi@example.com")
      expect(input).toHaveValue("hi@example.com")
    })

    it("exposes the root and input data-slots", () => {
      render(<Input />)
      expect(getRoot()).toHaveAttribute("data-slot", "input-root")
      expect(screen.getByRole("textbox").getAttribute("data-slot")).toBe("input-input")
    })

    it("renders node affixes without wrapping", () => {
      render(
        <Input
          prefix={<span data-testid="prefix">Pre</span>}
          suffix={<span data-testid="suffix">Suf</span>}
        />,
      )
      expect(screen.getByTestId("prefix")).toBeDefined()
      expect(screen.getByTestId("suffix")).toBeDefined()
    })
  })

  describe("class-name", () => {
    it("applies consumer className to the root element", () => {
      render(<Input className="custom-class" />)
      expect(getRoot()?.className).toContain("custom-class")
    })

    it("preserves variant classes alongside consumer className", () => {
      render(<Input className="custom-class" />)
      const cls = getRoot()?.className ?? ""
      expect(cls).toContain("custom-class")
      expect(cls).toContain("rounded-control")
      expect(cls).toContain("bg-surface")
    })
  })

  describe("sizes", () => {
    it("defaults to md size", () => {
      render(<Input />)
      expect(getRoot()?.className).toContain("h-6xl")
    })

    it("applies sm size", () => {
      render(<Input size="sm" />)
      expect(getRoot()?.className).toContain("h-[28px]")
    })

    it("applies lg size", () => {
      render(<Input size="lg" />)
      expect(getRoot()?.className).toContain("h-[36px]")
    })

    it("sets data-size", () => {
      render(<Input size="lg" />)
      expect(getRoot()).toHaveAttribute("data-size", "lg")
    })
  })

  describe("unstyled", () => {
    it("removes surface styling from the root", () => {
      render(<Input unstyled />)
      const cls = getRoot()?.className ?? ""
      expect(cls).not.toContain("rounded-control")
      expect(cls).not.toContain("bg-surface")
      expect(cls).not.toContain("border-neutral-200")
    })
  })

  describe("states", () => {
    it("supports disabled", () => {
      render(<Input disabled />)
      expect(screen.getByRole("textbox")).toBeDisabled()
      expect(getRoot()?.className).toContain("has-disabled:bg-neutral-50")
    })

    it("styles the invalid state from aria-invalid", () => {
      render(<Input aria-invalid />)
      expect(screen.getByRole("textbox")).toHaveAttribute("aria-invalid", "true")
      expect(getRoot()?.className).toContain("has-aria-invalid:border-error-400")
    })

    it("supports readOnly", () => {
      render(<Input defaultValue="Locked" readOnly />)
      expect(screen.getByRole("textbox")).toHaveAttribute("readOnly")
    })
  })

  describe("passthrough", () => {
    it("passes native props to the input element", () => {
      render(<Input id="email" name="email" required type="email" />)
      const input = screen.getByRole("textbox")
      expect(input).toHaveAttribute("id", "email")
      expect(input).toHaveAttribute("name", "email")
      expect(input).toHaveAttribute("type", "email")
      expect(input).toBeRequired()
    })

    it("forwards change events", async () => {
      const onChange = vi.fn()
      render(<Input aria-label="Email" onChange={onChange} />)
      await userEvent.type(screen.getByRole("textbox"), "a")
      expect(onChange).toHaveBeenCalled()
    })

    it("styles the file type with muted root text", () => {
      render(<Input type="file" />)
      expect(getRoot()?.className).toContain("text-neutral-500")
    })
  })

  describe("inputVariants", () => {
    it("exports slot-based variants", () => {
      expect(inputVariants).toBeInstanceOf(Function)
      const v = inputVariants()
      expect(v.root()).toContain("rounded-control")
      expect(v.input()).toContain("outline-none")
      expect(v.icon()).toContain("text-neutral-400")
    })
  })
})
