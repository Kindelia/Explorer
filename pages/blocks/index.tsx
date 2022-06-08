import { BlockInfo, getBlocks } from '@/calls/getBlocks'
import { Block } from '@/components/blocks/Block'
import type { GetServerSideProps, NextPage } from 'next'

interface BlockIndexProps {
  blocks: BlockInfo[]
}

const BlockIndex: NextPage<BlockIndexProps> = ({ blocks }) => {
  return (
    <div className="flex flex-col space-y-5">
      {blocks.map((block) => (
        <Block key={block.block} {...block} />
      ))}
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<
  BlockIndexProps
> = async () => {
  return {
    props: {
      blocks: await getBlocks(),
    },
  }
}

export default BlockIndex
