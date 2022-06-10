import { AppJson } from '@/lib/types'
import { V } from '@/lib/util'
import { FC } from 'react'
import { TermJsonRender } from '../TermJsonRender'

export const AppJsonRender: FC<V<'App', AppJson>> = ({ App }) => {
  const { argm, func } = App

  return (
    <div>
      <TermJsonRender {...argm} />
      <TermJsonRender {...func} />
    </div>
  )
}
