# Calendar

Contract ID: `component.calendar`

Displays an interactive date grid for single, multiple, or range date selection.

## Installation

```bash
pnpm add @enosta/en-ui
```

Import the package styles once at the application entry point:

```tsx
import "@enosta/en-ui/styles.css"
```

## Usage

```tsx
import { Calendar } from "@enosta/en-ui"

;<Calendar mode="single" selected={date} onSelect={setDate} />
```

Range selection:

```tsx
<Calendar mode="range" selected={range} onSelect={setRange} />
```

Month and year dropdown navigation:

```tsx
<Calendar captionLayout="dropdown" startMonth={new Date(2020, 0)} endMonth={new Date(2030, 11)} />
```

## Guidelines

- Choose one DayPicker selection mode (`single`, `multiple`, `range`) and use the matching `selected` and `onSelect` types.
- Use `disabled` matchers for unavailable dates instead of intercepting selection afterward.
- Keep keyboard navigation and visible focus styles intact.
- Do not wrap the day grid in application composition owned by consumers; Calendar exposes the grid only.

## Anatomy

```tsx
<Calendar mode="single" selected={date} onSelect={setDate} />
```

Public exports: `Calendar`, `CalendarProps`.

## API Reference

| Prop              | Type                                | Default    | Description                                         |
| ----------------- | ----------------------------------- | ---------- | --------------------------------------------------- |
| `mode`            | `"single" \| "multiple" \| "range"` | `"single"` | Selection mode for the calendar.                    |
| `captionLayout`   | `"label" \| "dropdown"`             | `"label"`  | Use `"dropdown"` for month/year dropdown caption.   |
| `selected`        | `Date \| Date[] \| DateRange`       | —          | The selected date(s), matching the selection mode.  |
| `onSelect`        | `(value) => void`                   | —          | Callback when the selection changes.                |
| `showOutsideDays` | `boolean`                           | `true`     | Show days from adjacent months.                     |
| `startMonth`      | `Date`                              | —          | First selectable month for navigation bounds.       |
| `endMonth`        | `Date`                              | —          | Last selectable month for navigation bounds.        |
| `classNames`      | `Partial<ClassNames>`               | —          | Override or extend classes per calendar part.       |
| `components`      | `Partial<CustomComponents>`         | —          | Override default subcomponents such as Chevron.     |
| `footer`          | `ReactNode`                         | —          | Content announced to screen readers below the grid. |
| `disabled`        | `Matcher \| Matcher[]`              | —          | Days that cannot be selected.                       |
| `className`       | `string`                            | —          | Consumer styling merged into the root element.      |

All other `@daypicker/react` props (formatters, labels, locale, `numberOfMonths`, `fixedWeeks`, and more) pass through unchanged. Use `className` for consumer styling without replacing protected interaction or accessibility behavior.

## CSS Variables

| Variable      | Description                                                            |
| ------------- | ---------------------------------------------------------------------- |
| `--cell-size` | Size of each day cell. Defaults to `40px`, `36px` from `sm` and above. |

Customize the cell size with a custom class:

```tsx
<Calendar className="[--cell-size:32px]" />
```

## Guidance

- Prefer `mode="range"` with `numberOfMonths={2}` for booking-style start and end dates.
- Combine `startMonth` and `endMonth` with `captionLayout="dropdown"` so dropdown navigation stays within valid bounds.
- Use the `footer` prop for screen-reader-announced selection feedback, such as the formatted selected date.

## Accessibility

The component preserves its native or DayPicker keyboard behavior, focus management, disabled semantics, and accessible relationships. Day buttons follow a roving-tabindex pattern and keep visible focus indicators. Test compositions against WCAG 2.2 AA.

## Storybook

Stories are split by usage scenario and include copyable TSX source in the Docs source panel. Start with `Basic`, then review `Multiple`, `Range`, and `DropdownNavigation` for the feature you need.

## Migration

Classification: `compatible`. Introduces the component; styles map to En UI theme variables.
