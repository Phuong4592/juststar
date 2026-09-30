# WCAG policy

- Target WCAG 2.2 AA for every stable component and accepted consumer composition.
- Normal text requires 4.5:1; large text requires 3:1; essential UI boundaries and focus indicators require 3:1 against adjacent colors.
- Hover, checked, selected, and toggled states are not contrast exceptions. Audit their rendered foreground, background, boundary, and focus colors separately from the default state.
- WCAG 2.2 AA target size is 24px by 24px with defined exceptions. En UI uses 28px compact, 32px comfortable, and 36px spacious targets; the 44px AAA target is advisory for touch-primary controls.
- AAA normal-text contrast of 7:1 is reported as an opportunity, not a universal release blocker.
- Do not count decorative signal rails or redundant status marks as text. The accompanying text and essential boundary must independently pass.
- Test every supported mode. A light-mode pass does not imply dark-mode conformance.
- Automated axe results are necessary but incomplete; keyboard order, visible focus, content clarity, zoom, reflow, and cognitive load still require review.
