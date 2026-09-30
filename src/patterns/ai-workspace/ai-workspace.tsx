import type { ComponentProps, CSSProperties, KeyboardEvent, PointerEvent, ReactNode } from "react"
import { useId, useRef, useState } from "react"
import { cn, tv } from "../../tailwind-variants"

import { Typography, typographyVariants } from "../../components/typography"

const aiWorkspaceVariants = tv({
  slots: {
    mobileSwitcher: [
      "grid grid-cols-2 gap-sm border-b border-neutral-200",
      "bg-container p-sm lg:hidden",
    ],
    mobileTab: [
      "rounded-control px-md py-sm",
      typographyVariants({ variant: "label/md" }),
      "text-neutral-600 aria-selected:bg-neutral-100 aria-selected:text-neutral-900",
      "focus-visible:ring-2 focus-visible:ring-(--focus-ring-color) focus-visible:outline-none",
    ],
    panel: "min-h-0 min-w-0 overflow-auto bg-canvas",
    preview: "border-l border-neutral-200",
    root: [
      "grid min-h-(--ai-workspace-height) min-w-0 grid-cols-1 grid-rows-[auto_minmax(0,1fr)] overflow-hidden",
      "bg-canvas text-neutral-900 [--ai-workspace-conversation-size:38%] [--ai-workspace-height:calc(100svh-3.5rem)]",
      "lg:grid-cols-[var(--ai-workspace-conversation-size)_var(--space-sm)_minmax(0,1fr)] lg:grid-rows-1",
    ],
    separator: [
      "relative hidden cursor-col-resize bg-neutral-200 lg:block",
      "before:absolute before:inset-y-0 before:-left-(--space-sm) before:-right-(--space-sm) before:content-['']",
      "focus-visible:z-10 focus-visible:bg-(--focus-ring-color) focus-visible:outline-none",
    ],
    title: "sr-only",
  },
})

export interface AIWorkspaceProps extends Omit<ComponentProps<"section">, "title"> {
  conversation: ReactNode
  conversationLabel?: string
  defaultConversationSize?: number
  defaultMobileView?: "conversation" | "preview"
  maxConversationSize?: number
  minConversationSize?: number
  preview: ReactNode
  previewLabel?: string
  previewState?: "ready" | "loading" | "empty" | "error"
  title: ReactNode
}

export function AIWorkspace({
  className,
  conversation,
  conversationLabel = "Chat",
  defaultConversationSize = 38,
  defaultMobileView = "conversation",
  maxConversationSize = 60,
  minConversationSize = 25,
  preview,
  previewLabel = "Preview",
  previewState = "ready",
  style,
  title,
  ...props
}: AIWorkspaceProps) {
  const titleId = useId()
  const rootRef = useRef<HTMLElement>(null)
  const [conversationSize, setConversationSize] = useState(() =>
    Math.min(maxConversationSize, Math.max(minConversationSize, defaultConversationSize)),
  )
  const [mobileView, setMobileView] = useState(defaultMobileView)
  const styles = aiWorkspaceVariants()
  const conversationHidden = mobileView === "preview" ? "max-lg:hidden" : undefined
  const previewHidden = mobileView === "conversation" ? "max-lg:hidden" : undefined

  function updateConversationSize(value: number) {
    setConversationSize(Math.min(maxConversationSize, Math.max(minConversationSize, value)))
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (!event.currentTarget.hasPointerCapture(event.pointerId)) return
    const bounds = rootRef.current?.getBoundingClientRect()
    if (!bounds || bounds.width === 0) return
    updateConversationSize(((event.clientX - bounds.left) / bounds.width) * 100)
  }

  function handleSeparatorKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const step = event.shiftKey ? 10 : 2
    if (event.key === "ArrowLeft") updateConversationSize(conversationSize - step)
    else if (event.key === "ArrowRight") updateConversationSize(conversationSize + step)
    else if (event.key === "Home") updateConversationSize(minConversationSize)
    else if (event.key === "End") updateConversationSize(maxConversationSize)
    else return
    event.preventDefault()
  }

  const workspaceStyle = {
    ...style,
    "--ai-workspace-conversation-size": `${conversationSize}%`,
  } as CSSProperties

  return (
    <section
      {...props}
      aria-labelledby={titleId}
      className={cn(styles.root(), className)}
      data-en-part="ai-workspace"
      ref={rootRef}
      style={workspaceStyle}
    >
      <Typography.H1 className={styles.title()} id={titleId}>
        {title}
      </Typography.H1>
      <div
        aria-label={`${conversationLabel} and ${previewLabel} views`}
        className={styles.mobileSwitcher()}
        data-en-part="ai-workspace-mobile-switcher"
        role="tablist"
      >
        <button
          aria-selected={mobileView === "conversation"}
          className={styles.mobileTab()}
          onClick={() => setMobileView("conversation")}
          role="tab"
          type="button"
        >
          {conversationLabel}
        </button>
        <button
          aria-selected={mobileView === "preview"}
          className={styles.mobileTab()}
          onClick={() => setMobileView("preview")}
          role="tab"
          type="button"
        >
          {previewLabel}
        </button>
      </div>
      <div
        aria-label={conversationLabel}
        className={cn(styles.panel(), conversationHidden)}
        data-en-part="ai-workspace-conversation"
        role="tabpanel"
      >
        {conversation}
      </div>
      <div
        aria-label="Resize conversation and preview panels"
        aria-orientation="vertical"
        aria-valuemax={maxConversationSize}
        aria-valuemin={minConversationSize}
        aria-valuenow={Math.round(conversationSize)}
        aria-valuetext={`${Math.round(conversationSize)} percent conversation width`}
        className={styles.separator()}
        data-en-part="ai-workspace-separator"
        onKeyDown={handleSeparatorKeyDown}
        onPointerDown={(event) => event.currentTarget.setPointerCapture(event.pointerId)}
        onPointerMove={handlePointerMove}
        onPointerUp={(event) => event.currentTarget.releasePointerCapture(event.pointerId)}
        role="separator"
        tabIndex={0}
      />
      <div
        aria-busy={previewState === "loading" || undefined}
        aria-label={previewLabel}
        className={cn(styles.panel(), styles.preview(), previewHidden)}
        data-en-part="ai-workspace-preview"
        data-state={previewState}
        role="tabpanel"
      >
        {preview}
      </div>
    </section>
  )
}
