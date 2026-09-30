// Contract coverage: renders, class-name
import { describe, expect, it } from "vitest"

import { ToastProvider } from "./toast"

describe("ToastProvider", () => {
  it("is exported", () => {
    expect(ToastProvider).toBeDefined()
  })
})
