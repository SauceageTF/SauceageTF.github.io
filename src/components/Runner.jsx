import { useEffect, useMemo, useRef, useState } from 'react'
import {
  FiExternalLink,
  FiGithub,
  FiHash,
  FiLinkedin,
  FiMail,
  FiMoon,
  FiSearch,
  FiSun,
  FiVolume2,
  FiVolumeX,
} from 'react-icons/fi'
import sections from '../data/sections'
import projects from '../data/projects'
import { site } from '../data/site'

// KRunner does arithmetic, so this does too. The whitelist below is what keeps
// it safe: only digits, operators, parens and dots ever reach the evaluator.
function calculate(input) {
  const expr = input.trim()
  if (!expr || !/[+\-*/%]/.test(expr)) return null
  if (!/^[\d\s+\-*/%.()]+$/.test(expr)) return null

  try {
    // eslint-disable-next-line no-new-func
    const value = Function(`"use strict"; return (${expr});`)()
    if (typeof value !== 'number' || !Number.isFinite(value)) return null
    return Math.round(value * 1e6) / 1e6
  } catch {
    return null
  }
}

function goToSection(href) {
  // Tell the panel a task was chosen so its highlight matches the jump.
  window.dispatchEvent(new CustomEvent('runner:navigate', { detail: href }))
  // No explicit behavior: the stylesheet decides, so prefers-reduced-motion wins.
  document.querySelector(href)?.scrollIntoView({ block: 'start' })
}

export default function Runner({ onClose, theme, onToggleTheme, muted, onToggleMuted }) {
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(0)
  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    const items = []

    const sum = calculate(query)
    if (sum !== null) {
      items.push({
        id: 'calc',
        icon: FiHash,
        title: `= ${sum}`,
        subtitle: 'Copy result',
        run: () => navigator.clipboard?.writeText(String(sum)).catch(() => {}),
      })
    }

    const matches = (text) => !q || text.toLowerCase().includes(q)

    sections.forEach((section) => {
      if (matches(section.label)) {
        items.push({
          id: section.href,
          icon: section.icon,
          title: section.label,
          subtitle: 'Jump to section',
          run: () => goToSection(section.href),
        })
      }
    })

    projects.forEach((project) => {
      const url = project.liveUrl || project.repoUrl
      if (url && (matches(project.title) || project.tech.some(matches))) {
        items.push({
          id: project.repoUrl || project.title,
          icon: FiExternalLink,
          title: project.title,
          subtitle: project.liveUrl ? 'Open live site' : 'Open source',
          run: () => window.open(url, '_blank', 'noopener'),
        })
      }
    })

    const actions = [
      {
        id: 'theme',
        icon: theme === 'dark' ? FiSun : FiMoon,
        title: theme === 'dark' ? 'Switch to Breeze' : 'Switch to Breeze Dark',
        subtitle: 'Appearance',
        keywords: 'theme dark light breeze appearance',
        run: onToggleTheme,
      },
      {
        id: 'sound',
        icon: muted ? FiVolume2 : FiVolumeX,
        title: muted ? 'Unmute startup sound' : 'Mute startup sound',
        subtitle: 'Audio',
        keywords: 'sound audio mute volume',
        run: onToggleMuted,
      },
      {
        id: 'email',
        icon: FiMail,
        title: 'Email Rohith',
        subtitle: site.email,
        keywords: 'email mail contact hire',
        run: () => window.location.assign(`mailto:${site.email}`),
      },
      {
        id: 'github',
        icon: FiGithub,
        title: 'GitHub',
        subtitle: 'SauceageTF',
        keywords: 'github code repo source',
        run: () => window.open(site.github, '_blank', 'noopener'),
      },
      {
        id: 'linkedin',
        icon: FiLinkedin,
        title: 'LinkedIn',
        subtitle: 'rohithvidyasakar',
        keywords: 'linkedin work profile',
        run: () => window.open(site.linkedin, '_blank', 'noopener'),
      },
    ]

    actions.forEach((action) => {
      if (matches(action.title) || matches(action.keywords)) items.push(action)
    })

    return items.slice(0, 7)
  }, [query, theme, muted, onToggleTheme, onToggleMuted])

  // Clamp during render so a shrinking result list can't strand the selection.
  const activeIndex = results.length ? Math.min(selected, results.length - 1) : 0

  function runSelected(index) {
    const item = results[index]
    onClose()
    item?.run?.()
  }

  function handleKeyDown(e) {
    if (e.key === 'Escape') {
      onClose()
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (results.length) setSelected((activeIndex + 1) % results.length)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (results.length) setSelected((activeIndex - 1 + results.length) % results.length)
    } else if (e.key === 'Enter') {
      e.preventDefault()
      runSelected(activeIndex)
    }
  }

  return (
    <div className="fixed inset-0 z-[60] flex justify-center px-4 pt-[12vh]">
      <button
        type="button"
        aria-label="Close search"
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-desktop/40"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Search"
        onKeyDown={handleKeyDown}
        className="relative h-fit w-full max-w-xl animate-riseIn overflow-hidden rounded-breeze border border-edge bg-surface shadow-2xl"
      >
        <div className="flex items-center gap-3 px-4 py-3">
          <FiSearch className="h-4 w-4 shrink-0 text-dim" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setSelected(0)
            }}
            placeholder="Search sections, projects, or try 6 * 7"
            aria-label="Search this site"
            className="w-full bg-transparent text-sm outline-none placeholder:text-dim"
          />
          <kbd className="hidden shrink-0 rounded-breeze border border-edge px-1.5 py-0.5 font-mono text-[0.625rem] text-dim sm:block">
            Esc
          </kbd>
        </div>

        {results.length > 0 ? (
          <ul role="listbox" aria-label="Results" className="border-t border-edge p-1.5">
            {results.map((item, index) => {
              const Icon = item.icon
              const isSelected = index === activeIndex
              return (
                <li key={item.id} role="option" aria-selected={isSelected}>
                  <button
                    type="button"
                    onClick={() => runSelected(index)}
                    onMouseEnter={() => setSelected(index)}
                    className={`flex w-full items-center gap-3 rounded-breeze px-3 py-2 text-left transition-colors ${
                      isSelected ? 'bg-accent text-white' : 'hover:bg-fg/5'
                    }`}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    <span className="truncate text-sm">{item.title}</span>
                    <span
                      className={`ml-auto truncate text-xs ${isSelected ? 'text-white/70' : 'text-dim'}`}
                    >
                      {item.subtitle}
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>
        ) : (
          <p className="border-t border-edge px-4 py-3 text-sm text-dim">
            No matches. Even KRunner can't find that one.
          </p>
        )}
      </div>
    </div>
  )
}
