import { FC, ReactNode } from 'react'

interface CodeblockProps {
  children: ReactNode
}

export const Codeblock: FC<CodeblockProps> = ({ children }) => (
  <pre className="w-full whitespace-pre text-sm rounded-md bg-gray-50 max-w-full overflow-auto py-3 pl-3">
    <code className="block max-w-full">{children}</code>
  </pre>
)
