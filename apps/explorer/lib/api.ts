import axios, { AxiosResponse } from 'axios'
import { AxiosRequestConfig } from 'axios'

import { Option } from 'kindelia/utils/enum'

import { config } from './config'
import * as T from './types'

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

  let axios_config: AxiosRequestConfig = {
    url: `${host}${endpoint}`,
    method: 'get', // default
    ...cfg,
  }
  const response: AxiosResponse<ApiResponse<T>> = await axios(axios_config)
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

// TODO: Function Type
export const get_function = (id: T.FunctionId, node?: string) =>
  fetch_api<Option<T.FuncJson>>(`/functions/${id}`, node)

export const get_function_state = (id: T.FunctionId) =>
  fetch_api<T.TermJson>(`/functions/${id}/state`)

// Interact

export const post_interact_test = (code: string, node?: string) =>
  fetch_api<T.BlockResultsJson[]>(`/code/test`, node, {
    method: 'post',
    headers: {
      'Content-Type': 'text/plain',
    },
    data: code,
  })

export const post_interact_send = (code: string, node?: string) =>
  fetch_api<any>(`/code/send`, node, {
    method: 'post',
    headers: {
      'Content-Type': 'text/plain',
    },
    data: code,
  })
