import Link from 'next/link'
import { FC, HTMLAttributes, ReactNode } from 'react'

import { if_let, match } from 'kindelia/utils/enum'
import { const_ } from 'kindelia/utils/functional'

import { read_num } from '@/lib/hvm'
import {
  BlockContentJson,
  BlockInfoJson,
  BlockResultsJson,
  StmtRunInfoJson,
} from '@/lib/types'

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
    <Link href={`/blocks/${hash}`}>
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

const reduce_run_results =
  <T,>(init: T) =>
  (f: (acc: T, s: StmtRunInfoJson) => T) =>
  (results: BlockResultsJson[]) =>
    results.reduce(
      (acc, block_result) =>
        match(block_result)({
          Err: (_) => acc,
          Ok: (stmt) =>
            if_let(stmt)('Run')((stmt_run) => f(acc, stmt_run))(const_(acc)),
        }),
      init
    )

const calculate_mana = reduce_run_results(0n)(
  (acc, s) => acc + read_num(s.used_mana)
)
const calculate_size = reduce_run_results(0n)(
  (acc, s) => acc + read_num(s.size_diff)
)

interface StmtCount {
  ctrs: number
  funs: number
  runs: number
}
const StmtCount_default = { ctrs: 0, funs: 0, runs: 0 }

const count_statements = (content: BlockContentJson): StmtCount =>
  content.reduce(
    (acc, stmt) =>
      match(stmt)({
        Ctr: (_) => ({ ...acc, ctrs: acc.ctrs + 1 }),
        Fun: (_) => ({ ...acc, funs: acc.funs + 1 }),
        Run: (_) => ({ ...acc, runs: acc.runs + 1 }),
      }),
    StmtCount_default
  )
