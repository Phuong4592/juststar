// Contract coverage: renders, class-name
import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { Button } from "../button/button"
import {
  Popover,
  PopoverDescription,
  PopoverPopup,
  PopoverTitle,
  PopoverTrigger,
  popoverVariants,
} from "./popover"

function renderPopover() {
  return render(
    <Popover defaultOpen>
      <PopoverTrigger render={<Button />}>Open</PopoverTrigger>
      <PopoverPopup className="custom-popup">
        <PopoverTitle>Workspace</PopoverTitle>
        <PopoverDescription className="custom-description">
          Shared with four members.
        </PopoverDescription>
      </PopoverPopup>
    </Popover>,
  )
}

describe("Popover", () => {
  it("is exported", () => {
    expect(Popover).toBeDefined()
    expect(PopoverTrigger).toBeDefined()
    expect(PopoverPopup).toBeDefined()
  })

  describe("renders", () => {
    it("renders trigger and popup parts with data-slot attributes", () => {
      renderPopover()

      expect(screen.getByText("Open")).toHaveAttribute("data-slot", "popover-trigger")
      expect(screen.getByText("Workspace")).toHaveAttribute("data-slot", "popover-title")
      expect(screen.getByText("Shared with four members.")).toHaveAttribute(
        "data-slot",
        "popover-description",
      )
      expect(document.querySelector('[data-slot="popover-popup"]')).not.toBeNull()
      expect(document.querySelector('[data-slot="popover-positioner"]')).not.toBeNull()
      expect(document.querySelector('[data-slot="popover-viewport"]')).not.toBeNull()
    })

    it("marks the title with the heading typography tokens", () => {
      renderPopover()

      const cls = screen.getByText("Workspace").className

      expect(cls).toContain("text-heading-3")
      expect(cls).toContain("font-semibold")
    })

    it("marks the description with the body typography tokens", () => {
      renderPopover()

      const cls = screen.getByText("Shared with four members.").className

      expect(cls).toContain("text-neutral-500")
    })
  })

  describe("class-name", () => {
    it("merges consumer className into the popup", () => {
      renderPopover()

      const popup = document.querySelector('[data-slot="popover-popup"]')

      expect(popup?.className).toContain("custom-popup")
      expect(popup?.className).toContain("rounded-control")
      expect(popup?.className).toContain("bg-surface")
    })

    it("merges consumer className into the description", () => {
      renderPopover()

      expect(screen.getByText("Shared with four members.").className).toContain(
        "custom-description",
      )
    })

    it("applies tooltip styling when tooltipStyle is set", () => {
      render(
        <Popover defaultOpen>
          <PopoverTrigger render={<Button />}>Open</PopoverTrigger>
          <PopoverPopup tooltipStyle>Compact content.</PopoverPopup>
        </Popover>,
      )

      const cls = document.querySelector('[data-slot="popover-popup"]')?.className ?? ""

      expect(cls).toContain("text-body-xs")
      expect(cls).toContain("shadow-raised")
      expect(document.querySelector('[data-slot="popover-viewport"]')?.className).toContain("py-xs")
    })
  })

  it("exports popoverVariants with popup and positioner slots", () => {
    expect(popoverVariants().popup()).toContain("rounded-control")
    expect(popoverVariants().positioner()).toContain("z-50")
  })
})
