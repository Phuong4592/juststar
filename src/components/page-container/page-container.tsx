import type { ComponentProps } from "react"
import type { VariantProps } from "../../tailwind-variants"

import { cn, tv } from "../../tailwind-variants"

export const pageContainerVariants = tv({
  base: "mx-auto w-full min-w-0",
  defaultVariants: {
    gutter: "default",
    size: "default",
  },
  variants: {
    gutter: {
      compact: "px-md sm:px-lg",
      default: "px-lg md:px-xl xl:px-2xl",
      none: "",
      spacious: "px-xl lg:px-2xl",
    },
    size: {
      default: "max-w-[64rem]",
      full: "max-w-none",
      narrow: "max-w-[48rem]",
      wide: "max-w-[80rem]",
    },
  },
})

export type PageContainerProps = ComponentProps<"div"> & VariantProps<typeof pageContainerVariants>

export function PageContainer({ className, gutter, size, ...props }: PageContainerProps) {
  return (
    <div
      {...props}
      className={cn(pageContainerVariants({ gutter, size }), className)}
      data-en-part="page-container"
    />
  )
}
