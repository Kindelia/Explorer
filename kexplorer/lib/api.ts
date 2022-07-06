import axios from 'axios'
import { AxiosRequestConfig } from 'axios'

import { Option } from '@kindelia/lib/utils/enum'

import * as T from './types'
import { config } from './config'

export type ApiResponse<T> =
  | {
      status: 'ok'
      data: T
    }
  | {
      status: 'error'
      error: string // TODO: rename to `message` or `msg`
    }

const fetch_api = async <T>(
  endpoint: string,
  node: string = config.nodes[0],
  cfg?: AxiosRequestConfig
): Promise<T> => {
  let host = `http://${node}:8000` ?? 'http://127.0.0.1:8000'

  // TODO: remove this after SSL is implemented
  if (typeof window === 'undefined') {
    host = `http://${config.nodes[0]}:8000`
  } else {
    host = node.includes('api')
      ? node
      : `http://${node}:8000` ?? 'http://localhost:8000'
  }

  const response = await axios.get<ApiResponse<T>>(`${host}${endpoint}`, cfg)
  // TODO: handle response error

  let body = response.data
  if (body.status !== 'ok') {
    throw new Error(body.error)
  }
  return body.data
}

// Node

// export const get_tick = () => fetch_api<never>('/tick')

// Blocks

export const get_blocks = (node?: string) =>
  fetch_api<T.BlockInfoJson[]>('/blocks', node)

export const get_block = (hex: T.BlockId, node?: string) =>
  fetch_api<Option<T.BlockInfoJson>>(`/blocks/${hex}`, node)

// // REMOVED
// export const get_block_content = (id: T.BlockId) =>
//   fetch_api<T.BlockContentJson>(`/blocks/${id}/content`)

// Functions

export const get_functions = (node?: string) =>
  fetch_api<T.Name[]>('/functions', node)

// export const get_function = (id: FunctionId) => fetch_api<T.Function>(`/functions/${id}`)

export const get_function_state = (id: T.FunctionId) =>
  fetch_api<T.TermJson>(`/functions/${id}/state`)
