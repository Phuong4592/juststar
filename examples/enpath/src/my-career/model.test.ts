import {
  type CareerState,
  applyRemoveSteps,
  buildMap,
  counts,
  exploreMove,
  initialCareer,
  removeStepsPlan,
  removeVisionPlan,
  switchGoal,
} from "./model"

const withChanges = (patch: Partial<CareerState>): CareerState => ({ ...initialCareer, ...patch })

describe("My Career model", () => {
  it("opens on Lan's map: changed path, no goal and a draft Career vision", () => {
    const m = buildMap(initialCareer)
    expect(m.cards["BE-L1"].status).toBe("completed")
    expect(m.cards["FE-L1"].status).toBe("new")
    expect(m.cards["BE-L2"].status).toBe("current")
    expect(m.cards["FE-L3"].status).toBe("planned")
    expect(m.cards["PD-L1"].status).toBe("vision")
    expect(m.goal).toBeNull()
    expect(m.routes.map((r) => r.id)).toEqual(["follow", "v1"])
  })

  it("counts readiness and leaves unset expectations out of the total", () => {
    const c = counts("BE-L4")
    expect(c).toMatchObject({ ready: 1, growth: 4, na: 1, notset: 0, total: 6 })
    expect(counts("PD-L3")).toMatchObject({ total: 0, notset: 3 })
  })

  it("only lets an approved Career vision role become the goal", () => {
    const draft = buildMap(withChanges({ goal: "PD-L2" }))
    expect(draft.goal).toBeNull()
    const approved = buildMap(
      withChanges({
        goal: "PD-L2",
        visions: [{ ...initialCareer.visions[0], status: "approved" }],
      }),
    )
    expect(approved.goal).toBe("PD-L2")
  })

  it("adds a company path segment when the move is on a published path", () => {
    const m = buildMap(initialCareer)
    const mv = exploreMove(initialCareer, m, { from: "BE-L2", pos: "PM", join: "PM-L2" })
    expect(mv?.ok && mv.type).toBe("company")
    if (!mv?.ok) throw new Error("expected a move")
    const next = { ...initialCareer, ...mv.apply(initialCareer) }
    expect(next.steps).toEqual([{ pathId: "e2p", start: "BE-L2", roles: ["PM-L2", "PM-L3"] }])
  })

  it("joins the end of an existing Career vision, and rejects moves already on the map", () => {
    const m = buildMap(initialCareer)
    const mv = exploreMove(initialCareer, m, { from: "PD-L2", pos: "PD", join: "PD-L3" })
    expect(mv?.ok && mv.heading).toBe("Joins Career vision 1")
    const dup = exploreMove(initialCareer, m, { from: "BE-L2", pos: "BE", join: "BE-L4" })
    expect(dup).toEqual({ ok: false, error: "Backend Engineer from L4 is already on your map." })
  })

  it("blocks removing a Career vision while it waits for approval", () => {
    const s = withChanges({ visions: [{ ...initialCareer.visions[0], status: "waiting" }] })
    expect(removeVisionPlan(s, buildMap(s), 1).block).toMatch(/waiting for approval/)
  })

  it("removes a company segment from the chosen role onwards", () => {
    const s = withChanges({ steps: [{ pathId: "e2p", start: "BE-L2", roles: ["PM-L2", "PM-L3"] }] })
    const m = buildMap(s)
    expect(removeStepsPlan(s, m, "PM-L3").cardsGone).toEqual(["PM-L3"])
    expect(applyRemoveSteps(s, m, "PM-L2").steps).toEqual([])
  })

  it("moves the goal to the next level when switching to a path without it", () => {
    const m = buildMap(withChanges({ goal: "FE-L3" }))
    expect(switchGoal(m, "e2p")).toBe("BE-L3")
  })
})
