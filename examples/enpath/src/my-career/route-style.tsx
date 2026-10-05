import { Typography } from "@enosta/en-ui"

import { cx } from "../cx"
import type { KeyboardEvent } from "react"

import type { CardStatus, RouteKind } from "./model"

// Route colours as semantic tokens. Company paths are solid; Career visions are dashed info blue
// because Juststar has no violet.
export const ROUTE_COLOR: Record<RouteKind, { strong: string; weak: string; dashed: boolean }> = {
  follow: {
    strong: "var(--color-success-700)",
    weak: "var(--color-success-400)",
    dashed: false,
  },
  company: {
    strong: "var(--color-neutral-600)",
    weak: "var(--color-neutral-400)",
    dashed: false,
  },
  vision: { strong: "var(--color-info-600)", weak: "var(--color-info-400)", dashed: true },
}

export const BAND: Record<CardStatus, { className: string; label: string }> = {
  completed: { className: "bg-neutral-100 text-neutral-700", label: "Completed" },
  new: { className: "bg-neutral-50 text-neutral-700", label: "New on your path" },
  current: { className: "bg-brand-100 text-brand-800", label: "You are here" },
  goal: { className: "bg-success-100 text-success-900", label: "Active goal" },
  planned: { className: "bg-neutral-50 text-neutral-700", label: "Planned" },
  vision: { className: "bg-info-100 text-info-800", label: "Career vision" },
}

export function RouteSwatch({ color, dashed }: { color: string; dashed: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={cx("w-[18px] border-t-[3px]", dashed ? "border-dashed" : "border-solid")}
      style={{ borderTopColor: color }}
    />
  )
}

export interface RailRow {
  key: string
  label: string
  extra?: string
  rail: string
  dot: string
  muted?: boolean
  strong?: boolean
  selected?: boolean
  onSelect?: () => void
}

// Vertical rail of steps used by the List view, the route detail panel and the Explore preview.
export function StepRail({
  rows,
  dashed,
  compact = false,
}: {
  rows: RailRow[]
  dashed: boolean
  compact?: boolean
}) {
  return (
    <div className="grid">
      {rows.map((row) => {
        const interactive = !!row.onSelect
        const onKeyDown = (event: KeyboardEvent) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault()
            row.onSelect?.()
          }
        }
        return (
          <div
            aria-current={row.selected || undefined}
            className={cx(
              "grid grid-cols-[20px_minmax(0,1fr)] items-stretch gap-lg rounded-control",
              compact ? "min-h-[34px]" : "min-h-[40px] px-md",
              interactive &&
                "cursor-pointer hover:bg-neutral-50 focus-visible:ring-2 focus-visible:ring-(--focus-ring-color) focus-visible:outline-none",
              row.selected && "bg-brand-50 hover:bg-brand-50",
            )}
            key={row.key}
            onClick={row.onSelect}
            onKeyDown={interactive ? onKeyDown : undefined}
            role={interactive ? "button" : undefined}
            tabIndex={interactive ? 0 : undefined}
          >
            <div className="relative flex items-center justify-center">
              <div
                className={cx(
                  "absolute inset-y-0 left-[9px] border-l-2",
                  dashed ? "border-dashed" : "border-solid",
                )}
                style={{ borderLeftColor: row.rail }}
              />
              <div
                className="relative size-[10px] rounded-pill shadow-[0_0_0_2px_var(--color-container)]"
                style={{ background: row.dot }}
              />
            </div>
            <div className={cx("flex min-w-0 flex-col justify-center", !compact && "py-md")}>
              <Typography.Root
                as="span"
                className={row.muted ? "text-neutral-500" : "text-neutral-900"}
                variant={row.strong || row.selected ? "label/md" : "body/sm"}
              >
                {row.label}
              </Typography.Root>
              {row.extra && (
                <Typography.Caption className="text-neutral-600">{row.extra}</Typography.Caption>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
