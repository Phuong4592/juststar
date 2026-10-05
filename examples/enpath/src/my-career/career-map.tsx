import { Button, Typography } from "@enosta/en-ui"

import { cx } from "../cx"
import { Icon } from "@iconify/react"
import {
  type Dispatch,
  type KeyboardEvent,
  type PointerEvent,
  type RefObject,
  type SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react"

import {
  CARD_H,
  CARD_W,
  CURRENT_ROLE,
  type CareerMap,
  type CareerState,
  MAP_PAD,
  type RoleId,
  type Selection,
  counts,
  role,
} from "./model"
import { BAND, ROUTE_COLOR, RouteSwatch } from "./route-style"
import { cardStatusLabel, growthLabel, routeLabel } from "./view-model"

export interface Viewport {
  x: number
  y: number
  k: number
}

// Toolbar and legend overlay heights kept clear when fitting the map.
const TOP = 56
const BOTTOM = 56

function canvasSize(ref: RefObject<HTMLDivElement | null>) {
  const el = ref.current
  if (!el) return null
  const r = el.getBoundingClientRect()
  return { w: r.width, h: r.height }
}

// Shows the whole map when it fits at 70% or more; otherwise starts at the role before
// "You are here" so the current role and the next steps are visible.
export function openingViewport(ref: RefObject<HTMLDivElement | null>, m: CareerMap) {
  const sz = canvasSize(ref)
  if (!sz || sz.w < 10) return null
  const k = Math.min(1, sz.w / m.bw, (sz.h - TOP - BOTTOM) / m.bh)
  if (k >= 0.7)
    return { k, x: (sz.w - m.bw * k) / 2, y: TOP + (sz.h - TOP - BOTTOM - m.bh * k) / 2 }
  const ci = m.fp.levels.indexOf(CURRENT_ROLE)
  const prev = m.cards[m.fp.levels[Math.max(0, ci - 1)]]
  const kk = Math.max(0.7, Math.min(1, sz.w / (4 * (CARD_W + 64))))
  return { k: kk, x: 24 - (prev.x - MAP_PAD / 2) * kk, y: TOP - (prev.y - MAP_PAD) * kk }
}

export function wholeViewport(ref: RefObject<HTMLDivElement | null>, m: CareerMap) {
  const sz = canvasSize(ref)
  if (!sz) return null
  const k = Math.max(0.4, Math.min(1, sz.w / m.bw, (sz.h - TOP - BOTTOM) / m.bh))
  return {
    k,
    x: (sz.w - m.bw * k) / 2,
    y: TOP + Math.max(0, (sz.h - TOP - BOTTOM - m.bh * k) / 2),
  }
}

export function focusViewport(
  ref: RefObject<HTMLDivElement | null>,
  m: CareerMap,
  id: RoleId,
  current: Viewport,
) {
  const sz = canvasSize(ref)
  const c = m.cards[id]
  if (!sz || !c) return null
  const k = Math.min(1, sz.w / m.bw, (sz.h - TOP - BOTTOM) / m.bh)
  if (k >= 0.7) return openingViewport(ref, m)
  const kk = current.k
  return { k: kk, x: sz.w / 2 - (c.x + CARD_W / 2) * kk, y: sz.h / 2 - (c.y + CARD_H / 2) * kk }
}

export function zoomViewport(ref: RefObject<HTMLDivElement | null>, vp: Viewport, f: number) {
  const sz = canvasSize(ref)
  if (!sz) return vp
  const k = Math.min(1.6, Math.max(0.4, vp.k * f))
  const r = k / vp.k
  const mx = sz.w / 2
  const my = sz.h / 2
  return { k, x: mx - (mx - vp.x) * r, y: my - (my - vp.y) * r }
}

interface CareerMapProps {
  canvasRef: RefObject<HTMLDivElement | null>
  career: CareerState
  map: CareerMap
  activeRoute: string
  sel: Selection
  vp: Viewport
  setVp: Dispatch<SetStateAction<Viewport>>
  onSelect: (sel: Selection) => void
  onShowWhole: () => void
}

export function CareerMapCanvas({
  canvasRef,
  career,
  map: m,
  activeRoute,
  sel,
  vp,
  setVp,
  onSelect,
  onShowWhole,
}: CareerMapProps) {
  const [dragging, setDragging] = useState(false)
  const drag = useRef<{ x: number; y: number; vx: number; vy: number; bg: boolean } | null>(null)
  const moved = useRef(false)
  const onSelectRef = useRef(onSelect)
  useEffect(() => {
    onSelectRef.current = onSelect
  })

  useEffect(() => {
    const onMove = (e: globalThis.PointerEvent) => {
      const d = drag.current
      if (!d) return
      const dx = e.clientX - d.x
      const dy = e.clientY - d.y
      if (Math.abs(dx) + Math.abs(dy) > 4) moved.current = true
      if (moved.current) setVp((v) => ({ ...v, x: d.vx + dx, y: d.vy + dy }))
    }
    const onUp = () => {
      const d = drag.current
      if (!d) return
      drag.current = null
      setDragging(false)
      if (d.bg && !moved.current) onSelectRef.current(null)
      setTimeout(() => {
        moved.current = false
      }, 0)
    }
    window.addEventListener("pointermove", onMove)
    window.addEventListener("pointerup", onUp)
    return () => {
      window.removeEventListener("pointermove", onMove)
      window.removeEventListener("pointerup", onUp)
    }
  }, [setVp])

  const onPointerDown = (ev: PointerEvent<HTMLDivElement>) => {
    const target = ev.target as HTMLElement
    if (ev.button !== 0 || target.closest("[data-nopan]")) return
    drag.current = {
      x: ev.clientX,
      y: ev.clientY,
      vx: vp.x,
      vy: vp.y,
      bg: !target.closest("[data-card],[data-line]"),
    }
    moved.current = false
    setDragging(true)
  }

  const act = m.routes.find((r) => r.id === activeRoute) ?? m.routes[0]
  const actCards = new Set(act.kind === "vision" ? act.seq.slice(1) : act.seq)
  const selCard = sel?.t === "card" ? sel.id : null
  const select = (next: Selection) => {
    if (!moved.current) onSelect(next)
  }

  // Edges: parallel routes between the same pair of cards are offset so both stay visible.
  const pairSeen: Record<string, number> = {}
  const edges = m.routes.flatMap((rt) => {
    const isAct = rt.id === act.id
    const { strong, weak, dashed } = ROUTE_COLOR[rt.kind]
    return rt.seq.slice(1).map((bid, i) => {
      const a = m.cards[rt.seq[i]]
      const b = m.cards[bid]
      const key = [a.id, b.id].sort().join("|")
      const k = (pairSeen[key] = (pairSeen[key] ?? 0) + 1)
      const off = (k - 1) * 6
      const x1 = a.x + CARD_W
      const y1 = a.y + CARD_H / 2 + off
      const x2 = b.x - (isAct ? 4 : 0)
      const y2 = b.y + CARD_H / 2 + off
      const mx = (x1 + x2) / 2
      const d = `M${x1} ${y1} C${mx} ${y1}, ${mx} ${y2}, ${x2} ${y2}`
      return (
        <g key={rt.id + i}>
          <path
            className="cursor-pointer"
            d={d}
            data-line="1"
            fill="none"
            onClick={(e) => {
              e.stopPropagation()
              select({ t: "route", id: rt.id })
            }}
            pointerEvents="stroke"
            stroke="transparent"
            strokeWidth={14}
          />
          <path
            className="pointer-events-none"
            d={d}
            fill="none"
            markerEnd={isAct ? `url(#mc-arrow-${rt.kind})` : undefined}
            stroke={isAct ? strong : weak}
            strokeDasharray={dashed ? "7 6" : undefined}
            strokeWidth={isAct ? 3.5 : 2}
          />
        </g>
      )
    })
  })

  return (
    <div
      className={cx(
        "relative min-h-0 flex-1 touch-none overflow-hidden bg-neutral-25 select-none",
        dragging ? "cursor-grabbing" : "cursor-grab",
      )}
      onPointerDown={onPointerDown}
      ref={canvasRef}
    >
      <div
        className="absolute top-0 left-0 origin-top-left"
        style={{ transform: `translate(${vp.x}px, ${vp.y}px) scale(${vp.k})` }}
      >
        <svg
          className="pointer-events-none absolute top-0 left-0 overflow-visible"
          height={m.bh}
          width={m.bw}
        >
          <defs>
            {(["follow", "company", "vision"] as const).map((k) => (
              <marker
                id={`mc-arrow-${k}`}
                key={k}
                markerHeight={3}
                markerWidth={3}
                orient="auto-start-reverse"
                refX={9}
                refY={5}
                viewBox="0 0 10 10"
              >
                <path d="M0 0 L10 5 L0 10 z" fill={ROUTE_COLOR[k].strong} />
              </marker>
            ))}
          </defs>
          {edges}
        </svg>
        {Object.values(m.cards).map((c) => {
          const band = BAND[c.status]
          const label = cardStatusLabel(c, career)
          const cnt = c.status === "goal" ? counts(c.id) : null
          const ringed = actCards.has(c.id) && c.status !== "completed"
          const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault()
              onSelect({ t: "card", id: c.id })
            }
          }
          return (
            <div
              aria-label={`${role(c.id).full}, ${label}`}
              aria-pressed={selCard === c.id}
              className={cx(
                "absolute box-border flex cursor-pointer flex-col overflow-hidden rounded-surface bg-container shadow-surface",
                "outline-offset-3 focus-visible:outline-2 focus-visible:outline-(--focus-ring-color)",
                c.status === "goal"
                  ? "border border-success-500"
                  : c.status === "vision"
                    ? "border border-dashed border-info-400"
                    : "border border-neutral-200",
                selCard === c.id && "outline-2 outline-brand-500",
              )}
              data-card="1"
              key={c.id}
              onClick={() => select({ t: "card", id: c.id })}
              onKeyDown={onKeyDown}
              role="button"
              style={{
                left: c.x,
                top: c.y,
                width: CARD_W,
                height: CARD_H,
                boxShadow: ringed
                  ? `0 0 0 2px ${ROUTE_COLOR[act.kind].strong}, var(--shadow-surface)`
                  : undefined,
              }}
              tabIndex={0}
            >
              <div
                className={cx(
                  "flex h-[26px] shrink-0 items-center gap-sm overflow-hidden px-lg whitespace-nowrap",
                  band.className,
                )}
              >
                <span className="size-sm shrink-0 rounded-pill bg-current" />
                <Typography.Label className="text-label-sm">{label}</Typography.Label>
              </div>
              <div className="grid min-w-0 gap-2xs px-xl py-lg">
                <Typography.Label
                  className={cx(
                    "text-label-lg",
                    c.status === "completed" ? "text-neutral-500" : "text-neutral-900",
                  )}
                >
                  {role(c.id).short}
                </Typography.Label>
                <Typography.Caption
                  className="truncate text-neutral-600"
                  title={role(c.id).posName}
                >
                  {role(c.id).posName}
                </Typography.Caption>
                {cnt && (
                  <Typography.Caption
                    className="truncate text-neutral-500"
                    title={`${growthLabel(cnt.growth)} · ${cnt.na} not assessed`}
                  >
                    {growthLabel(cnt.growth)} · {cnt.na} not assessed
                  </Typography.Caption>
                )}
              </div>
            </div>
          )
        })}
      </div>

      <div
        className="absolute top-xl right-xl flex cursor-default items-center gap-2xs rounded-control border border-neutral-200 bg-container p-2xs shadow-surface"
        data-nopan="1"
      >
        <Button
          aria-label="Zoom out"
          onClick={() => setVp((v) => zoomViewport(canvasRef, v, 1 / 1.15))}
          size="sm"
          variant="ghost"
        >
          <Icon aria-hidden="true" icon="tabler:minus" />
        </Button>
        <Typography.Label className="min-w-[42px] text-center text-label-sm text-neutral-700">
          {Math.round(vp.k * 100)}%
        </Typography.Label>
        <Button
          aria-label="Zoom in"
          onClick={() => setVp((v) => zoomViewport(canvasRef, v, 1.15))}
          size="sm"
          variant="ghost"
        >
          <Icon aria-hidden="true" icon="tabler:plus" />
        </Button>
        <span aria-hidden="true" className="h-[18px] w-px bg-neutral-200" />
        <Button onClick={onShowWhole} size="sm" variant="ghost">
          Show whole map
        </Button>
      </div>

      <div
        aria-label="Routes on the map"
        className="pointer-events-none absolute right-xl bottom-xl left-xl flex cursor-default flex-wrap gap-sm"
        data-nopan="1"
        role="group"
      >
        {m.routes.map((rt) => {
          const on = sel?.t === "route" && sel.id === rt.id
          const { strong, weak, dashed } = ROUTE_COLOR[rt.kind]
          return (
            <div className="pointer-events-auto rounded-control bg-container" key={rt.id}>
              <Button
                aria-pressed={on}
                onClick={() => onSelect(on ? null : { t: "route", id: rt.id })}
                size="sm"
                variant={on ? "secondary" : "ghost"}
              >
                <Typography.Root
                  as="span"
                  className="inline-flex items-center gap-md"
                  variant={on ? "label/md" : "body/sm"}
                >
                  <RouteSwatch color={rt.id === act.id ? strong : weak} dashed={dashed} />
                  {routeLabel(rt)}
                </Typography.Root>
              </Button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
