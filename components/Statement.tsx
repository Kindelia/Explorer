import {
  StatementJson,
  StmtCtrJson,
  StmtFunJson,
  StmtRunJson,
} from '@/lib/types'
import { V } from '@/lib/util'
import { FC } from 'react'
import { Ctr } from './Statement/Ctr'
import { Fun } from './Statement/Fun'
import { Run } from './Statement/Run'

// TODO: refactor
const isCtr = (stm: StatementJson): stm is V<'Ctr', StmtCtrJson> => {
  if ((stm as V<'Ctr', StmtCtrJson>).Ctr) {
    return true
  } else {
    return false
  }
}

const isFun = (stm: StatementJson): stm is V<'Fun', StmtFunJson> => {
  if ((stm as V<'Fun', StmtFunJson>).Fun) {
    return true
  } else {
    return false
  }
}

const isRun = (stm: any): stm is V<'Run', StmtRunJson> => {
  if ((stm as V<'Run', StmtRunJson>).Run) {
    return true
  } else {
    return false
  }
}

export const Statement: FC<StatementJson> = (statement) => {
  if (isFun(statement)) return <Fun {...statement} />

  if (isCtr(statement)) return <Ctr {...statement} />

  if (isRun(statement)) return <Run {...statement} />

  return <>no</>
}
