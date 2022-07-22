import type { Tag } from '../tag_type'
import { check_uint_number, mask_uint_number } from './common'

export type U8 = number & Tag<'U8'>
export const size = 8
export const zero = 0 as U8
export const check = check_uint_number<U8>(size)
export const mask = mask_uint_number<U8>(size)
