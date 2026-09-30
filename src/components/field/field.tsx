import { Field as BaseField } from "@base-ui/react/field"
import { cn, tv } from "../../tailwind-variants"

import { type PropsWithClassName } from "../../types"

export const fieldVariants = tv({
  slots: {
    root: "flex flex-col items-start gap-md",
    label:
      "inline-flex items-center gap-md text-body-lg/4.5 font-medium text-neutral-900 data-disabled:opacity-64 sm:text-body-sm/4",
    item: "flex",
    description: "text-body-sm text-neutral-500",
    error: "text-body-sm text-error-600",
  },
})

export type FieldProps = PropsWithClassName<BaseField.Root.Props>
export type FieldLabelProps = PropsWithClassName<BaseField.Label.Props>
export type FieldItemProps = PropsWithClassName<BaseField.Item.Props>
export type FieldDescriptionProps = PropsWithClassName<BaseField.Description.Props>
export type FieldErrorProps = PropsWithClassName<BaseField.Error.Props>

export function Field({ className, ...props }: FieldProps) {
  const { root } = fieldVariants()

  return <BaseField.Root className={cn(root(), className)} data-slot="field-root" {...props} />
}

export function FieldLabel({ className, ...props }: FieldLabelProps) {
  const { label } = fieldVariants()

  return <BaseField.Label className={cn(label(), className)} data-slot="field-label" {...props} />
}

export function FieldItem({ className, ...props }: FieldItemProps) {
  const { item } = fieldVariants()

  return <BaseField.Item className={cn(item(), className)} data-slot="field-item" {...props} />
}

export function FieldDescription({ className, ...props }: FieldDescriptionProps) {
  const { description } = fieldVariants()

  return (
    <BaseField.Description
      className={cn(description(), className)}
      data-slot="field-description"
      {...props}
    />
  )
}

export function FieldError({ className, ...props }: FieldErrorProps) {
  const { error } = fieldVariants()

  return <BaseField.Error className={cn(error(), className)} data-slot="field-error" {...props} />
}

export const FieldControl = BaseField.Control
export const FieldValidity = BaseField.Validity
