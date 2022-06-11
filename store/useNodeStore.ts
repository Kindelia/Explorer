import create from 'zustand'

type NodeStore = {
  nodes: string[]
  selectedNode: string
  selectNode: (node: string) => void
  setNodes: (nodes: string[]) => void
}

export const useNodeStore = create<NodeStore>((set, get) => ({
  nodes: ['node-1', 'node-2', 'node-3', 'node-4'],

  selectedNode: 'node-1',

  selectNode(node) {
    set({ selectedNode: node })
  },

  setNodes(nodes) {
    set({ nodes })
  },
}))
