import { get_function_state, ApiResponse } from '@/lib/api'
import { FunctionId, TermJson } from '@/lib/types'
import type { NextApiRequest, NextApiResponse } from 'next'
import { Option } from '@kindelia/lib/utils'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<Option<TermJson>>>
) {
  try {
    const name = req.query.name as FunctionId
    const state = await get_function_state(name)

    res.status(200).json({ data: state, status: 'ok' })
  } catch (err: any) {
    res.status(500).json({ error: err.message, status: 'error' })
  }
}
