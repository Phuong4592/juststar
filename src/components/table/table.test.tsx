// Contract coverage: renders, class-name, variant, selected-row, preserve-semantics
import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
  tableVariants,
} from "./table"

describe("Table", () => {
  describe("renders", () => {
    it("renders the complete semantic anatomy with data slots", () => {
      const { container } = render(
        <Table>
          <TableCaption>Workspace members</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Member</TableHead>
              <TableHead>Role</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Ada Lovelace</TableCell>
              <TableCell>Owner</TableCell>
            </TableRow>
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell>Total</TableCell>
              <TableCell>4 members</TableCell>
            </TableRow>
          </TableFooter>
        </Table>,
      )

      const table = screen.getByRole("table")
      expect(table).toHaveAttribute("data-slot", "table")
      expect(table.parentElement).toHaveAttribute("data-slot", "table-container")
      expect(table.className).toContain("w-full")
      expect(container.querySelector('[data-slot="table-caption"]')).toHaveTextContent(
        "Workspace members",
      )
      expect(container.querySelector('[data-slot="table-header"]')).toBeDefined()
      expect(container.querySelector('[data-slot="table-body"]')).toBeDefined()
      expect(container.querySelector('[data-slot="table-footer"]')).toBeDefined()
      expect(container.querySelector('[data-slot="table-row"]')).toBeDefined()
      expect(screen.getByRole("columnheader", { name: "Member" })).toHaveAttribute(
        "data-slot",
        "table-head",
      )
      expect(screen.getByRole("cell", { name: "Ada Lovelace" })).toHaveAttribute(
        "data-slot",
        "table-cell",
      )
    })

    it("exports tableVariants with all public slots", () => {
      const variants = tableVariants()
      expect(variants.root()).toContain("w-full")
      expect(variants.container()).toContain("overflow-x-auto")
      expect(variants.body()).toContain("in-data-[variant=card]:rounded-surface")
      expect(variants.row()).toContain("in-data-[slot=table-body]:hover:bg-neutral-100")
    })
  })

  describe("class-name", () => {
    it("merges a consumer class-name into the table element", () => {
      render(<Table className="custom-table" data-testid="table" />)

      expect(screen.getByTestId("table")).toHaveClass("custom-table", "w-full")
    })

    it("merges consumer class-names into table parts", () => {
      render(
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="custom-head">Member</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="custom-row">
              <TableCell className="custom-cell">Ada Lovelace</TableCell>
            </TableRow>
          </TableBody>
        </Table>,
      )

      expect(screen.getByRole("columnheader", { name: "Member" })).toHaveClass(
        "custom-head",
        "px-lg",
      )
      expect(screen.getByRole("row", { name: "Ada Lovelace" })).toHaveClass(
        "custom-row",
        "border-b",
      )
      expect(screen.getByRole("cell", { name: "Ada Lovelace" })).toHaveClass("custom-cell", "p-lg")
    })
  })

  describe("variant", () => {
    it("defaults to the default variant", () => {
      render(<Table data-testid="table" />)

      expect(screen.getByTestId("table").parentElement).toHaveAttribute("data-variant", "default")
    })

    it("marks the container as card and ships the card utilities", () => {
      render(<Table data-testid="table" variant="card" />)

      expect(screen.getByTestId("table").parentElement).toHaveAttribute("data-variant", "card")
      expect(screen.getByTestId("table")).toHaveClass("in-data-[variant=card]:border-separate")
    })
  })

  describe("selected-row", () => {
    it("keeps the selected state stronger than the hover surface", () => {
      render(
        <Table>
          <TableBody>
            <TableRow data-state="selected" data-testid="selected-row">
              <TableCell>Selected record</TableCell>
            </TableRow>
          </TableBody>
        </Table>,
      )

      expect(screen.getByTestId("selected-row")).toHaveClass(
        "in-data-[slot=table-body]:hover:bg-neutral-100",
        "in-data-[slot=table-body]:data-[state=selected]:bg-on-surface/4",
        "in-data-[slot=table-body]:data-[state=selected]:hover:bg-on-surface/4",
      )
    })
  })

  describe("preserve-semantics", () => {
    it("renders native table elements and passes attributes through", () => {
      const { container } = render(
        <Table aria-label="Workspace members">
          <TableBody>
            <TableRow data-testid="row">
              <TableCell colSpan={2}>Ada Lovelace</TableCell>
            </TableRow>
          </TableBody>
        </Table>,
      )

      expect(screen.getByRole("table")).toHaveAttribute("aria-label", "Workspace members")
      expect(screen.getByTestId("row").tagName).toBe("TR")
      expect(screen.getByRole("cell")).toHaveAttribute("colspan", "2")
      expect(container.querySelector('[data-slot="table-cell"]')?.tagName).toBe("TD")
    })
  })
})
