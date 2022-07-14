import type { NextApiRequest, NextApiResponse } from 'next'

import { ApiResponse, get_functions } from '@/lib/api'
import { Name } from '@/lib/types'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<Name[]>>
) {
  try {
    const functions = await get_functions()
    res.status(200).json({ data: functions, status: 'ok' })
  } catch (err: any) {
    res.status(500).json({ error: err.message, status: 'error' })
  }
}
