import { Tag } from '../lib/tag_type'

export type BitChar = '0' | '1'
export type BitStr = string & Tag<'Bits'>

export const empty = '' as BitStr
export const zero = '0' as BitStr
export const one = '1' as BitStr

/**
  Receives a string literal type `T` and returns `T` itself if it is only
  composed of of "0"s and "1"s, or else, will return a different literal type
  that won't match the input.
  Based on: https://stackoverflow.com/a/67184772/1967121.
  */
// deno-fmt-ignore
type ValidBits<T extends string> = T extends BitChar
  ? T
  : T extends `${BitChar}${infer R}`
  ? T extends `${infer F}${R}`
    ? `${F}${ValidBits<R>}`
    : never
  : BitChar | ''

export function from<T extends string>(
  val: T extends ValidBits<T> ? T : ValidBits<T>
): BitStr {
  return val as BitStr
}

export const push =
  (bit: BitChar) =>
  (bits: BitStr): BitStr =>
    (bits + bit) as BitStr

export const push_front =
  (bit: BitChar) =>
  (bits: BitStr): BitStr =>
    (bit + bits) as BitStr

export const concat = (...bs: BitStr[]) =>
  bs.reduce((acc, b) => (acc + b) as BitStr)

export const slice = (start?: number, end?: number) => (bits: BitStr) =>
  bits.slice(start, end) as BitStr
