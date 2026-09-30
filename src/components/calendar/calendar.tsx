import type {
  ChevronProps,
  ClassNames,
  CustomComponents,
  DayPickerProps,
  RootProps,
} from "@daypicker/react"

import { DayFlag, DayPicker, SelectionState, UI } from "@daypicker/react"
import { Icon } from "@iconify/react"
import { cn } from "../../tailwind-variants"

import { type PropsWithClassName } from "../../types"

const buttonClassNames =
  "relative flex size-(--cell-size) items-center justify-center rounded-control text-body-md text-neutral-900 sm:text-body-sm not-in-data-selected:hover:bg-neutral-100 disabled:pointer-events-none disabled:opacity-64 [&_svg:not([class*='opacity-'])]:opacity-80 [&_svg:not([class*='size-'])]:size-[18px] [&_svg]:pointer-events-none [&_svg]:shrink-0 sm:[&_svg:not([class*='size-'])]:size-3xl"

const dayButtonClassNames = [
  buttonClassNames,
  "in-data-disabled:pointer-events-none",
  "in-data-disabled:line-through",
  "in-data-disabled:text-neutral-600",
  "in-data-outside:text-neutral-600",
  "in-data-selected:bg-brand-500",
  "in-data-selected:text-on-brand",
  "in-data-selected:in-data-outside:text-on-brand",
  "in-[.range-end:not(.range-start)]:rounded-s-none",
  "in-[.range-middle]:rounded-none",
  "in-[.range-middle]:in-data-selected:bg-neutral-100",
  "in-[.range-middle]:in-data-selected:text-neutral-900",
  "in-[.range-start:not(.range-end)]:rounded-e-none",
  "outline-none",
  "focus-visible:z-1",
  "focus-visible:ring-[3px]",
  "focus-visible:ring-brand-500/50",
  "in-[[data-selected]:not(.range-middle)]:transition-[border-radius,box-shadow]",
].join(" ")

const DEFAULT_CLASS_NAMES = [
  [UI.NextMonthButton, buttonClassNames],
  [UI.PreviousMonthButton, buttonClassNames],
  [UI.CaptionLabel, "flex h-full items-center gap-md text-body-md font-medium sm:text-body-sm"],
  [UI.Day, "size-(--cell-size) py-px text-body-sm"],
  [UI.DayButton, dayButtonClassNames],
  [UI.Dropdown, "absolute inset-0 bg-surface opacity-0"],
  [
    UI.DropdownRoot,
    "relative h-[36px] rounded-control border border-neutral-200 px-[calc(var(--space-xl)-1px)] shadow-surface has-focus:border-brand-500 has-focus:ring-[3px] has-focus:ring-brand-500/50 sm:h-6xl [&_svg:not([class*='opacity-'])]:opacity-80 [&_svg:not([class*='size-'])]:size-[18px] [&_svg]:pointer-events-none [&_svg]:-me-(--space-xs) sm:[&_svg:not([class*='size-'])]:size-3xl",
  ],
  [
    UI.Dropdowns,
    "flex h-(--cell-size) w-full items-center justify-center gap-sm text-body-md sm:text-body-sm *:[span]:font-medium",
  ],
  [DayFlag.hidden, "invisible"],
  [UI.Month, "w-full"],
  [
    UI.MonthCaption,
    "relative z-2 mx-(--cell-size) mb-xs flex h-(--cell-size) items-center justify-center px-xs",
  ],
  [UI.MonthGrid, "w-full border-collapse"],
  [UI.Months, "relative flex flex-col gap-md sm:flex-row"],
  [UI.Nav, "absolute top-0 z-1 flex w-full justify-between"],
  [
    DayFlag.outside,
    "text-neutral-600 data-selected:bg-neutral-100/50 data-selected:text-neutral-600",
  ],
  [SelectionState.range_end, "range-end"],
  [SelectionState.range_middle, "range-middle"],
  [SelectionState.range_start, "range-start"],
  [
    DayFlag.today,
    "*:after:pointer-events-none *:after:absolute *:after:bottom-xs *:after:start-1/2 *:after:z-1 *:after:size-[3px] *:after:-translate-x-1/2 *:after:rounded-pill *:after:bg-brand-500 [&[data-selected]:not(.range-middle)>*]:after:bg-surface [&[data-disabled]>*]:after:bg-neutral-900/30",
  ],
  [UI.WeekNumber, "size-(--cell-size) p-0 text-body-xs font-medium text-neutral-600"],
  [UI.Weekday, "size-(--cell-size) p-0 text-body-xs font-medium text-neutral-600"],
] satisfies readonly (readonly [keyof ClassNames, string])[]

function Chevron({ className, orientation, style }: ChevronProps) {
  let icon = "solar:alt-arrow-down-linear"

  if (orientation === "left") {
    icon = "solar:alt-arrow-left-linear"
  } else if (orientation === "right") {
    icon = "solar:alt-arrow-right-linear"
  }

  return (
    <Icon
      aria-hidden="true"
      className={cn(
        className,
        (orientation === "left" || orientation === "right") && "rtl:rotate-180",
      )}
      icon={icon}
      style={style}
    />
  )
}

function CalendarRoot({ rootRef, ...props }: RootProps) {
  return <div data-slot="calendar" ref={rootRef} {...props} />
}

export type CalendarProps = PropsWithClassName<DayPickerProps>

export function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  components: userComponents,
  ...props
}: CalendarProps) {
  const mergedClassNames: Partial<ClassNames> = { ...classNames }

  for (const [slot, base] of DEFAULT_CLASS_NAMES) {
    mergedClassNames[slot] = cn(base, classNames?.[slot]) ?? base
  }

  const mergedComponents: Partial<CustomComponents> = {
    Chevron,
    Root: CalendarRoot,
    ...userComponents,
  }

  return (
    <DayPicker
      className={cn("w-fit [--cell-size:40px] sm:[--cell-size:36px]", className)}
      classNames={mergedClassNames}
      components={mergedComponents}
      showOutsideDays={showOutsideDays}
      {...props}
    />
  )
}
