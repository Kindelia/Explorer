import type { NextPage } from 'next'
import { FC, ReactNode } from 'react'
import { get_function, get_function_state } from '@/lib/api'
import { FunctionId, TermJson } from '@/lib/types'
import { Error } from '@kindelia/lib/ui'
import { read_term } from '@/lib/hvm'
import { Term } from '@/components/Statement'
import { useNodeStore } from '@/../lib/ui/Store/useNodeStore'
import { Option } from '@kindelia/lib/utils'

interface BlockProps {
  title: string
  children: ReactNode
}

const Block: FC<BlockProps> = ({ title, children }) => (
  <div className="mt-5">
    <h3 className="text-xl">{title}</h3>
    <div className="text-gray-600">{children}</div>
  </div>
)

interface SingleFunctionProps {
  state: Option<TermJson>
  fun?: any
  error?: string
  name: FunctionId
}

const SingleFunction: NextPage<SingleFunctionProps> = ({
  fun,
  state,
  error,
  name,
}) => {
  if (error) return <Error message={error} />

  return (
    <div className="flex flex-col">
      <h2 className="text-2xl">{name?.toString()}</h2>
      WIP {JSON.stringify(fun)}
      {state && (
        <Block title="State">
          <Term {...read_term(state, 0)} />
        </Block>
      )}
    </div>
  )
}

SingleFunction.getInitialProps = async (ctx) => {
  const name = ctx.query.name as FunctionId
  try {
    const node = useNodeStore.getState().selectedNode.url
    const fun = await get_function(name, node)

    if (!fun)
      return {
        error: `Function ${name} not found`,
        name,
        state: null,
      }

    const state = await get_function_state(name, node)

    return {
      fun,
      state,
      name,
    }
  } catch (err: any) {
    return {
      error: err.message,
      name,
      state: null,
      fun: null,
    }
  }
}

export default SingleFunction
