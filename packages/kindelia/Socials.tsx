import { FC, ImgHTMLAttributes } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faGithub,
  faDiscord,
  faReddit,
  faTwitter,
  faTelegram,
  IconDefinition,
} from '@fortawesome/free-brands-svg-icons'

interface SocialProps extends ImgHTMLAttributes<HTMLImageElement> {
  href: string
  icon: IconDefinition
}

const socials: SocialProps[] = [
  {
    href: 'https://github.com/Kindelia',
    alt: 'Github page',
    icon: faGithub,
  },
  {
    href: 'https://discord.gg/Kindelia',
    alt: 'Discord',
    icon: faDiscord,
  },
  {
    href: 'https://t.me/kindelia',
    alt: 'Telegram',
    icon: faTelegram,
  },
  {
    href: 'https://twitter.com/KindeliaOrg',
    alt: 'Twitter',
    icon: faTwitter,
  },
  {
    href: 'https://www.reddit.com/r/Kindelia/',
    alt: 'Reddit',
    icon: faReddit,
  },
]

export const Socials: FC = () => {
  return (
    <div className="flex flex-col items-center space-y-2">
      <div className="text-xl">Join Us</div>
      <div className="flex space-x-4 items-center justify-center pb-4">
        {socials.map((social) => (
          <a
            href={social.href}
            key={social.alt}
            target="_blank"
            rel="noreferrer"
          >
            <FontAwesomeIcon size="lg" icon={social.icon} />
          </a>
        ))}
      </div>
    </div>
  )
}
