import { FC } from 'react'
import { PrismAsyncLight } from 'react-syntax-highlighter'
import { coy as theme } from 'react-syntax-highlighter/dist/cjs/styles/prism'

export const Codeblock: FC<{ children: string | string[] }> = ({
  children,
}) => (
  <PrismAsyncLight style={theme} language={'javascript'} showLineNumbers>
    {children}
  </PrismAsyncLight>
)
