// Functional
// ==========

export const const_ =
  <T>(v: T) =>
  (): T =>
    v
