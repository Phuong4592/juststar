import type { ComponentProps, ReactNode } from "react"
import { useId } from "react"
import { cn, tv } from "../../tailwind-variants"

import { Typography } from "../../components/typography"

const aiChatPageVariants = tv({
  slots: {
    composer: [
      "sticky bottom-0 z-10 shrink-0 border-t border-neutral-200 bg-container",
      "px-lg pt-md pb-[max(var(--space-md),env(safe-area-inset-bottom))] shadow-raised",
    ],
    composerInner: "mx-auto grid w-full max-w-(--ai-chat-page-measure) gap-sm",
    empty: "grid min-h-0 flex-1 place-items-center overflow-y-auto px-lg py-2xl text-center",
    header: [
      "flex shrink-0 flex-wrap items-start justify-between gap-lg",
      "border-b border-neutral-200 px-lg py-md",
    ],
    headerCopy: "grid min-w-0 gap-sm",
    messages: "mx-auto grid w-full max-w-(--ai-chat-page-measure) content-start gap-xl px-lg py-xl",
    messagesViewport: [
      "min-h-0 flex-1 overflow-y-auto overscroll-contain outline-none",
      "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-(--focus-ring-color)",
    ],
    root: [
      "flex h-(--ai-chat-page-height) min-h-0 min-w-0 flex-col overflow-hidden bg-canvas text-neutral-900",
      "[--ai-chat-page-height:calc(100dvh-3.5rem)] [--ai-chat-page-measure:48rem]",
    ],
    status: "text-neutral-600",
    suggestions: "flex flex-wrap gap-sm",
    title: "text-neutral-900",
    description: "text-neutral-600",
  },
})

export interface AIChatPageProps extends Omit<ComponentProps<"section">, "title"> {
  actions?: ReactNode
  busy?: boolean
  composer: ReactNode
  description?: ReactNode
  emptyState?: ReactNode
  messages?: ReactNode
  messagesLabel?: string
  status?: ReactNode
  suggestions?: ReactNode
  title: ReactNode
}

export function AIChatPage({
  actions,
  busy = false,
  className,
  composer,
  description,
  emptyState,
  messages,
  messagesLabel = "Conversation history",
  status,
  suggestions,
  title,
  ...props
}: AIChatPageProps) {
  const titleId = useId()
  const styles = aiChatPageVariants()

  return (
    <section
      {...props}
      aria-labelledby={titleId}
      className={cn(styles.root(), className)}
      data-en-part="ai-chat-page"
    >
      <header className={styles.header()} data-en-part="ai-chat-page-header">
        <div className={styles.headerCopy()}>
          <Typography.H2 as="h1" className={styles.title()} id={titleId}>
            {title}
          </Typography.H2>
          {description ? (
            <Typography.Small className={styles.description()}>{description}</Typography.Small>
          ) : null}
        </div>
        {actions}
      </header>
      {messages ? (
        <div
          aria-label={messagesLabel}
          className={styles.messagesViewport()}
          role="region"
          tabIndex={0}
        >
          <div
            aria-busy={busy || undefined}
            aria-live="off"
            className={styles.messages()}
            data-en-part="ai-chat-page-messages"
            role="log"
          >
            {messages}
          </div>
        </div>
      ) : (
        <div className={styles.empty()} data-en-part="ai-chat-page-empty">
          {emptyState}
        </div>
      )}
      <div className={styles.composer()} data-en-part="ai-chat-page-composer">
        <div className={styles.composerInner()}>
          {status ? (
            <Typography.Small
              as="div"
              aria-live="polite"
              className={styles.status()}
              data-en-part="ai-chat-page-status"
              role="status"
            >
              {status}
            </Typography.Small>
          ) : null}
          {suggestions ? (
            <div className={styles.suggestions()} data-en-part="ai-chat-page-suggestions">
              {suggestions}
            </div>
          ) : null}
          {composer}
        </div>
      </div>
    </section>
  )
}
