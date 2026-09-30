import {
  Avatar,
  Badge,
  Button,
  Field,
  FieldDescription,
  FieldLabel,
  Input,
  Separator,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Typography,
  buttonVariants,
} from "@enosta/en-ui"
import { useState } from "react"
import { createRoot, hydrateRoot } from "react-dom/client"

import "./site.css"

import { componentCount, componentGroups, packageVersion } from "./catalog"
import { SiteContainer, SitePageHeader, SiteSection } from "./site-layout"
import { Arrow, SiteShell } from "./site-shell"

interface CodeBlockProps {
  children: string
  label: string
}

function CodeBlock({ children, label }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  async function copy() {
    await navigator.clipboard.writeText(children)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1400)
  }

  return (
    <div className="code-block">
      <div className="code-block-header">
        <Typography.MonoCaption as="span">{label}</Typography.MonoCaption>
        <Button size="sm" variant="ghost" onClick={copy}>
          {copied ? "Copied" : "Copy"}
        </Button>
      </div>
      <pre tabIndex={0}>
        <code>{children}</code>
      </pre>
    </div>
  )
}

const npmrc = `@enosta:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=\${GITHUB_PACKAGES_TOKEN}`

const installation = `pnpm add @enosta/en-ui
pnpm exec en-ui-init-ai`

const usage = `import "@enosta/en-ui/styles.css"

import {
  Badge,
  Button,
  Field,
  FieldDescription,
  FieldLabel,
  Input,
} from "@enosta/en-ui"

export function InviteMember() {
  return (
    <form>
      <Field>
        <FieldLabel>Email address</FieldLabel>
        <Input name="email" type="email" placeholder="name@company.com" />
        <FieldDescription>We will send a workspace invitation.</FieldDescription>
      </Field>
      <Badge variant="info">Viewer access</Badge>
      <Button type="submit">Send invitation</Button>
    </form>
  )
}`

const customization = `[data-theme="your-product"] {
  --color-brand-400: var(--product-accent-focus);
  --color-brand-500: var(--product-accent-solid);
  --color-brand-700: var(--product-accent-strong);
  --color-bg-brand: var(--color-brand-500);
  --focus-ring-color: var(--color-brand-400);
  --radius-control: 5px;
  --radius-overlay: 10px;
}`

const docsSections = [
  ["installation", "Installation"],
  ["quick-start", "Quick start"],
  ["catalog", "Catalog"],
  ["theme", "Theme"],
  ["contracts", "Contracts and AI"],
  ["verification", "Verification"],
  ["troubleshooting", "Troubleshooting"],
] as const

function DocsNavigation() {
  return (
    <nav aria-label="Documentation sections">
      {docsSections.map(([id, label]) => (
        <a href={`#${id}`} key={id}>
          <Typography.Label as="span">{label}</Typography.Label>
        </a>
      ))}
    </nav>
  )
}

export function DocsPage() {
  return (
    <SiteShell active="docs" depth="nested">
      <main>
        <SiteContainer className="docs-layout site-shell" gutter="none" size="wide">
          <aside className="docs-sidebar">
            <Typography.Eyebrow className="docs-sidebar-label">
              Version {packageVersion}
            </Typography.Eyebrow>
            <DocsNavigation />
            <a
              className={`${buttonVariants({ size: "sm" })} site-button-link`}
              href="#installation"
            >
              Get started <Arrow />
            </a>
          </aside>

          <article className="docs-content">
            <SitePageHeader
              actions={
                <a
                  className={`${buttonVariants({ variant: "secondary" })} site-button-link`}
                  href="../storybook/"
                >
                  Browse components <Arrow />
                </a>
              }
              className="docs-hero"
              density="compact"
              description="En UI provides compiled React components, a default public theme, Storybook evidence, Markdown guidance, and machine-readable contracts from one package boundary."
              metadata={
                <>
                  <Badge variant="outline">Version {packageVersion}</Badge>
                  <Typography.Caption as="span">
                    {componentCount} public atoms · consumer-owned composition
                  </Typography.Caption>
                </>
              }
              title="Install En UI and work from its published contracts."
            />

            <details className="docs-mobile-index">
              <summary>
                <Typography.Label as="span">On this page</Typography.Label>
              </summary>
              <DocsNavigation />
            </details>

            <section className="docs-section" id="installation">
              <div className="docs-section-heading">
                <Typography.Caption as="span">01</Typography.Caption>
                <div>
                  <Typography.H2 as="h2">Installation</Typography.H2>
                  <Typography.Text>
                    Connect pnpm to the Enosta GitHub Packages scope, then add the library.
                  </Typography.Text>
                </div>
              </div>
              <Typography.Small className="docs-note">
                <Typography.Label as="strong">Token permissions.</Typography.Label> Use a GitHub
                token with <code>read:packages</code>. Private repositories may also require{" "}
                <code>repo</code>.
              </Typography.Small>
              <CodeBlock label=".npmrc">{npmrc}</CodeBlock>
              <CodeBlock label="Package and consumer skill">{installation}</CodeBlock>
              <div className="installation-outcomes">
                <div>
                  <Typography.Caption as="span">01</Typography.Caption>
                  <div>
                    <Typography.Label as="strong">Install the runtime</Typography.Label>
                    <Typography.Small>
                      Atoms, interaction primitives, variables, contracts, guidance, and the
                      compiled stylesheet arrive from one package boundary.
                    </Typography.Small>
                  </div>
                </div>
                <div>
                  <Typography.Caption as="span">02</Typography.Caption>
                  <div>
                    <Typography.Label as="strong">Install the consumer skill</Typography.Label>
                    <Typography.Small>
                      The initializer adds product discovery, prototype, specification,
                      implementation, review, and rendered-validation guidance to the consumer
                      repository.
                    </Typography.Small>
                  </div>
                </div>
              </div>
              <Typography.Text>
                Import <code>@enosta/en-ui/styles.css</code> once at the application entry point.
                The {packageVersion} stylesheet includes component utilities, bundled Nunito and
                Geist Mono fonts, default variables, animations, and Tailwind Preflight.
              </Typography.Text>
            </section>

            <section className="docs-section" id="quick-start">
              <div className="docs-section-heading">
                <Typography.Caption as="span">02</Typography.Caption>
                <div>
                  <Typography.H2 as="h2">Use package-root exports</Typography.H2>
                  <Typography.Text>
                    Import public components from <code>@enosta/en-ui</code>. Do not reach into
                    source, adapter, or component-internal paths.
                  </Typography.Text>
                </div>
              </div>
              <CodeBlock label="src/features/members/invite-member.tsx">{usage}</CodeBlock>
              <SiteSection
                className="quick-start-preview"
                density="compact"
                headingAs="h3"
                title="Invite member preview"
                variant="surface"
              >
                <div className="quick-start-person">
                  <Avatar fallback={{ children: "AL" }} />
                  <div>
                    <Typography.Label as="strong">Ada Lovelace</Typography.Label>
                    <Typography.Caption as="span">Pending workspace invitation</Typography.Caption>
                  </div>
                  <Badge variant="info">Viewer access</Badge>
                </div>
                <Field>
                  <FieldLabel>Email address</FieldLabel>
                  <Input defaultValue="ada@example.com" type="email" />
                  <FieldDescription>We will send a workspace invitation.</FieldDescription>
                </Field>
                <Button>Send invitation</Button>
              </SiteSection>
            </section>

            <section className="docs-section" id="catalog">
              <div className="docs-section-heading">
                <Typography.Caption as="span">03</Typography.Caption>
                <div>
                  <Typography.H2 as="h2">Know what version {packageVersion} exports</Typography.H2>
                  <Typography.Text>
                    The aggregate contract marks every {packageVersion} export as beta. Installed
                    package availability remains defined by that version's contract.
                  </Typography.Text>
                </div>
              </div>
              <div className="catalog-table">
                {componentGroups.map(({ components, group }) => (
                  <div key={group}>
                    <Typography.Label as="strong">{group}</Typography.Label>
                    <Typography.Small as="span" className="catalog-table-components">
                      {components.join(", ")}
                    </Typography.Small>
                    <Badge size="sm" variant="secondary">
                      Beta
                    </Badge>
                  </div>
                ))}
              </div>
              <Typography.Small className="docs-note">
                <Typography.Label as="strong">Version awareness.</Typography.Label> Version{" "}
                {packageVersion} exposes atomic components only. Consumer repositories own shells,
                headers, sidebars, pages, workspaces, and reusable layout patterns, with local
                contracts for product intent, responsive behavior, states, and verification.
              </Typography.Small>
              <a
                className={`${buttonVariants({ variant: "secondary" })} site-button-link`}
                href="../storybook/"
              >
                Browse variants and states in Storybook <Arrow />
              </a>
            </section>

            <Separator className="docs-major-separator" />

            <section className="docs-section" id="theme">
              <div className="docs-section-heading">
                <Typography.Caption as="span">04</Typography.Caption>
                <div>
                  <Typography.H2 as="h2">
                    Customize the default theme through variables
                  </Typography.H2>
                  <Typography.Text>
                    Override supported variables after the package stylesheet. Keep component
                    selectors and protected interaction styles untouched.
                  </Typography.Text>
                </div>
              </div>
              <CodeBlock label="src/styles/product-theme.css">{customization}</CodeBlock>
              <div className="customization-demo" data-theme="docs-preview">
                <div className="customization-demo-copy">
                  <Badge variant="success">Scoped theme</Badge>
                  <Typography.H3 as="h3">
                    Variables update every component in this product region.
                  </Typography.H3>
                  <Typography.Small>
                    The preview changes the brand ramp and shape without forking component code.
                  </Typography.Small>
                </div>
                <div className="customization-demo-actions">
                  <Button>Save project</Button>
                  <Button variant="secondary">Compare changes</Button>
                </div>
              </div>
              <div className="token-table-wrap">
                <Table className="token-table">
                  <TableHeader>
                    <TableRow>
                      <TableHead>Area</TableHead>
                      <TableHead>Start with</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Brand actions</TableCell>
                      <TableCell>
                        <code>--color-brand-400</code>, <code>--color-brand-500</code>, and
                        <code> --color-brand-700</code>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Semantic surfaces</TableCell>
                      <TableCell>
                        <code>--color-canvas</code>, <code>--color-surface</code>, and
                        <code> --color-container</code>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Content pairs</TableCell>
                      <TableCell>
                        <code>--color-on-canvas</code>, <code>--color-on-surface</code>, and
                        <code> --color-on-brand</code>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Shape and elevation</TableCell>
                      <TableCell>
                        <code>--radius-control</code>, <code>--radius-overlay</code>, and
                        <code> --shadow-overlay</code>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Layout rhythm</TableCell>
                      <TableCell>
                        <code>--space-xs</code> through <code>--space-6xl</code>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
              <Typography.Small className="docs-note">
                <Typography.Label as="strong">Package scope.</Typography.Label> Version{" "}
                {packageVersion} ships one default theme under
                <code> :root</code> and <code>[data-theme=&quot;default&quot;]</code>. It does not
                publish the experimental site preview themes selected in this documentation header.
              </Typography.Small>
            </section>

            <section className="docs-section" id="contracts">
              <div className="docs-section-heading">
                <Typography.Caption as="span">05</Typography.Caption>
                <div>
                  <Typography.H2 as="h2">Give people and agents the same authority</Typography.H2>
                  <Typography.Text>
                    Contract schema v2 describes exports, props, anatomy, states, accessibility
                    ownership, required stories, tests, tokens, and migration notes.
                  </Typography.Text>
                </div>
              </div>
              <CodeBlock label="Package authorities">{`@enosta/en-ui/contract.json
@enosta/en-ui/theme.json
@enosta/en-ui/foundations.md
@enosta/en-ui/contracts/button
@enosta/en-ui/docs/button`}</CodeBlock>
              <Typography.Text>
                The aggregate system contract includes all {componentCount} public atoms. The{" "}
                <code>contracts/*</code> and <code>docs/*</code> shortcuts resolve their contracts
                and Markdown guidance. Application composition is intentionally absent.
              </Typography.Text>
              <CodeBlock label="Consumer setup">{`pnpm exec en-ui-init-ai
pnpm exec en-ui-check src

# Workspace member dependency
pnpm --filter <consumer-package> exec en-ui-init-ai
pnpm --filter <consumer-package> exec en-ui-check src`}</CodeBlock>
              <Typography.Text>
                The initializer installs both the consumer implementation workflow and the visual
                audit skill. Substantial pages are rendered, critiqued, revised, and recaptured
                before they are considered visually validated.
              </Typography.Text>
              <div className="agent-prompt">
                <Typography.Label as="span">Suggested instruction</Typography.Label>
                <Typography.Text as="blockquote">
                  Inspect the installed En UI version and aggregate contract before choosing atoms.
                  Define every shell, header, sidebar, page, workspace, and reusable layout pattern
                  in the consumer repository, preserving protected behavior, accessibility, semantic
                  tokens, and locally documented responsive rules.
                </Typography.Text>
              </div>
            </section>

            <Separator className="docs-major-separator" />

            <section className="docs-section" id="verification">
              <div className="docs-section-heading">
                <Typography.Caption as="span">06</Typography.Caption>
                <div>
                  <Typography.H2 as="h2">Run the checks that match your role</Typography.H2>
                  <Typography.Text>
                    Consumers verify compositions; package contributors verify contracts and
                    releases.
                  </Typography.Text>
                </div>
              </div>
              <div className="verification-grid">
                <div>
                  <Badge variant="outline">Consumer application</Badge>
                  <Typography.H3 as="h3">Check generated or composed source</Typography.H3>
                  <CodeBlock label="Terminal">{`# Standalone package
pnpm exec en-ui-check src

# Workspace member dependency
pnpm --filter <consumer-package> exec en-ui-check src`}</CodeBlock>
                  <Typography.Small>
                    Inspect the workspace manifests and use the command for the package that
                    declares En UI. Then run the application typecheck, tests, accessibility checks,
                    and the screenshot-led structural and finish reviews.
                  </Typography.Small>
                </div>
                <div>
                  <Badge variant="outline">En UI repository</Badge>
                  <Typography.H3 as="h3">Check a component and the package</Typography.H3>
                  <CodeBlock label="Terminal">{`pnpm component:check button
pnpm check`}</CodeBlock>
                  <Typography.Small>
                    Do not update visual baselines without explicit human approval.
                  </Typography.Small>
                </div>
              </div>
            </section>

            <section className="docs-section" id="troubleshooting">
              <div className="docs-section-heading">
                <Typography.Caption as="span">07</Typography.Caption>
                <div>
                  <Typography.H2 as="h2">Troubleshooting</Typography.H2>
                  <Typography.Text>
                    The most common setup problems have small, explicit fixes.
                  </Typography.Text>
                </div>
              </div>
              <div className="faq-list">
                <details>
                  <summary>
                    <Typography.Label as="span">
                      GitHub Packages returns 401 or 403
                    </Typography.Label>
                  </summary>
                  <Typography.Small>
                    Confirm the token has <code>read:packages</code>, belongs to an account with
                    Enosta access, and is available as <code>GITHUB_PACKAGES_TOKEN</code>.
                  </Typography.Small>
                </details>
                <details>
                  <summary>
                    <Typography.Label as="span">Components render without styles</Typography.Label>
                  </summary>
                  <Typography.Small>
                    Import <code>@enosta/en-ui/styles.css</code> once from the application entry
                    point. Do not import component source files directly.
                  </Typography.Small>
                </details>
                <details>
                  <summary>
                    <Typography.Label as="span">
                      My application base styles changed
                    </Typography.Label>
                  </summary>
                  <Typography.Small>
                    The {packageVersion} stylesheet includes Tailwind Preflight. Review the package
                    stylesheet order and reconcile any application reset assumptions before adopting
                    it.
                  </Typography.Small>
                </details>
                <details>
                  <summary>
                    <Typography.Label as="span">Custom variables do not appear</Typography.Label>
                  </summary>
                  <Typography.Small>
                    Load overrides after the En UI stylesheet and ensure the matching
                    <code> data-theme</code> scope wraps the component.
                  </Typography.Small>
                </details>
                <details>
                  <summary>
                    <Typography.Label as="span">
                      How should reusable page patterns be defined?
                    </Typography.Label>
                  </summary>
                  <Typography.Small>
                    Define them in the consumer repository using its existing artifact convention.
                    Record anatomy, responsive transformations, states, permissions, En UI
                    dependencies, and verification before extracting a shared implementation.
                  </Typography.Small>
                </details>
              </div>
            </section>

            <div className="docs-next">
              <Badge variant="secondary">Next step</Badge>
              <Typography.H2 as="h2">
                Inspect the component variants, states, and accessibility guidance.
              </Typography.H2>
              <a className={`${buttonVariants()} site-button-link`} href="../storybook/">
                Open the Storybook catalog <Arrow />
              </a>
              <Typography.Small>
                For component-specific guidance, use the packaged Markdown export or the Storybook
                documentation tab. For implementation decisions, treat the JSON contract as
                authoritative.
              </Typography.Small>
              <a href="https://github.com/Enosta/en-ui">View the repository</a>
            </div>
          </article>
        </SiteContainer>
      </main>
    </SiteShell>
  )
}

if (typeof document !== "undefined") {
  const root = document.getElementById("root")
  if (root) {
    if (root.hasChildNodes()) hydrateRoot(root, <DocsPage />)
    else createRoot(root).render(<DocsPage />)
  }
}
