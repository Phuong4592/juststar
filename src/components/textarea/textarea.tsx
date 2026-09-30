import type { TextareaHTMLAttributes } from "react"
import type { VariantProps } from "../../tailwind-variants"

import { FieldControl } from "../field/field"
import { tv } from "../../tailwind-variants"

import { type PropsWithClassName } from "../../types"

export const textareaVariants = tv({
  base: "w-full resize-y",
  defaultVariants: {
    size: "md",
    unstyled: false,
  },
  variants: {
    size: {
      lg: "min-h-(--height-control-lg) px-md py-sm text-body-md",
      md: "min-h-(--height-control-md) px-md py-sm text-body-md",
      sm: "min-h-(--height-control-sm) px-md py-2xs text-body-sm",
    },
    unstyled: {
      false: [
        "rounded-control border border-neutral-200 bg-surface text-neutral-900 shadow-surface transition-all",
        "placeholder:text-neutral-400",
        "focus-visible:border-brand-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/24",
        "aria-invalid:border-error-400",
        "aria-invalid:focus-visible:border-error-500 aria-invalid:focus-visible:ring-error-500/16",
        "disabled:cursor-not-allowed disabled:bg-neutral-50 disabled:opacity-64",
      ],
      true: {},
    },
  },
})

export type TextareaProps = PropsWithClassName<
  TextareaHTMLAttributes<HTMLTextAreaElement> & VariantProps<typeof textareaVariants>
>

export function Textarea({ className, size, unstyled, ...props }: TextareaProps) {
  return (
    <FieldControl
      render={
        <textarea
          className={textareaVariants({ className, size, unstyled })}
          data-size={size}
          data-slot="textarea-input"
          {...props}
        />
      }
    />
  )
}
