import type { VariantProps } from "../../tailwind-variants"

import { Avatar as BaseAvatar } from "@base-ui/react/avatar"
import { tv } from "../../tailwind-variants"

import { type PropsWithClassName } from "../../types"

export const avatarVariants = tv({
  defaultVariants: {
    size: "md",
  },
  slots: {
    fallback: "flex size-full items-center justify-center bg-neutral-100",
    image: "size-full object-cover",
    root: "inline-flex shrink-0 items-center justify-center overflow-hidden rounded-pill bg-surface align-middle font-medium select-none",
  },
  variants: {
    size: {
      xs: { root: "size-4xl text-body-xs" },
      sm: { root: "size-5xl text-body-xs" },
      md: { root: "size-6xl text-body-sm" },
      lg: { root: "size-[2.5rem] text-body-md" },
    },
  },
})

export type AvatarImageProps = PropsWithClassName<BaseAvatar.Image.Props>

export type AvatarFallbackProps = PropsWithClassName<BaseAvatar.Fallback.Props>

export type AvatarProps = PropsWithClassName<Omit<BaseAvatar.Root.Props, "children">> &
  VariantProps<typeof avatarVariants> & {
    image?: AvatarImageProps
    fallback?: AvatarFallbackProps
  }

export function Avatar({ className, fallback, image, size, ...props }: AvatarProps) {
  const v = avatarVariants()

  return (
    <BaseAvatar.Root className={v.root({ className, size })} data-slot="avatar" {...props}>
      <BaseAvatar.Image
        data-slot="avatar-image"
        {...image}
        className={v.image({ className: image?.className })}
      />
      <BaseAvatar.Fallback
        data-slot="avatar-fallback"
        {...fallback}
        className={v.fallback({ className: fallback?.className })}
      />
    </BaseAvatar.Root>
  )
}
