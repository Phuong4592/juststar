import { type ComponentPropsWithRef, type ElementType } from "react"
import { tv, type VariantProps } from "../../tailwind-variants"

export const typographyVariants = tv({
  base: "m-0 font-sans text-inherit",
  variants: {
    variant: {
      "display/2xl": "text-display-2xl font-bold",
      "display/xl": "text-display-xl font-bold",
      "display/lg": "text-display-lg font-bold",
      "display/md": "text-display-md font-bold",
      "display/sm": "text-display-sm font-bold",
      "heading/1": "text-heading-1 font-semibold",
      "heading/2": "text-heading-2 font-semibold",
      "heading/3": "text-heading-3 font-semibold",
      "heading/4": "text-heading-4 font-semibold",
      "heading/5": "text-heading-5 font-semibold",
      "heading/6": "text-heading-6 font-semibold",
      "body/xl": "text-body-xl font-normal",
      "body/lg": "text-body-lg font-normal",
      "body/md": "text-body-md font-normal",
      "body/sm": "text-body-sm font-normal",
      "body/xs": "text-body-xs font-normal",
      "label/lg": "text-label-lg font-semibold",
      "label/md": "text-label-md font-semibold",
      "label/sm": "text-label-sm font-semibold",
      "mono/display": "font-mono text-mono-display font-semibold",
      "mono/lg": "font-mono text-mono-lg font-semibold",
      "mono/md": "font-mono text-mono-md font-normal",
      "mono/sm": "font-mono text-mono-sm font-normal",
      "mono/xs": "font-mono text-mono-xs font-normal",
      "mono/2xs": "font-mono text-mono-2xs font-normal",
      "mono/caps": "font-mono text-mono-caps font-semibold tracking-mono-caps uppercase",
      "mono/caps-xs": "font-mono text-mono-caps-xs font-semibold tracking-mono-caps-xs uppercase",
      "eyebrow/lg": "text-eyebrow-lg font-semibold tracking-eyebrow-lg uppercase",
      "eyebrow/md": "text-eyebrow-md font-semibold tracking-eyebrow-md uppercase",
    },
  },
  defaultVariants: { variant: "body/md" },
})

export type TypographyVariant = NonNullable<VariantProps<typeof typographyVariants>["variant"]>

export type TypographyElement =
  | "a"
  | "abbr"
  | "p"
  | "span"
  | "div"
  | "button"
  | "dd"
  | "del"
  | "dt"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "label"
  | "legend"
  | "figcaption"
  | "ins"
  | "li"
  | "mark"
  | "blockquote"
  | "pre"
  | "code"
  | "strong"
  | "em"
  | "small"
  | "s"
  | "sub"
  | "sup"
  | "cite"
  | "q"
  | "time"
  | "address"

export type TypographyProps<T extends TypographyElement = "p"> = Omit<
  ComponentPropsWithRef<T>,
  "as" | "className"
> & {
  as?: T
  className?: string
  variant?: TypographyVariant
}

const semanticElements: Record<TypographyVariant, TypographyElement> = {
  "display/2xl": "h1",
  "display/xl": "h1",
  "display/lg": "h1",
  "display/md": "h1",
  "display/sm": "h1",
  "heading/1": "h1",
  "heading/2": "h2",
  "heading/3": "h3",
  "heading/4": "h4",
  "heading/5": "h5",
  "heading/6": "h6",
  "body/xl": "p",
  "body/lg": "p",
  "body/md": "p",
  "body/sm": "p",
  "body/xs": "p",
  "label/lg": "span",
  "label/md": "span",
  "label/sm": "span",
  "mono/display": "span",
  "mono/lg": "span",
  "mono/md": "span",
  "mono/sm": "span",
  "mono/xs": "span",
  "mono/2xs": "span",
  "mono/caps": "span",
  "mono/caps-xs": "span",
  "eyebrow/lg": "span",
  "eyebrow/md": "span",
}

function TypographyRoot<T extends TypographyElement = "p">({
  as,
  className,
  variant = "body/md",
  ...props
}: TypographyProps<T>) {
  const Component = (as ?? semanticElements[variant]) as ElementType
  const fontRole = variant.startsWith("mono/") ? "technical" : "primary"

  return (
    <Component
      {...props}
      className={typographyVariants({ variant, className })}
      data-en-font={fontRole}
      data-en-typography={variant}
    />
  )
}

type TypographyPresetProps<T extends TypographyElement> = Omit<TypographyProps<T>, "variant">

function createTypographyPreset<DefaultElement extends TypographyElement>(
  defaultElement: DefaultElement,
  variant: TypographyVariant,
) {
  return function TypographyPreset<T extends TypographyElement = DefaultElement>({
    as,
    className,
    ...props
  }: TypographyPresetProps<T>) {
    const Component = (as ?? defaultElement) as ElementType
    const fontRole = variant.startsWith("mono/") ? "technical" : "primary"

    return (
      <Component
        {...props}
        className={typographyVariants({ variant, className })}
        data-en-font={fontRole}
        data-en-typography={variant}
      />
    )
  }
}

const TypographyDisplay = createTypographyPreset("h1", "display/sm")
const TypographyH1 = createTypographyPreset("h1", "heading/1")
const TypographyH2 = createTypographyPreset("h2", "heading/2")
const TypographyH3 = createTypographyPreset("h3", "heading/3")
const TypographyH4 = createTypographyPreset("h4", "heading/4")
const TypographyH5 = createTypographyPreset("h5", "heading/5")
const TypographyH6 = createTypographyPreset("h6", "heading/6")
const TypographyLead = createTypographyPreset("p", "body/lg")
const TypographyText = createTypographyPreset("p", "body/md")
const TypographySmall = createTypographyPreset("p", "body/sm")
const TypographyCaption = createTypographyPreset("span", "body/xs")
const TypographyLabel = createTypographyPreset("span", "label/md")
const TypographyMono = createTypographyPreset("span", "mono/md")
const TypographyMonoStrong = createTypographyPreset("strong", "mono/lg")
const TypographyMonoSmall = createTypographyPreset("span", "mono/sm")
const TypographyMonoCaption = createTypographyPreset("span", "mono/xs")
const TypographyCode = createTypographyPreset("code", "mono/md")
const TypographyEyebrow = createTypographyPreset("span", "eyebrow/md")

export const Typography = Object.assign(TypographyRoot, {
  Root: TypographyRoot,
  Display: TypographyDisplay,
  H1: TypographyH1,
  H2: TypographyH2,
  H3: TypographyH3,
  H4: TypographyH4,
  H5: TypographyH5,
  H6: TypographyH6,
  Lead: TypographyLead,
  Text: TypographyText,
  Small: TypographySmall,
  Caption: TypographyCaption,
  Label: TypographyLabel,
  Mono: TypographyMono,
  MonoStrong: TypographyMonoStrong,
  MonoSmall: TypographyMonoSmall,
  MonoCaption: TypographyMonoCaption,
  Code: TypographyCode,
  Eyebrow: TypographyEyebrow,
})
