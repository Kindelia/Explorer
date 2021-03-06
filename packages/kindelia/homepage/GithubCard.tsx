import { faBook, faCodeFork, faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FC } from 'react'

import { GithubInfo } from 'kindelia/github/get_github_info'

export interface GithubCardProps extends GithubInfo {
  languageColor: string
}

export const GithubCard: FC<GithubCardProps> = (repo) => (
  <a
    href={`https://github.com/${repo.full_name}`}
    target="_blank"
    rel="noreferrer"
    className="flex flex-col justify-center items-star t border-1 border-font-light dark:border-font-dark rounded-lg p-4 h-full w-56 space-y-2"
  >
    <div className="flex flex-row space-x-3 items-center">
      <FontAwesomeIcon icon={faBook} />
      <div className="mt-0 font-bold text-lg">{repo.full_name}</div>
    </div>
    <div className="text-sm">{repo.description}</div>
    <div className="flex flex-row space-x-3 items-center text-sm">
      <div className="flex flex-row space-x-1 items-center">
        <div style={{ color: repo.languageColor }}>●</div>
        <div>{repo.language}</div>
      </div>
      <div className="flex flex-row space-x-1 items-center">
        <FontAwesomeIcon icon={faStar} />
        <div>{repo.stargazers_count}</div>
      </div>
      <div className="flex flex-row space-x-1 items-center">
        <FontAwesomeIcon icon={faCodeFork} />
        <div>{repo.forks_count}</div>
      </div>
    </div>
  </a>
)
