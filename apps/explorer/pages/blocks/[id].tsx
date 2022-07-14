import Link from 'next/link'
import type { NextPage } from 'next'

import { hash_hex_from } from 'kindelia/utils/hex'
import { useNodeStore } from 'kindelia/Store/useNodeStore'
import { Error } from 'kindelia'
import * as T from '@/lib/types'
import * as hvm from '@/lib/hvm'
import * as api from '@/lib/api'
import { Statements } from '@/components/Statement'
import { Codeblock } from '@/components/Codeblock'

interface BlockPageProps {
  block_info?: T.BlockInfoJson
  error?: string
}

const Block: NextPage<BlockPageProps> = ({ block_info, error }) => {
  if (error || !block_info)
    return <Error message={error || 'Block not found'} />

  let { hash, height, content, results, block } = block_info

  const statements = hvm.read_block_content(content)
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
      <pre>{results?.map((result) => JSON.stringify(result)).join('\n\n')}</pre>
    </div>
  )
}

Block.getInitialProps = async (ctx) => {
  try {
    const id = ctx.query.id as string
    const hex = hash_hex_from(id)

    if (!hex)
      return {
        error: `Invalid block ID ${id}. Must be a 256-bit hexadecimal string starting with '0x'.`,
      }

    const block = await api.get_block(
      hex,
      useNodeStore.getState().selectedNode.url
    )

    if (!block) return { error: `Block ${hex} not found` }

    return {
      block_info: block,
    }
  } catch (err: any) {
    return { error: err.message }
  }
}

export default Block
