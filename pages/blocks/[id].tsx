import type { GetServerSideProps, NextPage } from 'next'
import * as api from '@/lib/api'

interface Props {
  id: string
  data: any
  content: any
}

const Block: NextPage<Props> = ({ id, data, content }) => {
  // TODO: Why SSR not working with `id` ?
  return (
    <div className="flex flex-col items-center justify-center">
      Showing block: {id}
      <p>{JSON.stringify(data)}</p>
      <p>{JSON.stringify(content)}</p>
    </div>
  )
}

export default Block

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const _id = context.query?.id ?? ''
  const id = typeof _id === 'string' ? _id : _id[0]
  // TODO validate id and parse hex
  const data = await api.get_block(id)
  const content = await api.get_block_content(id)
  return { props: { id, data, content } }
}
