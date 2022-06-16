declare const tag: unique symbol
export type Tag<T> = { readonly [tag]: T }

export type Tagged<T, V> = Tag<T> & V

export type Key = string | number | symbol
export type Variant<Tag extends Key, T> = { [x in Tag]: T }

export type FlatVariant<Tag extends Key, T> = { $: Tag } & T

export type TagVariants<T> = { [K in keyof T]: Variant<K, T[K]> }
export type Enum<T> = TagVariants<T>[keyof T]

export type FlatEnum<T> = { [K in keyof T]: FlatVariant<K, T[K]> }[keyof T]

export function flatten_enum<V>(value: Enum<V>): FlatEnum<V> {
  for (let tag in value) {
    if (tag !== '$') {
      let _result = value[tag]
      let result = { $: tag, ..._result }
      return result
    }
  }
  throw new Error(`Variant is empty: '${value}'.`)
}

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
