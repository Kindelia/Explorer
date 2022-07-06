import { useEffect } from 'react'
import { classNames } from '@kindelia/lib/react/classNames'
import { Menu } from '@headlessui/react'
import { DropdownTransition } from './DropdownTransition'
import { useMetamaskStore } from '../../metamask/useMetamaskStore'
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon'
import { useRouter } from 'next/router'

export default function ProfileDropdown() {
  const router = useRouter()

  const [account, login, logout, handleAccountsChanged] = useMetamaskStore(
    (store) => [
      store.account,
      store.login,
      store.logout,
      store.handleAccountsChanged,
    ]
  )

  useEffect(() => {
    if (!window.ethereum) return

    const handleAccount = async (accounts: string[]) => {
      handleAccountsChanged(accounts)
      router.reload()
    }

    window.ethereum.on('chainChanged', router.reload)
    window.ethereum.on('accountsChanged', handleAccount as any)

    return () => {
      window.ethereum?.removeAllListeners()
    }
  }, [router, handleAccountsChanged])

  return (
    <Menu as="div" className="ml-3 relative">
      <div>
        <Menu.Button className="w-8 bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
          <span className="sr-only">Open user menu</span>
          {account ? (
            <Jazzicon diameter={32} seed={jsNumberForAddress(account)} />
          ) : (
            <img
              className="h-8 w-8 rounded-full"
              src="https://isaojose.com.br/wp-content/uploads/2020/12/blank-profile-picture-mystery-man-avatar-973460.jpg"
              alt=""
            />
          )}
        </Menu.Button>
      </div>
      <DropdownTransition>
        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          {account ? (
            <>
              <Menu.Item>
                <span className="px-4 py-2 w-full block text-center text-gray-700">
                  {account.substring(0, 5)}...{account.slice(-4)}
                </span>
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={logout}
                    className={classNames(
                      active ? 'bg-gray-100' : '',
                      'block px-4 py-2 text-sm text-gray-700 w-full'
                    )}
                  >
                    Logout
                  </button>
                )}
              </Menu.Item>
            </>
          ) : (
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={login}
                  className={classNames(
                    active ? 'bg-gray-100' : '',
                    'block px-4 py-2 text-sm text-gray-700 w-full'
                  )}
                >
                  Login Metamask
                </button>
              )}
            </Menu.Item>
          )}
        </Menu.Items>
      </DropdownTransition>
    </Menu>
  )
}
