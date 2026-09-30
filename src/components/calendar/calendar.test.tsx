// Contract coverage: renders, class-name, selection, navigation
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"

import { Calendar } from "./calendar"

const january = new Date(2026, 0, 15)

describe("Calendar", () => {
  it("is exported", () => {
    expect(Calendar).toBeDefined()
  })

  describe("renders", () => {
    it("renders a month grid with caption and weekday headers", () => {
      render(<Calendar defaultMonth={january} mode="single" />)
      expect(screen.getByRole("grid", { name: "January 2026" })).toBeDefined()
      expect(screen.getByRole("status")).toHaveTextContent("January 2026")
      expect(document.querySelectorAll('th[scope="col"]')).toHaveLength(7)
    })

    it("renders day buttons for the displayed month", () => {
      render(<Calendar defaultMonth={january} mode="single" />)
      expect(screen.getByRole("button", { name: "Thursday, January 15th, 2026" })).toBeDefined()
    })

    it("renders navigation buttons", () => {
      render(<Calendar defaultMonth={january} mode="single" />)
      expect(screen.getByRole("button", { name: "Go to the Previous Month" })).toBeDefined()
      expect(screen.getByRole("button", { name: "Go to the Next Month" })).toBeDefined()
    })
  })

  describe("class-name", () => {
    it("applies consumer className to the root element", () => {
      render(<Calendar className="custom-class" defaultMonth={january} mode="single" />)
      const root = document.querySelector('[data-slot="calendar"]')
      expect(root?.className).toContain("custom-class")
      expect(root?.className).toContain("w-fit")
      expect(root?.className).toContain("[--cell-size:40px]")
    })

    it("preserves token classes alongside consumer className", () => {
      render(<Calendar className="custom-class" defaultMonth={january} mode="single" />)
      const root = document.querySelector('[data-slot="calendar"]')
      expect(root?.className).toContain("custom-class")
      expect(screen.getByRole("grid").className).toContain("border-collapse")
    })
  })

  describe("selection", () => {
    it("calls onSelect with the clicked date in single mode", async () => {
      const onSelect = vi.fn()
      render(<Calendar defaultMonth={january} mode="single" onSelect={onSelect} />)
      await userEvent.click(screen.getByRole("button", { name: "Thursday, January 15th, 2026" }))
      expect(onSelect.mock.calls[0]?.[0]).toEqual(new Date(2026, 0, 15))
    })

    it("marks the clicked day as selected", async () => {
      render(<Calendar defaultMonth={january} mode="single" />)
      const button = screen.getByRole("button", { name: "Thursday, January 15th, 2026" })
      await userEvent.click(button)
      expect(button.className).toContain("in-data-selected:bg-brand-500")
      expect(button.className).toContain("in-data-selected:text-on-brand")
      expect(button.closest("td")).toHaveAttribute("data-selected", "true")
    })

    it("selects a range across two clicks in range mode", async () => {
      render(<Calendar defaultMonth={january} mode="range" />)
      const start = screen.getByRole("button", { name: "Monday, January 5th, 2026" })
      const end = screen.getByRole("button", { name: "Friday, January 9th, 2026" })
      await userEvent.click(start)
      await userEvent.click(end)
      expect(start.className).toContain("in-data-selected:bg-brand-500")
      expect(start.closest("td")).toHaveAttribute("data-selected", "true")
    })
  })

  describe("navigation", () => {
    it("moves to the next month", async () => {
      render(<Calendar defaultMonth={january} mode="single" />)
      await userEvent.click(screen.getByRole("button", { name: "Go to the Next Month" }))
      expect(screen.getByRole("grid", { name: "February 2026" })).toBeDefined()
    })

    it("moves to the previous month", async () => {
      render(<Calendar defaultMonth={january} mode="single" />)
      await userEvent.click(screen.getByRole("button", { name: "Go to the Previous Month" }))
      expect(screen.getByRole("grid", { name: "December 2025" })).toBeDefined()
    })
  })

  describe("variants", () => {
    it("marks outside days from adjacent months", () => {
      render(<Calendar defaultMonth={january} mode="single" />)
      const outside = screen
        .getAllByRole("gridcell")
        .find((cell) => cell.hasAttribute("data-outside"))
      expect(outside).toBeDefined()
    })

    it("marks the today date", () => {
      render(<Calendar mode="single" />)
      expect(
        screen.getAllByRole("gridcell").find((cell) => cell.hasAttribute("data-today")),
      ).toBeDefined()
    })

    it("supports captionLayout dropdown with month and year comboboxes", () => {
      render(
        <Calendar
          captionLayout="dropdown"
          defaultMonth={january}
          endMonth={new Date(2030, 11)}
          mode="single"
          startMonth={new Date(2020, 0)}
        />,
      )
      expect(screen.getAllByRole("combobox")).toHaveLength(2)
    })
  })
})
