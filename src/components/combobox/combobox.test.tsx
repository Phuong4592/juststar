// Contract coverage: renders, class-name, single-selection, multiple-selection, sizes, disabled
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"

import {
  Combobox,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxChip,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxPopup,
  ComboboxValue,
  comboboxVariants,
} from "./combobox"

type Fruit = { label: string; value: string }

const FRUITS: Fruit[] = [
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Cherry", value: "cherry" },
]

function SingleCombobox(props: Partial<Parameters<typeof Combobox>[0]>) {
  return (
    <Combobox items={FRUITS} {...props}>
      <ComboboxInput placeholder="Select a fruit" />
      <ComboboxPopup>
        <ComboboxEmpty>No results found.</ComboboxEmpty>
        <ComboboxList>
          {(fruit: Fruit) => (
            <ComboboxItem key={fruit.value} value={fruit}>
              {fruit.label}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxPopup>
    </Combobox>
  )
}

function ChipsCombobox(props: Partial<Parameters<typeof Combobox>[0]>) {
  return (
    <Combobox items={FRUITS} multiple {...props}>
      <ComboboxChips>
        <ComboboxValue>
          {(value: Fruit[]) => (
            <>
              {value.map((fruit) => (
                <ComboboxChip key={fruit.value} aria-label={fruit.label}>
                  {fruit.label}
                </ComboboxChip>
              ))}
              <ComboboxChipsInput aria-label="Select fruits" />
            </>
          )}
        </ComboboxValue>
      </ComboboxChips>
      <ComboboxPopup>
        <ComboboxList>
          {(fruit: Fruit) => (
            <ComboboxItem key={fruit.value} value={fruit}>
              {fruit.label}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxPopup>
    </Combobox>
  )
}

describe("Combobox", () => {
  it("is exported", () => {
    expect(Combobox).toBeDefined()
    expect(comboboxVariants).toBeInstanceOf(Function)
  })

  describe("renders", () => {
    it("renders a combobox input with a placeholder", () => {
      render(<SingleCombobox />)
      expect(screen.getByRole("combobox")).toHaveAttribute("placeholder", "Select a fruit")
    })

    it("renders popup options when opened", async () => {
      const user = userEvent.setup()
      render(<SingleCombobox />)
      await user.click(screen.getByRole("combobox"))
      expect(screen.getByRole("listbox")).toBeDefined()
      expect(screen.getAllByRole("option")).toHaveLength(FRUITS.length)
      expect(screen.getByRole("option", { name: "Apple" })).toBeDefined()
    })

    it("shows the empty state when no option matches", async () => {
      const user = userEvent.setup()
      render(<SingleCombobox />)
      await user.click(screen.getByRole("combobox"))
      await user.type(screen.getByRole("combobox"), "zzz")
      expect(screen.queryByRole("option")).toBeNull()
      expect(screen.getByText("No results found.")).toBeDefined()
    })
  })

  describe("class-name", () => {
    it("applies consumer className to the input while keeping token classes", () => {
      render(
        <Combobox items={FRUITS}>
          <ComboboxInput className="custom-class" placeholder="Select a fruit" />
          <ComboboxPopup>
            <ComboboxList>
              {(fruit: Fruit) => (
                <ComboboxItem key={fruit.value} value={fruit}>
                  {fruit.label}
                </ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxPopup>
        </Combobox>,
      )
      const input = screen.getByRole("combobox")
      expect(input.className).toContain("custom-class")
      expect(input.className).toContain("border-neutral-200")
      expect(input.className).toContain("bg-surface")
    })

    it("applies consumer className to chips and keeps chip token classes", () => {
      render(<ChipsCombobox defaultValue={[FRUITS[0]]} />)
      const chip = screen.getByText("Apple")
      expect(chip.className).toContain("bg-neutral-100")
      expect(screen.getByRole("combobox").className).toContain("text-neutral-900")
    })
  })

  describe("single-selection", () => {
    it("selects an option by click and reports the item object", async () => {
      const user = userEvent.setup()
      const onValueChange = vi.fn()
      render(<SingleCombobox onValueChange={onValueChange} />)
      await user.click(screen.getByRole("combobox"))
      await user.click(screen.getByRole("option", { name: "Apple" }))
      expect(onValueChange.mock.calls[0]?.[0]).toEqual(FRUITS[0])
    })

    it("selects the highlighted option with the keyboard", async () => {
      const user = userEvent.setup()
      const onValueChange = vi.fn()
      render(<SingleCombobox onValueChange={onValueChange} />)
      const input = screen.getByRole("combobox")
      await user.click(input)
      await user.type(input, "ba")
      await user.keyboard("{ArrowDown}{Enter}")
      expect(onValueChange.mock.calls[0]?.[0]).toEqual(FRUITS[1])
    })

    it("filters options while typing", async () => {
      const user = userEvent.setup()
      render(<SingleCombobox />)
      const input = screen.getByRole("combobox")
      await user.click(input)
      await user.type(input, "ap")
      const options = screen.getAllByRole("option")
      expect(options).toHaveLength(1)
      expect(options[0]).toHaveTextContent("Apple")
    })
  })

  describe("multiple-selection", () => {
    it("renders a chip per selected item", async () => {
      const user = userEvent.setup()
      render(<ChipsCombobox />)
      await user.click(screen.getByRole("combobox"))
      await user.click(screen.getByRole("option", { name: "Apple" }))
      await user.click(screen.getByRole("option", { name: "Banana" }))
      const chips = document.querySelectorAll<HTMLElement>('[data-slot="combobox-chip"]')
      expect(chips).toHaveLength(2)
      expect(chips[0].textContent).toContain("Apple")
      expect(chips[1].textContent).toContain("Banana")
    })

    it("removes a chip through its remove button", async () => {
      const user = userEvent.setup()
      render(<ChipsCombobox defaultValue={[FRUITS[0], FRUITS[1]]} />)
      expect(screen.getByText("Apple")).toBeDefined()
      await user.click(screen.getAllByRole("button", { name: "Remove" })[0])
      expect(screen.queryByText("Apple")).toBeNull()
      expect(screen.getByText("Banana")).toBeDefined()
    })
  })

  describe("sizes", () => {
    it("applies the small size", () => {
      render(
        <Combobox items={FRUITS}>
          <ComboboxInput placeholder="Select a fruit" size="sm" />
          <ComboboxPopup>
            <ComboboxList>
              {(fruit: Fruit) => (
                <ComboboxItem key={fruit.value} value={fruit}>
                  {fruit.label}
                </ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxPopup>
        </Combobox>,
      )
      expect(screen.getByRole("combobox").className).toContain("sm:h-[28px]")
    })

    it("defaults to the medium size", () => {
      render(<SingleCombobox />)
      expect(screen.getByRole("combobox").className).toContain("sm:h-6xl")
    })

    it("applies the large size", () => {
      render(
        <Combobox items={FRUITS}>
          <ComboboxInput placeholder="Select a fruit" size="lg" />
          <ComboboxPopup>
            <ComboboxList>
              {(fruit: Fruit) => (
                <ComboboxItem key={fruit.value} value={fruit}>
                  {fruit.label}
                </ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxPopup>
        </Combobox>,
      )
      expect(screen.getByRole("combobox").className).toContain("sm:h-[36px]")
    })
  })

  describe("disabled", () => {
    it("disables the input and applies the disabled style", () => {
      render(<SingleCombobox disabled />)
      const input = screen.getByRole("combobox")
      expect(input).toBeDisabled()
      expect(input.className).toContain("disabled:bg-neutral-50")
    })

    it("does not open the popup when disabled", async () => {
      const user = userEvent.setup()
      render(<SingleCombobox disabled />)
      await user.click(screen.getByRole("combobox"))
      expect(screen.queryByRole("listbox")).toBeNull()
    })
  })
})
