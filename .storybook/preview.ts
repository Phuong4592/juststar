import type { Decorator, Preview } from "@storybook/react-vite"
import { createElement } from "react"

import "../src/style/index.css"
import { storySources } from "./generated-story-source"
import "./preview.css"
import "./theme-lab.css"

const withEnostaModes: Decorator = (Story, context) => {
  const root = document.documentElement
  const theme = context.parameters.themeAware ? (context.globals.theme ?? "default") : "default"

  root.dataset.brand = "en-default"
  root.dataset.theme = theme
  root.dataset.mode =
    theme === "default-dark" || theme === "terminal" || theme === "high-contrast" ? "dark" : "light"
  root.dataset.density = context.globals.density ?? "comfortable"
  root.dataset.motion = context.globals.motion ?? "full"
  root.style.colorScheme = root.dataset.mode ?? "light"

  const className =
    context.parameters.layout === "fullscreen" ? "theme-preview" : "theme-preview p-3xl"
  return createElement("div", { className }, Story())
}

const preview: Preview = {
  decorators: [withEnostaModes],
  tags: ["autodocs"],
  globalTypes: {
    theme: {
      description: "Visual theme for theme-aware preview stories",
      toolbar: {
        dynamicTitle: true,
        icon: "paintbrush",
        items: [
          { title: "Default light", value: "default" },
          { title: "Default dark", value: "default-dark" },
          { title: "Neobrutalism", value: "neobrutalism" },
          { title: "Glassmorphism", value: "glassmorphism" },
          { title: "Neumorphism", value: "neumorphism" },
          { title: "Bauhaus", value: "bauhaus" },
          { title: "Terminal", value: "terminal" },
          { title: "Editorial", value: "editorial" },
          { title: "Pop", value: "pop" },
          { title: "High contrast", value: "high-contrast" },
        ],
      },
    },
    density: {
      description: "Information density",
      toolbar: {
        dynamicTitle: true,
        icon: "component",
        items: [
          { title: "Comfortable", value: "comfortable" },
          { title: "Compact", value: "compact" },
        ],
      },
    },
    motion: {
      description: "Motion preference",
      toolbar: {
        dynamicTitle: true,
        icon: "lightning",
        items: [
          { title: "Full motion", value: "full" },
          { title: "Reduced motion", value: "reduced" },
        ],
      },
    },
  },
  initialGlobals: {
    density: "comfortable",
    motion: "full",
    theme: "default",
  },
  parameters: {
    a11y: { test: "error" },
    controls: { expanded: true },
    docs: {
      source: {
        transform: (source: string, context: { id: string }) => storySources[context.id] ?? source,
      },
    },
    layout: "centered",
    options: {
      storySort: {
        method: "alphabetical",
        order: [
          "Foundations",
          "Actions",
          "Forms",
          "Data Display",
          "Feedback",
          "Navigation",
          "Overlays",
          "Primitives",
          "Examples",
          "Layout",
          "Patterns",
        ],
      },
    },
  },
}

export default preview
