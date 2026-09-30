# Change Receipt: minor-ui-release-fixes

- Category: `tooling`
- Compatibility: `compatible`
- Placement: `standalone/workspace-packages`
- Approved by: User

## Evidence

- **docs:** `The landing page and documentation header display 0.2.0`, `COMPONENTS.md, docs/maturity.md, llms.txt, and CHANGELOG.md describe the 0.2.0 catalog and release`
- **implementation:** `docs/site/src/site.css makes button-styled anchors consume --en-button-foreground outside the Tailwind cascade layer`, `src/components/alert-dialog/alert-dialog.stories.tsx keeps Controlled and Protected Dismissal closed until the viewer activates their trigger`, `Changesets applied the queued minor release and updated @enosta/en-ui from 0.1.0 to 0.2.0`, `Version-facing documentation, aggregate contract metadata, and package verification now follow the 0.2.0 release`
- **tests:** `tests/visual/documentation-and-storybook.spec.ts protects primary-link contrast and viewer-triggered Alert Dialog stories`, `pnpm check passed 75 unit tests and 22 visual/browser tests`, `Library build, Storybook build, documentation-site build, Pages assembly, package archive inspection, clean install, and consumer smoke test passed`

## Checks

- `pnpm check`: passed
- `pnpm test`: passed
- `pnpm typecheck`: passed
- `pnpm build`: passed
- `pnpm dev`: passed

## Migration

No migration required.
