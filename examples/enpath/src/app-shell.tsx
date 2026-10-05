import { Avatar, Badge, Typography } from "@enosta/en-ui"

import { cx } from "./cx"
import { Icon } from "@iconify/react"
import type { ReactNode } from "react"

interface NavItem {
  label: string
  icon: string
  active?: boolean
  badge?: string
}

const NAV: { label: string; items: NavItem[] }[] = [
  {
    label: "Me",
    items: [
      { label: "My Career", icon: "tabler:chart-bar", active: true },
      { label: "My Actions", icon: "tabler:checklist" },
      { label: "Records", icon: "tabler:file-text" },
    ],
  },
  {
    label: "Workspace",
    items: [
      { label: "Notifications", icon: "tabler:bell", badge: "1" },
      { label: "Setup", icon: "tabler:settings" },
    ],
  },
]

function Brand() {
  return (
    <span className="flex items-center gap-md">
      <img alt="" height={24} src="./logo-mark.svg" width={24} />
      <Typography.Label className="text-neutral-900">EnPath</Typography.Label>
    </span>
  )
}

// Application-owned EnPath shell: sidebar navigation plus a sticky header.
export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="grid min-h-svh grid-cols-1 bg-canvas text-neutral-900 md:grid-cols-[16rem_minmax(0,1fr)]">
      <aside
        aria-label="Application navigation"
        className="sticky top-0 hidden h-svh flex-col overflow-hidden border-r border-neutral-200 bg-container md:flex"
      >
        <div className="flex min-h-[3.5rem] items-center border-b border-neutral-200 px-xl">
          <Brand />
        </div>
        <nav aria-label="Primary" className="grid content-start gap-3xl overflow-y-auto p-md">
          {NAV.map((group) => (
            <div className="grid gap-xs" key={group.label}>
              <Typography.Eyebrow className="px-sm text-neutral-500">
                {group.label}
              </Typography.Eyebrow>
              <ul className="grid gap-xs">
                {group.items.map((item) => (
                  <li key={item.label}>
                    <a
                      aria-current={item.active ? "page" : undefined}
                      className={cx(
                        "flex min-h-(--height-control-md) items-center gap-sm rounded-control px-sm py-xs no-underline transition-colors",
                        "focus-visible:ring-2 focus-visible:ring-(--focus-ring-color) focus-visible:outline-none",
                        item.active
                          ? "bg-brand-50 text-brand-700"
                          : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900",
                      )}
                      href="#"
                      onClick={(event) => event.preventDefault()}
                    >
                      <Icon aria-hidden="true" className="size-3xl shrink-0" icon={item.icon} />
                      <Typography.Label className="min-w-0 flex-1">{item.label}</Typography.Label>
                      {item.badge && <Badge variant="secondary">{item.badge}</Badge>}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </aside>
      <div className="flex min-w-0 flex-col">
        <header className="sticky top-0 z-20 flex min-h-[3.5rem] min-w-0 items-center gap-lg border-b border-neutral-200 bg-container px-lg py-sm shadow-raised">
          <div className="flex min-w-0 items-center gap-md">
            <Brand />
            <Typography.Small className="hidden text-neutral-600 sm:block">
              My Career
            </Typography.Small>
          </div>
          <div className="ml-auto flex items-center gap-sm">
            <Avatar fallback={{ children: "LN" }} size="sm" />
          </div>
        </header>
        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  )
}
