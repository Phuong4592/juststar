// Contract coverage: renders, class-name, sizes, fallback
import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { Avatar, avatarVariants } from "./avatar"

describe("Avatar", () => {
  it("is exported", () => {
    expect(Avatar).toBeDefined()
  })

  describe("renders", () => {
    it("renders a non-interactive span root with all data slots", () => {
      const { container } = render(<Avatar fallback={{ children: "AL" }} />)
      const root = container.querySelector('[data-slot="avatar"]')

      expect(root?.tagName).toBe("SPAN")
      expect(root).not.toHaveAttribute("role")
      expect(container.querySelector('[data-slot="avatar-fallback"]')).toHaveTextContent("AL")
    })

    it("passes native props and refs to the root", () => {
      let root: HTMLSpanElement | null = null
      render(
        <Avatar
          data-testid="avatar"
          ref={(node) => {
            root = node
          }}
          title="Ada Lovelace"
        />,
      )

      expect(screen.getByTestId("avatar")).toHaveAttribute("title", "Ada Lovelace")
      expect(root).toBe(screen.getByTestId("avatar"))
    })
  })

  describe("class-name", () => {
    it("merges consumer classes on the root and fallback parts", () => {
      const { container } = render(
        <Avatar
          className="root-class"
          fallback={{ children: "AL", className: "fallback-class" }}
        />,
      )

      expect(container.querySelector('[data-slot="avatar"]')?.className).toContain("root-class")
      expect(container.querySelector('[data-slot="avatar-fallback"]')?.className).toContain(
        "fallback-class",
      )
    })

    it("passes image props to the mounted image", () => {
      const OriginalImage = window.Image
      class LoadedImage extends Image {
        complete = true
        naturalWidth = 64
      }
      window.Image = LoadedImage

      const { container } = render(
        <Avatar image={{ alt: "Ada Lovelace", className: "image-class", src: "avatar.png" }} />,
      )
      const image = container.querySelector('[data-slot="avatar-image"]')

      expect(image).toHaveAttribute("alt", "Ada Lovelace")
      expect(image).toHaveAttribute("src", "avatar.png")
      expect(image?.className).toContain("image-class")
      window.Image = OriginalImage
    })

    it("preserves token classes alongside consumer classes", () => {
      const { container } = render(<Avatar className="root-class" />)
      const root = container.querySelector('[data-slot="avatar"]')

      expect(root?.className).toContain("root-class")
      expect(root?.className).toContain("rounded-pill")
      expect(root?.className).toContain("bg-surface")
    })
  })

  describe("sizes", () => {
    it.each([
      [undefined, "size-6xl"],
      ["xs", "size-4xl"],
      ["sm", "size-5xl"],
      ["md", "size-6xl"],
      ["lg", "size-[2.5rem]"],
    ] as const)("applies %s size", (size, expectedClass) => {
      const { container } = render(<Avatar size={size} />)

      expect(container.querySelector('[data-slot="avatar"]')?.className).toContain(expectedClass)
    })

    it("exports avatarVariants with the default size", () => {
      expect(avatarVariants().root()).toContain("size-6xl")
    })
  })

  describe("fallback", () => {
    it("renders fallback content and passes fallback props", () => {
      const { container } = render(<Avatar fallback={{ children: "AL", title: "Initials" }} />)
      const fallback = container.querySelector('[data-slot="avatar-fallback"]')

      expect(fallback).toHaveTextContent("AL")
      expect(fallback).toHaveAttribute("title", "Initials")
      expect(fallback?.className).toContain("bg-neutral-100")
    })

    it("renders an empty fallback when fallback props are omitted", () => {
      const { container } = render(<Avatar />)

      expect(container.querySelector('[data-slot="avatar-fallback"]')).toBeEmptyDOMElement()
    })
  })
})
