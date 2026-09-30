import type { ComponentProps } from "react"

import { cn } from "../../tailwind-variants"

import { typographyVariants } from "../typography"
import { type PropsWithClassName } from "../../types"

export function Frame({ className, ...props }: PropsWithClassName<ComponentProps<"div">>) {
  return (
    <div
      className={cn(
        "relative flex flex-col rounded-overlay bg-neutral-100/72 p-xs",
        "*:[[data-slot=frame-panel]+[data-slot=frame-panel]]:mt-xs",
        className,
      )}
      data-slot="frame"
      {...props}
    />
  )
}

export function FramePanel({ className, ...props }: PropsWithClassName<ComponentProps<"div">>) {
  return (
    <div
      className={cn(
        "relative rounded-surface border border-neutral-200 bg-surface bg-clip-padding p-4xl shadow-surface",
        "before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-surface)-1px)] before:shadow-hairline",
        className,
      )}
      data-slot="frame-panel"
      {...props}
    />
  )
}

export function FrameHeader({ className, ...props }: PropsWithClassName<ComponentProps<"header">>) {
  return (
    <header
      className={cn("flex flex-col px-4xl py-3xl", className)}
      data-slot="frame-header"
      {...props}
    />
  )
}

export function FrameTitle({ className, ...props }: PropsWithClassName<ComponentProps<"div">>) {
  return (
    <div
      className={cn(typographyVariants({ variant: "label/md" }), className)}
      data-slot="frame-title"
      {...props}
    />
  )
}

export function FrameDescription({
  className,
  ...props
}: PropsWithClassName<ComponentProps<"div">>) {
  return (
    <div
      className={cn(typographyVariants({ variant: "body/sm" }), "text-neutral-500", className)}
      data-slot="frame-description"
      {...props}
    />
  )
}

export function FrameFooter({ className, ...props }: PropsWithClassName<ComponentProps<"footer">>) {
  return <footer className={cn("px-4xl py-3xl", className)} data-slot="frame-footer" {...props} />
}
