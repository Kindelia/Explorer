import type { GetServerSideProps, NextPage } from 'next'

interface RunProps {
  name: string
  run: string
}

const Run: NextPage<RunProps> = ({ name, run }) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      {run} {name}
    </div>
  )
}

interface RunParams extends NodeJS.Dict<string> {
  name: string
  run: string
}

export const getServerSideProps: GetServerSideProps<RunProps, RunParams> = async ({ params }) => {
  if (!params)
    return {
      notFound: true,
    }

  const { name, run } = params

  return {
    props: {
      run,
      name,
    },
  }
}

export default Run
