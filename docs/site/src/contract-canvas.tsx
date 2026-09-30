import {
  Avatar,
  Badge,
  Button,
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardPanel,
  CardTitle,
  Checkbox,
  Frame,
  FrameDescription,
  FrameHeader,
  FramePanel,
  FrameTitle,
  Input,
  Kbd,
  Select,
  SelectItem,
  SelectPopup,
  SelectTrigger,
  SelectValue,
  Separator,
  Skeleton,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Typography,
} from "@enosta/en-ui"
import { useEffect, useRef, useState } from "react"
import { createRoot, hydrateRoot } from "react-dom/client"

import contractCatalog from "../../../contracts/design-system.contract.json"
import "./site.css"

import {
  buildContractCanvasModel,
  type ContractCanvasRegion,
  type ContractCategory,
  type ContractRecord,
} from "./contract-canvas-model"
import { SiteShell } from "./site-shell"

type CategoryFilter = "all" | ContractCategory

const contracts = (contractCatalog.components as ContractRecord[])
  .map(buildContractCanvasModel)
  .sort((left, right) => left.title.localeCompare(right.title))

const categoryOptions = [
  { label: "All contracts", value: "all" },
  { label: "Components", value: "component" },
] as const

function categoryLabel(category: ContractCategory) {
  return `${category.charAt(0).toUpperCase()}${category.slice(1)}`
}

function displayName(value: string) {
  return value
    .split("-")
    .filter(Boolean)
    .map((part) => `${part.charAt(0).toUpperCase()}${part.slice(1)}`)
    .join(" ")
}

function NodeMarker({ kind }: { kind: "part" | "slot" }) {
  return <span aria-hidden="true" className="contract-node-marker" data-kind={kind} />
}

function ComponentSpecimen({ component }: { component: string | undefined }) {
  let specimen

  switch (component) {
    case "avatar":
      specimen = <Avatar className="size-12" fallback={{ children: "EN" }} />
      break
    case "badge":
      specimen = <Badge variant="success">Active</Badge>
      break
    case "button":
      specimen = (
        <Button size="sm" tabIndex={-1}>
          Create record
        </Button>
      )
      break
    case "checkbox":
      specimen = (
        <label className="contract-specimen-check">
          <Checkbox defaultChecked tabIndex={-1} />
          Include archived records
        </label>
      )
      break
    case "input":
      specimen = <Input aria-label="Example input" readOnly tabIndex={-1} value="Workspace name" />
      break
    case "field":
      specimen = (
        <div className="contract-specimen-field">
          <Typography.Label>Workspace name</Typography.Label>
          <Input aria-label="Workspace name" readOnly tabIndex={-1} value="Northstar" />
          <Typography.Caption>Visible to everyone in the organization.</Typography.Caption>
        </div>
      )
      break
    case "combobox":
    case "select":
      specimen = (
        <div className="contract-specimen-select">
          <span>{component === "combobox" ? "Search customers" : "Active customers"}</span>
          <span aria-hidden="true" className="contract-specimen-chevron" />
        </div>
      )
      break
    case "kbd":
      specimen = (
        <Kbd.Group>
          <Kbd>Ctrl</Kbd>
          <Kbd>K</Kbd>
        </Kbd.Group>
      )
      break
    case "separator":
      specimen = (
        <div className="contract-specimen-separator">
          <Typography.Caption>Account</Typography.Caption>
          <Separator />
          <Typography.Caption>Permissions</Typography.Caption>
        </div>
      )
      break
    case "spinner":
      specimen = (
        <div className="contract-specimen-loading">
          <Spinner />
          <Typography.Small>Loading records</Typography.Small>
        </div>
      )
      break
    case "skeleton":
      specimen = (
        <div className="contract-specimen-skeleton">
          <Skeleton className="size-10 rounded-full" />
          <div>
            <Skeleton className="h-3 w-32" />
            <Skeleton className="h-3 w-20" />
          </div>
        </div>
      )
      break
    case "card":
      specimen = (
        <Card className="contract-specimen-card">
          <CardHeader>
            <CardTitle>Renewal review</CardTitle>
            <CardDescription>Northstar Labs · Sep 12</CardDescription>
          </CardHeader>
          <CardPanel>
            <Typography.Small>Confirm owner and renewal amount before approval.</Typography.Small>
          </CardPanel>
          <CardFooter>
            <Button size="xs" tabIndex={-1}>
              Review
            </Button>
          </CardFooter>
        </Card>
      )
      break
    case "frame":
      specimen = (
        <Frame className="contract-specimen-frame">
          <FrameHeader>
            <FrameTitle>Workspace health</FrameTitle>
            <FrameDescription>Three operational signals</FrameDescription>
          </FrameHeader>
          <FramePanel>
            <Typography.Small>12 active · 2 need attention</Typography.Small>
          </FramePanel>
        </Frame>
      )
      break
    case "table":
      specimen = (
        <Table aria-label="Example records" variant="card">
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Owner</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Northstar</TableCell>
              <TableCell>Ready</TableCell>
              <TableCell>Ada</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Acme</TableCell>
              <TableCell>Review</TableCell>
              <TableCell>Sam</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Horizon</TableCell>
              <TableCell>Blocked</TableCell>
              <TableCell>Lin</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )
      break
    case "scroll-area":
      specimen = (
        <div className="contract-specimen-scroll-area">
          <div>
            <Typography.Label>Recent activity</Typography.Label>
            <Typography.Caption>Renewal approved by Ada</Typography.Caption>
            <Typography.Caption>Owner changed to Sam</Typography.Caption>
            <Typography.Caption>Review requested by Lin</Typography.Caption>
          </div>
          <span className="contract-specimen-scrollbar" />
        </div>
      )
      break
    case "dialog":
    case "popover":
    case "toast":
    case "tooltip":
      specimen = (
        <div className="contract-specimen-overlay" data-overlay={component}>
          <Typography.Label>
            {component === "dialog"
              ? "Archive workspace?"
              : component === "toast"
                ? "Changes saved"
                : component === "tooltip"
                  ? "Open command menu"
                  : "Quick actions"}
          </Typography.Label>
          {component !== "tooltip" ? (
            <Typography.Caption>
              {component === "popover"
                ? "Assign owner · Change status"
                : "This is a compact example of the overlay surface."}
            </Typography.Caption>
          ) : null}
          {component === "dialog" ? (
            <div className="contract-specimen-overlay-actions">
              <Button size="xs" tabIndex={-1} variant="secondary">
                Cancel
              </Button>
              <Button size="xs" tabIndex={-1}>
                Archive
              </Button>
            </div>
          ) : null}
        </div>
      )
      break
    case "page-container":
      specimen = (
        <div className="contract-specimen-page">
          <span />
          <span />
          <span />
        </div>
      )
      break
    default:
      specimen = (
        <div className="contract-specimen-generic">
          <span />
          <span />
          <span />
        </div>
      )
  }

  return (
    <div className="contract-component-specimen" data-component={component} inert>
      {specimen}
    </div>
  )
}

function regionSpecimenKind(name: string) {
  if (name.includes("message") || name === "conversation") return "conversation"
  if (name === "composer" || name === "search") return "input"
  if (name === "form") return "form"
  if (name === "actions") return "actions"
  if (name === "navigation-toggle") return "icon-button"
  if (name === "brand") return "brand"
  if (["sidebar", "list", "item", "navigation"].includes(name)) return "navigation"
  if (name === "breadcrumbs") return "breadcrumbs"
  if (name === "metadata" || name === "status") return "metadata"
  if (name === "tabs" || name === "mobile-switcher") return "tabs"
  if (name === "separator") return "separator"
  if (name === "backdrop") return "backdrop"
  if (name === "empty") return "empty"
  if (name === "preview") return "preview"
  if (name.startsWith("heading-") || name === "display") return "type-heading"
  if (["lead", "text", "small", "caption", "label", "eyebrow"].includes(name)) return "type-text"
  if (name.startsWith("mono") || name === "code") return "type-mono"
  if (["header", "copy", "context", "group-label"].includes(name)) return "heading"
  return "content"
}

function TypographySpecimen({ name }: { name: string }) {
  const headingSample = "Operational clarity"

  switch (name) {
    case "display":
      return <Typography.Display>{headingSample}</Typography.Display>
    case "heading-1":
      return <Typography.H1>{headingSample}</Typography.H1>
    case "heading-2":
      return <Typography.H2>{headingSample}</Typography.H2>
    case "heading-3":
      return <Typography.H3>{headingSample}</Typography.H3>
    case "heading-4":
      return <Typography.H4>{headingSample}</Typography.H4>
    case "heading-5":
      return <Typography.H5>{headingSample}</Typography.H5>
    case "heading-6":
      return <Typography.H6>{headingSample}</Typography.H6>
    case "lead":
      return <Typography.Lead>Introductory product context</Typography.Lead>
    case "text":
      return <Typography.Text>Default interface text</Typography.Text>
    case "small":
      return <Typography.Small>Supporting interface text</Typography.Small>
    case "caption":
      return <Typography.Caption>Short metadata</Typography.Caption>
    case "label":
      return <Typography.Label>Control label</Typography.Label>
    case "mono":
      return <Typography.Mono>record_1042</Typography.Mono>
    case "mono-strong":
      return <Typography.MonoStrong>record_1042</Typography.MonoStrong>
    case "mono-small":
      return <Typography.MonoSmall>record_1042</Typography.MonoSmall>
    case "mono-caption":
      return <Typography.MonoCaption>record_1042</Typography.MonoCaption>
    case "code":
      return <Typography.Code>status:ready</Typography.Code>
    case "eyebrow":
      return <Typography.Eyebrow>Operations</Typography.Eyebrow>
    default:
      return <Typography.Text>{displayName(name)}</Typography.Text>
  }
}

function RegionSpecimen({ name }: { name: string }) {
  const kind = regionSpecimenKind(name)

  return (
    <div aria-hidden="true" className="contract-region-specimen" data-kind={kind} data-type={name}>
      {kind === "conversation" ? (
        <>
          <span />
          <span />
          <span />
        </>
      ) : kind === "form" ? (
        <>
          <span />
          <span />
          <span />
        </>
      ) : kind === "navigation" ? (
        <>
          <span data-active="true" />
          <span />
          <span />
        </>
      ) : kind === "actions" ? (
        <>
          <span />
          <span data-primary="true" />
        </>
      ) : kind === "tabs" ? (
        <>
          <span data-active="true" />
          <span />
          <span />
        </>
      ) : kind === "type-heading" || kind === "type-text" || kind === "type-mono" ? (
        <TypographySpecimen name={name} />
      ) : (
        <>
          <span />
          <span />
          <span />
        </>
      )}
    </div>
  )
}

function PartNode({ description, name, part, slots }: ContractCanvasRegion) {
  return (
    <article className="contract-part-node" data-part={part} data-region={name} title={description}>
      <div className="contract-node-label">
        <NodeMarker kind="part" />
        <Typography.Label>{displayName(name)}</Typography.Label>
      </div>
      <RegionSpecimen name={name} />
      <details className="contract-node-disclosure">
        <summary aria-label={`About the ${displayName(name)} part`} title={description}>
          <span aria-hidden="true" className="contract-info-marker">
            i
          </span>
        </summary>
        <Typography.Caption className="contract-node-description">{description}</Typography.Caption>
      </details>
      {slots.length > 0 ? (
        <div className="contract-region-slots">
          {slots.map((slot) => (
            <SlotNode key={slot.name} {...slot} />
          ))}
        </div>
      ) : null}
    </article>
  )
}

function SlotNode({
  description,
  name,
  required,
}: {
  description: string
  name: string
  required: boolean
}) {
  return (
    <details
      className="contract-slot-node"
      data-required={required || undefined}
      data-slot-name={name}
      title={description}
    >
      <summary className="contract-node-heading">
        <NodeMarker kind="slot" />
        <Typography.Label>{displayName(name)} slot</Typography.Label>
        <Typography.Caption className="contract-node-requirement">
          {required ? "Required" : "Optional"}
        </Typography.Caption>
      </summary>
      <Typography.Caption className="contract-node-description">{description}</Typography.Caption>
    </details>
  )
}

function AnatomyCanvas({ model }: { model: ReturnType<typeof buildContractCanvasModel> }) {
  const componentName = model.contract.id.split(".").at(-1)

  return (
    <section aria-labelledby="contract-canvas-title" className="contract-canvas-stage">
      <header className="contract-canvas-toolbar">
        <div>
          <Typography.MonoCaption as="span">
            Package specimen · Contract anatomy
          </Typography.MonoCaption>
          <Typography.H2 id="contract-canvas-title">{model.title}</Typography.H2>
        </div>
        <div className="contract-canvas-legend" aria-label="Canvas legend">
          <Typography.Caption as="span">
            <NodeMarker kind="part" /> Part
          </Typography.Caption>
          <Typography.Caption as="span">
            <NodeMarker kind="slot" /> Slot
          </Typography.Caption>
        </div>
      </header>

      <div
        className="contract-canvas-grid"
        data-layout={model.layout}
        data-minimal-anatomy={model.minimalAnatomy || undefined}
      >
        <div className="contract-root-label">
          <NodeMarker kind="part" />
          <Typography.Label>{displayName(model.root.part)}</Typography.Label>
        </div>
        <div
          className="contract-root-node"
          data-root-part={model.root.part}
          title={model.root.description}
        >
          <div className="contract-root-summary">
            <details className="contract-node-disclosure contract-root-disclosure">
              <summary aria-label="About the contract boundary" title={model.root.description}>
                <span aria-hidden="true" className="contract-info-marker">
                  i
                </span>
              </summary>
              <Typography.Small className="contract-root-description">
                {model.root.description}
              </Typography.Small>
            </details>
            {model.minimalAnatomy ? <Badge variant="outline">Minimal anatomy</Badge> : null}
          </div>

          <div className="contract-blueprint-regions">
            {!model.minimalAnatomy && model.category === "component" ? (
              <div className="contract-blueprint-preview">
                <ComponentSpecimen component={componentName} />
              </div>
            ) : null}
            {model.minimalAnatomy ? (
              <div className="contract-atomic-specimen" data-component={componentName}>
                <ComponentSpecimen component={componentName} />
                <div className="contract-root-slots">
                  {model.rootSlots.map((slot) => (
                    <SlotNode key={slot.name} {...slot} />
                  ))}
                </div>
              </div>
            ) : (
              <>
                {model.regions.map((region) => (
                  <PartNode key={region.part} {...region} />
                ))}
                {model.rootSlots.length > 0 ? (
                  <div className="contract-root-slots">
                    {model.rootSlots.map((slot) => (
                      <SlotNode key={slot.name} {...slot} />
                    ))}
                  </div>
                ) : null}
              </>
            )}
          </div>
        </div>
        <Typography.MonoCaption className="contract-root-caption">
          {model.contract.id}
        </Typography.MonoCaption>
      </div>
    </section>
  )
}

function Inspector({ model }: { model: ReturnType<typeof buildContractCanvasModel> }) {
  return (
    <details className="contract-inspector">
      <summary className="contract-panel-trigger">
        <span>
          <Typography.Label>Contract details</Typography.Label>
          <Typography.Caption>{model.title}</Typography.Caption>
        </span>
        <Badge variant="outline">{model.parts.length + model.slots.length}</Badge>
      </summary>
      <div className="contract-panel-popover contract-inspector-panel" tabIndex={0}>
        <div>
          <Typography.Eyebrow>Contract inspector</Typography.Eyebrow>
          <Typography.H3 id="contract-inspector-title">Declared behavior</Typography.H3>
          <Typography.Small>
            Labels and slots come from the contract. Geometry mirrors package components and
            documented layouts; sample content is illustrative rather than an implementation DOM
            snapshot.
          </Typography.Small>
        </div>

        <section>
          <Typography.H4 as="h3">JSX structure</Typography.H4>
          <pre className="contract-structure">
            <Typography.Code>{model.contract.anatomy.structure}</Typography.Code>
          </pre>
        </section>

        <section>
          <Typography.H4 as="h3">Ownership</Typography.H4>
          <dl className="contract-facts">
            <div>
              <Typography.Caption as="dt">Behavior owner</Typography.Caption>
              <Typography.Label as="dd">
                {displayName(model.contract.behaviorOwner.kind)}
              </Typography.Label>
            </div>
            <div>
              <Typography.Caption as="dt">Maturity</Typography.Caption>
              <Typography.Label as="dd">{displayName(model.contract.status)}</Typography.Label>
            </div>
            <div>
              <Typography.Caption as="dt">Category</Typography.Caption>
              <Typography.Label as="dd">{categoryLabel(model.category)}</Typography.Label>
            </div>
          </dl>
        </section>

        <section>
          <Typography.H4 as="h3">Capabilities</Typography.H4>
          <div className="contract-chip-list">
            {model.contract.behaviorOwner.capabilities.map((capability) => (
              <Badge key={capability} variant="secondary">
                {displayName(capability)}
              </Badge>
            ))}
          </div>
        </section>

        <section>
          <Typography.H4 as="h3">States</Typography.H4>
          <div className="contract-chip-list">
            {model.contract.states.map((state) => (
              <Badge key={state} variant="outline">
                {displayName(state)}
              </Badge>
            ))}
          </div>
        </section>

        <section>
          <Typography.H4 as="h3">Required tokens</Typography.H4>
          {model.contract.tokens.required.length > 0 ? (
            <ul className="contract-token-list">
              {model.contract.tokens.required.map((token) => (
                <li key={token}>
                  <Typography.MonoCaption>{token}</Typography.MonoCaption>
                </li>
              ))}
            </ul>
          ) : (
            <Typography.Small>No required tokens declared.</Typography.Small>
          )}
        </section>
      </div>
    </details>
  )
}

export function ContractCanvasPage() {
  const catalogRef = useRef<HTMLDetailsElement>(null)
  const [category, setCategory] = useState<CategoryFilter>("all")
  const [query, setQuery] = useState("")
  const [selectedId, setSelectedId] = useState("component.card")

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const requestedId = window.location.hash.slice(1)
      if (contracts.some(({ contract }) => contract.id === requestedId)) setSelectedId(requestedId)
    })

    return () => window.cancelAnimationFrame(frame)
  }, [])

  const normalizedQuery = query.trim().toLowerCase()
  const filteredContracts = contracts.filter(
    (model) =>
      (category === "all" || model.category === category) &&
      (!normalizedQuery ||
        model.title.toLowerCase().includes(normalizedQuery) ||
        model.contract.id.includes(normalizedQuery)),
  )
  const selected = contracts.find(({ contract }) => contract.id === selectedId) ?? contracts[0]

  const selectContract = (id: string) => {
    setSelectedId(id)
    window.history.replaceState(null, "", `#${id}`)
    catalogRef.current?.removeAttribute("open")
  }

  return (
    <SiteShell active="canvas" depth="nested">
      <main className="contract-canvas-page">
        <header className="contract-canvas-intro site-shell">
          <div>
            <Badge variant="secondary">Generated from contract v2</Badge>
            <Typography.H1>Contract anatomy, drawn from declared structure.</Typography.H1>
          </div>
          <Typography.Lead>
            Explore every public atom without changing the schema or depending on Storybook.
            Specimens use En UI surfaces and controls while the annotated parts and slots remain
            contract-derived.
          </Typography.Lead>
        </header>

        <div className="contract-workbench">
          <div className="contract-workbench-controls">
            <details className="contract-catalog" ref={catalogRef}>
              <summary className="contract-panel-trigger">
                <span>
                  <Typography.Label>Browse contracts</Typography.Label>
                  <Typography.Caption>{selected.title}</Typography.Caption>
                </span>
                <Badge variant="outline">{contracts.length}</Badge>
              </summary>
              <div className="contract-panel-popover contract-catalog-panel">
                <div className="contract-catalog-heading">
                  <Typography.H3 as="h2">Catalog</Typography.H3>
                  <Badge variant="outline">{contracts.length}</Badge>
                </div>
                <div className="contract-catalog-filters">
                  <Input
                    aria-label="Search contracts"
                    onChange={(event) => setQuery(event.currentTarget.value)}
                    placeholder="Search contracts"
                    value={query}
                  />
                  <Select
                    aria-label="Filter contract category"
                    items={categoryOptions}
                    onValueChange={(value) => setCategory(value as CategoryFilter)}
                    value={category}
                  >
                    <SelectTrigger aria-label="Filter contract category">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectPopup alignItemWithTrigger={false}>
                      {categoryOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectPopup>
                  </Select>
                </div>
                <Typography.Caption aria-live="polite" className="contract-result-count">
                  {filteredContracts.length} matching contracts
                </Typography.Caption>
                <nav aria-label="Available contracts" className="contract-list">
                  {filteredContracts.map((model) => {
                    const active = model.contract.id === selected.contract.id
                    return (
                      <Button
                        aria-label={`${model.title}, ${categoryLabel(model.category)}`}
                        aria-current={active ? "page" : undefined}
                        className="contract-list-item"
                        key={model.contract.id}
                        onClick={() => selectContract(model.contract.id)}
                        variant={active ? "secondary" : "ghost"}
                      >
                        <span className="contract-list-item-copy">
                          <Typography.Label>{model.title}</Typography.Label>
                          <Typography.Caption>{categoryLabel(model.category)}</Typography.Caption>
                        </span>
                        <Typography.MonoCaption>
                          {model.parts.length + model.slots.length}
                        </Typography.MonoCaption>
                      </Button>
                    )
                  })}
                </nav>
              </div>
            </details>
            <Inspector model={selected} />
          </div>
          <AnatomyCanvas model={selected} />
        </div>
      </main>
    </SiteShell>
  )
}

if (typeof document !== "undefined") {
  const root = document.getElementById("root")
  if (root) {
    if (root.hasChildNodes()) hydrateRoot(root, <ContractCanvasPage />)
    else createRoot(root).render(<ContractCanvasPage />)
  }
}
