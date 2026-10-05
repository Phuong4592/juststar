# EnPath demo: My Career

A small consumer app that builds the EnPath **My Career** page (the "My Career v2" design from Claude Design) out of En UI atoms. It shows how a product composes its own shell, map and panels around the package. The app is not published: `examples/` sits outside the package `files` list.

```bash
pnpm example:dev    # Vite dev server
pnpm example:build  # builds examples/enpath/dist
```

Like Storybook and the docs site, `@enosta/en-ui` resolves to `src/index.ts`. Icons load from the Iconify API, so the app needs network access to show them.

## What the page covers

- **Starting state.** Lan Nguyen is Backend Engineer L2 · Mid and follows _Engineering growth_. That path changed on 27 Sep: Frontend Engineer L1 is "New on your path", the old goal (BE L3) was removed, and the strip asks Lan to pick a new goal. Career vision 1 (Product Designer L1 → L2) is a draft.
- **Map and List views.** The map pans by dragging and zooms only with its buttons; the wheel scrolls the page, as the build doc asks. It re-centres when it opens: the whole map shows if it fits at 70% zoom or more, otherwise the view starts at the role before "You are here". Below 1024px the page opens in List view and the detail panel moves under the content.
- **Progress strip.** Ready, growth and not-assessed counts for the Active goal. Each count opens the goal with that group expanded.
- **Explore a position.** Works out whether a move extends a company path (no approval needed), starts or joins a Career vision, or is already on your map.
- **Preview before every change.** Setting or removing a goal, switching the path you follow, and removing steps or a vision all go through a confirmation dialog first. Removal is blocked while it would take away the goal or a vision that is waiting for approval.
- **Approval.** Request, withdraw, and demo-only Approve or Decline as manager. A declined vision shows the manager's note once before it is removed.
- **Path history and Ask AI.** Path history opens as a sheet. Ask AI (⌘I) gives canned replies, including a vision you can add to the map.

## Structure

| File                               | Role                                                                     |
| ---------------------------------- | ------------------------------------------------------------------------ |
| `src/app-shell.tsx`                | Application-owned sidebar and header                                     |
| `src/my-career/model.ts`           | Sample data and pure planning logic (map layout, explore, removal plans) |
| `src/my-career/model.test.ts`      | Vitest coverage for the planning rules                                   |
| `src/my-career/my-career-page.tsx` | Page state and layout                                                    |
| `src/my-career/career-map.tsx`     | Pan/zoom canvas, edges, cards and legend                                 |
| `src/my-career/detail-panel.tsx`   | Role and route details with their actions                                |
| `src/my-career/dialogs.tsx`        | Explore dialog and the confirm-before-change dialog                      |
| `src/my-career/sheets.tsx`         | Path history and Ask AI sheets                                           |

## Known deviations from En UI consumer checks

`node scripts/en-ui-check.mjs examples/enpath/src` still reports these, on purpose:

- **Arbitrary sizes** for the map geometry: fixed 176×104 cards, the 400px panel, the 140px strip bar and the 240px path picker. These match the design.
- **Inline styles** for values computed at runtime: card positions, the map transform, progress widths, and route colours on SVG edges and step rails. Every colour is a semantic token (`var(--color-…)`).

## Not built

- Sample data only; there is no API.
- "Plan an action" only shows a "My Actions is coming next" toast.
- There's no "no role assigned" state; the build doc lists it as not built.
- The sidebar is hidden below the `md` breakpoint, and there's no mobile navigation menu yet.
