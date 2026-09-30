# Component Catalog

The current development catalog exports 25 atomic components and interaction primitives. The aggregate JSON contract is authoritative for each export's availability, maturity, API, states, tests, and migration metadata.

The family vocabulary below includes planned capabilities for roadmap discussion. It is not an import list. Agents and consumers must use the aggregate contract shipped by their installed package version to discover real exports.

| Family       | Components                                                                                                                                                                                                                                                                                                                                                                            |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Actions      | [Button](#button) · [Toggle](#toggle) · [Toggle Group](#toggle-group)                                                                                                                                                                                                                                                                                                                 |
| Data Display | [Accordion](#accordion) · [Avatar](#avatar) · [Badge](#badge) · [Card](#card) · [Empty](#empty) · [Frame](#frame) · [Group](#group) · [Kbd](#kbd) · [Preview Card](#preview-card) · [Separator](#separator) · [Skeleton](#skeleton) · [Table](#table)                                                                                                                                 |
| Feedback     | [Alert](#alert) · [Meter](#meter) · [Progress](#progress) · [Spinner](#spinner) · [Toast](#toast)                                                                                                                                                                                                                                                                                     |
| Forms        | [Autocomplete](#autocomplete) · [Checkbox](#checkbox) · [Combobox](#combobox) · [Field](#field) · [Fieldset](#fieldset) · [Form](#form) · [Input](#input) · [Input Group](#input-group) · [Label](#label) · [Number Field](#number-field) · [OTP Field](#otp-field) · [Radio Group](#radio-group) · [Select](#select) · [Slider](#slider) · [Switch](#switch) · [Textarea](#textarea) |
| Navigation   | [Breadcrumb](#breadcrumb) · [Command](#command) · [Pagination](#pagination) · [Tabs](#tabs) · [Toolbar](#toolbar)                                                                                                                                                                                                                                                                     |
| Overlays     | [Alert Dialog](#alert-dialog) · [Context Menu](#context-menu) · [Dialog](#dialog) · [Drawer](#drawer) · [Menu](#menu) · [Popover](#popover) · [Sheet](#sheet) · [Tooltip](#tooltip)                                                                                                                                                                                                   |
| Primitives   | [Collapsible](#collapsible) · [Scroll Area](#scroll-area) · [Typography](#typography)                                                                                                                                                                                                                                                                                                 |

Later releases may add atomic capabilities in workflow-based waves backed by consumer evidence. Application composition remains consumer-owned.

Composition recipes such as Date Picker are documented as patterns, not catalog components.

## Historical atomic exports

This table records the original atomic export wave. Use `contracts/design-system.contract.json` or the installed `@enosta/en-ui/contract.json` for the current export set.

### Original 0.3.0 atomic exports

| Export      | Family       | Contract status | Contract                |
| ----------- | ------------ | --------------- | ----------------------- |
| Avatar      | Data Display | Beta            | `component.avatar`      |
| Badge       | Data Display | Beta            | `component.badge`       |
| Button      | Actions      | Beta            | `component.button`      |
| Card        | Data Display | Beta            | `component.card`        |
| Checkbox    | Forms        | Beta            | `component.checkbox`    |
| Combobox    | Forms        | Beta            | `component.combobox`    |
| Dialog      | Overlays     | Beta            | `component.dialog`      |
| Field       | Forms        | Beta            | `component.field`       |
| Frame       | Data Display | Beta            | `component.frame`       |
| Input       | Forms        | Beta            | `component.input`       |
| Kbd         | Data Display | Beta            | `component.kbd`         |
| Popover     | Overlays     | Beta            | `component.popover`     |
| Scroll Area | Primitives   | Beta            | `component.scroll-area` |
| Select      | Forms        | Beta            | `component.select`      |
| Separator   | Data Display | Beta            | `component.separator`   |
| Skeleton    | Data Display | Beta            | `component.skeleton`    |
| Spinner     | Feedback     | Beta            | `component.spinner`     |
| Table       | Data Display | Beta            | `component.table`       |
| Toast       | Feedback     | Beta            | `component.toast`       |
| Tooltip     | Overlays     | Beta            | `component.tooltip`     |
| Typography  | Primitives   | Beta            | `component.typography`  |
| LoginPage   | Page Pattern | Beta            | `component.login-page`  |

### Added in 1.2.0

| Export | Family     | Contract status | Contract          |
| ------ | ---------- | --------------- | ----------------- |
| Alert  | Feedback   | Beta            | `component.alert` |
| Tabs   | Navigation | Beta            | `component.tabs`  |

The broader family lists below retain planned vocabulary for roadmap discussion. Planned names are not package exports and must not be imported by consumers.

## Component Definitions

### Actions

Components that trigger actions or change state.

- **Button**: A button or a component that looks like a button.
- **Toggle**: A button that switches between two states.
- **Toggle Group**: A group of toggle buttons where one or multiple can be selected.

### Data Display

Components for presenting content, structure, and read-only information.

- **Accordion**: A set of collapsible panels with headings.
- **Avatar**: A visual representation of a user or entity.
- **Badge**: A small status indicator or label component.
- **Card**: A content container for grouping related information.
- **Empty**: A container for displaying empty state information.
- **Frame**: A container component for displaying content in a frame.
- **Group**: A container component for grouping related content with consistent styling.
- **Kbd**: A component for displaying keyboard keys and shortcuts.
- **Preview Card**: A rich preview component for displaying linked content.
- **Separator**: A visual divider for separating content sections.
- **Skeleton**: A placeholder for loading content.
- **Table**: A structured data display component with rows and columns.

### Feedback

Components that communicate status, progress, or notifications to users.

- **Alert**: A callout for displaying important information.
- **Meter**: A visual representation of a value within a known range.
- **Progress**: A visual indicator showing the completion status of a task.
- **Spinner**: An indicator that can be used to show a loading state.
- **Toast**: A temporary notification message that appears and disappears automatically.

### Forms

Components for collecting, validating, and submitting user input.

- **Autocomplete**: An input that suggests options as you type.
- **Checkbox**: A binary toggle input for selecting one or multiple options.
- **Combobox**: An input combined with a list of predefined items to select.
- **Field**: A wrapper component for form inputs with labels and validation.
- **Fieldset**: A group of related form fields with a common label.
- **Form**: A complete form implementation with validation and submission handling.
- **Input**: A native input element.
- **Input Group**: A flexible component for grouping inputs with addons, buttons, and other elements.
- **Label**: Renders an accessible label associated with controls.
- **Number Field**: A specialized input for numeric values with increment/decrement controls.
- **OTP Field**: A segmented input for one-time passwords and verification codes.
- **Radio Group**: A set of mutually exclusive options presented as radio buttons.
- **Select**: A common form component for choosing a predefined value in a dropdown menu.
- **Slider**: A draggable control for selecting values from a continuous range.
- **Switch**: A toggle control for binary on/off states.
- **Textarea**: A multi-line text input for longer content.

### Navigation

Components that help users move through an application or access commands.

- **Breadcrumb**: Displays the path to the current resource using a hierarchy of links.
- **Command**: A command palette component built with Dialog and Autocomplete for searching and executing commands.
- **Pagination**: A pagination with page navigation, next and previous links.
- **Tabs**: A navigation component for switching between different views or content panels.
- **Toolbar**: A container for grouping related actions or controls.

### Overlays

Components that appear above the main content to capture attention or provide context.

- **Alert Dialog**: A modal dialog that interrupts the user workflow for critical confirmations.
- **Context Menu**: A menu that appears at the pointer on right click or long press.
- **Dialog**: A modal overlay for displaying content that requires user interaction.
- **Drawer**: A mobile-first panel that slides in from the edge of the screen with swipe gestures, snap points, and nested drawer support.
- **Menu**: A list of actions or options revealed on demand.
- **Popover**: A floating container that appears near a trigger element.
- **Sheet**: A desktop-oriented flyout that opens from the side of the screen, based on the Dialog component.
- **Tooltip**: A small overlay that provides contextual information on hover or focus.

### Primitives

Low-level building blocks for composing custom components.

- **Collapsible**: A component that toggles visibility of content sections.
- **Scroll Area**: A container with custom scrollbars for overflow content.
- **Typography**: A text component that maps content to the declared type-role scale with semantic HTML tags and accessible defaults.
