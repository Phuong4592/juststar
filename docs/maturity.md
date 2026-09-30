# Component Maturity

The supported statuses are experimental, beta, stable, and deprecated. The current public catalog contains only atoms and interaction primitives. Historical shell, header, sidebar, page, workspace, and layout implementations are repository-internal and are not represented in the aggregate public contract.

- **Experimental** work may have stories and draft contracts but must not be exported from `src/index.ts`.
- **Beta** exports are available to consumers, pass the package gate, and may still receive API or contract refinements before stable promotion.
- **Stable** exports require explicit promotion in the authoritative JSON contract.
- **Deprecated** exports remain documented with migration guidance until their approved removal.

Do not infer public availability from an older release note, repository-internal implementation, or catalog label. The aggregate contract is the import authority; a current public component's colocated contract is authoritative for its maturity.
