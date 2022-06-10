/* eslint-disable prettier/prettier */

import * as T from './types'
import * as HVM from './hvm'

type Response<T> =
  | {
      status: 'ok'
      data: T
    }
  | {
      status: 'error'
      error: string
    }

const fetchApi = async <T>(endpoint: string, init?: RequestInit) => {
  const response = (await fetch(`${process.env.API_URL}${endpoint}`, init).then(
    (res) => res.json()
  )) as Response<T>

  if (response.status !== 'ok') {
    throw new Error(response.error)
  }

  return response.data
}

export async function get_blocks(): Promise<T.BlockJson[]> {
  return fetchApi('/blocks')
}

export async function get_block(id: bigint | string): Promise<T.BlockJson> {
  return fetchApi(`/blocks/${id}`)
}

export async function get_block_content(
  id: bigint | string
) {
  return fetchApi<T.BlockContentJson>(`/blocks/${id}/content`)
}

export const get_functions = () => fetchApi<string[]>('/functions')

export async function get_function(id: bigint | string): Promise<any> {
  return fetchApi(`/functions/${id}`)
}

export const get_function_state = (id: bigint | string) => fetchApi<T.StatementJson>(`/functions/${id}/state`)

export const get_tick = () => fetchApi<string>('/tick')