declare const tag: unique symbol
export type Tag<T> = { readonly [tag]: T }

export type Tagged<T, V> = Tag<T> & V

export type V<Tag extends string, T> = { [x in Tag]: T }
