---
name: en-ui-visual-audit
description: Audit En UI tokens, components, Storybook stories, or consumer compositions for intent fidelity, visual hierarchy, spacing, responsive geometry, WCAG 2.2 AA conformance, AAA opportunities, and screenshot drift. Use for design QA and review; do not approve a new visual baseline without explicit human review.
---

# En UI Visual Audit

Use deterministic evidence before contextual design judgment.

1. Identify whether the target is the En UI package or a consumer application.
2. For the package, read `contracts/theme.contract.json`, the relevant atomic component contract, and the target story. Run `pnpm design:tokens` and `pnpm design:layout`; AA failures remain blocking and AAA gaps are advisory unless explicitly required.
3. For a consumer, read product context, explicit visual direction, nearby surfaces, and any relevant application-owned pattern contract. Use `en-ui-context` to discover installed components, then inspect only the selected contracts, READMEs, and story sources. Run `en-ui-check` through the package that declares the dependency, followed by the consumer's typecheck, accessibility, and browser checks.
4. Inspect foundation and component state stories when available before the target composition. Check typography roles, information density, semantic spacing, elevation purpose, and default/hover/checked/disabled contrast.
5. Inspect the rendered composition at the consumer's configured devices and browser-test viewports. When none exist, derive sizes from the actual breakpoints and content-driven layout transitions; do not impose a generic three-viewport matrix. Check fidelity to the intended direction, hierarchy, density, alignment, grouping, readable measure, truncation, relevant states, and whether purpose and priority remain clear without relying on color alone.
6. For substantial consumer pages, use [rendered validation](../en-ui-consumer/references/rendered-validation.md) as the canonical completion gate. Use [the visual quality loop](../en-ui-consumer/references/visual-quality-loop.md) only when a detailed scored review is useful.
7. Report findings with source, visible evidence, user impact, and a concrete remediation. Distinguish deterministic failures from contextual observations.
8. Run `pnpm visual:check` in the En UI package, or the consumer's discovered pixel-baseline command, when comparison is useful. Treat rendering drift as review evidence rather than a default local blocker.
9. Never update screenshot baselines merely to make a diff pass. Update them only after a human explicitly approves the intended visual change.

Read the canonical [consumer WCAG policy](../en-ui-consumer/references/wcag-policy.md) when auditing contrast, target size, focus, or conformance.
