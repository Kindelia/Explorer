import type { NextPage } from 'next'
import Link from 'next/link'
import { FC, ReactNode } from 'react'

import { getFunction, Function } from '@/calls/getFunction'
import { Codeblock } from '@/components/Codeblock'
import { get_function_state } from '@/lib/api'
import { TermJson } from '@/lib/types'
import { Error } from 'kindelia'
import { read_term } from '@/lib/hvm'
import { Term } from '@/components/Statement'

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
  state?: TermJson
  fun?: Function
  error?: string
}

const SingleFunction: NextPage<SingleFunctionProps> = ({
  fun,
  state,
  error,
}) => {
  if (error) return <Error message={error} />

  const { code, history, name } = fun
  const teste = read_term(state, 0)

  return (
    <div className="flex flex-col">
      <h2 className="text-2xl">{name}</h2>
      <Block title="Code">
        <Codeblock>{code}</Codeblock>
      </Block>
      <Block title="State">
        <Term {...teste} />
      </Block>
      <Block title="History">
        <div className="flex flex-col">
          {history.map((run) => (
            <Link href={`/functions/${name}/${run.id}`} key={run.id}>
              <a>{run.name}</a>
            </Link>
          ))}
        </div>
      </Block>
    </div>
  )
}

SingleFunction.getInitialProps = async (ctx) => {
  try {
    const name = ctx.query.name as string

    const state = await get_function_state(name as any)
    const fun = await getFunction({ name })

    return {
      fun,
      state,
    }
  } catch (err) {
    return {
      error: err.message,
    }
  }
}

export default SingleFunction
