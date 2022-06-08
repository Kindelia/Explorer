import type { GetServerSideProps, NextPage } from 'next'
import Link from 'next/link'

interface FunctionIndexProps {
  functions: string[]
}

const FunctionsIndex: NextPage<FunctionIndexProps> = ({ functions }) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      {functions.map((func) => (
        <Link href={`/functions/${func}`} key={func}>
          {func}
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
      functions: ['Counter'],
    },
  }
}

export default FunctionsIndex
