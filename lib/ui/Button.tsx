import { ButtonHTMLAttributes, FC } from 'react'
import { classNames } from '../react/classNames'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
}

type ButtonVariant = 'outline'

export const Button: FC<ButtonProps> = ({ className, variant, ...props }) => (
  <button
    {...props}
    className={classNames(
      variant === 'outline'
        ? 'bg-bg-light'
        : 'bg-primary-light text-bg-light border-transparent',
      'border-gray-500 hover:bg-slate-300 active:bg-slate-400 border-x border-y px-5 py-1 rounded transition-colors',
      className
    )}
  />
)
