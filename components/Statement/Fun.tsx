import { StmtFun } from '@/lib/types'
import { V } from '@/lib/util'
import { FC } from 'react'
import { RuleRender } from '../Term/Rule'
import { TermRender } from '../TermRender'

export const FunRender: FC<V<'Fun', StmtFun>> = ({ Fun }) => {
  const { args, func, init, name } = Fun

  return (
    <div>
      {name}
      {args.join(',')}
      {func.map((rule, index) => (
        <RuleRender key={index} {...rule} />
      ))}
      <TermRender {...init} />
    </div>
  )
}
