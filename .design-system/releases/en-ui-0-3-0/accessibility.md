# Accessibility Evidence: en-ui-0-3-0

- The stable Storybook catalog passes automated WCAG 2.2 AA scanning across all non-experimental stories.
- Button default and hover foreground/background pairs meet the 4.5:1 normal-text requirement, including danger and danger-soft treatments.
- Calendar weekday and outside-day text, form validation messages, Select placeholders, and compact supporting text use AA-safe rendered colors.
- Combobox and Select triggers expose accessible names, and Tooltip composes element triggers without nested interactive controls.
- The compact, comfortable, and spacious control contract is documented as 28px, 32px, and 36px; the 44px target remains advisory for touch-primary workflows.
- `pnpm design:tokens` retains two explicitly reported advisory contract gaps: the unused error-700/error-300 soft-state pair and the generic focus-ring/surface opportunity. Rendered stable stories and protected interaction checks pass.
