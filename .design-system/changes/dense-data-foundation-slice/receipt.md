# Change Receipt: dense-data-foundation-slice

- Category: `foundation`
- Compatibility: `compatible`
- Placement: `standalone/workspace-packages`
- Approved by: User

## Evidence

- **accessibility:** `Every stable Storybook story passes automated WCAG 2.2 AA scanning`, `Declared interactive contrast pairs pass AA; four normal-text AAA opportunities remain advisory`
- **contract:** `contracts/foundations.contract.json defines typography, spacing, elevation, density, and interactive contrast authority`, `contracts/design-system.contract.json was regenerated and verified current`
- **docs:** `docs/foundations.md and README.md document package-delivered dense-data guidance`, `docs/site/src/docs.tsx presents typography, spacing, elevation, and density guidance in the documentation site`
- **implementation:** `src/tokens/tokens.css provides the dense type scale, semantic spacing roles, interaction sizes, elevation ladder, and explicit hover tokens`, `Button, IconButton, Checkbox, Switch, Link, and the representative roster consume the revised foundation values without breaking public props`
- **stories:** `src/foundations/foundations.stories.tsx exposes typography, spacing, and elevation for review`, `Button, IconButton, Checkbox, and Switch stories expose representative state matrices`
- **tests:** `67 unit tests pass across 22 test files, including expanded state and keyboard coverage for Button, IconButton, Checkbox, and Switch`, `15 Playwright visual tests pass with a 100-pixel screenshot-difference budget`

## Checks

- `pnpm check`: passed
- `pnpm test`: passed
- `pnpm typecheck`: passed
- `pnpm build`: passed
- `pnpm dev`: passed

## Migration

No migration required.
