import type { Tag } from '../tag_type'
import { check_uint_bigint, mask_uint_bigint } from './common'

export type U64 = bigint & Tag<'U64'>
export const size = 64n
export const zero = 0n as U64
export const check = check_uint_bigint<U64>(size)
export const mask = mask_uint_bigint<U64>(size)
