# Table

Contract ID: `component.table`

Displays structured row-and-column data with semantic table elements.

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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@enosta/en-ui"

;<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Member</TableHead>
      <TableHead>Role</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>Ada Lovelace</TableCell>
      <TableCell>Owner</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

Card-style table with a footer (pairs well with `CardFrame` or `Frame` page chrome):

```tsx
<Table variant="card">
  <TableHeader>...</TableHeader>
  <TableBody>...</TableBody>
  <TableFooter>
    <TableRow>
      <TableCell>Total</TableCell>
      <TableCell className="text-right">$132</TableCell>
    </TableRow>
  </TableFooter>
</Table>
```

Mark a row as selected for interactive tables (selection controls stay consumer-owned):

```tsx
<TableRow data-state="selected">
  <TableCell>Grace Hopper</TableCell>
  <TableCell>Editor</TableCell>
</TableRow>
```

## Guidelines

- Use `TableCaption` to identify the dataset when surrounding context is insufficient.
- Use `TableHead` for header cells; preserve native table structure and reading order.
- Body rows share a single surface by default; hover and `data-state="selected"` add theme-adaptive emphasis. Preserve another selected-state cue, such as a checkbox, when selection is interactive.
- The container scrolls horizontally on narrow screens; keep important identifiers in early columns.
- Use `variant="card"` when the grid should read as a set of cards, for example dashboards or standalone tables without an outer frame.

## Anatomy

```tsx
<Table>
  <TableCaption>Caption</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead>Header</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>Cell</TableCell>
    </TableRow>
  </TableBody>
  <TableFooter>
    <TableRow>
      <TableCell>Footer</TableCell>
    </TableRow>
  </TableFooter>
</Table>
```

Public exports: `tableVariants`, `TableVariant`, `TableProps`, `Table`, `TableHeader`, `TableBody`, `TableFooter`, `TableRow`, `TableHead`, `TableCell`, `TableCaption`.

## API Reference

### Table

| Prop        | Type                    | Default     | Description                                                                                     |
| ----------- | ----------------------- | ----------- | ----------------------------------------------------------------------------------------------- |
| `variant`   | `"default"` \| `"card"` | `"default"` | Visual treatment. `card` renders separated borders, rounded corners, and row surfaces as cards. |
| `className` | `string`                | —           | Consumer styling merged into the native table element.                                          |

### Table parts

`TableHeader`, `TableBody`, `TableFooter`, `TableRow`, `TableHead`, `TableCell`, and `TableCaption` accept the props of their native element (`thead`, `tbody`, `tfoot`, `tr`, `th`, `td`, `caption`) plus `className`, which merges with the part's token classes.

Native props pass through to the underlying elements. Use `className` for consumer styling without replacing protected interaction or accessibility behavior.

## Guidance

- Compose headers, body, and footer from the part components; do not replace the native table markup with styled `div` grids.
- Body rows share one surface by default. Preserve the row boundaries, hover treatment, and stronger selected emphasis when customizing backgrounds.
- `tableVariants` exposes the slot functions (`root`, `container`, `header`, `body`, `footer`, `row`, `head`, `cell`, `caption`) for consumers that need the same styles on custom markup.

## Accessibility

The component preserves native table semantics: `table`, `row`, `columnheader`, and `cell` roles, reading order, and caption association. Keep visible labels, focus indicators, and selection cues intact. Test compositions against WCAG 2.2 AA.

## Storybook

Stories are split by usage scenario and include copyable TSX source in the Docs source panel. Start with `Basic`, then review state, composition, and variant stories relevant to the feature.

## Migration

Classification: `compatible`. Styles composed through `tailwind-variants` slots with `tableVariants` exported; markup and props are unchanged.
