import { FunJson } from '@/lib/types'
import { V } from '@/lib/util'
import { FC } from 'react'
import { TermJsonRender } from '../TermJsonRender'

export const FunJsonRender: FC<V<'Fun', FunJson>> = ({ Fun }) => {
  const { args, name } = Fun

  return (
    <div>
      {name}
      {args.map((arg, index) => (
        <TermJsonRender key={index} {...arg} />
      ))}
    </div>
  )
}
