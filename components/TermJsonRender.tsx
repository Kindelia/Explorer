import {
  AppJson,
  CtrJson,
  DupJson,
  FunJson,
  LamJson,
  NumJson,
  Op2Json,
  TermJson,
  VarJson,
} from '@/lib/types'
import { V } from '@/lib/util'
import { FC } from 'react'
import { AppJsonRender } from './TermJson/App'
import { CtrJsonRender } from './TermJson/Ctr'
import { DupJsonRender } from './TermJson/Dup'
import { FunJsonRender } from './TermJson/Fun'
import { LamJsonRender } from './TermJson/Lam'
import { NumJsonRender } from './TermJson/Num'
import { Op2JsonRender } from './TermJson/Op2'
import { VarJsonRender } from './TermJson/Var'

const isVar = (stm: TermJson): stm is V<'Var', VarJson> =>
  !!(stm as V<'Var', VarJson>).Var
const isDup = (stm: TermJson): stm is V<'Dup', DupJson> =>
  !!(stm as V<'Dup', DupJson>).Dup
const isLam = (stm: TermJson): stm is V<'Lam', LamJson> =>
  !!(stm as V<'Lam', LamJson>).Lam
const isApp = (stm: TermJson): stm is V<'App', AppJson> =>
  !!(stm as V<'App', AppJson>).App
const isCtr = (stm: TermJson): stm is V<'Ctr', CtrJson> =>
  !!(stm as V<'Ctr', CtrJson>).Ctr
const isFun = (stm: TermJson): stm is V<'Fun', FunJson> =>
  !!(stm as V<'Fun', FunJson>).Fun
const isNum = (stm: TermJson): stm is V<'Num', NumJson> =>
  !!(stm as V<'Num', NumJson>).Num
const isOp2 = (stm: TermJson): stm is V<'Op2', Op2Json> =>
  !!(stm as V<'Op2', Op2Json>).Op2

export const TermJsonRender: FC<TermJson> = (term) => {
  if (isVar(term)) return <VarJsonRender {...term} />

  if (isDup(term)) return <DupJsonRender {...term} />

  if (isLam(term)) return <LamJsonRender {...term} />

  if (isApp(term)) return <AppJsonRender {...term} />

  if (isCtr(term)) return <CtrJsonRender {...term} />

  if (isFun(term)) return <FunJsonRender {...term} />

  if (isNum(term)) return <NumJsonRender {...term} />

  if (isOp2(term)) return <Op2JsonRender {...term} />

  return <div>w</div>
}
