import type { GetServerSideProps, NextPage } from 'next'
import * as api from '@/lib/api'
import * as HVM from '@/lib/hvm'
import { StatementJsonRender } from '@/components/StatementJsonRender'
import { BlockContentJson } from '@/lib/types'
import { StatementRender } from '@/components/StatementRender'
import { ParsedUrlQuery } from 'querystring'

interface Props {
  id: string
  data: any
  content: BlockContentJson
}

const Block: NextPage<Props> = ({ id, data, content }) => {
  // TODO: Why SSR not working with `id` ?
  const terms = HVM.read_block_content(content)
  console.log(terms)

  return (
    <div className="flex flex-col items-center justify-center">
      Showing block: {id}
      {content.map((statement, index) => (
        <StatementJsonRender key={index} {...statement} />
      ))}
      {terms.map((term, index) => (
        <StatementRender key={index} {...term} />
      ))}
    </div>
  )
}

export default Block

interface Params extends ParsedUrlQuery {
  id: string
}

export const getServerSideProps: GetServerSideProps<Props, Params> = async ({
  params,
}) => {
  if (!params) return { notFound: true }

  const { id } = params
  // TODO validate id and parse hex
  const data = await api.get_block(id)
  const content = await api.get_block_content(id)
  return { props: { id, data, content } }
}
