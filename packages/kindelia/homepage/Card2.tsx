import { FC } from 'react'

import { GithubInfo } from 'kindelia/github/get_github_info'

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
  languageColor,
}) => {
  return (
    <div className="h-full">
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
