export type Ok<T> = { _: 'Ok'; value: T }
export type Err<E> = { _: 'Err'; err: E }

export type Result<E, T> = (Ok<T> | Err<E>) & ResultBase<E, T>

type ResultBase<E, T> = {
  then: ThenFn<E, T>
  unwrap: UnwrapFn<E, T>
}

type KleisliFn<E, T, R> = (x: T) => Result<E, R>
type ThenFn<E, T> = <R>(
  this: Result<E, T>,
  fn: KleisliFn<E, T, R>
) => Result<E, R>
type UnwrapFn<E, T> = (this: Result<E, T>) => T

export const Ok = <E, T>(value: T): Result<E, T> => ({
  ...base,
  _: 'Ok',
  value: value,
})
export const Err = <E, T>(err: E): Result<E, T> => ({
  ...base,
  _: 'Err',
  err: err,
})

export default Result

// Functions

const base = {
  then,
  unwrap,
}

const map =
  <E, T, R>(fn: (x: T) => Result<E, R>) =>
  (r: Result<E, T>): Result<E, R> => {
    switch (r._) {
      case 'Ok':
        return fn(r.value)
      case 'Err':
        return Err(r.err)
    }
  }

export function then<E, T, R>(
  this: Result<E, T>,
  fn: KleisliFn<E, T, R>
): Result<E, R> {
  return map(fn)(this)
}

export function unwrap<E, T>(this: Result<E, T>): T {
  if (this._ == 'Err') {
    throw this.err
  }
  return this.value
}
