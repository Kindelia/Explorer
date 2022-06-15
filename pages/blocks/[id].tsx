import * as T from '@/lib/types'
import type { GetServerSideProps, NextPage } from 'next'
import * as api from '@/lib/api'
import * as hvm from '@/lib/hvm'
import { Statements } from '@/components/Statement'
import { Codeblock } from '@/components/Codeblock'
import { ParsedUrlQuery } from 'querystring'
import { AxiosError } from 'axios'

interface Props {
  id: T.BlockId
  data: T.BlockJson
  content: T.BlockContentJson
}

const Block: NextPage<Props> = ({ id, data, content }) => {
  const statements = hvm.read_block_content(content)

  return (
    <div className="flex flex-col items-center justify-center space-y-5">
      <h1> {`Showing block: ${id}`} </h1>
      {/* TODO: block info */}
      <Codeblock>
        <Statements statements={statements} />
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
  try {
    const id = context.params.id as T.BlockId
    let [data, content] = await Promise.all([
      api.get_block(id),
      api.get_block_content(id),
    ])
    return { props: { id, data, content } }
  } catch (err) {
    return { notFound: true }
  }
}
