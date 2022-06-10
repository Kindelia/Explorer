import * as T from '@/lib/types'
import type { GetServerSideProps, NextPage } from 'next'
import * as api from '@/lib/api'
import * as hvm from '@/lib/hvm'
import { Statement } from '@/components/Statement'

interface Props {
  id: T.BlockId
  data: T.BlockJson
  content: T.BlockContentJson
}

const Block: NextPage<Props> = ({ id, data, content }) => {
  const term = hvm.read_block_content(content)

  return (
    <div className="flex flex-col items-center justify-center">
      <span> {`Showing block: ${id}`} </span>
      <>
        {content.map((statement, index) => (
          <Statement key={index} {...statement} />
        ))}
      </>
    </div>
  )
}

export default Block

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const _id = context.query?.id ?? ''
  const __id = typeof _id === 'string' ? _id : _id[0]
  // TODO validate id and parse hex
  const id = __id as T.BlockId
  const data = await api.get_block(id)
  const content = await api.get_block_content(id)
  return { props: { id, data, content } }
}
