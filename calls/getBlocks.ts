export interface BlockInfo {
  block: string
  hash: string
  mana: number
  size: number
  ctrs: number
  funs: number
  runs: number
}

const mockBlock: BlockInfo[] = [
  {
    block: '731',
    hash: '0x18168080',
    mana: 790869,
    size: 73,
    ctrs: 3,
    funs: 2,
    runs: 6,
  },
  {
    block: '730',
    hash: '0x18168080',
    mana: 790869,
    size: -73,
    ctrs: 3,
    funs: 2,
    runs: 6,
  },
  {
    block: '729',
    hash: '0x18168080',
    mana: 790869,
    size: 73,
    ctrs: 3,
    funs: 2,
    runs: 6,
  },
  {
    block: '728',
    hash: '0x18168080',
    mana: 790869,
    size: 73,
    ctrs: 3,
    funs: 2,
    runs: 6,
  },
  {
    block: '727',
    hash: '0x18168080',
    mana: 790869,
    size: 73,
    ctrs: 3,
    funs: 2,
    runs: 6,
  },
]

export const getBlocks = async () => {
  return mockBlock
}
