import { useCallback, useEffect, useRef, useState } from 'react'
import loginSound from '../assets/plasma-login.ogg'

export default function useStartupSound() {
  const [muted, setMuted] = useState(() => localStorage.getItem('sound') === 'off')
  const audioRef = useRef(null)
  const played = useRef(false)

  const play = useCallback(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(loginSound)
      audioRef.current.volume = 0.25
    }
    audioRef.current.currentTime = 0
    return audioRef.current.play()
  }, [])

  useEffect(() => {
    if (muted || played.current) return undefined

    function playOnce() {
      if (played.current) return
      played.current = true
      play().catch(() => {})
    }

    // Browsers refuse audio until the visitor has interacted with the page, so
    // try immediately and otherwise wait for the first gesture.
    play()
      .then(() => {
        played.current = true
      })
      .catch(() => {
        window.addEventListener('pointerdown', playOnce, { once: true })
        window.addEventListener('keydown', playOnce, { once: true })
      })

    return () => {
      window.removeEventListener('pointerdown', playOnce)
      window.removeEventListener('keydown', playOnce)
    }
  }, [muted, play])

  const toggleMuted = useCallback(() => {
    const next = !muted
    localStorage.setItem('sound', next ? 'off' : 'on')
    setMuted(next)

    if (next) {
      audioRef.current?.pause()
    } else {
      // Unmuting is itself a gesture, so this one is allowed to play.
      played.current = true
      play().catch(() => {})
    }
  }, [muted, play])

  return { muted, toggleMuted }
}
