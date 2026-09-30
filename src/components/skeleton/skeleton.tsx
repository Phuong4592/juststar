import type { ComponentProps } from "react"

import { cn } from "../../tailwind-variants"

import { type PropsWithClassName } from "../../types"

export function Skeleton({ className, ...props }: PropsWithClassName<ComponentProps<"div">>) {
  return (
    <div
      className={cn(
        "[--skeleton-highlight:--alpha(var(--color-white)/64%)]",
        "[background:linear-gradient(120deg,transparent_40%,var(--skeleton-highlight),transparent_60%)_var(--color-neutral-100)_0_0/200%_100%]",
        "animate-skeleton motion-reduce:animate-none rounded-control",
        className,
      )}
      data-slot="skeleton"
      {...props}
    />
  )
}
