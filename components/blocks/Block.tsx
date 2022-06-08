import { BlockInfo } from '@/calls/getBlocks'
import Link from 'next/link'
import { FC, HTMLAttributes, ReactNode } from 'react'

interface InfoProps extends HTMLAttributes<HTMLDivElement> {
  title: string
  children: ReactNode
}

export const Info: FC<InfoProps> = ({ title, children, ...props }) => (
  <div {...props}>
    <div>{title}</div>
    <div>{children}</div>
  </div>
)

export const Block: FC<BlockInfo> = (props) => {
  return (
    <Link href={`/blocks/${props.hash}`}>
      <a>
        <div className="flex flex-row justify-between border-2 px-4 py-2 border-gray-700">
          <Info title="Block">#{props.block}</Info>
          <Info title="Hash">{props.hash}</Info>
          <Info title="Mana">{props.mana}</Info>
          <Info title="Space">
            {props.size > 0 && '+'}
            {props.size}
          </Info>
          <Info title="Ctrs">{props.ctrs}</Info>
          <Info title="Funs">{props.funs}</Info>
          <Info title="Runs">{props.runs}</Info>
        </div>
      </a>
    </Link>
  )
}
