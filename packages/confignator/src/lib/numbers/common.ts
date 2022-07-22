import Maybe, * as M from '../functional/maybe'

export const check_uint_number =
  <T extends number>(size: number) =>
  (value: number): Maybe<T> => {
    if (!Number.isInteger(value) || value >>> size) {
      return M.Nothing()
    }
    return M.Just(value as T)
  }

export const check_uint_bigint =
  <T extends bigint>(size: bigint) =>
  (value: bigint): Maybe<T> => {
    if (value < 0n || value >> size) {
      M.Nothing()
    }
    return M.Just(value as T)
  }

export const mask_uint_number =
  <T extends number>(size: number) =>
  (value: number): T => {
    return (((1 << size) - 1) & value) as T
  }

export const mask_uint_bigint =
  <T extends bigint>(size: bigint) =>
  (value: bigint): T => {
    return (((1n << size) - 1n) & value) as T
  }
