export type { Nat } from './nat'
export type { U8 } from './u8'
export type { U16 } from './u16'
export type { U64 } from './u64'
export type { U256 } from './u256'

export * as nat from './nat'
export * as u8 from './u8'
export * as u16 from './u16'
export * as u64 from './u64'
export * as u256 from './u256'

export const bits_mask = (x: bigint): bigint => (1n << x) - 1n
