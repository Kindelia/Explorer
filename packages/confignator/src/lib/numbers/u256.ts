import type { Tag } from '../tag_type'
import { check_uint_bigint, mask_uint_bigint } from './common'

export type U256 = bigint & Tag<'U256'>
export const size = 256n
export const zero = 0n as U256
export const check = check_uint_bigint<U256>(size)
export const mask = mask_uint_bigint<U256>(size)
