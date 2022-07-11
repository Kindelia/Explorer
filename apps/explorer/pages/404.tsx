import { Error } from 'kindelia'

export default function NotFound() {
  return (
    <Error code={404} message="The content you are looking for wasn't found." />
  )
}
