import type { ComponentProps } from "react"

import { Dialog as BaseDialog } from "@base-ui/react/dialog"
import { Icon } from "@iconify/react"
import { cn, tv } from "../../tailwind-variants"

import { type PropsWithClassName } from "../../types"

import { typographyVariants } from "../typography"
import { Button } from "../button/button"
import { ScrollArea } from "../scroll-area/scroll-area"

export const sheetVariants = tv({
  slots: {
    backdrop:
      "fixed inset-0 z-50 bg-on-surface/32 backdrop-blur-sm transition-all duration-200 data-ending-style:opacity-0 data-starting-style:opacity-0",
    close: "absolute inset-e-md top-md",
    description: [typographyVariants({ variant: "body/sm" }), "text-neutral-500"],
    footer: "flex flex-col-reverse gap-md px-4xl sm:flex-row sm:justify-end",
    header:
      "flex flex-col gap-sm p-4xl in-[[data-slot=sheet-popup]:has([data-slot=sheet-panel])]:pb-3xl",
    panel:
      "p-4xl in-[[data-slot=sheet-popup]:has([data-slot=sheet-footer]:not(.border-t))]:pb-xs in-[[data-slot=sheet-popup]:has([data-slot=sheet-header])]:pt-xs",
    popup: [
      "relative flex min-h-0 min-w-0 flex-col bg-clip-padding bg-surface text-neutral-900 opacity-[calc(1-var(--nested-dialogs))] shadow-overlay outline-none transition-[translate,opacity] duration-200 ease-in-out will-change-transform",
      "before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:shadow-hairline before:content-['']",
      "data-ending-style:opacity-0 data-starting-style:opacity-0",
    ],
    title: typographyVariants({ variant: "heading/2" }),
    viewport: "fixed inset-0 z-50 flex",
  },
  defaultVariants: {
    footerVariant: "default",
    popupVariant: "default",
    side: "right",
  },
  variants: {
    footerVariant: {
      default: {
        footer: "border-t border-neutral-200 bg-neutral-50 py-3xl",
      },
      bare: {
        footer: "pt-3xl pb-4xl in-[[data-slot=sheet-popup]:has([data-slot=sheet-panel])]:pt-xl",
      },
    },
    popupVariant: {
      default: {},
      inset: {
        popup: "sm:rounded-overlay sm:border",
        viewport: "sm:p-3xl",
      },
    },
    side: {
      bottom: {
        popup:
          "max-h-[75vh] w-full rounded-t-overlay border-t border-neutral-200 data-ending-style:translate-y-full data-starting-style:translate-y-full",
        viewport: "flex-col justify-end",
      },
      left: {
        popup:
          "h-full w-full max-w-[24rem] rounded-r-overlay border-r border-neutral-200 data-ending-style:-translate-x-full data-starting-style:-translate-x-full",
        viewport: "justify-start",
      },
      right: {
        popup:
          "h-full w-full max-w-[24rem] rounded-l-overlay border-l border-neutral-200 data-ending-style:translate-x-full data-starting-style:translate-x-full",
        viewport: "justify-end",
      },
      top: {
        popup:
          "max-h-[75vh] w-full rounded-b-overlay border-b border-neutral-200 data-ending-style:-translate-y-full data-starting-style:-translate-y-full",
        viewport: "flex-col justify-start",
      },
    },
  },
})

export const Sheet: typeof BaseDialog.Root = BaseDialog.Root

export const SheetPortal: typeof BaseDialog.Portal = BaseDialog.Portal

export function SheetTrigger({ className, ...props }: BaseDialog.Trigger.Props) {
  return <BaseDialog.Trigger className={className} data-slot="sheet-trigger" {...props} />
}

export function SheetClose({ className, ...props }: BaseDialog.Close.Props) {
  return <BaseDialog.Close className={className} data-slot="sheet-close" {...props} />
}

export function SheetBackdrop({ className, ...props }: BaseDialog.Backdrop.Props) {
  const { backdrop } = sheetVariants()

  return (
    <BaseDialog.Backdrop
      className={cn(backdrop(), className)}
      data-slot="sheet-backdrop"
      {...props}
    />
  )
}

export type SheetPopupProps = BaseDialog.Popup.Props & {
  side?: "bottom" | "left" | "right" | "top"
  variant?: "default" | "inset"
  showCloseButton?: boolean
  closeProps?: BaseDialog.Close.Props
  portalProps?: BaseDialog.Portal.Props
}

export function SheetPopup({
  className,
  children,
  side,
  variant = "default",
  showCloseButton = true,
  closeProps,
  portalProps,
  ...props
}: SheetPopupProps) {
  const { backdrop, close, popup, viewport } = sheetVariants({ popupVariant: variant, side })

  return (
    <SheetPortal {...portalProps}>
      <BaseDialog.Backdrop className={backdrop()} data-slot="sheet-backdrop" />
      <BaseDialog.Viewport className={viewport()} data-slot="sheet-viewport">
        <BaseDialog.Popup className={cn(popup(), className)} data-slot="sheet-popup" {...props}>
          {children}
          {showCloseButton && (
            <BaseDialog.Close
              aria-label="Close"
              className={close()}
              render={<Button size="icon" variant="ghost" />}
              {...closeProps}
            >
              <Icon aria-hidden="true" className="size-4xl" icon="mingcute:close-line" />
            </BaseDialog.Close>
          )}
        </BaseDialog.Popup>
      </BaseDialog.Viewport>
    </SheetPortal>
  )
}

export function SheetHeader({ className, ...props }: PropsWithClassName<ComponentProps<"div">>) {
  const { header } = sheetVariants()

  return <div className={header({ className })} data-slot="sheet-header" {...props} />
}

export type SheetFooterProps = PropsWithClassName<ComponentProps<"div">> & {
  variant?: "default" | "bare"
}

export function SheetFooter({ className, variant = "default", ...props }: SheetFooterProps) {
  const { footer } = sheetVariants({ footerVariant: variant })

  return <div className={footer({ className })} data-slot="sheet-footer" {...props} />
}

export function SheetTitle({ className, ...props }: BaseDialog.Title.Props) {
  const { title } = sheetVariants()

  return <BaseDialog.Title className={cn(title(), className)} data-slot="sheet-title" {...props} />
}

export function SheetDescription({ className, ...props }: BaseDialog.Description.Props) {
  const { description } = sheetVariants()

  return (
    <BaseDialog.Description
      className={cn(description(), className)}
      data-slot="sheet-description"
      {...props}
    />
  )
}

export type SheetPanelProps = PropsWithClassName<ComponentProps<"div">> & {
  scrollFade?: boolean
}

export function SheetPanel({ className, scrollFade = true, ...props }: SheetPanelProps) {
  const { panel } = sheetVariants()

  return (
    <ScrollArea overscrollContain scrollFade={scrollFade}>
      <div className={panel({ className })} data-slot="sheet-panel" {...props} />
    </ScrollArea>
  )
}

export { SheetBackdrop as SheetOverlay, SheetPopup as SheetContent }
