# Evolution Impact Map: tailwind-token-mapping

## Components

- Prove Button, Field/Input, and Alert before any later catalog migration.

## Consumers

- Consumers continue importing one compiled @enosta/en-ui stylesheet and do not install Tailwind.

## Contracts

- Record component styling variables and generated variant metadata without changing consumer-facing React contracts.

## Documentation

- Document the hybrid CSS-variable, Tailwind v4, and tailwind-variants authoring model for maintainers and AI agents.

## Foundations

- Map existing semantic CSS variables into Tailwind CSS v4 theme utilities; CSS variables remain the customization authority.

## Patterns

- Keep current compositions and interaction behavior unchanged while validating the new styling implementation pattern.

## Screenshots

- Use Storybook builds and existing stories to review visual parity for the vertical slice.

## Release Classification

`minor`
