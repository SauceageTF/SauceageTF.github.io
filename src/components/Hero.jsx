import { FiGithub, FiLinkedin, FiMail, FiMapPin } from 'react-icons/fi'
import { site } from '../data/site'

export default function Hero() {
  return (
    <section id="about" className="scroll-mt-4 border-b border-edge bg-surface px-6 py-10 sm:px-10">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
        <div
          aria-hidden="true"
          className="grid h-20 w-20 shrink-0 place-items-center rounded-lg bg-accent text-3xl font-bold text-white shadow-lg"
        >
          RV
        </div>

        <div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{site.name}</h1>
          <p className="mt-1 text-accent">Guy who loves to build</p>
          <p className="mt-1 flex items-center gap-1.5 text-sm text-dim">
            <FiMapPin className="h-3.5 w-3.5" />
            {site.location}
          </p>
        </div>
      </div>

      <p className="mt-6 max-w-2xl leading-relaxed text-dim">
        Science student at the University of Ottawa. I build across the stack and down to the
        metal — web applications, device drivers, and custom hardware. Most of what I know started
        with taking something apart to see why it worked.
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        <a href={`mailto:${site.email}`} className="breeze-button-primary">
          <FiMail className="h-4 w-4" />
          Get in touch
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
    </section>
  )
}
