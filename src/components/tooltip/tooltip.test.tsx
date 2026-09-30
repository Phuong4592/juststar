// Contract coverage: renders, class-name
import type { ComponentType } from "react"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"

import {
  Tooltip,
  TooltipCreateHandle,
  TooltipPopup,
  TooltipProvider,
  TooltipRoot,
  TooltipTrigger,
  tooltipVariants,
} from "./tooltip"

describe("Tooltip", () => {
  it("is exported", () => {
    expect(Tooltip).toBeDefined()
  })

  describe("renders", () => {
    it("renders the trigger button", () => {
      render(<Tooltip popup="Open settings" trigger={<button type="button">Settings</button>} />)
      expect(screen.getByRole("button", { name: "Settings" })).toBeDefined()
    })

    it("renders a default button trigger for a plain string trigger", () => {
      render(<Tooltip popup="Hint" trigger="Settings" />)
      expect(screen.getByRole("button", { name: "Settings" })).toBeDefined()
    })

    it("renders the trigger as the provided element", () => {
      render(<Tooltip popup="Hint" trigger={<a href="/settings">Settings</a>} />)
      expect(screen.getByRole("link", { name: "Settings" })).toBeDefined()
    })

    it("shows the popup content on hover", async () => {
      const user = userEvent.setup()
      render(<Tooltip popup="Open settings" trigger={<button type="button">Settings</button>} />)
      await user.hover(screen.getByRole("button", { name: "Settings" }))
      expect(await screen.findByText("Open settings")).toBeDefined()
    })

    it("hides the popup content initially", () => {
      render(<Tooltip popup="Open settings" trigger={<button type="button">Settings</button>} />)
      expect(screen.queryByText("Open settings")).toBeNull()
    })

    it("shows the popup content on keyboard focus", async () => {
      const user = userEvent.setup()
      render(<Tooltip popup="Open settings" trigger={<button type="button">Settings</button>} />)
      await user.tab()
      expect(await screen.findByText("Open settings")).toBeDefined()
    })
  })

  describe("class-name", () => {
    it("applies consumer classNames to the popup and positioner", async () => {
      const user = userEvent.setup()
      render(
        <Tooltip
          classNames={{ popup: "custom-popup", positioner: "custom-positioner" }}
          popup="Open settings"
          trigger={<button type="button">Settings</button>}
        />,
      )
      await user.hover(screen.getByRole("button", { name: "Settings" }))
      await screen.findByText("Open settings")
      expect(document.querySelector('[data-slot="tooltip-positioner"]')?.className).toContain(
        "custom-positioner",
      )
      expect(document.querySelector('[data-slot="tooltip-popup"]')?.className).toContain(
        "custom-popup",
      )
    })

    it("preserves token classes alongside consumer classNames", async () => {
      const user = userEvent.setup()
      render(
        <Tooltip
          classNames={{ popup: "custom-popup" }}
          popup="Open settings"
          trigger={<button type="button">Settings</button>}
        />,
      )
      await user.hover(screen.getByRole("button", { name: "Settings" }))
      await screen.findByText("Open settings")
      const popup = document.querySelector('[data-slot="tooltip-popup"]')
      expect(popup?.className).toContain("custom-popup")
      expect(popup?.className).toContain("bg-surface")
      expect(popup?.className).toContain("rounded-control")
    })

    it("exposes tooltipVariants as a callable function", () => {
      expect(tooltipVariants).toBeInstanceOf(Function)
      const result = tooltipVariants()
      expect(result.popup()).toContain("bg-surface")
      expect(result.positioner()).toContain("z-50")
    })
  })

  describe("placement", () => {
    it("defaults to top side and center align", async () => {
      const user = userEvent.setup()
      render(<Tooltip popup="Hint" trigger={<button type="button">Settings</button>} />)
      await user.hover(screen.getByRole("button", { name: "Settings" }))
      await screen.findByText("Hint")
      const positioner = document.querySelector('[data-slot="tooltip-positioner"]')
      expect(positioner?.getAttribute("data-side")).toBe("top")
      expect(positioner?.getAttribute("data-align")).toBe("center")
    })

    it("applies align prop to the positioner", async () => {
      const user = userEvent.setup()
      render(
        <Tooltip align="start" popup="Hint" trigger={<button type="button">Settings</button>} />,
      )
      await user.hover(screen.getByRole("button", { name: "Settings" }))
      await screen.findByText("Hint")
      expect(
        document.querySelector('[data-slot="tooltip-positioner"]')?.getAttribute("data-align"),
      ).toBe("start")
    })
  })

  describe("grouped", () => {
    it("shows each tooltip inside a shared provider", async () => {
      const user = userEvent.setup()
      render(
        <TooltipProvider>
          <Tooltip popup="First" trigger={<button type="button">One</button>} />
          <Tooltip popup="Second" trigger={<button type="button">Two</button>} />
        </TooltipProvider>,
      )
      await user.hover(screen.getByRole("button", { name: "One" }))
      expect(await screen.findByText("First")).toBeDefined()
      await user.hover(screen.getByRole("button", { name: "Two" }))
      expect(await screen.findByText("Second")).toBeDefined()
    })
  })

  describe("animated", () => {
    type Payload = ComponentType

    function AlphaContent() {
      return <span>Alpha content</span>
    }
    function BetaContent() {
      return <span>Beta content</span>
    }

    function AnimatedFixture() {
      const handle = TooltipCreateHandle<Payload>()
      return (
        <TooltipProvider>
          <TooltipTrigger
            aria-label="Alpha"
            handle={handle}
            payload={AlphaContent}
            render={<button type="button" />}
          />
          <TooltipTrigger
            aria-label="Beta"
            handle={handle}
            payload={BetaContent}
            render={<button type="button" />}
          />
          <TooltipRoot handle={handle}>
            {({ payload: Payload }) => (
              <TooltipPopup>{Payload != null && <Payload />}</TooltipPopup>
            )}
          </TooltipRoot>
        </TooltipProvider>
      )
    }

    it("renders one shared popup with the active trigger payload", async () => {
      const user = userEvent.setup()
      render(<AnimatedFixture />)
      await user.hover(screen.getByRole("button", { name: "Alpha" }))
      expect(await screen.findByText("Alpha content")).toBeDefined()
      await user.hover(screen.getByRole("button", { name: "Beta" }))
      expect(await screen.findByText("Beta content")).toBeDefined()
      expect(screen.queryByText("Alpha content")).toBeNull()
    })

    it("exposes TooltipTrigger with the trigger data-slot", () => {
      render(
        <TooltipProvider>
          <TooltipRoot>
            <TooltipTrigger>Plain</TooltipTrigger>
          </TooltipRoot>
        </TooltipProvider>,
      )
      expect(screen.getByRole("button", { name: "Plain" }).getAttribute("data-slot")).toBe(
        "tooltip-trigger",
      )
    })

    it("applies consumer className to TooltipPopup", async () => {
      const user = userEvent.setup()
      render(
        <TooltipProvider>
          <TooltipRoot>
            <TooltipTrigger>Info</TooltipTrigger>
            <TooltipPopup className="custom-popup">Popup hint</TooltipPopup>
          </TooltipRoot>
        </TooltipProvider>,
      )
      await user.hover(screen.getByRole("button", { name: "Info" }))
      await screen.findByText("Popup hint")
      const popup = document.querySelector('[data-slot="tooltip-popup"]')
      expect(popup?.className).toContain("custom-popup")
      expect(popup?.className).toContain("bg-surface")
      const viewport = document.querySelector('[data-slot="tooltip-viewport"]')
      expect(viewport?.className).toContain("overflow-clip")
    })
  })
})
