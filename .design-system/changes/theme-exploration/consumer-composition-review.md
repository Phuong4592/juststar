# Theme Lab Consumer Composition Review

## Primary task

Identify renewal-risk accounts, understand why intervention is required, and start the next action.

## Composition

| Region             | User value and priority | Wide role                 | Narrow transformation                                              | Emphasis                                                          |
| ------------------ | ----------------------- | ------------------------- | ------------------------------------------------------------------ | ----------------------------------------------------------------- |
| Intervention queue | Primary work            | Dominant table surface    | Remains immediately after the header and owns horizontal scrolling | Scale, placement, selection state, filters, and row actions       |
| Portfolio status   | Supporting context      | Compact four-value strip  | Becomes a short horizontal scroller                                | Dense values and restrained surface contrast                      |
| Forecast lock      | Time-sensitive context  | Compact action notice     | Wraps without displacing the queue                                 | Status badge, deadline, and one direct action                     |
| Today's priorities | Supporting action       | Adjacent rail             | Moves below the intervention queue                                 | Ordered urgency and status badges                                 |
| Owner capacity     | Supporting planning     | Middle section of rail    | Moves below priorities                                             | Avatars, workload bars, and assigned value                        |
| Recent activity    | Supporting history      | Middle section of rail    | Moves below capacity                                               | Actor identity, action, and time                                  |
| Portfolio pulse    | Passive reporting       | Lower section of the rail | Remains after required work                                        | Subordinate typography and dividers                               |
| Playbooks          | Reusable follow-up work | Full-width ledger         | Rows reflow to two columns with actions below                      | Readiness, trigger, and explicit action                           |
| Theme switch       | Preview control         | Compact utility bar       | Wraps above the page header                                        | Pressed state, visible label, and keyboard-operable En UI buttons |

## Review decisions

- Replace the oversized showcase hero with the public `PageHeader` anatomy.
- Put the intervention queue before passive metrics in source and narrow-screen order.
- Replace equal metric cards with a compact status strip because the values are compared as one set.
- Keep glass blur on the sticky utility bar where preserving page context has a real overlay purpose.
- Keep the table as a deliberate horizontal scroll owner instead of converting comparable records into cards.
- Add multi-field filtering, selected-row actions, ten representative records, avatars, progress, pagination, activity, and reusable playbooks to exercise more of the component system.
- Add Bauhaus, Terminal, Editorial, Pop, and High Contrast directions while keeping all ten themes on the same content and interaction structure.
- Preserve one `h1`, named regions, visible labels, En UI controls, and complete account values.
