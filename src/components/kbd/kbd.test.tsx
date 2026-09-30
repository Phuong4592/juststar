// Contract coverage: renders, class-name, technical-font
import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { Kbd, kbdVariants } from "./kbd"

describe("Kbd", () => {
  it("is exported", () => {
    expect(Kbd).toBeDefined()
  })

  describe("renders", () => {
    it("renders a native kbd element with children", () => {
      render(<Kbd>Esc</Kbd>)
      const kbd = screen.getByText("Esc")

      expect(kbd.tagName).toBe("KBD")
      expect(kbd).toHaveAttribute("data-slot", "kbd")
    })

    it("passes native props and refs to the root", () => {
      let root: HTMLElement | null = null
      render(
        <Kbd
          ref={(node) => {
            root = node
          }}
          title="Escape"
        >
          Esc
        </Kbd>,
      )

      expect(screen.getByText("Esc")).toHaveAttribute("title", "Escape")
      expect(root).toBe(screen.getByText("Esc"))
    })
  })

  describe("class-name", () => {
    it("applies consumer className to the root element", () => {
      render(<Kbd className="custom-class">K</Kbd>)
      expect(screen.getByText("K").className).toContain("custom-class")
    })

    it("preserves token classes alongside consumer className", () => {
      render(<Kbd className="text-brand-700">K</Kbd>)
      const cls = screen.getByText("K").className

      expect(cls).toContain("text-brand-700")
      expect(cls).toContain("bg-neutral-100")
      expect(cls).toContain("rounded-control")
      expect(cls).toContain("h-4xl")
    })

    it("applies consumer className to the group wrapper", () => {
      render(
        <Kbd.Group className="custom-group">
          <Kbd>⌘</Kbd>
          <Kbd>K</Kbd>
        </Kbd.Group>,
      )
      const group = screen.getByText("⌘").closest('span[data-slot="kbd-group"]')

      expect(group?.className).toContain("custom-group")
      expect(group?.className).toContain("gap-xs")
    })
  })

  describe("technical-font", () => {
    it("marks the key with the technical font role", () => {
      render(<Kbd>K</Kbd>)
      expect(screen.getByText("K")).toHaveAttribute("data-en-font", "technical")
    })

    it("uses the mono typography tokens", () => {
      render(<Kbd>K</Kbd>)
      const cls = screen.getByText("K").className

      expect(cls).toContain("font-mono")
      expect(cls).toContain("text-mono-xs")
      expect(cls).toContain("text-neutral-600")
    })
  })

  it("exports kbdVariants with kbd and group slots", () => {
    expect(kbdVariants().kbd()).toContain("bg-neutral-100")
    expect(kbdVariants().group()).toContain("gap-xs")
  })
})
