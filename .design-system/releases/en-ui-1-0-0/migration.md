# Migration Guide: en-ui-1-0-0

Version `1.0.0` is a breaking major release because the overlapping public `Text` component and export have been removed. `Typography` is the canonical text API.

## Required Migration

1. Replace `Text` imports from `@enosta/en-ui` with `Typography`.
2. Map text roles to compound presets such as `Typography.H1`, `Typography.H2`, `Typography.Text`, `Typography.Small`, `Typography.Caption`, and `Typography.Label`.
3. Use `Typography.Mono`, `Typography.MonoStrong`, `Typography.MonoSmall`, `Typography.MonoCaption`, or `Typography.Code` only for identifiers, timestamps, counts, code, and deliberately technical values.
4. Remove consumer-authored font-family, font-size, font-weight, line-height, and tracking utilities where a Typography preset owns the role.
5. Expect Table body rows to alternate semantic surface colors by default. Preserve that treatment unless a product-specific data-state treatment intentionally replaces it.
6. Rerun `pnpm exec en-ui-init-ai`, then run `pnpm exec en-ui-check src` and the consumer repository's type, test, accessibility, and responsive checks.

The package continues to use Nunito as its primary interface family and Geist Mono only for explicitly technical content.
