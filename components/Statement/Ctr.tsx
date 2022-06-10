import { StmtCtrJson } from '@/lib/types'
import { V } from '@/lib/util'
import { FC } from 'react'

export const Ctr: FC<V<'Ctr', StmtCtrJson>> = ({ Ctr }) => {
  return <div>{Ctr.name}</div>
}
