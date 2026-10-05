import {
  Alert,
  AlertDescription,
  Badge,
  Button,
  Card,
  CardDescription,
  CardHeader,
  CardPanel,
  Kbd,
  Select,
  SelectItem,
  SelectPopup,
  SelectTrigger,
  SelectValue,
  Tooltip,
  Typography,
  toast,
} from "@enosta/en-ui"

import { cx } from "../cx"
import { Icon } from "@iconify/react"
import { useEffect, useRef, useState } from "react"

import {
  CareerMapCanvas,
  type Viewport,
  focusViewport,
  openingViewport,
  wholeViewport,
} from "./career-map"
import { ConfirmDialog, type DialogSpec, ExploreDialog } from "./dialogs"
import {
  DEFAULT_GROUPS,
  DetailPanel,
  type GroupState,
  ProgressBar,
  switchSpec,
} from "./detail-panel"
import {
  CURRENT_ROLE,
  type CareerState,
  type CompetencyState,
  type ExploreInput,
  PATHS,
  type RoleId,
  type Selection,
  type VisionStatus,
  activeRouteId,
  applyRemoveSteps,
  buildMap,
  counts,
  exploreMove,
  followablePaths,
  initialCareer,
  role,
} from "./model"
import { ROUTE_COLOR, RouteSwatch, StepRail } from "./route-style"
import { AI_GREETING, type AiMessage, AskAiSheet, PathHistorySheet } from "./sheets"
import { growthLabel, routeLabel, routeMeta, routeRows } from "./view-model"

const NARROW = 1024
const isNarrow = () => typeof window !== "undefined" && window.innerWidth < NARROW

type PendingView = { kind: "opening" } | { kind: "focus"; id: RoleId } | null

export function MyCareerPage() {
  const [career, setCareer] = useState<CareerState>(initialCareer)
  const [sel, setSel] = useState<Selection>({ t: "card", id: CURRENT_ROLE })
  const [narrow, setNarrow] = useState(isNarrow)
  const [view, setView] = useState<"map" | "list">(() => (isNarrow() ? "list" : "map"))
  const [vp, setVp] = useState<Viewport>({ x: 0, y: 0, k: 1 })
  const [pendingView, setPendingView] = useState<PendingView>({ kind: "opening" })
  const [groups, setGroups] = useState<GroupState>(DEFAULT_GROUPS)
  const [openRow, setOpenRow] = useState<string | null>(null)
  const [explore, setExplore] = useState<ExploreInput | null>(null)
  const [dlg, setDlg] = useState<DialogSpec | null>(null)
  const [dlgNote, setDlgNote] = useState("")
  const [historyOpen, setHistoryOpen] = useState(false)
  const [aiOpen, setAiOpen] = useState(false)
  const [aiMsgs, setAiMsgs] = useState<AiMessage[]>([AI_GREETING])
  const [seen, setSeen] = useState<Record<string, boolean>>({})

  const canvasRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  const m = buildMap(career)
  const act = activeRouteId(m, sel)
  const selCard = sel?.t === "card" ? sel.id : null
  const overlayOpen = !!dlg || !!explore || historyOpen || aiOpen

  const select = (next: Selection) => {
    setSel(next)
    setGroups(DEFAULT_GROUPS)
    setOpenRow(null)
  }
  const notify = (title: string, description?: string, type: "success" | "info" = "success") =>
    toast.add({ title, description, type, timeout: 4000 })

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "i") {
        e.preventDefault()
        setAiOpen((o) => !o)
      } else if (e.key === "Escape" && !overlayOpen) setSel(null)
    }
    const onResize = () => setNarrow(isNarrow())
    window.addEventListener("keydown", onKey)
    window.addEventListener("resize", onResize)
    return () => {
      window.removeEventListener("keydown", onKey)
      window.removeEventListener("resize", onResize)
    }
  }, [overlayOpen])

  // Re-centre the map after it mounts or after a change that moves cards around.
  useEffect(() => {
    if (!pendingView || view !== "map") return
    let tries = 0
    let frame = 0
    const run = () => {
      const next =
        pendingView.kind === "opening"
          ? openingViewport(canvasRef, m)
          : focusViewport(canvasRef, m, pendingView.id, vp)
      if (!next && tries++ < 20) {
        frame = requestAnimationFrame(run)
        return
      }
      if (next) setVp(next)
      setPendingView(null)
    }
    run()
    return () => cancelAnimationFrame(frame)
    // Runs once per requested re-centre; the map and viewport are read at that moment.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pendingView, view])

  // In List view, keep the active route in sight when the selection changes.
  useEffect(() => {
    if (view !== "list" || !sel) return
    const box = listRef.current
    const el = box?.querySelector<HTMLElement>(`[data-route="${act}"]`)
    if (!box || !el) return
    const top = el.offsetTop - box.offsetTop
    const bottom = top + el.offsetHeight
    if (top >= box.scrollTop && bottom <= box.scrollTop + box.clientHeight) return
    box.scrollTop = top - 8
  }, [view, sel, act])

  const focusGroup = (key: CompetencyState) => {
    if (!m.goal) return
    setSel({ t: "card", id: m.goal })
    setGroups({ growth: key === "growth", na: key === "na", ready: key === "ready", notset: false })
    setOpenRow(null)
    // Scroll the panel to the chosen group once it has re-rendered with that group open.
    setTimeout(() => {
      const p = panelRef.current
      const el = p?.querySelector<HTMLElement>(`[data-group="${key}"]`)
      if (p && el) p.scrollTop = el.offsetTop - 12
    }, 60)
  }

  const openHistory = () => {
    setHistoryOpen(true)
    setSeen((s) => ({ ...s, [career.followed]: true }))
  }

  const setVision = (n: number, status: VisionStatus, managerNote = "") => {
    setCareer((s) => ({
      ...s,
      visions: s.visions.map((v) => (v.n === n ? { ...v, status, managerNote } : v)),
    }))
    if (status === "draft") notify(`Request withdrawn. Career vision ${n} is a draft again.`)
    if (status === "approved")
      notify(`Career vision ${n} approved`, "Demo: your manager agreed on this direction.")
    if (status === "declined")
      notify(`Career vision ${n} declined`, "Demo: read your manager’s note.", "info")
  }

  const confirmExplore = () => {
    const mv = exploreMove(career, m, explore)
    if (!mv?.ok) return
    setCareer((s) => ({ ...s, ...mv.apply(s) }))
    setExplore(null)
    setSel({ t: "card", id: mv.last })
    setPendingView({ kind: "focus", id: mv.last })
    notify(mv.toast)
  }

  const confirmDlg = () => {
    const d = dlg
    if (!d) return
    setDlg(null)
    if (d.kind === "setGoal") {
      setCareer((s) => ({ ...s, goal: d.id, removedGoal: null }))
      notify(`${role(d.id).full} is now your goal`)
    } else if (d.kind === "removeGoal") {
      setCareer((s) => ({ ...s, goal: null }))
      notify("Goal removed", `${role(d.id).full} stays on your map.`)
    } else if (d.kind === "removeSteps") {
      setCareer((s) => ({ ...s, ...applyRemoveSteps(s, buildMap(s), d.id) }))
      setSel(null)
      notify("Removed from your map")
    } else if (d.kind === "removeVision") {
      setCareer((s) => ({ ...s, visions: s.visions.filter((v) => v.n !== d.n) }))
      setSel(null)
      notify(
        `Career vision ${d.n} removed`,
        "Your scores, Actions and Records stay in your history.",
      )
    } else if (d.kind === "switch") {
      setCareer((s) => ({
        ...s,
        followed: d.path,
        goal: d.newGoal,
        removedGoal: null,
        steps: s.steps.filter((x) => x.pathId !== d.path),
      }))
      setSel({ t: "route", id: "follow" })
      setPendingView({ kind: "opening" })
      notify(`You now follow ${PATHS[d.path].name}`)
    } else {
      setCareer((s) => ({
        ...s,
        visions: s.visions.map((v) =>
          v.n === d.n ? { ...v, status: "waiting", note: dlgNote } : v,
        ),
      }))
      setDlgNote("")
      notify(`Career vision ${d.n} sent for approval`)
    }
  }

  const addAiVision = (roles: RoleId[]) => {
    if (!roles.some((id) => !m.cards[id])) {
      setAiMsgs((msgs) => [...msgs, { who: "ai", text: "Those roles are already on your map." }])
      return
    }
    const n = career.nextV
    setCareer((s) => ({
      ...s,
      visions: [
        ...s.visions,
        { n, start: CURRENT_ROLE, roles, status: "draft", note: "", managerNote: "" },
      ],
      nextV: s.nextV + 1,
    }))
    setSel({ t: "route", id: "v" + n })
    setPendingView({ kind: "focus", id: roles[roles.length - 1] })
    setAiMsgs((msgs) => [
      ...msgs,
      {
        who: "ai",
        text: `Added as Career vision ${n}. It’s a private draft until you send it for approval.`,
      },
    ])
    notify(`Career vision ${n} added to your map`)
  }

  const showMap = () => {
    setView("map")
    setPendingView({ kind: "opening" })
  }

  // Header and progress strip
  const change = m.fp.changes[0]
  const showChangeAlert = !!change && !seen[career.followed]
  const goalC = m.goal ? counts(m.goal) : null
  const paths = followablePaths()
  const stripCounts = goalC
    ? (
        [
          ["ready", `${goalC.ready} ready`],
          ["growth", growthLabel(goalC.growth)],
          ["na", `${goalC.na} not assessed yet`],
        ] as const
      ).filter(([k]) => goalC[k] > 0)
    : []
  const tip = `Scores come from your latest approved assessment. "Not assessed yet" means a competency has no approved score yet, so it doesn't count as a growth area. Your manager assesses it in a future assessment.${goalC?.notset ? ` ${goalC.notset} expectations are not set in Setup.` : ""}`

  return (
    <div className="flex h-[calc(100svh-3.5rem)] min-h-[560px] flex-col">
      <div className="flex flex-wrap items-center justify-between gap-x-3xl gap-y-xl bg-container px-5xl pt-3xl pb-xl">
        <div className="grid min-w-0 gap-2xs">
          <Typography.Root as="h1" className="text-neutral-900" variant="heading/4">
            My Career
          </Typography.Root>
          <Typography.Small className="text-neutral-600">
            Lan Nguyen · Backend Engineer L2 · Mid
          </Typography.Small>
        </div>
        <div className="flex flex-wrap items-center gap-md">
          {showChangeAlert && (
            <Alert className="w-auto py-sm" variant="info">
              <AlertDescription>
                <span className="inline-flex flex-wrap items-center gap-md">
                  {m.fp.name} changed {change.date}
                  <Typography.Root
                    as="a"
                    className="text-brand-600 no-underline hover:underline"
                    href="#"
                    onClick={(e) => {
                      e.preventDefault()
                      openHistory()
                    }}
                    variant="label/sm"
                  >
                    See what&apos;s different
                  </Typography.Root>
                </span>
              </AlertDescription>
            </Alert>
          )}
          <div
            aria-label="View"
            className="inline-flex gap-2xs rounded-control border border-neutral-200 p-2xs"
            role="group"
          >
            <Button
              aria-pressed={view === "map"}
              onClick={showMap}
              size="sm"
              variant={view === "map" ? "secondary" : "ghost"}
            >
              Map
            </Button>
            <Button
              aria-pressed={view === "list"}
              onClick={() => setView("list")}
              size="sm"
              variant={view === "list" ? "secondary" : "ghost"}
            >
              List
            </Button>
          </div>
          <Button onClick={() => setAiOpen((o) => !o)} size="sm" variant="secondary">
            Ask AI <Kbd>⌘I</Kbd>
          </Button>
        </div>
      </div>

      <div className="box-border flex min-h-[52px] flex-wrap items-center gap-x-2xl gap-y-lg border-y border-neutral-200 bg-neutral-25 px-5xl py-lg">
        {m.goal && goalC ? (
          <>
            <Typography.Small className="text-neutral-700">
              Toward{" "}
              <Typography.Root as="span" className="text-neutral-900" variant="label/md">
                {role(m.goal).full}
              </Typography.Root>
            </Typography.Small>
            <div className="w-[140px]">
              <ProgressBar
                growth={goalC.growth}
                na={goalC.na}
                ready={goalC.ready}
                total={goalC.total}
              />
            </div>
            <div className="flex flex-wrap items-center gap-sm">
              {stripCounts.map(([k, label]) => (
                <Button key={k} onClick={() => focusGroup(k)} size="xs" variant="secondary">
                  {label}
                </Button>
              ))}
              <Typography.Small className="text-neutral-600">of {goalC.total}</Typography.Small>
              <Tooltip
                align="start"
                popup={<span className="block max-w-[20rem]">{tip}</span>}
                side="bottom"
                trigger={
                  <Button
                    aria-label="How progress is counted"
                    className="text-neutral-500"
                    size="icon"
                    variant="ghost"
                  >
                    <Icon aria-hidden="true" className="size-3xl" icon="tabler:info-circle" />
                  </Button>
                }
              />
            </div>
          </>
        ) : (
          <Typography.Small className="text-neutral-700">
            {career.removedGoal ? (
              <>
                <Typography.Root as="span" className="text-neutral-900" variant="label/md">
                  Pick a new goal.
                </Typography.Root>{" "}
                {role(career.removedGoal).full} is no longer on your path.
              </>
            ) : (
              <>
                <Typography.Root as="span" className="text-neutral-900" variant="label/md">
                  No goal yet.
                </Typography.Root>{" "}
                Pick a role on your map and choose Set as goal to track your progress.
              </>
            )}
          </Typography.Small>
        )}
      </div>

      <div
        className={cx(
          "flex min-h-0 flex-1",
          narrow ? "flex-col overflow-auto" : "flex-row overflow-hidden",
        )}
      >
        <div className={cx("flex min-w-0 flex-1 flex-col", narrow ? "min-h-[460px]" : "min-h-0")}>
          <div className="flex flex-wrap items-center gap-md border-b border-neutral-200 px-3xl py-lg">
            {paths.length >= 2 && (
              <>
                <Typography.Small className="text-neutral-600">Following</Typography.Small>
                <div className="w-[240px]">
                  <Select
                    items={Object.fromEntries(paths.map((p) => [p.id, p.name]))}
                    onValueChange={(v) => v && v !== career.followed && setDlg(switchSpec(v, m))}
                    value={career.followed}
                  >
                    <SelectTrigger aria-label="Company path you follow" size="sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectPopup>
                      {paths.map((p) => (
                        <SelectItem key={p.id} value={p.id}>
                          {p.name}
                        </SelectItem>
                      ))}
                    </SelectPopup>
                  </Select>
                </div>
              </>
            )}
            <Button
              icon={<Icon aria-hidden="true" icon="tabler:plus" />}
              onClick={() => {
                const c = selCard ? m.cards[selCard] : null
                setExplore({
                  from: c && c.status !== "completed" ? c.id : CURRENT_ROLE,
                  pos: "",
                  join: "",
                })
              }}
              size="sm"
              variant="secondary"
            >
              Explore a position
            </Button>
          </div>

          {view === "map" ? (
            <CareerMapCanvas
              activeRoute={act}
              canvasRef={canvasRef}
              career={career}
              map={m}
              onSelect={select}
              onShowWhole={() => {
                const next = wholeViewport(canvasRef, m)
                if (next) setVp(next)
              }}
              sel={sel}
              setVp={setVp}
              vp={vp}
            />
          ) : (
            <div
              className="grid min-h-0 flex-1 content-start gap-xl overflow-y-auto bg-neutral-25 p-3xl"
              ref={listRef}
            >
              {m.routes.map((rt) => {
                const on = rt.id === act && sel?.t === "route"
                const { strong, dashed } = ROUTE_COLOR[rt.kind]
                const meta = routeMeta(rt)
                return (
                  <div data-route={rt.id} key={rt.id}>
                    <Card>
                      <CardHeader>
                        <div className="flex flex-wrap items-center gap-md">
                          <Button
                            aria-pressed={on}
                            onClick={() => select({ t: "route", id: rt.id })}
                            size="sm"
                            variant={on ? "secondary" : "ghost"}
                          >
                            <span className="inline-flex items-center gap-md">
                              <RouteSwatch color={strong} dashed={dashed} />
                              {routeLabel(rt)}
                            </span>
                          </Button>
                          <Badge variant={meta.badgeVariant}>{meta.badge}</Badge>
                        </div>
                        <CardDescription>{meta.context}</CardDescription>
                      </CardHeader>
                      <CardPanel>
                        <StepRail
                          dashed={dashed}
                          rows={routeRows(rt, m, career, selCard, (id) =>
                            select({ t: "card", id }),
                          )}
                        />
                      </CardPanel>
                    </Card>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        <DetailPanel
          actions={{
            select,
            openDialog: (spec) => {
              if (spec.kind === "request")
                setDlgNote(career.visions.find((v) => v.n === spec.n)?.note ?? "")
              setDlg(spec)
            },
            openExplore: (from) => setExplore({ from, pos: "", join: "" }),
            openHistory,
            setVision,
            dropVision: (n) => {
              setCareer((s) => ({ ...s, visions: s.visions.filter((x) => x.n !== n) }))
              setSel(null)
              notify(`Career vision ${n} removed`)
            },
            planAction: (name) =>
              notify(
                "My Actions is coming next",
                `It will open with ${name} as the growth area.`,
                "info",
              ),
          }}
          career={career}
          groups={groups}
          map={m}
          narrow={narrow}
          openRow={openRow}
          panelRef={panelRef}
          sel={sel}
          setGroups={setGroups}
          setOpenRow={setOpenRow}
        />
      </div>

      <ExploreDialog
        career={career}
        input={explore}
        map={m}
        onChange={setExplore}
        onClose={() => setExplore(null)}
        onConfirm={confirmExplore}
      />
      <ConfirmDialog
        note={dlgNote}
        onClose={() => setDlg(null)}
        onConfirm={confirmDlg}
        onNoteChange={setDlgNote}
        spec={dlg}
      />
      <PathHistorySheet onOpenChange={setHistoryOpen} open={historyOpen} path={m.fp} />
      <AskAiSheet
        map={m}
        messages={aiMsgs}
        onAddVision={addAiVision}
        onOpenChange={setAiOpen}
        onPush={(msgs) => setAiMsgs((cur) => [...cur, ...msgs])}
        open={aiOpen}
      />
    </div>
  )
}
