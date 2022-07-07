import { hash_hex_from } from 'ui/utils/hex'
import { ApiResponse, get_block } from '@/lib/api'
import { BlockInfoJson } from '@/lib/types'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<BlockInfoJson>>
) {
  const id = req.query.id as string

  const hex = hash_hex_from(id)

  try {
    const block = await get_block(hex)
    res.status(200).json({ data: block, status: 'ok' })
  } catch (err) {
    res.status(500).json({ error: err.message, status: 'error' })
  }
}
