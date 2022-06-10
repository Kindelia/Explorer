import { json } from 'stream/consumers'
import * as T from './types'

let is_betweeen = (num: bigint, min: number, max: number): boolean => {
  return num >= min && num <= max
}
let char_to_bigint = (char: string): bigint => {
  return BigInt(char.charCodeAt(0))
}

export function num_to_name(num: bigint): T.Name {
  let name = ''
  while (num > 0) {
    let code = num % BigInt(64)
    code = (function () {
      if (code === BigInt(0)) return char_to_bigint('.')
      if (is_betweeen(code, 1, 10))
        return code - BigInt(1) + char_to_bigint('0')
      if (is_betweeen(code, 11, 36))
        return code - BigInt(11) + char_to_bigint('A')
      if (is_betweeen(code, 37, 62))
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

export function read_block_content(block: T.BlockContentJson): T.BlockContent {
  return block.map(read_stmt)
}

function get_variant<T extends string, V extends object>(
  tags: T[],
  value: any
): [T, any] {
  for (let tag of tags) {
    if (value.hasOwnProperty(tag)) {
      return [tag as T, value[tag]]
    }
  }
  throw new Error(
    `Invalid variant '${JSON.stringify(value)}' for tags' ${tags}.`
  )
}

export function read_stmt(stmt: T.StatementJson): T.Statement {
  let [tag, value] = get_variant(T.StatementJson_TAGS, stmt)
  switch (tag) {
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
          init: read_term(value.term),
        },
      }
    case 'Run':
      return {
        Run: {
          body: read_term(value.body),
        },
      }
    default:
      throw new Error(`Invalid statement tag '${tag}'.`)
  }
}

export function read_rules(rules: T.RuleJson[]): T.Rule[] {
  return rules.map(read_rule)
}

export function read_rule(rule: T.RuleJson): T.Rule {
  return {
    lhs: read_term(rule.lhs),
    rhs: read_term(rule.rhs),
  }
}

export function read_term(term: T.TermJson): T.Term {
  let [tag, value] = get_variant(T.TermJson_TAGS, term)
  switch (tag) {
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
          expr: read_term(value.expr),
          body: read_term(value.body),
        },
      }
    case 'Lam':
      return {
        Lam: {
          name: value.name,
          body: read_term(value.body),
        },
      }
    case 'App':
      return {
        App: {
          argm: read_term(value.argm),
          func: read_term(value.func),
        },
      }
    case 'Ctr':
      return {
        Ctr: {
          name: value.name,
          args: value.args.map(read_term),
        },
      }
    case 'Fun':
      return {
        Fun: {
          name: value.name,
          args: value.args.map(read_term),
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
          oper: value.oper,
          val0: read_term(value.val0),
          val1: read_term(value.val1),
        },
      }
    default:
      throw new Error(`Invalid term tag '${tag}'.`)
  }
}
