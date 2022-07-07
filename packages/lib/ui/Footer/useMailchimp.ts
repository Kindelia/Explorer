import { useEffect, useRef, useState } from 'react'

import axios from 'axios'

export type MailchimpResponse =
  | {
      result: 'success'
      msg: string
    }
  | {
      result: 'error'
      msg: string | Error
    }

interface UseMailChimpConfig {
  onError?: (error: string | Error) => void
  onSuccess?: (msg: string) => void
  timeout?: number
}

export const useMailchimp = <
  T extends Record<string, string> = { EMAIL: string }
>({
  onError,
  onSuccess,
  timeout = 5000,
}: UseMailChimpConfig) => {
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState<MailchimpResponse | undefined>()

  const subscribe = async (formData: T) => {
    setLoading(true)
    setResponse(undefined)

    try {
      const { data } = await axios.post<MailchimpResponse>(
        '/api/subscribe',
        formData,
        {
          timeout,
        }
      )
      setResponse(data)
      if (data.result === 'success' && onSuccess) onSuccess(data.msg)
      if (data.result === 'error' && onError) onError(data.msg)
    } catch (err) {
      const error = err as Error
      setResponse({ result: 'error', msg: error.message })

      if (onError) onError(error.message)
    } finally {
      setLoading(false)
    }
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
