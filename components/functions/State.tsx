import { FunctionState } from '@/calls/getFunction'
import { FC } from 'react'

export const State: FC<FunctionState> = (state) => {
  return <div>{state.todo}</div>
}
