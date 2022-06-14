/* This example requires Tailwind CSS v2.0+ */
import { useEffect, useState } from 'react'
import { Disclosure, Menu } from '@headlessui/react'
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { SelectNode } from './SelectNode'
import { classNames } from '@/utils/classnames'
import { DropdownTransition } from './dropdown/DropdownTransition'

export default function Navigation() {
  const { asPath } = useRouter()
  const [navigation, setNavigation] = useState([
    { name: 'Interact', href: '/interact', current: false },
    { name: 'Blocks', href: '/blocks', current: false },
    { name: 'Functions', href: '/functions', current: false },
  ])
  const [search, setSearch] = useState('')

  useEffect(() => {
    setNavigation((prev) => {
      return [...prev].map((nav) => {
        nav.current = nav.href === asPath
        return nav
      })
    })
  }, [asPath])

  return (
    <Disclosure as="nav" className="bg-gray-50 sticky top-0 shadow">
      {({ open }) => (
        <>
          <div className="max-w-7xl m-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
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
                        src="https://kindelia.org/_next/static/media/kindelia_logo.94d30f0d.svg"
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
                <input
                  onChange={(e) => setSearch(e.currentTarget.value)}
                  value={search}
                  placeholder="🔎 Search" // TODO: minimalist icon
                  className="hidden sm:block rounded-md px-3 py-2 mr-3 bg-gray-000 flex-1 max-w-xs"
                />
                <button
                  type="button"
                  className="bg-gray-200 p-1 rounded-full text-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>

                {/* Profile dropdown */}
                <Menu as="div" className="ml-3 relative">
                  <div>
                    <Menu.Button className="w-8 bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src="https://isaojose.com.br/wp-content/uploads/2020/12/blank-profile-picture-mystery-man-avatar-973460.jpg"
                        alt=""
                      />
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
              <input
                onChange={(e) => setSearch(e.currentTarget.value)}
                value={search}
                placeholder="🔎 Search"
                className="rounded bg-gray-700 text-white placeholder:text-gray-400 block w-full py-2 px-3"
              />
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
