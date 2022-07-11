import { Run } from './getRun'
import { ParsedUrlQuery } from 'querystring'

const mockedFunction: Function = {
  name: 'mock',
  history: [
    { id: '1', name: '$(Counter $(Inc))' },
    { id: '2', name: '$(Counter $(Inc))' },
    { id: '3', name: '$(Counter $(Inc))' },
    { id: '4', name: '$(Counter $(Get))' },
  ],
  code: `!(Counter action) {
    !(Counter $(Inc)) = $(IO.take @x $(IO.save (+ x #1) #~ $(IO.done #0)))
    !(Counter $(Get)) = !(IO.load @x $(IO.done x))
  } = #0 // initial state = #0`,
}

// TODO: checar estrutura do state
export interface FunctionState {
  todo: string
}

export interface Function {
  name: string
  code: string
  history: Pick<Run, 'id' | 'name'>[]
}

export interface GetFunctionParams extends ParsedUrlQuery {
  name: string
}

export const getFunction = async ({
  name,
}: GetFunctionParams): Promise<Function> => {
  // TODO: fetch api
  // return fetch(`/api/get_function/${name}`).then...

  return {
    ...mockedFunction,
    name: name,
  }
}
