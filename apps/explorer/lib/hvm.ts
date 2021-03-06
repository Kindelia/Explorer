import { flatten_enum, if_let, match } from 'kindelia/utils/enum'

import * as T from './types'

// TODO: bigint literals

let is_between = (num: bigint, min: number, max: number): boolean => {
  return num >= min && num <= max
}

let char_to_bigint = (char: string): bigint => {
  return BigInt(char.charCodeAt(0))
}

/** '1234567890' -> 1234567890n */
export function read_num(str: T.StrNum): bigint {
  return BigInt(str)
}

/**
 * Inverse of `name_to_num`.
 *
 * ```bigint -> 'Nat.add'```
 */
export function num_to_name(num: bigint): T.Name {
  let name = ''
  while (num > 0) {
    let code = num % BigInt(64)
    code = (function () {
      if (code === BigInt(0)) return char_to_bigint('.')
      if (is_between(code, 1, 10)) return code - BigInt(1) + char_to_bigint('0')
      if (is_between(code, 11, 36))
        return code - BigInt(11) + char_to_bigint('A')
      if (is_between(code, 37, 62))
        return code - BigInt(37) + char_to_bigint('a')
      if (code === BigInt(63)) return char_to_bigint('_')
      throw new Error('Invalid character') // TODO?
    })()
    let char = String.fromCharCode(Number(code))
    name += char
    num = num / BigInt(64)
  }
  name = name.split('').reverse().join('')
  return name as T.Name
}

/**
 * Inverse of `num_to_name`.
 *
 * 'Nat.add' -> bigint
 */
export function name_to_num(name: T.Name): bigint {
  let num = BigInt(0)
  for (let i = 0; i < name.length; i++) {
    let char = name[i]

    if (char == '.') {
      num = num * BigInt(64) + BigInt(0)
    } else if (char >= '0' && char <= '9') {
      num =
        num * BigInt(64) +
        BigInt(1) +
        char_to_bigint(char) -
        char_to_bigint('0')
    } else if (char >= 'A' && char <= 'Z') {
      num =
        num * BigInt(64) +
        BigInt(11) +
        char_to_bigint(char) -
        char_to_bigint('A')
    } else if (char >= 'a' && char <= 'z') {
      num =
        num * BigInt(64) +
        BigInt(37) +
        char_to_bigint(char) -
        char_to_bigint('a')
    } else if (char == '_') {
      num = num * BigInt(64) + BigInt(63)
    }
  }
  return num
}

export function num_to_oper(num: bigint): string {
  switch (num) {
    case BigInt(0):
      return '+'
    case BigInt(1):
      return '-'
    case BigInt(2):
      return '*'
    case BigInt(3):
      return '/'
    case BigInt(4):
      return '%'
    case BigInt(5):
      return '&'
    case BigInt(6):
      return '|'
    case BigInt(7):
      return '^'
    case BigInt(8):
      return '<<'
    case BigInt(9):
      return '>>'
    case BigInt(10):
      return '<'
    case BigInt(11):
      return '<='
    case BigInt(12):
      return '='
    case BigInt(13):
      return '>='
    case BigInt(14):
      return '>'
    case BigInt(15):
      return '!='
    default:
      return '?'
  }
}

export function read_block_content(block: T.BlockContentJson): T.BlockContent {
  return block.map(read_stmt)
}

export function read_stmt(_stmt: T.StatementJson): T.Statement {
  let value = flatten_enum<T.StatementJson_Variants>(_stmt)
  switch (value.$) {
    case 'Ctr':
      return {
        Ctr: {
          name: value.name,
          args: value.args,
        },
      }
    case 'Fun':
      return {
        Fun: {
          name: value.name,
          args: value.args,
          func: read_rules(value.func),
          init: read_term(value.init, 0),
        },
      }
    case 'Run':
      return {
        Run: {
          body: read_term(value.body, 0),
        },
      }
  }
}

export function read_rules(rules: T.RuleJson[]): T.Rule[] {
  return rules.map(read_rule)
}

export function read_rule(rule: T.RuleJson): T.Rule {
  return {
    lhs: read_term(rule.lhs, 0),
    rhs: read_term(rule.rhs, 0),
  }
}

export function read_term(_term: T.TermJson, depth: number): T.Term {
  const MAX_DEPTH = 10
  if (depth > MAX_DEPTH) {
    return {
      Var: {
        name: '...' as T.Name,
      },
    }
  } else {
    let value = flatten_enum<T.TermJson_Variants>(_term)
    switch (value.$) {
      case 'Var':
        return {
          Var: {
            name: value.name,
          },
        }
      case 'Dup':
        return {
          Dup: {
            nam0: value.nam0,
            nam1: value.nam1,
            expr: read_term(value.expr, depth + 1),
            body: read_term(value.body, depth + 1),
          },
        }
      case 'Lam':
        return {
          Lam: {
            name: value.name,
            body: read_term(value.body, depth + 1),
          },
        }
      case 'App':
        const func = value.func
        const argm = value.argm
        return match(read_io(_term, depth))<T.Term>({
          Ok: (io) => ({
            IO: io,
          }),
          Err: () => {
            return {
              App: {
                func: read_term(func, depth + 1),
                argm: read_term(argm, depth + 1),
              },
            }
          },
        })
      case 'Ctr':
        const name = value.name
        const args = value.args
        return match(read_io(_term, depth))<T.Term>({
          Ok: (io) => ({
            IO: io,
          }),
          Err: () => {
            return {
              Ctr: {
                name: name,
                args: args.map((arg) => read_term(arg, depth + 1)),
              },
            }
          },
        })
      case 'Fun':
        return {
          Fun: {
            name: value.name,
            args: value.args.map((arg) => read_term(arg, depth + 1)),
          },
        }
      case 'Num':
        return {
          Num: {
            numb: BigInt(value.numb),
          },
        }
      case 'Op2':
        return {
          Op2: {
            oper: read_num(value.oper),
            val0: read_term(value.val0, depth + 1),
            val1: read_term(value.val1, depth + 1),
          },
        }
    }
  }
}

export function read_io(
  _term: T.TermJson,
  depth: number
): T.Result<T.IO, string> {
  const term = flatten_enum<T.TermJson_Variants>(_term)
  switch (term.$) {
    case 'App':
      const func = flatten_enum<T.TermJson_Variants>(term.func)
      const argm = flatten_enum<T.TermJson_Variants>(term.argm)
      if (func.$ === 'Fun' && argm.$ === 'Lam') {
        return read_io_app(func, argm, depth)
      } else {
        return {
          Err: 'not a valid aplication in io',
        }
      }
    case 'Ctr':
      if (term.name === 'DONE') {
        return read_io_ctr(term.args, depth)
      } else {
        return {
          Err: 'not a valid constructor in io',
        }
      }
    default:
      return {
        Err: `read_io: ${term.$}`,
      }
  }
}

export function read_io_app(
  func: T.FunJson,
  argm: T.LamJson,
  depth: number
): T.Result<T.IO, string> {
  const body = read_io(argm.body, depth + 1)
  return match(body)<T.Result<T.IO, string>>({
    Ok: (body) => {
      switch (func.name) {
        case 'Call':
          return read_io_call(func, argm, body, depth)
        case 'Save':
          return read_io_save(func, argm, body, depth)
        case 'Load':
          return read_io_load(func, argm, body, depth)
        case 'Take':
          return read_io_take(func, argm, body, depth)
        default:
          return {
            Err: `no an io: ${func.name}`,
          }
      }
    },
    Err: (err) => {
      return {
        Err: err,
      }
    },
  })
}

export function read_io_call(
  func: T.FunJson,
  argm: T.LamJson,
  body: T.IO,
  depth: number
): T.Result<T.IO, string> {
  if (func.args.length !== 2) {
    return {
      Err: 'not a valid call in io',
    }
  }
  const name = func.args[0]
  const tupl = func.args[1]
  return if_let(name)('Num')<T.Result<T.IO, string>>((name) => {
    return if_let(tupl)('Ctr')<T.Result<T.IO, string>>((tupl) => ({
      Ok: {
        Call: {
          func: num_to_name(read_num(name.numb)),
          args: tupl.args.map((arg) => read_term(arg, depth + 1)),
          varv: argm.name,
          body: body,
        },
      },
    }))(() => ({
      Err: 'not a valid call in io',
    }))
  })(() => ({
    Err: 'not a valid call in io',
  }))
}

export function read_io_save(
  func: T.FunJson,
  argm: T.LamJson,
  body: T.IO,
  depth: number
): T.Result<T.IO, string> {
  if (func.args.length !== 1) {
    return {
      Err: 'not a valid save in io',
    }
  }
  const term = func.args[0]
  return {
    Ok: {
      Save: {
        body: body,
        varv: argm.name,
        term: read_term(term, depth + 1),
      },
    },
  }
}

export function read_io_take(
  func: T.FunJson,
  argm: T.LamJson,
  body: T.IO,
  depth: number
): T.Result<T.IO, string> {
  if (func.args.length !== 0) {
    return {
      Err: 'not a valid take in io',
    }
  }
  return {
    Ok: {
      Take: {
        body: body,
        varv: argm.name,
      },
    },
  }
}

export function read_io_load(
  func: T.FunJson,
  argm: T.LamJson,
  body: T.IO,
  depth: number
): T.Result<T.IO, string> {
  if (func.args.length !== 0) {
    return {
      Err: 'not a valid load in io',
    }
  }
  return {
    Ok: {
      Load: {
        body: body,
        varv: argm.name,
      },
    },
  }
}

export function read_io_ctr(
  args: T.TermJson[],
  depth: number
): T.Result<T.IO, string> {
  if (args.length !== 1) {
    return { Err: 'not a valid constructor in io' }
  }
  return {
    Ok: {
      Done: {
        term: read_term(args[0], depth + 1),
      },
    },
  }
}
