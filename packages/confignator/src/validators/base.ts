import * as R from '../lib/functional/result'
import { is_json_array, JSONValue } from '../lib/json'
import { SResult, Validator } from '../types'

export class BaseValidator<T> implements Validator<T> {
  private readonly fn_from_string: (value: string) => SResult<T>
  private readonly fn_from_json?: (value: JSONValue) => SResult<T>
  constructor(
    from_string: (v: string) => SResult<T>,
    from_json?: (v: JSONValue) => SResult<T>
  ) {
    this.fn_from_string = from_string
    this.fn_from_json = from_json
  }
  from_string(v: string): SResult<T> {
    // if (typeof v !== "string") { return R.Err(`${v} is not a string`) }; // ???
    return this.fn_from_string(v)
  }
  from_json(v: JSONValue): SResult<T> {
    if (this.fn_from_json !== undefined) {
      return this.fn_from_json(v)
    } else {
      if (typeof v === 'string') {
        return this.from_string(v)
      }
      return R.Err(`${v} is not a string`)
    }
  }

  compose<Re>(fn: (x: T) => SResult<Re>): Validator<Re> {
    return new ComposedValidator<T, Re>(this, fn)
  }
}

export class ComposedValidator<B, T> implements Validator<T> {
  private readonly base_validator: Validator<B>
  private readonly fn: (x: B) => SResult<T>
  constructor(base_validator: Validator<B>, fn: (x: B) => SResult<T>) {
    this.base_validator = base_validator
    this.fn = fn
  }
  from_string(v: string): SResult<T> {
    return this.base_validator.from_string(v).then(this.fn)
  }
  from_json(v: JSONValue): SResult<T> {
    return this.base_validator.from_json(v).then(this.fn)
  }
}

export class ListValidator<T> implements Validator<T[]> {
  private readonly item_validator: Validator<T>
  constructor(item_validator: Validator<T>) {
    this.item_validator = item_validator
  }
  from_string(v: string): SResult<T[]> {
    const parts = v.split(',')
    const result = []
    for (const part of parts) {
      const res = this.item_validator.from_string(part)
      if (res._ == 'Err') {
        return R.Err(res.err)
      }
      result.push(res.value)
    }
    return R.Ok(result)
  }
  from_json(v: JSONValue): SResult<T[]> {
    if (!is_json_array(v)) {
      return R.Err(`${v} is not an array`)
    }
    // TODO: extract repeated code
    const result = []
    for (const item of v) {
      const res = this.item_validator.from_json(item)
      if (res._ == 'Err') {
        return R.Err(res.err)
      }
      result.push(res.value)
    }
    return R.Ok(result)
  }
}
