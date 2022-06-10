import { StmtCtrJson } from '@/lib/types'
import { V } from '@/lib/util'
import { FC } from 'react'

export const CtrJsonRender: FC<V<'Ctr', StmtCtrJson>> = ({ Ctr }) => {
  const { args, name } = Ctr

  return (
    <div>
      {name}
      {args.map((arg) => (
        <div key={arg}>{arg}</div>
      ))}
    </div>
  )
}
