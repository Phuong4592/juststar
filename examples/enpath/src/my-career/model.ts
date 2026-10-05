// Domain model and pure planning logic for the My Career page.
// Sample data stands in for the EnPath API: Lan Nguyen, Backend Engineer L2.

export type RoleId = string
export type PositionKey = "BE" | "FE" | "QA" | "PM" | "PD"
export type RouteKind = "follow" | "company" | "vision"
export type VisionStatus = "draft" | "waiting" | "approved" | "declined"
export type CardStatus = "completed" | "new" | "current" | "goal" | "planned" | "vision"
export type CompetencyState = "ready" | "growth" | "na" | "notset"

export const LEVEL_NAMES: Record<number, string> = { 1: "Junior", 2: "Mid", 3: "Senior", 4: "Lead" }
export const POINT_NAMES: Record<number, string> = {
  1: "Foundational",
  2: "Developing",
  3: "Intermediate",
  4: "Advanced",
  5: "Expert",
}

export const POSITIONS: Record<PositionKey, { name: string; dept: string; levels: number[] }> = {
  BE: { name: "Backend Engineer", dept: "Engineering", levels: [1, 2, 3, 4] },
  FE: { name: "Frontend Engineer", dept: "Engineering", levels: [1, 2, 3, 4] },
  QA: { name: "QA Engineer", dept: "Engineering", levels: [1, 2, 3] },
  PM: { name: "Product Manager", dept: "Product", levels: [1, 2, 3, 4] },
  PD: { name: "Product Designer", dept: "Design", levels: [1, 2, 3] },
}
export const DEPARTMENTS = ["Engineering", "Product", "Design"]

export const COMPETENCIES: Record<string, string> = {
  api: "API design",
  code: "Code quality",
  sys: "System design",
  test: "Testing",
  collab: "Collaboration",
  own: "Ownership",
  ui: "UI engineering",
  a11y: "Accessibility",
  auto: "Test automation",
  disc: "Product discovery",
  prio: "Prioritization",
  stake: "Stakeholder communication",
  data: "Data analysis",
  visual: "Visual design",
  ixd: "Interaction design",
  research: "User research",
}

export const BEHAVIOURS: Record<string, Record<number, string>> = {
  api: {
    3: "Designs APIs for a whole feature, including errors, versioning and docs.",
    4: "Designs APIs across services and reviews other teams’ API decisions.",
  },
  code: {
    3: "Writes code others can change safely and reviews for clarity and risk.",
    4: "Sets code standards for the team and improves them over time.",
  },
  test: {
    2: "Adds unit tests for their own changes.",
    3: "Plans the test approach for a feature, including integration tests.",
  },
  own: {
    3: "Owns a feature end to end, including rollout and follow-up.",
    4: "Owns outcomes for an area and plans work across people.",
  },
  ui: {
    2: "Builds screens from designs with shared components.",
    3: "Builds complex UI and improves shared components.",
  },
  sys: {
    3: "Designs a service with clear boundaries and written trade-offs.",
    4: "Designs systems across services and guides others through trade-offs.",
  },
}

// Expected point per competency at each Position-Level. `null` means not set in Setup.
export const EXPECTATIONS: Record<RoleId, Record<string, number | null>> = {
  "BE-L1": { api: 1, code: 1, test: 1, collab: 1 },
  "BE-L2": { api: 2, code: 2, test: 2, collab: 2, own: 2, sys: null },
  "BE-L3": { api: 3, code: 3, sys: 3, test: 3, collab: 3, own: 3 },
  "BE-L4": { api: 4, code: 4, sys: 4, test: 3, collab: 3, own: 4 },
  "FE-L1": { ui: 1, code: 1, test: 1, collab: 1 },
  "FE-L2": { ui: 2, code: 2, test: 2, collab: 2, a11y: null },
  "FE-L3": { ui: 3, code: 3, test: 3, collab: 3, own: 3, a11y: 2 },
  "FE-L4": { ui: 4, code: 4, a11y: 3, own: 4, collab: 3 },
  "QA-L1": { test: 1, auto: 1, collab: 1 },
  "QA-L2": { test: 2, auto: 2, collab: 2, own: 2 },
  "QA-L3": { test: 3, auto: 3, collab: 3, own: 3, stake: null },
  "PM-L1": { disc: 1, prio: 1, stake: 1, collab: 1 },
  "PM-L2": { disc: 2, prio: 2, stake: 2, data: 2, collab: 2 },
  "PM-L3": { disc: 3, prio: 3, stake: 3, data: 3, collab: 3, own: 3 },
  "PM-L4": { disc: 4, prio: 4, stake: 4, data: 3, own: 4 },
  "PD-L1": { visual: 1, ixd: 1, research: 1, collab: 1 },
  "PD-L2": { visual: 2, ixd: 2, research: 2, collab: 2, stake: null },
  "PD-L3": { visual: null, ixd: null, research: null },
}

export const SCORE_SOURCE = "H1 2026 assessment, approved 14 Jul"
export const SCORES: Record<string, number> = {
  api: 3,
  code: 3,
  test: 2,
  collab: 3,
  own: 2,
  stake: 2,
  ui: 1,
}

export interface PathChange {
  date: string
  added: RoleId[]
  removed: RoleId[]
  wasGoal?: RoleId
}
export interface CompanyPath {
  id: string
  name: string
  levels: RoleId[]
  changes: PathChange[]
}

export const PATHS: Record<string, CompanyPath> = {
  eng: {
    id: "eng",
    name: "Engineering growth",
    levels: ["BE-L1", "FE-L1", "BE-L2", "FE-L3", "BE-L4"],
    changes: [{ date: "27 Sep", added: ["FE-L1", "FE-L3"], removed: ["BE-L3"], wasGoal: "BE-L3" }],
  },
  e2p: {
    id: "e2p",
    name: "Engineering to product",
    levels: ["BE-L2", "BE-L3", "PM-L2", "PM-L3"],
    changes: [],
  },
  design: { id: "design", name: "Design craft", levels: ["PD-L1", "PD-L2", "PD-L3"], changes: [] },
}

export const CURRENT_ROLE: RoleId = "BE-L2"
export const HELD_ROLES: RoleId[] = ["BE-L1"]

// Map geometry in canvas pixels.
export const CARD_W = 176
export const CARD_H = 104
const COL_GAP = 64
const ROW_GAP = 44
export const MAP_PAD = 40

export function role(id: RoleId) {
  const [p, l] = id.split("-L")
  const lvl = Number(l)
  const posName = POSITIONS[p as PositionKey].name
  return {
    pos: p as PositionKey,
    lvl,
    posName,
    short: `L${lvl} · ${LEVEL_NAMES[lvl]}`,
    full: `${posName} L${lvl} · ${LEVEL_NAMES[lvl]}`,
  }
}
export const roleId = (p: PositionKey, l: number): RoleId => `${p}-L${l}`
export const point = (n: number) => `${n} · ${POINT_NAMES[n]}`

export const VISION_STATUS: Record<
  VisionStatus,
  { label: string; badge: "outline" | "info" | "success" | "secondary"; lower: string }
> = {
  draft: { label: "Draft", badge: "outline", lower: "draft" },
  waiting: { label: "Waiting for approval", badge: "info", lower: "waiting for approval" },
  approved: { label: "Approved", badge: "success", lower: "approved" },
  declined: { label: "Declined", badge: "secondary", lower: "declined" },
}

export interface Competency {
  c: string
  name: string
  need: number | null
  have: number | undefined
  st: CompetencyState
}

export function competencies(id: RoleId): Competency[] {
  return Object.entries(EXPECTATIONS[id] ?? {}).map(([c, need]) => {
    const have = SCORES[c]
    const st: CompetencyState =
      need == null ? "notset" : have == null ? "na" : have >= need ? "ready" : "growth"
    return { c, name: COMPETENCIES[c], need, have, st }
  })
}

export interface Counts {
  ready: number
  growth: number
  na: number
  notset: number
  total: number
  list: Competency[]
}

export function counts(id: RoleId): Counts {
  const list = competencies(id)
  const n = (k: CompetencyState) => list.filter((x) => x.st === k).length
  return {
    ready: n("ready"),
    growth: n("growth"),
    na: n("na"),
    notset: n("notset"),
    total: list.length - n("notset"),
    list,
  }
}

export interface Vision {
  n: number
  start: RoleId
  roles: RoleId[]
  status: VisionStatus
  note: string
  managerNote: string
}
export interface Step {
  pathId: string
  start: RoleId
  roles: RoleId[]
}

export interface CareerState {
  followed: string
  goal: RoleId | null
  removedGoal: RoleId | null
  steps: Step[]
  visions: Vision[]
  nextV: number
}

export const initialCareer: CareerState = {
  followed: "eng",
  goal: null,
  removedGoal: "BE-L3",
  steps: [],
  visions: [
    { n: 1, start: "BE-L2", roles: ["PD-L1", "PD-L2"], status: "draft", note: "", managerNote: "" },
  ],
  nextV: 2,
}

export interface Route {
  id: string
  kind: RouteKind
  name: string
  seq: RoleId[]
  pathId?: string
  idx?: number
  v?: Vision
}

export interface MapCard {
  id: RoleId
  x: number
  y: number
  col: number
  row: number
  visions: number[]
  stepPath?: string
  approved: boolean
  onFollow: boolean
  status: CardStatus
}

export interface CareerMap {
  routes: Route[]
  cards: Record<RoleId, MapCard>
  linkSet: Set<string>
  goal: RoleId | null
  fp: CompanyPath
  bw: number
  bh: number
}

export function buildMap(s: CareerState): CareerMap {
  const fp = PATHS[s.followed]
  const routes: Route[] = [
    { id: "follow", kind: "follow", name: fp.name, pathId: fp.id, seq: fp.levels.slice() },
  ]
  s.visions.forEach((v) =>
    routes.push({
      id: "v" + v.n,
      kind: "vision",
      name: "Career vision " + v.n,
      v,
      seq: [v.start, ...v.roles],
    }),
  )
  s.steps.forEach((st, i) =>
    routes.push({
      id: "c" + i,
      kind: "company",
      idx: i,
      name: PATHS[st.pathId].name,
      pathId: st.pathId,
      seq: [st.start, ...st.roles],
    }),
  )

  const ids: RoleId[] = []
  routes.forEach((r) => r.seq.forEach((id) => !ids.includes(id) && ids.push(id)))
  const ci = fp.levels.indexOf(CURRENT_ROLE)

  const links: [RoleId, RoleId][] = []
  const linkSet = new Set<string>()
  routes.forEach((r) => {
    for (let i = 1; i < r.seq.length; i++) {
      links.push([r.seq[i - 1], r.seq[i]])
      linkSet.add(r.seq[i - 1] + ">" + r.seq[i])
    }
  })

  // Columns: longest chain of links leading to each card. Rows: first route a card appears on.
  const col: Record<RoleId, number> = {}
  ids.forEach((id) => (col[id] = 0))
  for (let it = 0; it < 40; it++) {
    let changed = false
    links.forEach(([a, b]) => {
      if (col[b] < col[a] + 1) {
        col[b] = col[a] + 1
        changed = true
      }
    })
    if (!changed) break
  }
  const row: Record<RoleId, number> = {}
  let rows = 0
  routes.forEach((rt) => {
    let used = false
    rt.seq.forEach((id) => {
      if (row[id] == null) {
        row[id] = rows
        used = true
      }
    })
    if (used) rows++
  })

  const cards: Record<RoleId, MapCard> = {}
  let maxC = 0
  ids.forEach((id) => {
    const fi = fp.levels.indexOf(id)
    const visions = s.visions.filter((v) => v.roles.includes(id)).map((v) => v.n)
    const stepPath = s.steps.find((st) => st.roles.includes(id))?.pathId
    const approved = s.visions.some((v) => v.status === "approved" && v.roles.includes(id))
    let status: CardStatus
    if (id === CURRENT_ROLE) status = "current"
    else if (fi >= 0 && fi < ci) status = HELD_ROLES.includes(id) ? "completed" : "new"
    else if (fi > ci || stepPath) status = "planned"
    else if (visions.length) status = "vision"
    else status = "planned"
    if (s.goal === id && (status === "planned" || (status === "vision" && approved)))
      status = "goal"
    const c = col[id]
    maxC = Math.max(maxC, c)
    cards[id] = {
      id,
      col: c,
      row: row[id],
      x: MAP_PAD + c * (CARD_W + COL_GAP),
      y: MAP_PAD + row[id] * (CARD_H + ROW_GAP),
      visions,
      stepPath,
      approved,
      onFollow: fi >= 0,
      status,
    }
  })
  const goal = s.goal && cards[s.goal]?.status === "goal" ? s.goal : null
  return {
    routes,
    cards,
    linkSet,
    goal,
    fp,
    bw: MAP_PAD * 2 + (maxC + 1) * CARD_W + maxC * COL_GAP,
    bh: MAP_PAD * 2 + rows * CARD_H + Math.max(0, rows - 1) * ROW_GAP,
  }
}

export type Selection = { t: "card"; id: RoleId } | { t: "route"; id: string } | null

export function activeRouteId(m: CareerMap, sel: Selection): string {
  if (sel?.t === "route") return sel.id
  if (sel?.t === "card") {
    const r = m.routes.find((rt) =>
      (rt.kind === "follow" ? rt.seq : rt.seq.slice(1)).includes(sel.id),
    )
    if (r) return r.id
  }
  return "follow"
}

export interface ExploreInput {
  from: RoleId
  pos: PositionKey | ""
  join: RoleId
}

export interface ExploreRow {
  label: string
  muted: boolean
}

export type ExploreMove =
  | { ok: false; error: string }
  | {
      ok: true
      type: "company" | "vision"
      kind: RouteKind
      heading: string
      sub: string
      rows: ExploreRow[]
      apply: (s: CareerState) => Partial<CareerState>
      toast: string
      last: RoleId
    }

// Works out whether exploring a position extends a company path or a Career vision.
export function exploreMove(
  s: CareerState,
  m: CareerMap,
  e: ExploreInput | null,
): ExploreMove | null {
  if (!e || !e.from || !e.pos || !e.join) return null
  const onMap = (id: RoleId) => !!m.cards[id]
  const P = POSITIONS[e.pos]
  const jl = role(e.join).lvl
  const pos = e.pos
  const ladder = P.levels.filter((l) => l >= jl).map((l) => roleId(pos, l))
  const errMsg = `${P.name} from L${jl} is already on your map.`
  const already = (id: RoleId) => ({
    label: role(id).full + (onMap(id) ? " · already on your map" : ""),
    muted: onMap(id),
  })

  const cands = Object.values(PATHS).filter(
    (p) =>
      p.levels.includes(CURRENT_ROLE) &&
      p.levels.includes(e.from) &&
      p.levels.includes(e.join) &&
      p.levels.indexOf(e.from) < p.levels.indexOf(e.join),
  )
  if (cands.length) {
    const cp = cands.find((p) => p.levels.slice(p.levels.indexOf(e.join)).some((id) => !onMap(id)))
    if (!cp) return { ok: false, error: errMsg }
    const seg = cp.levels.slice(cp.levels.indexOf(e.join))
    const add = seg.filter((id) => !onMap(id))
    return {
      ok: true,
      type: "company",
      kind: cp.id === s.followed ? "follow" : "company",
      heading: `Part of ${cp.name} · no approval needed`,
      sub: "",
      rows: [{ label: "Starts from " + role(e.from).full, muted: true }, ...seg.map(already)],
      apply: (st) => ({ steps: [...st.steps, { pathId: cp.id, start: e.from, roles: add }] }),
      toast: `${P.name} added as planned steps`,
      last: add[add.length - 1],
    }
  }

  const completed = Object.values(m.cards)
    .filter((c) => c.status === "completed")
    .map((c) => c.id)
  const vv = s.visions.find((v) => v.roles.includes(e.from))
  let n: number
  let start: RoleId
  let prefix: RoleId[]
  let joins = false
  if (vv && vv.roles[vv.roles.length - 1] === e.from) {
    joins = true
    n = vv.n
    start = vv.start
    prefix = vv.roles.slice()
  } else if (vv) {
    n = s.nextV
    start = vv.start
    prefix = vv.roles.slice(0, vv.roles.indexOf(e.from) + 1)
  } else {
    n = s.nextV
    start = e.from
    prefix = []
  }
  const skip = new Set([start, ...prefix, CURRENT_ROLE, ...completed])
  const add = ladder.filter((id) => !skip.has(id))
  const chain = [prefix.length ? prefix[prefix.length - 1] : start, ...add]
  const allExists =
    add.length > 0 && chain.every((id, i) => i === 0 || m.linkSet.has(chain[i - 1] + ">" + id))
  if (!add.length || allExists) return { ok: false, error: errMsg }
  return {
    ok: true,
    type: "vision",
    kind: "vision",
    heading: joins ? `Joins Career vision ${n}` : `Becomes Career vision ${n}`,
    sub: "Private until you send it for approval.",
    rows: [
      { label: "Starts from " + role(start).full, muted: true },
      ...prefix.map((id) => ({ label: role(id).full + " · already on your map", muted: true })),
      ...add.map(already),
    ],
    apply: (st) =>
      joins
        ? { visions: st.visions.map((v) => (v.n === n ? { ...v, roles: [...prefix, ...add] } : v)) }
        : {
            visions: [
              ...st.visions,
              { n, start, roles: [...prefix, ...add], status: "draft", note: "", managerNote: "" },
            ],
            nextV: st.nextV + 1,
          },
    toast: `${P.name} added to Career vision ${n}`,
    last: add[add.length - 1],
  }
}

const GOAL_BLOCK = "Your Active goal is on it. Set another goal before removing it."
const waitingBlock = (n: number) =>
  `Career vision ${n} is waiting for approval. Withdraw the request before removing it.`

// Removing a role added from another company path also removes everything after it on that
// segment, plus any Career vision that starts from one of those roles.
export function removeStepsPlan(s: CareerState, m: CareerMap, id: RoleId) {
  const i = s.steps.findIndex((st) => st.roles.includes(id))
  const st = s.steps[i]
  const gone = st.roles.slice(st.roles.indexOf(id))
  const vGone = s.visions.filter((v) => gone.includes(v.start))
  const lost = new Set(gone)
  vGone.forEach((v) => v.roles.forEach((r) => lost.add(r)))
  const stillUsed = (x: RoleId) =>
    m.routes.some(
      (rt) =>
        !(rt.kind === "company" && rt.idx === i) &&
        !(rt.kind === "vision" && rt.v && vGone.includes(rt.v)) &&
        rt.seq.includes(x),
    )
  const cardsGone = [...lost].filter((x) => !stillUsed(x))
  let block = ""
  if (m.goal && cardsGone.includes(m.goal)) block = GOAL_BLOCK
  const w = vGone.find((v) => v.status === "waiting")
  if (w) block = waitingBlock(w.n)
  return { i, vGone, cardsGone, block }
}

export function removeVisionPlan(s: CareerState, m: CareerMap, n: number) {
  const v = s.visions.find((x) => x.n === n)!
  const stillUsed = (x: RoleId) => m.routes.some((rt) => rt.id !== "v" + n && rt.seq.includes(x))
  const cardsGone = v.roles.filter((x) => !stillUsed(x))
  let block = ""
  if (m.goal && cardsGone.includes(m.goal)) block = GOAL_BLOCK
  if (v.status === "waiting") block = waitingBlock(n)
  return { v, cardsGone, block }
}

export function applyRemoveSteps(s: CareerState, m: CareerMap, id: RoleId): Partial<CareerState> {
  const p = removeStepsPlan(s, m, id)
  return {
    steps: s.steps
      .map((x, i) => (i === p.i ? { ...x, roles: x.roles.slice(0, x.roles.indexOf(id)) } : x))
      .filter((x) => x.roles.length),
    visions: s.visions.filter((v) => !p.vGone.includes(v)),
  }
}

// When switching paths, a goal that isn't on the new path moves to the next level after yours.
export function switchGoal(m: CareerMap, to: string): RoleId | null {
  const tp = PATHS[to]
  if (!m.goal || tp.levels.includes(m.goal)) return m.goal
  return tp.levels[tp.levels.indexOf(CURRENT_ROLE) + 1] ?? null
}

export const followablePaths = () =>
  Object.values(PATHS).filter((p) => p.levels.includes(CURRENT_ROLE))
