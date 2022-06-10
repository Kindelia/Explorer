import { CtrJson } from '@/lib/types'
import { V } from '@/lib/util'
import { FC } from 'react'
import { TermJsonRender } from '../TermJsonRender'

export const CtrJsonRender: FC<V<'Ctr', CtrJson>> = ({ Ctr }) => {
  const { args, name } = Ctr

  return (
    <div>
      {name}
      {args.map((arg, index) => (
        <TermJsonRender key={index} {...arg} />
      ))}
    </div>
  )
}
