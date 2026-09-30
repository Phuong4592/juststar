import type { Meta, StoryObj } from "@storybook/react-vite"
import { Icon } from "@iconify/react"
import { useState } from "react"

import {
  Button,
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
  Select,
  SelectGroup,
  SelectGroupLabel,
  SelectItem,
  SelectLabel,
  SelectPopup,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
  Typography,
} from "@enosta/en-ui"

const FRAMEWORKS = [
  { label: "Next.js", value: "next" },
  { label: "Vite", value: "vite" },
  { label: "Astro", value: "astro" },
]

const FRONTEND = [
  { label: "Next.js", value: "next" },
  { label: "Vite", value: "vite" },
  { label: "Astro", value: "astro" },
]

const BACKEND = [
  { label: "Express", value: "express" },
  { label: "NestJS", value: "nestjs" },
  { label: "Fastify", value: "fastify" },
  { label: "Django", value: "django" },
  { label: "Flask", value: "flask" },
  { label: "Rails", value: "rails" },
]

const LANGUAGES = {
  cpp: "C++",
  csharp: "C#",
  go: "Go",
  java: "Java",
  javascript: "JavaScript",
  php: "PHP",
  python: "Python",
  rust: "Rust",
  swift: "Swift",
  typescript: "TypeScript",
}

type Language = keyof typeof LANGUAGES

const LANGUAGE_VALUES = Object.keys(LANGUAGES).filter((key): key is Language => key in LANGUAGES)

function renderLanguageValue(value: Language[]) {
  if (value.length === 0) {
    return "Select languages…"
  }

  const first = value[0] ? LANGUAGES[value[0]] : ""
  const more = value.length > 1 ? ` (+${value.length - 1} more)` : ""
  return first + more
}

type Option = { label: string; description?: string; icon?: string; value: string }

const CATEGORIES: Option[] = [
  { icon: "solar:layers-minimalistic-linear", label: "Components", value: "components" },
  { icon: "solar:bolt-linear", label: "Performance", value: "performance" },
  { icon: "solar:planet-3-linear", label: "Network", value: "network" },
  { icon: "solar:code-square-linear", label: "Development", value: "development" },
]

const COMMAND_OPTIONS: Option[] = [
  { description: "npx create-next-app", label: "Next.js", value: "next" },
  { description: "npm create vite@latest", label: "Vite", value: "vite" },
  { description: "npm create astro@latest", label: "Astro", value: "astro" },
  { description: "npx create-remix", label: "Remix", value: "remix" },
]

function OptionLabel({ option }: { option: Option }) {
  return (
    <span className="flex flex-col">
      <span className="truncate">{option.label}</span>
      <Typography.Caption className="truncate text-neutral-500">
        {option.description}
      </Typography.Caption>
    </span>
  )
}

function SelectDemoPage() {
  const [code, setCode] = useState("")
  const [loading, setLoading] = useState(false)

  const onSubmit = async (event: {
    preventDefault: () => void
    currentTarget: HTMLFormElement
  }) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    setLoading(true)
    await new Promise<void>((resolve) => {
      setTimeout(resolve, 800)
    })
    setLoading(false)
    const framework = formData.get("framework")
    setCode(typeof framework === "string" ? framework : "")
  }

  return (
    <div className="max-w-[42rem] space-y-[3rem]">
      <header className="space-y-md">
        <Typography.H1 className="text-neutral-900">Select</Typography.H1>
        <Typography.Text className="text-neutral-600">
          Choose a predefined value from a dropdown menu.
        </Typography.Text>
      </header>

      <section>
        <Typography.H2 className="mb-3xl text-neutral-900">Basic</Typography.H2>
        <div className="max-w-[16rem]">
          <Select aria-label="Select framework" defaultValue="next" items={FRAMEWORKS}>
            <SelectTrigger aria-label="Select framework">
              <SelectValue />
            </SelectTrigger>
            <SelectPopup>
              {FRAMEWORKS.map(({ label, value }) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectPopup>
          </Select>
        </div>
      </section>

      <section>
        <Typography.H2 className="mb-3xl text-neutral-900">Sizes</Typography.H2>
        <div className="flex max-w-[16rem] flex-col gap-3xl">
          <Select aria-label="Small select" items={FRAMEWORKS}>
            <SelectTrigger aria-label="Small select" size="sm">
              <SelectValue placeholder="Select framework" />
            </SelectTrigger>
            <SelectPopup>
              {FRAMEWORKS.map(({ label, value }) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectPopup>
          </Select>

          <Select aria-label="Default select" items={FRAMEWORKS}>
            <SelectTrigger aria-label="Default select">
              <SelectValue placeholder="Select framework" />
            </SelectTrigger>
            <SelectPopup>
              {FRAMEWORKS.map(({ label, value }) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectPopup>
          </Select>

          <Select aria-label="Large select" items={FRAMEWORKS}>
            <SelectTrigger aria-label="Large select" size="lg">
              <SelectValue placeholder="Select framework" />
            </SelectTrigger>
            <SelectPopup>
              {FRAMEWORKS.map(({ label, value }) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectPopup>
          </Select>
        </div>
      </section>

      <section>
        <Typography.H2 className="mb-3xl text-neutral-900">Disabled</Typography.H2>
        <div className="max-w-[16rem]">
          <Select aria-label="Select framework" items={FRAMEWORKS}>
            <SelectTrigger aria-label="Select framework" disabled>
              <SelectValue placeholder="Select framework" />
            </SelectTrigger>
            <SelectPopup>
              {FRAMEWORKS.map(({ label, value }) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectPopup>
          </Select>
        </div>
      </section>

      <section>
        <Typography.H2 className="mb-3xl text-neutral-900">Without item alignment</Typography.H2>
        <div className="max-w-[16rem]">
          <Select aria-label="Select framework" items={FRAMEWORKS}>
            <SelectTrigger aria-label="Select framework">
              <SelectValue placeholder="Select framework" />
            </SelectTrigger>
            <SelectPopup alignItemWithTrigger={false}>
              {FRAMEWORKS.map(({ label, value }) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectPopup>
          </Select>
        </div>
      </section>

      <section>
        <Typography.H2 className="mb-3xl text-neutral-900">With groups</Typography.H2>
        <div className="max-w-[16rem]">
          <Select aria-label="Select framework" items={[...FRONTEND, ...BACKEND]}>
            <SelectTrigger aria-label="Select framework">
              <SelectValue placeholder="Select framework" />
            </SelectTrigger>
            <SelectPopup>
              <SelectGroup>
                <SelectGroupLabel>Frontend</SelectGroupLabel>
                {FRONTEND.map(({ label, value }) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectGroup>
              <SelectSeparator />
              <SelectGroup>
                <SelectGroupLabel>Backend</SelectGroupLabel>
                {BACKEND.map(({ label, value }) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectPopup>
          </Select>
        </div>
      </section>

      <section>
        <Typography.H2 className="mb-3xl text-neutral-900">With label</Typography.H2>
        <div className="max-w-[16rem]">
          <Select aria-label="Select fruit" defaultValue={FRAMEWORKS[0]} items={FRAMEWORKS}>
            <SelectLabel>Frameworks</SelectLabel>
            <SelectTrigger aria-label="Select framework">
              <SelectValue />
            </SelectTrigger>
            <SelectPopup>
              {FRAMEWORKS.map((item) => (
                <SelectItem key={item.value} value={item}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectPopup>
          </Select>
        </div>
      </section>

      <section>
        <Typography.H2 className="mb-3xl text-neutral-900">Multiple selection</Typography.H2>
        <div className="max-w-[16rem]">
          <Select
            aria-label="Select languages"
            defaultValue={["javascript", "typescript"]}
            multiple
          >
            <SelectTrigger aria-label="Select languages">
              <SelectValue>{renderLanguageValue}</SelectValue>
            </SelectTrigger>
            <SelectPopup alignItemWithTrigger={false}>
              {LANGUAGE_VALUES.map((value) => (
                <SelectItem key={value} value={value}>
                  {LANGUAGES[value]}
                </SelectItem>
              ))}
            </SelectPopup>
          </Select>
        </div>
      </section>

      <section>
        <Typography.H2 className="mb-3xl text-neutral-900">With icon</Typography.H2>
        <div className="max-w-[16rem]">
          <Select aria-label="Select framework with icon" defaultValue="next" items={FRAMEWORKS}>
            <SelectTrigger aria-label="Select framework with icon">
              <Icon aria-hidden="true" icon="solar:cpu-bolt-linear" />
              <SelectValue />
            </SelectTrigger>
            <SelectPopup alignItemWithTrigger={false}>
              {FRAMEWORKS.map(({ label, value }) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectPopup>
          </Select>
        </div>
      </section>

      <section>
        <Typography.H2 className="mb-3xl text-neutral-900">Options with icon</Typography.H2>
        <div className="max-w-[16rem]">
          <Select
            aria-label="Select category"
            defaultValue={CATEGORIES[0]}
            itemToStringValue={(item) => item.value}
          >
            <SelectTrigger aria-label="Select category">
              <SelectValue>
                {(item: Option) => (
                  <span className="flex items-center gap-md">
                    <Icon icon={item.icon ?? ""} />
                    <span className="truncate">{item.label}</span>
                  </span>
                )}
              </SelectValue>
            </SelectTrigger>
            <SelectPopup>
              {CATEGORIES.map((item) => (
                <SelectItem key={item.value} value={item}>
                  <span className="flex items-center gap-md">
                    <Icon icon={item.icon ?? ""} />
                    <span className="truncate">{item.label}</span>
                  </span>
                </SelectItem>
              ))}
            </SelectPopup>
          </Select>
        </div>
      </section>

      <section>
        <Typography.H2 className="mb-3xl text-neutral-900">With object values</Typography.H2>
        <div className="max-w-[16rem]">
          <Select
            aria-label="Select framework with command"
            defaultValue={COMMAND_OPTIONS[0]}
            itemToStringValue={(item) => item.value}
          >
            <SelectTrigger aria-label="Select framework with command" className="py-xs">
              <SelectValue>{(item: Option) => <OptionLabel option={item} />}</SelectValue>
            </SelectTrigger>
            <SelectPopup>
              {COMMAND_OPTIONS.map((item) => (
                <SelectItem key={item.value} value={item}>
                  <OptionLabel option={item} />
                </SelectItem>
              ))}
            </SelectPopup>
          </Select>
        </div>
      </section>

      <section>
        <Typography.H2 className="mb-3xl text-neutral-900">Form integration</Typography.H2>
        <form
          className="flex w-full max-w-[16rem] flex-col gap-3xl"
          onSubmit={(event) => {
            void onSubmit(event)
          }}
        >
          <Field>
            <FieldLabel>Framework</FieldLabel>
            <Select aria-label="Select framework" items={FRAMEWORKS} name="framework" required>
              <SelectTrigger aria-label="Select framework">
                <SelectValue placeholder="Select a framework" />
              </SelectTrigger>
              <SelectPopup>
                {FRAMEWORKS.map(({ label, value }) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectPopup>
            </Select>
            <FieldDescription>Pick your favorite.</FieldDescription>
            <FieldError>Please select a value.</FieldError>
          </Field>

          <Button loading={loading} type="submit">
            Submit
          </Button>
        </form>
        {code && (
          <Typography.Text className="mt-md text-neutral-500">
            Selected framework:{" "}
            <Typography.Label className="text-neutral-900">{code}</Typography.Label>
          </Typography.Text>
        )}
      </section>
    </div>
  )
}

const meta = {
  title: "Forms/Select",
  component: Select,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  render: () => (
    <Select items={FRAMEWORKS}>
      <SelectTrigger aria-label="Select framework">
        <SelectValue placeholder="Select a framework" />
      </SelectTrigger>
      <SelectPopup>
        {FRAMEWORKS.map((item) => (
          <SelectItem key={item.value} value={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </SelectPopup>
    </Select>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Select items={frameworks}>
  <SelectTrigger aria-label="Select framework"><SelectValue placeholder="Select a framework" /></SelectTrigger>
  <SelectPopup>
    {frameworks.map((item) => <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>)}
  </SelectPopup>
</Select>`,
        language: "tsx",
      },
    },
  },
}

export const Grouped: Story = {
  render: () => (
    <Select>
      <SelectTrigger aria-label="Select framework">
        <SelectValue placeholder="Select a framework" />
      </SelectTrigger>
      <SelectPopup>
        <SelectGroup>
          <SelectGroupLabel>Frontend</SelectGroupLabel>
          {FRONTEND.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectGroupLabel>Backend</SelectGroupLabel>
          {BACKEND.slice(0, 3).map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectPopup>
    </Select>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Select>
  <SelectTrigger aria-label="Select framework"><SelectValue placeholder="Select a framework" /></SelectTrigger>
  <SelectPopup>
    <SelectGroup><SelectGroupLabel>Frontend</SelectGroupLabel>...</SelectGroup>
    <SelectSeparator />
    <SelectGroup><SelectGroupLabel>Backend</SelectGroupLabel>...</SelectGroup>
  </SelectPopup>
</Select>`,
        language: "tsx",
      },
    },
  },
}

export const Overview: Story = {
  render: () => (
    <main className="bg-canvas p-3xl text-on-canvas sm:p-5xl md:p-6xl">
      <SelectDemoPage />
    </main>
  ),
}
