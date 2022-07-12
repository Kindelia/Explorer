import { ethers } from 'ethers'
import { MetaMaskInpageProvider } from '@metamask/providers'

declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider
  }
}

const checkMetamask = () =>
  Boolean(typeof window !== 'undefined' && window.ethereum)

export const getProvider = () =>
  checkMetamask()
    ? new ethers.providers.Web3Provider((window as any).ethereum)
    : null
