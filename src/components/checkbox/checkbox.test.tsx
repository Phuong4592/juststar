// Contract coverage: renders, class-name, group-renders, group-class-name
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"

import { Checkbox, checkboxVariants } from "./checkbox"

describe("Checkbox", () => {
  it("is exported", () => {
    expect(Checkbox).toBeDefined()
  })

  describe("renders", () => {
    it("renders a checkbox role control", () => {
      render(<Checkbox aria-label="Subscribe" />)

      expect(screen.getByRole("checkbox", { name: "Subscribe" })).toHaveAttribute(
        "data-slot",
        "checkbox",
      )
    })

    it("toggles between checked and unchecked", async () => {
      const user = userEvent.setup()
      render(<Checkbox aria-label="Subscribe" />)
      const control = screen.getByRole("checkbox", { name: "Subscribe" })

      expect(control).toHaveAttribute("aria-checked", "false")
      await user.click(control)
      expect(control).toHaveAttribute("aria-checked", "true")
    })
  })

  describe("class-name", () => {
    it("applies consumer className to the root", () => {
      render(<Checkbox aria-label="Subscribe" className="custom-class" />)

      expect(screen.getByRole("checkbox", { name: "Subscribe" }).className).toContain(
        "custom-class",
      )
    })

    it("preserves token classes alongside consumer className", () => {
      render(<Checkbox aria-label="Subscribe" className="scale-125" />)
      const cls = screen.getByRole("checkbox", { name: "Subscribe" }).className

      expect(cls).toContain("rounded-control")
      expect(cls).toContain("border-neutral-300")
      expect(cls).toContain("bg-surface")
      expect(cls).toContain("shadow-surface")
    })
  })

  describe("group-renders", () => {
    it("renders Checkbox.Group as a named group wrapping checkboxes", () => {
      render(
        <Checkbox.Group aria-label="Notification channels">
          <Checkbox aria-label="Email" value="email" />
          <Checkbox aria-label="SMS" value="sms" />
        </Checkbox.Group>,
      )
      const group = screen.getByRole("group", { name: "Notification channels" })

      expect(group).toHaveAttribute("data-slot", "checkbox-group")
      expect(screen.getByRole("checkbox", { name: "Email" })).toBeDefined()
      expect(screen.getByRole("checkbox", { name: "SMS" })).toBeDefined()
    })

    it("shares toggled state within the group", async () => {
      const user = userEvent.setup()
      render(
        <Checkbox.Group defaultValue={["email"]}>
          <Checkbox aria-label="Email" value="email" />
          <Checkbox aria-label="SMS" value="sms" />
        </Checkbox.Group>,
      )
      const email = screen.getByRole("checkbox", { name: "Email" })
      const sms = screen.getByRole("checkbox", { name: "SMS" })

      expect(email).toHaveAttribute("aria-checked", "true")
      expect(sms).toHaveAttribute("aria-checked", "false")
      await user.click(sms)
      expect(sms).toHaveAttribute("aria-checked", "true")
    })
  })

  describe("group-class-name", () => {
    it("applies consumer className and keeps token layout classes", () => {
      render(
        <Checkbox.Group aria-label="Notification channels" className="custom-group">
          <Checkbox aria-label="Email" value="email" />
        </Checkbox.Group>,
      )
      const cls = screen.getByRole("group", { name: "Notification channels" }).className

      expect(cls).toContain("custom-group")
      expect(cls).toContain("flex-col")
      expect(cls).toContain("gap-xl")
    })
  })

  it("exports checkboxVariants with root and group slots", () => {
    expect(checkboxVariants().root()).toContain("rounded-control")
    expect(checkboxVariants().group()).toContain("gap-xl")
  })
})
