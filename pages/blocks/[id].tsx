import type { GetServerSideProps, NextPage } from 'next'
import { Statements } from '@/components/Statement'
import { Codeblock } from '@/components/Codeblock'
import { ParsedUrlQuery } from 'querystring'

import { hash_hex_from } from '@/lib/hex'
import * as T from '@/lib/types'
import * as api from '@/lib/api'
import * as hvm from '@/lib/hvm'

interface Props {
  block_info: T.BlockInfoJson
}

const Block: NextPage<Props> = ({ block_info }) => {
  let { hash, height, content, results } = block_info
  const statements = hvm.read_block_content(content)

  let result_txts = results.map((result) => JSON.stringify(result))

  return (
    <div className="flex flex-col items-center justify-center space-y-5">
      <h1> Block hash: <code> {hash} </code> </h1>
      <div> Block height: <code> {height} </code> </div>
      <Codeblock>
        <Statements statements={statements} />
      </Codeblock>
      <h2> Results: </h2>
      <pre>
        { result_txts.join("\n\n") }
      </pre>
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
    const id = context.params.id
    let hex = hash_hex_from(id)
    if (hex == null) return { notFound: true }
    let block_info = await api.get_block(hex)
    if (block_info == null) return { notFound: true }
    return { props: { block_info } }
  } catch (err) {
    return { notFound: true }
  }
}
