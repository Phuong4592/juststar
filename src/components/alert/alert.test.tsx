// Contract coverage: renders-content, variants, class-name
import { render, screen } from "@testing-library/react"

import { Alert, alertVariants, AlertAction, AlertDescription, AlertTitle } from "./alert"

describe("Alert", () => {
  it("is exported", () => {
    expect(Alert).toBeDefined()
    expect(AlertTitle).toBeDefined()
    expect(AlertDescription).toBeDefined()
    expect(AlertAction).toBeDefined()
  })

  describe("renders-content", () => {
    it("renders the root with the alert role", () => {
      render(
        <Alert>
          <AlertTitle>Heads up!</AlertTitle>
        </Alert>,
      )
      expect(screen.getByRole("alert")).toBeDefined()
      expect(screen.getByText("Heads up!")).toBeDefined()
    })

    it("renders title, description, and action parts", () => {
      render(
        <Alert>
          <AlertTitle>Heads up!</AlertTitle>
          <AlertDescription>Details here.</AlertDescription>
          <AlertAction>Act</AlertAction>
        </Alert>,
      )
      expect(screen.getByText("Details here.").closest("[data-slot=alert]")).toBeDefined()
      expect(screen.getByText("Act").closest("[data-slot=alert]")).toBeDefined()
    })

    it("passes through native attributes", () => {
      render(
        <Alert data-testid="custom">
          <AlertTitle>Heads up!</AlertTitle>
        </Alert>,
      )
      expect(screen.getByRole("alert")).toHaveAttribute("data-testid", "custom")
    })
  })

  describe("class-name", () => {
    it("applies consumer className to the root element", () => {
      render(
        <Alert className="custom-class">
          <AlertTitle>Heads up!</AlertTitle>
        </Alert>,
      )
      expect(screen.getByRole("alert").className).toContain("custom-class")
    })

    it("applies consumer className to subcomponents", () => {
      render(<AlertTitle className="custom-title">Title</AlertTitle>)
      expect(screen.getByText("Title").className).toContain("custom-title")
    })

    it("lays the root out as an adaptive grid", () => {
      render(<Alert>Heads up!</Alert>)
      const cls = screen.getByRole("alert").className
      expect(cls).toContain("grid")
      expect(cls).toContain("grid-cols-[1fr]")
      expect(cls).toContain("has-[>svg]:grid-cols-[auto_1fr]")
      expect(cls).toContain("has-data-[slot=alert-action]:grid-cols-[1fr_auto]")
    })

    it("moves text content next to a leading icon and sizes bare icons", () => {
      render(
        <Alert>
          <span data-testid="icon" />
          <AlertTitle>Heads up!</AlertTitle>
          <AlertDescription>Details</AlertDescription>
        </Alert>,
      )
      expect(screen.getByText("Heads up!").className).toContain("[svg~&]:col-start-2")
      expect(screen.getByText("Details").className).toContain("[svg~&]:col-start-2")
    })

    it("pins actions to the end, vertically centered", () => {
      render(
        <Alert>
          <AlertAction>Act</AlertAction>
        </Alert>,
      )
      const cls = screen.getByText("Act").className
      expect(cls).toContain("self-center")
      expect(cls).toContain("justify-self-end")
      expect(cls).toContain("[svg~&]:col-start-3")
    })
  })

  describe("variants", () => {
    it("defaults to default variant", () => {
      render(<Alert>Heads up!</Alert>)
      const alert = screen.getByRole("alert")
      expect(alert.className).toContain("bg-surface")
      expect(alert.className).toContain("text-neutral-900")
    })

    it("applies info variant", () => {
      render(<Alert variant="info">Heads up!</Alert>)
      const alert = screen.getByRole("alert")
      expect(alert.className).toContain("bg-info-25")
      expect(alert.className).toContain("border-info-200")
      expect(alert.className).toContain("text-info-900")
    })

    it("applies success variant", () => {
      render(<Alert variant="success">Saved</Alert>)
      const alert = screen.getByRole("alert")
      expect(alert.className).toContain("bg-success-25")
      expect(alert.className).toContain("border-success-200")
      expect(alert.className).toContain("text-success-900")
    })

    it("applies warning variant", () => {
      render(<Alert variant="warning">Careful</Alert>)
      const alert = screen.getByRole("alert")
      expect(alert.className).toContain("bg-warning-25")
      expect(alert.className).toContain("border-warning-200")
      expect(alert.className).toContain("text-warning-900")
    })

    it("applies error variant", () => {
      render(<Alert variant="error">Failed</Alert>)
      const alert = screen.getByRole("alert")
      expect(alert.className).toContain("bg-error-25")
      expect(alert.className).toContain("border-error-200")
      expect(alert.className).toContain("text-error-900")
    })

    it("colors the description from the variant", () => {
      render(
        <Alert variant="error">
          <AlertDescription>Details</AlertDescription>
        </Alert>,
      )
      expect(screen.getByText("Details").className).toContain("text-error-800")
    })

    it("exports alertVariants as a callable function", () => {
      expect(alertVariants).toBeInstanceOf(Function)
      expect(alertVariants({ variant: "info" }).root()).toContain("bg-info-25")
    })
  })

  describe("preserve-semantics", () => {
    it("keeps the alert role when variant changes", () => {
      render(<Alert variant="error">Failed</Alert>)
      expect(screen.getByRole("alert")).toBeDefined()
    })
  })
})
