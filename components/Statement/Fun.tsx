import { StmtFunJson } from '@/lib/types'
import { Variant } from '@/lib/util'
import { FC } from 'react'

export const Fun: FC<Variant<'Fun', StmtFunJson>> = ({ Fun }) => {
  return <div>{Fun.name}</div>
}
