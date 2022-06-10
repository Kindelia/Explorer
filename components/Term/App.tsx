import { App } from '@/lib/types'
import { V } from '@/lib/util'
import { FC } from 'react'
import { TermRender } from '../TermRender'

export const AppRender: FC<V<'App', App>> = ({ App }) => {
  const { argm, func } = App

  return (
    <div>
      <TermRender {...argm} />
      <TermRender {...func} />
    </div>
  )
}
