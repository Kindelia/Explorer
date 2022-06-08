import type { GetServerSideProps, NextPage } from 'next'

interface Props {
  id: string
}

const Block: NextPage<Props> = ({ id }) => {
  // TODO: Why SSR not working with `id` ?
  return (
    <div className="flex flex-col items-center justify-center">
      Showing block: {id}
    </div>
  )
}

export default Block

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const id = context.query?.id || ''
  return { props: { id: id.toString() } }
}
