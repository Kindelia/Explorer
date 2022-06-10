import {
  App,
  Ctr,
  Dup,
  Fun,
  Lam,
  Num,
  Op2,
  StmtRun,
  Term,
  Var,
} from '@/lib/types'
import { V } from '@/lib/util'
import { FC } from 'react'
import { AppRender } from '../Term/App'
import { CtrRender } from '../Term/Ctr'
import { DupRender } from '../Term/Dup'
import { FunRender } from '../Term/Fun'
import { LamRender } from '../Term/Lam'
import { NumRender } from '../Term/Num'
import { Op2Render } from '../Term/Op2'
import { VarRender } from '../Term/Var'

const isVar = (stm: Term): stm is V<'Var', Var> => !!(stm as V<'Var', Var>).Var

const isDup = (stm: Term): stm is V<'Dup', Dup> => !!(stm as V<'Dup', Dup>).Dup

const isLam = (stm: Term): stm is V<'Lam', Lam> => !!(stm as V<'Lam', Lam>).Lam

const isApp = (stm: Term): stm is V<'App', App> => !!(stm as V<'App', App>).App

const isCtr = (stm: Term): stm is V<'Ctr', Ctr> => !!(stm as V<'Ctr', Ctr>).Ctr

const isFun = (stm: Term): stm is V<'Fun', Fun> => !!(stm as V<'Fun', Fun>).Fun

const isNum = (stm: Term): stm is V<'Num', Num> => !!(stm as V<'Num', Num>).Num

const isOp2 = (stm: Term): stm is V<'Op2', Op2> => !!(stm as V<'Op2', Op2>).Op2

export const RunRender: FC<V<'Run', StmtRun>> = ({ Run }) => {
  if (isVar(Run.body)) return <VarRender {...Run.body} />

  if (isDup(Run.body)) return <DupRender {...Run.body} />

  if (isLam(Run.body)) return <LamRender {...Run.body} />

  if (isApp(Run.body)) return <AppRender {...Run.body} />

  if (isCtr(Run.body)) return <CtrRender {...Run.body} />

  if (isFun(Run.body)) return <FunRender {...Run.body} />

  if (isNum(Run.body)) return <NumRender {...Run.body} />

  if (isOp2(Run.body)) return <Op2Render {...Run.body} />

  return <div>run</div>
}
