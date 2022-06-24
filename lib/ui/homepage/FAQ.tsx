import { FC, useState, ReactNode } from 'react'
import { classNames } from '../../react/classNames'

export interface FAQProps {
  question: string
  answer: ReactNode
}

export const FAQ: FC<FAQProps> = ({ question, answer }) => {
  const [open, setOpen] = useState(false)

  const handleToggle = () => setOpen(!open)

  return (
    <div className="my-3">
      <div className="flex justify-between">
        <button
          className="cursor-pointer font-bold text-lg"
          onClick={handleToggle}
        >
          {question}
        </button>
      </div>
      <div
        className={classNames(
          open ? 'h-10' : 'text-transparent h-0',
          'transition-all'
        )}
      >
        {answer}
      </div>
    </div>
  )
}
