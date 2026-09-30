# @enosta/en-ui

## 1.3.3

### Patch Changes

- 3fb8a98: Add contract-driven component context, installed-skill drift detection, consumer-defined rendered auditing, safe content-width checks, workflow-skill integration, and explicit support for creative consumer-owned capabilities while simplifying the AI composition workflow and strengthening published component guidance.

## 1.3.2

### Patch Changes

- 9f63f0a: Add the `Calendar` component built on `@daypicker/react`: a themed date grid with single, multiple, and range selection, month/year dropdown navigation, disabled-date matchers, and roving-tabindex keyboard support. Day cells are sized by the customizable `--cell-size` CSS variable. The previously pending removal changeset for `Calendar` is superseded.
- 9f63f0a: Merge `CheckboxGroup` into `Checkbox` as the compound part `Checkbox.Group`. The standalone `CheckboxGroup` export and the `component.checkbox-group` contract are removed; group layout now ships in `checkboxVariants`. Replace `<CheckboxGroup>` with `<Checkbox.Group>` — all other props (`value`, `defaultValue`, `onValueChange`, `allValues`, `disabled`) are unchanged.
- 9f63f0a: Re-align Combobox with its Base UI behavior owner and repository conventions. Rename the `ComboboxInput` and `ComboboxChipsInput` size value `default` to `md` (matching Input and Button), import the shared `PropsWithClassName` helper, expand the contract to document real props, states, stories, and tests, lead the Storybook sidebar with the composite Overview story with per-scenario stories and copyable TSX source, cover single and multiple selection interaction in tests, and rewrite the README API reference with per-part prop tables.
- 9f63f0a: Export `tv` and `cn` from the package entry point so consumers can compose variants with the same En UI tailwind-merge config (`import { tv, cn } from "@enosta/en-ui"`).
- 9f63f0a: Align Field with the repository component conventions: export `fieldVariants` and the `FieldProps` type, and add `data-slot` attributes (`field-root`, `field-label`, `field-item`, `field-description`, `field-error`) for part targeting. Expand the test suite to cover rendering, class merging, label-control association, invalid and disabled states, and the validity render prop, and rework the stories so the Overview leads the sidebar with required, disabled, invalid, live-validation, and item-group sections using token-only utilities. The contract now documents real states and the full story and test sets, and the README gains a complete API reference including `FieldError`'s `match` prop and `FieldLabel`'s `nativeLabel`.
- 9f63f0a: Fix Field error text contrast for WCAG 2.2 AA: FieldError now uses `text-error-600` (5.02:1 on canvas) instead of `text-error-500` (3.76:1). Field and Input stories also label their toggle and standalone inputs for screen readers.
- 9f63f0a: Fix component typography sizes being silently dropped during class merging whenever a variant also sets a text color (for example Badge sizes in Storybook). Recipes now share a `createTV` instance carrying the design-token merge config instead of mutating the global `defaultConfig`, so merging is correct regardless of module import order, and `cn` merges with the same token-aware config.
- 9f63f0a: Align Input with the repository story conventions: the Overview story now leads the sidebar with size, affix, state, type, and unstyled sections, and every story ships copyable TSX source. Add `data-slot` attributes (`input-root`, `input-input`, `input-icon`) for part targeting, expand the test suite to cover sizes, affixes, states, and passthrough behavior, and correct the README API table, anatomy, and CSS variable docs.
- 9f63f0a: Fix `PropsWithClassName` to distribute over union prop types so components that pass union-typed props through the shared helper keep a correct optional `className`.
- 9f63f0a: Add a Sheet component: a dialog-based flyout that opens from a screen edge (`right`, `left`, `top`, `bottom`) with a floating `inset` variant for desktop, an optional built-in close button, scrollable `SheetPanel` body content, and `default`/`bare` footer treatments. Focus trapping, Escape dismissal, and focus restoration are inherited from the protected Base UI dialog behavior.
- 9f63f0a: Add a Textarea component: a styled native `<textarea>` with `sm`/`md`/`lg` sizes, native `rows` passthrough, invalid and disabled states driven by native semantics, and an `unstyled` mode. The component wraps the textarea in `Field.Control` internally, so label, description, and error wiring works with `Field` out of the box while the element still renders standalone.

## 1.3.1

### Patch Changes

- 4f6f028: Restrict the public package to atoms and interaction primitives by removing application shells, headers, sidebars, page helpers, split layouts, authentication pages, chat pages, and workspaces. Update the installed consumer and visual-audit skills with accurate physical contract discovery, product-agnostic consumer-owned composition, explicit composition-import diagnostics, preserved human art direction, and a screenshot-led component-selection and visual-quality workflow.
- Make the AI instruction installer target the pnpm workspace root when invoked through a member package, document workspace-scoped binary execution, teach the packaged consumer skills to select commands from repository configuration, and make the consumer skill own the canonical visual-quality and WCAG guidance used during implementation and audit.

## 1.3.0

### Minor Changes

- 926ea19: Export Tailwind theme aliases so consumers with their own Tailwind v4 setup can generate the same design-token utilities as the library. Import `@enosta/en-ui/themes/default.css` and `@enosta/en-ui/tailwind.css` in your CSS entry. The library build is unchanged; the theme aliases now live in `src/style/tailwind-theme.css`.

## 1.2.0

### Minor Changes

- bc0ac1a: Add the Alert component: a non-interactive callout with `default`, `info`, `success`, `warning`, and `error` variants, composed from `Alert`, `AlertTitle`, `AlertDescription`, and `AlertAction`, rendering `role="alert"` with theme token pairs.
- add3afa: Align Dialog with the En UI component contract: styles now flow through an exported `dialogVariants` slots API, the footer `variant` and panel `scrollFade` props are documented in the contract and README, and Dialog ships a composite Overview story alongside expanded contract coverage tests.
- add3afa: Align Popover with the En UI component contract: styles now flow through an exported `popoverVariants` slots API, prop types use the shared `PropsWithClassName` helper, and the component ships a composite Overview story alongside expanded contract coverage tests.
- c7421c4: Add a new Tabs component for toggling between related panels. Ships `Tabs`, `TabsList`, `TabsTab`, and `TabsPanel` on a Base UI adapter, matching the coss/ui reference: a segmented default variant with an inset sliding pill indicator, an underline variant with a brand line indicator, `sm`/`default`/`lg` optical sizes with responsive control heights, per-tab size override, and vertical orientation. Includes stories, tests, and README.
- add3afa: Align Tooltip with the En UI component contract and add grouped/animated tooltip support: styles flow through an exported `tooltipVariants` slots API, the README documents the real `trigger`, `popup`, `side`, `align`, `sideOffset`, `anchor`, and `classNames` props, and new composable parts `TooltipProvider`, `TooltipRoot`, `TooltipCreateHandle`, `TooltipTrigger`, and `TooltipPopup` enable shared-delay grouped tooltips and single-popup animated compositions. Ships a composite Overview story plus Grouped and Animated stories alongside expanded contract coverage tests.

## 1.1.0

### Minor Changes

- fa605ca: Add token-backed `xs`, `sm`, `md`, and `lg` sizes to Avatar while preserving the existing 32px appearance as the default.

  Align Avatar's contract, stories, tests, and documentation with its Base UI image loading and fallback behavior.

- 7f9e10c: Add render-prop composition to Badge for links and custom elements while preserving badge styling and semantics.

  Align Badge stories, tests, and documentation with its variants, sizes, icons, links, and count usage.

- d44c429: Change `Button` loading state to keep the label visible instead of hiding content under a centered spinner.

  - When `loading` is true, the start icon slot is replaced by the spinner, the end icon is hidden, and the label remains in place. Buttons without a start icon still show the leading spinner.
  - The invisible content wrapper is gone; children render directly inside the button.
  - The contract's `loading` description now reflects this behavior, and the spinner uses the `space.3xl` token instead of the previous `4xl` overlay.

- 5d9c42d: Expose Card's token-backed slot variants and shared props type for consistent custom composition.

  Align Card and CardFrame stories, tests, documentation, and anatomy contract with their public parts and recommended usage.

- cad3be6: Add render-prop composition to every Card and CardFrame part for semantic elements while preserving token styling and data-slot markers.

  Redesign Card stories with a sectioned Overview page and focused Basic, WithActions, CardFrame, and WithRender examples.

- be148fc: Compose `FrameHeader`, `FramePanel`, and `FrameFooter` as direct children of `Frame`, matching the documented anatomy; `FramePanel` now holds arbitrary content instead of wrapping the header and footer.
- be148fc: Drop zebra striping from `Table` body rows; rows now share a single surface with hover and selected emphasis only.
- 1b9c357: Restrict Tailwind color utilities to the theme token set from `src/style/themes/default.css`. The default Tailwind palette is disabled at build time, color tokens are exposed as named classes (for example `bg-brand-500` instead of `bg-(--color-brand-500)`), and a new `audit-token-classes` check enforces the constraint in `pnpm design:check`. Compiled CSS still references the same CSS variables, so runtime theme overrides keep working unchanged.
- 820748a: Restrict Tailwind border-radius utilities to the theme token set from `src/style/themes/default.css`. The default Tailwind radius scale is disabled at build time, radius tokens are exposed as named classes (for example `rounded-control` instead of `rounded-lg` or `rounded-(--radius-control)`), and the `audit-token-classes` check now enforces the constraint in `pnpm design:check`. Component contract verification now recognizes named token classes, which surfaced and fixed stale radius and color token declarations in five contracts. Note: `rounded-full` usages map to the `rounded-pill` token, and the table card-variant cell corners now use `radius.surface` (previously 12px) to match its declared contract.
- 26c9a4f: Restrict Tailwind shadow utilities to the theme token set from `src/style/themes/default.css`. The default Tailwind shadow scales are disabled at build time, shadow tokens are exposed as named classes (for example `shadow-surface` instead of `shadow-md` or `shadow-(--shadow-surface)`), and the `audit-token-classes` check enforces the constraint in `pnpm design:check`. A new `--shadow-hairline` token replaces the two ad-hoc spellings of the 1px edge highlight used across nine components (identical value, no visual change), `--shadow-inset` is exposed as `shadow-inset`, and component contracts now declare the shadow tokens they actually use.
- 40dea09: Restrict Tailwind typography utilities to the theme token set from `src/style/themes/default.css`. The default Tailwind font-size, line-height, font-weight, and letter-spacing utilities are disabled at build time. Typography is tokenized per role (`--font-size-display-2xl` … `--font-size-eyebrow-md`, with matching `--line-height-*`, `--font-weight-*`, and `--letter-spacing-*` tokens) and exposed as named classes such as `text-body-sm` or `tracking-eyebrow-lg`; each `text-<role>` utility pairs with its role line-height, overridable via `leading-<role>`. The Typography component and every component, pattern, and story were migrated off `text-xs`/`text-sm`/`text-lg` and arbitrary pixel sizes (no visual change except a few intentional normalizations in `LoginPage` and dense-control line heights), the dead `font-heading` class was removed, `theme.contract.json` declares the four typography scales, and `pnpm design:check` audits token classes via `audit-token-classes`.
- 85b5580: Expose the `--space-*` scale from `src/style/themes/default.css` as named Tailwind spacing utilities and disable Tailwind's default numeric spacing scale.

  - New named utilities: `gap-md`, `px-xl`, `py-4xl`, `m-2xs`, `space-y-md`, `size-3xl`, `min-h-6xl`, `translate-y-3xl`, and `--spacing-0` for zero resets (`p-0`, `inset-0`). `@theme inline` references the CSS variables directly, so runtime theme overrides keep working.
  - `--spacing: initial` in `src/style/index.css` drops the numeric multiplier, so `p-4`/`gap-2`/`w-72`/`translate-x-1` and bare `--spacing(N)` no longer compile. Migrated every spacing, sizing, and positioning utility in components, patterns, stories, and the Storybook preview to named tokens (value-matched) or arbitrary values (`p-[48px]`); container widths keep rem values as `max-w-[28rem]`.
  - Fixes a regression introduced with the spacing tokens: named `max-w-md`/`max-w-lg`/`max-w-xl` were resolving to spacing values (8/10/12px) instead of container rem widths, collapsing dialogs and login regions; they are now `max-w-[Nrem]`.
  - `audit-token-classes` (in `pnpm design:check`) now flags the numeric spacing scale, the `x-(--space-*)` shorthand, the `--spacing(...)` function, and named `max-w-*` container classes. Component contracts declare the space tokens they now reference; run `pnpm contract:generate` after touching them.

### Patch Changes

- 4e67dfb: Make application-owned pattern contracts the default in the packaged consumer skill and remove the prescriptive consumer page showcase from Storybook.
- a23519a: Align Kbd and Separator with the component verification workflow: contracts now declare the theme tokens they resolve, Kbd renders keys through the canonical mono typography tokens, Separator exposes a `data-slot` hook, and both ship Overview-first Storybook stories with contract-shaped tests and refreshed documentation.
- be148fc: Fix the Skeleton shimmer so the highlight band is visible again: the background gradient no longer uses `background-attachment: fixed`, which made the band resolve against the viewport instead of each skeleton element. The shimmer now also pauses under `prefers-reduced-motion`.
- be148fc: Align Table with the component verification workflow: the contract now declares the theme tokens it resolves and the multi-part anatomy, styling is composed through tailwind-variants slots with `tableVariants` exported, and the component ships Overview-first Storybook stories with contract-shaped tests and refreshed documentation.
- b1546af: Reduce `Typography.H1` from 36px to 32px and synchronize the Typography and spacing guidance with the current token scale. Product identifiers, timestamps, currency, counts, environments, and versions now stay in Nunito examples and guidance; mono is reserved for code and machine-oriented text.

## 1.0.0

### Major Changes

- dc457dd: Make Typography the canonical public text API with compact Nunito compound presets, remove the overlapping Text export, reserve mono typography for technical values, add alternating Table row surfaces, and strengthen AI consumer rules for typography and structural separation.

### Patch Changes

- 9d18dae: Redesign the public landing and documentation pages with denser En UI compositions, a persistent theme selector, integrated consumer-skill installation, the Enosta SVG mark, a dedicated design-language reference page, and a task-first renewal intervention example aligned with the consumer composition guidance.
- 41da6a7: Keep regular Storybook stories on the default light theme while allowing the theme-aware renewal previews to exercise experimental themes.

## 0.4.0

### Minor Changes

- 98ed1cd: Add responsive application-shell and page-layout components with comfortable or compact composition density, plus provider-neutral AI chat and resizable chat-preview workspace patterns.
- 98ed1cd: Tighten SidebarNavigation density and add semantic two-level lists with accessible disabled reasons for permission-gated and coming-soon destinations.

### Patch Changes

- 1bc9dbf: Strengthen the consumer AI skill with explicit composition decisions, anti-slop source diagnostics, expressive En UI layout guidance, responsive navigation parity, and required rendered validation for substantial page work.
- 8c54832: Refresh the public landing page, setup guide, catalog, maturity guidance, and package documentation for the 0.4.0 catalog, with React-authored pages pre-rendered to static HTML.
- 82f32da: Preserve inline padding in consumer summary cells, reflow nested responsive panes without overlap, keep AI chat composers visible inside their panel, and show complete generated composition source in Storybook Docs.
- 98ed1cd: Keep fixed-height button labels on one line so long content cannot wrap into clipped or overlapping control geometry.

## 0.3.0

### Minor Changes

- 827571b: Add a filterable Combobox with single and multiple selection, local and async data support, compound composition, and accessible validation states.
- 5e05769: Add a LoginPage pattern under src/patterns: a responsive authentication shell owning the page landmark, single heading hierarchy, bounded form measure, and product-context aside, composed from En UI form controls.
- 0358439: Add a stable Toast component with manager-driven notifications, semantic status treatments, stacked positioning, deduplicated updates, promise lifecycle handling, actions, and accessible dismissal.
- 0358439: Add a token-driven Input with native input behavior, responsive control sizes, prefix and suffix adornments, composed-control styling, and accessible invalid, disabled, file, and autofill states.
- 0358439: Add semantic Typography with the complete display, heading, body, label, mono, and eyebrow scale, native element defaults, and element overrides.
- 4c7168d: Refine Button variants around En UI semantic color tokens and protected edge, highlight, and pressed-state variables. Filled and soft danger treatments now preserve WCAG 2.2 AA text contrast, while ghost and neutral states stay on the documented theme ramp.
- 4c7168d: Redesign the component contract schema (v2): replace the fixed `variants` and `sizes` fields with a generic `props` array that declares any consumer-facing prop (enum, boolean, string, number, or node) with values and defaults, and turn `anatomy` into a JSX composition structure with optional part descriptions. Contracts now ship schema version 2.0.0 and the generated `src/component-types.ts` metadata module is removed; import prop types directly from each component instead.

  Rebuild the visual quality contract (v2) and its token audit on the unprefixed theme variables: contrast pairs are derived from the actual Button variants and theme color pairs with oklch color math, shadow roles, control height roles, and the spacing scale replace the removed typography, spacing-alias, and density tokens. The audit reports two declared non-blocking AA gaps (danger-soft active at 4.3:1 and the focus ring at 2.84:1 non-text) until the theme ramps are tuned.

- 635f738: Expand the packaged En UI consumer skill into a product-aware composition framework with PRODUCT.md discovery and bootstrap guidance, repository-aware artifact placement, separate prototype and specification flows, version-aware operational pattern fallbacks, responsive and typography-overflow review, an advisory rendered-page audit helper, En UI-specific anti-slop guidance, and complete-directory installation.
- 4c440ab: Replace the sans typeface with Nunito (Fontsource variable, weights 200-1000). The `font.family.sans` token, the Tailwind `--font-sans` theme variable, and the docs site body font now resolve to Nunito; Geist Mono remains the mono face. The package now ships every font asset referenced by its compiled stylesheet, and Geist Sans is no longer a dependency.
- c5824d8: Standardize the monospace foundation on Geist Mono and remove the dead IBM Plex assets that were only loaded by Storybook. The package now uses Fontsource dependencies with Vietnamese coverage so its declared Nunito sans and Geist Mono families load consistently for consumers.

### Patch Changes

- Align the published compact, comfortable, and spacious control-height contract and documentation with the existing 28px, 32px, and 36px theme tokens.
- Restore stable Storybook WCAG 2.2 AA coverage by correcting validation, calendar, placeholder, and danger-state contrast; supplying Combobox and Select trigger names; and composing Tooltip triggers without nested interactive elements.
- 8b72a5c: Align Spinner documentation, stories, tests, and contract with its Iconify-based API and Tailwind animation.
- 4c7168d: Restructure the component catalog families: move Calendar to Forms, Tabs to Navigation, and Menu and Tooltip to Overlays; document Date Picker as a composition pattern instead of a catalog component; and clarify the Drawer (mobile-first) versus Sheet (desktop-oriented) boundary in COMPONENTS.md.
- 841e603: Fix Badge success, warning, and destructive text contrast to meet WCAG 2.2 AA by using darker foreground/background tokens.
- 827571b: Keep the Checkbox corner radius visually consistent across unchecked, checked, and indeterminate states.
- 635f738: Fix the packaged `en-ui-init-ai` and `en-ui-check` commands so pnpm bin shims execute them instead of silently returning success, and verify both commands through a packed consumer installation.

## 0.2.1

### Patch Changes

- Fix primary button-link foreground colors on the landing and documentation pages, keep Alert Dialog stories closed until viewer interaction, and add regression coverage for both behaviors.
- Format design-system release evidence consistently so repository checks pass in CI.

## 0.2.0

### Minor Changes

- badf8de: Add contract-generated component metadata, stronger package verification, repository component tooling, and migrate the complete stable component catalog to Tailwind CSS v4 plus tailwind-variants while preserving public APIs and CSS-variable customization.
- 7958686: Add stable list-page, multi-field data-grid, and responsive login-page patterns; update packaged AI guidance and the public documentation site to prefer these patterns before application-owned layouts.
