import { useCallback, useEffect, useState } from 'react'

export default function useTheme() {
  // Breeze Dark is the default; only an explicit "light" choice opts out.
  const [theme, setTheme] = useState(() =>
    localStorage.getItem('theme') === 'light' ? 'light' : 'dark',
  )

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }, [])

  return { theme, toggleTheme }
}
