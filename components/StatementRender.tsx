import { Statement, StmtCtr, StmtFun, StmtRun } from '@/lib/types'
import { V } from '@/lib/util'
import { FC } from 'react'
import { CtrRender } from './Statement/Ctr'
import { FunRender } from './Statement/Fun'
import { RunRender } from './Statement/Run'

// TODO: refactor
const isCtr = (stm: Statement): stm is V<'Ctr', StmtCtr> =>
  !!(stm as V<'Ctr', StmtCtr>).Ctr

const isFun = (stm: Statement): stm is V<'Fun', StmtFun> =>
  !!(stm as V<'Fun', StmtFun>).Fun

const isRun = (stm: any): stm is V<'Run', StmtRun> =>
  !!(stm as V<'Run', StmtRun>).Run

export const StatementRender: FC<Statement> = (statement) => {
  if (isFun(statement)) return <FunRender {...statement} />

  if (isCtr(statement)) return <CtrRender {...statement} />

  if (isRun(statement)) return <RunRender {...statement} />

  return <>no</>
}
