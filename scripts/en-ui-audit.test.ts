import { parseAuditArgs } from "./en-ui-audit-options.mjs"

describe("En UI rendered audit CLI", () => {
  it("requires viewports discovered from the consumer", () => {
    expect(() => parseAuditArgs(["http://localhost:4173/projects"])).toThrow(
      "Discover the consumer's supported sizes",
    )
  })

  it("accepts consumer-specific viewports and output", () => {
    expect(
      parseAuditArgs([
        "http://localhost:3000/settings",
        "--viewports",
        "390x844,1440x900",
        "--output",
        "artifacts/en-ui",
      ]),
    ).toEqual(
      expect.objectContaining({
        output: "artifacts/en-ui",
        viewports: [
          { width: 390, height: 844 },
          { width: 1440, height: 900 },
        ],
      }),
    )
  })
})
