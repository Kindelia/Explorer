import { DupJson } from '@/lib/types'
import { V } from '@/lib/util'
import { FC } from 'react'
import { TermRender } from '../TermRender'

export const DupJsonRender: FC<V<'Dup', DupJson>> = ({ Dup }) => {
  const { cont, expr, nam0, nam1 } = Dup

  return (
    <div>
      {nam0} - {nam1}
      <TermRender {...cont} />
      <TermRender {...expr} />
    </div>
  )
}
