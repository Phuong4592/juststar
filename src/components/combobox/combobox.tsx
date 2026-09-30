import type { ReactNode, Ref, RefObject } from "react"

import { Combobox as BaseCombobox } from "@base-ui/react/combobox"
import { Icon } from "@iconify/react"
import { createContext, useContext, useRef } from "react"
import { cn, tv } from "../../tailwind-variants"

import { ScrollArea } from "../scroll-area/scroll-area"
import { type PropsWithClassName } from "../../types"

type ComboboxSize = "sm" | "md" | "lg"

const ComboboxContext = createContext<RefObject<HTMLDivElement | null>>({
  current: null,
})

export const comboboxVariants = tv({
  compoundSlots: [
    { class: "ps-[28px]", size: "sm", slots: ["input"], startAddon: true },
    { class: "pe-[28px]", endAction: true, size: "sm", slots: ["input"] },
  ],
  defaultVariants: { size: "md" },
  slots: {
    actionButton: [
      "absolute top-1/2 inline-flex size-6xl shrink-0 -translate-y-1/2 cursor-pointer items-center justify-center rounded-control border border-transparent opacity-80 transition-opacity outline-none hover:opacity-100",
      "has-[+[data-slot=combobox-clear]]:hidden",
      "pointer-coarse:after:absolute pointer-coarse:after:min-h-[44px] pointer-coarse:after:min-w-[44px]",
      "sm:size-[28px]",
    ],
    chipsInput:
      "min-w-[48px] flex-1 bg-transparent text-body-md text-neutral-900 outline-none placeholder:text-neutral-400 sm:text-body-sm [[data-slot=combobox-chip]+&]:ps-2xs",
    icon: "size-[18px] sm:size-3xl",
    input: [
      "w-full rounded-control border border-neutral-200 bg-surface bg-clip-padding text-body-md text-neutral-900 shadow-surface transition-all outline-none",
      "placeholder:text-neutral-400",
      "focus-visible:border-brand-400 focus-visible:ring-2 focus-visible:ring-brand-500/24",
      "aria-invalid:border-error-400 focus-visible:aria-invalid:border-error-500 focus-visible:aria-invalid:ring-error-500/16",
      "disabled:pointer-events-none disabled:bg-neutral-50",
      "sm:text-body-sm",
    ],
    inputStartAddon:
      "pointer-events-none absolute inset-y-0 inset-s-0 z-10 flex items-center opacity-80",
  },
  variants: {
    endAction: { true: { input: "pe-6xl" } },
    size: {
      lg: {
        actionButton: "inset-e-2xs",
        chipsInput: "ps-md",
        input: "h-[40px] ps-xl sm:h-[36px]",
        inputStartAddon: "ps-lg",
      },
      md: {
        actionButton: "inset-e-2xs",
        chipsInput: "ps-md",
        input: "h-[36px] ps-xl sm:h-6xl",
        inputStartAddon: "ps-lg",
      },
      sm: {
        actionButton: "inset-e-0",
        chipsInput: "ps-sm",
        input: "h-6xl ps-lg sm:h-[28px]",
        inputStartAddon: "ps-md",
      },
    },
    startAddon: { true: { input: "ps-[36px]" } },
  },
})

export function Combobox<Value, Multiple extends boolean | undefined = false>(
  props: BaseCombobox.Root.Props<Value, Multiple>,
) {
  const chipsRef = useRef<HTMLDivElement | null>(null)

  return (
    <ComboboxContext.Provider value={chipsRef}>
      <BaseCombobox.Root {...props} />
    </ComboboxContext.Provider>
  )
}

export type ComboboxChipsInputProps = PropsWithClassName<Omit<BaseCombobox.Input.Props, "size">> & {
  size?: ComboboxSize | number
  ref?: Ref<HTMLInputElement>
}

export function ComboboxChipsInput({ className, size, ...props }: ComboboxChipsInputProps) {
  const v = comboboxVariants({ size: typeof size === "string" ? size : undefined })

  return (
    <BaseCombobox.Input
      className={v.chipsInput({ className })}
      data-size={typeof size === "string" ? size : undefined}
      data-slot="combobox-chips-input"
      size={typeof size === "number" ? size : undefined}
      {...props}
    />
  )
}

export function ComboboxTrigger({
  className,
  children,
  "aria-label": ariaLabel,
  ...props
}: BaseCombobox.Trigger.Props) {
  return (
    <BaseCombobox.Trigger
      aria-label={ariaLabel ?? "Open options"}
      className={className}
      data-slot="combobox-trigger"
      {...props}
    >
      {children}
    </BaseCombobox.Trigger>
  )
}

export function ComboboxClear({
  className,
  "aria-label": ariaLabel,
  ...props
}: BaseCombobox.Clear.Props) {
  return (
    <BaseCombobox.Clear
      aria-label={ariaLabel ?? "Clear selection"}
      className={className}
      data-slot="combobox-clear"
      {...props}
    />
  )
}

export type ComboboxInputProps = PropsWithClassName<Omit<BaseCombobox.Input.Props, "size">> & {
  showTrigger?: boolean
  showClear?: boolean
  startAddon?: ReactNode
  size?: ComboboxSize | number
  ref?: Ref<HTMLInputElement>
  triggerProps?: BaseCombobox.Trigger.Props
  clearProps?: BaseCombobox.Clear.Props
}

export function ComboboxInput({
  className,
  showTrigger = true,
  showClear = false,
  startAddon,
  size,
  triggerProps,
  clearProps,
  ...props
}: ComboboxInputProps) {
  const v = comboboxVariants({
    endAction: showTrigger || showClear,
    size: typeof size === "string" ? size : undefined,
    startAddon: Boolean(startAddon),
  })

  return (
    <BaseCombobox.InputGroup
      className="relative w-full text-neutral-900 has-disabled:opacity-64"
      data-slot="combobox-input-group"
    >
      {startAddon && (
        <div aria-hidden="true" className={v.inputStartAddon()} data-slot="combobox-start-addon">
          {typeof startAddon === "string" ? (
            <Icon className={v.icon()} icon={startAddon} />
          ) : (
            startAddon
          )}
        </div>
      )}
      <BaseCombobox.Input
        className={v.input({ className })}
        data-size={typeof size === "string" ? size : undefined}
        data-slot="combobox-input"
        size={typeof size === "number" ? size : undefined}
        {...props}
      />
      {showTrigger && (
        <ComboboxTrigger
          aria-label="Open options"
          {...triggerProps}
          className={v.actionButton({
            className:
              typeof triggerProps?.className === "string" ? triggerProps.className : undefined,
          })}
        >
          <BaseCombobox.Icon data-slot="combobox-icon">
            <Icon aria-hidden="true" className={v.icon()} icon="ph:caret-up-down-bold" />
          </BaseCombobox.Icon>
        </ComboboxTrigger>
      )}
      {showClear && (
        <ComboboxClear
          aria-label="Clear selection"
          {...clearProps}
          className={v.actionButton({
            className: typeof clearProps?.className === "string" ? clearProps.className : undefined,
          })}
        >
          <Icon aria-hidden="true" className={v.icon()} icon="mingcute:close-line" />
        </ComboboxClear>
      )}
    </BaseCombobox.InputGroup>
  )
}

export type ComboboxPopupProps = PropsWithClassName<BaseCombobox.Popup.Props> & {
  side?: BaseCombobox.Positioner.Props["side"]
  align?: BaseCombobox.Positioner.Props["align"]
  sideOffset?: BaseCombobox.Positioner.Props["sideOffset"]
  alignOffset?: BaseCombobox.Positioner.Props["alignOffset"]
  anchor?: BaseCombobox.Positioner.Props["anchor"]
  portalProps?: BaseCombobox.Portal.Props
}

export function ComboboxPopup({
  className,
  children,
  side = "bottom",
  sideOffset = 4,
  align = "start",
  alignOffset,
  anchor: anchorProp,
  portalProps,
  ...props
}: ComboboxPopupProps) {
  const chipsRef = useContext(ComboboxContext)
  const anchor = anchorProp ?? chipsRef

  return (
    <BaseCombobox.Portal {...portalProps}>
      <BaseCombobox.Positioner
        align={align}
        alignOffset={alignOffset}
        anchor={anchor}
        className="z-50 select-none"
        data-slot="combobox-positioner"
        side={side}
        sideOffset={sideOffset}
      >
        <span
          className={cn(
            "relative flex max-h-full max-w-(--available-width) min-w-(--anchor-width) origin-(--transform-origin) rounded-control border border-neutral-200 bg-surface bg-clip-padding shadow-overlay transition-[scale,opacity]",
            "before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-control)-1px)] before:shadow-hairline",
            className,
          )}
        >
          <BaseCombobox.Popup
            className="flex max-h-[min(var(--available-height),23rem)] flex-1 flex-col text-neutral-900 outline-none"
            data-slot="combobox-popup"
            {...props}
          >
            {children}
          </BaseCombobox.Popup>
        </span>
      </BaseCombobox.Positioner>
    </BaseCombobox.Portal>
  )
}

export function ComboboxItem({
  className,
  children,
  ...props
}: PropsWithClassName<BaseCombobox.Item.Props>) {
  return (
    <BaseCombobox.Item
      className={cn(
        "grid min-h-6xl cursor-default grid-cols-[1rem_1fr] items-center gap-md rounded-control py-xs ps-md pe-3xl text-body-md outline-none",
        "in-data-[side=none]:min-w-[calc(var(--anchor-width)+1.25rem)]",
        "data-disabled:pointer-events-none data-disabled:opacity-64 data-highlighted:bg-neutral-100 data-highlighted:text-neutral-900",
        "sm:min-h-[28px] sm:text-body-sm",
        className,
      )}
      data-slot="combobox-item"
      {...props}
    >
      <BaseCombobox.ItemIndicator className="col-start-1">
        <Icon aria-hidden="true" icon="mingcute:check-line" />
      </BaseCombobox.ItemIndicator>
      <div className="col-start-2 min-w-0">{children}</div>
    </BaseCombobox.Item>
  )
}

export function ComboboxSeparator({
  className,
  ...props
}: PropsWithClassName<BaseCombobox.Separator.Props>) {
  return (
    <BaseCombobox.Separator
      className={cn("mx-md my-xs h-px bg-neutral-200 last:hidden", className)}
      data-slot="combobox-separator"
      {...props}
    />
  )
}

export function ComboboxGroup({
  className,
  ...props
}: PropsWithClassName<BaseCombobox.Group.Props>) {
  return (
    <BaseCombobox.Group
      className={cn("[[role=group]+&]:mt-sm", className)}
      data-slot="combobox-group"
      {...props}
    />
  )
}

export function ComboboxGroupLabel({
  className,
  ...props
}: PropsWithClassName<BaseCombobox.GroupLabel.Props>) {
  return (
    <BaseCombobox.GroupLabel
      className={cn("px-md py-sm text-body-xs font-medium text-neutral-500", className)}
      data-slot="combobox-group-label"
      {...props}
    />
  )
}

export function ComboboxEmpty({
  className,
  ...props
}: PropsWithClassName<BaseCombobox.Empty.Props>) {
  return (
    <BaseCombobox.Empty
      className={cn(
        "text-center text-body-md text-neutral-500 not-empty:p-md sm:text-body-sm",
        className,
      )}
      data-slot="combobox-empty"
      {...props}
    />
  )
}

export function ComboboxRow({ className, ...props }: BaseCombobox.Row.Props) {
  return <BaseCombobox.Row className={className} data-slot="combobox-row" {...props} />
}

export function ComboboxStatus({
  className,
  ...props
}: PropsWithClassName<BaseCombobox.Status.Props>) {
  return (
    <BaseCombobox.Status
      className={cn(
        "px-xl py-md text-body-xs font-medium text-neutral-500 empty:m-0 empty:p-0",
        className,
      )}
      data-slot="combobox-status"
      {...props}
    />
  )
}

export function ComboboxList({ className, ...props }: PropsWithClassName<BaseCombobox.List.Props>) {
  return (
    <ScrollArea overscrollContain scrollFade scrollbarGutter>
      <BaseCombobox.List
        className={cn(
          "not-empty:scroll-py-xs not-empty:px-xs not-empty:py-xs in-data-has-overflow-y:pe-xl",
          className,
        )}
        data-slot="combobox-list"
        {...props}
      />
    </ScrollArea>
  )
}

export function ComboboxChipRemove({ className, ...props }: BaseCombobox.ChipRemove.Props) {
  return (
    <BaseCombobox.ChipRemove
      aria-label="Remove"
      className={cn("h-full shrink-0 cursor-pointer px-sm opacity-80 hover:opacity-100", className)}
      data-slot="combobox-chip-remove"
      {...props}
    >
      <Icon aria-hidden="true" className="size-3xl" icon="mingcute:close-line" />
    </BaseCombobox.ChipRemove>
  )
}

export type ComboboxChipProps = PropsWithClassName<BaseCombobox.Chip.Props> & {
  removeProps?: BaseCombobox.ChipRemove.Props
}

export function ComboboxChip({ children, removeProps, ...props }: ComboboxChipProps) {
  return (
    <BaseCombobox.Chip
      className="flex items-center rounded-[calc(var(--radius-control)-1px)] bg-neutral-100 ps-md text-body-sm font-medium text-neutral-900 outline-none"
      data-slot="combobox-chip"
      {...props}
    >
      {children}
      <ComboboxChipRemove {...removeProps} />
    </BaseCombobox.Chip>
  )
}

export type ComboboxChipsProps = PropsWithClassName<BaseCombobox.Chips.Props> & {
  startAddon?: ReactNode
}

export function ComboboxChips({ className, children, startAddon, ...props }: ComboboxChipsProps) {
  const chipsRef = useContext(ComboboxContext)
  const v = comboboxVariants()

  return (
    <BaseCombobox.Chips
      className={cn(
        "relative inline-flex min-h-[36px] w-full flex-wrap gap-xs rounded-control border border-neutral-200 bg-surface bg-clip-padding p-[calc(var(--space-xs)-1px)] text-body-md text-neutral-900 shadow-surface transition-shadow outline-none *:min-h-[28px]",
        "before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-control)-1px)] before:shadow-hairline",
        "focus-within:border-brand-400 focus-within:ring-2 focus-within:ring-brand-500/24",
        "has-aria-invalid:border-error-400 focus-within:has-aria-invalid:border-error-500 focus-within:has-aria-invalid:ring-error-500/16",
        "has-disabled:pointer-events-none has-disabled:cursor-not-allowed has-disabled:bg-neutral-50 has-disabled:opacity-64",
        "has-data-[size=lg]:min-h-[40px] has-data-[size=lg]:*:min-h-6xl has-data-[size=sm]:min-h-6xl has-data-[size=sm]:*:min-h-5xl",
        "sm:min-h-6xl sm:text-body-sm sm:*:min-h-5xl sm:has-data-[size=lg]:min-h-[36px] sm:has-data-[size=lg]:*:min-h-[28px] sm:has-data-[size=sm]:min-h-[28px] sm:has-data-[size=sm]:*:min-h-4xl",
        className,
      )}
      data-slot="combobox-chips"
      ref={chipsRef}
      {...props}
    >
      {startAddon && (
        <div
          aria-hidden="true"
          className="flex shrink-0 items-center ps-md opacity-80 has-[+[data-slot=combobox-chip]]:pe-md has-[~[data-size=sm]]:ps-sm"
          data-slot="combobox-start-addon"
        >
          {typeof startAddon === "string" ? (
            <Icon className={v.icon()} icon={startAddon} />
          ) : (
            startAddon
          )}
        </div>
      )}
      {children}
    </BaseCombobox.Chips>
  )
}

export const ComboboxValue: typeof BaseCombobox.Value = BaseCombobox.Value
export const ComboboxCollection: typeof BaseCombobox.Collection = BaseCombobox.Collection
export const useComboboxFilter: typeof BaseCombobox.useFilter = BaseCombobox.useFilter
