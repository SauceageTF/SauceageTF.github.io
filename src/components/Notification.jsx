import { useEffect, useRef, useState } from 'react'
import { FiX } from 'react-icons/fi'

export default function Notification({ title, body, onClose, duration = 6000, className = '' }) {
  const [leaving, setLeaving] = useState(false)
  const [paused, setPaused] = useState(false)

  // Kept in a ref so a new inline onClose from the parent doesn't restart the timer.
  const closeRef = useRef(onClose)
  useEffect(() => {
    closeRef.current = onClose
  })

  useEffect(() => {
    if (paused) return undefined

    const fadeAt = setTimeout(() => setLeaving(true), duration)
    // Safety net: the fade normally closes itself on transitionend, but that
    // never arrives if the tab is throttled hard enough to skip the transition.
    const closeAt = setTimeout(() => closeRef.current(), duration + 1500)
    return () => {
      clearTimeout(fadeAt)
      clearTimeout(closeAt)
    }
  }, [duration, paused])

  return (
    <div
      role="status"
      onMouseEnter={() => {
        setPaused(true)
        setLeaving(false)
      }}
      onMouseLeave={() => setPaused(false)}
      onTransitionEnd={(e) => {
        if (e.propertyName === 'opacity' && leaving) onClose()
      }}
      className={`w-80 max-w-[calc(100vw-2rem)] animate-riseIn rounded-breeze border border-edge bg-surface shadow-2xl transition-opacity duration-300 ${
        leaving ? 'opacity-0' : 'opacity-100'
      } ${className}`}
    >
      <div className="flex items-center justify-between gap-3 border-b border-edge px-3 py-2">
        <span className="truncate text-xs font-semibold">{title}</span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Dismiss notification"
          className="rounded-breeze p-1 text-dim transition-colors hover:bg-danger hover:text-white"
        >
          <FiX className="h-3.5 w-3.5" />
        </button>
      </div>
      <p className="px-3 py-3 text-sm leading-relaxed text-dim">{body}</p>
    </div>
  )
}
