import axios from 'axios'
import { AxiosRequestConfig } from 'axios'

import { Option } from 'kindelia-sites-lib/dist/util'

import * as T from './types'

type ApiResponse<T> =
  | {
      status: 'ok'
      data: T
    }
  | {
      status: 'error'
      error: string
    }

const fetch_api = async <T>(
  endpoint: string,
  cfg?: AxiosRequestConfig
): Promise<T> => {
  const host = process?.env?.API_URL ?? 'http://localhost:8000' // TODO
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

export const get_blocks = (range?: null) =>
  fetch_api<T.BlockInfoJson[]>('/blocks')

export const get_block = (hex: T.BlockId) =>
  fetch_api<Option<T.BlockInfoJson>>(`/blocks/${hex}`)

// // REMOVED
// export const get_block_content = (id: T.BlockId) =>
//   fetch_api<T.BlockContentJson>(`/blocks/${id}/content`)

// Functions

export const get_functions = () => fetch_api<T.Name[]>('/functions')

// export const get_function = (id: FunctionId) => fetch_api<T.Function>(`/functions/${id}`)

export const get_function_state = (id: T.FunctionId) =>
  fetch_api<T.TermJson>(`/functions/${id}/state`)
