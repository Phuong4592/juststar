# Component selection

Use this reference before choosing consequential controls, containers, overlays, navigation, or data presentation. Correct component selection starts from user behavior, not visual resemblance.

## Installed-version authority

Run `en-ui-context` with the product need first. It searches the installed contracts and guidance and can return several relevant components in one bounded result. Then read these physical files only for the selected components:

- `contracts/component-index.md`: compact generated catalog for the installed version.
- `contracts/design-system.contract.json`: aggregate import allowlist when exact export validation is needed.
- `src/components/<name>/<name>.contract.json`: authoritative contract for one installed atom.
- `src/components/<name>/README.md`: usage guidance for that atom.

The package also publishes resolver subpaths named `@enosta/en-ui/contract.json`, `@enosta/en-ui/contracts/<name>`, and `@enosta/en-ui/docs/<name>`. Those names are useful to Node and bundlers, but they are not literal files at `node_modules/@enosta/en-ui/contract.json`, `contracts/<name>`, or `docs/<name>`. A filesystem-reading agent must use the physical paths above. If a later package version omits source contracts, resolve the published subpath with the project's package manager or Node resolver rather than guessing a path.

Do not import a name merely because it appears in roadmap vocabulary, an older example, the current skill, or package website copy. When a needed capability is absent, use appropriate semantic HTML or create a consumer-owned component from installed public components. Record an upstream package gap only when the capability should be shared across products. Do not invent an export.

## When the package has no component

Do not force the product into the nearest En UI component when its behavior is wrong. Create a local consumer component when the installed package clearly lacks the capability:

- Prefer native semantics and platform behavior, then compose available En UI atoms around them.
- For custom interaction, explicitly own accessible naming, keyboard operation, focus management, states, reduced motion, responsive behavior, and tests in the consumer.
- Keep the API and name consumer-owned. Do not import package internals, imitate a nonexistent export, or describe the result as En UI.
- If the same atomic capability belongs across products, record it as an upstream package candidate after the consumer need is solved; do not block the feature on that promotion.

## Component selection record

For each choice that materially affects the workflow or page structure, record:

| Product need                        | Selected export or semantic structure | Rejected alternative | Product reason                                           |
| ----------------------------------- | ------------------------------------- | -------------------- | -------------------------------------------------------- |
| Find one item in a large option set | `Combobox`                            | `Select`             | Search is necessary to locate an option efficiently.     |
| Separate related content            | Consumer-owned named `section`        | `Card`               | The content is page anatomy, not an independent object.  |
| Present focused interrupting work   | `Dialog`                              | Inline disclosure    | The task needs temporary focus and a clear return point. |

Keep the record in working notes or an existing specification. Include only consequential decisions; do not document every Typography element.

## Selection questions

### Controls

- Use `Button` for actions. Use a semantic link for navigation; apply supported button styling only when navigation must look like an action.
- Use `Select` when users choose from a bounded set that is practical to scan without typing.
- Use `Combobox` when the option set is large, filtering is essential, or multiple selection uses the installed chips anatomy.
- Use `Checkbox` or `CheckboxGroup` for independently selectable choices. Do not use Tabs or action buttons as form inputs.
- Choose the installed binary-setting component when available. If it is not exported, use an accessible native or consumer-owned control; do not import a nonexistent `Switch` or `Toggle`.

### Content and boundaries

- Use a consumer-owned semantic `section` with a correctly levelled `Typography` heading for named page anatomy.
- Use `Card` only for an independently actionable, selectable, movable, or stacked object.
- Use `Frame` for a bounded presentation region whose frame itself communicates context or containment.
- Use `Separator` only when spacing and title hierarchy do not adequately communicate a meaningful boundary.
- Use `Badge` for compact status or classification. Use `Alert` for persistent in-context feedback and `Toast` for transient confirmation when those exports exist in the installed version.

### Data and navigation

- Use `Table` when users compare multiple records through stable columns, sorting, selection, or scanning. Use a structured list when identity and summary matter more than cross-row column comparison.
- Use `Tabs` only for related views of the same object or workflow. Use navigation links when leaving the current context.
- Use `Pagination` only when it is exported by the installed version. Otherwise follow the consumer's existing pagination or incremental-loading pattern without fabricating an En UI component.
- Application shells, headers, sidebars, page containers, page sections, split layouts, authentication pages, chat pages, and workspaces are consumer-owned structures. Do not look for or import them from En UI.

### Overlays

- Use `Popover` for brief contextual content anchored to a trigger.
- Use `Dialog` for focused work that can be completed without losing necessary page context.
- Prefer a dedicated page or persistent panel for long, multi-step, immersive, or context-dependent work.
- Do not import a nonexistent `Drawer`, `Sheet`, `Menu`, or `AlertDialog`. When the product genuinely needs missing overlay behavior, implement and test it as a consumer-owned component or choose a dedicated page when that better preserves context.

## Misuse review

Before implementation, reject a choice when any answer is yes:

- Is the component selected because its default screenshot looks attractive rather than because its behavior matches the task?
- Does a Card duplicate separation already established by spacing, headings, or a parent surface?
- Does an overlay hide context required to complete the task?
- Does a Table force unrelated data into columns, or does a card list prevent useful column comparison?
- Does the choice depend on an export not present in the installed aggregate contract?
- Is a consumer-authored imitation replacing protected behavior already owned by En UI?
- Is page geometry being delegated to a package component instead of expressed by the consumer's product requirements and local pattern contract?
