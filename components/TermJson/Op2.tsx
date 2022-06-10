import { Op2Json } from '@/lib/types'
import { V } from '@/lib/util'
import { FC } from 'react'
import { TermJsonRender } from '../TermJsonRender'

export const Op2JsonRender: FC<V<'Op2', Op2Json>> = ({ Op2 }) => {
  const { oper, val0, val1 } = Op2

  return (
    <div>
      <TermJsonRender {...val0} />
      {oper}
      <TermJsonRender {...val1} />
    </div>
  )
}
