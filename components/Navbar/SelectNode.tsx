import { useNodeStore } from '@/store/useNodeStore'
import { classNames } from '@/utils/classnames'
import { Menu } from '@headlessui/react'
import { FC } from 'react'
import { DropdownTransition } from './DropdownTransition'

export const SelectNode: FC = () => {
  const [nodes, selectedNode, selectNode] = useNodeStore((store) => [
    store.nodes,
    store.selectedNode,
    store.selectNode,
  ])

  return (
    <Menu
      as="div"
      className="border-2 border-transparent px-1 mx-2 my-2 rounded-md font-medium relative bg-gray-100 border-x border-y border-gray-600"
    >
      <Menu.Button className="w-14 text-sm">{selectedNode}</Menu.Button>
      <DropdownTransition>
        <Menu.Items className="z-10 flex flex-col absolute mt-2 w-28 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          {nodes.map((node) => (
            <Menu.Item key={node} disabled={selectedNode === node}>
              {({ disabled }) => (
                <button
                  className={classNames(
                    disabled ? 'text-gray-500' : 'hover:bg-gray-100',
                    'text-sm py-2'
                  )}
                  disabled={disabled}
                  onClick={() => selectNode(node)}
                >
                  {node}
                </button>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </DropdownTransition>
    </Menu>
  )
}
