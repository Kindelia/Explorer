import { FC } from 'react'

import { GithubInfo } from 'ui/github/get_github_info'
import { faCodeFork, faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export interface GithubCardProps extends GithubInfo {
  languageColor: string
}

export const GithubCard: FC<GithubCardProps> = (repo) => (
  <a
    href={`https://github.com/${repo.full_name}`}
    target="_blank"
    rel="noreferrer"
    className="shadow-xl rounded-lg p-4 space-y-2 bg-bg-light"
  >
    <div className="flex flex-row space-x-3 items-center">
      <div className="mt-0 text-link-light font-bold text-2xl">
        {repo.full_name}
      </div>
    </div>
    <div className="">{repo.description}</div>
    <div className="flex flex-row space-x-6 items-center text-sm">
      <div className="flex flex-row space-x-1 items-center">
        <div style={{ color: repo.languageColor }}>●</div>
        <div>{repo.language}</div>
      </div>
      <div className="flex flex-row space-x-1 items-center">
        <FontAwesomeIcon icon={faStar} color="#ffd027" />
        <div>{repo.stargazers_count}</div>
      </div>
      <div className="flex flex-row space-x-1 items-center">
        <FontAwesomeIcon icon={faCodeFork} />
        <div>{repo.forks_count}</div>
      </div>
    </div>
  </a>
)
