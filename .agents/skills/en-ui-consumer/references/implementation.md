# Production implementation

Use this workflow when changing production React UI in an En UI consumer.

## Inspect

1. Read the feature requirements or accepted design and inspect nearby product surfaces.
2. Confirm `@enosta/en-ui/styles.css` is imported once at the application entry point.
3. Inspect routes, shared composition, data and permission states, responsive configuration, and test commands relevant to the change.
4. Run `en-ui-context` for the product needs in the feature. Read only the selected component contracts, READMEs, and relevant story sources.
5. Inspect an application-owned pattern contract only when the change affects a shared composition.

Use [component-selection.md](component-selection.md) when alternatives have materially different behavior. Use [typography-and-structure.md](typography-and-structure.md) when choosing type roles or visual boundaries. Do not read either merely to repeat decisions already established by an accepted design.

## Compose

- Use En UI for controls and protected interactions. When the installed package has no suitable export, implement a local consumer component from semantic HTML and available En UI atoms and tokens. Own its accessible name, keyboard behavior, focus, states, and tests; do not label it as an En UI component.
- Keep page structure and responsive layout in the consumer. Application-owned semantic layout tokens may define page gutters, content widths, section gaps, rails, and other product geometry.
- Keep spacing and sizing vocabularies separate. Named or numeric spacing aliases such as `max-w-xl` and `max-w-96` are not content-width tokens; `max-w-xl` can resolve to the 12px `--spacing-xl` value. For content measures, define a meaningful consumer variable such as `--content-width: 72rem` and use `max-w-[var(--content-width)]`.
- Use En UI tokens around atomic components. Avoid raw colors, scattered magic spacing values, and consumer overrides of protected states.
- Use real domain language and representative data instead of generic metrics, placeholder cards, or marketing filler.
- Preserve one page-level `h1`, heading order, named landmarks where needed, visible focus, labels, and keyboard completion.
- Choose boundaries in this order: spacing and hierarchy, a meaningful separator, an independent surface, then Table for comparable columnar records.
- Implement the states that change geometry or meaning: loading, empty, error, long content, disabled or read-only, selected, restricted, and destructive states as relevant.

When visual direction is unresolved, use [composition-exploration.md](composition-exploration.md) before final JSX. When the direction is accepted, implement it faithfully rather than generating alternatives.

Open-ended work should not converge on the first technically valid arrangement. Select a deliberate visual thesis and a product-relevant signature move, then render it early enough to replace the structure if it still reads as a generic template.

## Responsive behavior

Derive sizes from consumer configuration and established evidence. Decide what each major region keeps, wraps, reorders, condenses, discloses, scrolls, or changes into; do not mechanically stack every desktop block.

Test nested panes, dialogs, rails, and resizable regions against their own widths, not only the browser viewport. Give shrinking text and grid children a zero minimum width where needed, and keep horizontal scrolling on the region that intentionally owns it.

## Verify rendered behavior

Run the source guardrail from the dependency-owning package:

- Standalone package: `pnpm exec en-ui-check <source-path>`.
- Workspace member: `pnpm --filter <member-package-name> exec en-ui-check <source-path-relative-to-member>`.

Then run the consumer's typecheck, tests, accessibility checks, and browser checks. For substantial work, follow [rendered-validation.md](rendered-validation.md): inspect the consumer's declared viewport modes and actual layout transitions, relevant container sizes and states, console errors, keyboard behavior, overflow, clipping, and WCAG 2.2 AA evidence. Fix material findings and recapture affected screenshots before handoff.
