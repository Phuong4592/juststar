# Enosta UI Design Authority

`@enosta/en-ui` preserves the En Workbench visual and interaction language while reducing the distribution boundary to one React package.

## Principles

1. Preserve accessible behavior and existing public component APIs.
2. Use semantic tokens instead of application-owned raw values.
3. Keep component implementation, tests, stories, contracts, and guidance together.
4. Publish only explicitly beta or stable components that pass the complete package gate.
5. Give humans Markdown guidance and AI agents structured JSON contracts.

## Visual Language

The library retains mineral and paper surfaces, petrol actions, brass attention, oxide danger, signal rails, ledger divisions, Nunito typography, and compact operational density from the POC. The current package version declared in `package.json` ships one default light theme and motion-duration tokens; built-in dark-mode and motion-mode selectors are not yet part of the public theme contract.

The current foundation direction is dense and operational: Nunito through the public Typography compounds, 14px default body text, restrained 16/20/28px headings, a 4px spacing base with semantic composition roles, boundary-first structure, and a complete low-to-dragged elevation ladder. Use spacing and type hierarchy before a separator or independent surface. See `docs/foundations.md` and `contracts/theme.contract.json` for the human and machine-readable authority.

## Ownership

The Enosta design-system maintainers own component APIs, protected behavior, accessibility, tokens, releases, and migrations. Product teams own composition, content, domain behavior, and approved theme overrides.

## Component Completeness

A public beta or stable component includes:

- React implementation and public export
- Tailwind-variants implementation and token usage
- Optional colocated CSS for a small protected-style exception
- Unit and interaction tests
- Storybook stories for required states
- Machine-readable JSON contract
- Human-readable Markdown guidance

The contract is the machine authority. The Markdown document explains intended use, accessibility, variants, and migration considerations.

## Styling Architecture

CSS variables are the stable customization contract. Tailwind CSS v4 maps semantic variables into private utilities, and `tailwind-variants` owns component variants, sizes, slots, and compound states. The library compiles one `dist/styles.css` that includes Tailwind Preflight, so consumers install no Tailwind dependency but do receive its base reset.

Component CSS is optional. It exists only for keyframes and rare protected selectors that are safer outside utility strings; variable defaults, focus states, responsive rules, portal surfaces, and component variants live with the React implementation through `tv()`. Consumers must not depend on internal Tailwind classes.

For readable `tv()` definitions, use one array entry per styling concern in this order: layout, surface and border, typography, interaction and motion, then CSS-variable defaults. Keep simple slots as a single short string. Tailwind classes remain whitespace-separated; commas are reserved for values that require them, such as multi-layer shadows.

All public beta components in the current package version declared in `package.json` follow this architecture. Shared protected adapters accept class maps or compose their own `tv()` slots without exposing Base UI styling details through the public API.
