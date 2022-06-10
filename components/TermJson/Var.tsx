import { VarJson } from '@/lib/types'
import { V } from '@/lib/util'
import { FC } from 'react'

export const VarJsonRender: FC<V<'Var', VarJson>> = ({ Var }) => {
  const { name } = Var

  return <div>{name}</div>
}
