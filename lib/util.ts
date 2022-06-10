declare const tag: unique symbol
export type Tag<T> = { readonly [tag]: T }

export type Tagged<T, V> = Tag<T> & V

export type V<Tag extends string, T> = { [x in Tag]: T }

export function get_variant<T extends string, V extends object>(
  tags: T[],
  value: any
): [T, any] {
  for (let tag of tags) {
    if (value.hasOwnProperty(tag)) {
      return [tag as T, value[tag]]
    }
  }
  throw new Error(
    `Invalid variant '${JSON.stringify(value)}' for tags' ${tags}.`
  )
}
