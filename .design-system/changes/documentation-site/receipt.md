# Change Receipt: documentation-site

- Category: `tooling`
- Compatibility: `compatible`
- Placement: `standalone/workspace-packages`
- Approved by: User

## Evidence

- **docs:** `docs/site/src/landing.tsx provides a light-mode product landing page using En UI components and buttonVariants`, `docs/site/src/docs.tsx documents installation, first use, semantic customization, modes, AI contracts, and troubleshooting`, `README.md links the landing page, setup guide, and nested Storybook`
- **implementation:** `The repository-only Vite site imports Alert, Badge, Button, Field, Input, Link, Stack, buttonVariants, and the real En UI stylesheet from source`, `docs/site/vite.config.ts builds landing and docs entries without changing package exports`, `scripts/build-pages.mjs and the Pages workflow assemble the React site with Storybook at /storybook/`, `The package archive boundary remains unchanged and excludes all documentation-site source and build artifacts`
- **tests:** `pnpm check passed contracts, lint, formatting, type checking, 52 component tests, package build, Storybook build, React site build, Pages assembly, and packed-consumer verification`, `Desktop and 390px mobile browser checks passed for landing and docs with light mode, no console errors, and no horizontal overflow`, `The nested /storybook/ build remained available in the assembled Pages artifact`, `pnpm dev started the Storybook manager and preview successfully on port 6006`

## Checks

- `pnpm check`: passed
- `pnpm test`: passed
- `pnpm typecheck`: passed
- `pnpm build`: passed
- `pnpm dev`: passed

## Migration

No migration required.
