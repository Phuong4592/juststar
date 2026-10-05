import { Alert, AlertDescription, AlertTitle, Badge, Button, Typography } from "@enosta/en-ui"

import { cx } from "../cx"
import { Icon } from "@iconify/react"
import type { ReactNode, RefObject } from "react"

import type { DialogSpec } from "./dialogs"
import {
  BEHAVIOURS,
  type CareerMap,
  type CareerState,
  type CompetencyState,
  PATHS,
  type RoleId,
  SCORE_SOURCE,
  type Selection,
  VISION_STATUS,
  type VisionStatus,
  counts,
  point,
  removeStepsPlan,
  removeVisionPlan,
  role,
  switchGoal,
} from "./model"
import { ROUTE_COLOR, StepRail } from "./route-style"
import { cardStatusLabel, growthLabel, routeLabel, routeMeta, routeRows } from "./view-model"

export type GroupState = Record<CompetencyState, boolean>
export const DEFAULT_GROUPS: GroupState = { growth: true, na: true, ready: false, notset: false }

export interface PanelActions {
  select: (sel: Selection) => void
  openDialog: (spec: DialogSpec) => void
  openExplore: (from: RoleId) => void
  openHistory: () => void
  setVision: (n: number, status: VisionStatus, managerNote?: string) => void
  dropVision: (n: number) => void
  planAction: (competency: string) => void
}

type ButtonSpec = {
  label: string
  variant: "primary" | "secondary" | "danger-soft"
  onClick: () => void
}

const GROUPS: [CompetencyState, string, string][] = [
  ["growth", "Growth areas", "bg-warning-500"],
  ["na", "Not assessed yet", "bg-neutral-400"],
  ["ready", "Ready", "bg-success-500"],
  ["notset", "Not set in Setup", "bg-neutral-200"],
]

const DECLINE_NOTE = "Let’s grow your backend skills first, then revisit design next cycle."

export function setGoalSpec(id: RoleId, m: CareerMap): DialogSpec {
  const old = m.goal
  return {
    kind: "setGoal",
    id,
    title: "Make this your goal?",
    desc: "Review the change before it’s applied.",
    from: old ? role(old).full : "No goal yet",
    to: role(id).full,
    lines: [
      "Your progress strip will track the new role instead.",
      `${old ? role(old).full + " stays on your map as Planned. " : ""}Your official role doesn't change. A goal is your own, not a promotion or transfer.`,
    ],
    confirmLabel: "Set as goal",
    confirmVariant: "primary",
  }
}

export function switchSpec(to: string, m: CareerMap): DialogSpec {
  const tp = PATHS[to]
  const newGoal = switchGoal(m, to)
  const lines = [
    "It becomes your main route, shown in the top row. No approval needed: your company published it.",
  ]
  if (m.goal && newGoal && newGoal !== m.goal)
    lines.push(
      `${role(m.goal).full} isn't on ${tp.name}, so ${role(newGoal).full} becomes your goal.`,
    )
  return {
    kind: "switch",
    path: to,
    newGoal,
    title: "Follow a different company path?",
    desc: "Review the change before it’s applied.",
    from: m.fp.name,
    to: tp.name,
    lines,
    confirmLabel: "Follow this path",
    confirmVariant: "primary",
  }
}

export function ProgressBar({
  ready,
  growth,
  na,
  total,
}: {
  ready: number
  growth: number
  na: number
  total: number
}) {
  const pct = (n: number) => (total ? Math.round((n / total) * 100) : 0)
  return (
    <div
      className="flex h-md gap-2xs overflow-hidden rounded-pill bg-neutral-100"
      aria-hidden="true"
    >
      <div className="bg-success-500" style={{ width: `${pct(ready)}%` }} />
      <div className="bg-warning-500" style={{ width: `${pct(growth)}%` }} />
      <div className="bg-neutral-300" style={{ width: `${pct(na)}%` }} />
    </div>
  )
}

function RoleBody({
  id,
  groups,
  setGroups,
  openRow,
  setOpenRow,
  onPlan,
}: {
  id: RoleId
  groups: GroupState
  setGroups: (g: GroupState) => void
  openRow: string | null
  setOpenRow: (k: string | null) => void
  onPlan: (competency: string) => void
}) {
  const cc = counts(id)
  return (
    <>
      {cc.total > 0 && (
        <div className="grid gap-sm">
          <ProgressBar growth={cc.growth} na={cc.na} ready={cc.ready} total={cc.total} />
          <Typography.Caption className="text-neutral-600">
            {cc.ready} ready · {growthLabel(cc.growth)} · {cc.na} not assessed yet · of {cc.total}
          </Typography.Caption>
        </div>
      )}
      {cc.total === 0 && cc.notset > 0 && (
        <Typography.Small className="rounded-surface border border-dashed border-neutral-200 px-3xl py-5xl text-center text-neutral-600">
          Nothing to compare yet. This level has no expectations set in Setup.
        </Typography.Small>
      )}
      {GROUPS.map(([k, title, dot]) => {
        const items = cc.list.filter((x) => x.st === k)
        if (!items.length) return null
        const open = groups[k]
        return (
          <div
            className="overflow-hidden rounded-surface border border-neutral-200 shadow-surface"
            data-group={k}
            key={k}
          >
            <Button
              aria-expanded={open}
              className="h-auto w-full justify-between rounded-none px-2xl py-lg active:scale-100"
              onClick={() => setGroups({ ...groups, [k]: !open })}
              variant="ghost"
            >
              <Typography.Label className="flex items-center gap-md text-neutral-900">
                <span className={cx("size-md rounded-pill", dot)} />
                {title}
              </Typography.Label>
              <Typography.Small className="flex items-center gap-md text-neutral-600">
                {items.length}
                <Icon
                  aria-hidden="true"
                  icon={open ? "solar:alt-arrow-up-linear" : "solar:alt-arrow-down-linear"}
                />
              </Typography.Small>
            </Button>
            {open && (
              <div className="border-t border-neutral-200">
                {items.map((x) => {
                  const rk = id + x.c
                  const ro = openRow === rk
                  let value: string
                  let expTitle: string
                  let expText: string
                  if (k === "growth") {
                    value = `${x.have} → ${x.need}`
                    expTitle = `What ${point(x.need!)} looks like`
                    expText =
                      BEHAVIOURS[x.c]?.[x.need!] ??
                      "Your Matrix describes the behaviour expected at this point."
                  } else if (k === "na") {
                    value = String(x.need)
                    expTitle = "No approved score yet"
                    expText = `Needs ${point(x.need!)}. Your manager assesses it in a future assessment.`
                  } else if (k === "ready") {
                    value = String(x.have)
                    expTitle = `You're at ${point(x.have!)}`
                    expText = `Based on: ${SCORE_SOURCE}`
                  } else {
                    value = "Not set"
                    expTitle = "No expectation"
                    expText =
                      "Setup hasn’t set an expectation for this level yet, so there’s nothing to compare."
                  }
                  return (
                    <div className="border-b border-neutral-100 last:border-b-0" key={x.c}>
                      <Button
                        aria-expanded={ro}
                        className="h-auto w-full justify-between gap-xl rounded-none px-2xl py-lg active:scale-100"
                        onClick={() => setOpenRow(ro ? null : rk)}
                        variant="ghost"
                      >
                        <Typography.Small className="text-neutral-900">{x.name}</Typography.Small>
                        <Typography.Label className="flex items-center gap-md text-neutral-900">
                          {value}
                          <Icon
                            aria-hidden="true"
                            icon={ro ? "solar:alt-arrow-up-linear" : "solar:alt-arrow-down-linear"}
                          />
                        </Typography.Label>
                      </Button>
                      {ro && (
                        <div className="grid justify-items-start gap-xs px-2xl pb-xl">
                          <Typography.Label className="text-neutral-900">
                            {expTitle}
                          </Typography.Label>
                          <Typography.Small className="text-pretty text-neutral-600">
                            {expText}
                          </Typography.Small>
                          {k === "growth" && (
                            <div className="pt-sm">
                              <Button onClick={() => onPlan(x.name)} size="sm" variant="secondary">
                                Plan an action
                              </Button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )
      })}
    </>
  )
}

export function DetailPanel({
  career: s,
  map: m,
  sel,
  narrow,
  groups,
  setGroups,
  openRow,
  setOpenRow,
  panelRef,
  actions,
}: {
  career: CareerState
  map: CareerMap
  sel: Selection
  narrow: boolean
  groups: GroupState
  setGroups: (g: GroupState) => void
  openRow: string | null
  setOpenRow: (k: string | null) => void
  panelRef: RefObject<HTMLDivElement | null>
  actions: PanelActions
}) {
  const btn = (label: string, variant: ButtonSpec["variant"], onClick: () => void): ButtonSpec => ({
    label,
    variant,
    onClick,
  })
  const selCard = sel?.t === "card" ? sel.id : null
  const notes: string[] = []
  const buttons: ButtonSpec[] = []
  let title: string
  let badge: string
  let badgeVariant: "outline" | "secondary" | "info" | "success"
  let context: string
  let body: ReactNode

  if (sel?.t === "card" && m.cards[sel.id]) {
    const c = m.cards[sel.id]
    const id = c.id
    const pathOf = c.onFollow ? m.fp.name : c.stepPath ? PATHS[c.stepPath].name : ""
    const follows = c.onFollow ? " · the path you follow" : ""
    const vStatus = c.visions
      .map((n) => s.visions.find((v) => v.n === n)!)
      .map((v) => VISION_STATUS[v.status].lower)
      .join(", ")
    context = {
      completed: `${m.fp.name} · the path you follow`,
      new: `Added to ${m.fp.name} on 27 Sep`,
      current: "Your official role · set by your admin",
      goal: pathOf ? pathOf + follows : "Your own direction · approved",
      planned: pathOf + follows,
      vision: `Your own direction · ${vStatus}`,
    }[c.status]
    badgeVariant = (
      {
        completed: "outline",
        new: "secondary",
        current: "info",
        goal: "success",
        planned: "secondary",
        vision: "outline",
      } as const
    )[c.status]
    badge = c.status === "vision" ? `${cardStatusLabel(c, s)} · ${vStatus}` : cardStatusLabel(c, s)
    title = role(id).full
    body = (
      <RoleBody
        groups={groups}
        id={id}
        onPlan={actions.planAction}
        openRow={openRow}
        setGroups={setGroups}
        setOpenRow={setOpenRow}
      />
    )
    const explore = btn("Explore a position from here", "secondary", () => actions.openExplore(id))

    if (c.status === "new")
      notes.push(
        "You haven’t held this level, so it isn’t completed yet. It becomes completed when an approved assessment meets it, or when your manager marks it.",
      )
    if (c.status === "current") buttons.push(explore)
    if (c.status === "goal") {
      buttons.push(explore)
      buttons.push(
        btn("Remove as goal", "danger-soft", () =>
          actions.openDialog({
            kind: "removeGoal",
            id,
            title: "Remove your goal?",
            desc: "Review the change before it’s applied.",
            lines: [
              `${role(id).full} stays on your map. You just stop tracking progress toward it.`,
            ],
            confirmLabel: "Remove as goal",
            confirmVariant: "danger",
          }),
        ),
      )
    }
    if (c.status === "planned") {
      buttons.push(btn("Set as goal", "primary", () => actions.openDialog(setGoalSpec(id, m))))
      buttons.push(explore)
      if (c.stepPath && !c.onFollow) {
        const p = removeStepsPlan(s, m, id)
        if (p.block) notes.push(p.block)
        else
          buttons.push(
            btn("Remove from my map", "danger-soft", () =>
              actions.openDialog({
                kind: "removeSteps",
                id,
                title: "Remove from your map?",
                desc: "Review what goes before it’s removed.",
                listLabel: "These cards leave your map",
                list: p.cardsGone.map((x) => role(x).full),
                lines: ["Your scores, Actions and Records stay in your history."],
                confirmLabel: "Remove from my map",
                confirmVariant: "danger",
              }),
            ),
          )
      }
    }
    if (c.status === "vision") {
      if (c.approved)
        buttons.push(btn("Set as goal", "primary", () => actions.openDialog(setGoalSpec(id, m))))
      else notes.push("Your manager approves career visions before they can become your goal.")
      c.visions.forEach((n) =>
        buttons.push(
          btn(`Show Career vision ${n}`, "secondary", () =>
            actions.select({ t: "route", id: "v" + n }),
          ),
        ),
      )
      buttons.push(explore)
    }
  } else if (sel?.t === "route") {
    const rt = m.routes.find((r) => r.id === sel.id)
    if (!rt) return null
    const meta = routeMeta(rt)
    title = routeLabel(rt)
    badge = meta.badge
    badgeVariant = meta.badgeVariant
    context = meta.context
    let isWaiting = false
    let managerNote = ""

    if (rt.kind === "follow") {
      if (m.goal) {
        const goal = m.goal
        buttons.push(
          btn("Open Active goal", "primary", () => actions.select({ t: "card", id: goal })),
        )
      }
      if (m.fp.changes.length) buttons.push(btn("Path history", "secondary", actions.openHistory))
    } else if (rt.kind === "company") {
      notes.push("It becomes your main route, shown in the top row.")
      buttons.push(
        btn("Follow this path", "primary", () => actions.openDialog(switchSpec(rt.pathId!, m))),
      )
    } else {
      const v = rt.v!
      const n = v.n
      const other = s.visions.find((x) => x.status === "waiting" && x.n !== n)
      const rp = removeVisionPlan(s, m, n)
      const removeBtn = btn(`Remove Career vision ${n}`, "danger-soft", () =>
        actions.openDialog({
          kind: "removeVision",
          n,
          title: `Remove Career vision ${n}?`,
          desc: "Review what goes before it’s removed.",
          listLabel: "These cards leave your map",
          list: rp.cardsGone.length
            ? rp.cardsGone.map((x) => role(x).full)
            : ["None. Its roles are still used by another route."],
          lines: ["Your scores, Actions and Records stay in your history."],
          confirmLabel: `Remove Career vision ${n}`,
          confirmVariant: "danger",
        }),
      )
      if (v.status === "draft") {
        if (other)
          notes.push(
            `Career vision ${other.n} is waiting for approval. You can send one at a time. Withdraw it to send this one.`,
          )
        else {
          notes.push(
            "It leaves your company path, so your manager approves it before any role in it can become your goal.",
          )
          const last = v.roles[v.roles.length - 1]
          buttons.push(
            btn("Request manager approval", "primary", () =>
              actions.openDialog({
                kind: "request",
                n,
                title: `Send Career vision ${n} for approval`,
                desc: `${role(v.start).full} → ${role(last).full} · ${v.roles.length} new ${v.roles.length === 1 ? "role" : "roles"}`,
                lines: [
                  "Your current role stays the same. You can withdraw it while it’s waiting.",
                ],
                hasNote: true,
                confirmLabel: "Send request",
                confirmVariant: "primary",
              }),
            ),
          )
        }
        if (rp.block) notes.push(rp.block)
        else buttons.push(removeBtn)
      } else if (v.status === "waiting") {
        isWaiting = true
        notes.push("Your manager is reviewing it. Your current role stays the same.")
        notes.push(rp.block)
        buttons.push(btn("Withdraw request", "secondary", () => actions.setVision(n, "draft")))
      } else if (v.status === "approved") {
        notes.push(
          "Your manager agreed on this direction. Select a role in it to make it your goal.",
        )
        if (rp.block) notes.push(rp.block)
        else buttons.push(removeBtn)
      } else {
        managerNote = v.managerNote
        notes.push(
          "A declined Career vision leaves your map once you’ve read the note. Your scores, Actions and Records stay in your history.",
        )
        buttons.push(btn(`Remove Career vision ${n}`, "primary", () => actions.dropVision(n)))
      }
    }

    body = (
      <>
        <StepRail
          dashed={ROUTE_COLOR[rt.kind].dashed}
          rows={routeRows(rt, m, s, selCard, (id) => actions.select({ t: "card", id }))}
        />
        {managerNote && (
          <Alert variant="warning">
            <AlertTitle>Your manager declined this direction</AlertTitle>
            <AlertDescription>Your manager: “{managerNote}”</AlertDescription>
          </Alert>
        )}
        {isWaiting && rt.v && (
          <div className="grid gap-md rounded-surface border border-dashed border-neutral-300 p-xl">
            <Typography.Root as="span" className="text-neutral-600" variant="label/sm">
              Demo only · stands in for the manager&apos;s review
            </Typography.Root>
            <div className="flex flex-wrap gap-md">
              <Button
                onClick={() => actions.setVision(rt.v!.n, "approved")}
                size="sm"
                variant="secondary"
              >
                Approve as manager
              </Button>
              <Button
                onClick={() => actions.setVision(rt.v!.n, "declined", DECLINE_NOTE)}
                size="sm"
                variant="secondary"
              >
                Decline as manager
              </Button>
            </div>
          </div>
        )}
      </>
    )
  } else {
    return null
  }

  return (
    <aside
      aria-label="Details"
      className={cx(
        "flex min-h-0 shrink-0 flex-col bg-container",
        narrow
          ? "w-full border-t border-neutral-200"
          : "max-h-full w-[400px] border-l border-neutral-200",
      )}
    >
      <div className="grid gap-md border-b border-neutral-200 px-4xl pt-3xl pb-xl">
        <div className="flex items-start justify-between gap-xl">
          <Typography.Root as="h2" className="text-pretty text-neutral-900" variant="heading/5">
            {title}
          </Typography.Root>
          <Button
            aria-label="Close details"
            onClick={() => actions.select(null)}
            size="icon"
            variant="ghost"
          >
            <Icon aria-hidden="true" icon="mingcute:close-line" />
          </Button>
        </div>
        <div className="flex flex-wrap items-center gap-md">
          <Badge variant={badgeVariant}>{badge}</Badge>
          <Typography.Small className="text-neutral-600">{context}</Typography.Small>
        </div>
      </div>
      <div
        className="relative grid min-h-0 flex-1 content-start gap-xl overflow-y-auto px-4xl py-3xl"
        ref={panelRef}
      >
        {body}
      </div>
      {notes.length + buttons.length > 0 && (
        <div className="grid gap-md border-t border-neutral-200 px-4xl pt-xl pb-3xl">
          {notes.filter(Boolean).map((n) => (
            <Typography.Small className="text-pretty text-neutral-600" key={n}>
              {n}
            </Typography.Small>
          ))}
          {buttons.map((b) => (
            <Button className="w-full" key={b.label} onClick={b.onClick} variant={b.variant}>
              {b.label}
            </Button>
          ))}
        </div>
      )}
    </aside>
  )
}
