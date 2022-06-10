import { Ctr } from '@/lib/types'
import { V } from '@/lib/util'
import { FC } from 'react'
import { TermRender } from '../TermRender'

export const CtrRender: FC<V<'Ctr', Ctr>> = ({ Ctr }) => {
  const { args, name } = Ctr

  return (
    <div>
      {name}
      {args.map((arg, index) => (
        <TermRender key={index} {...arg} />
      ))}
    </div>
  )
}
