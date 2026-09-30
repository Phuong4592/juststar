---
name: en-ui-component
description: Create or change @enosta/en-ui React components following the repository's contract-first workflow and the Button conventions (implementation, contract, stories, tests, README). Use for any task that adds, edits, or reviews a component in src/components/ — including "add a variant", "new component", "fix stories/tests/README", even when the component name is not mentioned explicitly.
---

# En UI Component

`src/components/button/` is the canonical exemplar. Every convention below is
derived from its six files. Read all of them before writing any component code:

- `src/components/button/button.tsx` (implementation)
- `src/components/button/button.contract.json` (contract)
- `src/components/button/button.stories.tsx` (stories)
- `src/components/button/button.test.tsx` (tests)
- `src/components/button/README.md` (docs)
- `src/components/button/index.ts` (exports)

## Guardrails

- `*.contract.json` and `src/style/themes/default.css` are guarded. Never edit
  them silently: present the exact intended change as a unified diff in a
  fenced `diff` block, then get explicit user approval before editing. Do not
  summarize or describe a contract proposal in prose instead of showing the
  diff. Creating a brand-new contract via `pnpm component:new` is not a
  guarded change.
- Never widen or disable theme tokens to make a style "work". If a token is
  genuinely missing, propose adding it to the theme (guarded, ask first).

### Guarded change proposal format

Build the proposal from the current file contents so the user can review the
actual patch rather than infer it from prose. Use standard unified diff syntax:

```diff
--- a/src/components/<name>/<name>.contract.json
+++ b/src/components/<name>/<name>.contract.json
@@
   "existing": "context",
+  "proposed": "value"
```

- Include `---` and `+++` file headers, an `@@` hunk marker, unchanged context,
  and exact added/removed JSON lines. Never use ellipses, pseudocode, comments,
  or a prose substitute inside the diff.
- Show only intended guarded-file changes. If both the contract and theme need
  changes, include a complete diff for each file in the same proposal.
- Put rationale outside the diff only when it clarifies a non-obvious choice;
  the diff remains the proposal's source of truth.
- End with an explicit approval question and do not edit either guarded file
  until the user approves the shown patch. If the proposal changes, show the
  revised diff and request approval again.

## Tailwind utilities — src/style/index.css is the source of truth

The theme resets Tailwind's defaults (`--color-*: initial`, `--spacing:
initial`, `--text-*: initial`, ...), so most stock utilities do not exist.
Invalid utilities silently render nothing. Allowed set:

| Family     | Valid utilities                                                                                                                                                                            |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Color      | `neutral/brand/accent/info/success/error/warning-{25..950}`, pairs (`surface`, `on-surface`, `canvas`, `on-canvas`, `container`, `overlay`, `bg-brand`, `on-brand`, ...), `white`, `black` |
| Radius     | `rounded-none/control/surface/overlay/pill`                                                                                                                                                |
| Shadow     | `shadow-none/hairline/surface/raised/overlay/modal`, `inset-shadow-*`                                                                                                                      |
| Spacing    | named only: `2xs xs sm md lg xl 2xl 3xl 4xl 5xl 6xl` and `0` (e.g. `gap-md`, `px-xl`, `size-6xl`)                                                                                          |
| Typography | `text-{display,heading,body,label,mono,eyebrow}-*`, `leading-*` roles, `tracking-*` roles, `font-{light,normal,medium,semibold,bold}`                                                      |

Numeric spacing (`p-4`, `gap-2`, `w-72`, `size-6`, `-space-x-2`), stock sizes
(`text-sm`, `rounded-md`, `shadow-sm`), and default palette colors
(`bg-blue-500`, `text-gray-600`) are all invalid here.

**Arbitrary (JIT) values — avoid.** Allowed only in three narrow cases:

1. Protected component variables: `[--btn-edge:0_1px_oklch(...)]`
2. `calc()` derived from theme variables: `rounded-[calc(var(--radius-control)-1px)]`
3. Fixed control heights with no token equivalent: `h-[1.75rem]`

Always prefer a token first. Structural selectors such as
`in-[[data-slot=...]]` or `has-data-[slot=...]` target structure, not styling,
and are fine.

## Implementation

- `import { type PropsWithClassName } from "../../types"` — never redefine the
  helper locally.
- Import `tv`, `cn`, and `VariantProps` from `"../../tailwind-variants"` —
  never from `"tailwind-variants"` directly: the wrapper's `createTV`
  token-aware merge config is what keeps `text-<role>` sizes and
  `text-<color>` classes from colliding.
- `export const <name>Variants = tv({ base, variants, defaultVariants })`.
  Size/variant are enum props with defaults — never hardcode a single size.
  Use the `slots` form only for multi-part components, mirroring
  `src/components/avatar/avatar.tsx`.
- Props type: `PropsWithClassName<Base.Props & VariantProps<typeof <name>Variants> & { extras }>`.
- Named function components, React 19 idioms: no `forwardRef`, `useMemo`,
  `useCallback` unless the user asks.
- Destructure props with defaults; spread the rest onto the base element.
  Merge consumer classes through the variants call:
  `buttonVariants({ className, size, variant })`.
- Behavior owner is a Base UI adapter (`@base-ui/react`) or a native element.
  Add `data-slot="<name>-<part>"` to every rendered part (repo-wide convention).
- Bake accessibility into the variants (`focus-visible:*`, `disabled:*`) and
  map state props to ARIA (`aria-busy`, ...).
- Reuse siblings via relative imports (`../spinner/spinner`); do not add
  dependencies.
- No colocated CSS file unless keyframes or protected selectors demand it —
  the repository check enforces a small protected-style budget.

## Contract

Contract-first: change the contract before the code (guarded — ask first).
Every field must describe reality, not boilerplate:

- `exports[]` matches `index.ts` exactly.
- `props[]` documents every custom prop (`kind`, `values`, `default`,
  `description`) — an empty `props[]` is only acceptable when the component
  truly adds nothing beyond passthrough.
- `anatomy.structure` and `slots[]` reflect actual usage; if the component
  does not take `children`, do not claim it does.
- `states[]` lists real states (e.g. `loading`, `disabled`, `fallback`).
- `requiredStories` / `requiredTests` name stories and tests that exist.
- `tokens.required` lists every theme token the implementation resolves.
  `pnpm component:check <name>` audits this against
  `src/style/themes/default.css`: color, radius, shadow, and spacing
  utilities all count — including ones hidden in `[&_svg...]` selectors
  (e.g. `size-xl` requires `space.xl`). Typography utilities (`text-*`,
  `font-*`) are not tracked, so do not declare `font.size.*` tokens.
- `behaviorOwner.capabilities` lists only true capabilities — a
  non-interactive component has no `keyboard-interaction`.
- `rules` includes `component.<name>.preserve-semantics`.

## Stories

Follow `src/components/button/button.stories.tsx`:

1. `const meta = { title: "Category/Name", component } satisfies Meta<typeof X>`,
   `export default meta`, `type Story = StoryObj<typeof meta>`.
2. Export `Overview` immediately after `type Story`, before every autodocs story,
   so it stays first in the Storybook sidebar. `Overview` is the composite
   showcase page: sections per variant/size/state with `Typography` headers and
   an interactive `useState` demo where relevant. It carries
   `tags: ["!autodocs"]`, `parameters: { layout: "fullscreen" }`, and wraps
   content in `<main className="bg-canvas p-3xl text-on-canvas">`.
3. Autodocs stories are the variant showcase: one focused scenario per story —
   `Basic` (with `args`), then feature stories for states, sizes,
   compositions, and every contract-required story. Every story MUST include
   `parameters.docs.source.code` with copyable TSX and `language: "tsx"`
   (`pnpm story:check` fails without it).

Story layout classes use token utilities only (`space-y-md`, `gap-xl`,
`mb-3xl`) — no `max-w-[42rem]`, `space-y-[3rem]`, or `-space-x-2`. Ring color
utilities such as `ring-white` set only `--tw-ring-color`; pair them with a ring
width such as `ring-2` to render a visible ring. Icon-only controls get
`aria-label`. Import sibling components from `@enosta/en-ui` and icons from
`@iconify/react`.

## Tests

Tests cover both logic and visuals, mirroring `button.test.tsx`:

- Line 1 is the coverage marker: `// Contract coverage: <requiredTests joined
by ", ">` — and matching `describe` blocks must actually exist.
- Logic: renders via role queries, consumer `className` merge, every variant
  and size, state behavior (`loading`, `disabled`), events via `userEvent`,
  native/adapter prop passthrough, and each contract rule.
- Visual: assert token-derived classes on the rendered DOM (e.g.
  `className` contains `bg-brand-500`, `whitespace-nowrap`) so restyling away
  from tokens or protected behavior fails the suite.
- Size assertions can use height/padding classes (`h-5xl`, `px-2xs`) and
  `text-<role>` size classes: token-aware merging keeps font sizes and text
  colors in separate namespaces, so `text-body-sm` and `text-on-brand`
  coexist — as long as `tv`/`cn` come from `../../tailwind-variants`.

Run the focused file: `pnpm exec vitest run src/components/<name>`.

## README

Follow `src/components/button/README.md` section order exactly:

1. `# <Name>`
2. `Contract ID: \`component.<name>\``
3. One-line description.
4. `## Installation` (repo norm: `pnpm add @enosta/en-ui` + styles import).
5. `## Usage` — import from `@enosta/en-ui`, examples incl. edge cases.
6. `## Guidelines` or `## Guidance` — component-specific selection and behavioral rules. Use one section unless the distinction adds useful information.
7. `## Anatomy` — real usage + `Public exports:` list.
8. `## API Reference` — full prop table including passthrough props
   (`render`, `focusableWhenDisabled`, `nativeButton`, `className`).
9. `## CSS Variables` — only when the contract declares `componentVariables`.
10. `## Accessibility`, `## Storybook`, `## Migration` (classification + one-line note).

Never document props the component does not have, and never leave the primary
API out of the table.

## Workflow

1. Read `AGENTS.md`, the six Button files above, and the target component's
   current files before editing.
2. If the change requires editing a contract, present its exact unified diff
   in a fenced `diff` block and ask for approval (guarded). Do not replace the
   diff with a prose description.
3. New component: `pnpm component:new <name>`, then rewrite every scaffolded
   file to these conventions — the scaffold is intentionally stale (uses
   `forwardRef`, imports a nonexistent `../../lib`, bare `describe`). Register
   the component in `src/index.ts` (sorted; `component:new` handles
   `scripts/catalog.mjs`).
4. `pnpm contract:validate <name>` and `pnpm contract:generate`.
5. Implement code, stories, tests, and README per the sections above.
6. Verify: `pnpm component:check <name> && pnpm generated:check &&
pnpm story:check && pnpm exec vitest run src/components/<name> &&
pnpm design:tokens && pnpm lint && pnpm typecheck`.
7. Add a Changeset for consumer-visible changes; `pnpm check` before release.
