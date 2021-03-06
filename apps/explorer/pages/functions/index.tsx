import type { GetServerSideProps, NextPage } from 'next'
import Link from 'next/link'

import { Error } from 'kindelia'
import { useNodeStore } from 'kindelia/Store/useNodeStore'

import { Info } from '@/components/blocks/Block'
import { get_functions } from '@/lib/api'

interface FunctionIndexProps {
  functions?: string[]
  error?: string
}

const FunctionsIndex: NextPage<FunctionIndexProps> = ({ functions, error }) => {
  if (error) return <Error message={error} />

  return (
    <div className="flex flex-col space-y-5 ">
      {functions?.map((name) => (
        <Link href={`/functions/${name}`} key={name}>
          <a className="flex justify-between border-2 px-4 py-2 border-gray-500">
            <Info title="Name" className="w-1/3">
              {name}
            </Info>
          </a>
        </Link>
      ))}
    </div>
  )
}

FunctionsIndex.getInitialProps = async () => {
  try {
    return {
      functions: await get_functions(useNodeStore.getState().selectedNode.url),
    }
  } catch (err: any) {
    return {
      error: err.message,
    }
  }
}
export default FunctionsIndex
