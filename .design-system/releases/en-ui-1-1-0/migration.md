# Migration Guide: en-ui-1-1-0

Version `1.1.0` is a backward-compatible minor release with several visible behavior and composition updates.

## Adoption Notes

1. Expect `Button` loading states to keep their label visible while replacing the leading icon with a spinner.
2. Expect `Table` body rows to use one surface instead of zebra striping; selected and hover states continue to provide row emphasis.
3. Use the named token utilities for color, radius, shadow, typography, and spacing instead of Tailwind default scales or arbitrary equivalents.
4. Use `Typography.H1` as a 32px page heading. Keep product identifiers, timestamps, dates, currency, counts, environment names, and versions in Nunito; reserve Geist Mono for code and machine-oriented syntax.
5. Treat En UI layout components and Storybook compositions as optional building blocks. Define application layouts and reusable pattern contracts in the consumer repository.
6. Rerun `pnpm exec en-ui-init-ai`, then run `pnpm exec en-ui-check src` and the consumer repository's type, test, accessibility, and responsive checks.
