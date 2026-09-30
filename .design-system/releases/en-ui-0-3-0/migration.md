# Migration Guide: en-ui-0-3-0

Version `0.3.0` is a compatible minor release. Existing imports remain valid; no consumer API removal is required.

## Recommended Adoption

1. Update `@enosta/en-ui` to `0.3.0` and retain one import of `@enosta/en-ui/styles.css` at the application entry point.
2. Remove any workaround that separately loads Nunito or Geist Mono for En UI. The package stylesheet now ships all referenced font files.
3. Rerun `pnpm exec en-ui-init-ai` to refresh the product-aware consumer composition skill.
4. Run `pnpm exec en-ui-check src` and the consumer repository's type, test, accessibility, and responsive checks.

Consumers that visually asserted the previously documented 36px, 40px, and 44px control targets should update those expectations to the implemented 28px, 32px, and 36px compact, comfortable, and spacious roles.
