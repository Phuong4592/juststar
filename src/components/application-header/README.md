# Application Header

Contract ID: `component.application-header`

Use `ApplicationHeader` inside `ApplicationShell`. It arranges product identity, workspace context, global search, and account actions while exposing the shell-owned mobile navigation and desktop sidebar controls.

```tsx
<ApplicationHeader
  brand="Enosta"
  context="Delivery workspace"
  search={<Search />}
  actions={<AccountMenu />}
/>
```

Public exports: `applicationHeaderVariants`, `ApplicationHeaderProps`, `ApplicationHeader`.

The required `brand` slot carries product identity. `context`, `search`, and `actions` are optional. `sticky` defaults to `true`; `navigationLabel` defaults to `"Navigation"` and supplies the accessible control names.

| Prop              | Type        | Default      | Description                                       |
| ----------------- | ----------- | ------------ | ------------------------------------------------- |
| `brand`           | `ReactNode` | required     | Product or organization identity.                 |
| `context`         | `ReactNode` | -            | Current workspace or product context.             |
| `search`          | `ReactNode` | -            | Global search control.                            |
| `actions`         | `ReactNode` | -            | Global actions and account controls.              |
| `sticky`          | `boolean`   | `true`       | Keeps the header above scrolling page content.    |
| `navigationLabel` | `string`    | `Navigation` | Accessible name used by shell navigation buttons. |

The navigation controls render only when the header is inside `ApplicationShell`. Mobile uses an open/close navigation button; desktop uses a sidebar collapse/expand button. Keep application search and account controls keyboard accessible and visibly labelled.

Classification: `compatible`. New in `0.4.0`.
