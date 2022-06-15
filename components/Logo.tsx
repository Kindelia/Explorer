import { FC } from 'react'

const Logo: FC<{ className: string }> = ({ className }) => {
  return (
    <img
      className={className}
      alt="Kindelia logo"
      src="https://kindelia.org/_next/static/media/kindelia_logo.94d30f0d.svg"
    />
  )
}

export default Logo
