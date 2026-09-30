import type { VariantProps } from "../../tailwind-variants"

import { mergeProps, useRender } from "@base-ui/react"
import { tv } from "../../tailwind-variants"

import { type PropsWithClassName } from "../../types"

export const badgeVariants = tv({
  base: [
    "relative inline-flex shrink-0 items-center justify-center gap-xs rounded-control border border-transparent font-medium whitespace-nowrap transition-shadow outline-none",
    "focus-visible:ring-2 focus-visible:ring-brand-500/60 focus-visible:ring-offset-1 focus-visible:ring-offset-neutral-25 focus-visible:outline-none",
    "disabled:pointer-events-none disabled:opacity-64",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='opacity-'])]:opacity-80 [&_svg:not([class*='size-'])]:size-2xl sm:[&_svg:not([class*='size-'])]:size-xl",
    "[button&,a&]:cursor-pointer [button&,a&]:pointer-coarse:after:absolute [button&,a&]:pointer-coarse:after:size-full [button&,a&]:pointer-coarse:after:min-h-[44px] [button&,a&]:pointer-coarse:after:min-w-[44px]",
  ],
  defaultVariants: {
    size: "md",
    variant: "default",
  },
  variants: {
    size: {
      lg: "h-[26px] min-w-[26px] px-sm text-body-md",
      md: "h-[22px] min-w-[22px] px-xs text-body-xs",
      sm: "h-4xl min-w-4xl rounded-control px-xs text-body-xs",
    },
    variant: {
      default: "bg-brand-500 text-on-brand [button&,a&]:hover:bg-brand-500/90",
      destructive: "bg-error-600 text-on-brand [button&,a&]:hover:bg-error-600/90",
      error: "bg-error-500/8 text-error-700",
      info: "bg-info-500/8 text-info-700",
      outline: "border-neutral-300 bg-surface text-neutral-900 [button&,a&]:hover:bg-neutral-50",
      secondary: "bg-neutral-100 text-neutral-900 [button&,a&]:hover:bg-neutral-100/90",
      success: "bg-success-500/8 text-success-900",
      warning: "bg-warning-500/8 text-warning-800",
    },
  },
})

export type BadgeProps = PropsWithClassName<
  useRender.ComponentProps<"span"> & VariantProps<typeof badgeVariants>
>

export function Badge({ className, children, render, size = "md", variant, ...props }: BadgeProps) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps(props, {
      children,
      className: badgeVariants({ className, size, variant }),
      "data-slot": "badge",
    }),
    render,
  })
}
