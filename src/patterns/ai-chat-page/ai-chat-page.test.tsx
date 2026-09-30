// Contract coverage: page-heading, conversation-log, bounded-status, busy-state, empty-state, panel-bottom-composer, keyboard-scrollable-log
import { render, screen } from "@testing-library/react"

import { AIChatPage } from "./ai-chat-page"

describe("AIChatPage", () => {
  it("provides the page-heading and conversation-log", () => {
    render(
      <AIChatPage
        composer={<textarea aria-label="Prompt" />}
        messages={<p>Hello</p>}
        title="Assistant"
      />,
    )
    expect(screen.getByRole("heading", { level: 1, name: "Assistant" })).toBeInTheDocument()
    expect(screen.getByRole("log")).toHaveAttribute("aria-live", "off")
  })

  it("uses a bounded-status announcement and busy-state", () => {
    render(
      <AIChatPage
        busy
        composer={<textarea aria-label="Prompt" />}
        messages={<p>Working</p>}
        status="Drafting response"
        title="Assistant"
      />,
    )
    expect(screen.getByRole("status")).toHaveTextContent("Drafting response")
    expect(screen.getByRole("log")).toHaveAttribute("aria-busy", "true")
  })

  it("renders the empty-state before messages exist", () => {
    render(
      <AIChatPage
        composer={<textarea aria-label="Prompt" />}
        emptyState={<p>Ask about this project</p>}
        title="Assistant"
      />,
    )
    expect(screen.getByText("Ask about this project").parentElement).toHaveAttribute(
      "data-en-part",
      "ai-chat-page-empty",
    )
    expect(screen.queryByRole("log")).not.toBeInTheDocument()
  })

  it("keeps the panel-bottom-composer visible while the message region owns scrolling", () => {
    render(
      <AIChatPage
        composer={<textarea aria-label="Prompt" />}
        messages={<p>Long conversation</p>}
        title="Assistant"
      />,
    )

    const root = screen.getByRole("region", { name: "Assistant" })
    const log = screen.getByRole("log")
    const scrollRegion = screen.getByRole("region", { name: "Conversation history" })
    const composer = screen
      .getByLabelText("Prompt")
      .closest("[data-en-part='ai-chat-page-composer']")

    expect(root).toHaveClass("h-(--ai-chat-page-height)", "min-h-0", "overflow-hidden")
    expect(scrollRegion).toBe(log.parentElement)
    expect(scrollRegion).toHaveAttribute("tabindex", "0")
    expect(scrollRegion).toHaveClass("min-h-0", "flex-1", "overflow-y-auto")
    expect(composer).toHaveClass("sticky", "bottom-0", "shrink-0")
    expect(composer).not.toHaveClass("fixed")
  })
})
