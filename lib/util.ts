import { AllFields } from './magic'

// Functional
// ==========

export const const_ =
  <T>(v: T) =>
  (): T =>
    v

// Types
// =====

export type Option<T> = T | null

// Enums
// =====

declare const TAG: unique symbol
export type Tag<T> = { readonly [TAG]: T }

export type Tagged<T, V> = Tag<T> & V

export type Key = string | number | symbol
export type Variant<Tag extends Key, T> = { [x in Tag]: T }

export type TagVariants<T> = { [K in keyof T]: Variant<K, T[K]> }
export type Enum<T> = TagVariants<T>[keyof T]

export type FlatVariant<Tag extends Key, T> = { $: Tag } & T
export type FlatEnum<T> = { [K in keyof T]: FlatVariant<K, T[K]> }[keyof T]

export type FlatVariant2<Tag extends Key, T> = { $: Tag; val: T }
export type FlatEnum2<T> = { [K in keyof T]: FlatVariant2<K, T[K]> }[keyof T]

export type VariantsFrom<T> = AllFields<T>
export type FlatEnumFrom<T> = FlatEnum2<VariantsFrom<T>>

export function flatten_enum<V>(value: Enum<V>): FlatEnum<V> {
  for (let key in value) {
    if (key !== '$') {
      let _result = value[key]
      let result = { $: key, ..._result }
      return result
    }
  }
  throw new Error(`Variant is empty: '${value}'.`)
}

export function flatten_enum_2<E>(value: E): FlatEnumFrom<E> {
  for (let key in value) {
    let _result = value[key]
    let result = { $: key, val: _result }
    return result as unknown as FlatEnumFrom<E>
  }
  throw new Error(`Variant is empty: '${value}'.`)
}

export const flatten_enum_f =
  <E>(value: E) =>
  <R>(f: (v: FlatEnumFrom<E>) => R) =>
    f(flatten_enum_2(value))

type MatchDict<V, R = void> = { [tag in keyof V]: (v: V[tag]) => R }
export const match =
  <E>(value: E) =>
  <R>(matcher: MatchDict<VariantsFrom<E>, R>): R =>
    flatten_enum_f(value)(({ $, val }) => {
      let arm = matcher[$]
      return arm(val)
    })

export const if_let =
  <E>(value: E) =>
  <K extends keyof VariantsFrom<E>>(tag: K) =>
  <R>(th: (v: VariantsFrom<E>[K]) => R) =>
  (el: () => R): R =>
    flatten_enum_f(value)(({ $, val }) => ($ === tag ? th(val) : el()))

// Experiments

// export function get_variant<V, T extends keyof V, E extends Enum<V>>(
//   tags: T[],
//   value: E
// ): [T, E[T]] {
//   for (let tag of tags) {
//     if (tag in value) {
//       return [tag, value[tag]]
//     }
//   }
//   throw new Error(`Invalid variant '${value}' for tags' ${tags}.`)
// }
//
// export const is_variant = <V, K extends keyof V>(
//   value: V[K],
//   tag: K
// ): value is V[typeof tag] => {
//   return tag in value
// }
