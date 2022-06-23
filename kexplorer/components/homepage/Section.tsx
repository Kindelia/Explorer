import { FC, HTMLAttributes, ReactNode } from 'react'
import { classNames } from '@kindelia/lib/react/classNames'

interface SectionProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

export const Section: FC<SectionProps> = ({
  className,
  children,
  ...props
}) => (
  <div
    className={classNames(className || '', 'h-80-screen flex flex-col')}
    {...props}
  >
    {children}
  </div>
)
