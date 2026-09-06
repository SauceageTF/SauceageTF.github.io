import { useEffect, useRef, useState } from 'react'
import { FiSearch, FiVolume2, FiVolumeX } from 'react-icons/fi'
import ThemeToggle from './ThemeToggle'
import TASKS from '../data/sections'

function Clock() {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="hidden text-right leading-tight sm:block">
      <div className="font-mono text-xs tabular-nums">
        {now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </div>
      <div className="text-[0.625rem] text-dim">
        {now.toLocaleDateString([], { day: 'numeric', month: 'short' })}
      </div>
    </div>
  )
}

export default function Navbar({ theme, onToggleTheme, muted, onToggleMuted, onOpenRunner }) {
  const [launcherOpen, setLauncherOpen] = useState(false)
  const [active, setActive] = useState('#about')

  // A clicked task owns the highlight until the reader scrolls for themselves.
  // The last sections share the page's final scroll position, so position alone
  // can't tell "jumped to Experience" from "jumped to Contact".
  const pinned = useRef(null)

  function selectTask(href) {
    pinned.current = href
    setActive(href)
  }

  useEffect(() => {
    const sections = TASKS.map((task) => document.querySelector(task.href)).filter(Boolean)

    if (sections.length === 0) return undefined

    function update() {
      if (pinned.current) return

      // The last section is usually too short to reach the line, so the bottom
      // of the page belongs to it.
      const scrolledToBottom =
        window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2

      if (scrolledToBottom) {
        setActive(`#${sections[sections.length - 1].id}`)
        return
      }

      const line = window.innerHeight * 0.35
      let current = sections[0]
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= line) current = section
      }
      setActive(`#${current.id}`)
    }

    function release() {
      pinned.current = null
    }

    // KRunner jumps should own the highlight the same way a click does.
    function onRunnerNavigate(e) {
      pinned.current = e.detail
      setActive(e.detail)
    }
    window.addEventListener('runner:navigate', onRunnerNavigate)

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    window.addEventListener('wheel', release, { passive: true })
    window.addEventListener('touchstart', release, { passive: true })
    window.addEventListener('keydown', release)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
      window.removeEventListener('wheel', release)
      window.removeEventListener('touchstart', release)
      window.removeEventListener('keydown', release)
      window.removeEventListener('runner:navigate', onRunnerNavigate)
    }
  }, [])

  return (
    <>
      {launcherOpen && (
        <>
          <button
            type="button"
            aria-label="Close launcher"
            onClick={() => setLauncherOpen(false)}
            className="fixed inset-0 z-40 cursor-default"
          />
          <div className="fixed bottom-14 left-2 z-50 w-56 animate-fadeIn rounded-breeze border border-edge bg-surface p-1.5 shadow-2xl">
            {TASKS.map((task) => {
              const Icon = task.icon
              return (
                <a
                  key={task.href}
                  href={task.href}
                  onClick={() => {
                    setLauncherOpen(false)
                    selectTask(task.href)
                  }}
                  className="flex items-center gap-3 rounded-breeze px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-white"
                >
                  <Icon className="h-4 w-4" />
                  {task.label}
                </a>
              )
            })}
          </div>
        </>
      )}

      <header className="fixed inset-x-0 bottom-0 z-50 border-t border-edge bg-surface/95 backdrop-blur">
        <nav className="flex items-center gap-2 px-2 py-1.5">
          <button
            type="button"
            aria-label="Open launcher"
            aria-expanded={launcherOpen}
            onClick={() => setLauncherOpen((prev) => !prev)}
            className="grid h-8 w-8 shrink-0 place-items-center rounded-breeze bg-accent text-sm font-bold text-white transition-opacity hover:opacity-90"
          >
            R
          </button>

          <div className="mx-1 hidden h-6 w-px shrink-0 bg-edge sm:block" />

          <div className="hidden flex-1 items-center gap-1 sm:flex">
            {TASKS.map((task) => {
              const Icon = task.icon
              const isActive = active === task.href
              return (
                <a
                  key={task.href}
                  href={task.href}
                  onClick={() => selectTask(task.href)}
                  aria-current={isActive ? 'true' : undefined}
                  className={`flex items-center gap-2 rounded-breeze border-b-2 px-3 py-1.5 text-sm transition-colors ${
                    isActive
                      ? 'border-accent bg-accent/15 text-fg'
                      : 'border-transparent text-dim hover:bg-fg/5 hover:text-fg'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {task.label}
                </a>
              )
            })}
          </div>

          <span className="flex-1 truncate px-2 text-sm text-dim sm:hidden">
            Rohith Vidyasakar
          </span>

          <div className="flex shrink-0 items-center gap-3 pr-1">
            <button
              type="button"
              onClick={onOpenRunner}
              aria-label="Open search"
              title="Search — Alt+Space"
              className="rounded-breeze p-1.5 text-dim transition-colors hover:bg-fg/10 hover:text-fg"
            >
              <FiSearch className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={onToggleMuted}
              aria-label={muted ? 'Unmute startup sound' : 'Mute startup sound'}
              aria-pressed={!muted}
              title={muted ? 'Sound muted' : 'Sound on'}
              className="rounded-breeze p-1.5 text-dim transition-colors hover:bg-fg/10 hover:text-fg"
            >
              {muted ? <FiVolumeX className="h-4 w-4" /> : <FiVolume2 className="h-4 w-4" />}
            </button>
            <ThemeToggle theme={theme} onToggle={onToggleTheme} />
            <Clock />
          </div>
        </nav>
      </header>
    </>
  )
}
