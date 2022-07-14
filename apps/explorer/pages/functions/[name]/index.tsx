import type { NextPage } from 'next'
import { FC, ReactNode } from 'react'

import { Error } from 'kindelia'
import { useNodeStore } from 'kindelia/Store/useNodeStore'
import { Option } from 'kindelia/utils'

import { Codeblock } from '@/components/Codeblock'
import { Statements } from '@/components/Statement'
import { get_function, get_function_state } from '@/lib/api'
import { read_block_content, read_term } from '@/lib/hvm'
import { FuncJson, FunctionId, StrNum, TermJson } from '@/lib/types'

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
  fun: Option<FuncJson>
  error?: string
  name: FunctionId
}

// TODO: Render initial state when API is done

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
      {fun && (
        <Codeblock>
          <Statements
            statements={read_block_content([
              {
                Fun: {
                  func: fun.func.rules,
                  name: name as any,
                  args: [],
                  init: { Num: { numb: '0' as StrNum } },
                },
              },
            ])}
          />
        </Codeblock>
      )}
      {state && (
        <Block title="State">{/* <Term {...read_term(state, 0)} /> */}</Block>
      )}
    </div>
  )
}

SingleFunction.getInitialProps = async (ctx) => {
  const name = ctx.query.name as FunctionId
  try {
    const node = useNodeStore.getState().selectedNode.url
    const fun = await get_function(name, node)

    const state = await get_function_state(name, node)

    return {
      fun: fun,
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
