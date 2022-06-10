import { LamJson } from '@/lib/types'
import { V } from '@/lib/util'
import { FC } from 'react'
import { TermJsonRender } from '../TermJsonRender'

export const LamJsonRender: FC<V<'Lam', LamJson>> = ({ Lam }) => {
  const { name, body } = Lam

  return (
    <div>
      {name}
      <TermJsonRender {...body} />
    </div>
  )
}
