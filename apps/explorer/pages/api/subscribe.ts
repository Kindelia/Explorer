import type { NextApiRequest, NextApiResponse } from 'next'

import { config } from '@/lib/config'
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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<MailchimpResponse>
) {
  const params = new URLSearchParams(req.body)

  try {
    const { data } = await axios.get<MailchimpResponse>(
      `${config.mailchimp_url}&${params.toString()}`
    )
    res.status(200).json(data)
  } catch (err) {
    res.status(500).json({ msg: JSON.stringify(err), result: 'error' })
  }
}
