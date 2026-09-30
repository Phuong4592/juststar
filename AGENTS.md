# @enosta/en-ui Agent Guide

This repository is a single publishable React package. Do not introduce workspaces, applications, pilots, a contract editor, or a second package without an approved architecture decision.

## Component Contract

Every public component lives in `src/components/<name>/` and must keep these files synchronized:

- `<name>.tsx`
- `<name>.test.tsx`
- `<name>.stories.tsx`
- `<name>.contract.json`
- `README.md`
- `index.ts`

Add `<name>.css` only for keyframes or protected selectors that cannot be expressed safely with Tailwind CSS and `tailwind-variants`.

Preserve protected accessibility and interaction behavior. Public component APIs remain vendor-neutral even when internal adapters use Radix UI or React Aria.

For component creation or changes, follow `.agents/skills/en-ui-component/SKILL.md`. Contracts are authoritative: update the JSON contract first, generate TypeScript metadata, then synchronize implementation, CSS variables, stories, tests, and Markdown guidance.

Run `pnpm component:check <name>` while developing and `pnpm check` before release. Add a Changeset for every consumer-visible change.

## Guarded files (**IMPORTANT**)

Do not modify any `*.contract.json` file or `src/style/themes/default.css` unless the user has explicitly directed you to do so. If a task requires changing these files, stop and ask for confirmation first, then proceed only after approval.

## React 19 conventions

Prefer React 19 idioms in all component code. Do not use `forwardRef`, `useMemo`, or `useCallback` unless the user explicitly requests them. Rely on React 19 ref-as-prop and automatic memoization instead.

## Product composition

For layouts, compositions, and pages, read `docs/ai-composition.md` and any relevant application-owned pattern contract before implementation. Consumer repositories own every shell, header, sidebar, page, workspace, and reusable layout pattern. The package exposes atoms and interaction primitives only. Reuse En UI controls, semantic tokens, and documented component behavior; do not introduce raw colors, arbitrary spacing, unsafe truncation, a second component library, or package-owned application composition.

Consumer teams can install `.agents/skills/en-ui-consumer/SKILL.md` with `pnpm exec en-ui-init-ai` and check AI-generated source with `pnpm exec en-ui-check src`.

For visual review, use `.agents/skills/en-ui-visual-audit/SKILL.md`. Run `pnpm design:check` for blocking deterministic checks and `pnpm visual:check` for pixel baselines. WCAG 2.2 AA and responsive geometry are blocking, AAA is advisory, and screenshot updates require explicit human approval.
