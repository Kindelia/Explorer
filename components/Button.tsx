import { ButtonHTMLAttributes, FC } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button: FC<ButtonProps> = ({ className, ...props }) => (
  <button
    {...props}
    className={`${className} border-x border-y border-gray-500 px-10 py-1 rounded hover:bg-slate-300 active:bg-slate-400 transition-colors`}
  />
)
