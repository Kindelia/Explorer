import { ButtonHTMLAttributes, FC } from 'react'
import { classNames } from '../react/classNames'
import styles from './Button.module.css'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button: FC<ButtonProps> = ({ className, ...props }) => (
  <button
    {...props}
    className={classNames(
      'border-x border-y px-5 py-1 rounded transition-colors',
      styles.button,
      className || ''
    )}
  />
)
