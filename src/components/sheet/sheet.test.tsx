// Contract coverage: renders, class-name, sides, footer-variant, close-button
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"

import {
  Sheet,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetPanel,
  SheetPopup,
  SheetTitle,
  sheetVariants,
} from "./sheet"

function renderSheet(popupProps: Record<string, unknown> = {}) {
  render(
    <Sheet open>
      <SheetPopup {...popupProps}>
        <SheetHeader>
          <SheetTitle>Settings</SheetTitle>
          <SheetDescription>Change your preferences</SheetDescription>
        </SheetHeader>
        <SheetPanel>Body content</SheetPanel>
        <SheetFooter>
          <button type="button">Save</button>
        </SheetFooter>
      </SheetPopup>
    </Sheet>,
  )
}

describe("Sheet", () => {
  it("is exported", () => {
    expect(Sheet).toBeDefined()
    expect(SheetPopup).toBeDefined()
    expect(sheetVariants).toBeInstanceOf(Function)
  })

  describe("renders", () => {
    it("renders a dialog with title and description", () => {
      renderSheet()
      expect(screen.getByRole("dialog", { name: "Settings" })).toBeDefined()
      expect(screen.getByText("Change your preferences")).toBeDefined()
    })

    it("renders the header, panel, and footer parts", () => {
      renderSheet()
      expect(screen.getByText("Body content").closest('[data-slot="sheet-panel"]')).not.toBeNull()
      expect(document.querySelector('[data-slot="sheet-header"]')).not.toBeNull()
      expect(document.querySelector('[data-slot="sheet-footer"]')).not.toBeNull()
      expect(document.querySelector('[data-slot="sheet-backdrop"]')).not.toBeNull()
    })

    it("keeps the token-based popup surface classes", () => {
      renderSheet()
      const popup = screen.getByRole("dialog")
      expect(popup.className).toContain("bg-surface")
      expect(popup.className).toContain("shadow-overlay")
    })
  })

  describe("class-name", () => {
    it("merges consumer className with protected popup classes", () => {
      renderSheet({ className: "custom-class" })
      const popup = screen.getByRole("dialog")
      expect(popup.className).toContain("custom-class")
      expect(popup.className).toContain("bg-surface")
    })

    it("merges consumer className on the header, panel, and footer", () => {
      render(
        <Sheet open>
          <SheetPopup>
            <SheetHeader className="header-class" />
            <SheetPanel className="panel-class" />
            <SheetFooter className="footer-class" />
          </SheetPopup>
        </Sheet>,
      )
      expect(document.querySelector('[data-slot="sheet-header"]')?.className).toContain(
        "header-class",
      )
      expect(document.querySelector('[data-slot="sheet-panel"]')?.className).toContain(
        "panel-class",
      )
      expect(document.querySelector('[data-slot="sheet-footer"]')?.className).toContain(
        "footer-class",
      )
    })
  })

  describe("sides", () => {
    it("opens from the right edge by default", () => {
      renderSheet()
      expect(screen.getByRole("dialog").className).toContain("rounded-l-overlay")
      expect(screen.getByRole("dialog").className).toContain("border-l")
      expect(document.querySelector('[data-slot="sheet-viewport"]')?.className).toContain(
        "justify-end",
      )
    })

    it("opens from the left edge", () => {
      renderSheet({ side: "left" })
      expect(screen.getByRole("dialog").className).toContain("rounded-r-overlay")
      expect(screen.getByRole("dialog").className).toContain("border-r")
      expect(document.querySelector('[data-slot="sheet-viewport"]')?.className).toContain(
        "justify-start",
      )
    })

    it("opens from the top edge", () => {
      renderSheet({ side: "top" })
      expect(screen.getByRole("dialog").className).toContain("rounded-b-overlay")
      expect(screen.getByRole("dialog").className).toContain("border-b")
      expect(document.querySelector('[data-slot="sheet-viewport"]')?.className).toContain(
        "flex-col",
      )
    })

    it("opens from the bottom edge", () => {
      renderSheet({ side: "bottom" })
      expect(screen.getByRole("dialog").className).toContain("rounded-t-overlay")
      expect(screen.getByRole("dialog").className).toContain("border-t")
      expect(document.querySelector('[data-slot="sheet-viewport"]')?.className).toContain(
        "justify-end",
      )
    })

    it("applies the inset floating treatment on desktop screens", () => {
      renderSheet({ variant: "inset" })
      const popup = screen.getByRole("dialog")
      expect(popup.className).toContain("sm:rounded-overlay")
      expect(document.querySelector('[data-slot="sheet-viewport"]')?.className).toContain(
        "sm:p-3xl",
      )
    })
  })

  describe("footer-variant", () => {
    it("renders a separated footer surface by default", () => {
      renderSheet()
      const footer = document.querySelector('[data-slot="sheet-footer"]')
      expect(footer?.className).toContain("border-t")
      expect(footer?.className).toContain("bg-neutral-50")
    })

    it("renders a bare footer without the separated surface", () => {
      render(
        <Sheet open>
          <SheetPopup>
            <SheetFooter variant="bare">
              <button type="button">Save</button>
            </SheetFooter>
          </SheetPopup>
        </Sheet>,
      )
      const footer = document.querySelector('[data-slot="sheet-footer"]')
      expect(footer?.className).not.toContain("border-t")
      expect(footer?.className).toContain("pt-3xl")
    })
  })

  describe("close-button", () => {
    it("renders a close button with an accessible name by default", () => {
      renderSheet()
      expect(screen.getByRole("button", { name: "Close" })).toBeDefined()
    })

    it("omits the close button when showCloseButton is disabled", () => {
      renderSheet({ showCloseButton: false })
      expect(screen.queryByRole("button", { name: "Close" })).toBeNull()
    })

    it("closes the sheet when the close button is clicked", async () => {
      const onOpenChange = vi.fn()
      render(
        <Sheet onOpenChange={onOpenChange} open>
          <SheetPopup>
            <SheetTitle>Settings</SheetTitle>
          </SheetPopup>
        </Sheet>,
      )
      await userEvent.click(screen.getByRole("button", { name: "Close" }))
      expect(onOpenChange.mock.calls[0]?.[0]).toBe(false)
    })
  })
})
