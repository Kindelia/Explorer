import { Lam } from '@/lib/types'
import { V } from '@/lib/util'
import { FC } from 'react'
import { TermRender } from '../TermRender'

export const LamRender: FC<V<'Lam', Lam>> = ({ Lam }) => {
  const { name, body } = Lam

  return (
    <div>
      {name}
      <TermRender {...body} />
    </div>
  )
}
