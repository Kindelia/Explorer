import {
  StatementJson,
  StmtCtrJson,
  StmtFunJson,
  StmtRunJson,
} from '@/lib/types'
import { V } from '@/lib/util'
import { FC } from 'react'
import { CtrJsonRender } from './StatementJson/Ctr'
import { FunJsonRender } from './StatementJson/Fun'
import { RunJsonRender } from './StatementJson/Run'

// TODO: refactor
const isCtr = (stm: StatementJson): stm is V<'Ctr', StmtCtrJson> =>
  !!(stm as V<'Ctr', StmtCtrJson>).Ctr

const isFun = (stm: StatementJson): stm is V<'Fun', StmtFunJson> =>
  !!(stm as V<'Fun', StmtFunJson>).Fun

const isRun = (stm: any): stm is V<'Run', StmtRunJson> =>
  !!(stm as V<'Run', StmtRunJson>).Run

export const StatementJsonRender: FC<StatementJson> = (statement) => {
  if (isFun(statement)) return <FunJsonRender {...statement} />

  if (isCtr(statement)) return <CtrJsonRender {...statement} />

  if (isRun(statement)) return <RunJsonRender {...statement} />

  return <>no</>
}
