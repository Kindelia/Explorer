import { FunctionInfo, getFunctions } from '@/calls/getFunctions'
import { Info } from '@/components/blocks/Block'
import type { GetServerSideProps, NextPage } from 'next'
import Link from 'next/link'

interface FunctionIndexProps {
  functions: FunctionInfo[]
}

const FunctionsIndex: NextPage<FunctionIndexProps> = ({ functions }) => {
  return (
    <div className="flex flex-col space-y-5 ">
      {functions.map((func) => (
        <Link href={`/functions/${func.name}`} key={func.name}>
          <a className="flex justify-between border-2 px-4 py-2 border-gray-700">
            <Info title="Signature">{func.signature}</Info>
            <Info title="Name" className="w-1/3">
              {func.name}
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
      functions: await getFunctions(),
    },
  }
}

export default FunctionsIndex
