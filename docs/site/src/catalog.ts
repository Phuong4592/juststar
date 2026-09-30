import packageManifest from "../../../package.json"

export const packageVersion = packageManifest.version

export const componentGroups = [
  { components: ["Button"], group: "Actions" },
  {
    components: ["Avatar", "Badge", "Card", "Frame", "Kbd", "Separator", "Skeleton", "Table"],
    group: "Data display",
  },
  { components: ["Alert", "Spinner", "Toast"], group: "Feedback" },
  {
    components: ["Checkbox", "Checkbox Group", "Combobox", "Field", "Input", "Select"],
    group: "Forms",
  },
  { components: ["Tabs"], group: "Navigation" },
  { components: ["Dialog", "Popover", "Tooltip"], group: "Overlays" },
  { components: ["Scroll Area", "Typography"], group: "Primitives" },
] as const

export const componentCount = componentGroups.reduce(
  (total, group) => total + group.components.length,
  0,
)
