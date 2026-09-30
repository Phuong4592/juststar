import type { ComponentProps } from "react"
import type { VariantProps } from "../../tailwind-variants"

import { Checkbox as BaseCheckbox } from "@base-ui/react/checkbox"
import { CheckboxGroup as BaseCheckboxGroup } from "@base-ui/react/checkbox-group"
import { Icon } from "@iconify/react"
import { tv } from "../../tailwind-variants"

import { type PropsWithClassName } from "../../types"

export const checkboxVariants = tv({
  slots: {
    group: "flex flex-col items-start gap-xl",
    indicator:
      "absolute -inset-px flex items-center justify-center rounded-control text-on-brand data-checked:bg-brand-500 data-indeterminate:text-neutral-900 data-unchecked:hidden",
    root: [
      "relative inline-flex size-[18px] shrink-0 cursor-pointer items-center justify-center rounded-control border border-neutral-300 bg-surface transition-shadow outline-none",
      "shadow-surface before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-control)-3px)]",
      "not-data-disabled:not-data-checked:not-aria-invalid:before:shadow-hairline",
      "focus-visible:ring-2 focus-visible:ring-brand-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-25",
      "aria-invalid:border-error-400 focus-visible:aria-invalid:border-error-500 focus-visible:aria-invalid:ring-error-500/16",
      "data-checked:border-brand-500 data-disabled:cursor-not-allowed data-disabled:opacity-64",
    ],
  },
})

export type CheckboxProps = PropsWithClassName<BaseCheckbox.Root.Props> &
  VariantProps<typeof checkboxVariants>

export type CheckboxGroupProps = PropsWithClassName<BaseCheckboxGroup.Props>

function renderIndicator(props: ComponentProps<"span">, state: BaseCheckbox.Indicator.State) {
  return (
    <span {...props}>
      {state.indeterminate ? <Icon icon="tabler:minus" /> : <Icon icon="tabler:check-filled" />}
    </span>
  )
}

export function Checkbox({ className, ...props }: CheckboxProps) {
  const v = checkboxVariants()

  return (
    <BaseCheckbox.Root className={v.root({ className })} data-slot="checkbox" {...props}>
      <BaseCheckbox.Indicator
        className={v.indicator()}
        data-slot="checkbox-indicator"
        render={renderIndicator}
      />
    </BaseCheckbox.Root>
  )
}

function CheckboxGroup({ className, ...props }: CheckboxGroupProps) {
  const v = checkboxVariants()

  return (
    <BaseCheckboxGroup className={v.group({ className })} data-slot="checkbox-group" {...props} />
  )
}

Checkbox.Group = CheckboxGroup
