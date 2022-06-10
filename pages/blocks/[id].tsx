import type { GetServerSideProps, NextPage } from 'next'
import * as api from '@/lib/api'
import * as HVM from '@/lib/hvm'
import { Statement } from '@/components/Statement'
import { BlockContentJson } from '@/lib/types'

interface Props {
  id: string
  data: any
  content: BlockContentJson
}

const Block: NextPage<Props> = ({ id, data, content }) => {
  // TODO: Why SSR not working with `id` ?
  console.log(content)

  const term = HVM.read_block_content(content);
  console.log(term);
  

  return (
    <div className="flex flex-col items-center justify-center">
      Showing block: {id}
      {content.map((statement, index) => (
        <Statement key={index} {...statement} />
      ))}
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
