# Sidebar Navigation

Contract ID: `component.sidebar-navigation`

Use `SidebarNavigation` inside `ApplicationShell` for primary application destinations. Compose semantic groups and lists from the exported parts; use `SidebarNavigationItem` for links with icons, labels, badges, active state, disabled state, and an optional secondary list.

```tsx
<SidebarNavigation label="Primary">
  <SidebarNavigationGroup>
    <SidebarNavigationGroupLabel>Workspace</SidebarNavigationGroupLabel>
    <SidebarNavigationList>
      <SidebarNavigationItem active href="/projects" icon={<ProjectsIcon />} label="Projects">
        <SidebarNavigationList aria-label="Projects" level="secondary">
          <SidebarNavigationItem href="/projects/members" label="Members" />
          <SidebarNavigationItem href="/projects/api" label="API keys" />
        </SidebarNavigationList>
      </SidebarNavigationItem>
    </SidebarNavigationList>
  </SidebarNavigationGroup>
</SidebarNavigation>
```

The default geometry is intentionally compact: primary destinations use the 32px comfortable control height, nested destinations use the 28px compact control height, and groups use token-backed 8px to 12px insets. When the shell collapses, visible labels, badges, and secondary lists are hidden while primary link names remain available. `aria-current="page"` identifies the active destination.

Public exports: `sidebarNavigationVariants`, `SidebarNavigation`, `SidebarNavigationGroup`, `SidebarNavigationGroupLabel`, `SidebarNavigationList`, `SidebarNavigationItem`, `SidebarNavigationFooter`, and their public prop types.

`SidebarNavigationList` defaults to `level="primary"`; use `level="secondary"` for the single supported nested level. `SidebarNavigationItem` accepts `label`, `icon`, `badge`, `active`, `disabled`, and `disabledReason` alongside native anchor props.

Product routing and permissions remain consumer-owned:

- Filter destinations that a role must not discover.
- For a known destination that is unavailable to the current role, use `disabled`, a short `disabledReason`, and a visible `Badge` such as “No access”.
- For planned functionality, use the same disabled pattern with a “Soon” badge and a specific reason such as “Coming in the September release”. Do not leave an inactive link looking enabled.

Disabled items prevent activation, expose `aria-disabled`, and associate `disabledReason` as an accessible description. Secondary navigation is persistent rather than a disclosure menu; use it when the parent has a useful destination and no more than one nested level is required.

Classification: `compatible`. New in `0.4.0`.
