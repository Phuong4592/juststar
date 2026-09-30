import type { VariantProps } from "../../tailwind-variants"

import { ScrollArea as BaseScrollArea } from "@base-ui/react/scroll-area"
import { tv } from "../../tailwind-variants"

type PropsWithClassName<T> = Omit<T, "className"> & { className?: string }

export const scrollAreaVariants = tv({
  slots: {
    content: "",
    corner: "bg-transparent",
    root: "size-full min-h-0",
    scrollbar: [
      "m-xs flex opacity-0 transition-opacity delay-300 motion-reduce:transition-none",
      "data-[orientation=horizontal]:h-xs data-[orientation=horizontal]:flex-col data-[orientation=vertical]:w-xs",
      "data-hovering:opacity-100 data-scrolling:opacity-100",
      "data-hovering:delay-0 data-hovering:duration-100 data-scrolling:delay-0 data-scrolling:duration-100",
    ],
    thumb: "relative flex-1 rounded-pill bg-neutral-950/20",
    viewport: [
      "h-full rounded-[inherit] transition-shadow outline-none",
      "focus-visible:ring-2 focus-visible:ring-brand-500/24 focus-visible:ring-offset-1 focus-visible:ring-offset-white",
    ],
  },
  variants: {
    fill: {
      true: { content: "size-full" },
    },
    overscrollContain: {
      true: {
        viewport:
          "data-has-overflow-x:overscroll-x-contain data-has-overflow-y:overscroll-y-contain",
      },
    },
    scrollFade: {
      true: {
        viewport: [
          "[--fade-size:1.5rem]",
          "mask-t-from-[calc(100%-min(var(--fade-size),var(--scroll-area-overflow-y-start)))]",
          "mask-b-from-[calc(100%-min(var(--fade-size),var(--scroll-area-overflow-y-end)))]",
          "mask-l-from-[calc(100%-min(var(--fade-size),var(--scroll-area-overflow-x-start)))]",
          "mask-r-from-[calc(100%-min(var(--fade-size),var(--scroll-area-overflow-x-end)))]",
        ],
      },
    },
    scrollbarGutter: {
      true: {
        viewport: "data-has-overflow-x:pb-lg data-has-overflow-y:pe-lg",
      },
    },
  },
})

export type ScrollAreaProps = PropsWithClassName<BaseScrollArea.Root.Props> &
  VariantProps<typeof scrollAreaVariants> & {
    clampContentMinWidth?: boolean
  }

export type ScrollBarProps = PropsWithClassName<BaseScrollArea.Scrollbar.Props>

function ScrollBar({ className, orientation = "vertical", ...props }: ScrollBarProps) {
  const v = scrollAreaVariants()

  return (
    <BaseScrollArea.Scrollbar
      className={v.scrollbar({ className })}
      data-slot="scroll-area-scrollbar"
      orientation={orientation}
      {...props}
    >
      <BaseScrollArea.Thumb className={v.thumb()} data-slot="scroll-area-thumb" />
    </BaseScrollArea.Scrollbar>
  )
}

export function ScrollArea({
  children,
  clampContentMinWidth = true,
  className,
  fill = false,
  overscrollContain = false,
  scrollFade = false,
  scrollbarGutter = false,
  ...props
}: ScrollAreaProps) {
  const v = scrollAreaVariants({ fill, overscrollContain, scrollFade, scrollbarGutter })

  return (
    <BaseScrollArea.Root className={v.root({ className })} data-slot="scroll-area" {...props}>
      <BaseScrollArea.Viewport className={v.viewport()} data-slot="scroll-area-viewport">
        <BaseScrollArea.Content
          className={v.content()}
          data-slot="scroll-area-content"
          style={clampContentMinWidth ? { minWidth: 0 } : undefined}
        >
          {children}
        </BaseScrollArea.Content>
      </BaseScrollArea.Viewport>
      <ScrollBar orientation="vertical" />
      <ScrollBar orientation="horizontal" />
      <BaseScrollArea.Corner className={v.corner()} data-slot="scroll-area-corner" />
    </BaseScrollArea.Root>
  )
}
