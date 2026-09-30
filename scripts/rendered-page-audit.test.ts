import {
  collectRenderedPageFindings,
  observePageIssues,
} from "../.agents/skills/en-ui-consumer/scripts/rendered-page-audit.mjs"

function setBox(
  element: Element,
  {
    clientHeight,
    clientWidth,
    height = clientHeight,
    left = 0,
    top = 0,
    scrollHeight = clientHeight,
    scrollWidth = clientWidth,
    width = clientWidth,
  }: {
    clientHeight: number
    clientWidth: number
    height?: number
    left?: number
    top?: number
    scrollHeight?: number
    scrollWidth?: number
    width?: number
  },
) {
  Object.defineProperties(element, {
    clientHeight: { configurable: true, value: clientHeight },
    clientWidth: { configurable: true, value: clientWidth },
    scrollHeight: { configurable: true, value: scrollHeight },
    scrollWidth: { configurable: true, value: scrollWidth },
  })
  Object.defineProperty(element, "getBoundingClientRect", {
    configurable: true,
    value: () =>
      ({
        bottom: top + height,
        height,
        left,
        right: left + width,
        top,
        width,
        x: left,
        y: top,
        toJSON() {
          return this
        },
      }) as DOMRect,
  })
}

describe("rendered page audit helper", () => {
  beforeEach(() => {
    document.body.innerHTML = ""
    document.documentElement.removeAttribute("style")
    document.documentElement.style.setProperty("--color-surface", "white")
    document.documentElement.style.setProperty("--font-size-body-md", "16px")
    document.documentElement.style.setProperty("--space-md", "8px")
    Object.defineProperty(window, "innerWidth", { configurable: true, value: 375 })
    Object.defineProperty(window, "innerHeight", { configurable: true, value: 812 })
    Object.defineProperty(document.documentElement, "scrollWidth", {
      configurable: true,
      value: 375,
    })
  })

  it("reports structural and page overflow findings", () => {
    document.body.innerHTML = `
      <main>
        <h1>Users</h1>
        <h3>Invitations</h3>
        <div id="duplicate"></div>
        <div id="duplicate"></div>
      </main>
    `
    Object.defineProperty(document.documentElement, "scrollWidth", {
      configurable: true,
      value: 420,
    })

    const report = collectRenderedPageFindings()
    const rules = report.findings.map((finding) => finding.ruleId)

    expect(rules).toEqual(
      expect.arrayContaining(["page-horizontal-overflow", "duplicate-id", "skipped-heading-level"]),
    )
  })

  it("reports when the En UI stylesheet or theme is not loaded", () => {
    document.documentElement.removeAttribute("style")
    document.body.innerHTML = `<main><h1>Projects</h1></main>`

    const report = collectRenderedPageFindings()

    expect(report.findings).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          ruleId: "missing-en-ui-styles",
          severity: "error",
        }),
      ]),
    )
  })

  it("reports clipped and constrained long typography", () => {
    document.body.innerHTML = `
      <main>
        <h1>Settings</h1>
        <div class="row">
          <p>This is a deliberately long paragraph used to prove that a generated interface can squeeze meaningful supporting content and averylongidentifierwithoutanybreakopportunities1234567890 into a block that is too narrow for comfortable reading.</p>
        </div>
      </main>
    `
    const row = document.querySelector<HTMLElement>(".row")!
    const paragraph = document.querySelector<HTMLElement>("p")!
    row.style.display = "flex"
    paragraph.style.overflowX = "hidden"
    paragraph.style.overflowY = "hidden"
    paragraph.style.whiteSpace = "nowrap"
    setBox(row, { clientHeight: 48, clientWidth: 180 })
    setBox(paragraph, {
      clientHeight: 40,
      clientWidth: 180,
      scrollHeight: 80,
      scrollWidth: 360,
    })

    const report = collectRenderedPageFindings()
    const rules = report.findings.map((finding) => finding.ruleId)

    expect(rules).toEqual(
      expect.arrayContaining([
        "text-horizontal-clipping",
        "text-vertical-clipping",
        "long-text-narrow-block",
        "unbreakable-content",
        "text-container-min-width",
      ]),
    )
  })

  it("reports overflowing controls, summaries, and responsive regions", () => {
    document.body.innerHTML = `
      <main>
        <h1>Release review</h1>
        <button>All responders</button>
        <dl style="display: grid; border-top: 1px solid; border-bottom: 1px solid">
          <div style="padding: 8px 0"><dt>Blocking findings</dt><dd>2</dd></div>
        </dl>
        <section data-en-responsive-boundary>Constrained preview</section>
      </main>
    `
    const button = document.querySelector<HTMLElement>("button")!
    const summary = document.querySelector<HTMLElement>("dl > div")!
    const responsiveBoundary = document.querySelector<HTMLElement>("[data-en-responsive-boundary]")!
    setBox(button, {
      clientHeight: 32,
      clientWidth: 96,
      scrollHeight: 54,
      scrollWidth: 96,
    })
    setBox(summary, { clientHeight: 64, clientWidth: 240 })
    setBox(responsiveBoundary, { clientHeight: 120, clientWidth: 240, scrollWidth: 320 })

    const report = collectRenderedPageFindings()
    const rules = report.findings.map((finding) => finding.ruleId)

    expect(rules).toEqual(
      expect.arrayContaining([
        "control-label-overflow",
        "bounded-summary-inset",
        "responsive-region-horizontal-overflow",
      ]),
    )
  })

  it("reports font drift without imposing a consumer table surface rule", () => {
    document.body.innerHTML = `
      <main>
        <h1 style="font-family: Nunito">Incidents</h1>
        <p style="font-family: Arial">Unexpected interface font</p>
        <table>
          <tbody>
            <tr style="background: white"><td>INC-1</td></tr>
            <tr style="background: white"><td>INC-2</td></tr>
          </tbody>
        </table>
      </main>
    `
    const paragraph = document.querySelector<HTMLElement>("p")!
    setBox(paragraph, { clientHeight: 20, clientWidth: 240 })

    const report = collectRenderedPageFindings()
    const rules = report.findings.map((finding) => finding.ruleId)

    expect(rules).toContain("unexpected-font-family")
    expect(rules).not.toContain("table-row-surface-repetition")
  })

  it("reports AI chat composers that escape their panel or use global fixed positioning", () => {
    document.body.innerHTML = `
      <main>
        <section data-en-part="ai-chat-page">
          <h1>Assistant</h1>
          <div class="messages-viewport" style="overflow-y: auto">
            <div data-en-part="ai-chat-page-messages">Conversation</div>
          </div>
          <div data-en-part="ai-chat-page-composer" style="position: fixed">Composer</div>
        </section>
      </main>
    `
    const chat = document.querySelector<HTMLElement>("[data-en-part='ai-chat-page']")!
    const messagesViewport = document.querySelector<HTMLElement>(".messages-viewport")!
    const composer = document.querySelector<HTMLElement>("[data-en-part='ai-chat-page-composer']")!
    setBox(chat, { clientHeight: 812, clientWidth: 375 })
    setBox(messagesViewport, { clientHeight: 700, clientWidth: 375, top: 50 })
    setBox(composer, { clientHeight: 60, clientWidth: 375, top: 760 })

    const report = collectRenderedPageFindings()
    const rules = report.findings.map((finding) => finding.ruleId)

    expect(rules).toEqual(
      expect.arrayContaining(["ai-chat-composer-global-fixed", "ai-chat-composer-outside-panel"]),
    )
  })

  it("captures Playwright-compatible runtime errors without failing the run", () => {
    const handlers = new Map<string, (value: any) => void>()
    const page = {
      off: vi.fn((event: string) => handlers.delete(event)),
      on: vi.fn((event: string, handler: (value: any) => void) => handlers.set(event, handler)),
    }
    const observed = observePageIssues(page)

    handlers.get("console")?.({ text: () => "Failed request", type: () => "error" })
    handlers.get("pageerror")?.(new Error("Render failed"))

    expect(observed.stop()).toEqual([
      { message: "Failed request", ruleId: "console-error", severity: "error" },
      { message: "Render failed", ruleId: "page-error", severity: "error" },
    ])
  })
})
