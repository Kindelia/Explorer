import { FC, HTMLAttributes, ReactNode } from 'react'

import { classNames } from 'kindelia/react/classNames'

interface SectionProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

export const Section: FC<SectionProps> = ({
  className,
  children,
  ...props
}) => (
  <div
    className={classNames(className, 'min-h-50-screen flex flex-col b-40')}
    {...props}
  >
    {children}
  </div>
)
