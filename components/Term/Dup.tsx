import { Dup } from '@/lib/types'
import { V } from '@/lib/util'
import { FC } from 'react'
import { TermRender } from '../TermRender'

export const DupRender: FC<V<'Dup', Dup>> = ({ Dup }) => {
  const { body, expr, nam0, nam1 } = Dup

  return (
    <div>
      {nam0}
      <TermRender {...body} />
      <TermRender {...expr} />
      {nam1}
    </div>
  )
}
