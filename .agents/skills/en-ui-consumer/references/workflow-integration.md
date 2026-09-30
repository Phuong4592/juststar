# Integration with specification workflows

Use this reference when another skill manages specifications, task status, approvals, or execution records.

Apply both workflows without allowing task bookkeeping to weaken the UI result:

- The workflow skill owns task scope, artifact format, status, and required verification. This skill owns component selection, visual direction, responsive behavior, interaction quality, and the rendered UI definition of done.
- “Smallest complete change” means the smallest change that produces a finished experience. It does not mean the least styling, the first compiling layout, or skipping responsive and browser work.
- Run the specification's verification and the En UI source and rendered checks. A passing unit test, typecheck, or task checkbox cannot substitute for browser evidence on substantial UI work.
- Treat visual tuning, wrapping, spacing, alignment, responsive transformation, and correcting an obviously unfinished surface as implementation details when they preserve the approved user outcome and information architecture.
- Revise or re-approve the specification only when the change alters user outcomes, information architecture, permissions, domain behavior, data contracts, or contradicts an accepted design. A direct user instruction authorizes that scoped change; do not request duplicate approval solely to synchronize wording.
- If an existing wireframe is intentionally low fidelity, preserve its information hierarchy and behavior rather than copying its placeholder styling as the final visual design.

Before marking a UI task complete, include the routes, states, consumer-defined viewports, interaction path, screenshots or browser observations, and material visual corrections in the workflow's verification record.
