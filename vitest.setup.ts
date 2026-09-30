import "@testing-library/jest-dom/vitest"

if (typeof window !== "undefined" && !window.PointerEvent) {
  window.PointerEvent = MouseEvent as unknown as typeof PointerEvent
}
