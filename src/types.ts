export type PropsWithClassName<T> = T extends unknown
  ? Omit<T, "className"> & { className?: string }
  : never
