import * as R from '../lib/functional/result'
import { JSONValue } from '../lib/json'
import { SResult, Validator } from '../types'
import { address_opt_port_validator } from './address'
import { BaseValidator, ListValidator } from './base'

const check_range =
  <T extends number | bigint>(min?: T, max?: T) =>
  (x: T): SResult<T> => {
    if (min != undefined && x < min) {
      return R.Err(`'${x}' is less than '${min}'`)
    }
    if (max != undefined && x > max) {
      return R.Err(`'${x}' is greater than ${max}`)
    }
    return R.Ok(x)
  }

// TODO: validators for typed fixed size numbers

// Base Validators
// ---------------

export const str = new BaseValidator<string>((x: string) => R.Ok(x))

export const address_opt_port = address_opt_port_validator

export const yes_no = new BaseValidator<boolean>(
  (x: string): SResult<boolean> => {
    if (['y', 'yes', 'true', '1'].includes(x)) {
      return R.Ok(true as boolean)
    } else if (['n', 'no', 'false', '0'].includes(x)) {
      return R.Ok(false as boolean)
    }
    return R.Err(`'${x}' is not a valid boolean`)
  },
  (x: JSONValue) => {
    if (typeof x == 'boolean') {
      return R.Ok(x)
    }
    return R.Err(`'${x}' is not a valid boolean`)
  }
)

export const int = new BaseValidator<number>(
  // TODO: check integerness
  (x: string): SResult<number> => {
    const num = Number(x)
    if (x.length == 0 || isNaN(num)) {
      return R.Err(`'${x}' is not an integer`)
    }
    return R.Ok(num)
  },
  (x: JSONValue): SResult<number> => {
    if (typeof x == 'number') {
      return R.Ok(x)
    }
    return R.Err(`'${x}' is not a valid number`)
  }
)

export const bigint = new BaseValidator<bigint>(
  (x: string): SResult<bigint> => {
    const r_err: SResult<bigint> = R.Err(`'${x} is not an integer.`)
    if (x.length == 0) return r_err
    try {
      const num = BigInt(x)
      return R.Ok(num)
    } catch {
      return r_err
    }
  },
  (x: JSONValue): SResult<bigint> => {
    if (typeof x == 'number') {
      // TODO: check integerness
      return R.Ok(BigInt(x))
    }
    return R.Err(`'${x}' is not a valid number)`)
  }
)

export const int_range = (min?: number, max?: number): Validator<number> =>
  int.compose(check_range(min, max))

export const bigint_range = (min?: bigint, max?: bigint): Validator<bigint> =>
  bigint.compose(check_range(min, max))

// Composed Validators
// -------------------

export const optional = <T>(
  item_validator: Validator<T>
): Validator<T | null> =>
  new BaseValidator<T | null>((v: string) => {
    const r = item_validator.from_string(v)
    return r as SResult<T | null>
  })

export const list = <T>(item_validator: Validator<T>) =>
  new ListValidator(item_validator)
