import type { NextApiRequest, NextApiResponse } from 'next'

import { hash_hex_from } from 'kindelia/utils/hex'
import { TermJson } from '@/lib/types'
import { get_function_state, ApiResponse } from '@/lib/api'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<TermJson>>
) {
  try {
    const name = req.query.name as string
    const state = await get_function_state(name as any)
    res.status(200).json({ data: state, status: 'ok' })
  } catch (err) {
    res.status(500).json({ error: err.message, status: 'error' })
  }
}
