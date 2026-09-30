import { Popover as BasePopover } from "@base-ui/react/popover"
import { cn, tv } from "../../tailwind-variants"

import { type PropsWithClassName } from "../../types"

import { typographyVariants } from "../typography"

export const popoverVariants = tv({
  slots: {
    close: "cursor-pointer",
    description: [typographyVariants({ variant: "body/sm" }), "text-neutral-500"],
    popup: [
      "relative flex h-(--popup-height,auto) w-(--popup-width,auto) origin-(--transform-origin) rounded-control border border-neutral-200 bg-surface bg-clip-padding text-neutral-900 shadow-overlay transition-[width,height,scale,opacity] outline-none",
      "before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-control)-1px)] before:shadow-hairline",
      "data-starting-style:scale-98 data-starting-style:opacity-0",
    ],
    positioner:
      "z-50 h-(--positioner-height) w-(--positioner-width) max-w-(--available-width) transition-[top,left,right,bottom,transform] data-instant:transition-none",
    title: typographyVariants({ variant: "heading/3" }),
    trigger: "cursor-pointer",
    viewport:
      "relative size-full max-h-(--available-height) overflow-clip px-md not-data-transitioning:overflow-y-auto",
  },
  variants: {
    tooltipStyle: {
      true: {
        popup:
          "w-fit rounded-control text-body-xs text-balance shadow-raised before:rounded-[calc(var(--radius-control)-1px)]",
        viewport: "py-xs",
      },
      false: {
        viewport: "py-md",
      },
    },
  },
})

export const Popover: typeof BasePopover.Root = BasePopover.Root

export const PopoverCreateHandle: typeof BasePopover.createHandle = BasePopover.createHandle

export type PopoverPopupProps = PropsWithClassName<
  BasePopover.Popup.Props & {
    portalProps?: BasePopover.Portal.Props
    side?: BasePopover.Positioner.Props["side"]
    align?: BasePopover.Positioner.Props["align"]
    sideOffset?: BasePopover.Positioner.Props["sideOffset"]
    alignOffset?: BasePopover.Positioner.Props["alignOffset"]
    tooltipStyle?: boolean
    anchor?: BasePopover.Positioner.Props["anchor"]
  }
>

export function PopoverTrigger({
  className,
  ...props
}: PropsWithClassName<BasePopover.Trigger.Props>) {
  const { trigger } = popoverVariants()

  return (
    <BasePopover.Trigger
      className={cn(trigger(), className)}
      data-slot="popover-trigger"
      {...props}
    />
  )
}

export function PopoverPopup({
  children,
  className,
  side = "bottom",
  align = "center",
  sideOffset = 4,
  alignOffset = 0,
  tooltipStyle = false,
  anchor,
  portalProps,
  ...props
}: PopoverPopupProps) {
  const { popup, positioner, viewport } = popoverVariants({ tooltipStyle })

  return (
    <BasePopover.Portal {...portalProps}>
      <BasePopover.Positioner
        align={align}
        alignOffset={alignOffset}
        anchor={anchor}
        className={positioner()}
        data-slot="popover-positioner"
        side={side}
        sideOffset={sideOffset}
      >
        <BasePopover.Popup className={cn(popup(), className)} data-slot="popover-popup" {...props}>
          <BasePopover.Viewport className={viewport()} data-slot="popover-viewport">
            {children}
          </BasePopover.Viewport>
        </BasePopover.Popup>
      </BasePopover.Positioner>
    </BasePopover.Portal>
  )
}

export function PopoverClose({ className, ...props }: PropsWithClassName<BasePopover.Close.Props>) {
  const { close } = popoverVariants()

  return (
    <BasePopover.Close className={cn(close(), className)} data-slot="popover-close" {...props} />
  )
}

export function PopoverTitle({ className, ...props }: PropsWithClassName<BasePopover.Title.Props>) {
  const { title } = popoverVariants()

  return (
    <BasePopover.Title className={cn(title(), className)} data-slot="popover-title" {...props} />
  )
}

export function PopoverDescription({
  className,
  ...props
}: PropsWithClassName<BasePopover.Description.Props>) {
  const { description } = popoverVariants()

  return (
    <BasePopover.Description
      className={cn(description(), className)}
      data-slot="popover-description"
      {...props}
    />
  )
}
