# Application Shell

Contract ID: `component.application-shell`

Use `ApplicationShell` as the outer layout for signed-in products. It owns the single `main` landmark, skip link, desktop sidebar geometry, mobile navigation dialog, Escape dismissal, focus restoration, and collapsed rail state.

```tsx
<ApplicationShell
  navigation={<SidebarNavigation label="Primary">...</SidebarNavigation>}
  header={<ApplicationHeader brand="Enosta" />}
>
  <PageContainer>...</PageContainer>
</ApplicationShell>
```

`navigation` and `header` are required. `defaultSidebarCollapsed` defaults to `false`; `navigationLabel` and `skipLinkLabel` provide customizable accessible microcopy. Use `ApplicationHeader` so users receive the shell-connected mobile and desktop navigation controls.

Public exports: `applicationShellVariants`, `ApplicationShellProps`, `ApplicationShell`.

| Prop                      | Type        | Default                  | Description                                     |
| ------------------------- | ----------- | ------------------------ | ----------------------------------------------- |
| `navigation`              | `ReactNode` | required                 | Sidebar navigation content.                     |
| `header`                  | `ReactNode` | required                 | Application header content.                     |
| `children`                | `ReactNode` | required                 | Page content rendered inside the single `main`. |
| `defaultSidebarCollapsed` | `boolean`   | `false`                  | Initial desktop sidebar rail state.             |
| `navigationLabel`         | `string`    | `Application navigation` | Accessible name for the navigation landmark.    |
| `skipLinkLabel`           | `string`    | `Skip to content`        | Visible-on-focus skip-link text.                |

The mobile sidebar behaves as a modal navigation dialog: background content becomes inert, Escape closes it, focus starts inside the navigation, and focus returns to the trigger. Desktop collapse preserves accessible item names through `SidebarNavigation`.

Do not render another `main` inside the shell. `PageContainer`, `PageHeader`, and page patterns belong inside its main content slot.

Customizable variables: `--application-shell-sidebar-width`, `--application-shell-rail-width`.

Classification: `compatible`. New in `0.4.0`.
