import { mkdir, readFile, writeFile } from "node:fs/promises"
import path from "node:path"
import prettier from "prettier"

import { root } from "./contract-utils.mjs"

const name = process.argv[2]
if (!name || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(name)) {
  console.error("Usage: pnpm component:new <lowercase-hyphen-name>")
  process.exit(1)
}

const pascalName = name
  .split("-")
  .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
  .join("")
const directory = path.join(root, "src", "components", name)
try {
  await mkdir(directory)
} catch {
  console.error(`Component already exists: ${name}`)
  process.exit(1)
}

const manifest = JSON.parse(await readFile(path.join(root, "package.json"), "utf8"))
const contract = {
  id: `component.${name}`,
  family: "unassigned",
  status: "experimental",
  maturity: { previousStatus: "planned", since: manifest.version },
  documentation: `src/components/${name}/README.md`,
  exports: [pascalName, `${pascalName}Props`],
  publicParts: ["root"],
  behaviorOwner: {
    kind: "native",
    owner: manifest.name,
    capabilities: ["content-rendering"],
  },
  anatomy: { structure: `<${pascalName}>content</${pascalName}>` },
  slots: [{ name: "children", required: false, description: "Component content." }],
  states: ["default"],
  requiredStories: ["Default"],
  requiredTests: ["renders-content"],
  tokens: { required: ["color.brand.500"] },
  rules: ["component.colocation"],
  migration: {
    introducedIn: manifest.version,
    classification: "compatible",
    notes: `Introduces ${pascalName}.`,
  },
}

const files = {
  [`${name}.contract.json`]: await prettier.format(JSON.stringify(contract), { parser: "json" }),
  [`${name}.tsx`]: `import * as React from "react"\nimport { tv } from "tailwind-variants"\n\nimport { cn } from "../../lib"\n\nconst ${name.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase())}Styles = tv({\n  base: "text-en-content-primary",\n})\n\nexport interface ${pascalName}Props extends React.HTMLAttributes<HTMLDivElement> {}\n\nexport const ${pascalName} = React.forwardRef<HTMLDivElement, ${pascalName}Props>(\n  ({ className, ...props }, ref) => (\n    <div {...props} ref={ref} className={cn(${name.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase())}Styles(), className)} />\n  ),\n)\n\n${pascalName}.displayName = "${pascalName}"\n`,
  [`${name}.stories.tsx`]: `import type { Meta, StoryObj } from "@storybook/react"\n\nimport { ${pascalName} } from "@enosta/en-ui"\n\nconst meta = { title: "Experimental/${pascalName}", component: ${pascalName} } satisfies Meta<typeof ${pascalName}>\nexport default meta\ntype Story = StoryObj<typeof meta>\n\nexport const Default: Story = { args: { children: "${pascalName}" } }\n`,
  [`${name}.test.tsx`]: `import { render, screen } from "@testing-library/react"\n\nimport { ${pascalName} } from "./${name}"\n\n// Contract coverage: renders-content\ndescribe("${pascalName}", () => {\n  it("renders content", () => {\n    render(<${pascalName}>Example</${pascalName}>)\n    expect(screen.getByText("Example")).toBeInTheDocument()\n  })\n})\n`,
  "README.md": `# ${pascalName}\n\nContract ID: \`component.${name}\`\n\nDefine usage, accessibility, variants, and migration guidance before promoting this component.\n`,
  "index.ts": `export { ${pascalName}, type ${pascalName}Props } from "./${name}"\n`,
}

for (const [filename, contents] of Object.entries(files)) {
  const parser = filename.endsWith(".tsx") || filename.endsWith(".ts") ? "typescript" : undefined
  await writeFile(
    path.join(directory, filename),
    parser ? await prettier.format(contents, { parser }) : contents,
  )
}

const catalogPath = path.join(root, "scripts", "catalog.mjs")
const catalog = await readFile(catalogPath, "utf8")
const names = [...catalog.matchAll(/"([a-z0-9-]+)"/g)].map((match) => match[1])
names.push(name)
await writeFile(
  catalogPath,
  await prettier.format(
    `export const components = ${JSON.stringify([...new Set(names)].sort())}\n`,
    {
      parser: "babel",
    },
  ),
)

const indexPath = path.join(root, "src", "index.ts")
const index = await readFile(indexPath, "utf8")
await writeFile(
  indexPath,
  await prettier.format(`${index.trim()}\nexport * from "./components/${name}"\n`, {
    parser: "typescript",
  }),
)

console.log(`Created contract-first component ${pascalName}.`)
console.log(
  `Next: edit ${path.relative(root, path.join(directory, `${name}.contract.json`))}, then run pnpm contract:generate and pnpm component:check ${name}.`,
)
