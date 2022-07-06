import { hash_hex_from } from '@kindelia/lib/utils/hex'
import { ApiResponse, get_block } from '@/lib/api'
import { BlockInfoJson } from '@/lib/types'
import type { NextApiRequest, NextApiResponse } from 'next'
import { Option } from '@kindelia/lib/utils'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<Option<BlockInfoJson>>>
) {
  const id = req.query.id as string

  const hex = hash_hex_from(id)
  if (hex == null) {
    res.status(400).json({
      status: 'error',
      error: `Invalid block ID ${id}. Must be a 256-bit hexadecimal string starting with '0x'.`,
    })
    return
  }

  try {
    const block = await get_block(hex)

    res.status(200).json({ data: block, status: 'ok' })
  } catch (err: any) {
    res.status(500).json({ error: err.message, status: 'error' })
  }
}
