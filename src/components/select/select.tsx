import type { VariantProps } from "../../tailwind-variants"

import { Select as BaseSelect } from "@base-ui/react/select"
import { Icon } from "@iconify/react"
import { cn, tv } from "../../tailwind-variants"

type PropsWithClassName<T> = Omit<T, "className"> & { className?: string }

export const selectVariants = tv({
  slots: {
    icon: "-me-(--space-xs) size-[18px] opacity-80 sm:size-3xl",
    trigger: [
      "relative inline-flex min-h-[36px] w-full min-w-[144px] cursor-default items-center justify-between gap-md rounded-control border border-neutral-200 bg-surface bg-clip-padding px-[calc(var(--space-xl)-1px)] text-left text-body-md text-neutral-900 shadow-surface transition-shadow outline-none select-none",
      "before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-control)-1px)] before:shadow-hairline",
      "pointer-coarse:after:absolute pointer-coarse:after:size-full pointer-coarse:after:min-h-[44px]",
      "focus-visible:border-brand-400 focus-visible:ring-2 focus-visible:ring-brand-500/24",
      "aria-invalid:border-error-400 focus-visible:aria-invalid:border-error-500 focus-visible:aria-invalid:ring-error-500/16",
      "data-disabled:pointer-events-none data-disabled:cursor-not-allowed data-disabled:bg-neutral-50 data-disabled:opacity-64",
      "sm:min-h-6xl sm:text-body-sm",
      "[&_svg:not([class*='opacity-'])]:opacity-80",
    ],
  },
  variants: {
    size: {
      lg: { trigger: "min-h-[40px] sm:min-h-[36px]" },
      sm: { trigger: "min-h-6xl gap-sm px-[calc(var(--space-lg)-1px)] sm:min-h-[28px]" },
    },
  },
})

export const Select: typeof BaseSelect.Root = BaseSelect.Root

export function SelectTrigger({
  className,
  size,
  children,
  ...props
}: PropsWithClassName<BaseSelect.Trigger.Props> & VariantProps<typeof selectVariants>) {
  const v = selectVariants({ size })

  return (
    <BaseSelect.Trigger className={v.trigger({ className })} data-slot="select-trigger" {...props}>
      {children}
      <BaseSelect.Icon data-slot="select-icon">
        <Icon aria-hidden="true" className={v.icon()} icon="ph:caret-up-down-bold" />
      </BaseSelect.Icon>
    </BaseSelect.Trigger>
  )
}

export function SelectValue({ className, ...props }: PropsWithClassName<BaseSelect.Value.Props>) {
  return (
    <BaseSelect.Value
      className={cn("flex-1 truncate data-placeholder:text-neutral-600", className)}
      data-slot="select-value"
      {...props}
    />
  )
}

export type SelectPopupProps = BaseSelect.Popup.Props & {
  side?: BaseSelect.Positioner.Props["side"]
  align?: BaseSelect.Positioner.Props["align"]
  sideOffset?: BaseSelect.Positioner.Props["sideOffset"]
  alignOffset?: BaseSelect.Positioner.Props["alignOffset"]
  alignItemWithTrigger?: BaseSelect.Positioner.Props["alignItemWithTrigger"]
}

export function SelectPopup({
  className,
  children,
  side = "bottom",
  sideOffset = 4,
  align = "start",
  alignOffset = 0,
  alignItemWithTrigger = true,
  ...props
}: SelectPopupProps) {
  return (
    <BaseSelect.Portal>
      <BaseSelect.Positioner
        align={align}
        alignItemWithTrigger={alignItemWithTrigger}
        alignOffset={alignOffset}
        className="z-50 select-none"
        data-slot="select-positioner"
        side={side}
        sideOffset={sideOffset}
      >
        <BaseSelect.Popup
          className="origin-(--transform-origin) text-neutral-900 outline-none"
          data-slot="select-popup"
          {...props}
        >
          <BaseSelect.ScrollUpArrow
            className="top-0 z-50 flex h-5xl w-full cursor-default items-center justify-center before:pointer-events-none before:absolute before:inset-x-px before:top-px before:h-[200%] before:rounded-t-[calc(var(--radius-control)-1px)] before:bg-linear-to-b before:from-surface before:from-50%"
            data-slot="select-scroll-up-arrow"
          >
            <Icon
              aria-hidden="true"
              className="relative size-[18px] sm:size-3xl"
              icon="solar:alt-arrow-up-linear"
            />
          </BaseSelect.ScrollUpArrow>
          <div className="relative h-full min-w-(--anchor-width) rounded-control border border-neutral-200 bg-surface bg-clip-padding shadow-overlay before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-control)-1px)] before:shadow-hairline">
            <BaseSelect.List
              className={cn("max-h-(--available-height) overflow-y-auto p-xs", className)}
              data-slot="select-list"
            >
              {children}
            </BaseSelect.List>
          </div>
          <BaseSelect.ScrollDownArrow
            className="bottom-0 z-50 flex h-5xl w-full cursor-default items-center justify-center before:pointer-events-none before:absolute before:inset-x-px before:bottom-px before:h-[200%] before:rounded-b-[calc(var(--radius-control)-1px)] before:bg-linear-to-t before:from-surface before:from-50%"
            data-slot="select-scroll-down-arrow"
          >
            <Icon
              aria-hidden="true"
              className="relative size-[18px] sm:size-3xl"
              icon="solar:alt-arrow-down-linear"
            />
          </BaseSelect.ScrollDownArrow>
        </BaseSelect.Popup>
      </BaseSelect.Positioner>
    </BaseSelect.Portal>
  )
}

export function SelectItem({
  className,
  children,
  ...props
}: PropsWithClassName<BaseSelect.Item.Props>) {
  return (
    <BaseSelect.Item
      className={cn(
        "grid min-h-6xl cursor-default grid-cols-[1rem_1fr] items-center gap-md rounded-control py-xs ps-md pe-3xl text-body-md outline-none in-data-[side=none]:min-w-[calc(var(--anchor-width)+1.25rem)] data-disabled:pointer-events-none data-disabled:opacity-64 data-highlighted:bg-neutral-100 data-highlighted:text-neutral-900 sm:min-h-[28px] sm:text-body-sm",
        className,
      )}
      data-slot="select-item"
      {...props}
    >
      <BaseSelect.ItemIndicator className="col-start-1">
        <Icon aria-hidden="true" icon="mingcute:check-line" />
      </BaseSelect.ItemIndicator>
      <BaseSelect.ItemText className="col-start-2 min-w-0">{children}</BaseSelect.ItemText>
    </BaseSelect.Item>
  )
}

export function SelectSeparator({
  className,
  ...props
}: PropsWithClassName<BaseSelect.Separator.Props>) {
  return (
    <BaseSelect.Separator
      className={cn("mx-md my-xs h-px bg-neutral-200", className)}
      data-slot="select-separator"
      {...props}
    />
  )
}

export function SelectGroup(props: BaseSelect.Group.Props) {
  return <BaseSelect.Group data-slot="select-group" {...props} />
}

export function SelectLabel({ className, ...props }: PropsWithClassName<BaseSelect.Label.Props>) {
  return (
    <BaseSelect.Label
      className={cn(
        "mb-md inline-flex cursor-default items-center gap-md text-body-md/4.5 font-medium text-neutral-900 sm:text-body-sm/4",
        className,
      )}
      data-slot="select-label"
      {...props}
    />
  )
}

export function SelectGroupLabel({
  className,
  ...props
}: PropsWithClassName<BaseSelect.GroupLabel.Props>) {
  return (
    <BaseSelect.GroupLabel
      className={cn("px-md py-sm text-body-xs font-medium text-neutral-500", className)}
      data-slot="select-group-label"
      {...props}
    />
  )
}
