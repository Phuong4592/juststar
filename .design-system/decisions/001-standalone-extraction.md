# Decision 001: Standalone Single-Package Extraction

- Date: 2026-08-24
- Owner: Enosta
- Status: Approved

## Decision

Extract the stable React library from the En Workbench POC into a new standalone repository that publishes one package: `@enosta/en-ui`.

The first release contains 20 priority components. Tokens, fonts, styles, contracts, documentation, tests, and Storybook remain in the same repository and package boundary. The original POC remains unchanged as historical evidence.

## Removed From The Distribution Boundary

- Pilot applications
- Contract editor application
- Registry recipes
- Turbo and pnpm workspace configuration
- Separate token and tooling packages
- Bundled Codex plugin
- POC-wide fixtures and verification machinery

## Compatibility

Selected components preserve their existing React APIs, protected behavior, visual language, tokens, modes, density, motion, and accessibility expectations. Consumers migrate directly to the new package name; no compatibility package is provided.

## Toolkit Schema Note

The lifecycle toolkit currently represents every standalone repository as `standalone/workspace-packages`. This repository records that closest supported value in `.design-system/project.json`, but intentionally contains one package at the repository root and is not a monorepo.
