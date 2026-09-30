// Contract coverage: renders, class-name, footer-variant, close-button
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"

import {
  Dialog,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPanel,
  DialogPopup,
  DialogTitle,
  dialogVariants,
} from "./dialog"

function renderDialog(popupProps: Record<string, unknown> = {}) {
  render(
    <Dialog open>
      <DialogPopup {...popupProps}>
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription>Change your preferences</DialogDescription>
        </DialogHeader>
        <DialogPanel>Body content</DialogPanel>
        <DialogFooter>
          <button type="button">Save</button>
        </DialogFooter>
      </DialogPopup>
    </Dialog>,
  )
}

describe("Dialog", () => {
  it("is exported", () => {
    expect(Dialog).toBeDefined()
    expect(DialogPopup).toBeDefined()
    expect(dialogVariants).toBeInstanceOf(Function)
  })

  describe("renders", () => {
    it("renders a dialog with title and description", () => {
      renderDialog()
      expect(screen.getByRole("dialog", { name: "Settings" })).toBeDefined()
      expect(screen.getByText("Change your preferences")).toBeDefined()
    })

    it("renders the header, panel, and footer parts", () => {
      renderDialog()
      expect(screen.getByText("Body content").closest('[data-slot="dialog-panel"]')).not.toBeNull()
      expect(document.querySelector('[data-slot="dialog-header"]')).not.toBeNull()
      expect(document.querySelector('[data-slot="dialog-footer"]')).not.toBeNull()
      expect(document.querySelector('[data-slot="dialog-backdrop"]')).not.toBeNull()
    })

    it("keeps the token-based popup surface classes", () => {
      renderDialog()
      const popup = screen.getByRole("dialog")
      expect(popup.className).toContain("bg-surface")
      expect(popup.className).toContain("rounded-overlay")
      expect(popup.className).toContain("shadow-overlay")
    })

    it("applies the bottom-stick mobile layout classes by default", () => {
      renderDialog()
      expect(document.querySelector('[data-slot="dialog-viewport"]')?.className).toContain(
        "max-sm:grid-rows-[1fr_auto]",
      )
      expect(screen.getByRole("dialog").className).toContain("max-sm:origin-bottom")
    })

    it("keeps the centered desktop layout when bottomStickOnMobile is disabled", () => {
      renderDialog({ bottomStickOnMobile: false })
      expect(document.querySelector('[data-slot="dialog-viewport"]')?.className).not.toContain(
        "max-sm:grid-rows-[1fr_auto]",
      )
      expect(screen.getByRole("dialog").className).not.toContain("max-sm:origin-bottom")
    })
  })

  describe("class-name", () => {
    it("merges consumer className with protected popup classes", () => {
      renderDialog({ className: "custom-class" })
      const popup = screen.getByRole("dialog")
      expect(popup.className).toContain("custom-class")
      expect(popup.className).toContain("bg-surface")
    })

    it("merges consumer className on the header, panel, and footer", () => {
      render(
        <Dialog open>
          <DialogPopup>
            <DialogHeader className="header-class" />
            <DialogPanel className="panel-class" />
            <DialogFooter className="footer-class" />
          </DialogPopup>
        </Dialog>,
      )
      expect(document.querySelector('[data-slot="dialog-header"]')?.className).toContain(
        "header-class",
      )
      expect(document.querySelector('[data-slot="dialog-panel"]')?.className).toContain(
        "panel-class",
      )
      expect(document.querySelector('[data-slot="dialog-footer"]')?.className).toContain(
        "footer-class",
      )
    })
  })

  describe("footer-variant", () => {
    it("renders a separated footer surface by default", () => {
      renderDialog()
      const footer = document.querySelector('[data-slot="dialog-footer"]')
      expect(footer?.className).toContain("border-t")
      expect(footer?.className).toContain("bg-neutral-50")
    })

    it("renders a bare footer without the separated surface", () => {
      render(
        <Dialog open>
          <DialogPopup>
            <DialogFooter variant="bare">
              <button type="button">Save</button>
            </DialogFooter>
          </DialogPopup>
        </Dialog>,
      )
      const footer = document.querySelector('[data-slot="dialog-footer"]')
      expect(footer?.className).not.toContain("border-t")
      expect(footer?.className).toContain("pt-3xl")
    })
  })

  describe("close-button", () => {
    it("renders a close button with an accessible name by default", () => {
      renderDialog()
      expect(screen.getByRole("button", { name: "Close" })).toBeDefined()
    })

    it("omits the close button when showCloseButton is disabled", () => {
      renderDialog({ showCloseButton: false })
      expect(screen.queryByRole("button", { name: "Close" })).toBeNull()
    })

    it("closes the dialog when the close button is clicked", async () => {
      const onOpenChange = vi.fn()
      render(
        <Dialog onOpenChange={onOpenChange} open>
          <DialogPopup>
            <DialogTitle>Settings</DialogTitle>
          </DialogPopup>
        </Dialog>,
      )
      await userEvent.click(screen.getByRole("button", { name: "Close" }))
      expect(onOpenChange.mock.calls[0]?.[0]).toBe(false)
    })
  })
})
