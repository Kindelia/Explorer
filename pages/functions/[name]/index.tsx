import type { GetServerSideProps, NextPage } from 'next'
import Link from 'next/link'
import { State } from '@/components/functions/State'
import { FC, ReactNode } from 'react'
import { getFunction, Function, GetFunctionParams } from '@/calls/getFunction'
import { Codeblock } from '@/components/Codeblock'

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

const SingleFunction: NextPage<Function> = ({ code, history, state, name }) => {
  return (
    <div className="flex min-h-screen flex-col py-2 px-8 lg:max-w-5xl lg:mx-auto">
      <h2 className="text-2xl">{name}</h2>
      <Block title="Code">
        <Codeblock>{code}</Codeblock>
      </Block>
      <Block title="State">
        <State {...state} />
      </Block>
      <Block title="History">
        <div className="flex flex-col">
          {history.map((run) => (
            <Link href={`${name}/${run.id}`} key={run.id}>
              <a>{run.name}</a>
            </Link>
          ))}
        </div>
      </Block>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<
  Function,
  GetFunctionParams
> = async ({ params }) => {
  if (!params) {
    return {
      notFound: true,
    }
  }

  return {
    props: await getFunction(params),
  }
}

export default SingleFunction
