import type { IconProps } from "@iconify/react"

import { Icon } from "@iconify/react"
import { cn } from "../../tailwind-variants"

export type SpinnerProps = Omit<IconProps, "icon">

export function Spinner({ className, ...props }: SpinnerProps) {
  return (
    <output aria-label="Loading">
      <Icon
        aria-hidden="true"
        className={cn("size-3xl motion-reduce:animate-none", className)}
        icon="svg-spinners:180-ring"
        {...props}
      />
    </output>
  )
}
