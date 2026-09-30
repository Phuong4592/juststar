# Release Receipt: en-ui-0-3-0

- Placement: `standalone/workspace-packages`
- Classification: `minor`
- Package version: `0.3.0`
- Approved by: User

## Evidence

- **commands:** `[{"command": "pnpm check", "status": "passed"}, {"command": "pnpm test", "status": "passed"}, {"command": "pnpm typecheck", "status": "passed"}, {"command": "pnpm build", "status": "passed"}, {"command": "pnpm dev", "status": "passed"}]`
- **accessibility:** `[".design-system/releases/en-ui-0-3-0/accessibility.md", ".design-system/releases/en-ui-0-3-0/audit-review.md"]`
- **auditReports:** `[".design-system/audits/visual-quality-baseline/findings.json", ".design-system/audits/dense-data-foundations-baseline/findings.json"]`
- **changelog:** `"CHANGELOG.md"`
- **migration:** `".design-system/releases/en-ui-0-3-0/migration.md"`
- **archive:** `{"contents": ["package/dist/index.js", "package/dist/index.d.ts", "package/dist/styles.css", "package/dist/files/*.woff2", "package/contracts/component.schema.json", "package/contracts/design-system.contract.json", "package/contracts/theme.contract.json", "package/src/components/*/*.contract.json", "package/src/components/*/README.md", "package/src/patterns/*/*.contract.json", "package/src/patterns/*/README.md", "package/.agents/skills/en-ui-consumer/**", "package/.agents/skills/en-ui-visual-audit/**", "package/scripts/en-ui-check.mjs", "package/scripts/en-ui-init-ai.mjs"], "path": ".design-system/releases/en-ui-0-3-0/enosta-en-ui-0.3.0.tgz", "sha256": "sha256:c2031ca7d8141d06b14ecff133e92b0956e479104dc2480d541f06750e152d51"}`
- **consumerProof:** `{"build": {"command": "pnpm package:archive-check", "status": "passed"}, "cleanEnvironment": true, "fixture": "scripts/verify-package.mjs", "install": {"command": "pnpm package:archive-check", "status": "passed"}}`

## Deferred External Actions

Publication, deployment, commits, tags, remote releases, and external messages were not performed by this workflow.
