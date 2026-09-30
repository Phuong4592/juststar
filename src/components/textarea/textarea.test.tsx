// Contract coverage: renders, class-name
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"

import { Textarea, textareaVariants } from "./textarea"

function getTextarea() {
  return screen.getByRole("textbox")
}

describe("Textarea", () => {
  it("is exported", () => {
    expect(Textarea).toBeDefined()
  })

  describe("renders", () => {
    it("renders a textbox", () => {
      render(<Textarea placeholder="Bio" />)
      expect(screen.getByRole("textbox")).toBeDefined()
    })

    it("accepts typed input", async () => {
      render(<Textarea aria-label="Bio" />)
      const textarea = getTextarea()
      await userEvent.type(textarea, "Hello world")
      expect(textarea).toHaveValue("Hello world")
    })

    it("renders the textarea data-slot", () => {
      render(<Textarea />)
      expect(getTextarea().getAttribute("data-slot")).toBe("textarea-input")
    })
  })

  describe("class-name", () => {
    it("applies consumer className to the textarea element", () => {
      render(<Textarea className="custom-class" />)
      expect(getTextarea().className).toContain("custom-class")
    })

    it("preserves variant classes alongside consumer className", () => {
      render(<Textarea className="custom-class" />)
      const cls = getTextarea().className
      expect(cls).toContain("custom-class")
      expect(cls).toContain("rounded-control")
      expect(cls).toContain("bg-surface")
    })
  })

  describe("sizes", () => {
    it("defaults to md size", () => {
      render(<Textarea />)
      expect(getTextarea().className).toContain("min-h-(--height-control-md)")
    })

    it("applies sm size", () => {
      render(<Textarea size="sm" />)
      expect(getTextarea().className).toContain("min-h-(--height-control-sm)")
    })

    it("applies lg size", () => {
      render(<Textarea size="lg" />)
      expect(getTextarea().className).toContain("min-h-(--height-control-lg)")
    })

    it("sets data-size", () => {
      render(<Textarea size="lg" />)
      expect(getTextarea()).toHaveAttribute("data-size", "lg")
    })
  })

  describe("unstyled", () => {
    it("removes surface styling from the textarea", () => {
      render(<Textarea unstyled />)
      const cls = getTextarea().className
      expect(cls).not.toContain("rounded-control")
      expect(cls).not.toContain("bg-surface")
      expect(cls).not.toContain("border-neutral-200")
    })
  })

  describe("states", () => {
    it("supports disabled", () => {
      render(<Textarea disabled />)
      expect(getTextarea()).toBeDisabled()
      expect(getTextarea().className).toContain("disabled:bg-neutral-50")
    })

    it("styles the invalid state from aria-invalid", () => {
      render(<Textarea aria-invalid />)
      expect(getTextarea()).toHaveAttribute("aria-invalid", "true")
      expect(getTextarea().className).toContain("aria-invalid:border-error-400")
    })

    it("supports readOnly", () => {
      render(<Textarea defaultValue="Locked" readOnly />)
      expect(getTextarea()).toHaveAttribute("readOnly")
    })
  })

  describe("passthrough", () => {
    it("passes native props to the textarea element", () => {
      render(<Textarea id="bio" name="bio" required rows={5} />)
      const textarea = getTextarea()
      expect(textarea).toHaveAttribute("id", "bio")
      expect(textarea).toHaveAttribute("name", "bio")
      expect(textarea).toHaveAttribute("rows", "5")
      expect(textarea).toBeRequired()
    })

    it("forwards change events", async () => {
      const onChange = vi.fn()
      render(<Textarea aria-label="Bio" onChange={onChange} />)
      await userEvent.type(getTextarea(), "a")
      expect(onChange).toHaveBeenCalled()
    })
  })

  describe("textareaVariants", () => {
    it("exports base variants", () => {
      expect(textareaVariants).toBeInstanceOf(Function)
      expect(textareaVariants()).toContain("resize-y")
    })
  })
})
