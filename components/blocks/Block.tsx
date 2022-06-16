import { read_num } from '@/lib/hvm'
import {
  BlockContentJson,
  BlockInfoJson,
  BlockResultsJson,
  BlockResultsJson_Variants,
  StatementInfoJson_Variants,
  StatementJson_Variants,
  StmtRunInfoJson,
} from '@/lib/types'
import { flatten_enum } from '@/lib/util'
import Link from 'next/link'
import { FC, HTMLAttributes, ReactNode } from 'react'

interface InfoProps extends HTMLAttributes<HTMLDivElement> {
  title: string
  children: ReactNode
}

export const Info: FC<InfoProps> = ({
  title,
  children,
  className,
  ...props
}) => (
  <div className={`${className} text-left mx-1`} {...props}>
    <div>{title}</div>
    <div>{children}</div>
  </div>
)

export const Block: FC<BlockInfoJson> = ({
  block,
  content,
  hash,
  height,
  results,
}) => {
  let mana = calculate_mana(results)
  let size = calculate_size(results)
  let { ctrs, funs, runs } = count_statements(content)
  return (
    <Link href={`/blocks/${height}`}>
      <a>
        <div className="flex flex-row sm:space-x-6 justify-between border-2 sm:px-4 py-2 border-gray-500">
          <Info className="w-16" title="Block">
            #{height}
          </Info>
          <Info className="flex-1" title="Hash">
            {hash.substring(0, 8)}
          </Info>
          <Info className="w-20" title="Mana">
            {mana.toString()}
          </Info>
          <Info className="w-20" title="Space">
            {/* {size > 0 && '+'} */}
            {size.toString()}
          </Info>
          <Info title="Ctrs">{ctrs}</Info>
          <Info title="Funs">{funs}</Info>
          <Info title="Runs">{runs}</Info>
        </div>
      </a>
    </Link>
  )
}

function reduce_run_results<T>(i: T, f: (acc: T, s: StmtRunInfoJson) => T) {
  return (results: BlockResultsJson[]) => {
    return results.reduce((acc, result) => {
      let value = flatten_enum<BlockResultsJson_Variants>(result)
      if (value.$ === 'Ok') {
        let stmt_type = flatten_enum<StatementInfoJson_Variants>(value)
        if (stmt_type.$ === 'Run') {
          return f(acc, stmt_type)
        }
      }
      return acc
    }, i)
  }
}

const calculate_mana = reduce_run_results(
  BigInt(0),
  (acc, s) => acc + read_num(s.used_mana)
)

const calculate_size = reduce_run_results(
  BigInt(0),
  (acc, s) => acc + read_num(s.size_diff)
)

function count_statements(content: BlockContentJson): {
  ctrs: number
  funs: number
  runs: number
} {
  let res = {
    ctrs: 0,
    funs: 0,
    runs: 0,
  }
  return content.reduce((acc, stmt) => {
    let value = flatten_enum<StatementJson_Variants>(stmt)
    if (value.$ === 'Ctr') {
      return { ...acc, ctrs: acc.ctrs + 1 }
    }
    if (value.$ === 'Fun') {
      return { ...acc, funs: acc.funs + 1 }
    }
    if (value.$ === 'Run') {
      return { ...acc, runs: acc.runs + 1 }
    }
    return acc
  }, res)
}
