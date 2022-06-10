import { Var } from '@/lib/types'
import { V } from '@/lib/util'
import { FC } from 'react'

export const VarRender: FC<V<'Var', Var>> = ({ Var }) => {
  const { name } = Var

  return <div>{name}</div>
}
