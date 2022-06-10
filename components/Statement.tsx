import {
  StatementJson,
  StmtCtrJson,
  StmtFunJson,
  StmtRunJson,
} from '@/lib/types'
import { Variant } from '@/lib/util'
import { FC } from 'react'
import { Ctr } from './Statement/Ctr'
import { Fun } from './Statement/Fun'
import { Run } from './Statement/Run'

// TODO: refactor
const isCtr = (stm: StatementJson): stm is Variant<'Ctr', StmtCtrJson> => {
  if ((stm as Variant<'Ctr', StmtCtrJson>).Ctr) {
    return true
  } else {
    return false
  }
}

const isFun = (stm: StatementJson): stm is Variant<'Fun', StmtFunJson> => {
  if ((stm as Variant<'Fun', StmtFunJson>).Fun) {
    return true
  } else {
    return false
  }
}

const isRun = (stm: any): stm is Variant<'Run', StmtRunJson> => {
  if ((stm as Variant<'Run', StmtRunJson>).Run) {
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
