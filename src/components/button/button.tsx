import type { ReactNode } from "react"
import type { VariantProps } from "../../tailwind-variants"

import { Button as BaseButton } from "@base-ui/react/button"
import { tv } from "../../tailwind-variants"

import { Spinner } from "../spinner/spinner"
import { type PropsWithClassName } from "../../types"

export const buttonVariants = tv({
  base: [
    "[--btn-edge:0_1px_oklch(0_0_0/4%)]",
    "[--btn-highlight:0_1px_oklch(1_0_0/16%)]",
    "[--btn-press:0_1px_oklch(0_0_0/8%)]",
    "[--btn-press-scale:0.98]",

    "relative inline-flex shrink-0 cursor-pointer items-center justify-center gap-md whitespace-nowrap rounded-control border transition-all",
    "active:scale-(--btn-press-scale)",
    "before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-control)-1px)] before:content-['']",
    "focus-visible:ring-2 focus-visible:ring-brand-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-25 focus-visible:outline-none",
    "disabled:pointer-events-none disabled:opacity-64",
  ],
  defaultVariants: {
    size: "md",
    variant: "primary",
  },
  variants: {
    size: {
      icon: "size-6xl p-sm",
      lg: "h-[2.25rem] px-2xl",
      md: "h-6xl px-xl",
      sm: "h-[1.75rem] gap-sm px-lg",
      xs: "h-5xl gap-sm px-md text-body-sm",
    },
    variant: {
      danger:
        "border-error-700 bg-error-700 text-on-brand shadow-surface shadow-error-700/24 not-disabled:inset-shadow-(--btn-highlight) hover:bg-error-700 active:bg-error-700 active:shadow-none active:inset-shadow-(--btn-press)",
      "danger-soft":
        "border-error-500 bg-transparent text-error-700 shadow-surface not-active:before:shadow-(--btn-edge) hover:bg-neutral-50 active:bg-neutral-100 active:shadow-none",
      ghost:
        "border-transparent bg-transparent text-neutral-900 hover:bg-neutral-50 active:bg-neutral-100",
      link: "border-transparent bg-transparent text-neutral-900 hover:underline",
      primary:
        "border-brand-500 bg-brand-500 text-on-brand shadow-surface shadow-brand-500/24 not-disabled:inset-shadow-(--btn-highlight) hover:bg-brand-500 active:bg-brand-700 active:shadow-none active:inset-shadow-(--btn-press)",
      secondary:
        "border-neutral-200 bg-surface text-neutral-900 shadow-surface not-active:before:shadow-(--btn-edge) hover:bg-neutral-25 active:bg-neutral-50 active:shadow-none",
      tertiary:
        "border-transparent bg-neutral-50 text-neutral-900 hover:bg-neutral-100 active:bg-neutral-200",
    },
  },
})

export type ButtonProps = PropsWithClassName<
  BaseButton.Props &
    VariantProps<typeof buttonVariants> & {
      icon?: ReactNode | { start?: ReactNode; end?: ReactNode }
      loading?: boolean
    }
>

export function Button({
  className,
  children,
  disabled = false,
  icon,
  loading = false,
  size,
  variant,
  ...props
}: ButtonProps) {
  const iconPair =
    icon != null &&
    typeof icon === "object" &&
    !Array.isArray(icon) &&
    ("start" in icon || "end" in icon)
  const startIcon: ReactNode = iconPair ? icon.start : (icon as ReactNode)
  const endIcon: ReactNode = iconPair ? icon.end : undefined

  return (
    <BaseButton
      aria-busy={loading || undefined}
      className={buttonVariants({ className, size, variant })}
      disabled={disabled}
      {...props}
    >
      {loading ? <Spinner className="size-3xl" /> : startIcon}
      {children}
      {loading ? null : endIcon}
    </BaseButton>
  )
}
