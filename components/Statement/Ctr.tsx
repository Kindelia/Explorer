import { StmtCtrJson } from '@/lib/types'
import { Variant } from '@/lib/util'
import { FC } from 'react'

export const Ctr: FC<Variant<'Ctr', StmtCtrJson>> = ({ Ctr }) => {
  return <div>{Ctr.name}</div>
}
