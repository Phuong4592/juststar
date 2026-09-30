# AI-safe composition

Atoms alone do not guarantee a strong result. En UI combines stable atomic component contracts, consumer-owned composition, packaged AI instructions, deterministic checks, and screenshot-led iteration so generated interfaces preserve human intent, hierarchy, craft, accessibility, responsiveness, truncation, and token usage.

## 1. Product context

Consumer repositories should keep a root `PRODUCT.md` using the open [PRODUCT.md specification](https://product.md/#spec). It records users, purpose, product voice, anti-references, accessibility needs, and boundaries without duplicating En UI contracts or feature specifications.

The packaged consumer and visual-audit skills read `PRODUCT.md`, local requirements, adjacent routes, accepted prototypes, and application configuration before proposing and reviewing a composition. If product context is missing, the consumer skill can help create `PRODUCT.md` from the included template.

## 2. Separate composition flows

Prototype generation, specification, implementation, and review are separate flows:

- Prototypes use ASCII for information architecture, responsive HTML for geometry and interaction, or images when visual direction is genuinely unresolved.
- Specifications link accepted prototypes and record page anatomy, responsive transformations, states, permissions, and acceptance criteria.
- Implementation searches for those artifacts but continues from product requirements and existing application evidence when no prototype exists.
- Composition starts from explicit human direction and product evidence, using En UI atoms and tokens as building blocks without imposing a product category or page archetype.
- Review checks intent fidelity, hierarchy, semantic spacing, responsive geometry, relevant states, typography overflow, and contextual generated-UI pitfalls.

The skill discovers each consumer's existing specification, design, or architecture convention and places artifacts beside related work. It does not impose a package-owned artifact folder.

## 3. Application-owned pattern contracts

Consumer repositories own page and layout patterns because products differ in information architecture, task hierarchy, responsive transformations, and domain states. This includes application shells, headers, sidebars, page containers, page introductions, named page sections, split layouts, authentication pages, chat pages, and workspaces.

When a composition recurs or carries protected product behavior, define a local contract beside the consumer's related feature or architecture artifacts. Record its user task, named anatomy, responsive transformations, states, permissions, public En UI dependencies, protected rules, and verification evidence. The contract defines outcomes and invariants while allowing different products to choose different JSX and layout strategies.

En UI owns atomic component contracts, tokens, accessibility, and protected interactions. Consumers compose semantic HTML and local components around those atoms, including capabilities that the installed package does not provide; package composition exports are intentionally unavailable. A missing export is not a reason to force the product into the wrong component.

Do not create or change package contracts during consumer feature work. Reuse a composition by extracting it and documenting its contract inside the consumer, not by promoting it into En UI.

Use `Typography` compounds as the only public text API. Nunito owns interface copy, headings, and product values such as identifiers, timestamps, currency, counts, environments, and versions; alternate mono rendering is limited to code and machine-oriented text. Choose semantic spacing and title hierarchy before adding a separator or independent surface. Tables preserve the row boundaries, hover treatment, and selected emphasis defined by the installed En UI Table contract.

## 4. Consumer AI instructions

Teams can install the packaged instructions into a consumer repository:

```bash
pnpm exec en-ui-init-ai
```

When `@enosta/en-ui` is installed by a pnpm workspace member instead of the workspace root, resolve the binary through that member:

```bash
pnpm --filter <consumer-package> exec en-ui-init-ai
```

The initializer detects the nearest `pnpm-workspace.yaml` and installs both skills at that workspace root. An explicit target directory still overrides workspace detection.

This installs `.agents/skills/en-ui-consumer/` and `.agents/skills/en-ui-visual-audit/`, including product discovery, accurate installed-contract lookup, component selection, open-ended composition exploration, implementation rules, screenshot-led critique, and a conformant `PRODUCT.md` template.

The framework also includes a dependency-free rendered-page audit helper. Consumer Playwright or compatible browser tests can use it to verify that En UI styles are loaded and collect evidence for viewport and nested-pane overflow, clipped typography, unexpected font families, narrow long-content blocks, AI chat composer geometry, heading structure, target sizes, broken images, and runtime errors without imposing a package-owned application runner. Viewports come from the consumer's test configuration, supported devices, or actual layout transitions rather than package defaults.

Substantial pages use two visual review passes: a screenshot-first structural critique for hierarchy, component choice, and responsive transformation, followed by a finish critique for spacing, alignment, content, states, and accessibility. Material findings are corrected and recaptured before handoff; browser-unavailable work remains explicitly visually unvalidated.

When a specification or task-execution workflow is also active, it owns task records and required acceptance commands while the En UI skill retains responsibility for visual direction and rendered completeness. Both verification sets apply; a source-only task result does not complete substantial UI work.

## 5. Deterministic guardrails

Run the checker over generated application code:

```bash
pnpm exec en-ui-check src
```

In a pnpm workspace, use `pnpm --filter <consumer-package> exec en-ui-check src` so pnpm resolves the binary from the member that declares the dependency.

The POC reports package composition imports, imports missing from the installed aggregate contract, foreign component libraries, En UI internal imports, raw colors, inline visual styles, native controls and tables with En UI equivalents, consumer-authored typography roles, arbitrary Tailwind values, spacing aliases misused as content widths, visual truncation without a protected full value, layout-property transitions, unreadably small functional text, and missing image sources.

Stylistic choices such as gradients, blur, glow, display treatments, unusual proportions, illustration, and expressive motion remain part of rendered and human review because source matching cannot determine intent or quality. Tune false positives through the shared package rather than disabling contract guardrails inside individual consumers.

## Visual and WCAG quality

Run the design gate before accepting a composition:

```bash
pnpm design:check
```

It blocks WCAG 2.2 AA token-pair failures, responsive overflow, uneven container geometry, undersized targets, axe violations, and protected interaction regressions. AAA gaps are printed as advisory evidence.

Run pixel baselines separately so browser rendering differences do not make the default gate brittle:

```bash
pnpm visual:check
```

Never update snapshots only to make CI green. A maintainer or designer must explicitly approve the intended visual change before running `pnpm visual:update`.
