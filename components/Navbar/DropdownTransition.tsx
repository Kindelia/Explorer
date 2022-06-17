import { FC, Fragment, ReactNode } from 'react'

import { Transition } from '@headlessui/react'

export const DropdownTransition: FC<{ children: ReactNode }> = ({
  children,
}) => (
  <Transition
    as={Fragment}
    enter="transition ease-out duration-100"
    enterFrom="transform opacity-0 scale-95"
    enterTo="transform opacity-100 scale-100"
    leave="transition ease-in duration-75"
    leaveFrom="transform opacity-100 scale-100"
    leaveTo="transform opacity-0 scale-95"
  >
    {children}
  </Transition>
)
