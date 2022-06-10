import { Op2 } from '@/lib/types'
import { V } from '@/lib/util'
import { FC } from 'react'
import { TermRender } from '../TermRender'

export const Op2Render: FC<V<'Op2', Op2>> = ({ Op2 }) => {
  const { oper, val0, val1 } = Op2

  return (
    <div>
      <TermRender {...val0} />
      {oper}
      <TermRender {...val1} />
    </div>
  )
}
