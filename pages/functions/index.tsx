import { Info } from '@/components/blocks/Block'
import { get_functions } from '@/lib/api'
import type { GetServerSideProps, NextPage } from 'next'
import Link from 'next/link'

interface FunctionIndexProps {
  functions: string[]
}

const FunctionsIndex: NextPage<FunctionIndexProps> = ({ functions }) => {
  return (
    <div className="flex flex-col space-y-5 ">
      {functions.map((name) => (
        <Link href={`/functions/${name}`} key={name}>
          <a className="flex justify-between border-2 px-4 py-2 border-gray-700">
            <Info title="Name" className="w-1/3">
              {name}
            </Info>
          </a>
        </Link>
      ))}
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<
  FunctionIndexProps
> = async () => {
  return {
    props: {
      functions: await get_functions(),
    },
  }
}

export default FunctionsIndex
