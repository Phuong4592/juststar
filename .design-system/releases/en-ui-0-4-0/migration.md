# Migration Guide: en-ui-0-4-0

Version `0.4.0` is a compatible minor release. Existing imports remain valid; no consumer API removal is required.

## Recommended Adoption

1. Update `@enosta/en-ui` to `0.4.0` and retain one import of `@enosta/en-ui/styles.css` at the application entry point.
2. Rerun `pnpm exec en-ui-init-ai` to install the latest composition, anti-slop, responsive, and rendered-validation guidance.
3. Replace application-owned shell geometry with `ApplicationShell`, `ApplicationHeader`, `SidebarNavigation`, `PageContainer`, `PageHeader`, `PageSection`, or `SplitLayout` where their contracts match the workflow.
4. Use `SidebarNavigationList level="secondary"` for the supported nested navigation level. Filter routes users cannot discover; use disabled items with a reason and status for known unavailable or coming-soon destinations.
5. Use `AIChatPage` for panel-bounded conversations and `AIWorkspace` for resizable conversation-and-preview workflows. Keep the composer inside its chat panel and let the conversation log own scrolling.
6. Run `pnpm exec en-ui-check src` and the consumer repository's type, test, accessibility, nested-pane, and responsive checks.

Button labels now remain on one line. Consumers with unusually long action copy should shorten the label or allow the Button to size to its content instead of depending on wrapping inside a fixed-height control.
