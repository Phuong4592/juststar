import type { ReactNode } from "react"

import { Tooltip as BaseTooltip } from "@base-ui/react/tooltip"
import { isValidElement } from "react"
import { tv } from "../../tailwind-variants"

import { type PropsWithClassName } from "../../types"

export const tooltipVariants = tv({
  slots: {
    popup: [
      "relative flex h-(--popup-height,auto) w-(--popup-width,auto) origin-(--transform-origin) rounded-control border border-neutral-200 bg-surface bg-clip-padding px-md py-xs text-body-sm text-balance text-neutral-900 shadow-raised",
      "transition-[width,height,scale,opacity] before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-control)-1px)] before:shadow-hairline",
      "data-ending-style:scale-98 data-ending-style:opacity-0 data-instant:duration-0 data-starting-style:scale-98 data-starting-style:opacity-0",
    ],
    positioner:
      "z-50 h-(--positioner-height) w-(--positioner-width) max-w-(--available-width) transition-[top,left,right,bottom,transform] data-instant:transition-none",
    viewport: "relative size-full overflow-clip",
  },
})

export type TooltipProps = {
  trigger: ReactNode
  popup: ReactNode
  classNames?: {
    popup?: string
    positioner?: string
  }
} & Pick<BaseTooltip.Positioner.Props, "align" | "side" | "sideOffset" | "anchor">

export function Tooltip({
  trigger,
  popup,
  align = "center",
  sideOffset = 4,
  side = "top",
  anchor,
  classNames,
}: TooltipProps) {
  const v = tooltipVariants()
  const triggerElement = isValidElement(trigger) ? trigger : undefined

  return (
    <BaseTooltip.Root>
      <BaseTooltip.Trigger data-slot="tooltip-trigger" render={triggerElement}>
        {triggerElement ? undefined : trigger}
      </BaseTooltip.Trigger>

      <BaseTooltip.Portal>
        <BaseTooltip.Positioner
          align={align}
          anchor={anchor}
          className={v.positioner({ className: classNames?.positioner })}
          data-slot="tooltip-positioner"
          side={side}
          sideOffset={sideOffset}
        >
          <BaseTooltip.Popup
            className={v.popup({ className: classNames?.popup })}
            data-slot="tooltip-popup"
          >
            <BaseTooltip.Viewport className={v.viewport()} data-slot="tooltip-viewport">
              {popup}
            </BaseTooltip.Viewport>
          </BaseTooltip.Popup>
        </BaseTooltip.Positioner>
      </BaseTooltip.Portal>
    </BaseTooltip.Root>
  )
}

export const TooltipProvider: typeof BaseTooltip.Provider = BaseTooltip.Provider

export const TooltipRoot: typeof BaseTooltip.Root = BaseTooltip.Root

export const TooltipCreateHandle: typeof BaseTooltip.createHandle = BaseTooltip.createHandle

export type TooltipTriggerProps = PropsWithClassName<BaseTooltip.Trigger.Props>

export function TooltipTrigger({ className, ...props }: TooltipTriggerProps) {
  return <BaseTooltip.Trigger className={className} data-slot="tooltip-trigger" {...props} />
}

export type TooltipPopupProps = PropsWithClassName<
  BaseTooltip.Popup.Props & {
    classNames?: {
      positioner?: string
    }
    side?: BaseTooltip.Positioner.Props["side"]
    align?: BaseTooltip.Positioner.Props["align"]
    sideOffset?: BaseTooltip.Positioner.Props["sideOffset"]
    anchor?: BaseTooltip.Positioner.Props["anchor"]
    portalProps?: BaseTooltip.Portal.Props
  }
>

export function TooltipPopup({
  align = "center",
  anchor,
  children,
  className,
  classNames,
  portalProps,
  side = "top",
  sideOffset = 4,
  ...props
}: TooltipPopupProps) {
  const v = tooltipVariants()

  return (
    <BaseTooltip.Portal {...portalProps}>
      <BaseTooltip.Positioner
        align={align}
        anchor={anchor}
        className={v.positioner({ className: classNames?.positioner })}
        data-slot="tooltip-positioner"
        side={side}
        sideOffset={sideOffset}
      >
        <BaseTooltip.Popup className={v.popup({ className })} data-slot="tooltip-popup" {...props}>
          <BaseTooltip.Viewport className={v.viewport()} data-slot="tooltip-viewport">
            {children}
          </BaseTooltip.Viewport>
        </BaseTooltip.Popup>
      </BaseTooltip.Positioner>
    </BaseTooltip.Portal>
  )
}
