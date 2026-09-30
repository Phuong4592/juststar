import type { ComponentProps, ReactNode } from "react"
import { useContext } from "react"
import type { VariantProps } from "../../tailwind-variants"

import { cn, tv } from "../../tailwind-variants"

import { ApplicationShellContext } from "../application-shell/application-shell"
import { Typography } from "../typography"

export const applicationHeaderVariants = tv({
  slots: {
    actions: "flex shrink-0 items-center justify-end gap-sm",
    brand: "min-w-0 shrink-0 text-neutral-900",
    context: "hidden min-w-0 text-neutral-600 sm:block",
    leading: "flex min-w-0 items-center gap-md",
    root: [
      "flex min-h-[3.5rem] min-w-0 items-center gap-lg",
      "border-b border-neutral-200 bg-container px-lg py-sm",
    ],
    search: "mx-auto hidden min-w-0 max-w-[36rem] flex-1 md:block",
    toggle: [
      "inline-flex size-(--height-control-md) shrink-0 items-center justify-center rounded-control",
      "text-neutral-600 hover:bg-neutral-200/50 hover:text-neutral-900",
      "focus-visible:ring-2 focus-visible:ring-(--focus-ring-color) focus-visible:outline-none",
    ],
  },
  defaultVariants: {
    sticky: true,
  },
  variants: {
    sticky: {
      false: {},
      true: {
        root: "sticky top-0 z-20 shadow-raised",
      },
    },
  },
})

export interface ApplicationHeaderProps
  extends ComponentProps<"header">, VariantProps<typeof applicationHeaderVariants> {
  actions?: ReactNode
  brand: ReactNode
  context?: ReactNode
  navigationLabel?: string
  search?: ReactNode
}

function NavigationIcon({ close = false }: { close?: boolean }) {
  return (
    <span aria-hidden="true" className="relative block size-3xl">
      <span
        className={cn(
          "absolute top-1/2 left-0 h-px w-3xl bg-current transition-transform",
          close ? "rotate-45" : "-translate-y-1.5",
        )}
      />
      <span
        className={cn(
          "absolute top-1/2 left-0 h-px w-3xl bg-current transition-opacity",
          close && "opacity-0",
        )}
      />
      <span
        className={cn(
          "absolute top-1/2 left-0 h-px w-3xl bg-current transition-transform",
          close ? "-rotate-45" : "translate-y-sm",
        )}
      />
    </span>
  )
}

export function ApplicationHeader({
  actions,
  brand,
  className,
  context,
  navigationLabel = "Navigation",
  search,
  sticky,
  ...props
}: ApplicationHeaderProps) {
  const shell = useContext(ApplicationShellContext)
  const styles = applicationHeaderVariants({ sticky })

  return (
    <header {...props} className={cn(styles.root(), className)} data-en-part="application-header">
      <div className={styles.leading()}>
        {shell ? (
          <>
            <button
              aria-controls={shell.navigationId}
              aria-expanded={shell.mobileNavigationOpen}
              aria-label={`${shell.mobileNavigationOpen ? "Close" : "Open"} ${navigationLabel}`}
              className={cn(styles.toggle(), "lg:hidden")}
              data-en-part="application-header-navigation-toggle"
              id={shell.navigationTriggerId}
              onClick={() => shell.setMobileNavigationOpen(!shell.mobileNavigationOpen)}
              type="button"
            >
              <NavigationIcon close={shell.mobileNavigationOpen} />
            </button>
            <button
              aria-label={`${shell.sidebarCollapsed ? "Expand" : "Collapse"} ${navigationLabel}`}
              className={cn(styles.toggle(), "hidden lg:inline-flex")}
              data-en-part="application-header-navigation-toggle"
              onClick={shell.toggleSidebar}
              type="button"
            >
              <NavigationIcon />
            </button>
          </>
        ) : null}
        <Typography.Label
          as="div"
          className={styles.brand()}
          data-en-part="application-header-brand"
        >
          {brand}
        </Typography.Label>
        {context ? (
          <Typography.Small
            as="div"
            className={styles.context()}
            data-en-part="application-header-context"
          >
            {context}
          </Typography.Small>
        ) : null}
      </div>
      {search ? (
        <div className={styles.search()} data-en-part="application-header-search">
          {search}
        </div>
      ) : null}
      {actions ? (
        <div className={styles.actions()} data-en-part="application-header-actions">
          {actions}
        </div>
      ) : null}
    </header>
  )
}
