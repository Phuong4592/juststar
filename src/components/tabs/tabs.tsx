import { createContext, useContext } from "react"

import { Tabs as BaseTabs } from "@base-ui/react/tabs"
import { tv } from "../../tailwind-variants"

import { type PropsWithClassName } from "../../types"

export type TabsSize = "sm" | "default" | "lg"
export type TabsVariant = "default" | "underline"

const TabsListSizeContext = createContext<TabsSize>("default")

export const tabsVariants = tv({
  slots: {
    root: "flex flex-col gap-md data-[orientation=vertical]:flex-row",
    list: "relative z-0 flex w-fit items-center justify-center gap-x-2xs data-[orientation=vertical]:flex-col",
    tab: "relative flex shrink-0 grow cursor-pointer items-center justify-center whitespace-nowrap rounded-control border border-transparent font-medium text-body-md outline-none transition-[color,background-color,box-shadow] hover:text-neutral-600 sm:text-body-sm focus-visible:ring-2 focus-visible:ring-brand-500/60 data-active:text-neutral-900 data-disabled:pointer-events-none data-disabled:opacity-64 data-[orientation=vertical]:w-full data-[orientation=vertical]:justify-start",
    panel: "flex-1 outline-none",
    indicator:
      "absolute bottom-0 left-0 h-(--active-tab-height) w-(--active-tab-width) translate-x-(--active-tab-left) -translate-y-(--active-tab-bottom) transition-[width,translate] duration-200 ease-in-out",
  },
  defaultVariants: {
    size: "default",
    variant: "default",
  },
  variants: {
    size: {
      sm: { tab: "h-[1.875rem] px-[calc(var(--space-md)-1px)] sm:h-[1.625rem]" },
      default: { tab: "h-[2.125rem] px-[calc(var(--space-lg)-1px)] sm:h-[1.875rem]" },
      lg: { tab: "h-[2.375rem] px-[calc(var(--space-xl)-1px)] sm:h-[2.125rem]" },
    },
    variant: {
      default: {
        list: "rounded-surface bg-neutral-100 p-2xs text-neutral-500",
        tab: "gap-sm [&_svg]:pointer-events-none [&_svg]:-mx-2xs [&_svg]:shrink-0 [&_svg:not([class*='opacity-'])]:opacity-80 [&_svg:not([class*='size-'])]:size-3xl",
        indicator: "-z-1 rounded-control bg-surface shadow-hairline",
      },
      underline: {
        list: "text-neutral-600 data-[orientation=vertical]:px-xs data-[orientation=horizontal]:py-xs *:data-[slot=tabs-tab]:hover:bg-neutral-100",
        indicator:
          "z-10 bg-brand-500 data-[orientation=horizontal]:h-2xs data-[orientation=horizontal]:translate-y-px data-[orientation=vertical]:w-2xs data-[orientation=vertical]:-translate-x-px",
      },
    },
  },
})

export type TabsProps = PropsWithClassName<BaseTabs.Root.Props>

export type TabsListProps = PropsWithClassName<
  BaseTabs.List.Props & {
    size?: TabsSize
    variant?: TabsVariant
  }
>

export type TabsTabProps = PropsWithClassName<
  BaseTabs.Tab.Props & {
    size?: TabsSize
  }
>

export type TabsPanelProps = PropsWithClassName<BaseTabs.Panel.Props>

export function Tabs({ className, ...props }: TabsProps) {
  return (
    <BaseTabs.Root
      data-slot="tabs-root"
      className={tabsVariants().root({ className })}
      {...props}
    />
  )
}

export function TabsList({
  className,
  children,
  size = "default",
  variant = "default",
  ...props
}: TabsListProps) {
  const v = tabsVariants({ size, variant })

  return (
    <BaseTabs.List
      data-size={size}
      data-slot="tabs-list"
      className={v.list({ className })}
      {...props}
    >
      <TabsListSizeContext.Provider value={size}>{children}</TabsListSizeContext.Provider>
      <BaseTabs.Indicator data-slot="tabs-indicator" className={v.indicator()} />
    </BaseTabs.List>
  )
}

export function TabsTab({ className, size, ...props }: TabsTabProps) {
  const contextSize = useContext(TabsListSizeContext)
  const resolvedSize = size ?? contextSize
  const v = tabsVariants({ size: resolvedSize })

  return (
    <BaseTabs.Tab
      data-size={resolvedSize}
      data-slot="tabs-tab"
      className={v.tab({ className })}
      {...props}
    />
  )
}

export function TabsPanel({ className, ...props }: TabsPanelProps) {
  return (
    <BaseTabs.Panel
      data-slot="tabs-panel"
      className={tabsVariants().panel({ className })}
      {...props}
    />
  )
}
