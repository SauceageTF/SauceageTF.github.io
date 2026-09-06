import { FiExternalLink, FiGithub } from 'react-icons/fi'
import projects from '../data/projects'

export default function Projects() {
  return (
    <section id="work" className="scroll-mt-4 border-b border-edge px-6 py-8 sm:px-10">
      <h2 className="section-title">Work</h2>

      <div className="mt-4 divide-y divide-edge overflow-hidden rounded-breeze border border-edge">
        {projects.map((project) => (
          <article
            key={project.title}
            className="group bg-view p-4 transition-colors hover:bg-accent/5"
          >
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span aria-hidden="true" className="text-base">
                {project.emoji}
              </span>
              <h3 className="font-semibold transition-colors group-hover:text-accent">
                {project.title}
              </h3>
              <span className="ml-auto font-mono text-xs text-dim">{project.year}</span>
            </div>

            <p className="mt-2 max-w-2xl leading-relaxed">{project.summary}</p>
            {project.detail && (
              <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-dim">{project.detail}</p>
            )}

            <div className="mt-3 flex flex-wrap items-center gap-2">
              {project.tech.map((tech) => (
                <span key={tech} className="breeze-tag">
                  {tech}
                </span>
              ))}

              <span className="ml-auto flex gap-2">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="breeze-button py-1 text-xs"
                  >
                    <FiExternalLink className="h-3.5 w-3.5" />
                    Live
                  </a>
                )}
                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="breeze-button py-1 text-xs"
                  >
                    <FiGithub className="h-3.5 w-3.5" />
                    Source
                  </a>
                )}
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
