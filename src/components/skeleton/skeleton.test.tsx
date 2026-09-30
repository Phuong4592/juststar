// Contract coverage: renders, class-name
import { render } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { Skeleton } from "./skeleton"

function renderSkeleton(props: Record<string, unknown> = {}) {
  const { container } = render(<Skeleton {...props} />)
  return container.querySelector<HTMLElement>('[data-slot="skeleton"]')
}

describe("Skeleton", () => {
  it("is exported", () => {
    expect(Skeleton).toBeDefined()
  })

  describe("renders", () => {
    it("renders a div placeholder with the skeleton slot", () => {
      const skeleton = renderSkeleton()
      expect(skeleton?.tagName).toBe("DIV")
    })

    it("passes native div attributes through", () => {
      const skeleton = renderSkeleton({ "aria-hidden": true })
      expect(skeleton?.getAttribute("aria-hidden")).toBe("true")
    })

    it("keeps the token-based shimmer background and animation", () => {
      const className = renderSkeleton()?.className ?? ""
      expect(className).toContain("--color-neutral-100")
      expect(className).toContain("animate-skeleton")
      expect(className).toContain("rounded-control")
    })

    it("animates the background relative to the element, not the viewport", () => {
      const className = renderSkeleton()?.className ?? ""
      expect(className).not.toContain("_fixed")
    })

    it("disables the shimmer under reduced motion", () => {
      expect(renderSkeleton()?.className).toContain("motion-reduce:animate-none")
    })
  })

  describe("class-name", () => {
    it("merges consumer className with protected classes", () => {
      const className = renderSkeleton({ className: "custom-class" })?.className ?? ""
      expect(className).toContain("custom-class")
      expect(className).toContain("rounded-control")
      expect(className).toContain("animate-skeleton")
    })
  })
})
