import type { NextPage } from 'next'
import { stringify } from 'querystring'

import { Error } from 'kindelia'
import { useNodeStore } from 'kindelia/Store/useNodeStore'

import { Block } from '@/components/blocks/Block'
import { get_blocks } from '@/lib/api'
import { BlockInfoJson } from '@/lib/types'

interface BlockIndexProps {
  blocks?: BlockInfoJson[]
  error?: string
}

const BlockIndex: NextPage<BlockIndexProps> = ({ blocks, error }) => {
  if (error) return <Error message={error} />

  return (
    <div className="flex flex-col space-y-5">
      {blocks
        ?.sort((a, b) => b.height - a.height)
        .map((block) => (
          <Block key={block.hash} {...block} />
        ))}
    </div>
  )
}

BlockIndex.getInitialProps = async () => {
  try {
    return {
      blocks: await get_blocks(useNodeStore.getState().selectedNode.url),
    }
  } catch (err: any) {
    return { error: err.message }
  }
}

export default BlockIndex
