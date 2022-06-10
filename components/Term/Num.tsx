import { Num } from '@/lib/types'
import { V } from '@/lib/util'
import { FC } from 'react'

export const NumRender: FC<V<'Num', Num>> = (props) => {
  const { numb } = props.Num

  return <div>{numb.toString()}</div>
}
