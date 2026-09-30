import type { ComponentProps, ReactNode } from "react"
import type { VariantProps } from "../../tailwind-variants"

import { cn, tv } from "../../tailwind-variants"

export const splitLayoutVariants = tv({
  slots: {
    primary: "min-w-0",
    root: "grid min-w-0 grid-cols-1 items-start",
    secondary: "min-w-0",
  },
  compoundVariants: [
    {
      class: { root: "lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]" },
      ratio: "balanced",
    },
    {
      class: { root: "lg:grid-cols-[minmax(0,2fr)_minmax(16rem,1fr)]" },
      ratio: "primary",
      secondaryPosition: "end",
    },
    {
      class: { root: "lg:grid-cols-[minmax(16rem,1fr)_minmax(0,2fr)]" },
      ratio: "primary",
      secondaryPosition: "start",
    },
    {
      class: { root: "lg:grid-cols-[minmax(0,1fr)_minmax(16rem,2fr)]" },
      ratio: "secondary",
      secondaryPosition: "end",
    },
    {
      class: { root: "lg:grid-cols-[minmax(16rem,2fr)_minmax(0,1fr)]" },
      ratio: "secondary",
      secondaryPosition: "start",
    },
    {
      class: { secondary: "lg:top-xl" },
      density: "comfortable",
      stickySecondary: true,
    },
    {
      class: { secondary: "lg:top-lg" },
      density: "compact",
      stickySecondary: true,
    },
  ],
  defaultVariants: {
    density: "comfortable",
    ratio: "primary",
    secondaryPosition: "end",
    stickySecondary: false,
  },
  variants: {
    density: {
      comfortable: {
        root: "gap-lg md:gap-xl lg:gap-2xl",
      },
      compact: { root: "gap-lg lg:gap-xl" },
    },
    ratio: {
      balanced: {},
      primary: {},
      secondary: {},
    },
    secondaryPosition: {
      end: {},
      start: {
        primary: "lg:col-start-2 lg:row-start-1",
        secondary: "lg:col-start-1 lg:row-start-1",
      },
    },
    stickySecondary: {
      false: {},
      true: {
        secondary: "lg:sticky",
      },
    },
  },
})

export interface SplitLayoutProps
  extends ComponentProps<"div">, VariantProps<typeof splitLayoutVariants> {
  primary: ReactNode
  secondary: ReactNode
}

export function SplitLayout({
  className,
  density,
  primary,
  ratio,
  secondary,
  secondaryPosition,
  stickySecondary,
  ...props
}: SplitLayoutProps) {
  const styles = splitLayoutVariants({ density, ratio, secondaryPosition, stickySecondary })

  return (
    <div
      {...props}
      className={cn(styles.root(), className)}
      data-density={density ?? "comfortable"}
      data-en-part="split-layout"
      data-ratio={ratio ?? "primary"}
      data-secondary-position={secondaryPosition ?? "end"}
      data-sticky-secondary={stickySecondary || undefined}
    >
      <div className={styles.primary()} data-en-part="split-layout-primary">
        {primary}
      </div>
      <div className={styles.secondary()} data-en-part="split-layout-secondary">
        {secondary}
      </div>
    </div>
  )
}
