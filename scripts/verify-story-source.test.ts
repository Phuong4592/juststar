import { extractStorySources } from "./verify-story-source.mjs"

describe("Storybook composed-source guard", () => {
  it("generates copyable imports, data, helpers, and the final composition", () => {
    const source = `
      import type { Meta, StoryObj } from "@storybook/react"
      import { Button } from "../button"
      const records = [{ id: "one" }]
      function LoginSpecimen() { return <main>Login</main> }
      const meta = { title: "Patterns/Login" } satisfies Meta
      export default meta
      export const Default = { render: () => <LoginSpecimen /> }
    `

    const [entry] = extractStorySources(source)

    expect(entry).toMatchObject({ id: "patterns-login--default", story: "Default" })
    expect(entry.code).toContain('import { Button } from "../button"')
    expect(entry.code).toContain("function LoginSpecimen()")
    expect(entry.code).toContain("export default function DefaultExample()")
    expect(entry.code).not.toContain("@storybook/react")
    expect(entry.code).not.toContain("const meta")
    expect(entry.code).not.toContain("const records")
  })

  it("includes nested helper data dependencies", () => {
    const source = `
      const records = [{ id: "one" }]
      const unused = "skip me"
      function Rows() { return records.map((record) => <p key={record.id}>{record.id}</p>) }
      function Page() { return <main><Rows /></main> }
      const meta = { title: "Patterns/Data" }
      export default meta
      export const Default = { render: () => <Page /> }
    `

    const [entry] = extractStorySources(source)

    expect(entry.code).toContain('const records = [{ id: "one" }]')
    expect(entry.code).toContain("function Rows()")
    expect(entry.code).toContain("function Page()")
    expect(entry.code).not.toContain("unused")
  })

  it("preserves authored source and direct public-component stories", () => {
    const source = `
      import { Button } from "@enosta/en-ui"
      function LoginSpecimen() { return <main>Login</main> }
      const meta = { title: "Patterns/Login" }
      export default meta
      export const Authored = {
        render: () => <LoginSpecimen />,
        parameters: { docs: { source: { code: "<main>Login</main>" } } },
      }
      export const Direct = { render: () => <Button>Save</Button> }
    `

    expect(extractStorySources(source)).toEqual([])
  })
})
