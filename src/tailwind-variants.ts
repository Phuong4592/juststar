import { cnMerge, createTV, type CnOptions, type CnReturn } from "tailwind-variants"

export type { VariantProps } from "tailwind-variants"

const colorSteps = [
  "25",
  "50",
  "100",
  "200",
  "300",
  "400",
  "500",
  "600",
  "700",
  "800",
  "900",
  "950",
]
const typographyRoles = [
  "display-2xl",
  "display-xl",
  "display-lg",
  "display-md",
  "display-sm",
  "heading-1",
  "heading-2",
  "heading-3",
  "heading-4",
  "heading-5",
  "heading-6",
  "body-xl",
  "body-lg",
  "body-md",
  "body-sm",
  "body-xs",
  "label-lg",
  "label-md",
  "label-sm",
  "mono-display",
  "mono-lg",
  "mono-md",
  "mono-sm",
  "mono-xs",
  "mono-2xs",
  "mono-caps",
  "mono-caps-xs",
  "eyebrow-lg",
  "eyebrow-md",
]

const config = {
  twMerge: true,
  twMergeConfig: {
    extend: {
      theme: {
        color: [
          "white",
          "black",
          ...["neutral", "brand", "accent", "info", "success", "error", "warning"].flatMap(
            (family) => colorSteps.map((step) => `${family}-${step}`),
          ),
          "canvas",
          "on-canvas",
          "surface",
          "on-surface",
          "container",
          "on-container",
          "overlay",
          "on-overlay",
          "bg-brand",
          "on-brand",
          "bg-accent",
          "on-accent",
          "bg-error",
          "on-error",
          "bg-warning",
          "on-warning",
          "bg-success",
          "on-success",
          "bg-info",
          "on-info",
        ],
        font: ["sans", "mono"],
        "font-weight": ["light", "normal", "medium", "semibold", "bold"],
        leading: ["none", ...typographyRoles],
        radius: ["none", "control", "surface", "overlay", "pill"],
        shadow: ["none", "hairline", "surface", "raised", "overlay", "modal", "inset"],
        spacing: ["0", "2xs", "xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl", "5xl", "6xl"],
        text: typographyRoles,
        tracking: [
          "display-2xl",
          "display-xl",
          "display-lg",
          "display-md",
          "label-sm",
          "mono-caps-xs",
          "mono-caps",
          "eyebrow-md",
          "eyebrow-lg",
        ],
      },
    },
  },
}

export const tv = createTV(config)

export const cn = <T extends CnOptions>(...classes: T): CnReturn => cnMerge(...classes)(config)
