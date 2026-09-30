import type { ComponentProps, ReactNode } from "react"
import { createContext, useEffect, useId, useRef, useState } from "react"
import type { VariantProps } from "../../tailwind-variants"

import { cn, tv } from "../../tailwind-variants"

export type ApplicationShellContextValue = {
  mobileNavigationOpen: boolean
  navigationId: string
  navigationTriggerId: string
  setMobileNavigationOpen: (open: boolean) => void
  sidebarCollapsed: boolean
  toggleSidebar: () => void
}

export const ApplicationShellContext = createContext<ApplicationShellContextValue | null>(null)

export const applicationShellVariants = tv({
  slots: {
    backdrop: [
      "fixed inset-0 z-30 bg-neutral-900/45 transition-opacity lg:hidden",
      "focus-visible:ring-2 focus-visible:ring-(--focus-ring-color) focus-visible:outline-none",
    ],
    header: "min-w-0",
    main: "min-w-0 flex-1 overflow-x-clip",
    root: [
      "relative min-h-svh bg-canvas font-(family-name:--font-family-sans) text-neutral-900",
      "[--application-shell-rail-width:4.5rem] [--application-shell-sidebar-width:16rem] lg:grid",
    ],
    sidebar: [
      "fixed inset-y-0 left-0 z-40 w-(--application-shell-sidebar-width)",
      "border-r border-neutral-200 bg-container shadow-overlay",
      "transition-[width,transform] duration-180 lg:static lg:z-auto lg:row-start-1 lg:shadow-none",
    ],
    skipLink: [
      "fixed top-sm left-sm z-50 -translate-y-20 rounded-control",
      "bg-neutral-900 px-md py-sm text-body-sm text-container",
      "focus:translate-y-0 focus:ring-2 focus:ring-(--focus-ring-color) focus:outline-none",
    ],
    workspace: "flex min-h-svh min-w-0 flex-col lg:row-start-1",
  },
  defaultVariants: {
    mobileNavigationOpen: false,
    sidebarCollapsed: false,
  },
  variants: {
    mobileNavigationOpen: {
      false: {
        backdrop: "pointer-events-none opacity-0",
        sidebar: "-translate-x-full lg:translate-x-0",
      },
      true: {
        backdrop: "opacity-100",
        sidebar: "translate-x-0",
      },
    },
    sidebarCollapsed: {
      false: {
        root: "lg:grid-cols-[var(--application-shell-sidebar-width)_minmax(0,1fr)]",
      },
      true: {
        root: "lg:grid-cols-[var(--application-shell-rail-width)_minmax(0,1fr)]",
        sidebar: "lg:w-(--application-shell-rail-width)",
      },
    },
  },
})

export interface ApplicationShellProps
  extends
    Omit<ComponentProps<"div">, "children">,
    Pick<VariantProps<typeof applicationShellVariants>, never> {
  children: ReactNode
  defaultSidebarCollapsed?: boolean
  header: ReactNode
  navigation: ReactNode
  navigationLabel?: string
  skipLinkLabel?: string
}

const focusableSelector =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

export function ApplicationShell({
  children,
  className,
  defaultSidebarCollapsed = false,
  header,
  navigation,
  navigationLabel = "Application navigation",
  skipLinkLabel = "Skip to content",
  ...props
}: ApplicationShellProps) {
  const generatedId = useId()
  const mainId = `application-main-${generatedId}`
  const navigationId = `application-navigation-${generatedId}`
  const sidebarRef = useRef<HTMLElement>(null)
  const [isDesktop, setIsDesktop] = useState(false)
  const [mobileNavigationOpen, setMobileNavigationOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(defaultSidebarCollapsed)
  const styles = applicationShellVariants({ mobileNavigationOpen, sidebarCollapsed })

  useEffect(() => {
    if (typeof window.matchMedia !== "function") return
    const query = window.matchMedia("(min-width: 1024px)")
    const update = () => setIsDesktop(query.matches)
    update()
    query.addEventListener("change", update)
    return () => query.removeEventListener("change", update)
  }, [])

  useEffect(() => {
    if (!mobileNavigationOpen || isDesktop) return
    const overflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    const firstFocusable = sidebarRef.current?.querySelector<HTMLElement>(focusableSelector)
    firstFocusable?.focus()
    return () => {
      document.body.style.overflow = overflow
    }
  }, [isDesktop, mobileNavigationOpen])

  function closeMobileNavigation({ restoreFocus = true } = {}) {
    setMobileNavigationOpen(false)
    if (restoreFocus) document.getElementById(`${navigationId}-trigger`)?.focus()
  }

  function handleNavigationKeyDown(event: React.KeyboardEvent<HTMLElement>) {
    if (isDesktop || !mobileNavigationOpen) return
    if (event.key === "Escape") {
      event.preventDefault()
      closeMobileNavigation()
      return
    }
    if (event.key !== "Tab") return
    const focusable = Array.from(
      sidebarRef.current?.querySelectorAll<HTMLElement>(focusableSelector) ?? [],
    )
    if (focusable.length === 0) return
    const first = focusable[0]
    const last = focusable.at(-1)
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last?.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first.focus()
    }
  }

  const context: ApplicationShellContextValue = {
    mobileNavigationOpen,
    navigationId,
    navigationTriggerId: `${navigationId}-trigger`,
    setMobileNavigationOpen,
    sidebarCollapsed,
    toggleSidebar: () => setSidebarCollapsed((value) => !value),
  }
  const navigationAvailable = isDesktop || mobileNavigationOpen

  return (
    <ApplicationShellContext value={context}>
      <div {...props} className={cn(styles.root(), className)} data-en-part="application-shell">
        <a
          className={styles.skipLink()}
          data-en-part="application-shell-skip-link"
          href={`#${mainId}`}
        >
          {skipLinkLabel}
        </a>
        <button
          aria-label="Close navigation"
          className={styles.backdrop()}
          data-en-part="application-shell-backdrop"
          onClick={() => closeMobileNavigation()}
          tabIndex={-1}
          type="button"
        />
        <aside
          aria-hidden={!navigationAvailable || undefined}
          aria-label={navigationLabel}
          aria-modal={!isDesktop && mobileNavigationOpen ? true : undefined}
          className={styles.sidebar()}
          data-en-part="application-shell-sidebar"
          id={navigationId}
          inert={!navigationAvailable}
          onKeyDown={handleNavigationKeyDown}
          ref={sidebarRef}
          role={!isDesktop && mobileNavigationOpen ? "dialog" : undefined}
        >
          {navigation}
        </aside>
        <div className={styles.workspace()} data-en-part="application-shell-workspace">
          <div className={styles.header()} data-en-part="application-shell-header">
            {header}
          </div>
          <main className={styles.main()} data-en-part="application-shell-main" id={mainId}>
            {children}
          </main>
        </div>
      </div>
    </ApplicationShellContext>
  )
}
