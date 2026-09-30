import type { ComponentProps } from "react"

import { Toast } from "@base-ui/react/toast"
import { tv } from "../../tailwind-variants"

import { Button } from "../button/button"

const TOAST_ICONS = {
  error: (
    <g fill="none">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
      <path stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" d="M12 7v6" />
      <circle cx="12" cy="16" r="1" fill="currentColor" />
    </g>
  ),
  info: (
    <g fill="none">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
      <path stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" d="M12 17v-6" />
      <circle cx="1" cy="1" r="1" fill="currentColor" transform="matrix(1 0 0 -1 11 9)" />
    </g>
  ),
  loading: (
    <g fill="none" fillRule="evenodd">
      <path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
      <path
        fill="currentColor"
        d="M12 4.5a7.5 7.5 0 1 0 0 15a7.5 7.5 0 0 0 0-15M1.5 12C1.5 6.201 6.201 1.5 12 1.5S22.5 6.201 22.5 12S17.799 22.5 12 22.5S1.5 17.799 1.5 12"
        opacity=".1"
      />
      <path
        fill="currentColor"
        d="M12 4.5a7.46 7.46 0 0 0-5.187 2.083a1.5 1.5 0 0 1-2.075-2.166A10.46 10.46 0 0 1 12 1.5a1.5 1.5 0 0 1 0 3"
      />
    </g>
  ),
  success: (
    <g fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="10" />
      <path strokeLinecap="round" strokeLinejoin="round" d="m8.5 12.5l2 2l5-5" />
    </g>
  ),
  warning: (
    <g fill="none">
      <path
        stroke="currentColor"
        strokeWidth="1.5"
        d="M5.312 10.762C8.23 5.587 9.689 3 12 3s3.77 2.587 6.688 7.762l.364.644c2.425 4.3 3.638 6.45 2.542 8.022S17.786 21 12.364 21h-.728c-5.422 0-8.134 0-9.23-1.572s.117-3.722 2.542-8.022z"
      />
      <path stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" d="M12 8v5" />
      <circle cx="12" cy="16" r="1" fill="currentColor" />
    </g>
  ),
} as const

type ToastType = keyof typeof TOAST_ICONS

export type ToastPosition =
  "top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right"

type SwipeDirection = "up" | "down" | "left" | "right"

function getSwipeDirection(position: ToastPosition): SwipeDirection[] {
  const verticalDirection: SwipeDirection = position.startsWith("top") ? "up" : "down"

  if (position.includes("center")) {
    return [verticalDirection]
  }

  if (position.includes("left")) {
    return ["left", verticalDirection]
  }

  return ["right", verticalDirection]
}

const variants = tv({
  slots: {
    body: "flex min-w-0 flex-col gap-2xs",
    close:
      "shrink-0 cursor-pointer rounded-control p-xs text-neutral-400 transition-colors hover:bg-neutral-50 hover:text-neutral-600",
    content:
      "pointer-events-auto flex items-center justify-between gap-md overflow-hidden px-2xl py-xl text-body-sm transition-opacity duration-200 data-behind:not-data-expanded:pointer-events-none data-behind:not-data-expanded:opacity-0",
    description: "text-neutral-500",
    icon: "size-4xl shrink-0",
    root: [
      "[--toast-gap:var(--space-xl)]",
      "[--toast-peek:var(--space-xl)]",
      "[--toast-scale:calc(max(0,1-(var(--toast-index)*0.1)))]",
      "[--toast-shrink:calc(1-var(--toast-scale))]",
      "[--toast-calc-height:var(--toast-frontmost-height,var(--toast-height))]",

      "absolute z-[calc(9999-var(--toast-index))] w-full select-none motion-reduce:transition-none",
      "h-(--toast-calc-height)",
      "rounded-control border border-neutral-200 bg-surface text-neutral-900 shadow-overlay",
      "[transition:transform_.5s_cubic-bezier(.22,1,.36,1),opacity_.5s,height_.15s]",
      "data-[position*=right]:right-0 data-[position*=right]:left-auto",
      "data-[position*=left]:right-auto data-[position*=left]:left-0",
      "data-[position*=center]:right-0 data-[position*=center]:left-0",
      "data-[position*=top]:top-0 data-[position*=top]:bottom-auto data-[position*=top]:origin-[50%_calc(50%-50%*min(var(--toast-index,0),1))]",
      "data-[position*=bottom]:top-auto data-[position*=bottom]:bottom-0 data-[position*=bottom]:origin-[50%_calc(50%+50%*min(var(--toast-index,0),1))]",
      "data-[position*=top]:[--toast-calc-offset-y:calc(var(--toast-offset-y)+var(--toast-index)*var(--toast-gap)+var(--toast-swipe-movement-y))]",
      "data-[position*=bottom]:[--toast-calc-offset-y:calc(var(--toast-offset-y)*-1+var(--toast-index)*var(--toast-gap)*-1+var(--toast-swipe-movement-y))]",
      "data-[position*=top]:transform-[translateX(var(--toast-swipe-movement-x))_translateY(calc(var(--toast-swipe-movement-y)+(var(--toast-index)*var(--toast-peek))+(var(--toast-shrink)*var(--toast-calc-height))))_scale(var(--toast-scale))]",
      "data-[position*=bottom]:transform-[translateX(var(--toast-swipe-movement-x))_translateY(calc(var(--toast-swipe-movement-y)-(var(--toast-index)*var(--toast-peek))-(var(--toast-shrink)*var(--toast-calc-height))))_scale(var(--toast-scale))]",
      "data-swiping:transition-none",
      "data-expanded:h-(--toast-height)",
      "data-expanded:transform-[translateX(var(--toast-swipe-movement-x))_translateY(var(--toast-calc-offset-y))]",
      "data-[position*=top]:data-starting-style:transform-[translateY(calc(-100%-var(--toast-inset)))]",
      "data-[position*=bottom]:data-starting-style:transform-[translateY(calc(100%+var(--toast-inset)))]",
      "data-ending-style:opacity-0",
      "data-[position*=top]:data-ending-style:not-data-limited:not-data-swipe-direction:transform-[translateY(calc(-100%-var(--toast-inset)))]",
      "data-[position*=bottom]:data-ending-style:not-data-limited:not-data-swipe-direction:transform-[translateY(calc(100%+var(--toast-inset)))]",
      "data-ending-style:data-[swipe-direction=left]:transform-[translateX(calc(var(--toast-swipe-movement-x)-100%-var(--toast-inset)))_translateY(var(--toast-calc-offset-y))]",
      "data-ending-style:data-[swipe-direction=right]:transform-[translateX(calc(var(--toast-swipe-movement-x)+100%+var(--toast-inset)))_translateY(var(--toast-calc-offset-y))]",
      "data-ending-style:data-[swipe-direction=up]:transform-[translateY(calc(var(--toast-swipe-movement-y)-100%-var(--toast-inset)))]",
      "data-ending-style:data-[swipe-direction=down]:transform-[translateY(calc(var(--toast-swipe-movement-y)+100%+var(--toast-inset)))]",
      "data-expanded:data-ending-style:data-[swipe-direction=left]:transform-[translateX(calc(var(--toast-swipe-movement-x)-100%-var(--toast-inset)))_translateY(var(--toast-calc-offset-y))]",
      "data-expanded:data-ending-style:data-[swipe-direction=right]:transform-[translateX(calc(var(--toast-swipe-movement-x)+100%+var(--toast-inset)))_translateY(var(--toast-calc-offset-y))]",
      "data-expanded:data-ending-style:data-[swipe-direction=up]:transform-[translateY(calc(var(--toast-swipe-movement-y)-100%-var(--toast-inset)))]",
      "data-expanded:data-ending-style:data-[swipe-direction=down]:transform-[translateY(calc(var(--toast-swipe-movement-y)+100%+var(--toast-inset)))]",
      "data-limited:opacity-0",
      "after:absolute after:left-0 after:h-[calc(var(--toast-gap)+1px)] after:w-full",
      "data-[position*=top]:after:top-full",
      "data-[position*=bottom]:after:bottom-full",
    ],
    title: "font-medium",
    viewport: [
      "fixed z-60 mx-auto flex w-[calc(100%-var(--toast-inset)*2)] max-w-[360px] [--toast-inset:var(--space-3xl)] sm:[--toast-inset:var(--space-6xl)]",
      "data-[position*=top]:top-(--toast-inset)",
      "data-[position*=bottom]:bottom-(--toast-inset)",
      "data-[position*=left]:left-(--toast-inset)",
      "data-[position*=right]:right-(--toast-inset)",
      "data-[position*=center]:left-1/2 data-[position*=center]:-translate-x-1/2",
    ],
  },
  variants: {
    pulse: {
      even: { root: "animate-pulse-toast-even" },
      odd: { root: "animate-pulse-toast-odd" },
    },
    type: {
      error: { icon: "text-error-500", title: "text-error-500" },
      info: { icon: "text-info-500", title: "text-info-500" },
      loading: { icon: "animate-spin text-neutral-400 motion-reduce:animate-none" },
      success: { icon: "text-success-500", title: "text-success-500" },
      warning: { icon: "text-warning-500", title: "text-warning-500" },
    },
  },
})

function isValidType(type?: string): type is ToastType {
  return type !== undefined && type in TOAST_ICONS
}

function getPulse(updateKey?: number): "even" | "odd" | undefined {
  if (updateKey === undefined || updateKey === 0) {
    return undefined
  }
  return updateKey % 2 === 0 ? "even" : "odd"
}
export type ToastsProps = { position: ToastPosition }

function Toasts({ position }: ToastsProps) {
  const { toasts } = Toast.useToastManager()

  const v = variants()
  const swipeDirection = getSwipeDirection(position)

  return (
    <Toast.Portal>
      <Toast.Viewport className={v.viewport()} data-position={position}>
        {toasts.map((toast) => {
          const type = isValidType(toast.type) ? toast.type : undefined
          const icon = type ? TOAST_ICONS[type] : undefined
          const pulse = getPulse(toast.updateKey)

          return (
            <Toast.Root
              key={toast.id}
              className={v.root({ pulse })}
              data-position={position}
              swipeDirection={swipeDirection}
              toast={toast}
            >
              <Toast.Content className={v.content()}>
                <div className="flex min-w-0 gap-lg">
                  {icon && (
                    <svg
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="1em"
                      height="1em"
                      viewBox="0 0 24 24"
                      className={v.icon({ type })}
                    >
                      {icon}
                    </svg>
                  )}

                  <div className={v.body()}>
                    <Toast.Title className={v.title({ type })} />
                    <Toast.Description className={v.description()} />
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-xs">
                  {toast.actionProps && (
                    <Toast.Action render={<Button size="xs" variant="secondary" />}>
                      {toast.actionProps.children}
                    </Toast.Action>
                  )}
                  <Toast.Close aria-label="Dismiss notification" className={v.close()}>
                    <svg aria-hidden="true" className="size-3xl" fill="none" viewBox="0 0 24 24">
                      <path
                        d="m7 7 10 10M17 7 7 17"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeWidth="2"
                      />
                    </svg>
                  </Toast.Close>
                </div>
              </Toast.Content>
            </Toast.Root>
          )
        })}
      </Toast.Viewport>
    </Toast.Portal>
  )
}

export const toast = Toast.createToastManager()

export type ToastProviderProps = {
  position?: ToastPosition
} & ComponentProps<typeof Toast.Provider>

export function ToastProvider({
  children,
  position = "bottom-right",
  ...props
}: ToastProviderProps) {
  return (
    <Toast.Provider toastManager={toast} {...props}>
      {children}
      <Toasts position={position} />
    </Toast.Provider>
  )
}

export { Toast } from "@base-ui/react/toast"
