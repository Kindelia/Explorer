import { classNames } from '@/utils/classnames'
import { FC, FormEventHandler, HTMLAttributes, useState } from 'react'
import { Button } from '../Button'

interface SubscribeProps extends HTMLAttributes<HTMLFormElement> {}

interface SubscribeFormData {
  email: { value: string }
}

export const Subscribe: FC<SubscribeProps> = ({ className, ...props }) => {
  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()

    const formData = e.target as typeof e.target & SubscribeFormData

    console.log('subscribe', formData.email.value)
  }

  return (
    <form
      className={classNames(
        className ?? '',
        'flex flex-col mx-auto items-center bg-gray-100 px-4 sm:px-14 py-4 rounded-sm space-y-6'
      )}
      onSubmit={handleSubmit}
      {...props}
    >
      <div className="uppercase font-bold text-3xl">NEWSLETTER</div>
      <div>Keep up with out latest news and events.</div>
      <div className="sm:space-x-4 flex sm:flex-row flex-col justify-center items-center space-y-2 sm:space-y-0 w-full">
        <input
          placeholder="Email Address"
          type="email"
          name="email"
          className="w-full sm:w-80 rounded-sm py-1 px-4"
          required
        />
        <Button
          type="submit"
          className="uppercase bg-gray-700 text-white hover:bg-gray-800"
        >
          Subscribe
        </Button>
      </div>
    </form>
  )
}
