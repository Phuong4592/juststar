import type { ComponentProps, ReactNode } from "react"
import { useId } from "react"
import type { VariantProps } from "../../tailwind-variants"

import { cn, tv } from "../../tailwind-variants"

import { Typography } from "../typography"

export const pageHeaderVariants = tv({
  slots: {
    actions: "flex flex-wrap items-center gap-sm md:justify-end",
    breadcrumbs: "text-neutral-600",
    copy: "grid min-w-0 gap-sm",
    description: "max-w-[48rem] text-neutral-600",
    eyebrow: "text-neutral-500",
    introduction: "grid min-w-0 gap-lg md:grid-cols-[minmax(0,1fr)_auto] md:items-start",
    metadata: "flex flex-wrap items-center gap-x-lg gap-y-xs text-neutral-600",
    root: "grid min-w-0",
    tabs: "min-w-0 overflow-x-auto",
    title: "max-w-24ch text-neutral-900",
  },
  defaultVariants: {
    density: "default",
  },
  variants: {
    density: {
      compact: {
        root: "gap-lg",
      },
      default: {
        root: "gap-xl",
      },
    },
  },
})

export interface PageHeaderProps
  extends Omit<ComponentProps<"header">, "title">, VariantProps<typeof pageHeaderVariants> {
  actions?: ReactNode
  breadcrumbs?: ReactNode
  description?: ReactNode
  eyebrow?: ReactNode
  metadata?: ReactNode
  tabs?: ReactNode
  title: ReactNode
}

export function PageHeader({
  actions,
  breadcrumbs,
  className,
  density,
  description,
  eyebrow,
  metadata,
  tabs,
  title,
  ...props
}: PageHeaderProps) {
  const titleId = useId()
  const styles = pageHeaderVariants({ density })

  return (
    <header
      {...props}
      aria-labelledby={titleId}
      className={cn(styles.root(), className)}
      data-en-part="page-header"
    >
      {breadcrumbs ? (
        <Typography.Small
          as="div"
          className={styles.breadcrumbs()}
          data-en-part="page-header-breadcrumbs"
        >
          {breadcrumbs}
        </Typography.Small>
      ) : null}
      <div className={styles.introduction()}>
        <div className={styles.copy()} data-en-part="page-header-copy">
          {eyebrow ? (
            <Typography.Eyebrow className={styles.eyebrow()}>{eyebrow}</Typography.Eyebrow>
          ) : null}
          <Typography.H1 className={styles.title()} id={titleId}>
            {title}
          </Typography.H1>
          {description ? (
            <Typography.Text className={styles.description()}>{description}</Typography.Text>
          ) : null}
        </div>
        {actions ? (
          <div className={styles.actions()} data-en-part="page-header-actions">
            {actions}
          </div>
        ) : null}
      </div>
      {metadata ? (
        <Typography.Small
          as="div"
          className={styles.metadata()}
          data-en-part="page-header-metadata"
        >
          {metadata}
        </Typography.Small>
      ) : null}
      {tabs ? (
        <div className={styles.tabs()} data-en-part="page-header-tabs">
          {tabs}
        </div>
      ) : null}
    </header>
  )
}
