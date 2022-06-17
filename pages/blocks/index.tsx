import { Block } from '@/components/blocks/Block'
import { get_blocks } from '@/lib/api'
import { BlockInfoJson, BlockJson } from '@/lib/types'
import type { GetServerSideProps, NextPage } from 'next'

interface BlockIndexProps {
  blocks: BlockInfoJson[]
}

const BlockIndex: NextPage<BlockIndexProps> = ({ blocks }) => {
  return (
    <div className="flex flex-col space-y-5">
      {blocks.map((block) => (
        <Block key={block.hash} {...block} />
      ))}
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<
  BlockIndexProps
> = async () => {
  // try {
  let blocks = await get_blocks()
  return {
    props: {
      blocks,
    },
  }
  // } catch (err) {
  //   console.log(err)
  //   return { redirect: { destination: '/', permanent: true } }
  // }
  // TODO: proper error handling, should we create an error page?
}

export default BlockIndex
