import type { ComponentProps, ReactNode } from "react"
import { useId } from "react"
import { cn, tv } from "../../tailwind-variants"

import { Typography, typographyVariants } from "../../components/typography"

const variants = tv({
  slots: {
    page: [
      "relative grid min-h-svh overflow-hidden bg-canvas text-neutral-900",
      "lg:grid-cols-[minmax(28rem,0.82fr)_minmax(32rem,1.18fr)]",
    ],
    formRegion: "relative z-1 grid min-w-0 content-center px-5xl py-[3rem] max-sm:px-3xl",
    formInner: "mx-auto grid w-full max-w-[28rem] gap-6xl",
    brand: "flex min-h-(--height-control-md) items-center gap-xl",
    brandMark: [
      "grid size-[2.25rem] place-items-center rounded-control",
      "bg-neutral-900 text-neutral-25 shadow-raised",
    ],
    copy: "grid gap-xl",
    eyebrow: "text-brand-600",
    title: "max-w-16ch",
    description: "max-w-54ch text-neutral-600",
    form: [
      "grid gap-3xl rounded-surface border border-neutral-200",
      "bg-surface p-5xl shadow-surface",
    ],
    footer: ["text-neutral-600", typographyVariants({ variant: "body/sm" })],
    aside: [
      "relative hidden overflow-hidden border-l border-neutral-200",
      "bg-neutral-900 p-[2.5rem] text-neutral-25 lg:grid lg:content-end",
      "before:absolute before:inset-0 before:opacity-25",
      "before:bg-[linear-gradient(135deg,transparent_0_38%,var(--color-brand-400)_38%_40%,transparent_40%_58%,var(--color-neutral-100)_58%_59%,transparent_59%)]",
    ],
    asideInner: "relative z-1 grid max-w-[36rem] gap-5xl",
    asideTitle: "text-neutral-25",
    asideDescription: "max-w-56ch text-neutral-100",
    asideList: "grid gap-xl border-t border-neutral-700 pt-4xl",
    asideItem: "grid grid-cols-[1.5rem_minmax(0,1fr)] gap-xl",
    asideIndex: "text-brand-400",
  },
})

export interface LoginPageProps extends Omit<ComponentProps<"main">, "title"> {
  asideDescription?: ReactNode
  asideItems?: ReactNode[]
  asideTitle?: ReactNode
  brand: ReactNode
  brandMark?: ReactNode
  description?: ReactNode
  eyebrow?: ReactNode
  footer?: ReactNode
  form: ReactNode
  title: ReactNode
}

export function LoginPage({
  asideDescription,
  asideItems = [],
  asideTitle,
  brand,
  brandMark = "EN",
  className,
  description,
  eyebrow = "Secure workspace access",
  footer,
  form,
  title,
  ...props
}: LoginPageProps) {
  const titleId = useId()
  const styles = variants()

  return (
    <main
      {...props}
      aria-labelledby={titleId}
      className={cn(styles.page(), className)}
      data-en-part="login-page"
    >
      <section className={styles.formRegion()}>
        <div className={styles.formInner()}>
          <Typography.Label as="div" className={styles.brand()} data-en-part="login-brand">
            <span aria-hidden="true" className={styles.brandMark()}>
              {brandMark}
            </span>
            {brand}
          </Typography.Label>
          <header className={styles.copy()}>
            {eyebrow ? (
              <Typography.Eyebrow className={styles.eyebrow()}>{eyebrow}</Typography.Eyebrow>
            ) : null}
            <Typography.Display className={styles.title()} id={titleId}>
              {title}
            </Typography.Display>
            {description ? (
              <Typography.Text className={styles.description()}>{description}</Typography.Text>
            ) : null}
          </header>
          <div className={styles.form()} data-en-part="login-form">
            {form}
          </div>
          {footer ? <footer className={styles.footer()}>{footer}</footer> : null}
        </div>
      </section>
      {asideTitle || asideDescription || asideItems.length > 0 ? (
        <aside aria-label="Product access context" className={styles.aside()}>
          <div className={styles.asideInner()}>
            {asideTitle ? (
              <Typography.H2 className={styles.asideTitle()}>{asideTitle}</Typography.H2>
            ) : null}
            {asideDescription ? (
              <Typography.Text className={styles.asideDescription()}>
                {asideDescription}
              </Typography.Text>
            ) : null}
            {asideItems.length > 0 ? (
              <div className={styles.asideList()}>
                {asideItems.map((item, index) => (
                  <Typography.Small as="div" className={styles.asideItem()} key={index}>
                    <Typography.Caption aria-hidden="true" className={styles.asideIndex()}>
                      {String(index + 1).padStart(2, "0")}
                    </Typography.Caption>
                    <span>{item}</span>
                  </Typography.Small>
                ))}
              </div>
            ) : null}
          </div>
        </aside>
      ) : null}
    </main>
  )
}
