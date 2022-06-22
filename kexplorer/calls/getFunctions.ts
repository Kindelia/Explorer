export interface FunctionInfo {
  name: string
  signature: string
}

const mockFunction: FunctionInfo[] = [
  {
    name: 'Counter',
    signature: '$(Counter $(Inc))',
  },
  {
    name: 'Test',
    signature: '$(Test $(Inc))',
  },
]

export const getFunctions = async () => {
  return mockFunction
}
