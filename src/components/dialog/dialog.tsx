import type { ComponentProps } from "react"

import { Dialog as BaseDialog } from "@base-ui/react/dialog"
import { Icon } from "@iconify/react"
import { cn, tv } from "../../tailwind-variants"

import { type PropsWithClassName } from "../../types"

import { typographyVariants } from "../typography"
import { Button } from "../button/button"
import { ScrollArea } from "../scroll-area/scroll-area"

export const dialogVariants = tv({
  slots: {
    backdrop:
      "fixed inset-0 z-50 bg-on-surface/32 backdrop-blur-sm transition-all duration-200 data-ending-style:opacity-0 data-starting-style:opacity-0",
    close: "absolute inset-e-md top-md",
    description: [typographyVariants({ variant: "body/sm" }), "text-neutral-500"],
    footer:
      "flex flex-col-reverse gap-md px-4xl sm:flex-row sm:justify-end sm:rounded-b-[calc(var(--radius-overlay)-1px)]",
    header:
      "flex flex-col gap-sm p-4xl in-[[data-slot=dialog-popup]:has([data-slot=dialog-panel])]:pb-3xl max-sm:pb-3xl",
    panel:
      "p-4xl in-[[data-slot=dialog-popup]:has([data-slot=dialog-footer]:not(.border-t))]:pb-xs in-[[data-slot=dialog-popup]:has([data-slot=dialog-header])]:pt-xs",
    popup: [
      "relative row-start-2 flex max-h-full min-h-0 w-full max-w-[32rem] min-w-0 origin-center flex-col rounded-overlay border border-neutral-200 bg-surface bg-clip-padding text-neutral-900 opacity-[calc(1-var(--nested-dialogs))] shadow-overlay transition-[scale,opacity,translate] duration-200 ease-in-out will-change-transform outline-none",
      "before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-overlay)-1px)] before:shadow-hairline",
      "data-ending-style:opacity-0 data-starting-style:opacity-0 sm:scale-[calc(1-0.1*var(--nested-dialogs))] sm:data-ending-style:scale-98 sm:data-starting-style:scale-98",
    ],
    title: typographyVariants({ variant: "heading/2" }),
    viewport: "fixed inset-0 z-50 grid grid-rows-[1fr_auto_3fr] justify-items-center p-3xl",
  },
  defaultVariants: {
    bottomStickOnMobile: true,
    footerVariant: "default",
  },
  variants: {
    bottomStickOnMobile: {
      true: {
        viewport: "max-sm:grid-rows-[1fr_auto] max-sm:p-0 max-sm:pt-[3rem]",
        popup:
          "max-sm:max-w-none max-sm:origin-bottom max-sm:rounded-none max-sm:border-x-0 max-sm:border-t max-sm:border-b-0 max-sm:before:hidden max-sm:before:rounded-none max-sm:data-ending-style:translate-y-3xl max-sm:data-starting-style:translate-y-3xl",
      },
    },
    footerVariant: {
      default: {
        footer: "border-t border-neutral-200 bg-neutral-50 py-3xl",
      },
      bare: {
        footer: "pt-3xl pb-4xl in-[[data-slot=dialog-popup]:has([data-slot=dialog-panel])]:pt-xl",
      },
    },
  },
})

export const Dialog: typeof BaseDialog.Root = BaseDialog.Root

export const DialogCreateHandle: typeof BaseDialog.createHandle = BaseDialog.createHandle

export const DialogPortal: typeof BaseDialog.Portal = BaseDialog.Portal

export function DialogTrigger({ className, ...props }: BaseDialog.Trigger.Props) {
  return <BaseDialog.Trigger className={className} data-slot="dialog-trigger" {...props} />
}

export function DialogClose({ className, ...props }: BaseDialog.Close.Props) {
  return <BaseDialog.Close className={className} data-slot="dialog-close" {...props} />
}

export function DialogBackdrop({ className, ...props }: BaseDialog.Backdrop.Props) {
  const { backdrop } = dialogVariants()

  return (
    <BaseDialog.Backdrop
      className={cn(backdrop(), className)}
      data-slot="dialog-backdrop"
      {...props}
    />
  )
}

export function DialogViewport({ className, ...props }: BaseDialog.Viewport.Props) {
  const { viewport } = dialogVariants()

  return (
    <BaseDialog.Viewport
      className={cn(viewport(), className)}
      data-slot="dialog-viewport"
      {...props}
    />
  )
}

export type DialogPopupProps = BaseDialog.Popup.Props & {
  showCloseButton?: boolean
  bottomStickOnMobile?: boolean
  closeProps?: BaseDialog.Close.Props
  portalProps?: BaseDialog.Portal.Props
}

export function DialogPopup({
  className,
  children,
  showCloseButton = true,
  bottomStickOnMobile = true,
  closeProps,
  portalProps,
  ...props
}: DialogPopupProps) {
  const { backdrop, close, popup, viewport } = dialogVariants({ bottomStickOnMobile })

  return (
    <DialogPortal {...portalProps}>
      <BaseDialog.Backdrop className={backdrop()} data-slot="dialog-backdrop" />
      <BaseDialog.Viewport className={viewport()} data-slot="dialog-viewport">
        <BaseDialog.Popup className={cn(popup(), className)} data-slot="dialog-popup" {...props}>
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
    </DialogPortal>
  )
}

export function DialogHeader({ className, ...props }: PropsWithClassName<ComponentProps<"div">>) {
  const { header } = dialogVariants()

  return <div className={header({ className })} data-slot="dialog-header" {...props} />
}

export type DialogFooterProps = PropsWithClassName<ComponentProps<"div">> & {
  variant?: "default" | "bare"
}

export function DialogFooter({ className, variant = "default", ...props }: DialogFooterProps) {
  const { footer } = dialogVariants({ footerVariant: variant })

  return <div className={footer({ className })} data-slot="dialog-footer" {...props} />
}

export function DialogTitle({ className, ...props }: BaseDialog.Title.Props) {
  const { title } = dialogVariants()

  return <BaseDialog.Title className={cn(title(), className)} data-slot="dialog-title" {...props} />
}

export function DialogDescription({ className, ...props }: BaseDialog.Description.Props) {
  const { description } = dialogVariants()

  return (
    <BaseDialog.Description
      className={cn(description(), className)}
      data-slot="dialog-description"
      {...props}
    />
  )
}

export type DialogPanelProps = PropsWithClassName<ComponentProps<"div">> & {
  scrollFade?: boolean
}

export function DialogPanel({ className, scrollFade = true, ...props }: DialogPanelProps) {
  const { panel } = dialogVariants()

  return (
    <ScrollArea overscrollContain scrollFade={scrollFade}>
      <div className={panel({ className })} data-slot="dialog-panel" {...props} />
    </ScrollArea>
  )
}

export { DialogBackdrop as DialogOverlay, DialogPopup as DialogContent }
