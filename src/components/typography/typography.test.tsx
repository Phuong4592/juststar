// Contract coverage: renders, class-name, compound-semantics, compact-scale, nunito-default, purposeful-mono
import { render, screen } from "@testing-library/react"

import { Typography } from "./typography"

describe("Typography", () => {
  it("renders compound-semantics with the documented heading outline", () => {
    render(
      <>
        <Typography.H1>Page title</Typography.H1>
        <Typography.H2>Section title</Typography.H2>
        <Typography.Text>Body copy</Typography.Text>
        <Typography.Caption>Updated recently</Typography.Caption>
      </>,
    )

    expect(screen.getByRole("heading", { level: 1, name: "Page title" })).toBeInTheDocument()
    expect(screen.getByRole("heading", { level: 2, name: "Section title" })).toBeInTheDocument()
    expect(screen.getByText("Body copy").tagName).toBe("P")
    expect(screen.getByText("Updated recently").tagName).toBe("SPAN")
  })

  it("uses the compact-scale and nunito-default", () => {
    render(<Typography.H1>Compact heading</Typography.H1>)

    expect(screen.getByRole("heading", { name: "Compact heading" })).toHaveClass(
      "font-sans",
      "text-heading-1",
      "font-semibold",
    )
  })

  it("reserves purposeful-mono styles for machine-oriented presets", () => {
    render(
      <>
        <Typography.Text>INC-4821 · 10:42 UTC · $1.84M</Typography.Text>
        <Typography.Mono>src/components/typography/typography.tsx</Typography.Mono>
        <Typography.Code>pnpm check</Typography.Code>
      </>,
    )

    expect(screen.getByText("INC-4821 · 10:42 UTC · $1.84M")).not.toHaveClass("font-mono")
    expect(screen.getByText("src/components/typography/typography.tsx")).toHaveClass("font-mono")
    expect(screen.getByText("pnpm check").tagName).toBe("CODE")
  })

  it("merges a class-name on the root escape hatch", () => {
    render(
      <Typography.Root className="text-brand-700" variant="label/md">
        Status
      </Typography.Root>,
    )

    expect(screen.getByText("Status")).toHaveClass("text-brand-700")
  })
})
