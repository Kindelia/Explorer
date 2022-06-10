import { StmtFunJson } from '@/lib/types'
import { V } from '@/lib/util'
import { FC } from 'react'

export const FunJsonRender: FC<V<'Fun', StmtFunJson>> = ({ Fun }) => {
  return <div>{Fun.name}</div>
}
