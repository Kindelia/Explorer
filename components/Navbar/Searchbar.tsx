import { useEffect, useState } from 'react'

export default function Searchbar(props: { className: any }) {
  const [search, setSearch] = useState('')
  return (
    <input
      onChange={(e) => setSearch(e.currentTarget.value)}
      value={search}
      placeholder="🔎 Search"
      className={`px-3 py-2 ${props.className}`}
    />
  )
}
