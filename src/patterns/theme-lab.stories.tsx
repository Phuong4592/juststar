import type { Meta, StoryObj } from "@storybook/react-vite"
import { useEffect, useState } from "react"

import {
  ApplicationHeader,
  ApplicationShell,
  Avatar,
  Badge,
  Button,
  Checkbox,
  Input,
  Kbd,
  PageContainer,
  PageHeader,
  PageSection,
  Select,
  SelectItem,
  SelectPopup,
  SelectTrigger,
  SelectValue,
  SidebarNavigation,
  SidebarNavigationGroup,
  SidebarNavigationGroupLabel,
  SidebarNavigationItem,
  SidebarNavigationList,
  SplitLayout,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Typography,
} from "@enosta/en-ui"

type ThemeId =
  | "default"
  | "default-dark"
  | "neobrutalism"
  | "glassmorphism"
  | "neumorphism"
  | "bauhaus"
  | "terminal"
  | "editorial"
  | "pop"
  | "high-contrast"

const themes: ReadonlyArray<{ id: ThemeId; label: string }> = [
  { id: "default", label: "Light" },
  { id: "default-dark", label: "Dark" },
  { id: "neobrutalism", label: "Neo" },
  { id: "glassmorphism", label: "Glass" },
  { id: "neumorphism", label: "Soft" },
  { id: "bauhaus", label: "Bauhaus" },
  { id: "terminal", label: "Terminal" },
  { id: "editorial", label: "Editorial" },
  { id: "pop", label: "Pop" },
  { id: "high-contrast", label: "Contrast" },
]

const regions = [
  { label: "All regions", value: "all" },
  { label: "APAC", value: "apac" },
  { label: "Europe", value: "europe" },
  { label: "North America", value: "north-america" },
]

const healthStates = [
  { label: "Risk and watch", value: "open-risk" },
  { label: "At risk", value: "at-risk" },
  { label: "Watch", value: "watch" },
  { label: "Healthy", value: "healthy" },
]

const renewals = [
  {
    account: "Aster Bank",
    arr: "$1.84M",
    health: "At risk",
    initials: "AB",
    nextAction: "Confirm recovery plan",
    owner: "Linh Mai",
    region: "APAC",
    renewal: "18 Sep",
    risk: 92,
    variant: "error",
  },
  {
    account: "Orchid Telecom",
    arr: "$1.28M",
    health: "At risk",
    initials: "OT",
    nextAction: "Escalate sponsor gap",
    owner: "An Reyes",
    region: "North America",
    renewal: "30 Sep",
    risk: 87,
    variant: "error",
  },
  {
    account: "Coastal Freight",
    arr: "$980K",
    health: "Watch",
    initials: "CF",
    nextAction: "Review adoption trend",
    owner: "Samir Khan",
    region: "Europe",
    renewal: "27 Oct",
    risk: 71,
    variant: "warning",
  },
  {
    account: "Helio Energy",
    arr: "$760K",
    health: "Watch",
    initials: "HE",
    nextAction: "Schedule value review",
    owner: "Jonas Dahl",
    region: "Europe",
    renewal: "09 Nov",
    risk: 68,
    variant: "warning",
  },
  {
    account: "Atlas Mobility",
    arr: "$1.06M",
    health: "Watch",
    initials: "AM",
    nextAction: "Validate rollout scope",
    owner: "Thao Vu",
    region: "APAC",
    renewal: "16 Nov",
    risk: 64,
    variant: "warning",
  },
  {
    account: "Nimbus Media",
    arr: "$1.51M",
    health: "At risk",
    initials: "NM",
    nextAction: "Resolve support backlog",
    owner: "An Reyes",
    region: "North America",
    renewal: "21 Nov",
    risk: 84,
    variant: "error",
  },
  {
    account: "Monarch Retail Group",
    arr: "$2.16M",
    health: "Healthy",
    initials: "MR",
    nextAction: "Confirm expansion terms",
    owner: "Thao Vu",
    region: "APAC",
    renewal: "12 Jan",
    risk: 34,
    variant: "success",
  },
  {
    account: "Juniper Foods",
    arr: "$610K",
    health: "Healthy",
    initials: "JF",
    nextAction: "Send success summary",
    owner: "Samir Khan",
    region: "Europe",
    renewal: "17 Feb",
    risk: 28,
    variant: "success",
  },
  {
    account: "Vela Education",
    arr: "$420K",
    health: "Watch",
    initials: "VE",
    nextAction: "Rebuild adoption plan",
    owner: "Linh Mai",
    region: "APAC",
    renewal: "23 Mar",
    risk: 59,
    variant: "warning",
  },
  {
    account: "Bluepeak Insurance",
    arr: "$890K",
    health: "Healthy",
    initials: "BI",
    nextAction: "Prepare value report",
    owner: "Jonas Dahl",
    region: "Europe",
    renewal: "21 Apr",
    risk: 22,
    variant: "success",
  },
] as const

const playbooks = [
  {
    action: "Open playbook",
    name: "Executive sponsor recovery",
    readiness: "Ready",
    trigger: "Sponsor missing inside 45 days",
    variant: "success",
  },
  {
    action: "Review draft",
    name: "Adoption decline response",
    readiness: "Draft",
    trigger: "Usage falls more than 10%",
    variant: "warning",
  },
  {
    action: "Assign owner",
    name: "Support backlog intervention",
    readiness: "Needs owner",
    trigger: "Five or more unresolved cases",
    variant: "error",
  },
] as const

function ThemeSwitch({
  theme,
  onThemeChange,
}: {
  theme: ThemeId
  onThemeChange: (theme: ThemeId) => void
}) {
  return (
    <label className="theme-lab__theme-control">
      <Typography.Label className="theme-lab__theme-label">Theme</Typography.Label>
      <Select
        aria-label="Preview theme"
        items={themes.map(({ id, label }) => ({ label, value: id }))}
        onValueChange={(value) => onThemeChange(value as ThemeId)}
        value={theme}
      >
        <SelectTrigger aria-label="Preview theme" size="sm">
          <SelectValue />
        </SelectTrigger>
        <SelectPopup alignItemWithTrigger={false}>
          {themes.map((item) => (
            <SelectItem key={item.id} value={item.id}>
              {item.label}
            </SelectItem>
          ))}
        </SelectPopup>
      </Select>
    </label>
  )
}

function RenewalNavigation() {
  return (
    <SidebarNavigation
      footer={
        <div className="theme-lab__user">
          <Avatar fallback={{ children: "LM" }} />
          <span>
            <Typography.Label>Linh Mai</Typography.Label>
            <Typography.Caption>Revenue operations</Typography.Caption>
          </span>
        </div>
      }
      header={
        <div className="theme-lab__nav-brand">
          <Typography.Label aria-hidden="true" className="theme-lab__brand-mark">
            EN
          </Typography.Label>
          <span>
            <Typography.Label>Northstar</Typography.Label>
            <Typography.Caption>Revenue workspace</Typography.Caption>
          </span>
        </div>
      }
      label="Revenue operations"
    >
      <SidebarNavigationGroup>
        <SidebarNavigationGroupLabel>Portfolio</SidebarNavigationGroupLabel>
        <SidebarNavigationList>
          <SidebarNavigationItem href="#overview" icon="O" label="Overview" />
          <SidebarNavigationItem active href="#renewals" icon="R" label="Renewal queue" />
          <SidebarNavigationItem href="#accounts" icon="A" label="Accounts" />
        </SidebarNavigationList>
      </SidebarNavigationGroup>
      <SidebarNavigationGroup>
        <SidebarNavigationGroupLabel>Execution</SidebarNavigationGroupLabel>
        <SidebarNavigationList>
          <SidebarNavigationItem
            badge={<Badge variant="error">3</Badge>}
            href="#approvals"
            icon="P"
            label="Approvals"
          />
          <SidebarNavigationItem href="#plans" icon="I" label="Intervention plans" />
          <SidebarNavigationItem href="#activity" icon="H" label="Activity history" />
        </SidebarNavigationList>
      </SidebarNavigationGroup>
      <SidebarNavigationGroup>
        <SidebarNavigationGroupLabel>Manage</SidebarNavigationGroupLabel>
        <SidebarNavigationList>
          <SidebarNavigationItem href="#playbooks" icon="B" label="Playbooks" />
          <SidebarNavigationItem href="#settings" icon="S" label="Settings" />
        </SidebarNavigationList>
      </SidebarNavigationGroup>
    </SidebarNavigation>
  )
}

function ThemeLabPage({ initialTheme = "default" }: { initialTheme?: ThemeId }) {
  const [theme, setTheme] = useState<ThemeId>(initialTheme)
  const [selectedAccounts, setSelectedAccounts] = useState<string[]>([
    "Aster Bank",
    "Orchid Telecom",
  ])

  useEffect(() => {
    const root = document.documentElement
    const previousTheme = root.dataset.theme
    const previousMode = root.dataset.mode
    const previousColorScheme = root.style.colorScheme
    const darkTheme = theme === "default-dark" || theme === "terminal" || theme === "high-contrast"

    root.dataset.theme = theme
    root.dataset.mode = darkTheme ? "dark" : "light"
    root.style.colorScheme = root.dataset.mode

    return () => {
      root.dataset.theme = previousTheme ?? "default"
      root.dataset.mode = previousMode ?? "light"
      root.style.colorScheme = previousColorScheme
    }
  }, [theme])

  const allSelected = selectedAccounts.length === renewals.length

  const toggleAccount = (account: string, checked: boolean) => {
    setSelectedAccounts((current) => {
      if (checked) return current.includes(account) ? current : [...current, account]
      return current.filter((item) => item !== account)
    })
  }

  return (
    <div className="theme-lab" data-theme={theme}>
      <ApplicationShell
        header={
          <ApplicationHeader
            actions={
              <div className="theme-lab__header-actions">
                <ThemeSwitch onThemeChange={setTheme} theme={theme} />
                <Button aria-label="Open notifications" size="icon" variant="ghost">
                  3
                </Button>
                <Avatar fallback={{ children: "LM" }} />
              </div>
            }
            brand="Northstar"
            context="Revenue operations"
            search={
              <Input
                aria-label="Search Northstar"
                placeholder="Search accounts, owners, or playbooks"
              />
            }
          />
        }
        navigation={<RenewalNavigation />}
      >
        <PageContainer className="theme-lab__page" gutter="compact" size="wide">
          <PageHeader
            actions={
              <>
                <Button variant="secondary">Export queue</Button>
                <Button>Log intervention</Button>
              </>
            }
            density="compact"
            description="Review commercial exposure, assign the next response, and clear approval blockers before the weekly forecast closes."
            metadata={
              <>
                <Badge variant="error">6 accounts need action</Badge>
                <Typography.Small as="span">24 active renewals</Typography.Small>
                <Typography.Small as="span">Updated 3 minutes ago</Typography.Small>
              </>
            }
            title="Renewal intervention queue"
          />

          <section aria-labelledby="forecast-lock" className="theme-lab__notice">
            <div>
              <Badge variant="warning">Forecast lock</Badge>
              <Typography.Small as="span">
                <Typography.Label as="strong" id="forecast-lock">
                  Friday, 16:00
                </Typography.Label>{" "}
                Three executive summaries still require approval.
              </Typography.Small>
            </div>
            <Button size="sm" variant="secondary">
              Review approvals
            </Button>
          </section>

          <SplitLayout
            density="compact"
            primary={
              <PageSection
                actions={<Badge variant="secondary">10 visible accounts</Badge>}
                className="theme-lab__queue"
                density="compact"
                description="Sorted by renewal date, commercial exposure, and unresolved customer risk."
                title="Accounts requiring intervention"
                variant="surface"
              >
                <div className="theme-lab__filterbar" role="search">
                  <label className="theme-lab__filter-field theme-lab__search-field">
                    <Typography.Label>Search the queue</Typography.Label>
                    <Input placeholder="Account, owner, or region" prefix="solar:magnifer-linear" />
                  </label>
                  <div className="theme-lab__filter-field">
                    <Typography.Label>Region</Typography.Label>
                    <Select aria-label="Filter by region" defaultValue="all" items={regions}>
                      <SelectTrigger aria-label="Filter by region" size="sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectPopup>
                        {regions.map((region) => (
                          <SelectItem key={region.value} value={region.value}>
                            {region.label}
                          </SelectItem>
                        ))}
                      </SelectPopup>
                    </Select>
                  </div>
                  <div className="theme-lab__filter-field">
                    <Typography.Label>Health</Typography.Label>
                    <Select
                      aria-label="Filter by health"
                      defaultValue="open-risk"
                      items={healthStates}
                    >
                      <SelectTrigger aria-label="Filter by health" size="sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectPopup>
                        {healthStates.map((health) => (
                          <SelectItem key={health.value} value={health.value}>
                            {health.label}
                          </SelectItem>
                        ))}
                      </SelectPopup>
                    </Select>
                  </div>
                  <Button size="sm" variant="ghost">
                    Clear filters
                  </Button>
                </div>

                <div aria-live="polite" className="theme-lab__bulkbar">
                  <Typography.Small as="span">
                    <Typography.Label as="strong">{selectedAccounts.length}</Typography.Label>{" "}
                    selected
                  </Typography.Small>
                  <div>
                    <Button disabled={selectedAccounts.length === 0} size="sm" variant="tertiary">
                      Assign owner
                    </Button>
                    <Button disabled={selectedAccounts.length === 0} size="sm" variant="secondary">
                      Add to plan
                    </Button>
                  </div>
                </div>

                <div className="theme-lab__table-scroll" data-allow-overflow>
                  <Table aria-label="Accounts requiring renewal intervention">
                    <TableCaption className="sr-only">
                      Renewal accounts with health, risk, exposure, owner, and next intervention
                    </TableCaption>
                    <TableHeader>
                      <TableRow>
                        <TableHead>
                          <Checkbox
                            aria-label="Select all renewal accounts"
                            checked={allSelected}
                            indeterminate={selectedAccounts.length > 0 && !allSelected}
                            onCheckedChange={(checked) =>
                              setSelectedAccounts(
                                checked ? renewals.map((renewal) => renewal.account) : [],
                              )
                            }
                          />
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
                      {renewals.map((renewal) => {
                        const selected = selectedAccounts.includes(renewal.account)
                        return (
                          <TableRow
                            data-state={selected ? "selected" : undefined}
                            key={renewal.account}
                          >
                            <TableCell>
                              <Checkbox
                                aria-label={`Select ${renewal.account}`}
                                checked={selected}
                                onCheckedChange={(checked) =>
                                  toggleAccount(renewal.account, checked)
                                }
                              />
                            </TableCell>
                            <TableCell>
                              <span className="theme-lab__account">
                                <Avatar fallback={{ children: renewal.initials }} />
                                <span>
                                  <Typography.Label>{renewal.account}</Typography.Label>
                                  <Typography.Caption>{renewal.region}</Typography.Caption>
                                </span>
                              </span>
                            </TableCell>
                            <TableCell>
                              <Typography.Small as="span">{renewal.renewal}</Typography.Small>
                            </TableCell>
                            <TableCell>
                              <Badge variant={renewal.variant}>{renewal.health}</Badge>
                            </TableCell>
                            <TableCell>
                              <span className="theme-lab__risk">
                                <progress
                                  aria-label={`Risk score ${renewal.risk} out of 100`}
                                  max={100}
                                  value={renewal.risk}
                                />
                                <Typography.Label>{renewal.risk}</Typography.Label>
                              </span>
                            </TableCell>
                            <TableCell>
                              <Typography.Label>{renewal.arr}</Typography.Label>
                            </TableCell>
                            <TableCell>{renewal.owner}</TableCell>
                            <TableCell>
                              <Button size="sm" variant="link">
                                {renewal.nextAction}
                              </Button>
                            </TableCell>
                          </TableRow>
                        )
                      })}
                    </TableBody>
                  </Table>
                </div>

                <footer className="theme-lab__queue-footer">
                  <Typography.Small as="span">
                    Showing 10 of 24 accounts · Scroll for owner and action · Press <Kbd>R</Kbd> to
                    refresh
                  </Typography.Small>
                  <div>
                    <Button disabled size="sm" variant="secondary">
                      Previous
                    </Button>
                    <Button size="sm" variant="secondary">
                      Next
                    </Button>
                  </div>
                </footer>
              </PageSection>
            }
            secondary={
              <PageSection
                actions={<Badge variant="error">Risk 92</Badge>}
                className="theme-lab__detail"
                density="compact"
                description="$1.84M annual renewal · Enterprise · APAC"
                title="Aster Bank"
                variant="surface"
              >
                <div className="theme-lab__detail-status">
                  <div>
                    <Typography.Caption>Decision required</Typography.Caption>
                    <Typography.Label>Approve recovery offer</Typography.Label>
                  </div>
                  <Badge variant="warning">Due today</Badge>
                </div>

                <div className="theme-lab__readiness">
                  <div>
                    <Typography.Caption>Plan readiness</Typography.Caption>
                    <Typography.H5 as="p">68%</Typography.H5>
                  </div>
                  <progress aria-label="Plan readiness 68 percent" max={100} value={68} />
                </div>

                <dl className="theme-lab__detail-facts">
                  <div>
                    <Typography.Small as="dt">Owner</Typography.Small>
                    <Typography.Label as="dd">Linh Mai</Typography.Label>
                  </div>
                  <div>
                    <Typography.Small as="dt">Forecast category</Typography.Small>
                    <Typography.Label as="dd">Commit at risk</Typography.Label>
                  </div>
                  <div>
                    <Typography.Small as="dt">Executive sponsor</Typography.Small>
                    <Typography.Label as="dd">Unconfirmed</Typography.Label>
                  </div>
                  <div>
                    <Typography.Small as="dt">Next customer call</Typography.Small>
                    <Typography.Small as="dd">Today, 14:30</Typography.Small>
                  </div>
                </dl>

                <section aria-labelledby="aster-plan" className="theme-lab__detail-section">
                  <header>
                    <Typography.H4 as="h3" id="aster-plan">
                      Recovery plan
                    </Typography.H4>
                    <Typography.Caption>2 of 4 complete</Typography.Caption>
                  </header>
                  <ol className="theme-lab__checklist">
                    <li data-complete="true">
                      <Typography.Caption aria-hidden="true">✓</Typography.Caption>
                      <div>
                        <Typography.Label>Usage analysis</Typography.Label>
                        <Typography.Caption>Completed by Product Ops</Typography.Caption>
                      </div>
                    </li>
                    <li data-complete="true">
                      <Typography.Caption aria-hidden="true">✓</Typography.Caption>
                      <div>
                        <Typography.Label>Stakeholder map</Typography.Label>
                        <Typography.Caption>Finance and operations confirmed</Typography.Caption>
                      </div>
                    </li>
                    <li>
                      <Typography.Caption aria-hidden="true">3</Typography.Caption>
                      <div>
                        <Typography.Label>Commercial exception</Typography.Label>
                        <Typography.Caption>Awaiting finance approval</Typography.Caption>
                      </div>
                    </li>
                    <li>
                      <Typography.Caption aria-hidden="true">4</Typography.Caption>
                      <div>
                        <Typography.Label>Executive summary</Typography.Label>
                        <Typography.Caption>Owner response due at 13:00</Typography.Caption>
                      </div>
                    </li>
                  </ol>
                </section>

                <div className="theme-lab__detail-actions">
                  <Button size="sm">Open intervention</Button>
                  <Button size="sm" variant="secondary">
                    Add note
                  </Button>
                </div>
              </PageSection>
            }
            stickySecondary
          />

          <section aria-label="Renewal portfolio status" className="theme-lab__status-strip">
            <dl className="theme-lab__status-item">
              <Typography.Caption as="dt">Revenue exposed</Typography.Caption>
              <Typography.H5 as="dd">$6.4M</Typography.H5>
            </dl>
            <dl className="theme-lab__status-item">
              <Typography.Caption as="dt">Due this quarter</Typography.Caption>
              <Typography.H5 as="dd">10 accounts</Typography.H5>
            </dl>
            <dl className="theme-lab__status-item">
              <Typography.Caption as="dt">Coverage</Typography.Caption>
              <Typography.H5 as="dd">83% assigned</Typography.H5>
            </dl>
            <dl className="theme-lab__status-item">
              <Typography.Caption as="dt">Recovery plans</Typography.Caption>
              <Typography.H5 as="dd">7 confirmed</Typography.H5>
            </dl>
          </section>

          <section aria-labelledby="intervention-playbooks" className="theme-lab__playbooks">
            <header className="theme-lab__section-heading">
              <div>
                <Typography.H3 as="h2" id="intervention-playbooks">
                  Intervention playbooks
                </Typography.H3>
                <Typography.Small>
                  Reusable response plans triggered by recurring renewal risks.
                </Typography.Small>
              </div>
              <Button size="sm" variant="secondary">
                Manage playbooks
              </Button>
            </header>
            <ul>
              {playbooks.map((playbook) => (
                <li key={playbook.name}>
                  <div>
                    <Typography.Label>{playbook.name}</Typography.Label>
                    <Typography.Small>{playbook.trigger}</Typography.Small>
                  </div>
                  <Badge variant={playbook.variant}>{playbook.readiness}</Badge>
                  <Button size="sm" variant="link">
                    {playbook.action}
                  </Button>
                </li>
              ))}
            </ul>
          </section>
        </PageContainer>
      </ApplicationShell>
    </div>
  )
}

const meta = {
  title: "Examples/Theme-aware renewal operations",
  parameters: { layout: "fullscreen", themeAware: true },
} satisfies Meta
export default meta
type Story = StoryObj<typeof meta>

export const ThemeSwitcher: Story = { render: () => <ThemeLabPage /> }
export const DefaultDark: Story = {
  globals: { theme: "default-dark" },
  render: () => <ThemeLabPage initialTheme="default-dark" />,
}
export const Neobrutalism: Story = {
  globals: { theme: "neobrutalism" },
  render: () => <ThemeLabPage initialTheme="neobrutalism" />,
}
export const Glassmorphism: Story = {
  globals: { theme: "glassmorphism" },
  render: () => <ThemeLabPage initialTheme="glassmorphism" />,
}
export const Neumorphism: Story = {
  globals: { theme: "neumorphism" },
  render: () => <ThemeLabPage initialTheme="neumorphism" />,
}
export const Bauhaus: Story = {
  globals: { theme: "bauhaus" },
  render: () => <ThemeLabPage initialTheme="bauhaus" />,
}
export const Terminal: Story = {
  globals: { theme: "terminal" },
  render: () => <ThemeLabPage initialTheme="terminal" />,
}
export const Editorial: Story = {
  globals: { theme: "editorial" },
  render: () => <ThemeLabPage initialTheme="editorial" />,
}
export const Pop: Story = {
  globals: { theme: "pop" },
  render: () => <ThemeLabPage initialTheme="pop" />,
}
export const HighContrast: Story = {
  globals: { theme: "high-contrast" },
  render: () => <ThemeLabPage initialTheme="high-contrast" />,
}
