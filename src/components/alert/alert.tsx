import type { ComponentProps } from "react"
import type { VariantProps } from "../../tailwind-variants"

import { createContext, useContext } from "react"
import { tv } from "../../tailwind-variants"

import { type PropsWithClassName } from "../../types"

export const alertVariants = tv({
  defaultVariants: {
    variant: "default",
  },
  slots: {
    action: [
      "flex flex-wrap items-center gap-sm",
      "col-start-2 row-start-1 row-end-3 self-center justify-self-end max-sm:justify-self-stretch",
      "[svg~&]:col-start-3 max-sm:[svg~&]:col-start-2",
      "max-sm:row-auto max-sm:col-start-2 max-sm:mt-md",
    ],
    description: "text-body-sm [svg~&]:col-start-2",
    root: [
      "relative grid w-full items-start gap-x-md gap-y-xs rounded-surface border p-lg text-body-sm",
      "has-[>svg]:gap-x-md",
      "[&>svg:not([class*='size-'])]:size-3xl [&>svg]:row-start-1 [&>svg]:col-start-1 [&>svg]:self-center [&>svg]:justify-self-start",
      "grid-cols-[1fr]",
      "has-[>svg]:grid-cols-[auto_1fr]",
      "has-data-[slot=alert-action]:grid-cols-[1fr_auto]",
      "has-[>svg]:has-data-[slot=alert-action]:grid-cols-[auto_1fr_auto]",
    ],
    title: "text-body-sm font-medium [svg~&]:col-start-2",
  },
  variants: {
    variant: {
      default: {
        description: "text-neutral-600",
        root: "border-neutral-200 bg-surface text-neutral-900",
      },
      error: {
        description: "text-error-800",
        root: "border-error-200 bg-error-25 text-error-900",
      },
      info: {
        description: "text-info-800",
        root: "border-info-200 bg-info-25 text-info-900",
      },
      success: {
        description: "text-success-800",
        root: "border-success-200 bg-success-25 text-success-900",
      },
      warning: {
        description: "text-warning-800",
        root: "border-warning-200 bg-warning-25 text-warning-900",
      },
    },
  },
})

export type AlertProps = PropsWithClassName<
  ComponentProps<"div"> & VariantProps<typeof alertVariants>
>

export type AlertTitleProps = PropsWithClassName<ComponentProps<"div">>

export type AlertDescriptionProps = PropsWithClassName<ComponentProps<"div">>

export type AlertActionProps = PropsWithClassName<ComponentProps<"div">>

type AlertContextValue = { variant?: VariantProps<typeof alertVariants>["variant"] }

const AlertContext = createContext<AlertContextValue>({})

export function Alert({ className, variant, ...props }: AlertProps) {
  const v = alertVariants({ variant })

  return (
    <AlertContext value={{ variant }}>
      <div role="alert" data-slot="alert" className={v.root({ className })} {...props} />
    </AlertContext>
  )
}

export function AlertTitle({ className, ...props }: AlertTitleProps) {
  return <div data-slot="alert-title" className={alertVariants().title({ className })} {...props} />
}

export function AlertDescription({ className, ...props }: AlertDescriptionProps) {
  const { variant } = useContext(AlertContext)

  return (
    <div
      data-slot="alert-description"
      className={alertVariants({ variant }).description({ className })}
      {...props}
    />
  )
}

export function AlertAction({ className, ...props }: AlertActionProps) {
  return (
    <div data-slot="alert-action" className={alertVariants().action({ className })} {...props} />
  )
}
