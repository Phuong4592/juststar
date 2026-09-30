# Product and repository context

Use this guidance when product context is missing, incomplete, or needed for a composition decision.

## Discover before asking

Inspect, in order:

1. Repository instructions such as `AGENTS.md`.
2. Root `PRODUCT.md` and product requirements linked from it.
3. Feature specifications, tickets, ADRs, architecture documents, prototypes, and design notes.
4. Approved screenshots, visual baselines, brand evidence, routes, navigation, shared shells, nearby screens, domain types, permissions, and representative data.
5. Consumer configuration for breakpoints, test commands, screenshots, and artifact conventions.

Search by purpose rather than assuming filenames. Useful terms include `product`, `requirement`, `spec`, `prototype`, `wireframe`, `design`, `architecture`, `adr`, and the feature name.

Summarize the discovered product context before making consequential composition decisions. Include the established density, navigation posture, surface contrast, and emphasis mechanisms when the repository proves them. If no visual direction exists, derive a deliberate En UI-compatible posture from product purpose and state the assumption; do not equate low risk with maximum restraint. Ask only when the missing choice would materially change product identity, task priority, information architecture, permissions, responsive behavior, or acceptance criteria.

## PRODUCT.md

Use the open [PRODUCT.md specification](https://product.md/#spec). A root `PRODUCT.md` describes the product; it does not replace feature specifications, `AGENTS.md`, or En UI documentation.

For an En UI consumer, prefer `Register: product`. The most useful canonical sections are:

- `Users`: who uses the product, their expertise, environment, frequency, and job to be done.
- `Problem`: what concretely fails without the product or feature.
- `Product Purpose`: what it does and how success is recognized.
- `Brand Personality` and `Tone`: how product language should sound.
- `Anti-references`: what generated work must not resemble.
- `Design Principles`: product-specific priorities that complement En UI.
- `Accessibility & Inclusion`: product requirements beyond the En UI baseline.
- `Boundaries`: what the product or feature is not.
- `Stack`: links to sibling authorities without duplicating them.

When the user requests product bootstrap or approves creating product context, create root `PRODUCT.md` from [the template](../assets/PRODUCT.template.md). Infer what the repository proves, mark unresolved facts clearly, and ask focused questions for the remainder.

When updating an existing `PRODUCT.md`:

- Preserve frontmatter, machine islands, unknown sections, and content outside the intended edit.
- Do not make the canonical `Register` section disagree with frontmatter.
- Do not invent pricing, customers, claims, compliance, roles, or business boundaries.
- Keep product facts in `PRODUCT.md` and link to implementation or design authorities instead of duplicating them.

Implementation work may continue without `PRODUCT.md`. Use the best available requirements and existing product evidence rather than blocking or silently inventing a generic audience, product category, or visual posture.

## Locate feature artifacts

Find where the consumer already keeps related artifacts. Prefer, in order:

1. A location explicitly named by repository instructions or the user.
2. The folder containing the related requirement, design, architecture, or feature specification.
3. The nearest established feature-artifact convention used by comparable work.
4. A conversational artifact when the output is lightweight and no durable file was requested.

Do not create a new repository-wide artifact convention for a single task. If several plausible conventions exist and choosing one would establish precedent, ask the user.
