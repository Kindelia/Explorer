import type { Key } from './enum'

// Magic from
// https://stackoverflow.com/questions/65750673/collapsing-a-discriminated-union-derive-an-umbrella-type-with-all-possible-key

// I replaced `undefined` usages with the placeholder below so we can exclude
// it properly on the last definition.

declare const PLACEHOLDER: unique symbol
type Placeholder = typeof PLACEHOLDER

// Magic as far as I'm concerned.
// Taken from https://stackoverflow.com/a/50375286/3229534
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I
) => void
  ? I
  : never

// This utility lets T be indexed by any key
type Indexify<T> = T & { [str: Key]: Placeholder }

// To make a type where all values are undefined, so that in AllUnionKeys<T>
// TS doesn't remove the keys whose values are incompatible, e.g. string & number
type UndefinedVals<T> = { [K in keyof T]: unknown }

// This returns a union of all keys present across all members of the union T
type AllUnionKeys<T> = keyof UnionToIntersection<T>

// Where the (rest of the) magic happens ✨
export type AllFields<T> = {
  [K in AllUnionKeys<T>]: Exclude<Indexify<T>[K], Placeholder>
}
