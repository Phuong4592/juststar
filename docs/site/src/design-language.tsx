import { Badge, Button, Kbd, Typography, buttonVariants } from "@enosta/en-ui"
import { createRoot, hydrateRoot } from "react-dom/client"

import "./site.css"

import { packageVersion } from "./catalog"
import { SiteContainer, SitePageHeader, SiteSection } from "./site-layout"
import { Arrow, SiteShell } from "./site-shell"

const principles = [
  {
    detail:
      "The primary task, decision, or exception is visible before supporting metrics and narrative.",
    label: "Work before decoration",
  },
  {
    detail:
      "Borders, alignment, and spacing describe relationships. Shadows appear only when elevation changes.",
    label: "Structure is explicit",
  },
  {
    detail:
      "Compact controls and dense records remain readable because every spacing role communicates hierarchy.",
    label: "Density stays breathable",
  },
  {
    detail:
      "Color signals action, attention, success, or danger. It does not decorate interchangeable cards.",
    label: "Color carries meaning",
  },
  {
    detail:
      "People read guidance while agents read contracts, but both operate from the same system authority.",
    label: "One source of truth",
  },
] as const

const materials = [
  ["Mineral", "Durable neutral surfaces for product infrastructure", "mineral"],
  ["Paper", "A calm reading plane for forms, records, and guidance", "paper"],
  ["Petrol", "Decisive actions, focus, and active navigation", "petrol"],
  ["Brass", "Attention and pending work without unnecessary alarm", "brass"],
  ["Oxide", "Danger, failure, and irreversible consequence", "oxide"],
] as const

const spacingRoles = [
  ["Tight", "4px", "Within one small object"],
  ["Related", "8px", "Between directly related content"],
  ["Section", "24px", "Between groups with separate meaning"],
  ["Page", "32px", "Between major workflow regions"],
] as const

export function DesignLanguagePage() {
  return (
    <SiteShell active="design" depth="nested">
      <main className="design-page">
        <SiteContainer className="design-hero site-shell" gutter="none" size="wide">
          <SitePageHeader
            actions={
              <a
                className={`${buttonVariants({ variant: "secondary" })} site-button-link`}
                href="../storybook/"
              >
                Inspect the catalog <Arrow />
              </a>
            }
            density="compact"
            description="En UI is a dense operational language for products where people scan records, resolve exceptions, and make consequential decisions. Its identity comes from disciplined structure, not decorative effects."
            metadata={
              <>
                <Badge variant="outline">Design language</Badge>
                <Typography.Caption as="span">
                  Foundation authority · {packageVersion}
                </Typography.Caption>
              </>
            }
            title="Clarity for work that has consequence."
          />
          <div className="design-hero-reference" aria-label="Design language summary">
            <Typography.Eyebrow>Visual thesis</Typography.Eyebrow>
            <Typography.H3 as="strong">
              Industrial precision with a human reading rhythm.
            </Typography.H3>
            <Typography.Small>
              Mineral and paper surfaces hold the workspace. Petrol marks decisive action. Brass and
              oxide reserve attention for states that genuinely need it.
            </Typography.Small>
          </div>
        </SiteContainer>

        <section className="design-section design-section-surface" aria-labelledby="design-source">
          <SiteContainer className="site-shell design-source-layout" gutter="none" size="wide">
            <div className="design-section-heading">
              <Typography.Eyebrow>01 · Source material</Typography.Eyebrow>
              <Typography.H2 as="h2" id="design-source">
                A visual vocabulary drawn from workbenches and ledgers.
              </Typography.H2>
              <Typography.Text>
                The references are tactile but the implementation is digital: quiet planes, precise
                divisions, durable controls, and clear signals that survive dense data.
              </Typography.Text>
            </div>
            <div className="material-board">
              {materials.map(([label, detail, material]) => (
                <article className={`material-card material-card-${material}`} key={label}>
                  <span aria-hidden="true" />
                  <div>
                    <Typography.H3 as="h3">{label}</Typography.H3>
                    <Typography.Small>{detail}</Typography.Small>
                  </div>
                </article>
              ))}
              <article className="material-note">
                <Typography.Eyebrow>Reference rule</Typography.Eyebrow>
                <Typography.Small>
                  Borrow the restraint and hierarchy of the source material, never a literal texture
                  that competes with product content.
                </Typography.Small>
              </article>
            </div>
          </SiteContainer>
        </section>

        <SiteContainer
          className="design-section site-shell design-principles-layout"
          gutter="none"
          size="wide"
          aria-labelledby="design-principles"
        >
          <div className="design-section-heading design-section-heading-sticky">
            <Typography.Eyebrow>02 · Principles</Typography.Eyebrow>
            <Typography.H2 as="h2" id="design-principles">
              Every visual decision must improve orientation or action.
            </Typography.H2>
            <Typography.Text>
              The system is intentionally opinionated about hierarchy, density, semantics, and
              evidence. Novelty is never the acceptance criterion.
            </Typography.Text>
          </div>
          <ol className="principle-ledger">
            {principles.map((principle, index) => (
              <li key={principle.label}>
                <Typography.Caption as="span">
                  {String(index + 1).padStart(2, "0")}
                </Typography.Caption>
                <div>
                  <Typography.H3 as="h3">{principle.label}</Typography.H3>
                  <Typography.Small>{principle.detail}</Typography.Small>
                </div>
              </li>
            ))}
          </ol>
        </SiteContainer>

        <section className="design-section design-type-section" aria-labelledby="design-type">
          <SiteContainer className="site-shell" gutter="none" size="wide">
            <div className="design-section-heading design-section-heading-inline">
              <div>
                <Typography.Eyebrow>03 · Typography</Typography.Eyebrow>
                <Typography.H2 as="h2" id="design-type">
                  A warm interface voice with exact operational metadata.
                </Typography.H2>
              </div>
              <Typography.Text>
                Nunito carries instructions, decisions, and operational values. Geist Mono is
                reserved for code, commands, paths, hashes, serialized values, and system evidence.
              </Typography.Text>
            </div>
            <div className="type-specimen">
              <div className="type-specimen-display">
                <Typography.Eyebrow>Nunito · Display</Typography.Eyebrow>
                <Typography.Display as="strong">Signals before decoration.</Typography.Display>
                <Typography.Small>
                  Sentence case, restrained scale changes, and compact line lengths keep attention
                  on the work rather than the interface.
                </Typography.Small>
              </div>
              <div className="type-specimen-mono">
                <Typography.Eyebrow>Nunito · Operational values</Typography.Eyebrow>
                <Typography.H5 as="p">REN-2048 / 09:42 / RISK 92</Typography.H5>
                <dl>
                  <div>
                    <Typography.Caption as="dt">Caption</Typography.Caption>
                    <Typography.MonoSmall as="dd">12px</Typography.MonoSmall>
                  </div>
                  <div>
                    <Typography.Caption as="dt">Body</Typography.Caption>
                    <Typography.MonoSmall as="dd">16px</Typography.MonoSmall>
                  </div>
                  <div>
                    <Typography.Caption as="dt">Section</Typography.Caption>
                    <Typography.MonoSmall as="dd">28px</Typography.MonoSmall>
                  </div>
                  <div>
                    <Typography.Caption as="dt">Page</Typography.Caption>
                    <Typography.MonoSmall as="dd">32px</Typography.MonoSmall>
                  </div>
                </dl>
              </div>
            </div>
          </SiteContainer>
        </section>

        <SiteContainer
          className="design-section site-shell design-foundation-grid"
          gutter="none"
          size="wide"
          aria-labelledby="design-rhythm"
        >
          <SiteSection
            className="spacing-specimen"
            density="compact"
            description="One role for one relationship. Spacing communicates grouping before decoration does."
            headingAs="h2"
            title="Rhythm on a 4px base"
            variant="surface"
          >
            <div className="spacing-ledger">
              {spacingRoles.map(([label, value, use], index) => (
                <div key={label}>
                  <span className={`spacing-bar spacing-bar-${index + 1}`} aria-hidden="true" />
                  <Typography.Label as="strong">{label}</Typography.Label>
                  <code>{value}</code>
                  <Typography.Small>{use}</Typography.Small>
                </div>
              ))}
            </div>
          </SiteSection>

          <SiteSection
            className="elevation-specimen"
            density="compact"
            description="Spacing and typography establish most groups. Boundaries and shadows appear only when structure or stacking needs another cue."
            headingAs="h2"
            title="Boundaries and elevation"
            variant="surface"
          >
            <div className="elevation-stack" aria-label="Elevation examples">
              <div>
                <Typography.Caption as="span">Ledger</Typography.Caption>
                <Typography.Label as="strong">Border only</Typography.Label>
              </div>
              <div>
                <Typography.Caption as="span">Raised</Typography.Caption>
                <Typography.Label as="strong">Sticky surface</Typography.Label>
              </div>
              <div>
                <Typography.Caption as="span">Overlay</Typography.Caption>
                <Typography.Label as="strong">Focused choice</Typography.Label>
              </div>
            </div>
          </SiteSection>
        </SiteContainer>

        <section className="design-section design-anatomy-section" aria-labelledby="design-anatomy">
          <SiteContainer className="site-shell" gutter="none" size="wide">
            <div className="design-section-heading design-section-heading-inline">
              <div>
                <Typography.Eyebrow>04 · Composition</Typography.Eyebrow>
                <Typography.H2 as="h2" id="design-anatomy">
                  The page reads like a decision map.
                </Typography.H2>
              </div>
              <Typography.Text>
                Navigation establishes place, the page header states purpose, controls frame the
                task, and records remain comparable inside a stable content geometry.
              </Typography.Text>
            </div>
            <div className="anatomy-frame">
              <aside>
                <Typography.Caption as="span">Product navigation</Typography.Caption>
                <Typography.Label as="strong">Place</Typography.Label>
                <ul>
                  <li data-active="true">Renewals</li>
                  <li>Accounts</li>
                  <li>Forecasts</li>
                </ul>
              </aside>
              <div className="anatomy-main">
                <header>
                  <div>
                    <Typography.Caption as="span">Page header</Typography.Caption>
                    <Typography.Label as="strong">Purpose and primary action</Typography.Label>
                  </div>
                  <Button size="sm">Create review</Button>
                </header>
                <div className="anatomy-toolbar">
                  <Typography.Caption as="span">Search and filters</Typography.Caption>
                  <Badge variant="outline">3 active</Badge>
                </div>
                <div className="anatomy-records">
                  <Typography.Caption as="span">Comparable records</Typography.Caption>
                  <i />
                  <i />
                  <i />
                  <i />
                </div>
              </div>
              <aside className="anatomy-context">
                <Typography.Caption as="span">Supporting context</Typography.Caption>
                <Typography.Label as="strong">Evidence and consequence</Typography.Label>
                <Typography.Small>
                  Keep it adjacent when it changes the decision; move it below when passive.
                </Typography.Small>
              </aside>
            </div>
          </SiteContainer>
        </section>

        <SiteContainer
          className="design-section site-shell design-anti-layout"
          gutter="none"
          size="wide"
          aria-labelledby="design-anti"
        >
          <div className="design-section-heading">
            <Typography.Eyebrow>05 · Anti-references</Typography.Eyebrow>
            <Typography.H2 as="h2" id="design-anti">
              What En UI deliberately refuses.
            </Typography.H2>
            <Typography.Text>
              These constraints keep generated and hand-built product pages from becoming generic,
              decorative, or difficult to operate.
            </Typography.Text>
          </div>
          <div className="anti-ledger">
            <div>
              <Typography.Eyebrow>Refuse</Typography.Eyebrow>
              <Typography.Label as="strong">Interchangeable card grids</Typography.Label>
              <Typography.Small>
                Repeated surfaces with equal emphasis hide task priority.
              </Typography.Small>
            </div>
            <div>
              <Typography.Eyebrow>Refuse</Typography.Eyebrow>
              <Typography.Label as="strong">Decorative glass and glow</Typography.Label>
              <Typography.Small>
                Effects do not replace structure, contrast, or a real layering reason.
              </Typography.Small>
            </div>
            <div>
              <Typography.Eyebrow>Refuse</Typography.Eyebrow>
              <Typography.Label as="strong">Oversized slogan heroes</Typography.Label>
              <Typography.Small>
                Product interfaces lead with purpose, state, and the next meaningful action.
              </Typography.Small>
            </div>
            <div>
              <Typography.Eyebrow>Refuse</Typography.Eyebrow>
              <Typography.Label as="strong">Invented metrics and empty chrome</Typography.Label>
              <Typography.Small>
                Every visible element represents believable content or interaction.
              </Typography.Small>
            </div>
          </div>
        </SiteContainer>

        <SiteContainer className="design-next site-shell" gutter="none" size="wide">
          <div>
            <Badge variant="secondary">Apply the language</Badge>
            <Typography.H2 as="h2">
              Start from product context, then compose from verified contracts.
            </Typography.H2>
            <Typography.Text>
              Install the consumer skill, preserve the system boundary, and validate the rendered
              page at real container widths.
            </Typography.Text>
          </div>
          <div>
            <a className={`${buttonVariants({ size: "lg" })} site-button-link`} href="../docs/">
              Install En UI <Arrow />
            </a>
            <Typography.Caption as="span">
              Review with <Kbd>pnpm design:check</Kbd>
            </Typography.Caption>
          </div>
        </SiteContainer>
      </main>
    </SiteShell>
  )
}

if (typeof document !== "undefined") {
  const root = document.getElementById("root")
  if (root) {
    if (root.hasChildNodes()) hydrateRoot(root, <DesignLanguagePage />)
    else createRoot(root).render(<DesignLanguagePage />)
  }
}
