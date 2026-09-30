import type { VariantProps } from "../../tailwind-variants"

import { Separator as BaseSeparator } from "@base-ui/react/separator"
import { tv } from "../../tailwind-variants"

import { type PropsWithClassName } from "../../types"

export const separatorVariants = tv({
  base: "shrink-0 bg-neutral-200 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-px data-[orientation=vertical]:self-stretch",
})

export type SeparatorProps = PropsWithClassName<BaseSeparator.Props> &
  VariantProps<typeof separatorVariants>

export function Separator({ className, orientation = "horizontal", ...props }: SeparatorProps) {
  return (
    <BaseSeparator
      className={separatorVariants({ className })}
      data-slot="separator"
      orientation={orientation}
      {...props}
    />
  )
}
