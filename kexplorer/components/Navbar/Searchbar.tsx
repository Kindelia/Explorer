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
      className={classNames(styles.searchbar_common, props.className)}
    />
  )
}
