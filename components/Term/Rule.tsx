import { Rule } from '@/lib/types'
import { FC } from 'react'
import { TermRender } from '../TermRender'

export const RuleRender: FC<Rule> = ({ lhs, rhs }) => {
  return (
    <div>
      <TermRender {...lhs} />
      <TermRender {...rhs} />
    </div>
  )
}
