import { FC } from 'react'

import { GithubInfo } from 'kindelia/github/get_github_info'
import { classNames } from 'kindelia/react/classNames'

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
        'flex h-36 items-center rounded-md transition-all'
      )}
    >
      <div className="flex flex-col flex-1 h-full justify-center px-5">
        <div className="text-lg font-bold">{title}</div>
        <div>{description}</div>
      </div>
      <GithubCard {...repo} languageColor={languageColor} />
    </div>
  )
}
