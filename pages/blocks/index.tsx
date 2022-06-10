import { Block } from '@/components/blocks/Block'
import { get_blocks } from '@/lib/api'
import { BlockJson } from '@/lib/types'
import type { GetServerSideProps, NextPage } from 'next'

interface BlockIndexProps {
  blocks: BlockJson[]
}

const BlockIndex: NextPage<BlockIndexProps> = ({ blocks }) => {
  return (
    <div className="flex flex-col space-y-5">
      {blocks.map((block) => (
        <Block key={block.rand} {...block} />
      ))}
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<
  BlockIndexProps
> = async () => {
  return {
    props: {
      blocks: await get_blocks(),
    },
  }
}

export default BlockIndex
