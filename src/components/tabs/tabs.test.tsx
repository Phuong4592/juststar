// Contract coverage: renders, class-name, variants, sizes, keyboard
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"

import { Tabs, TabsList, TabsPanel, TabsTab, tabsVariants } from "./tabs"

function renderTabs() {
  return render(
    <Tabs defaultValue="tab-1">
      <TabsList>
        <TabsTab value="tab-1">Tab 1</TabsTab>
        <TabsTab value="tab-2">Tab 2</TabsTab>
      </TabsList>
      <TabsPanel value="tab-1">Tab 1 content</TabsPanel>
      <TabsPanel value="tab-2">Tab 2 content</TabsPanel>
    </Tabs>,
  )
}

describe("Tabs", () => {
  it("is exported", () => {
    expect(Tabs).toBeDefined()
    expect(TabsList).toBeDefined()
    expect(TabsTab).toBeDefined()
    expect(TabsPanel).toBeDefined()
  })

  describe("renders", () => {
    it("renders tab triggers with tablist semantics", () => {
      renderTabs()
      expect(screen.getByRole("tablist")).toBeDefined()
      expect(screen.getByRole("tab", { name: "Tab 1" })).toBeDefined()
      expect(screen.getByRole("tab", { name: "Tab 2" })).toBeDefined()
    })

    it("renders the active panel and hides inactive panels", () => {
      renderTabs()
      expect(screen.getByText("Tab 1 content")).toBeDefined()
      expect(screen.queryByText("Tab 2 content")).toBeNull()
    })

    it("renders the indicator automatically inside the list", () => {
      renderTabs()
      const list = screen.getByRole("tablist")
      expect(list.querySelector('[data-slot="tabs-indicator"]')).toBeDefined()
    })
  })

  describe("class-name", () => {
    it("applies consumer className to every part", () => {
      render(
        <Tabs defaultValue="tab-1" className="root-class">
          <TabsList className="list-class">
            <TabsTab value="tab-1" className="tab-class">
              Tab 1
            </TabsTab>
          </TabsList>
          <TabsPanel value="tab-1" className="panel-class">
            Tab 1 content
          </TabsPanel>
        </Tabs>,
      )
      expect(screen.getByRole("tablist").className).toContain("list-class")
      expect(screen.getByRole("tab", { name: "Tab 1" }).className).toContain("tab-class")
      expect(screen.getByText("Tab 1 content").className).toContain("panel-class")
      expect(document.querySelector(".root-class")).toBeDefined()
    })
  })

  describe("variants", () => {
    it("defaults to the default variant with muted pill list and inset indicator", () => {
      renderTabs()
      const list = screen.getByRole("tablist")
      expect(list.className).toContain("bg-neutral-100")
      expect(list.className).toContain("rounded-surface")
      expect(list.className).toContain("p-2xs")
      expect(list.className).toContain("text-neutral-500")
      const indicator = list.querySelector('[data-slot="tabs-indicator"]')
      expect(indicator?.className).toContain("bg-surface")
      expect(indicator?.className).toContain("rounded-control")
      expect(indicator?.className).toContain("shadow-hairline")
    })

    it("applies the underline variant with a brand indicator line", () => {
      render(
        <Tabs defaultValue="tab-1">
          <TabsList variant="underline">
            <TabsTab value="tab-1">Tab 1</TabsTab>
          </TabsList>
          <TabsPanel value="tab-1">Tab 1 content</TabsPanel>
        </Tabs>,
      )
      const list = screen.getByRole("tablist")
      expect(list.className).not.toContain("rounded-surface")
      expect(list.className).toContain("py-xs")
      const indicator = list.querySelector('[data-slot="tabs-indicator"]')
      expect(indicator?.className).toContain("bg-brand-500")
      expect(indicator?.className).toContain("h-2xs")
      expect(indicator?.className).toContain("duration-200")
    })

    it("exports tabsVariants as a callable function", () => {
      expect(tabsVariants).toBeInstanceOf(Function)
      const result = tabsVariants({ variant: "underline" })
      expect(result.indicator()).toContain("bg-brand-500")
      expect(result.tab()).toContain("data-active:text-neutral-900")
    })
  })

  describe("sizes", () => {
    it("defaults to default size", () => {
      renderTabs()
      const tab = screen.getByRole("tab", { name: "Tab 1" })
      expect(tab.className).toContain("h-[2.125rem]")
      expect(tab.getAttribute("data-size")).toBe("default")
    })

    it("propagates the list size to tabs via context", () => {
      render(
        <Tabs defaultValue="tab-1">
          <TabsList size="sm">
            <TabsTab value="tab-1">Tab 1</TabsTab>
          </TabsList>
          <TabsPanel value="tab-1">Tab 1 content</TabsPanel>
        </Tabs>,
      )
      const tab = screen.getByRole("tab", { name: "Tab 1" })
      expect(tab.className).toContain("h-[1.875rem]")
      expect(tab.getAttribute("data-size")).toBe("sm")
    })

    it("applies lg size", () => {
      render(
        <Tabs defaultValue="tab-1">
          <TabsList size="lg">
            <TabsTab value="tab-1">Tab 1</TabsTab>
          </TabsList>
          <TabsPanel value="tab-1">Tab 1 content</TabsPanel>
        </Tabs>,
      )
      expect(screen.getByRole("tab", { name: "Tab 1" }).className).toContain("h-[2.375rem]")
    })

    it("allows a per-tab size override", () => {
      render(
        <Tabs defaultValue="tab-1">
          <TabsList>
            <TabsTab value="tab-1" size="sm">
              Tab 1
            </TabsTab>
          </TabsList>
          <TabsPanel value="tab-1">Tab 1 content</TabsPanel>
        </Tabs>,
      )
      const tab = screen.getByRole("tab", { name: "Tab 1" })
      expect(tab.className).toContain("h-[1.875rem]")
      expect(tab.getAttribute("data-size")).toBe("sm")
    })
  })

  describe("keyboard", () => {
    it("activates a tab on click and switches panels", async () => {
      renderTabs()
      await userEvent.click(screen.getByRole("tab", { name: "Tab 2" }))
      expect(screen.getByRole("tab", { name: "Tab 2" }).getAttribute("aria-selected")).toBe("true")
      expect(screen.getByText("Tab 2 content")).toBeDefined()
      expect(screen.queryByText("Tab 1 content")).toBeNull()
    })

    it("moves focus between tabs with arrow keys", async () => {
      renderTabs()
      const first = screen.getByRole("tab", { name: "Tab 1" })
      const second = screen.getByRole("tab", { name: "Tab 2" })
      await userEvent.click(first)
      expect(first).toHaveFocus()
      await userEvent.keyboard("{ArrowRight}")
      expect(second).toHaveFocus()
      await userEvent.keyboard("{ArrowLeft}")
      expect(first).toHaveFocus()
    })
  })

  describe("disabled", () => {
    it("disables a tab and blocks activation", async () => {
      render(
        <Tabs defaultValue="tab-1">
          <TabsList>
            <TabsTab value="tab-1">Tab 1</TabsTab>
            <TabsTab value="tab-2" disabled>
              Tab 2
            </TabsTab>
          </TabsList>
          <TabsPanel value="tab-1">Tab 1 content</TabsPanel>
          <TabsPanel value="tab-2">Tab 2 content</TabsPanel>
        </Tabs>,
      )
      const disabledTab = screen.getByRole("tab", { name: "Tab 2" })
      expect(disabledTab).toHaveAttribute("data-disabled", "")
      await userEvent.click(disabledTab)
      expect(screen.getByText("Tab 1 content")).toBeDefined()
    })
  })
})
