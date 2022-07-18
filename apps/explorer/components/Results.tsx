import { FC } from 'react'

import { match } from 'kindelia/utils/enum'

import { Term } from './Statement'
import { read_term } from '@/lib/hvm'
import * as T from '@/lib/types'

export const Results: FC<{ results: T.BlockResultsJson[] }> = ({ results }) => {
  return (
    <div>
      {results.map((result, i) => {
        return match(result)({
          Ok: (statement_info) => {
            return match(statement_info)({
              Run: (run_info) => <RunInfo key={i} {...run_info} />,
              Ctr: (ctr_info) => <CtrInfo key={ctr_info.name} {...ctr_info} />,
              Fun: (fun_info) => <FunInfo key={fun_info.name} {...fun_info} />,
            })
          },
          Err: (err) => {
            return (
              <span
                key={err.err}
              >{`The code could not be executed: ${err}`}</span>
            )
          },
        })
      })}
    </div>
  )
}

export const RunInfo: FC<T.StmtRunInfoJson> = (run_info) => {
  let term = read_term(run_info.done_term, 0)
  return (
    <div>
      <span>{`New state: `}</span>
      <Term {...term} />
      <br />
      <span>{`Size: ${run_info.size_diff}`}</span>
      <br />
      <span>{`Mana: ${run_info.used_mana}`}</span>
    </div>
  )
}

export const CtrInfo: FC<T.StmtCtrInfoJson> = (ctr_info) => {
  return (
    <div>
      <span>{`The code was executed successfully.`}</span>
      <span>ctr</span>
      <span>{`{`}</span>
      <span>{ctr_info.name}</span>
      {ctr_info.args.map((arg) => (
        <>
          <span>{`, `}</span>
          <span>{arg}</span>
        </>
      ))}
      <span>{`}`}</span>
    </div>
  )
}

export const FunInfo: FC<T.StmtFunInfoJson> = (ctr_info) => {
  return (
    <div>
      <span>{`The code was executed successfully.`}</span>
      <span>fun</span>
      <span>{`{`}</span>
      <span>{ctr_info.name}</span>
      {ctr_info.args.map((arg) => (
        <>
          <span>{`, `}</span>
          <span>{arg}</span>
        </>
      ))}
      <span>{`}`}</span>
    </div>
  )
}
