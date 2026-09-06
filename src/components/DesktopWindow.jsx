import { useState } from 'react'
import { FiMaximize2, FiMinus, FiX } from 'react-icons/fi'
import Notification from './Notification'

const NOTICES = {
  minimize: {
    title: 'Window manager',
    body: "Minimising this would defeat the point. Consider it politely declined.",
  },
  close: {
    title: 'Window manager',
    body: 'Nice try. This window is load-bearing — the whole portfolio is inside it.',
  },
}

export default function DesktopWindow({ title, children }) {
  const [maximized, setMaximized] = useState(false)
  const [notice, setNotice] = useState(null)

  return (
    <>
      <div
        className={`mx-auto overflow-hidden rounded-lg border border-edge bg-view shadow-2xl ${
          maximized ? 'max-w-[100rem]' : 'max-w-4xl'
        }`}
      >
        <div className="flex items-center gap-3 border-b border-edge bg-surface px-3 py-2">
          <span
            aria-hidden="true"
            className="grid h-5 w-5 shrink-0 place-items-center rounded-breeze bg-accent text-[0.65rem] font-bold text-white"
          >
            R
          </span>

          <span className="flex-1 truncate text-center text-xs font-semibold text-dim">
            {title}
          </span>

          <div className="flex shrink-0 items-center gap-1">
            <button
              type="button"
              aria-label="Minimise"
              onClick={() => setNotice(NOTICES.minimize)}
              className="rounded-full p-1.5 text-dim transition-colors hover:bg-edge hover:text-fg"
            >
              <FiMinus className="h-3 w-3" />
            </button>
            <button
              type="button"
              aria-label={maximized ? 'Restore' : 'Maximise'}
              aria-pressed={maximized}
              onClick={() => setMaximized((prev) => !prev)}
              className="rounded-full p-1.5 text-dim transition-colors hover:bg-edge hover:text-fg"
            >
              <FiMaximize2 className="h-3 w-3" />
            </button>
            <button
              type="button"
              aria-label="Close"
              onClick={() => setNotice(NOTICES.close)}
              className="rounded-full p-1.5 text-dim transition-colors hover:bg-danger hover:text-white"
            >
              <FiX className="h-3 w-3" />
            </button>
          </div>
        </div>

        {children}
      </div>

      {notice && (
        <div className="fixed bottom-20 right-4 z-40">
          <Notification title={notice.title} body={notice.body} onClose={() => setNotice(null)} />
        </div>
      )}
    </>
  )
}
