declare const tag: unique symbol
export type Tag<T> = { readonly [tag]: T }
