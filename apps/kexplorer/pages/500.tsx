import { Error } from 'ui'

export default function ServerError() {
  return <Error code={500} message="Internal server error" />
}
