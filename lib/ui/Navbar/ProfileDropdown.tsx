import { classNames } from '@kindelia/lib/react/classNames'
import { Disclosure, Menu } from '@headlessui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faWallet
} from '@fortawesome/free-solid-svg-icons'

import { DropdownTransition } from './DropdownTransition'

export default function ProfileDropdown() {
  return (
    <Menu as="div" className="ml-3 relative">
      <div>
        <Menu.Button className="w-8 flex text-sm rounded-full ">
          <span className="sr-only">Open user menu</span>
          <FontAwesomeIcon size="lg" icon={faWallet} />
        </Menu.Button>
      </div>
      <DropdownTransition>
        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <Menu.Item>
            {({ active }) => (
              <a
                href="#"
                className={classNames(
                  active ? 'bg-gray-100' : '',
                  'block px-4 py-2 text-sm text-gray-700'
                )}
              >
                Your Profile
              </a>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <a
                href="#"
                className={classNames(
                  active ? 'bg-gray-100' : '',
                  'block px-4 py-2 text-sm text-gray-700'
                )}
              >
                Settings
              </a>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <a
                href="#"
                className={classNames(
                  active ? 'bg-gray-100' : '',
                  'block px-4 py-2 text-sm text-gray-700'
                )}
              >
                Sign out
              </a>
            )}
          </Menu.Item>
        </Menu.Items>
      </DropdownTransition>
    </Menu>
  )
}
