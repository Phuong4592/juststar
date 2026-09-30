import type { ComponentProps, MouseEvent, ReactNode } from "react"
import { createContext, useContext, useId } from "react"
import { cn, tv } from "../../tailwind-variants"

import { ApplicationShellContext } from "../application-shell/application-shell"
import { typographyVariants } from "../typography"

const SidebarCollapsedContext = createContext(false)
const SidebarLevelContext = createContext<"primary" | "secondary">("primary")

export const sidebarNavigationVariants = tv({
  slots: {
    footer: "mt-auto border-t border-neutral-200 px-md py-sm",
    group: "grid gap-xs",
    groupLabel: ["px-sm text-neutral-500", typographyVariants({ variant: "eyebrow/md" })],
    header: "border-b border-neutral-200 px-md py-sm",
    item: [
      "flex min-h-(--height-control-md) min-w-0 items-center gap-sm rounded-control px-sm py-xs",
      typographyVariants({ variant: "label/md" }),
      "text-neutral-600 transition-colors",
      "hover:bg-neutral-50 hover:text-neutral-900",
      "focus-visible:ring-2 focus-visible:ring-(--focus-ring-color) focus-visible:outline-none",
      "aria-disabled:pointer-events-none aria-disabled:text-neutral-500 aria-disabled:hover:bg-transparent",
    ],
    itemContainer: "min-w-0",
    itemBadge: "ml-auto shrink-0",
    itemIcon: "grid size-3xl shrink-0 place-items-center",
    itemLabel: "min-w-0 flex-1 truncate",
    list: "grid list-none gap-xs p-0",
    root: "flex h-full min-h-0 flex-col bg-container text-neutral-900",
    scroll: "grid min-h-0 flex-1 content-start gap-md overflow-y-auto p-sm",
  },
  defaultVariants: {
    active: false,
    collapsed: false,
    level: "primary",
  },
  variants: {
    active: {
      false: {},
      true: {
        item: "bg-brand-50 text-brand-700",
      },
    },
    collapsed: {
      false: {},
      true: {
        groupLabel: "sr-only",
        item: "justify-center px-xs",
        itemBadge: "hidden",
        itemLabel: "sr-only",
        scroll: "px-xs",
      },
    },
    level: {
      primary: {},
      secondary: {
        item: "min-h-(--height-control-sm)",
        list: "ml-lg border-l border-neutral-200 pl-sm",
      },
    },
  },
  compoundVariants: [
    {
      class: { list: "hidden" },
      collapsed: true,
      level: "secondary",
    },
  ],
})

export interface SidebarNavigationProps extends Omit<ComponentProps<"nav">, "aria-label"> {
  collapsed?: boolean
  footer?: ReactNode
  header?: ReactNode
  label: string
}

export function SidebarNavigation({
  children,
  className,
  collapsed,
  footer,
  header,
  label,
  ...props
}: SidebarNavigationProps) {
  const shell = useContext(ApplicationShellContext)
  const effectiveCollapsed = collapsed ?? shell?.sidebarCollapsed ?? false
  const styles = sidebarNavigationVariants({ collapsed: effectiveCollapsed })

  return (
    <SidebarCollapsedContext value={effectiveCollapsed}>
      <nav
        {...props}
        aria-label={label}
        className={cn(styles.root(), className)}
        data-collapsed={effectiveCollapsed || undefined}
        data-en-part="sidebar-navigation"
      >
        {header ? (
          <div className={styles.header()} data-en-part="sidebar-navigation-header">
            {header}
          </div>
        ) : null}
        <div className={styles.scroll()}>{children}</div>
        {footer ? (
          <div className={styles.footer()} data-en-part="sidebar-navigation-footer">
            {footer}
          </div>
        ) : null}
      </nav>
    </SidebarCollapsedContext>
  )
}

export type SidebarNavigationGroupProps = ComponentProps<"div">

export function SidebarNavigationGroup({ className, ...props }: SidebarNavigationGroupProps) {
  const collapsed = useContext(SidebarCollapsedContext)
  const styles = sidebarNavigationVariants({ collapsed })
  return (
    <div
      {...props}
      className={cn(styles.group(), className)}
      data-en-part="sidebar-navigation-group"
    />
  )
}

export function SidebarNavigationGroupLabel({ className, ...props }: ComponentProps<"div">) {
  const collapsed = useContext(SidebarCollapsedContext)
  const styles = sidebarNavigationVariants({ collapsed })
  return (
    <div
      {...props}
      className={cn(styles.groupLabel(), className)}
      data-en-part="sidebar-navigation-group-label"
    />
  )
}

export interface SidebarNavigationListProps extends ComponentProps<"ul"> {
  level?: "primary" | "secondary"
}

export function SidebarNavigationList({
  className,
  level = "primary",
  ...props
}: SidebarNavigationListProps) {
  const collapsed = useContext(SidebarCollapsedContext)
  const styles = sidebarNavigationVariants({ collapsed, level })
  return (
    <SidebarLevelContext value={level}>
      <ul
        {...props}
        className={cn(styles.list(), className)}
        data-en-part="sidebar-navigation-list"
        data-level={level}
      />
    </SidebarLevelContext>
  )
}

export interface SidebarNavigationItemProps extends Omit<ComponentProps<"a">, "children"> {
  active?: boolean
  badge?: ReactNode
  children?: ReactNode
  disabled?: boolean
  disabledReason?: string
  icon?: ReactNode
  label: ReactNode
}

export function SidebarNavigationItem({
  active = false,
  badge,
  className,
  children,
  disabled = false,
  disabledReason,
  icon,
  label,
  onClick,
  title,
  ...props
}: SidebarNavigationItemProps) {
  const collapsed = useContext(SidebarCollapsedContext)
  const level = useContext(SidebarLevelContext)
  const reasonId = useId()
  const styles = sidebarNavigationVariants({ active, collapsed, level })
  const describedBy = [props["aria-describedby"], disabledReason ? reasonId : undefined]
    .filter(Boolean)
    .join(" ")
  const fallbackTitle =
    typeof label === "string"
      ? [collapsed ? label : undefined, disabledReason].filter(Boolean).join(": ")
      : disabledReason

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    if (disabled) {
      event.preventDefault()
      return
    }
    onClick?.(event)
  }

  return (
    <li className={styles.itemContainer()}>
      <a
        {...props}
        aria-current={active ? "page" : undefined}
        aria-describedby={describedBy || undefined}
        aria-disabled={disabled || undefined}
        className={cn(styles.item(), className)}
        data-en-part="sidebar-navigation-item"
        data-level={level}
        onClick={handleClick}
        tabIndex={disabled ? -1 : props.tabIndex}
        title={title ?? (fallbackTitle || undefined)}
      >
        {icon ? <span className={styles.itemIcon()}>{icon}</span> : null}
        <span className={styles.itemLabel()}>{label}</span>
        {badge ? <span className={styles.itemBadge()}>{badge}</span> : null}
      </a>
      {disabledReason ? (
        <span className="sr-only" id={reasonId}>
          {disabledReason}
        </span>
      ) : null}
      {children}
    </li>
  )
}

export function SidebarNavigationFooter({ className, ...props }: ComponentProps<"div">) {
  const styles = sidebarNavigationVariants()
  return (
    <div
      {...props}
      className={cn(styles.footer(), className)}
      data-en-part="sidebar-navigation-footer"
    />
  )
}
