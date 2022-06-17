import { classNames } from '@/utils/classnames'
import { Disclosure, Menu } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import ProfileDropdown from './ProfileDropdown'
import Searchbar from './Searchbar'
import { SelectNode } from './SelectNode'
import ToggleTheme from './ToggleTheme'
import ViewNotification from './ViewNotification'

export default function Navigation() {
  const { asPath } = useRouter()
  const [navigation, setNavigation] = useState([
    { name: 'Interact', href: '/interact', current: false },
    { name: 'Blocks', href: '/blocks', current: false },
    { name: 'Functions', href: '/functions', current: false },
  ])

  useEffect(() => {
    setNavigation((prev) => {
      return [...prev].map((nav) => {
        nav.current = nav.href === asPath
        return nav
      })
    })
  }, [asPath])

  return (
    <Disclosure as="nav" className="bg-gray-50 sticky top-0 shadow z-10">
      {({ open }) => (
        <>
          <div className="max-w-7xl m-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex-shrink-0 flex items-center">
                  <Link href="/">
                    <a>
                      <img
                        className="block h-8 w-auto"
                        src="kindelia_icon.svg"
                        alt="Workflow"
                      />
                    </a>
                  </Link>
                </div>
                <div className="hidden sm:block sm:ml-6">
                  <div className="flex space-x-2">
                    {navigation.map((item) => (
                      <Link key={item.name} href={item.href}>
                        <a
                          className={classNames(
                            item.current
                              ? 'border-2 border-gray-300'
                              : 'border-2 border-transparent hover:bg-gray-700 hover:text-white',
                            'px-3 py-2 rounded-md font-medium'
                          )}
                          aria-current={item.current ? 'page' : undefined}
                        >
                          {item.name}
                        </a>
                      </Link>
                    ))}
                    <SelectNode />
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex flex-1 justify-end items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <Searchbar className="hidden sm:block rounded-md  mr-3 bg-gray-000 flex-1 max-w-xs" />
                <ToggleTheme />

                <ViewNotification />
                <ProfileDropdown />
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Link key={item.name} href={item.href}>
                  <Disclosure.Button
                    as="a"
                    className={classNames(
                      item.current
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'block px-3 py-2 rounded-md text-base font-medium'
                    )}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                </Link>
              ))}
              <Searchbar className="rounded bg-gray-700 text-white placeholder:text-gray-400 block w-full" />
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}