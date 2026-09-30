import {
  Avatar,
  Badge,
  Button,
  Checkbox,
  Field,
  FieldDescription,
  FieldLabel,
  Input,
  Kbd,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Typography,
  buttonVariants,
} from "@enosta/en-ui"
import { createRoot, hydrateRoot } from "react-dom/client"

import "./site.css"

import { componentCount, componentGroups, packageVersion } from "./catalog"
import { SiteContainer, SiteSection } from "./site-layout"
import { Arrow, SiteShell } from "./site-shell"

const adoptionSteps = [
  {
    detail: "Install one package and import its stylesheet once at the application boundary.",
    label: "Install",
  },
  {
    detail:
      "Choose package-root components, then define product layout in the consumer repository.",
    label: "Compose",
  },
  {
    detail: "Use semantic variables for product identity without replacing component behavior.",
    label: "Theme",
  },
  {
    detail: "Run source, accessibility, responsive, and package checks before release.",
    label: "Verify",
  },
] as const

const evidence = [
  ["Component contract", "Exports, props, anatomy, states, tokens, and migration notes"],
  ["Rendered stories", "Variants, interaction states, responsive examples, and source"],
  ["Behavior tests", "Protected keyboard, focus, landmark, and adapter expectations"],
  ["Consumer guidance", "Operational composition rules and deterministic source checks"],
] as const

const renewals = [
  {
    account: "Aster Bank",
    action: "Approve offer",
    due: "18 Sep",
    owner: "Linh Mai",
    risk: "92",
    status: "At risk",
    value: "$1.84M",
    variant: "error" as const,
  },
  {
    account: "Orchid Telecom",
    action: "Confirm sponsor",
    due: "30 Sep",
    owner: "An Reyes",
    risk: "87",
    status: "At risk",
    value: "$1.28M",
    variant: "error" as const,
  },
  {
    account: "Nimbus Media",
    action: "Resolve backlog",
    due: "14 Sep",
    owner: "An Reyes",
    risk: "84",
    status: "At risk",
    value: "$1.51M",
    variant: "error" as const,
  },
  {
    account: "Coastal Freight",
    action: "Review adoption",
    due: "27 Oct",
    owner: "Samir Khan",
    risk: "71",
    status: "Watch",
    value: "$980K",
    variant: "warning" as const,
  },
  {
    account: "Helio Energy",
    action: "Schedule review",
    due: "09 Nov",
    owner: "Jonas Dahl",
    risk: "68",
    status: "Watch",
    value: "$760K",
    variant: "warning" as const,
  },
  {
    account: "Atlas Mobility",
    action: "Validate scope",
    due: "16 Nov",
    owner: "Thao Vu",
    risk: "64",
    status: "Watch",
    value: "$1.06M",
    variant: "warning" as const,
  },
  {
    account: "Monarch Retail",
    action: "Confirm expansion",
    due: "12 Jan",
    owner: "Thao Vu",
    risk: "34",
    status: "Healthy",
    value: "$2.16M",
    variant: "success" as const,
  },
] as const

export function LandingPage() {
  return (
    <SiteShell>
      <main className="landing-page">
        <SiteContainer className="landing-hero site-shell" gutter="none" size="wide">
          <section className="landing-hero-copy" aria-labelledby="landing-title">
            <div className="landing-release">
              <Badge variant="outline">Version {packageVersion}</Badge>
              <Typography.Caption>Contract schema v2</Typography.Caption>
              <Typography.Caption>React 18–19</Typography.Caption>
            </div>
            <Typography.Display as="h1" id="landing-title">
              Build Enosta product interfaces from one verified system.
            </Typography.Display>
            <Typography.Lead>
              En UI provides atoms, interaction behavior, design variables, contracts, and checks
              for consumer-owned product interfaces.
            </Typography.Lead>
            <div className="landing-actions">
              <a className={`${buttonVariants({ size: "lg" })} site-button-link`} href="./docs/">
                Read the installation guide <Arrow />
              </a>
              <a
                className={`${buttonVariants({ size: "lg", variant: "secondary" })} site-button-link`}
                href="./storybook/"
              >
                Inspect components
              </a>
            </div>
            <dl className="landing-facts" aria-label={`${packageVersion} package facts`}>
              <div>
                <Typography.Caption as="dt">Components</Typography.Caption>
                <Typography.Small as="dd">{componentCount} beta exports</Typography.Small>
              </div>
              <div>
                <Typography.Caption as="dt">Composition</Typography.Caption>
                <Typography.Small as="dd">Consumer-owned</Typography.Small>
              </div>
              <div>
                <Typography.Caption as="dt">Primary boundary</Typography.Caption>
                <Typography.MonoSmall as="dd">@enosta/en-ui</Typography.MonoSmall>
              </div>
            </dl>
          </section>

          <SiteSection
            className="landing-start-panel"
            density="compact"
            description="A short adoption path keeps product context and package authority visible."
            title="Start with the package boundary"
            variant="surface"
          >
            <ol className="adoption-list">
              {adoptionSteps.map((step, index) => (
                <li key={step.label}>
                  <Typography.Caption as="span">
                    {String(index + 1).padStart(2, "0")}
                  </Typography.Caption>
                  <div>
                    <Typography.Label as="strong">{step.label}</Typography.Label>
                    <Typography.Small>{step.detail}</Typography.Small>
                  </div>
                </li>
              ))}
            </ol>
            <div className="package-command">
              <div>
                <code>pnpm add @enosta/en-ui</code>
                <code>pnpm exec en-ui-init-ai</code>
              </div>
              <Typography.Caption as="span">
                Workspace dependency? Run both commands with{" "}
                <Kbd>pnpm --filter &lt;package&gt; exec</Kbd>.
              </Typography.Caption>
            </div>
          </SiteSection>
        </SiteContainer>

        <section className="landing-section landing-section-surface" aria-labelledby="working-ui">
          <SiteContainer className="site-shell landing-section-grid" gutter="none" size="wide">
            <div className="landing-section-heading">
              <Badge variant="secondary">Package components</Badge>
              <Typography.H2 as="h2" id="working-ui">
                Review working interface behavior, not decorative mockups.
              </Typography.H2>
              <Typography.Text>
                The site renders the same exports consumers install. Fields, actions, status,
                density, and keyboard behavior stay visible while the selected theme changes.
              </Typography.Text>
            </div>

            <div className="workspace-specimen" aria-label="Workspace setup example">
              <header>
                <div>
                  <Typography.Caption as="span">Workspace setup</Typography.Caption>
                  <Typography.Label as="strong">Workspace configuration</Typography.Label>
                </div>
                <Badge size="sm" variant="success">
                  Contract checked
                </Badge>
              </header>
              <div className="workspace-person">
                <Avatar fallback={{ children: "EN" }} />
                <div>
                  <Typography.Label as="strong">Customer operations</Typography.Label>
                  <Typography.Caption as="span">
                    Production workspace · 18 members
                  </Typography.Caption>
                </div>
                <Badge size="sm" variant="secondary">
                  Beta catalog
                </Badge>
              </div>
              <Field>
                <FieldLabel>Workspace name</FieldLabel>
                <Input defaultValue="Customer operations" />
                <FieldDescription>Visible to everyone in the organization.</FieldDescription>
              </Field>
              <div className="workspace-actions">
                <Button icon={{ end: <Arrow /> }}>Create workspace</Button>
                <Button variant="secondary">Review access</Button>
              </div>
            </div>
          </SiteContainer>
        </section>

        <SiteContainer
          className="landing-section site-shell"
          gutter="none"
          size="wide"
          aria-labelledby="composition-title"
        >
          <div className="landing-section-heading landing-section-heading-wide">
            <Typography.H2 as="h2" id="composition-title">
              Product-specific composition stays with the product.
            </Typography.H2>
            <Typography.Text>
              This renewal workflow demonstrates public En UI components and tokens, not a required
              page template. Consumer contracts decide its hierarchy, geometry, and responsive
              transformations.
            </Typography.Text>
          </div>
          <div
            className="operations-frame"
            id="operations-preview"
            aria-label="Renewal intervention queue example"
          >
            <div className="operations-appbar">
              <div>
                <span className="operations-appmark" aria-hidden="true">
                  N
                </span>
                <Typography.Label as="strong">Northstar</Typography.Label>
                <Typography.Caption as="span">Revenue operations / Renewals</Typography.Caption>
              </div>
              <div>
                <Button aria-label="Open notifications" size="icon" variant="ghost">
                  3
                </Button>
                <Avatar fallback={{ children: "LM" }} />
              </div>
            </div>

            <header className="operations-header">
              <div>
                <Typography.H3 as="h3">Renewal intervention queue</Typography.H3>
                <Typography.Small>
                  Resolve commercial and customer-risk blockers before Friday’s forecast lock.
                </Typography.Small>
                <div className="operations-heading-line">
                  <Badge variant="error">6 need action</Badge>
                  <Typography.Caption as="span">24 active renewals</Typography.Caption>
                  <Typography.Caption as="span">Updated 3 min ago</Typography.Caption>
                </div>
              </div>
              <div className="operations-actions">
                <Button size="sm" variant="secondary">
                  Export queue
                </Button>
                <Button size="sm">Log intervention</Button>
              </div>
            </header>

            <div className="operations-brief">
              <div>
                <Badge variant="warning">Forecast lock</Badge>
                <Typography.Small as="span">
                  <Typography.Label as="strong">Friday, 16:00</Typography.Label> · 3 executive
                  summaries await approval
                </Typography.Small>
              </div>
              <Button size="sm" variant="ghost">
                Review approvals
              </Button>
            </div>

            <div className="operations-layout">
              <section className="renewal-queue" aria-labelledby="renewal-queue-title">
                <header>
                  <div>
                    <Typography.H4 as="h4" id="renewal-queue-title">
                      Accounts requiring intervention
                    </Typography.H4>
                    <Typography.Caption>
                      Sorted by renewal date, exposure, and unresolved risk.
                    </Typography.Caption>
                  </div>
                  <Badge variant="secondary">7 visible</Badge>
                </header>
                <div className="operations-filters" role="search">
                  <Input aria-label="Search renewal queue" placeholder="Search account or owner" />
                  <Button size="sm" variant="secondary">
                    Health: risk and watch
                  </Button>
                  <Button size="sm" variant="secondary">
                    Owner: all
                  </Button>
                </div>
                <div className="operations-selection">
                  <Typography.Small as="span">
                    <Typography.Label as="strong">2</Typography.Label> selected
                  </Typography.Small>
                  <div>
                    <Button size="sm" variant="tertiary">
                      Assign owner
                    </Button>
                    <Button size="sm" variant="secondary">
                      Add to plan
                    </Button>
                  </div>
                </div>
                <div className="operations-table-scroll" data-allow-overflow>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>
                          <Checkbox aria-label="Select all renewals" />
                        </TableHead>
                        <TableHead>Account</TableHead>
                        <TableHead>Renewal</TableHead>
                        <TableHead>Health</TableHead>
                        <TableHead>Risk</TableHead>
                        <TableHead>Exposure</TableHead>
                        <TableHead>Owner</TableHead>
                        <TableHead>Next intervention</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {renewals.map((renewal, index) => (
                        <TableRow
                          data-state={index < 2 ? "selected" : undefined}
                          key={renewal.account}
                        >
                          <TableCell>
                            <Checkbox
                              aria-label={`Select ${renewal.account}`}
                              defaultChecked={index < 2}
                            />
                          </TableCell>
                          <TableCell>
                            <Typography.Label as="strong">{renewal.account}</Typography.Label>
                          </TableCell>
                          <TableCell>
                            <Typography.Small>{renewal.due}</Typography.Small>
                          </TableCell>
                          <TableCell>
                            <Badge size="sm" variant={renewal.variant}>
                              {renewal.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Typography.Label as="strong">{renewal.risk}</Typography.Label>
                          </TableCell>
                          <TableCell>
                            <Typography.Label>{renewal.value}</Typography.Label>
                          </TableCell>
                          <TableCell>{renewal.owner}</TableCell>
                          <TableCell>
                            <Button size="xs" variant="link">
                              {renewal.action}
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                <footer>
                  <Typography.Caption as="span">Showing 7 of 24 renewals</Typography.Caption>
                  <div>
                    <Button disabled size="sm" variant="secondary">
                      Previous
                    </Button>
                    <Button size="sm" variant="secondary">
                      Next
                    </Button>
                  </div>
                </footer>
              </section>

              <aside className="renewal-detail" aria-labelledby="renewal-detail-title">
                <header>
                  <div>
                    <Typography.H4 as="h4" id="renewal-detail-title">
                      Aster Bank
                    </Typography.H4>
                    <Typography.Caption>$1.84M annual renewal · Enterprise</Typography.Caption>
                  </div>
                  <Badge variant="error">Risk 92</Badge>
                </header>

                <div className="renewal-decision">
                  <div>
                    <Typography.Caption as="span">Decision required</Typography.Caption>
                    <Typography.Label as="strong">Approve recovery offer</Typography.Label>
                  </div>
                  <Badge variant="warning">Due today</Badge>
                </div>

                <div className="renewal-progress">
                  <div>
                    <Typography.Caption as="span">Plan readiness</Typography.Caption>
                    <Typography.H5 as="strong">68%</Typography.H5>
                  </div>
                  <progress aria-label="Renewal plan readiness 68 percent" max="100" value="68" />
                </div>

                <dl className="renewal-facts">
                  <div>
                    <Typography.Caption as="dt">Owner</Typography.Caption>
                    <Typography.Small as="dd">Linh Mai</Typography.Small>
                  </div>
                  <div>
                    <Typography.Caption as="dt">Forecast category</Typography.Caption>
                    <Typography.Small as="dd">Commit at risk</Typography.Small>
                  </div>
                  <div>
                    <Typography.Caption as="dt">Next customer call</Typography.Caption>
                    <Typography.Small as="dd">Today, 14:30</Typography.Small>
                  </div>
                </dl>

                <section className="renewal-checklist" aria-labelledby="renewal-checklist-title">
                  <Typography.H5 as="h5" id="renewal-checklist-title">
                    Recovery plan
                  </Typography.H5>
                  <ul>
                    <li data-complete="true">
                      <span aria-hidden="true">✓</span>
                      Product usage analysis
                    </li>
                    <li data-complete="true">
                      <span aria-hidden="true">✓</span>
                      Stakeholder map confirmed
                    </li>
                    <li>
                      <span aria-hidden="true">03</span>Commercial exception pending
                    </li>
                    <li>
                      <span aria-hidden="true">04</span>Executive summary due at 13:00
                    </li>
                  </ul>
                </section>

                <div className="renewal-stakeholders">
                  <div>
                    <Avatar fallback={{ children: "LM" }} />
                    <Avatar fallback={{ children: "MC" }} />
                    <Avatar fallback={{ children: "JB" }} />
                  </div>
                  <Typography.Caption as="span">3 collaborators</Typography.Caption>
                  <Button size="sm">Open intervention</Button>
                </div>
              </aside>
            </div>

            <dl className="operations-metrics">
              <div>
                <Typography.Caption as="dt">Revenue exposed</Typography.Caption>
                <Typography.H5 as="dd">$6.4M</Typography.H5>
              </div>
              <div>
                <Typography.Caption as="dt">Due this quarter</Typography.Caption>
                <Typography.H5 as="dd">10 accounts</Typography.H5>
              </div>
              <div>
                <Typography.Caption as="dt">Coverage</Typography.Caption>
                <Typography.H5 as="dd">83% assigned</Typography.H5>
              </div>
              <div>
                <Typography.Caption as="dt">Recovery plans</Typography.Caption>
                <Typography.H5 as="dd">7 confirmed</Typography.H5>
              </div>
            </dl>

            <footer className="operations-status">
              <Typography.Caption as="span">
                <i aria-hidden="true" /> Data current
              </Typography.Caption>
              <Typography.Caption as="span">Forecast window closes in 2d 6h</Typography.Caption>
              <Typography.Caption as="span">
                Keyboard: <Kbd>G</Kbd> then <Kbd>R</Kbd>
              </Typography.Caption>
            </footer>
          </div>
        </SiteContainer>

        <section className="landing-section landing-catalog" aria-labelledby="catalog-title">
          <SiteContainer className="site-shell catalog-layout" gutter="none" size="wide">
            <div className="landing-section-heading catalog-copy">
              <Badge variant="outline">Version {packageVersion}</Badge>
              <Typography.H2 as="h2" id="catalog-title">
                One catalog with a clear public boundary.
              </Typography.H2>
              <Typography.Text>
                Every beta export includes colocated documentation, stories, tests, and an
                authoritative JSON contract.
              </Typography.Text>
              <a className={`${buttonVariants()} site-button-link`} href="./storybook/">
                Browse the full catalog <Arrow />
              </a>
            </div>
            <div className="component-list">
              {componentGroups.map(({ components, group }) => {
                const groupId = `group-${group.toLowerCase().replaceAll(" ", "-")}`
                return (
                  <section className="component-group" key={group} aria-labelledby={groupId}>
                    <Typography.H3 as="h3" id={groupId}>
                      {group}
                    </Typography.H3>
                    <Typography.Small>{components.join(" · ")}</Typography.Small>
                    <Typography.Caption as="span">{components.length}</Typography.Caption>
                  </section>
                )
              })}
            </div>
          </SiteContainer>
        </section>

        <SiteContainer
          className="landing-section site-shell evidence-layout"
          gutter="none"
          size="wide"
          aria-labelledby="evidence-title"
        >
          <div className="landing-section-heading">
            <Badge variant="secondary">Change evidence</Badge>
            <Typography.H2 as="h2" id="evidence-title">
              People and agents work from the same source of truth.
            </Typography.H2>
            <Typography.Text>
              Contracts define the boundary. Tests and rendered stories show whether a change
              preserves the behavior consumers depend on.
            </Typography.Text>
            <a
              className={`${buttonVariants({ variant: "secondary" })} site-button-link`}
              href="./docs/#contracts"
            >
              Read contract guidance <Arrow />
            </a>
          </div>
          <dl className="evidence-ledger">
            {evidence.map(([label, detail]) => (
              <div key={label}>
                <Typography.Label as="dt">{label}</Typography.Label>
                <Typography.Small as="dd">{detail}</Typography.Small>
              </div>
            ))}
          </dl>
        </SiteContainer>

        <SiteContainer className="landing-next site-shell" gutter="none" size="wide">
          <div>
            <Badge variant="outline">@enosta/en-ui {packageVersion}</Badge>
            <Typography.H2 as="h2">
              Install the current package and verify your first composition.
            </Typography.H2>
          </div>
          <div className="landing-actions">
            <a className={`${buttonVariants({ size: "lg" })} site-button-link`} href="./docs/">
              Open documentation <Arrow />
            </a>
            <a
              className={`${buttonVariants({ size: "lg", variant: "secondary" })} site-button-link`}
              href="https://github.com/Enosta/en-ui"
            >
              View source
            </a>
          </div>
        </SiteContainer>
      </main>
    </SiteShell>
  )
}

if (typeof document !== "undefined") {
  const root = document.getElementById("root")
  if (root) {
    if (root.hasChildNodes()) hydrateRoot(root, <LandingPage />)
    else createRoot(root).render(<LandingPage />)
  }
}
