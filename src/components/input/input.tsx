import type { ReactElement } from "react"
import type { VariantProps } from "../../tailwind-variants"

import { Input as BaseInput } from "@base-ui/react/input"
import { Icon } from "@iconify/react"
import { cn, tv } from "../../tailwind-variants"

import { type PropsWithClassName } from "../../types"

export const inputVariants = tv({
  defaultVariants: {
    size: "md",
    unstyled: false,
  },
  slots: {
    icon: "size-3xl shrink-0 text-neutral-400",
    input: "h-full min-w-0 flex-1 bg-transparent outline-none",
    root: "relative flex w-full items-center gap-md",
  },
  variants: {
    size: {
      lg: { root: "h-[36px] text-body-md" },
      md: { root: "h-6xl text-body-md" },
      sm: { root: "h-[28px] text-body-sm" },
    },
    unstyled: {
      false: {
        input: [
          "rounded-[calc(var(--radius-control)-1px)]",
          "placeholder:text-neutral-400",
          "autofill:bg-transparent autofill:shadow-[inset_0_0_0_1000px_var(--input-autofill-bg)]",
          "file:me-md file:h-full file:border-0 file:bg-transparent file:font-medium file:text-neutral-900",
        ],
        root: [
          "[--input-autofill-bg:var(--color-neutral-50)]",
          "rounded-control border border-neutral-200 bg-surface px-md text-neutral-900 transition-all",
          "shadow-surface",
          "has-autofill:bg-(--input-autofill-bg)",
          "has-focus-visible:border-brand-400 has-focus-visible:ring-2 has-focus-visible:ring-brand-500/24",
          "has-aria-invalid:border-error-400",
          "has-aria-invalid:has-focus-visible:border-error-500 has-aria-invalid:has-focus-visible:ring-error-500/16",
          "has-disabled:cursor-not-allowed has-disabled:bg-neutral-50 has-disabled:opacity-64",
        ],
      },
      true: {},
    },
  },
})

export type InputProps = PropsWithClassName<Omit<BaseInput.Props, "prefix" | "size">> &
  VariantProps<typeof inputVariants> & {
    prefix?: string | ReactElement
    suffix?: string | ReactElement
  }

export function Input({ className, size, unstyled, prefix, suffix, type, ...props }: InputProps) {
  const v = inputVariants({ size, unstyled })

  return (
    <div
      className={v.root({
        className: cn(className, type === "file" && "text-neutral-500"),
      })}
      data-size={size}
      data-slot="input-root"
    >
      {typeof prefix === "string" ? (
        <Icon className={v.icon()} data-slot="input-icon" icon={prefix} />
      ) : (
        prefix
      )}
      <BaseInput className={v.input()} data-slot="input-input" type={type} {...props} />
      {typeof suffix === "string" ? (
        <Icon className={v.icon()} data-slot="input-icon" icon={suffix} />
      ) : (
        suffix
      )}
    </div>
  )
}
