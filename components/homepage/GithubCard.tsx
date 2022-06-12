import { GithubInfo } from '@/utils/getGithubInfo'
import { FC } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook, faCodeFork, faStar } from '@fortawesome/free-solid-svg-icons'

export interface GithubCardProps extends GithubInfo {
  showLanguage?: boolean
}

export const GithubCard: FC<GithubCardProps> = ({ showLanguage, ...repo }) => (
  <a
    href={`https://github.com/${repo.full_name}`}
    target="_blank"
    rel="noreferrer"
    className="flex flex-col justify-center items-start border-x-1 p-4 h-full text-gray-600 w-56 space-y-2"
  >
    <div className="flex flex-row space-x-3 items-center">
      <FontAwesomeIcon icon={faBook} />
      <div className="mt-0 text-blue-700 text-lg font-semibold">
        {repo.name}
      </div>
    </div>
    <div className="text-sm">{repo.description}</div>
    <div className="flex flex-row space-x-3 items-center text-sm">
      {showLanguage && (
        <div className="flex flex-row space-x-1 items-center">
          <div style={{ color: '#7A0410' }}>●</div>
          <div>{repo.language}</div>
        </div>
      )}
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
