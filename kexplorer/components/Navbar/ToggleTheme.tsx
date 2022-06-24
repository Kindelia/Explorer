import { classNames } from '@kindelia/lib/react/classNames'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export default function ToggleTheme() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => setMounted(true), [])

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <div className="self-center flex pr-2">
      <button id="toggleTheme" onClick={toggleTheme}>
        <label htmlFor="toggleTheme" className="cursor-pointer">
          {mounted && (
            <div className="w-9 h-5 flex items-center bg-gray-300 rounded-full relative">
              <div
                className={classNames(
                  'w-4 h-4 bg-white rounded-full shadow absolute transition-all',
                  theme === 'light' ? 'right-5' : 'right-0'
                )}
              />
            </div>
          )}
        </label>
      </button>
    </div>
  )
}
