export * as result from './result'
export type { default as Result } from './result'

// export const compose2 = <A, B>(f1: (x: A) => B) => <C>(f2: (x: B) => C) => (x: A): C => f2(f1(x));

export const break_list =
  <T>(p: (x: T) => boolean) =>
  (xs: T[]): [T[], T[]] => {
    const len = xs.length
    let i = 0
    while (i < len && !p(xs[i])) {
      i++
    }
    return [xs.slice(0, i), xs.slice(i + 1)]
  }

export const drop_while =
  <T>(p: (x: T) => boolean) =>
  (xs: T[]): T[] => {
    const len = xs.length
    let i = 0
    while (i < len && p(xs[i])) {
      i++
    }
    return xs.slice(i)
  }
