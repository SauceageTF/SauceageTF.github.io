import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Runner from './components/Runner'
import DesktopWindow from './components/DesktopWindow'
import Hero from './components/Hero'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Contact from './components/Contact'
import Footer from './components/Footer'
import useTheme from './hooks/useTheme'
import useStartupSound from './hooks/useStartupSound'
import wallpaper from './assets/wallpaper.jpg'

function App() {
  const { theme, toggleTheme } = useTheme()
  const { muted, toggleMuted } = useStartupSound()
  const [runnerOpen, setRunnerOpen] = useState(false)

  // Alt+Space is KRunner's shortcut in Plasma.
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.altKey && e.code === 'Space') {
        e.preventDefault()
        setRunnerOpen((prev) => !prev)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <>
      <div
        aria-hidden="true"
        className="fixed inset-0 -z-10 bg-cover bg-center"
        style={{ backgroundImage: `url(${wallpaper})` }}
      />
      {/* Scrim keeps the Breeze chrome legible over the wallpaper in both themes. */}
      <div aria-hidden="true" className="fixed inset-0 -z-10 bg-desktop/45" />

      <main className="px-3 pb-24 pt-6 sm:px-6 sm:pt-10">
        <DesktopWindow title="Rohith Vidyasakar — Portfolio">
          <Hero />
          <Projects />
          <Skills />
          <Experience />
          <Contact />
          <Footer />
        </DesktopWindow>
      </main>

      <Navbar
        theme={theme}
        onToggleTheme={toggleTheme}
        muted={muted}
        onToggleMuted={toggleMuted}
        onOpenRunner={() => setRunnerOpen(true)}
      />
      {runnerOpen && (
        <Runner
          onClose={() => setRunnerOpen(false)}
          theme={theme}
          onToggleTheme={toggleTheme}
          muted={muted}
          onToggleMuted={toggleMuted}
        />
      )}
    </>
  )
}

export default App
