import {
  Badge,
  Button,
  Input,
  Sheet,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetPanel,
  SheetPopup,
  SheetTitle,
  Typography,
} from "@enosta/en-ui"

import { cx } from "../cx"
import { Icon } from "@iconify/react"
import { useState } from "react"

import {
  CURRENT_ROLE,
  type CareerMap,
  type CompanyPath,
  HELD_ROLES,
  type RoleId,
  SCORE_SOURCE,
  counts,
  role,
} from "./model"

export function PathHistorySheet({
  open,
  onOpenChange,
  path,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  path: CompanyPath
}) {
  const ci = path.levels.indexOf(CURRENT_ROLE)
  return (
    <Sheet onOpenChange={onOpenChange} open={open}>
      <SheetPopup side="right">
        <SheetHeader>
          <SheetTitle>Path history</SheetTitle>
          <SheetDescription>{path.name}</SheetDescription>
        </SheetHeader>
        <SheetPanel className="grid content-start gap-4xl">
          {path.changes.map((ch) => (
            <div className="grid gap-md" key={ch.date}>
              <Typography.Root as="span" className="text-neutral-500" variant="label/sm">
                {ch.date} · by your company
              </Typography.Root>
              {ch.added.map((id) => {
                const behind = path.levels.indexOf(id) < ci
                const held = HELD_ROLES.includes(id)
                return (
                  <HistoryItem
                    added
                    badge={behind && !held ? "New on your path" : undefined}
                    key={id}
                    note={
                      behind
                        ? held
                          ? "Added before your level. Completed."
                          : "Added before your level. Not completed yet."
                        : "Added ahead. Planned."
                    }
                    role={id}
                  />
                )
              })}
              {ch.removed.map((id) => (
                <HistoryItem
                  badge={ch.wasGoal === id ? "Was your goal" : undefined}
                  key={id}
                  note={ch.wasGoal === id ? "Removed. Pick a new goal." : "Removed."}
                  role={id}
                />
              ))}
            </div>
          ))}
        </SheetPanel>
      </SheetPopup>
    </Sheet>
  )
}

function HistoryItem({
  role: id,
  note,
  badge,
  added = false,
}: {
  role: RoleId
  note: string
  badge?: string
  added?: boolean
}) {
  return (
    <div className="grid grid-cols-[24px_minmax(0,1fr)] gap-lg rounded-surface border border-neutral-200 px-xl py-lg">
      <span
        className={cx(
          "inline-flex size-5xl items-center justify-center rounded-control",
          added ? "bg-success-50 text-success-700" : "bg-neutral-100 text-neutral-700",
        )}
      >
        <Icon aria-hidden="true" icon={added ? "tabler:plus" : "tabler:minus"} />
      </span>
      <div className="grid min-w-0 gap-xs">
        <div className="flex flex-wrap items-center gap-md">
          <Typography.Label className="text-neutral-900">{role(id).full}</Typography.Label>
          {badge && <Badge variant={added ? "secondary" : "warning"}>{badge}</Badge>}
        </div>
        <Typography.Small className="text-neutral-600">{note}</Typography.Small>
      </div>
    </div>
  )
}

export interface AiMessage {
  who: "me" | "ai"
  text: string
  proposal?: RoleId[]
}

export const AI_GREETING: AiMessage = {
  who: "ai",
  text: "I can suggest a Career vision, explain what your goal needs, or compare two roles. I read your approved scores and Records.",
}

// Canned replies stand in for the AI service.
export function aiSuggest(q?: string): AiMessage[] {
  return [
    { who: "me", text: q ?? "Suggest a Career vision" },
    {
      who: "ai",
      text: "Your Testing score is 2 · Developing and your Records include test automation work. A QA direction could build on that. It leaves your company path, so your manager would approve it before it can become your goal.",
      proposal: ["QA-L2", "QA-L3"],
    },
  ]
}

export function aiGoal(m: CareerMap, q?: string): AiMessage[] {
  let text: string
  if (!m.goal)
    text =
      "You don’t have a goal yet. Pick a role on your map and choose Set as goal. Then I can explain what it needs."
  else {
    const c = counts(m.goal)
    const g = c.list
      .filter((x) => x.st === "growth")
      .map((x) => `${x.name} (${x.have} → ${x.need})`)
      .join(", ")
    const na = c.list
      .filter((x) => x.st === "na")
      .map((x) => x.name)
      .join(", ")
    text = `${role(m.goal).full} needs growth in ${g || "nothing yet"}.${na ? ` Not assessed yet: ${na}. Your manager assesses the ones not assessed yet in a future assessment.` : ""} Based on your ${SCORE_SOURCE}.`
  }
  return [
    { who: "me", text: q ?? "What does my goal need?" },
    { who: "ai", text },
  ]
}

export function aiCompare(q?: string): AiMessage[] {
  const d = (id: RoleId) => {
    const c = counts(id)
    return `${role(id).full}: ${c.ready} ready, ${c.growth} growth areas, ${c.na} not assessed yet`
  }
  return [
    { who: "me", text: q ?? "Compare two roles" },
    {
      who: "ai",
      text: `${d("BE-L4")}. ${d("PM-L3")}. The backend route builds on scores you already have. The product route has more you haven't been assessed on yet.`,
    },
  ]
}

export function aiReply(q: string, m: CareerMap): AiMessage[] {
  const l = q.toLowerCase()
  if (/vision|suggest|direction/.test(l)) return aiSuggest(q)
  if (/goal|need|target/.test(l)) return aiGoal(m, q)
  if (/compare|vs|versus/.test(l)) return aiCompare(q)
  return [
    { who: "me", text: q },
    {
      who: "ai",
      text: "I can suggest a Career vision, explain what your goal needs, or compare two roles.",
    },
  ]
}

export function AskAiSheet({
  open,
  onOpenChange,
  messages,
  map,
  onPush,
  onAddVision,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  messages: AiMessage[]
  map: CareerMap
  onPush: (msgs: AiMessage[]) => void
  onAddVision: (roles: RoleId[]) => void
}) {
  const [input, setInput] = useState("")
  const send = () => {
    const q = input.trim()
    if (!q) return
    setInput("")
    onPush(aiReply(q, map))
  }
  return (
    <Sheet onOpenChange={onOpenChange} open={open}>
      <SheetPopup side="right">
        <SheetHeader>
          <SheetTitle>Ask AI</SheetTitle>
          <SheetDescription>
            AI proposes, you decide. It never changes your map on its own.
          </SheetDescription>
        </SheetHeader>
        <SheetPanel className="grid content-start gap-xl">
          {messages.map((msg, i) => (
            <div className={cx("flex", msg.who === "me" ? "justify-end" : "justify-start")} key={i}>
              <div
                className={cx(
                  "grid max-w-[88%] gap-md rounded-surface border px-xl py-lg text-pretty",
                  msg.who === "me"
                    ? "border-brand-100 bg-brand-50"
                    : "border-neutral-200 bg-container",
                )}
              >
                <Typography.Small className="text-neutral-900">{msg.text}</Typography.Small>
                {msg.proposal && (
                  <div className="grid gap-md rounded-surface border border-dashed border-info-400 bg-container p-lg">
                    <Typography.Root as="span" className="text-info-700" variant="label/sm">
                      Proposed Career vision
                    </Typography.Root>
                    <Typography.Small className="text-neutral-900">
                      {[CURRENT_ROLE, ...msg.proposal].map((x) => role(x).full).join(" → ")}
                    </Typography.Small>
                    <div>
                      <Button onClick={() => onAddVision(msg.proposal!)} size="sm">
                        Add to my map
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
          <div className="flex flex-wrap gap-sm">
            <Button onClick={() => onPush(aiSuggest())} size="sm" variant="secondary">
              Suggest a Career vision
            </Button>
            <Button onClick={() => onPush(aiGoal(map))} size="sm" variant="secondary">
              What does my goal need?
            </Button>
            <Button onClick={() => onPush(aiCompare())} size="sm" variant="secondary">
              Compare two roles
            </Button>
          </div>
        </SheetPanel>
        <SheetFooter>
          <div className="flex w-full gap-md">
            <Input
              aria-label="Ask AI"
              className="flex-1"
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Ask about your career"
              value={input}
            />
            <Button onClick={send}>Send</Button>
          </div>
        </SheetFooter>
      </SheetPopup>
    </Sheet>
  )
}
