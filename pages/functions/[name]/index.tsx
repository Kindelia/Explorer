import type { GetServerSideProps, GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { PrismAsyncLight } from 'react-syntax-highlighter'
import { coy as theme } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import Link from 'next/link'
import { State } from '@/components/functions/State'
import { FC, ReactNode } from 'react'

const mockCode = `!(Counter action) {
  !(Counter $(Inc)) = $(IO.take @x $(IO.save (+ x #1) #~ $(IO.done #0)))
  !(Counter $(Get)) = !(IO.load @x $(IO.done x))
} = #0 // initial state = #0`

const mockHistory: Run[] = [
  { id: '1', name: '$(Counter $(Inc))' },
  { id: '2', name: '$(Counter $(Inc))' },
  { id: '3', name: '$(Counter $(Inc))' },
  { id: '4', name: '$(Counter $(Get))' },
]

interface Run {
  id: string
  name: string
}
interface SingleFunctionProps {
  name: string;
  code: string
  state: unknown // TODO: checar estrutura do state
  history: Run[]
}

interface BlockProps {
  title: string
  children: ReactNode
}

const Block: FC<BlockProps> = ({ title, children }) => (
  <div className="mt-5">
    <h3 className="text-xl">{title}</h3>
    {children}
  </div>
)

const SingleFunction: NextPage<SingleFunctionProps> = ({ code, history, state, name }) => {
  return (
    <div className="flex min-h-screen flex-col py-2 px-8 lg:max-w-5xl lg:mx-auto">
      <h2 className="text-2xl">{name}</h2>
      <Block title="Code">
        <PrismAsyncLight style={theme} language={'javascript'} showLineNumbers>
          {code}
        </PrismAsyncLight>
      </Block>
      <Block title="State">
        <State state={state} />
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

interface PageParams extends NodeJS.Dict<string> {
  name: string
}

export const getServerSideProps: GetServerSideProps<
  SingleFunctionProps,
  PageParams
> = async ({ params }) => {
  if (!params) {
    return {
      notFound: true,
    }
  }

  const { name } = params

  // TODO: get from api
  return {
    props: {
      name,
      code: mockCode,
      state: {},
      history: mockHistory,
    },
  }
}

export default SingleFunction
