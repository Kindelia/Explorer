import type { NextApiRequest, NextApiResponse } from 'next'
import { Option } from 'kindelia/utils'

import { BlockInfoJson } from '@/lib/types'
import { ApiResponse, get_blocks } from '@/lib/api'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<Option<BlockInfoJson[]>>>
) {
  try {
    const blocks = await get_blocks()
    res.status(200).json({ data: blocks, status: 'ok' })
  } catch (err: any) {
    res.status(500).json({ error: err.message, status: 'error' })
  }
}
