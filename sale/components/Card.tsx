import { FC } from 'react'

import { GithubCard } from './GithubCard'
import { GithubInfo } from '@kindelia/lib/github/get_github_info'

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
  languageColor,
}) => {
  return (
    <div className="h-full text-primary-light">
      <div className="flex flex-col justify-evenly h-full">
        <div className="space-y-2">
          <div className="text-3xl font-bold">{title}</div>
          <div className="font-semibold leading-loose">{description}</div>
        </div>
        <GithubCard {...repo} languageColor={languageColor} />
      </div>
    </div>
  )
}
