import type { Tag } from '../tag_type'
import { check_uint_number, mask_uint_number } from './common'

export type U16 = number & Tag<'U16'>
export const size = 16
export const zero = 0 as U16
export const check = check_uint_number<U16>(size)
export const mask = mask_uint_number<U16>(size)
