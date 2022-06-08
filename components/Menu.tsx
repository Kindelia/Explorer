import type { NextPage } from 'next'
import Link from 'next/link'

const InteractIndex: NextPage = () => {
  return (
    <nav className="flex justify-between mb-5">
      <Link href="/">
        <a>
          <img
            alt="Kindelia logo"
            height="30px"
            width="30px"
            src="https://kindelia.org/_next/static/media/kindelia_logo.94d30f0d.svg"
          />
        </a>
      </Link>
      <div className="space-x-5">
        <Link href="/interact">
          <a>Interact</a>
        </Link>
        <Link href="/blocks">
          <a>Blocks</a>
        </Link>
        <Link href="/functions">
          <a>Funtions</a>
        </Link>
      </div>
    </nav>
  )
}

export default InteractIndex
