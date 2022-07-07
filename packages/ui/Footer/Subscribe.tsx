import { FC, FormEventHandler, HTMLAttributes, useRef } from 'react'

import { useMailchimp } from './useMailchimp'
import { Button } from 'ui'
import { classNames } from 'ui/react/classNames'

interface SubscribeProps extends HTMLAttributes<HTMLFormElement> {}

interface SubscribeFormData {
  email: { value: string }
}

export const Subscribe: FC<SubscribeProps> = ({ className, ...props }) => {
  const formRef = useRef<HTMLFormElement>(null)

  const [subscribe, { loading, message, status }] = useMailchimp({
    onSuccess: () => {
      formRef.current?.reset()
    },
  })

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()

    const { email } = e.target as typeof e.target & SubscribeFormData

    subscribe({ EMAIL: email.value })
  }

  return (
    <form
      ref={formRef}
      className={classNames(
        className ?? '',
        'flex flex-col mx-auto items-center px-4 sm:px-14 py-4 space-y-3 w-full sm:max-w-min'
      )}
      onSubmit={handleSubmit}
      {...props}
    >
      <div className="uppercase font-bold text-3xl">NEWSLETTER</div>
      <div className="pb-4">Keep up with our latest news and events.</div>
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
          className="uppercase bg-gray-700 text-white hover:bg-gray-800 disabled:bg-gray-300"
          disabled={loading}
        >
          Subscribe
        </Button>
      </div>
      <div
        className={classNames(
          status === 'error' ? 'text-red-400' : 'text-green-600',
          'text-xs h-3 pb-4 text-center'
        )}
      >
        {message?.toString()}
      </div>
    </form>
  )
}
