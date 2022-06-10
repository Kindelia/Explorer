import { RuleJson } from '@/lib/types'
import { FC } from 'react'
import { TermJsonRender } from '../TermJsonRender'

export const RuleJsonRender: FC<RuleJson> = ({ lhs, rhs }) => {
  return (
    <div>
      <TermJsonRender {...lhs} />
      <TermJsonRender {...rhs} />
    </div>
  )
}
