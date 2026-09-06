import { useState } from 'react'
import { FiCheck, FiCopy, FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'
import { site } from '../data/site'

export default function Contact() {
  const [copied, setCopied] = useState(false)

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(site.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard unavailable — the address is on screen to copy by hand.
    }
  }

  return (
    <section id="contact" className="scroll-mt-4 px-6 py-8 sm:px-10">
      <h2 className="section-title">Contact</h2>

      <div className="mt-4 rounded-breeze border border-edge bg-view p-5">
        <p className="max-w-2xl leading-relaxed">
          Hit me up to chat about anything software or hardware related.
          I love learning about things and talking to people who know about them.
        </p>

        <div className="mt-4 flex items-center gap-2 rounded-breeze border border-edge bg-surface px-3 py-2 font-mono text-sm">
          <FiMail className="h-4 w-4 shrink-0 text-accent" />
          <span className="truncate">{site.email}</span>
          <button
            type="button"
            onClick={copyEmail}
            aria-label="Copy email address"
            className="ml-auto shrink-0 rounded-breeze p-1.5 text-dim transition-colors hover:bg-accent hover:text-white"
          >
            {copied ? <FiCheck className="h-4 w-4" /> : <FiCopy className="h-4 w-4" />}
          </button>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <a href={`mailto:${site.email}`} className="breeze-button-primary">
            <FiMail className="h-4 w-4" />
            Send an email
          </a>
          <a href={site.github} target="_blank" rel="noreferrer" className="breeze-button">
            <FiGithub className="h-4 w-4" />
            GitHub
          </a>
          <a href={site.linkedin} target="_blank" rel="noreferrer" className="breeze-button">
            <FiLinkedin className="h-4 w-4" />
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  )
}
