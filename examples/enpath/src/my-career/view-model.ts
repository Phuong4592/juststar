import {
  type CareerMap,
  type CareerState,
  type MapCard,
  type RoleId,
  type Route,
  VISION_STATUS,
  counts,
  role,
} from "./model"
import { BAND, ROUTE_COLOR, type RailRow } from "./route-style"

export function cardStatusLabel(c: MapCard, s: CareerState): string {
  if (c.status !== "vision") return BAND[c.status].label
  if (s.visions.length < 2) return "Career vision"
  return c.visions.length > 1
    ? `Career visions ${c.visions.join(", ")}`
    : `Career vision ${c.visions[0]}`
}

export const routeLabel = (rt: Route) =>
  rt.kind === "follow" ? `${rt.name} · you follow` : rt.name

export function routeMeta(rt: Route): {
  badge: string
  badgeVariant: "success" | "secondary" | "outline" | "info"
  context: string
} {
  if (rt.kind === "follow")
    return {
      badge: "You follow",
      badgeVariant: "success",
      context: `Planned by your company · ${rt.seq.length} levels`,
    }
  if (rt.kind === "company")
    return {
      badge: "Company path",
      badgeVariant: "secondary",
      context: "For your role · no approval needed",
    }
  const v = VISION_STATUS[rt.v!.status]
  return { badge: v.label, badgeVariant: v.badge, context: "Your own direction · private" }
}

export const growthLabel = (n: number) => `${n} growth ${n === 1 ? "area" : "areas"}`

export function routeRows(
  rt: Route,
  m: CareerMap,
  s: CareerState,
  selected: RoleId | null,
  onSelect: (id: RoleId) => void,
): RailRow[] {
  const { strong, weak } = ROUTE_COLOR[rt.kind]
  return rt.seq.map((id, i) => {
    if (rt.kind !== "follow" && i === 0)
      return {
        key: id + "-start",
        label: "Starts from " + role(id).full,
        rail: "var(--color-neutral-300)",
        dot: "var(--color-neutral-300)",
        muted: true,
      }
    const c = m.cards[id]
    const suffix =
      c.status === "vision" && rt.kind === "vision" ? "" : " · " + cardStatusLabel(c, s)
    const cnt = c.status === "goal" ? counts(id) : null
    return {
      key: id,
      label: role(id).full + suffix,
      extra: cnt ? `${growthLabel(cnt.growth)} · ${cnt.na} not assessed yet` : undefined,
      rail: c.status === "completed" ? weak : strong,
      dot:
        c.status === "completed"
          ? "var(--color-neutral-400)"
          : c.status === "current"
            ? "var(--color-brand-500)"
            : c.status === "goal"
              ? "var(--color-success-500)"
              : strong,
      muted: c.status === "completed",
      strong: c.status === "current" || c.status === "goal",
      selected: selected === id,
      onSelect: () => onSelect(id),
    }
  })
}
