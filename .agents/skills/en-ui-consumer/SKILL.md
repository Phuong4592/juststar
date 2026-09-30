---
name: en-ui-consumer
description: Create, prototype, implement, or review product interfaces using the installed @enosta/en-ui components, consumer-owned composition, and rendered validation.
---

# En UI Consumer

Use En UI for atomic controls and protected interaction behavior. It is En UI-first, not En UI-only: the consumer application owns missing capabilities as well as product structure, page geometry, responsive composition, content, imagery, motion, and reusable page patterns.

## Start with product evidence

Read repository instructions and the user's requirements. Inspect relevant product documents, accepted designs, nearby routes, shared application structure, and representative data before choosing a layout. Use [context discovery](references/context-discovery.md) only when important product context is missing.

Do not infer a dashboard, SaaS, admin, marketing, or editorial layout from the component library. Preserve an accepted design direction when one exists.

For open-ended work, choose a clear visual thesis and at least one memorable structural or interaction idea that serves the product. Do not treat a centered container, uniform card grid, or maximum restraint as the automatically safe answer.

## Choose the task path

- For production implementation, read [implementation.md](references/implementation.md).
- For a prototype or UI specification, read [prototype-and-spec.md](references/prototype-and-spec.md).
- When visual direction is unresolved, read [composition-exploration.md](references/composition-exploration.md).
- When a composition will be reused across routes, read [application-pattern-contracts.md](references/application-pattern-contracts.md).
- When a specification or task-execution skill is also active, read [workflow integration](references/workflow-integration.md).
- For a requested design review, use the `en-ui-visual-audit` skill.

Do not load the other references unless the selected path calls for them.

## Discover installed components

Run `pnpm exec en-ui-context "<product need>"` from the package that declares `@enosta/en-ui`. In a workspace, use `pnpm --filter <member-package-name> exec en-ui-context "<product need>"`. The command reads the installed version and returns a bounded set of likely components.

When the command is unavailable, read `node_modules/@enosta/en-ui/contracts/component-index.md`. After selecting components, read only their contracts and READMEs under `node_modules/@enosta/en-ui/src/components/<name>/`. Inside the En UI repository, inspect relevant Storybook source when visual or state details matter.

The aggregate contract remains the import allowlist. Never invent an export from roadmap names, old examples, or memory.

## Hard boundaries

- Use public En UI controls when they provide the required behavior. When no suitable export exists, build a consumer-owned component from semantic HTML and available En UI atoms and tokens; do not invent an En UI export or wait for the package to own the product need.
- Preserve component keyboard behavior, focus, dismissal, naming, disabled states, and minimum targets.
- Build shells, headers, navigation, sections, grids, page containers, split panes, and workspaces in the consumer.
- Use En UI semantic tokens for component-adjacent styling. Consumer-owned semantic layout tokens are allowed for page gutters, content widths, section rhythm, and responsive geometry; avoid scattered raw values.
- Do not use spacing aliases such as `max-w-xl` or `max-w-96` for content widths. Define a consumer semantic width variable with a real `rem`, `ch`, percentage, or viewport value and use `max-w-[var(--content-width)]`.
- Use En UI Typography roles by default. A product-approved typography direction may extend them without changing protected component internals.
- Do not reach into package internals or mix another control library with En UI.

## Completion

Run `en-ui-check` through the package that declares the dependency, then the consumer's typecheck and tests. Prefer the consumer's Playwright or browser suite; use `en-ui-audit <url> --viewports <discovered-sizes>` as a fallback. Substantial interfaces are complete only after rendered inspection at consumer-defined viewport and container sizes. If rendered validation cannot run, report the UI as visually unvalidated.

Never update screenshot baselines without explicit human approval.
