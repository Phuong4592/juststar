// Contract coverage: workspace-heading, panel-labels, keyboard-resize, mobile-switcher, preview-state
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import { AIWorkspace } from "./ai-workspace"

describe("AIWorkspace", () => {
  it("provides the workspace-heading and panel-labels", () => {
    render(<AIWorkspace conversation="Conversation" preview="Artifact" title="Page generator" />)
    expect(screen.getByRole("heading", { level: 1, name: "Page generator" })).toBeInTheDocument()
    expect(screen.getByRole("tabpanel", { name: "Chat" })).toHaveTextContent("Conversation")
    expect(screen.getByRole("tabpanel", { name: "Preview" })).toHaveTextContent("Artifact")
  })

  it("supports keyboard-resize", async () => {
    const user = userEvent.setup()
    render(<AIWorkspace conversation="Conversation" preview="Artifact" title="Page generator" />)
    const separator = screen.getByRole("separator")
    expect(separator).toHaveAttribute("aria-valuenow", "38")
    separator.focus()
    await user.keyboard("{ArrowRight}")
    expect(separator).toHaveAttribute("aria-valuenow", "40")
    await user.keyboard("{End}")
    expect(separator).toHaveAttribute("aria-valuenow", "60")
  })

  it("supports the mobile-switcher without duplicating panels", async () => {
    const user = userEvent.setup()
    render(<AIWorkspace conversation="Conversation" preview="Artifact" title="Page generator" />)
    await user.click(screen.getByRole("tab", { name: "Preview" }))
    expect(screen.getByRole("tab", { name: "Preview" })).toHaveAttribute("aria-selected", "true")
    expect(screen.getByRole("tabpanel", { name: "Chat" })).toHaveClass("max-lg:hidden")
  })

  it("exposes the preview-state", () => {
    render(
      <AIWorkspace
        conversation="Conversation"
        preview="Preparing artifact"
        previewState="loading"
        title="Page generator"
      />,
    )
    expect(screen.getByRole("tabpanel", { name: "Preview" })).toHaveAttribute(
      "data-state",
      "loading",
    )
    expect(screen.getByRole("tabpanel", { name: "Preview" })).toHaveAttribute("aria-busy", "true")
  })
})
