import { Fun } from '@/lib/types'
import { V } from '@/lib/util'
import { FC } from 'react'
import { TermRender } from '../TermRender'

export const FunRender: FC<V<'Fun', Fun>> = ({ Fun }) => {
  const { args, name } = Fun

  return (
    <div>
      {name}
      {args.map((arg, index) => (
        <TermRender key={index} {...arg} />
      ))}
    </div>
  )
}
