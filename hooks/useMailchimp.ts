import jsonp from 'jsonp'
import { useEffect, useRef, useState } from 'react'

// TODO: replace JSONP by CORS config or do this only server side(?)

type MailchimpResponse =
  | {
      result: 'success'
      msg: string
    }
  | {
      result: 'error'
      msg: string | Error
    }

interface UseMailChimpConfig {
  url: string
  onError?: (error: string | Error) => void
  onSuccess?: (msg: string) => void
  timeout?: number
}

export const useMailchimp = <
  T extends Record<string, string> = { EMAIL: string }
>({
  url,
  onError,
  onSuccess,
  timeout = 5000,
}: UseMailChimpConfig) => {
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState<MailchimpResponse | undefined>()
  const cancel = useRef<() => void>()

  useEffect(() => {
    return () => {
      if (cancel.current) cancel.current()
    }
  }, [])

  const subscribe = (formData: T) => {
    setLoading(true)
    setResponse(undefined)

    const params = new URLSearchParams(formData)

    cancel.current = jsonp(
      `${url}&${params.toString()}`,
      {
        param: 'c',
        timeout,
      },
      (err, data: MailchimpResponse | undefined) => {
        cancel.current = undefined
        setLoading(false)

        if (err) {
          setResponse({ result: 'error', msg: err.message })

          if (onError) onError(err)

          return
        }

        setResponse(data)

        if (data?.result === 'success' && onSuccess) onSuccess(data.msg)
        if (data?.result === 'error' && onError) onError(data.msg)
      }
    )
  }

  return [
    subscribe,
    {
      status: response?.result,
      loading,
      message: response?.msg,
    },
  ] as const
}
