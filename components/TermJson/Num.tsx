import { NumJson } from '@/lib/types'
import { V } from '@/lib/util'
import { FC } from 'react'

export const NumJsonRender: FC<V<'Num', NumJson>> = (props) => {
  const { numb } = props.Num

  return <div>{numb}</div>
}
