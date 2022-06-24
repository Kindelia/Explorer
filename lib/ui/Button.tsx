import { ButtonHTMLAttributes, FC } from 'react'
import { classNames } from '../react/classNames'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button: FC<ButtonProps> = ({ className, ...props }) => (
  <button
    {...props}
    className={classNames(
      'border-gray-500 hover:bg-slate-300 active:bg-slate-400 border-x border-y px-5 py-1 rounded transition-colors',
      className
    )}
  />
)
