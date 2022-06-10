import { StmtCtr } from '@/lib/types'
import { V } from '@/lib/util'
import { FC } from 'react'

export const CtrRender: FC<V<'Ctr', StmtCtr>> = ({ Ctr }) => {
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
