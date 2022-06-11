export interface BlockInfo {
  height: string
  hash: string
  mana: number
  size: number
  ctrs: number
  funs: number
  runs: number
}

const mockBlock: BlockInfo[] = [
  {
    height: '731',
    hash: '0x18168080',
    mana: 8000,
    size: 2000,
    ctrs: 0,
    funs: 0,
    runs: 7,
  },
  {
    height: '730',
    hash: '0x18168080',
    mana: 1000,
    size: -24,
    ctrs: 0,
    funs: 1,
    runs: 2,
  },
  {
    height: '729',
    hash: '0x18168080',
    mana: 2000,
    size: 40,
    ctrs: 0,
    funs: 0,
    runs: 7,
  },
  {
    height: '728',
    hash: '0x18168080',
    mana: 2000,
    size: 0,
    ctrs: 0,
    funs: 2,
    runs: 0,
  },
  {
    height: '727',
    hash: '0x18168080',
    mana: 0,
    size: 0,
    ctrs: 3,
    funs: 0,
    runs: 0,
  },
]

export const getBlocks = async () => {
  return mockBlock
}
