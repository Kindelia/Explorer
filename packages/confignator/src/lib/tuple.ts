export type Quadruple<T> = [T, T, T, T]
export type Sextuple<T> = [T, T, T, T, T, T]
export type Octuple<T> = [T, T, T, T, T, T, T, T]

export function check_4<T>(arr: T[]): arr is Quadruple<T> {
  return arr.length === 4
}

export function check_6<T>(arr: T[]): arr is Sextuple<T> {
  return arr.length === 6
}

export function check_8<T>(arr: T[]): arr is Octuple<T> {
  return arr.length === 8
}
