# Change Receipt: separate-visual-checks

- Category: `tooling`
- Compatibility: `compatible`
- Placement: `standalone/workspace-packages`
- Approved by: User

## Evidence

- **Implementation:** `pnpm check` retains deterministic WCAG, contrast, responsive geometry, overflow, target-size, and interaction checks; 15 screenshot assertions now live in the tagged opt-in suite; GitHub visual review uses a pinned Playwright container and is advisory.
- **Docs:** Repository guidance and the packaged visual-audit skill distinguish blocking deterministic checks from human-reviewed screenshot baselines.
- **Tests:** 16 deterministic browser tests, 15 screenshot tests, 75 unit tests, and the complete package/build gate pass.

## Checks

- `pnpm check`: passed
- `pnpm design:layout`: passed
- `pnpm visual:check`: passed

## Migration

No consumer migration is required. Maintainers use `pnpm visual:check` for screenshot review and `pnpm visual:update` after explicit approval; `pnpm design:update` remains available as an alias.
