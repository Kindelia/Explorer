export interface Run {
  id: string
  name: string
  // run stuff
}

export interface GetRunParams {
  name: string
  id: string
}

export const getRun = async ({ name, id }: GetRunParams): Promise<Run> =>
  // TODO: fetch api
  // fetch('')
  //   .then((res) => res.json())
  //   .then((res) => ({ name, id }))
  ({ name, id })
