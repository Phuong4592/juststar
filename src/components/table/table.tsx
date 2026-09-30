import type { ComponentProps } from "react"

import { tv } from "../../tailwind-variants"

import { type PropsWithClassName } from "../../types"

export const tableVariants = tv({
  slots: {
    body: [
      "relative before:pointer-events-none before:absolute before:inset-px before:rounded-[calc(var(--radius-surface)-1px)] before:shadow-hairline not-in-data-[variant=card]:before:hidden",
      "in-data-[variant=card]:rounded-surface in-data-[variant=card]:shadow-surface [&_tr:last-child]:border-0",
      "in-data-[variant=card]:*:[tr]:border-0 in-data-[variant=card]:*:[tr]:*:[td]:border-b in-data-[variant=card]:*:[tr]:*:[td]:border-neutral-200 in-data-[variant=card]:*:[tr]:first:*:[td]:first:rounded-ss-overlay in-data-[variant=card]:*:[tr]:*:[td]:first:border-s in-data-[variant=card]:*:[tr]:first:*:[td]:border-t in-data-[variant=card]:*:[tr]:last:*:[td]:last:rounded-ee-overlay in-data-[variant=card]:*:[tr]:*:[td]:last:border-e in-data-[variant=card]:*:[tr]:first:*:[td]:last:rounded-se-overlay in-data-[variant=card]:*:[tr]:last:*:[td]:first:rounded-es-overlay",
    ],
    caption: "mt-3xl text-body-sm text-neutral-500 in-data-[variant=card]:my-3xl",
    cell: [
      "bg-clip-padding p-lg align-middle leading-none whitespace-nowrap in-data-[slot=table-footer]:py-2xl",
      "first:in-data-[variant=card]:ps-[calc(var(--space-lg)-1px)] last:in-data-[variant=card]:pe-[calc(var(--space-lg)-1px)] has-[[role=checkbox]]:w-px first:has-[[role=checkbox]]:pe-0 last:has-[[role=checkbox]]:ps-0",
    ],
    container: "relative w-full overflow-x-auto",
    footer:
      "border-t border-neutral-200 bg-transparent font-semibold not-in-data-[variant=card]:bg-on-surface/2 in-data-[variant=card]:border-none [&>tr]:last:border-b-0",
    head: [
      "h-[2.5rem] px-lg text-left align-middle leading-none font-semibold whitespace-nowrap text-neutral-500",
      "has-[[role=checkbox]]:w-px first:has-[[role=checkbox]]:pe-0 last:has-[[role=checkbox]]:ps-0",
    ],
    header: "[&_tr]:border-b [&_tr]:border-neutral-200",
    root: [
      "w-full caption-bottom font-(family-name:--font-family-sans) text-body-sm font-normal",
      "in-data-[variant=card]:border-separate in-data-[variant=card]:border-spacing-0",
    ],
    row: "relative border-b border-neutral-200 in-data-[slot=table-body]:hover:bg-neutral-100 in-data-[slot=table-body]:data-[state=selected]:bg-on-surface/4 in-data-[slot=table-body]:data-[state=selected]:hover:bg-on-surface/4",
  },
})

export type TableVariant = "default" | "card"

export type TableProps = PropsWithClassName<ComponentProps<"table">> & {
  variant?: TableVariant
}

export function Table({ className, variant = "default", ...props }: TableProps) {
  const { container, root } = tableVariants()

  return (
    <div className={container()} data-slot="table-container" data-variant={variant}>
      <table className={root({ className })} data-slot="table" {...props} />
    </div>
  )
}

export function TableHeader({ className, ...props }: PropsWithClassName<ComponentProps<"thead">>) {
  const { header } = tableVariants()

  return <thead className={header({ className })} data-slot="table-header" {...props} />
}

export function TableBody({ className, ...props }: PropsWithClassName<ComponentProps<"tbody">>) {
  const { body } = tableVariants()

  return <tbody className={body({ className })} data-slot="table-body" {...props} />
}

export function TableFooter({ className, ...props }: PropsWithClassName<ComponentProps<"tfoot">>) {
  const { footer } = tableVariants()

  return <tfoot className={footer({ className })} data-slot="table-footer" {...props} />
}

export function TableRow({ className, ...props }: PropsWithClassName<ComponentProps<"tr">>) {
  const { row } = tableVariants()

  return <tr className={row({ className })} data-slot="table-row" {...props} />
}

export function TableHead({ className, ...props }: PropsWithClassName<ComponentProps<"th">>) {
  const { head } = tableVariants()

  return <th className={head({ className })} data-slot="table-head" {...props} />
}

export function TableCell({ className, ...props }: PropsWithClassName<ComponentProps<"td">>) {
  const { cell } = tableVariants()

  return <td className={cell({ className })} data-slot="table-cell" {...props} />
}

export function TableCaption({
  className,
  ...props
}: PropsWithClassName<ComponentProps<"caption">>) {
  const { caption } = tableVariants()

  return <caption className={caption({ className })} data-slot="table-caption" {...props} />
}
