// Contract coverage: renders, class-name, label-association, invalid, disabled, validity
import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import {
  Field,
  FieldDescription,
  FieldError,
  FieldItem,
  FieldLabel,
  FieldControl,
  FieldValidity,
  fieldVariants,
} from "./field"

function BasicField() {
  return (
    <Field>
      <FieldLabel>Email</FieldLabel>
      <FieldControl name="email" type="email" placeholder="you@example.com" />
      <FieldDescription>Used for account notifications.</FieldDescription>
    </Field>
  )
}

describe("Field", () => {
  it("is exported", () => {
    expect(Field).toBeDefined()
    expect(FieldLabel).toBeDefined()
    expect(FieldItem).toBeDefined()
    expect(FieldDescription).toBeDefined()
    expect(FieldError).toBeDefined()
    expect(FieldControl).toBeDefined()
  })

  describe("renders", () => {
    it("renders field parts with data-slot attributes", () => {
      render(
        <Field>
          <FieldLabel>Name</FieldLabel>
          <FieldItem>
            <FieldControl />
          </FieldItem>
          <FieldDescription>Visible on your profile.</FieldDescription>
          <FieldError>Required.</FieldError>
        </Field>,
      )

      expect(document.querySelector('[data-slot="field-root"]')).not.toBeNull()
      expect(screen.getByText("Name")).toHaveAttribute("data-slot", "field-label")
      expect(document.querySelector('[data-slot="field-item"]')).not.toBeNull()
      expect(screen.getByText("Visible on your profile.")).toHaveAttribute(
        "data-slot",
        "field-description",
      )
    })

    it("renders the root as a div with a flex column layout", () => {
      render(<BasicField />)

      const root = document.querySelector('[data-slot="field-root"]')

      expect(root?.tagName).toBe("DIV")
      expect(root?.className).toContain("flex-col")
    })

    it("renders the label as a label element and the control as an input", () => {
      render(<BasicField />)

      expect(screen.getByText("Email").tagName).toBe("LABEL")
      expect(screen.getByPlaceholderText("you@example.com").tagName).toBe("INPUT")
    })
  })

  describe("class-name", () => {
    it("merges consumer className into the root", () => {
      render(<Field className="custom-root">{null}</Field>)

      const root = document.querySelector('[data-slot="field-root"]')

      expect(root?.className).toContain("custom-root")
      expect(root?.className).toContain("gap-md")
    })

    it("merges consumer className into the label", () => {
      render(
        <Field>
          <FieldLabel className="custom-label">Email</FieldLabel>
        </Field>,
      )

      const label = screen.getByText("Email")

      expect(label.className).toContain("custom-label")
      expect(label.className).toContain("font-medium")
    })

    it("keeps token-derived classes on the description and error", () => {
      render(
        <Field invalid>
          <FieldDescription>Help text.</FieldDescription>
          <FieldError match>Enter a valid value.</FieldError>
        </Field>,
      )

      expect(screen.getByText("Help text.").className).toContain("text-neutral-500")
      expect(screen.getByText("Enter a valid value.").className).toContain("text-error-600")
    })
  })

  describe("label-association", () => {
    it("associates the label with the control without explicit ids", () => {
      render(<BasicField />)

      expect(screen.getByLabelText("Email")).toBe(screen.getByPlaceholderText("you@example.com"))
    })

    it("marks the label as a description of the control via aria-describedby", () => {
      render(<BasicField />)

      const control = screen.getByPlaceholderText("you@example.com")
      const describedBy = control.getAttribute("aria-describedby")

      expect(describedBy).toBeTruthy()
      expect(screen.getByText("Used for account notifications.").id).toBe(
        describedBy?.split(" ").at(-1),
      )
    })
  })

  describe("invalid", () => {
    it("renders FieldError with match when the field is invalid", () => {
      render(
        <Field invalid>
          <FieldControl />
          <FieldError match>Enter a valid email address.</FieldError>
        </Field>,
      )

      expect(screen.getByText("Enter a valid email address.")).not.toBeNull()
    })

    it("hides FieldError when the field is not invalid", () => {
      render(
        <Field>
          <FieldControl />
          <FieldError>Enter a valid email address.</FieldError>
        </Field>,
      )

      expect(screen.queryByText("Enter a valid email address.")).toBeNull()
    })

    it("exposes invalid state data attributes on the root", () => {
      render(
        <Field invalid>
          <FieldControl />
        </Field>,
      )

      expect(document.querySelector('[data-slot="field-root"]')).toHaveAttribute("data-invalid")
    })
  })

  describe("disabled", () => {
    it("propagates disabled from the root to the control", () => {
      render(
        <Field disabled>
          <FieldLabel>Email</FieldLabel>
          <FieldControl />
        </Field>,
      )

      expect(screen.getByLabelText("Email")).toBeDisabled()
    })

    it("does not disable the control by default", () => {
      render(
        <Field>
          <FieldLabel>Email</FieldLabel>
          <FieldControl />
        </Field>,
      )

      expect(screen.getByLabelText("Email")).not.toBeDisabled()
    })

    it("exposes disabled state data attributes on the root", () => {
      render(
        <Field disabled>
          <FieldControl />
        </Field>,
      )

      expect(document.querySelector('[data-slot="field-root"]')).toHaveAttribute("data-disabled")
    })
  })

  describe("validity", () => {
    it("passes validity state to the FieldValidity render prop", () => {
      render(
        <Field>
          <FieldLabel>Email</FieldLabel>
          <FieldControl type="email" defaultValue="team@example.com" />
          <FieldValidity>{(state) => <p>{Object.keys(state.validity).join(" ")}</p>}</FieldValidity>
        </Field>,
      )

      const text = screen.getByText(/valueMissing/).textContent ?? ""

      expect(text).toContain("valid")
      expect(text).toContain("typeMismatch")
    })
  })

  it("exports fieldVariants with root, label, description, and error slots", () => {
    const v = fieldVariants()

    expect(v.root()).toContain("flex-col")
    expect(v.label()).toContain("text-neutral-900")
    expect(v.item()).toContain("flex")
    expect(v.description()).toContain("text-neutral-500")
    expect(v.error()).toContain("text-error-600")
  })
})
