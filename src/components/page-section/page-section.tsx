import type { ComponentProps, ReactNode } from "react"
import { useId } from "react"
import type { VariantProps } from "../../tailwind-variants"

import { cn, tv } from "../../tailwind-variants"

import { Typography } from "../typography"

export const pageSectionVariants = tv({
  slots: {
    actions: "flex flex-wrap items-center gap-sm md:justify-end",
    content: "min-w-0",
    copy: "grid min-w-0 gap-sm",
    description: "max-w-[48rem] text-neutral-600",
    header: "grid min-w-0 gap-md md:grid-cols-[minmax(0,1fr)_auto] md:items-start",
    root: "grid min-w-0",
    title: "text-neutral-900",
  },
  defaultVariants: {
    density: "comfortable",
    variant: "plain",
  },
  variants: {
    density: {
      comfortable: { root: "gap-lg" },
      compact: { root: "gap-md md:gap-lg" },
    },
    variant: {
      plain: {},
      surface: {
        root: ["rounded-surface border border-neutral-200", "bg-surface shadow-surface"],
      },
    },
  },
  compoundVariants: [
    {
      class: { root: "p-lg md:p-xl" },
      density: "comfortable",
      variant: "surface",
    },
    {
      class: { root: "p-md md:p-lg" },
      density: "compact",
      variant: "surface",
    },
  ],
})

export interface PageSectionProps
  extends Omit<ComponentProps<"section">, "title">, VariantProps<typeof pageSectionVariants> {
  actions?: ReactNode
  description?: ReactNode
  headingAs?: "h2" | "h3"
  title: ReactNode
}

export function PageSection({
  actions,
  children,
  className,
  density,
  description,
  headingAs = "h2",
  title,
  variant,
  ...props
}: PageSectionProps) {
  const titleId = useId()
  const styles = pageSectionVariants({ density, variant })
  return (
    <section
      {...props}
      aria-labelledby={titleId}
      className={cn(styles.root(), className)}
      data-density={density ?? "comfortable"}
      data-en-part="page-section"
    >
      <header className={styles.header()} data-en-part="page-section-header">
        <div className={styles.copy()} data-en-part="page-section-copy">
          <Typography.Root
            as={headingAs}
            className={styles.title()}
            id={titleId}
            variant="heading/2"
          >
            {title}
          </Typography.Root>
          {description ? (
            <Typography.Small className={styles.description()}>{description}</Typography.Small>
          ) : null}
        </div>
        {actions ? (
          <div className={styles.actions()} data-en-part="page-section-actions">
            {actions}
          </div>
        ) : null}
      </header>
      <div className={styles.content()} data-en-part="page-section-content">
        {children}
      </div>
    </section>
  )
}
