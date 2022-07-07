import type { NextPage } from 'next'
import Link from 'next/link'

import { hash_hex_from } from 'ui/utils/hex'

import * as api from '@/lib/api'
import * as hvm from '@/lib/hvm'
import * as T from '@/lib/types'

import { Codeblock } from '@/components/Codeblock'
import { Statements } from '@/components/Statement'
import { useNodeStore } from 'ui/Store/useNodeStore'
import { Error } from 'ui'

interface Props {
  block_info?: T.BlockInfoJson
  error?: string
}

const Block: NextPage<Props> = ({ block_info, error }) => {
  if (error) return <Error message={error} />

  let { hash, height, content, results, block } = block_info

  const statements = hvm.read_block_content(content)
  const result_txts = results.map((result) => JSON.stringify(result))
  const parent = block.prev

  return (
    <div className="flex flex-col items-center justify-center space-y-5">
      <h1>
        Block hash: <code> {hash} </code>
      </h1>
      <div>
        Block height: <code> {height} </code>
      </div>
      <div>
        <Link href={`/blocks/${parent}`}>
          <a>
            Block Parent: <span className="text-blue-800"> {parent} </span>
          </a>
        </Link>
      </div>
      <Codeblock>
        <Statements statements={statements} />
      </Codeblock>
      <h2> Results: </h2>
      <pre>{result_txts.join('\n\n')}</pre>
    </div>
  )
}

Block.getInitialProps = async (ctx) => {
  try {
    const id = ctx.query.id as string
    const hex = hash_hex_from(id)

    return {
      block_info: await api.get_block(
        hex,
        useNodeStore.getState().selectedNode.url
      ),
    }
  } catch (err) {
    return { error: err.message }
  }
}

export default Block
