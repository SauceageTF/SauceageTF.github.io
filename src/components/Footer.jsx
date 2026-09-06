import projects from '../data/projects'
import { site } from '../data/site'

export default function Footer() {
  return (
    <footer className="flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-edge bg-surface px-4 py-2 font-mono text-[0.6875rem] text-dim">
      <span>{projects.length} projects</span>
      <span className="hidden sm:inline">·</span>
      <span className="hidden sm:inline">
        Wallpaper by{' '}
        <a
          href="https://unsplash.com/@pawel_czerwinski"
          target="_blank"
          rel="noreferrer"
          className="text-accent hover:underline"
        >
          Pawel Czerwinski
        </a>{' '}
        on{' '}
        <a
          href="https://unsplash.com/photos/abstract-fluid-art-with-pink-and-teal-colors-M95RTPQCB5A"
          target="_blank"
          rel="noreferrer"
          className="text-accent hover:underline"
        >
          Unsplash
        </a>
      </span>
      <span className="hidden sm:inline">·</span>
      <span className="hidden sm:inline">
        Login sound from{' '}
        <a
          href="https://invent.kde.org/plasma/ocean-sound-theme"
          target="_blank"
          rel="noreferrer"
          className="text-accent hover:underline"
        >
          KDE Ocean
        </a>{' '}
        (CC BY-SA 4.0)
      </span>
      <span className="ml-auto">
        © {new Date().getFullYear()} {site.name}
      </span>
    </footer>
  )
}
