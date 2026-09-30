import type { ComponentProps } from "react"

import { tv } from "../../tailwind-variants"

import { type PropsWithClassName } from "../../types"

export const kbdVariants = tv({
  slots: {
    group: "inline-flex items-center gap-xs",
    kbd: [
      "pointer-events-none inline-flex h-4xl min-w-4xl items-center justify-center gap-xs rounded-control bg-neutral-100 px-xs font-mono text-mono-xs font-semibold text-neutral-600 select-none",
      "[&_svg:not([class*='size-'])]:size-xl",
    ],
  },
})

export type KbdProps = PropsWithClassName<ComponentProps<"kbd">>

export function Kbd({ className, ...props }: KbdProps) {
  const v = kbdVariants()

  return (
    <kbd className={v.kbd({ className })} data-en-font="technical" data-slot="kbd" {...props} />
  )
}

export type KbdGroupProps = PropsWithClassName<ComponentProps<"span">>

function KbdGroup({ className, ...props }: KbdGroupProps) {
  const v = kbdVariants()

  return <span className={v.group({ className })} data-slot="kbd-group" {...props} />
}

Kbd.Group = KbdGroup
