import { BlockInfo } from '@/calls/getBlocks'
import Link from 'next/link'
import { FC, HTMLAttributes, ReactNode } from 'react'

interface InfoProps extends HTMLAttributes<HTMLDivElement> {
  title: string
  children: ReactNode
}

export const Info: FC<InfoProps> = ({
  title,
  children,
  className,
  ...props
}) => (
  <div className={`${className} text-left mx-1`} {...props}>
    <div>{title}</div>
    <div>{children}</div>
  </div>
)

export const Block: FC<BlockInfo> = (props) => {
  return (
    <Link href={`/blocks/${props.height}`}>
      <a>
        <div className="flex flex-row sm:space-x-6 justify-between border-2 sm:px-4 py-2 border-gray-500">
          <Info className="w-16" title="Block">
            #{props.height}
          </Info>
          <Info className="flex-1" title="Hash">
            {props.hash}
          </Info>
          <Info className="w-20" title="Mana">
            {props.mana}
          </Info>
          <Info className="w-20" title="Space">
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
