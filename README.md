# @enosta/en-ui

`@enosta/en-ui` is Enosta's focused React atom and interaction-primitive library. The current catalog exposes 25 controls, typography, feedback, data-display, and overlay components backed by colocated implementation, tests, Storybook stories, machine-readable contracts, and Markdown guidance.

## Install

Configure GitHub Packages once:

```ini
@enosta:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_PACKAGES_TOKEN}
```

Then install with pnpm:

```bash
pnpm add @enosta/en-ui
```

Import the complete stylesheet once at the application entry point:

```tsx
import "@enosta/en-ui/styles.css"

import { Button, Spinner } from "@enosta/en-ui"
```

The stylesheet is compiled inside the library with Tailwind CSS v4 and includes Tailwind Preflight. Consuming applications do not install or configure Tailwind, but they should review how the included reset interacts with application base styles. Components compose utilities with `tailwind-variants`, while the variables in `@enosta/en-ui/themes/default.css` remain the supported customization API and do not use a package prefix.

## Development

```bash
pnpm install
pnpm dev
pnpm check
```

Every component lives in `src/components/<name>/` with its React implementation, tests, stories, JSON contract, and `README.md`. A component CSS file is added only when protected selectors or keyframes require it.

Contract-first component work uses:

```bash
pnpm component:new component-name
pnpm contract:generate
pnpm component:check component-name
pnpm generated:check
```

`pnpm component:new` generates a `tv()`-based component without a CSS file. `pnpm component:check` rejects public components that bypass `tailwind-variants` or grow a large authored CSS layer.

Storybook is a repository-only development dependency. Stories and Storybook configuration are excluded from the published archive.

## AI-assisted composition POC

The package delivers AI composition instructions and source guardrails in addition to component contracts:

```bash
pnpm exec en-ui-init-ai
pnpm exec en-ui-check src
```

In a pnpm workspace, run package binaries through the member that declares `@enosta/en-ui`:

```bash
pnpm --filter <consumer-package> exec en-ui-init-ai
pnpm --filter <consumer-package> exec en-ui-check src
```

The initializer detects `pnpm-workspace.yaml` and installs the shared instructions at the workspace root. Pass an explicit directory only when the instructions should be installed somewhere else. If pnpm also warns that `pnpm.onlyBuiltDependencies` is ignored, move that setting from `package.json` to `pnpm-workspace.yaml`; it is unrelated to binary resolution.

The installed consumer framework reads root `PRODUCT.md`, product requirements, nearby surfaces, accepted references, and consumer configuration before composing an interface. It applies to any product feature and does not assume a SaaS, dashboard, admin, or operational layout. It supports separate prototype, specification, implementation, and review flows, and follows the consumer's existing artifact locations instead of introducing a package-owned folder.

Consumer repositories own every shell, header, sidebar, page, workspace, and layout pattern. The packaged skill guides teams to build those structures from semantic HTML and En UI atoms, then define local pattern contracts around product intent, anatomy, responsive transformations, states, permissions, dependencies, and verification.

The installer adds both the consumer and visual-audit skills. The workflow preserves explicit human art direction, derives composition from product intent, validates component selection against installed contracts, and uses screenshot-led iteration for substantial interfaces. Layout, density, imagery, motion, and reusable composition remain consumer decisions. The source checker rejects objective contract and implementation violations, while contextual style and taste remain part of rendered review.

Use the installed-version context command to discover a bounded set of relevant components without loading the complete aggregate contract:

```bash
pnpm exec en-ui-context "searchable multi-select"
pnpm exec en-ui-context --components button,dialog,field
```

Run `pnpm exec en-ui-init-ai --check` in CI to detect copied skill instructions that no longer match the installed package version.

Prefer the consumer's existing Playwright suite for interaction and visual regression coverage. For a reachable route without suitable coverage, pass the consumer's discovered viewport matrix to the audit helper to capture screenshots and fail on rendered or runtime errors:

```bash
pnpm exec en-ui-audit http://localhost:4173/projects --viewports 390x844,1440x900
```

The sizes above are illustrative; use the consumer's declared devices, test projects, breakpoints, or actual layout transitions rather than copying a package default.

Substantial pages receive separate structural and finish critiques. The agent revises material findings, recaptures affected viewports, and uses a scored quality gate before calling the interface visually validated.

Visual quality is verified separately from code correctness:

```bash
pnpm design:check
```

This blocks deterministic failures in token contrast, WCAG 2.2 AA, responsive geometry, overflow, target size, and protected interaction behavior. Pixel comparisons are intentionally separate:

```bash
pnpm visual:check
```

Run `pnpm visual:update` only after explicit human approval of an intended visual change.

Foundation guidance ships with the package for both people and AI agents:

```text
@enosta/en-ui/foundations.md
@enosta/en-ui/theme.json
```

The default type system uses Nunito through `Typography.Text`, `Typography.Small`, and `Typography.H1` through `H6`; 16px default text, 14px supporting text, 14/16/20/24/28/32px headings, a 40px display role, and named spacing from 2px through 32px (`space.md` is 8px). Product values stay in Nunito; Typography mono compounds are reserved for code and machine-oriented text. Compact, comfortable, and spacious controls remain 28/32/36px. WCAG 2.2 AA remains blocking; 44px touch-primary targets and AAA text contrast are advisory goals.

The aggregate schema-v2 system contract contains the complete catalog for the installed package version. Consumers should read that contract before selecting components:

```text
@enosta/en-ui/contract.json
@enosta/en-ui/contracts/button
@enosta/en-ui/docs/button
```

The wildcard contract and documentation exports resolve published atomic component files. Use the aggregate contract as the installed version's complete import allowlist. Application composition is intentionally absent.

For direct filesystem inspection inside `node_modules`, the corresponding physical files are:

```text
node_modules/@enosta/en-ui/contracts/design-system.contract.json
node_modules/@enosta/en-ui/src/components/button/button.contract.json
node_modules/@enosta/en-ui/src/components/button/README.md
```

The public subpath names above are resolver aliases and should not be mistaken for literal package-root files.

## Documentation Site

Every push to `main` builds and deploys the landing page, setup guide, and Storybook through GitHub Actions. The landing and docs pages are authored with React and real `@enosta/en-ui` exports, then pre-rendered into static HTML before deployment and hydrated for interactive controls:

https://enosta.github.io/en-ui/

- Setup and customization: https://enosta.github.io/en-ui/docs/
- Design language and principles: https://enosta.github.io/en-ui/design/
- Contract canvas: https://enosta.github.io/en-ui/canvas/
- Component Storybook: https://enosta.github.io/en-ui/storybook/

The workflow can also be started manually from the Actions tab with `workflow_dispatch`. GitHub Pages uses the `github-pages` environment and the workflow artifact; no `gh-pages` branch is required.

## Releases

Add a Changeset for consumer-visible changes:

```bash
pnpm changeset
```

Publishing runs automatically when a GitHub Release is published. Stable releases use the `latest` tag and prereleases use `next`.
