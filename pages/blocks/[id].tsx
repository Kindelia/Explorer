import * as T from '@/lib/types'
import type { GetServerSideProps, NextPage } from 'next'
import * as api from '@/lib/api'
import * as hvm from '@/lib/hvm'
import { Statement } from '@/components/Statement'
import { Codeblock } from '@/components/Codeblock'
import { ParsedUrlQuery } from 'querystring'

interface Props {
  id: T.BlockId
  data: T.BlockJson
  content: T.BlockContentJson
}

const Block: NextPage<Props> = ({ id, data, content }) => {
  const term = hvm.read_block_content(content)

  return (
    <div className="flex flex-col items-center justify-center space-y-5">
      <h1> {`Showing block: ${id}`} </h1>
      {/* TODO: block info */}
      <Codeblock>
        {term.map((statement, index) => (
          <Statement key={index} {...statement} />
        ))}
      </Codeblock>
    </div>
  )
}

export default Block

interface BlockParams extends ParsedUrlQuery {
  id: string
}

export const getServerSideProps: GetServerSideProps<
  Props,
  BlockParams
> = async (context) => {
  if (!context.params) return { notFound: true }

  const id = context.params.id as T.BlockId
  const data = await api.get_block(id)
  const content = await api.get_block_content(id)
  return { props: { id, data, content } }
}
