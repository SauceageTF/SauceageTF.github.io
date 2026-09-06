import { FiMoon, FiSun } from 'react-icons/fi'

export default function ThemeToggle({ theme, onToggle }) {
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={isDark ? 'Switch to Breeze' : 'Switch to Breeze Dark'}
      aria-pressed={isDark}
      title={isDark ? 'Breeze Dark' : 'Breeze'}
      className="rounded-breeze p-1.5 text-dim transition-colors hover:bg-fg/10 hover:text-fg"
    >
      {isDark ? <FiMoon className="h-4 w-4" /> : <FiSun className="h-4 w-4" />}
    </button>
  )
}
