import { App, Ctr, Dup, Fun, Lam, Num, Op2, Term, Var } from '@/lib/types'
import { V } from '@/lib/util'
import { FC } from 'react'
import { AppRender } from './Term/App'
import { CtrRender } from './Term/Ctr'
import { DupRender } from './Term/Dup'
import { FunRender } from './Term/Fun'
import { LamRender } from './Term/Lam'
import { NumRender } from './Term/Num'
import { Op2Render } from './Term/Op2'
import { VarRender } from './Term/Var'

const isVar = (stm: Term): stm is V<'Var', Var> => !!(stm as V<'Var', Var>).Var
const isDup = (stm: Term): stm is V<'Dup', Dup> => !!(stm as V<'Dup', Dup>).Dup
const isLam = (stm: Term): stm is V<'Lam', Lam> => !!(stm as V<'Lam', Lam>).Lam
const isApp = (stm: Term): stm is V<'App', App> => !!(stm as V<'App', App>).App
const isCtr = (stm: Term): stm is V<'Ctr', Ctr> => !!(stm as V<'Ctr', Ctr>).Ctr
const isFun = (stm: Term): stm is V<'Fun', Fun> => !!(stm as V<'Fun', Fun>).Fun
const isNum = (stm: Term): stm is V<'Num', Num> => !!(stm as V<'Num', Num>).Num
const isOp2 = (stm: Term): stm is V<'Op2', Op2> => !!(stm as V<'Op2', Op2>).Op2

export const TermRender: FC<Term> = (term) => {
  if (isVar(term)) return <VarRender {...term} />

  if (isDup(term)) return <DupRender {...term} />

  if (isLam(term)) return <LamRender {...term} />

  if (isApp(term)) return <AppRender {...term} />

  if (isCtr(term)) return <CtrRender {...term} />

  if (isFun(term)) return <FunRender {...term} />

  if (isNum(term)) return <NumRender {...term} />

  if (isOp2(term)) return <Op2Render {...term} />

  return <div>w</div>
}
