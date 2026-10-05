// Joins conditional class names. En UI's `cn` is not part of its public contract.
export const cx = (...classes: (string | false | null | undefined)[]) =>
  classes.filter(Boolean).join(" ")
