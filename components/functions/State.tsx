import { FC } from 'react'
// TODO: checar estrutura do estado
interface StateProps {
  state: unknown
}

export const State: FC<StateProps> = ({ state }) => {
  return <div>render state</div>
}
