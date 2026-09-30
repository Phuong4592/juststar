import {
  buildComponentContext,
  formatComponentContext,
  parseContextArgs,
} from "./en-ui-context.mjs"

describe("En UI component context", () => {
  it("parses component and query options", () => {
    expect(parseContextArgs(["searchable", "selection", "--limit", "3"])).toEqual({
      components: [],
      json: false,
      limit: 3,
      query: "searchable selection",
    })
    expect(parseContextArgs(["--components", "button,dialog", "--json"]).components).toEqual([
      "button",
      "dialog",
    ])
  })

  it("finds components from installed contracts and guidance", async () => {
    const context = await buildComponentContext({ limit: 3, query: "searchable selection" })
    expect(context.components[0]?.name).toBe("combobox")
    expect(formatComponentContext(context)).toContain("src/components/combobox/README.md")
  })

  it("loads several explicitly selected components in one context", async () => {
    const context = await buildComponentContext({ components: ["button", "dialog", "field"] })
    expect(context.components.map((component) => component.name).sort()).toEqual([
      "button",
      "dialog",
      "field",
    ])
  })
})
