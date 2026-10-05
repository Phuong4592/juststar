import {
  Button,
  Dialog,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPanel,
  DialogPopup,
  DialogTitle,
  Field,
  FieldLabel,
  Select,
  SelectGroup,
  SelectGroupLabel,
  SelectItem,
  SelectPopup,
  SelectTrigger,
  SelectValue,
  Textarea,
  Typography,
} from "@enosta/en-ui"
import { Icon } from "@iconify/react"

import {
  CURRENT_ROLE,
  type CareerMap,
  type CareerState,
  DEPARTMENTS,
  type ExploreInput,
  LEVEL_NAMES,
  POSITIONS,
  type PositionKey,
  type RoleId,
  exploreMove,
  role,
  roleId,
} from "./model"
import { ROUTE_COLOR, StepRail } from "./route-style"

export type DialogSpec = {
  title: string
  desc: string
  lines: string[]
  confirmLabel: string
  confirmVariant: "primary" | "danger"
  from?: string
  to?: string
  listLabel?: string
  list?: string[]
  hasNote?: boolean
} & (
  | { kind: "setGoal"; id: RoleId }
  | { kind: "removeGoal"; id: RoleId }
  | { kind: "removeSteps"; id: RoleId }
  | { kind: "removeVision"; n: number }
  | { kind: "switch"; path: string; newGoal: RoleId | null }
  | { kind: "request"; n: number }
)

// Every change to the map is previewed here before it is applied.
export function ConfirmDialog({
  spec,
  note,
  onNoteChange,
  onClose,
  onConfirm,
}: {
  spec: DialogSpec | null
  note: string
  onNoteChange: (v: string) => void
  onClose: () => void
  onConfirm: () => void
}) {
  return (
    <Dialog onOpenChange={(open) => !open && onClose()} open={!!spec}>
      <DialogPopup className="sm:max-w-[28rem]">
        {spec && (
          <>
            <DialogHeader>
              <DialogTitle>{spec.title}</DialogTitle>
              <DialogDescription>{spec.desc}</DialogDescription>
            </DialogHeader>
            <DialogPanel className="grid gap-2xl">
              {spec.from && (
                <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-xl rounded-surface border border-neutral-200 px-2xl py-xl">
                  <div className="grid gap-2xs">
                    <Typography.Caption className="text-neutral-500">From</Typography.Caption>
                    <Typography.Label className="text-neutral-900">{spec.from}</Typography.Label>
                  </div>
                  <Icon aria-hidden="true" className="text-neutral-500" icon="tabler:arrow-right" />
                  <div className="grid gap-2xs">
                    <Typography.Caption className="text-neutral-500">To</Typography.Caption>
                    <Typography.Label className="text-neutral-900">{spec.to}</Typography.Label>
                  </div>
                </div>
              )}
              {spec.list && spec.list.length > 0 && (
                <div className="grid gap-xs rounded-surface border border-neutral-200 px-2xl py-xl">
                  <Typography.Caption className="text-neutral-500">
                    {spec.listLabel}
                  </Typography.Caption>
                  {spec.list.map((li) => (
                    <Typography.Label className="text-neutral-900" key={li}>
                      {li}
                    </Typography.Label>
                  ))}
                </div>
              )}
              {spec.lines.map((ln) => (
                <Typography.Small className="text-pretty text-neutral-700" key={ln}>
                  {ln}
                </Typography.Small>
              ))}
              {spec.hasNote && (
                <Field>
                  <FieldLabel>Note for your manager (optional)</FieldLabel>
                  <Textarea
                    onChange={(e) => onNoteChange(e.target.value)}
                    placeholder="Why this direction matters to you"
                    rows={3}
                    value={note}
                  />
                </Field>
              )}
            </DialogPanel>
            <DialogFooter>
              <Button onClick={onClose} variant="ghost">
                Cancel
              </Button>
              <Button onClick={onConfirm} variant={spec.confirmVariant}>
                {spec.confirmLabel}
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogPopup>
    </Dialog>
  )
}

const POSITION_LABEL = Object.fromEntries(
  Object.entries(POSITIONS).map(([k, p]) => [k, p.name]),
) as Record<string, string>

export function ExploreDialog({
  input,
  career,
  map: m,
  onChange,
  onClose,
  onConfirm,
}: {
  input: ExploreInput | null
  career: CareerState
  map: CareerMap
  onChange: (next: ExploreInput) => void
  onClose: () => void
  onConfirm: () => void
}) {
  const mv = exploreMove(career, m, input)
  const ok = mv?.ok ? mv : null
  const fromItems = Object.values(m.cards)
    .filter((c) => c.status !== "completed")
    .map((c) => ({ value: c.id, label: role(c.id).full }))
  const fromLabels = Object.fromEntries(fromItems.map((i) => [i.value, i.label]))
  const joinItems = input?.pos
    ? POSITIONS[input.pos].levels.map((l) => ({
        value: roleId(input.pos as PositionKey, l),
        label: `L${l} · ${LEVEL_NAMES[l]}`,
      }))
    : []
  const joinLabels = Object.fromEntries(joinItems.map((i) => [i.value, i.label]))

  // Picking your own position defaults to the next level up; anything else starts at its first level.
  const setPos = (v: PositionKey) => {
    if (!input) return
    const own = role(CURRENT_ROLE)
    const join =
      v === own.pos && POSITIONS[v].levels.includes(own.lvl + 1)
        ? roleId(v, own.lvl + 1)
        : roleId(v, POSITIONS[v].levels[0])
    onChange({ ...input, pos: v, join })
  }

  const color = ok ? ROUTE_COLOR[ok.kind] : ROUTE_COLOR.follow

  return (
    <Dialog onOpenChange={(open) => !open && onClose()} open={!!input}>
      <DialogPopup className="sm:max-w-[32rem]">
        <DialogHeader>
          <DialogTitle>Explore a position</DialogTitle>
          <DialogDescription>
            See where a move could take you. Your official role doesn&apos;t change.
          </DialogDescription>
        </DialogHeader>
        {input && (
          <DialogPanel className="grid gap-2xl">
            <Field>
              <FieldLabel>Starting from</FieldLabel>
              <Select
                items={fromLabels}
                onValueChange={(v) => v && onChange({ ...input, from: v as RoleId })}
                value={input.from || null}
              >
                <SelectTrigger aria-label="Starting from">
                  <SelectValue placeholder="Choose a role on your map" />
                </SelectTrigger>
                <SelectPopup>
                  {fromItems.map((i) => (
                    <SelectItem key={i.value} value={i.value}>
                      {i.label}
                    </SelectItem>
                  ))}
                </SelectPopup>
              </Select>
            </Field>
            <div className="grid grid-cols-2 gap-xl">
              <Field>
                <FieldLabel>Position</FieldLabel>
                <Select
                  items={POSITION_LABEL}
                  onValueChange={(v) => v && setPos(v as PositionKey)}
                  value={input.pos || null}
                >
                  <SelectTrigger aria-label="Position">
                    <SelectValue placeholder="Choose a position" />
                  </SelectTrigger>
                  <SelectPopup>
                    {DEPARTMENTS.map((dept) => (
                      <SelectGroup key={dept}>
                        <SelectGroupLabel>{dept}</SelectGroupLabel>
                        {Object.entries(POSITIONS)
                          .filter(([, p]) => p.dept === dept)
                          .map(([k, p]) => (
                            <SelectItem key={k} value={k}>
                              {p.name}
                            </SelectItem>
                          ))}
                      </SelectGroup>
                    ))}
                  </SelectPopup>
                </Select>
              </Field>
              <Field>
                <FieldLabel>Join at</FieldLabel>
                <Select
                  disabled={!input.pos}
                  items={joinLabels}
                  onValueChange={(v) => v && onChange({ ...input, join: v as RoleId })}
                  value={input.join || null}
                >
                  <SelectTrigger aria-label="Join at">
                    <SelectValue placeholder="Level" />
                  </SelectTrigger>
                  <SelectPopup>
                    {joinItems.map((i) => (
                      <SelectItem key={i.value} value={i.value}>
                        {i.label}
                      </SelectItem>
                    ))}
                  </SelectPopup>
                </Select>
              </Field>
            </div>
            {ok && (
              <div className="grid gap-md rounded-surface border border-neutral-200 p-xl">
                <div className="grid gap-2xs">
                  <Typography.Label className="text-neutral-900">{ok.heading}</Typography.Label>
                  {ok.sub && (
                    <Typography.Caption className="text-neutral-600">{ok.sub}</Typography.Caption>
                  )}
                </div>
                <StepRail
                  compact
                  dashed={color.dashed}
                  rows={ok.rows.map((r, i) => ({
                    key: String(i),
                    label: r.label,
                    muted: r.muted,
                    rail: r.muted ? "var(--color-neutral-300)" : color.strong,
                    dot: r.muted ? "var(--color-neutral-300)" : color.strong,
                  }))}
                />
              </div>
            )}
            {mv && !mv.ok && (
              <Typography.Small className="text-error-700" role="alert">
                {mv.error}
              </Typography.Small>
            )}
          </DialogPanel>
        )}
        <DialogFooter>
          <Button onClick={onClose} variant="ghost">
            Cancel
          </Button>
          <Button disabled={!ok} onClick={onConfirm}>
            Add to my map
          </Button>
        </DialogFooter>
      </DialogPopup>
    </Dialog>
  )
}
