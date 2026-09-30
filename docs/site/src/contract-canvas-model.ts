export interface ContractPart {
  description: string
  part: string
}

export interface ContractSlot {
  description: string
  name: string
  required: boolean
}

export interface ContractRecord {
  anatomy: {
    parts?: ContractPart[]
    structure: string
  }
  behaviorOwner: {
    capabilities: string[]
    kind: string
  }
  documentation: string
  id: string
  publicParts: string[]
  slots: ContractSlot[]
  states: string[]
  status: string
  tokens: { required: string[] }
}

export type ContractCategory = "component"

export type ContractBlueprintLayout =
  "atomic-inline" | "atomic-block" | "surface" | "overlay" | "data" | "typography"

export interface ContractCanvasRegion extends ContractPart {
  name: string
  slots: ContractSlot[]
}

export interface ContractCanvasModel {
  category: ContractCategory
  contract: ContractRecord
  layout: ContractBlueprintLayout
  minimalAnatomy: boolean
  parts: ContractPart[]
  regions: ContractCanvasRegion[]
  root: ContractPart
  rootSlots: ContractSlot[]
  slots: ContractSlot[]
  title: string
}

const blueprintLayouts: Partial<Record<string, ContractBlueprintLayout>> = {
  "component.typography": "typography",
}

const atomicInlineIds = new Set([
  "component.avatar",
  "component.badge",
  "component.button",
  "component.checkbox",
  "component.kbd",
  "component.separator",
  "component.spinner",
])

const surfaceIds = new Set(["component.card", "component.frame"])
const overlayIds = new Set([
  "component.dialog",
  "component.popover",
  "component.toast",
  "component.tooltip",
])
const dataIds = new Set(["component.scroll-area", "component.table"])

const explicitSlotTargets: Record<string, Record<string, string>> = {}

function humanize(value: string) {
  return value
    .split("-")
    .filter(Boolean)
    .map((part) => `${part.charAt(0).toUpperCase()}${part.slice(1)}`)
    .join(" ")
}

export function contractTitle(contract: ContractRecord) {
  return humanize(contract.id.replace(/^component\./, ""))
}

export function contractCategory(_contract: ContractRecord): ContractCategory {
  return "component"
}

export function contractBlueprintLayout(contract: ContractRecord): ContractBlueprintLayout {
  const declared = blueprintLayouts[contract.id]
  if (declared) return declared
  if (atomicInlineIds.has(contract.id)) return "atomic-inline"
  if (surfaceIds.has(contract.id)) return "surface"
  if (overlayIds.has(contract.id)) return "overlay"
  if (dataIds.has(contract.id)) return "data"
  return "atomic-block"
}

function regionName(rootPart: string, part: string) {
  const prefix = `${rootPart}-`
  return part.startsWith(prefix) ? part.slice(prefix.length) : part
}

export function buildContractCanvasModel(contract: ContractRecord): ContractCanvasModel {
  const declaredParts = contract.anatomy.parts?.length
    ? contract.anatomy.parts
    : contract.publicParts.map((part) => ({
        description: `Public ${humanize(part).toLowerCase()} part.`,
        part,
      }))
  const fallbackRoot = contract.id.replace(/^component\./, "")
  const [root = { description: "Contract boundary.", part: fallbackRoot }, ...parts] = declaredParts
  const targets = explicitSlotTargets[contract.id] ?? {}
  const assignedSlots = new Set<string>()
  const regions = parts.map((part) => {
    const name = regionName(root.part, part.part)
    const slots = contract.slots.filter((slot) => {
      const target = targets[slot.name] ?? slot.name
      const matches = target === name || name.endsWith(`-${target}`)
      if (matches) assignedSlots.add(slot.name)
      return matches
    })

    return { ...part, name, slots }
  })
  const sortedSlots = [...contract.slots].sort(
    (left, right) => Number(right.required) - Number(left.required),
  )

  return {
    category: contractCategory(contract),
    contract,
    layout: contractBlueprintLayout(contract),
    minimalAnatomy: parts.length === 0,
    parts,
    regions,
    root,
    rootSlots: sortedSlots.filter((slot) => !assignedSlots.has(slot.name)),
    slots: sortedSlots,
    title: contractTitle(contract),
  }
}
