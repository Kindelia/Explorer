import { useState } from 'react'
import styles from './Navbar.module.css'
import { classNames } from '@kindelia/lib/react/classNames'

export default function Searchbar(props: { className: any }) {
  const [search, setSearch] = useState('')
  return (
    <input
      onChange={(e) => setSearch(e.currentTarget.value)}
      value={search}
      placeholder="🔎 Search"
      className={classNames(
        'bg-searchbar-light placeholder:text-fontPlaceHolder-light px-3 py-2',
        'dark:bg-searchbar-dark dark:placeholder:text-fontPlaceHolder-dark',
        props.className
      )}
    />
  )
}
