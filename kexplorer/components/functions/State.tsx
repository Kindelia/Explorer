import { FC } from 'react'

import { FunctionState } from '@/calls/getFunction'

export const State: FC<FunctionState> = (state) => {
  return <div>{state.todo}</div>
}
