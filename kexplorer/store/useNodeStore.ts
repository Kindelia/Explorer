import { config } from '@/lib/config'
import create from 'zustand'

type Node = {
  name: string
  url: string
}

const nodes: Node[] = config.nodes.map((url, i) => ({
  name: `kf-node-${i + 1}`,
  url,
}))

type NodeStore = {
  nodes: Node[]
  selectedNode: Node
  selectNode: (node: Node) => void
  setNodes: (nodes: Node[]) => void
  addNode: (node: Node) => void
}

export const useNodeStore = create<NodeStore>((set, get) => ({
  nodes: [...nodes, { name: 'localhost:8000', url: 'localhost' }],

  selectedNode: nodes[0],

  selectNode(node) {
    set({ selectedNode: node })
  },

  setNodes(nodes) {
    set({ nodes })
  },

  addNode(node) {
    set((prev) => ({ nodes: [...prev.nodes, node] }))
  },
}))
