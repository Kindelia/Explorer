import { FC } from 'react'

import { classNames } from '@/utils/classnames'
import { GithubInfo } from '@/utils/getGithubInfo'

import { GithubCard } from './GithubCard'

interface CardProps {
  title: string
  description: string
  repo: GithubInfo
  reverse?: boolean
  languageColor: string
}

export const Card: FC<CardProps> = ({
  title,
  description,
  repo,
  reverse,
  languageColor,
}) => {
  return (
    <div
      className={classNames(
        reverse ? 'flex-row-reverse' : 'flex-row',
        'flex h-36 items-center border-x border-y rounded-md shadow hover:scale-102 transition-all'
      )}
    >
      <div className="flex flex-col flex-1 h-full justify-center px-5">
        <div className="text-lg font-semibold">{title}</div>
        <div>{description}</div>
      </div>
      <GithubCard {...repo} languageColor={languageColor} />
    </div>
  )
}
