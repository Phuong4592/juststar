import {
  buildContractCanvasModel,
  contractBlueprintLayout,
  contractCategory,
  type ContractRecord,
} from "./contract-canvas-model"

function makeContract(overrides: Partial<ContractRecord> = {}): ContractRecord {
  return {
    anatomy: {
      parts: [{ part: "root", description: "Root boundary." }],
      structure: "<Example>Content</Example>",
    },
    behaviorOwner: { capabilities: ["native-semantics"], kind: "native" },
    documentation: "src/components/example/README.md",
    id: "component.example",
    publicParts: ["root"],
    slots: [{ name: "children", required: false, description: "Optional content." }],
    states: ["default"],
    status: "beta",
    tokens: { required: [] },
    ...overrides,
  }
}

describe("contract canvas model", () => {
  it("renders only anatomy and slots declared by the current contract", () => {
    const model = buildContractCanvasModel(makeContract())

    expect(model.root.part).toBe("root")
    expect(model.parts).toEqual([])
    expect(model.rootSlots).toEqual([
      { name: "children", required: false, description: "Optional content." },
    ])
    expect(model.minimalAnatomy).toBe(true)
  })

  it("keeps required slots first without inventing hierarchy", () => {
    const model = buildContractCanvasModel(
      makeContract({
        slots: [
          { name: "secondary", required: true, description: "Supporting content." },
          { name: "label", required: false, description: "Optional label." },
          { name: "primary", required: true, description: "Primary content." },
        ],
      }),
    )

    expect(model.slots.map(({ name }) => name)).toEqual(["secondary", "primary", "label"])
  })

  it("classifies public contracts as atomic components", () => {
    expect(contractCategory(makeContract())).toBe("component")
  })

  it("maps declared slots into matching anatomy regions", () => {
    const model = buildContractCanvasModel(
      makeContract({
        anatomy: {
          parts: [
            { part: "example", description: "Component boundary." },
            { part: "example-content", description: "Component content." },
          ],
          structure: "<Example content={...} />",
        },
        slots: [{ name: "content", required: true, description: "Component content." }],
      }),
    )

    expect(model.regions.find(({ name }) => name === "content")?.slots[0]?.name).toBe("content")
    expect(model.rootSlots).toEqual([])
  })

  it("uses compact silhouettes for minimally declared primitive contracts", () => {
    expect(contractBlueprintLayout(makeContract({ id: "component.checkbox" }))).toBe(
      "atomic-inline",
    )
    expect(contractBlueprintLayout(makeContract({ id: "component.dialog" }))).toBe("overlay")
    expect(contractBlueprintLayout(makeContract({ id: "component.table" }))).toBe("data")
  })
})
