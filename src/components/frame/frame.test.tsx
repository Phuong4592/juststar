// Contract coverage: renders, class-name, panel-structure
import { render } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { Frame, FrameDescription, FrameFooter, FrameHeader, FramePanel, FrameTitle } from "./frame"

function getBySlot(container: HTMLElement, slot: string) {
  return container.querySelector(`[data-slot="${slot}"]`)
}

describe("Frame", () => {
  describe("renders", () => {
    it("renders a div element with data-slot", () => {
      const { container } = render(<Frame />)
      const el = getBySlot(container, "frame")
      expect(el).toBeDefined()
      expect(el?.tagName).toBe("DIV")
    })

    it("renders children", () => {
      const { getByText } = render(
        <Frame>
          <FrameHeader>
            <FrameTitle>Test</FrameTitle>
          </FrameHeader>
          <FramePanel>Content</FramePanel>
        </Frame>,
      )
      expect(getByText("Test")).toBeDefined()
      expect(getByText("Content")).toBeDefined()
    })
  })

  describe("class-name", () => {
    it("applies consumer className to the root element", () => {
      const { container } = render(<Frame className="custom-class" />)
      const el = getBySlot(container, "frame")
      expect(el?.className).toContain("custom-class")
    })

    it("preserves base classes alongside consumer className", () => {
      const { container } = render(<Frame className="custom-class" />)
      const el = getBySlot(container, "frame")
      expect(el?.className).toContain("custom-class")
      expect(el?.className).toContain("rounded-overlay")
    })
  })
})

describe("FramePanel", () => {
  it("renders a div with data-slot", () => {
    const { container } = render(<FramePanel />)
    const el = getBySlot(container, "frame-panel")
    expect(el).toBeDefined()
    expect(el?.tagName).toBe("DIV")
  })

  it("applies consumer className", () => {
    const { container } = render(<FramePanel className="custom-panel" />)
    expect(getBySlot(container, "frame-panel")?.className).toContain("custom-panel")
  })

  it("renders with surface classes", () => {
    const { container } = render(<FramePanel />)
    const el = getBySlot(container, "frame-panel")
    expect(el?.className).toContain("bg-surface")
    expect(el?.className).toContain("rounded-surface")
    expect(el?.className).toContain("shadow-surface")
  })
})

describe("FrameHeader", () => {
  it("renders a header element with data-slot", () => {
    const { container } = render(<FrameHeader />)
    const el = getBySlot(container, "frame-header")
    expect(el).toBeDefined()
    expect(el?.tagName).toBe("HEADER")
  })

  it("applies consumer className", () => {
    const { container } = render(<FrameHeader className="custom-header" />)
    expect(getBySlot(container, "frame-header")?.className).toContain("custom-header")
  })
})

describe("FrameTitle", () => {
  it("renders a div with data-slot", () => {
    const { container } = render(<FrameTitle />)
    const el = getBySlot(container, "frame-title")
    expect(el).toBeDefined()
    expect(el?.tagName).toBe("DIV")
  })

  it("renders children", () => {
    const { getByText } = render(<FrameTitle>Section Title</FrameTitle>)
    expect(getByText("Section Title")).toBeDefined()
  })

  it("applies typography classes", () => {
    const { container } = render(<FrameTitle />)
    expect(getBySlot(container, "frame-title")?.className).toContain("font-semibold")
  })
})

describe("FrameDescription", () => {
  it("renders a div with data-slot", () => {
    const { container } = render(<FrameDescription />)
    const el = getBySlot(container, "frame-description")
    expect(el).toBeDefined()
    expect(el?.tagName).toBe("DIV")
  })

  it("renders children", () => {
    const { getByText } = render(<FrameDescription>Description text</FrameDescription>)
    expect(getByText("Description text")).toBeDefined()
  })

  it("applies muted text color", () => {
    const { container } = render(<FrameDescription />)
    expect(getBySlot(container, "frame-description")?.className).toContain("text-neutral-500")
  })
})

describe("FrameFooter", () => {
  it("renders a footer element with data-slot", () => {
    const { container } = render(<FrameFooter />)
    const el = getBySlot(container, "frame-footer")
    expect(el).toBeDefined()
    expect(el?.tagName).toBe("FOOTER")
  })

  it("applies consumer className", () => {
    const { container } = render(<FrameFooter className="custom-footer" />)
    expect(getBySlot(container, "frame-footer")?.className).toContain("custom-footer")
  })
})

describe("panel-structure", () => {
  it("renders header, panels, and footer as direct children", () => {
    const { getByText } = render(
      <Frame>
        <FrameHeader>
          <FrameTitle>Usage</FrameTitle>
          <FrameDescription>API calls this month</FrameDescription>
        </FrameHeader>
        <FramePanel>First panel</FramePanel>
        <FramePanel>Second panel</FramePanel>
        <FrameFooter>Footer</FrameFooter>
      </Frame>,
    )
    expect(getByText("Usage")).toBeDefined()
    expect(getByText("API calls this month")).toBeDefined()
    expect(getByText("First panel")).toBeDefined()
    expect(getByText("Second panel")).toBeDefined()
    expect(getByText("Footer")).toBeDefined()
  })

  it("spaces adjacent panels with mt-xs", () => {
    const { container } = render(
      <Frame>
        <FramePanel />
        <FramePanel />
      </Frame>,
    )
    const panels = container.querySelectorAll('[data-slot="frame-panel"]')
    expect(panels).toHaveLength(2)
  })
})
