import type { Meta, StoryObj } from "@storybook/react-vite"

import { Icon } from "@iconify/react"
import { Fragment, useState } from "react"

import {
  Button,
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxCollection,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxGroupLabel,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxPopup,
  ComboboxSeparator,
  ComboboxTrigger,
  ComboboxValue,
  Field,
  FieldError,
  FieldLabel,
  Typography,
  toast,
} from "@enosta/en-ui"

type Fruit = { label: string; value: string }
type FruitGroup = { value: string; items: Fruit[] }

const FRUITS: Fruit[] = [
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Blueberry", value: "blueberry" },
  { label: "Cherry", value: "cherry" },
  { label: "Grape", value: "grape" },
  { label: "Kiwi", value: "kiwi" },
  { label: "Mango", value: "mango" },
  { label: "Orange", value: "orange" },
  { label: "Peach", value: "peach" },
  { label: "Pear", value: "pear" },
  { label: "Pineapple", value: "pineapple" },
  { label: "Strawberry", value: "strawberry" },
  { label: "Watermelon", value: "watermelon" },
]

const FRUIT_GROUPS: FruitGroup[] = [
  {
    items: [
      { label: "Blueberry", value: "blueberry" },
      { label: "Cherry", value: "cherry" },
      { label: "Strawberry", value: "strawberry" },
    ],
    value: "Berries",
  },
  {
    items: [
      { label: "Lemon", value: "lemon" },
      { label: "Lime", value: "lime" },
      { label: "Orange", value: "orange" },
    ],
    value: "Citrus",
  },
  {
    items: [
      { label: "Mango", value: "mango" },
      { label: "Papaya", value: "papaya" },
      { label: "Pineapple", value: "pineapple" },
    ],
    value: "Tropical",
  },
]

function FruitList() {
  return (
    <>
      <ComboboxEmpty>No results found.</ComboboxEmpty>
      <ComboboxList>
        {(fruit: Fruit) => (
          <ComboboxItem key={fruit.value} value={fruit}>
            {fruit.label}
          </ComboboxItem>
        )}
      </ComboboxList>
    </>
  )
}

function ChipsValue({ placeholder }: { placeholder: string }) {
  return (
    <ComboboxChips>
      <ComboboxValue>
        {(value: Fruit[]) => (
          <>
            {value.map((fruit) => (
              <ComboboxChip key={fruit.value} aria-label={fruit.label}>
                {fruit.label}
              </ComboboxChip>
            ))}
            <ComboboxChipsInput
              aria-label={placeholder}
              placeholder={value.length > 0 ? undefined : placeholder}
            />
          </>
        )}
      </ComboboxValue>
    </ComboboxChips>
  )
}

function OverviewPage() {
  const [single, setSingle] = useState<Fruit | null>(FRUITS[0])
  const [multi, setMulti] = useState<Fruit[]>([FRUITS[1], FRUITS[3]])
  const [loading, setLoading] = useState(false)

  const onFormSubmit = async (event: {
    preventDefault: () => void
    currentTarget: HTMLFormElement
  }) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const selected = formData
      .getAll("fruits")
      .filter((entry): entry is string => typeof entry === "string")
    const values = selected.map(
      (label) => FRUITS.find((fruit) => fruit.label === label)?.value ?? label,
    )

    setLoading(true)
    await new Promise<void>((resolve) => {
      setTimeout(resolve, 800)
    })
    setLoading(false)
    toast.add({
      description: values.length > 0 ? values.join(", ") : "Nothing selected",
      title: "Submitted",
      type: "success",
    })
  }

  return (
    <div className="space-y-6xl">
      <section>
        <Typography.H5 as="h2" className="mb-xl text-neutral-900">
          Selection modes
        </Typography.H5>
        <div className="grid items-start gap-4xl sm:grid-cols-2">
          <div className="min-w-0">
            <Typography.Small as="h3" className="mb-md font-semibold text-neutral-600">
              Single
            </Typography.Small>
            <Combobox items={FRUITS} value={single} onValueChange={setSingle}>
              <ComboboxInput placeholder="Select a fruit..." showClear />
              <ComboboxPopup>
                <FruitList />
              </ComboboxPopup>
            </Combobox>
          </div>
          <div className="min-w-0">
            <Typography.Small as="h3" className="mb-md font-semibold text-neutral-600">
              Multiple
            </Typography.Small>
            <Combobox items={FRUITS} multiple value={multi} onValueChange={setMulti}>
              <ChipsValue placeholder="Select fruits..." />
              <ComboboxPopup>
                <FruitList />
              </ComboboxPopup>
            </Combobox>
          </div>
        </div>
      </section>

      <section>
        <Typography.H5 as="h2" className="mb-xl text-neutral-900">
          Sizes
        </Typography.H5>
        <div className="grid items-end gap-xl sm:grid-cols-3">
          {(["sm", "md", "lg"] as const).map((size) => (
            <div className="min-w-0" key={size}>
              <Typography.Small as="h3" className="mb-md font-semibold text-neutral-600 uppercase">
                {size}
              </Typography.Small>
              <Combobox items={FRUITS}>
                <ComboboxInput placeholder={`${size} combobox`} size={size} />
                <ComboboxPopup>
                  <FruitList />
                </ComboboxPopup>
              </Combobox>
            </div>
          ))}
        </div>
      </section>

      <section>
        <Typography.H5 as="h2" className="mb-xl text-neutral-900">
          States
        </Typography.H5>
        <div className="grid items-start gap-4xl sm:grid-cols-2">
          <div className="min-w-0">
            <Typography.Small as="h3" className="mb-md font-semibold text-neutral-600">
              Disabled
            </Typography.Small>
            <Combobox disabled items={FRUITS} value={FRUITS[0]}>
              <ComboboxInput placeholder="Disabled" />
              <ComboboxPopup>
                <FruitList />
              </ComboboxPopup>
            </Combobox>
          </div>
          <div className="min-w-0">
            <Typography.Small as="h3" className="mb-md font-semibold text-neutral-600">
              Invalid
            </Typography.Small>
            <Combobox items={FRUITS}>
              <ComboboxInput aria-invalid placeholder="Select a fruit..." />
              <ComboboxPopup>
                <FruitList />
              </ComboboxPopup>
            </Combobox>
          </div>
        </div>
      </section>

      <section>
        <Typography.H5 as="h2" className="mb-xl text-neutral-900">
          Input treatments
        </Typography.H5>
        <div className="grid items-start gap-4xl sm:grid-cols-2">
          <div className="min-w-0">
            <Typography.Small as="h3" className="mb-md font-semibold text-neutral-600">
              Start addon
            </Typography.Small>
            <Combobox items={FRUITS}>
              <ComboboxInput placeholder="Search fruits..." startAddon="solar:magnifer-linear" />
              <ComboboxPopup>
                <FruitList />
              </ComboboxPopup>
            </Combobox>
          </div>
          <div className="min-w-0">
            <Typography.Small as="h3" className="mb-md font-semibold text-neutral-600">
              Multiple with start addon
            </Typography.Small>
            <Combobox items={FRUITS} multiple defaultValue={[FRUITS[2]]}>
              <ComboboxChips startAddon="solar:magnifer-linear">
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
                <FruitList />
              </ComboboxPopup>
            </Combobox>
          </div>
        </div>
      </section>

      <section>
        <Typography.H5 as="h2" className="mb-xl text-neutral-900">
          Compositions
        </Typography.H5>
        <div className="grid items-start gap-4xl sm:grid-cols-2">
          <div className="min-w-0">
            <Typography.Small as="h3" className="mb-md font-semibold text-neutral-600">
              Grouped options
            </Typography.Small>
            <Combobox items={FRUIT_GROUPS}>
              <ComboboxInput aria-label="Search fruits" placeholder="e.g. Mango" />
              <ComboboxPopup>
                <ComboboxEmpty>No fruits found.</ComboboxEmpty>
                <ComboboxList>
                  {(group: FruitGroup) => (
                    <Fragment key={group.value}>
                      <ComboboxGroup items={group.items}>
                        <ComboboxGroupLabel>{group.value}</ComboboxGroupLabel>
                        <ComboboxCollection>
                          {(fruit: Fruit) => (
                            <ComboboxItem key={fruit.value} value={fruit}>
                              {fruit.label}
                            </ComboboxItem>
                          )}
                        </ComboboxCollection>
                      </ComboboxGroup>
                      {group.value !== "Tropical" && <ComboboxSeparator />}
                    </Fragment>
                  )}
                </ComboboxList>
              </ComboboxPopup>
            </Combobox>
          </div>
          <div className="min-w-0">
            <Typography.Small as="h3" className="mb-md font-semibold text-neutral-600">
              Input inside popup
            </Typography.Small>
            <Combobox items={FRUITS}>
              <ComboboxTrigger className="inline-flex h-[2.25rem] w-full items-center justify-between gap-md rounded-surface border border-neutral-200 bg-surface px-xl text-neutral-900 shadow-surface outline-none sm:h-6xl">
                <ComboboxValue placeholder="Select a fruit..." />
                <Icon className="size-3xl opacity-80" icon="ph:caret-up-down-bold" />
              </ComboboxTrigger>
              <ComboboxPopup>
                <div className="border-b border-neutral-200 p-md">
                  <ComboboxInput
                    placeholder="Search fruits..."
                    showTrigger={false}
                    size="sm"
                    startAddon="solar:magnifer-linear"
                  />
                </div>
                <FruitList />
              </ComboboxPopup>
            </Combobox>
          </div>
        </div>
      </section>

      <section>
        <Typography.H5 as="h2" className="mb-xl text-neutral-900">
          Form integration
        </Typography.H5>
        <div className="grid items-start gap-4xl sm:grid-cols-2">
          <Field>
            <FieldLabel>Favorite fruit</FieldLabel>
            <Combobox items={FRUITS} name="fruit" required>
              <ComboboxInput aria-invalid placeholder="Select a fruit..." />
              <ComboboxPopup>
                <FruitList />
              </ComboboxPopup>
            </Combobox>
            <FieldError>Please select a fruit.</FieldError>
          </Field>
          <form
            className="flex min-w-0 flex-col gap-3xl"
            onSubmit={(event) => {
              void onFormSubmit(event)
            }}
          >
            <Field>
              <FieldLabel>Favorite fruits</FieldLabel>
              <Combobox items={FRUITS} multiple name="fruits" required>
                <ChipsValue placeholder="Select fruits..." />
                <ComboboxPopup>
                  <FruitList />
                </ComboboxPopup>
              </Combobox>
              <FieldError>Please select at least one fruit.</FieldError>
            </Field>
            <Button className="self-start" loading={loading} type="submit">
              Submit
            </Button>
          </form>
        </div>
      </section>
    </div>
  )
}

const meta = {
  title: "Forms/Combobox",
  component: Combobox,
} satisfies Meta<typeof Combobox>

export default meta
type Story = StoryObj<typeof meta>

export const Overview: Story = {
  tags: ["!autodocs"],
  parameters: { layout: "fullscreen" },
  render: () => (
    <main className="bg-canvas p-3xl text-on-canvas">
      <OverviewPage />
    </main>
  ),
}

export const Basic: Story = {
  render: () => (
    <Combobox items={FRUITS}>
      <ComboboxInput placeholder="Select a fruit" />
      <ComboboxPopup>
        <FruitList />
      </ComboboxPopup>
    </Combobox>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Combobox items={fruits}>
  <ComboboxInput placeholder="Select a fruit" />
  <ComboboxPopup>
    <ComboboxEmpty>No results found.</ComboboxEmpty>
    <ComboboxList>
      {(fruit) => <ComboboxItem value={fruit}>{fruit.label}</ComboboxItem>}
    </ComboboxList>
  </ComboboxPopup>
</Combobox>`,
        language: "tsx",
      },
    },
  },
}

export const Sizes: Story = {
  render: () => (
    <div className="space-y-xl">
      <Combobox items={FRUITS}>
        <ComboboxInput placeholder="Small" size="sm" />
        <ComboboxPopup>
          <FruitList />
        </ComboboxPopup>
      </Combobox>
      <Combobox items={FRUITS}>
        <ComboboxInput placeholder="Medium (default)" />
        <ComboboxPopup>
          <FruitList />
        </ComboboxPopup>
      </Combobox>
      <Combobox items={FRUITS}>
        <ComboboxInput placeholder="Large" size="lg" />
        <ComboboxPopup>
          <FruitList />
        </ComboboxPopup>
      </Combobox>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Combobox items={fruits}>
  <ComboboxInput placeholder="Small" size="sm" />
  <ComboboxPopup>
    <FruitList />
  </ComboboxPopup>
</Combobox>

<Combobox items={fruits}>
  <ComboboxInput placeholder="Large" size="lg" />
  <ComboboxPopup>
    <FruitList />
  </ComboboxPopup>
</Combobox>`,
        language: "tsx",
      },
    },
  },
}

export const Disabled: Story = {
  render: () => (
    <Combobox disabled items={FRUITS}>
      <ComboboxInput placeholder="Disabled" />
      <ComboboxPopup>
        <FruitList />
      </ComboboxPopup>
    </Combobox>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Combobox disabled items={fruits}>
  <ComboboxInput placeholder="Disabled" />
  <ComboboxPopup>
    <FruitList />
  </ComboboxPopup>
</Combobox>`,
        language: "tsx",
      },
    },
  },
}

export const ClearButton: Story = {
  render: () => (
    <Combobox autoHighlight items={FRUITS}>
      <ComboboxInput placeholder="Select a fruit..." showClear />
      <ComboboxPopup>
        <FruitList />
      </ComboboxPopup>
    </Combobox>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Combobox autoHighlight items={fruits}>
  <ComboboxInput placeholder="Select a fruit..." showClear />
  <ComboboxPopup>
    <FruitList />
  </ComboboxPopup>
</Combobox>`,
        language: "tsx",
      },
    },
  },
}

export const StartAddon: Story = {
  render: () => (
    <Combobox items={FRUITS}>
      <ComboboxInput placeholder="Search fruits..." startAddon="solar:magnifer-linear" />
      <ComboboxPopup>
        <FruitList />
      </ComboboxPopup>
    </Combobox>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Combobox items={fruits}>
  <ComboboxInput
    placeholder="Search fruits..."
    startAddon="solar:magnifer-linear"
  />
  <ComboboxPopup>
    <FruitList />
  </ComboboxPopup>
</Combobox>`,
        language: "tsx",
      },
    },
  },
}

export const Groups: Story = {
  render: () => (
    <Combobox items={FRUIT_GROUPS}>
      <ComboboxInput aria-label="Search fruits" placeholder="e.g. Mango" />
      <ComboboxPopup>
        <ComboboxEmpty>No fruits found.</ComboboxEmpty>
        <ComboboxList>
          {(group: FruitGroup) => (
            <Fragment key={group.value}>
              <ComboboxGroup items={group.items}>
                <ComboboxGroupLabel>{group.value}</ComboboxGroupLabel>
                <ComboboxCollection>
                  {(fruit: Fruit) => (
                    <ComboboxItem key={fruit.value} value={fruit}>
                      {fruit.label}
                    </ComboboxItem>
                  )}
                </ComboboxCollection>
              </ComboboxGroup>
              {group.value !== "Tropical" && <ComboboxSeparator />}
            </Fragment>
          )}
        </ComboboxList>
      </ComboboxPopup>
    </Combobox>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Combobox items={fruitGroups}>
  <ComboboxInput aria-label="Search fruits" placeholder="e.g. Mango" />
  <ComboboxPopup>
    <ComboboxEmpty>No fruits found.</ComboboxEmpty>
    <ComboboxList>
      {(group) => (
        <Fragment key={group.value}>
          <ComboboxGroup items={group.items}>
            <ComboboxGroupLabel>{group.value}</ComboboxGroupLabel>
            <ComboboxCollection>
              {(fruit) => (
                <ComboboxItem key={fruit.value} value={fruit}>
                  {fruit.label}
                </ComboboxItem>
              )}
            </ComboboxCollection>
          </ComboboxGroup>
          <ComboboxSeparator />
        </Fragment>
      )}
    </ComboboxList>
  </ComboboxPopup>
</Combobox>`,
        language: "tsx",
      },
    },
  },
}

export const Multiple: Story = {
  render: () => (
    <Combobox items={FRUITS} multiple>
      <ChipsValue placeholder="Select fruits..." />
      <ComboboxPopup>
        <FruitList />
      </ComboboxPopup>
    </Combobox>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Combobox items={fruits} multiple>
  <ComboboxChips>
    <ComboboxValue>
      {(value) => (
        <>
          {value.map((fruit) => (
            <ComboboxChip key={fruit.value} aria-label={fruit.label}>
              {fruit.label}
            </ComboboxChip>
          ))}
          <ComboboxChipsInput
            aria-label="Select fruits"
            placeholder={value.length > 0 ? undefined : "Select fruits..."}
          />
        </>
      )}
    </ComboboxValue>
  </ComboboxChips>
  <ComboboxPopup>
    <FruitList />
  </ComboboxPopup>
</Combobox>`,
        language: "tsx",
      },
    },
  },
}

export const InputInsidePopup: Story = {
  render: () => (
    <Combobox items={FRUITS}>
      <ComboboxTrigger className="inline-flex h-[2.25rem] w-full items-center justify-between gap-md rounded-surface border border-neutral-200 bg-surface px-xl text-neutral-900 shadow-surface outline-none sm:h-6xl">
        <ComboboxValue placeholder="Select a fruit..." />
        <Icon className="size-3xl opacity-80" icon="ph:caret-up-down-bold" />
      </ComboboxTrigger>
      <ComboboxPopup>
        <div className="border-b border-neutral-200 p-md">
          <ComboboxInput
            placeholder="Search fruits..."
            showTrigger={false}
            size="sm"
            startAddon="solar:magnifer-linear"
          />
        </div>
        <FruitList />
      </ComboboxPopup>
    </Combobox>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Combobox items={fruits}>
  <ComboboxTrigger className="...select-like trigger classes...">
    <ComboboxValue placeholder="Select a fruit..." />
    <Icon icon="ph:caret-up-down-bold" />
  </ComboboxTrigger>
  <ComboboxPopup>
    <div className="border-b border-neutral-200 p-md">
      <ComboboxInput
        placeholder="Search fruits..."
        showTrigger={false}
        size="sm"
        startAddon="solar:magnifer-linear"
      />
    </div>
    <FruitList />
  </ComboboxPopup>
</Combobox>`,
        language: "tsx",
      },
    },
  },
}

export const Form: Story = {
  render: () => (
    <form
      className="flex flex-col gap-3xl"
      onSubmit={(event) => {
        event.preventDefault()
        const values = new FormData(event.currentTarget).getAll("fruits")
        toast.add({
          description: values.length > 0 ? values.join(", ") : "Nothing selected",
          title: "Submitted",
          type: "success",
        })
      }}
    >
      <Field>
        <FieldLabel>Favorite fruits</FieldLabel>
        <Combobox items={FRUITS} multiple name="fruits" required>
          <ChipsValue placeholder="Select fruits..." />
          <ComboboxPopup>
            <FruitList />
          </ComboboxPopup>
        </Combobox>
        <FieldError>Please select at least one fruit.</FieldError>
      </Field>
      <Button type="submit">Submit</Button>
    </form>
  ),
  parameters: {
    docs: {
      source: {
        code: `<form
  onSubmit={(event) => {
    event.preventDefault()
    const values = new FormData(event.currentTarget).getAll("fruits")
    // submit values
  }}
>
  <Field>
    <FieldLabel>Favorite fruits</FieldLabel>
    <Combobox items={fruits} multiple name="fruits" required>
      <ComboboxChips>
        <ComboboxValue>
          {(value) => (
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
        <FruitList />
      </ComboboxPopup>
    </Combobox>
    <FieldError>Please select at least one fruit.</FieldError>
  </Field>
  <Button type="submit">Submit</Button>
</form>`,
        language: "tsx",
      },
    },
  },
}
