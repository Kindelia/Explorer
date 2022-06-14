import { FC, ImgHTMLAttributes } from 'react'

interface SocialProps extends ImgHTMLAttributes<HTMLImageElement> {
  href: string
}

const socials: SocialProps[] = [
  {
    href: 'https://github.com/Kindelia',
    src: '/images/github_icon.webp',
    alt: 'Github page',
  },
  {
    href: 'https://t.me/kindelia',
    src: '/images/telegram_icon.webp',
    alt: 'Telegram',
  },
  {
    href: 'https://discord.com/invite/VV7ppaVWYn',
    src: '/images/discord_icon.webp',
    alt: 'Discord',
  },
]

const Social: FC<SocialProps> = ({ href, ...props }) => (
  <a href={href} target="_blank" rel="noreferrer">
    <img {...props} alt={props.alt} />
  </a>
)

export const Socials: FC = () => {
  return (
    <div className="flex flex-col items-center space-y-2">
      <div className="text-xl">Join Us</div>
      <div className="flex space-x-4 items-center justify-center">
        {socials.map((social) => (
          <Social key={social.href} {...social} />
        ))}
      </div>
    </div>
  )
}
