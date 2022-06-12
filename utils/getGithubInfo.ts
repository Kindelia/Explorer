import axios from 'axios'

export interface GithubInfo {
  stargazers_count: number
  language: string
  full_name: string
  name: string
}

export const getGithubInfo = async (
  user: string,
  repository: string
): Promise<GithubInfo> => {
  const res = await axios.get<GithubInfo>(
    `https://api.github.com/repos/${user}/${repository}`
  )

  const { full_name, language, stargazers_count, name } = res.data

  return {
    full_name,
    language,
    stargazers_count,
    name,
  }
}
