import type { ComponentProps, ReactNode } from "react"
import { useId } from "react"

import { Typography } from "@enosta/en-ui"

function classes(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ")
}

interface SiteContainerProps extends ComponentProps<"div"> {
  gutter?: "compact" | "default" | "none" | "spacious"
  size?: "default" | "full" | "narrow" | "wide"
}

export function SiteContainer({
  className,
  gutter = "default",
  size = "default",
  ...props
}: SiteContainerProps) {
  return (
    <div
      {...props}
      className={classes("site-container", className)}
      data-gutter={gutter}
      data-size={size}
      data-site-part="container"
    />
  )
}

interface SitePageHeaderProps extends Omit<ComponentProps<"header">, "title"> {
  actions?: ReactNode
  description?: ReactNode
  density?: "compact" | "default"
  metadata?: ReactNode
  title: ReactNode
}

export function SitePageHeader({
  actions,
  className,
  density = "default",
  description,
  metadata,
  title,
  ...props
}: SitePageHeaderProps) {
  const titleId = useId()

  return (
    <header
      {...props}
      aria-labelledby={titleId}
      className={classes("site-page-header", className)}
      data-density={density}
      data-site-part="page-header"
    >
      <div className="site-page-header-introduction">
        <div className="site-page-header-copy" data-site-part="page-header-copy">
          <Typography.H1 id={titleId}>{title}</Typography.H1>
          {description ? <Typography.Text>{description}</Typography.Text> : null}
        </div>
        {actions ? <div className="site-page-header-actions">{actions}</div> : null}
      </div>
      {metadata ? (
        <Typography.Small as="div" className="site-page-header-metadata">
          {metadata}
        </Typography.Small>
      ) : null}
    </header>
  )
}

interface SiteSectionProps extends Omit<ComponentProps<"section">, "title"> {
  actions?: ReactNode
  density?: "comfortable" | "compact"
  description?: ReactNode
  headingAs?: "h2" | "h3"
  title: ReactNode
  variant?: "plain" | "surface"
}

export function SiteSection({
  actions,
  children,
  className,
  density = "comfortable",
  description,
  headingAs = "h2",
  title,
  variant = "plain",
  ...props
}: SiteSectionProps) {
  const titleId = useId()

  return (
    <section
      {...props}
      aria-labelledby={titleId}
      className={classes("site-section-component", className)}
      data-density={density}
      data-site-part="section"
      data-variant={variant}
    >
      <header className="site-section-component-header">
        <div className="site-section-component-copy">
          <Typography.Root as={headingAs} id={titleId} variant="heading/2">
            {title}
          </Typography.Root>
          {description ? <Typography.Small>{description}</Typography.Small> : null}
        </div>
        {actions ? <div className="site-section-component-actions">{actions}</div> : null}
      </header>
      <div className="site-section-component-content" data-site-part="section-content">
        {children}
      </div>
    </section>
  )
}
