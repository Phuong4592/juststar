import { analyzeSource } from "./en-ui-check.mjs"

describe("En UI consumer guardrails", () => {
  it("accepts compositions built from En UI components and tokens", () => {
    const source = `
      import { Button, Field, Input, Typography } from "@enosta/en-ui"
      export function Search({ avatarUrl, imageProps }) {
        return <section aria-labelledby="search-heading">
          <Typography.H2 id="search-heading">Search</Typography.H2>
          <Field label="Search"><Input /></Field>
          <Button className="transition-opacity ease-out">Apply</Button>
          <Typography.Caption className="border-l"><img alt="Owner" src={avatarUrl} /></Typography.Caption>
          <img {...imageProps} alt="Project" />
        </section>
      }
    `
    expect(analyzeSource(source)).toEqual([])
  })

  it("reports package-owned composition imports", () => {
    const source = `
      import { ApplicationShell, PageHeader, type SplitLayoutProps } from "@enosta/en-ui"
      export function Workspace() { return <ApplicationShell /> }
    `
    const diagnostics = analyzeSource(source)

    expect(diagnostics).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          message:
            '"ApplicationShell" is application composition. Define this layout or pattern in the consumer using semantic HTML and En UI atoms.',
          ruleId: "en-ui/no-package-composition",
        }),
        expect.objectContaining({
          ruleId: "en-ui/no-package-composition",
        }),
      ]),
    )
    expect(
      diagnostics.filter((item) => item.ruleId === "en-ui/no-package-composition"),
    ).toHaveLength(3)
  })

  it("reports imports missing from the installed aggregate contract", () => {
    const source = `
      import { Button, Stack, type DrawerProps } from "@enosta/en-ui"
      export function Toolbar() { return <Button>Save</Button> }
    `
    const diagnostics = analyzeSource(source)

    expect(diagnostics).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          message: '"Stack" is not exported by the installed @enosta/en-ui contract.',
          ruleId: "en-ui/no-unavailable-export",
        }),
        expect.objectContaining({
          message: '"DrawerProps" is not exported by the installed @enosta/en-ui contract.',
          ruleId: "en-ui/no-unavailable-export",
        }),
      ]),
    )
  })

  it("reports foreign controls, raw values, internal imports, and unsafe truncation", () => {
    const source = `
      import { Button } from "@mui/material"
      import { inputStyles } from "@enosta/en-ui/src/components/input"
      export function BadCard() {
        return <div className="truncate bg-[#123456] p-[13px] gap-7" style={{ color: "rgb(1 2 3)" }}>
          <button>Save</button><input /><table><tbody /></table>
        </div>
      }
    `
    const ruleIds = analyzeSource(source).map((item) => item.ruleId)
    expect(ruleIds).toEqual(
      expect.arrayContaining([
        "en-ui/no-foreign-component-library",
        "en-ui/no-internal-import",
        "en-ui/no-raw-color",
        "en-ui/no-inline-visual-style",
        "en-ui/no-native-control",
        "en-ui/no-native-table",
        "en-ui/no-arbitrary-tailwind",
        "en-ui/no-tailwind-spacing-scale",
        "en-ui/accessible-truncation",
      ]),
    )
  })

  it("reports consumer-authored typography choices", () => {
    const source = `
      export function UnstableType() {
        return <section>
          <h1 className="font-serif text-5xl font-light leading-tight tracking-tight">Overview</h1>
          <p className="text-sm font-medium">Operational status</p>
        </section>
      }
    `
    const ruleIds = analyzeSource(source).map((item) => item.ruleId)

    expect(
      ruleIds.filter((ruleId) => ruleId === "en-ui/no-ad-hoc-typography").length,
    ).toBeGreaterThan(0)
  })

  it("leaves intentional visual direction to rendered review while reporting objective defects", () => {
    const source = `
      export function GeneratedFeature() {
        return <section className="bg-radial backdrop-blur-md shadow-[0_0_24px_var(--en-color-brand)] rounded-xl border-l-4 animate-pulse transition-all">
          <h2 className="bg-clip-text text-transparent">Supercharge everything</h2>
          <p className="text-[10px]">Functional status</p>
          <div className="animate-bounce ease-elastic">Status</div>
          <div className="animate-marquee">Customers</div>
          <img alt="Missing source" />
          <img alt="Placeholder" src="/images/placeholder.png" />
        </section>
      }
    `
    const ruleIds = analyzeSource(source).map((item) => item.ruleId)
    expect(ruleIds).toEqual(
      expect.arrayContaining([
        "en-ui/no-layout-transition",
        "en-ui/no-tiny-functional-text",
        "en-ui/no-placeholder-image",
      ]),
    )
    expect(ruleIds).not.toEqual(
      expect.arrayContaining([
        "en-ui/no-decorative-gradient",
        "en-ui/no-glassmorphism",
        "en-ui/no-decorative-glow",
        "en-ui/no-thick-side-accent",
        "en-ui/no-decorative-motion",
        "en-ui/no-gradient-text",
      ]),
    )
  })

  it("allows purposeful motion, readable text, valid images, and neutral dividers", () => {
    const source = `
      import { Typography } from "@enosta/en-ui"
      export function OperationalStatus({ diagramUrl }) {
        return <section className="border-l backdrop-blur-none transition-opacity duration-200 ease-out">
          <Typography.Caption>Updated two minutes ago</Typography.Caption>
          <div className="animate-spin" role="status">Loading</div>
          <img alt="Deployment topology" src={diagramUrl} />
        </section>
      }
    `
    expect(analyzeSource(source)).toEqual([])
  })

  it("allows native semantic controls when the installed package has no matching export", () => {
    const source = `
      export function StorageUsage() {
        return <label>Storage used <meter min="0" max="100" value="42" /></label>
      }
    `

    expect(analyzeSource(source)).toEqual([])
  })

  it("allows consumer-owned semantic layout variables", () => {
    const source = `
      export function Page() {
        return <main className="px-[var(--page-gutter)] max-w-[var(--content-width)]" />
      }
    `

    expect(analyzeSource(source)).toEqual([])
  })

  it("reports max-width classes derived from named or numeric spacing scales", () => {
    const source = `
      export function Page() {
        return <main className="mx-auto max-w-xl lg:max-w-96" />
      }
    `

    const diagnostics = analyzeSource(source).filter(
      (item) => item.ruleId === "en-ui/no-spacing-token-as-max-width",
    )
    expect(diagnostics).toHaveLength(2)
  })
})
