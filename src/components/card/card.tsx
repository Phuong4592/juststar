import { mergeProps, useRender } from "@base-ui/react"
import { tv } from "../../tailwind-variants"

import { type PropsWithClassName } from "../../types"
import { typographyVariants } from "../typography"

export const cardVariants = tv({
  slots: {
    action: "col-start-2 row-span-2 row-start-1 inline-flex self-start justify-self-end",
    description: typographyVariants({ variant: "body/sm", className: "text-neutral-500" }),
    footer: "flex items-center p-4xl in-[[data-slot=card]:has(>[data-slot=card-panel])]:pt-3xl",
    frame: [
      "relative flex flex-col rounded-overlay border border-neutral-200 bg-surface bg-clip-padding text-neutral-900 shadow-surface [--clip-bottom:-1rem] [--clip-top:-1rem]",
      "before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-overlay)-1px)] before:bg-neutral-100/72 before:shadow-hairline",
      "has-data-[slot=table-container]:overflow-hidden",
      "*:data-[slot=table-container]:-m-px *:data-[slot=table-container]:w-[calc(100%+2px)]",
      "*:data-[slot=card]:-m-px *:data-[slot=card]:bg-clip-padding *:data-[slot=card]:shadow-none *:data-[slot=card]:before:hidden",
      "*:data-[slot=card]:[clip-path:inset(var(--clip-top)_1px_var(--clip-bottom)_1px_round_calc(var(--radius-overlay)-1px))]",
      "*:first:data-[slot=card]:[--clip-top:1px] *:last:data-[slot=card]:[--clip-bottom:1px]",
      "*:not-first:data-[slot=card]:rounded-t-overlay *:not-last:data-[slot=card]:rounded-b-overlay",
      "*:not-first:data-[slot=card]:before:rounded-t-[calc(var(--radius-surface)-1px)] *:not-last:data-[slot=card]:before:rounded-b-[calc(var(--radius-surface)-1px)]",
    ],
    frameAction: "col-start-2 row-span-2 row-start-1 inline-flex self-center justify-self-end",
    frameDescription: typographyVariants({
      variant: "body/sm",
      className: "self-center text-neutral-500",
    }),
    frameFooter: "px-4xl py-3xl",
    frameHeader:
      "relative grid auto-rows-min grid-rows-[auto_auto] items-start gap-x-3xl px-4xl py-3xl has-data-[slot=card-frame-action]:grid-cols-[1fr_auto]",
    frameTitle: typographyVariants({ variant: "label/md", className: "self-center" }),
    header:
      "grid auto-rows-min grid-rows-[auto_auto] items-start gap-sm p-4xl in-[[data-slot=card]:has(>[data-slot=card-panel])]:pb-3xl has-data-[slot=card-action]:grid-cols-[1fr_auto]",
    panel:
      "flex-1 p-4xl in-[[data-slot=card]:has(>[data-slot=card-footer]:not(.border-t))]:pb-0 in-[[data-slot=card]:has(>[data-slot=card-header]:not(.border-b))]:pt-0",
    root: [
      "relative flex flex-col rounded-overlay border border-neutral-200 bg-surface bg-clip-padding text-neutral-900 shadow-surface",
      "before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-overlay)-1px)] before:shadow-hairline",
    ],
    title: typographyVariants({ variant: "heading/3" }),
  },
})

export type CardProps = PropsWithClassName<useRender.ComponentProps<"div">>

export function Card({ className, render, ...props }: CardProps) {
  const { root } = cardVariants()
  return useRender({
    defaultTagName: "div",
    props: mergeProps(props, {
      className: root({ className }),
      "data-slot": "card",
    }),
    render,
  })
}

export function CardHeader({ className, render, ...props }: CardProps) {
  const { header } = cardVariants()
  return useRender({
    defaultTagName: "div",
    props: mergeProps(props, {
      className: header({ className }),
      "data-slot": "card-header",
    }),
    render,
  })
}

export function CardTitle({ className, render, ...props }: CardProps) {
  const { title } = cardVariants()
  return useRender({
    defaultTagName: "div",
    props: mergeProps(props, {
      className: title({ className }),
      "data-slot": "card-title",
    }),
    render,
  })
}

export function CardDescription({ className, render, ...props }: CardProps) {
  const { description } = cardVariants()
  return useRender({
    defaultTagName: "div",
    props: mergeProps(props, {
      className: description({ className }),
      "data-slot": "card-description",
    }),
    render,
  })
}

export function CardAction({ className, render, ...props }: CardProps) {
  const { action } = cardVariants()
  return useRender({
    defaultTagName: "div",
    props: mergeProps(props, {
      className: action({ className }),
      "data-slot": "card-action",
    }),
    render,
  })
}

export function CardPanel({ className, render, ...props }: CardProps) {
  const { panel } = cardVariants()
  return useRender({
    defaultTagName: "div",
    props: mergeProps(props, {
      className: panel({ className }),
      "data-slot": "card-panel",
    }),
    render,
  })
}

export function CardFooter({ className, render, ...props }: CardProps) {
  const { footer } = cardVariants()
  return useRender({
    defaultTagName: "div",
    props: mergeProps(props, {
      className: footer({ className }),
      "data-slot": "card-footer",
    }),
    render,
  })
}

export function CardFrame({ className, render, ...props }: CardProps) {
  const { frame } = cardVariants()
  return useRender({
    defaultTagName: "div",
    props: mergeProps(props, {
      className: frame({ className }),
      "data-slot": "card-frame",
    }),
    render,
  })
}

export function CardFrameHeader({ className, render, ...props }: CardProps) {
  const { frameHeader } = cardVariants()
  return useRender({
    defaultTagName: "div",
    props: mergeProps(props, {
      className: frameHeader({ className }),
      "data-slot": "card-frame-header",
    }),
    render,
  })
}

export function CardFrameTitle({ className, render, ...props }: CardProps) {
  const { frameTitle } = cardVariants()
  return useRender({
    defaultTagName: "div",
    props: mergeProps(props, {
      className: frameTitle({ className }),
      "data-slot": "card-frame-title",
    }),
    render,
  })
}

export function CardFrameDescription({ className, render, ...props }: CardProps) {
  const { frameDescription } = cardVariants()
  return useRender({
    defaultTagName: "div",
    props: mergeProps(props, {
      className: frameDescription({ className }),
      "data-slot": "card-frame-description",
    }),
    render,
  })
}

export function CardFrameAction({ className, render, ...props }: CardProps) {
  const { frameAction } = cardVariants()
  return useRender({
    defaultTagName: "div",
    props: mergeProps(props, {
      className: frameAction({ className }),
      "data-slot": "card-frame-action",
    }),
    render,
  })
}

export function CardFrameFooter({ className, render, ...props }: CardProps) {
  const { frameFooter } = cardVariants()
  return useRender({
    defaultTagName: "div",
    props: mergeProps(props, {
      className: frameFooter({ className }),
      "data-slot": "card-frame-footer",
    }),
    render,
  })
}

export { CardPanel as CardContent }
