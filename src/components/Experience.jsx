import { FiAward, FiBookOpen, FiExternalLink } from 'react-icons/fi'
import { certifications, education, experience } from '../data/site'

export default function Experience() {
  return (
    <section id="experience" className="scroll-mt-4 border-b border-edge px-6 py-8 sm:px-10">
      <h2 className="section-title">Experience</h2>

      <div className="mt-4 space-y-4">
        {experience.map((job) => (
          <div key={job.org} className="rounded-breeze border border-edge bg-view p-4">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h3 className="font-semibold">{job.role}</h3>
              <a
                href={job.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 text-sm text-accent hover:underline"
              >
                {job.org}
                <FiExternalLink className="h-3 w-3" />
              </a>
              <span className="ml-auto font-mono text-xs text-dim">{job.period}</span>
            </div>

            <ul className="mt-3 space-y-1.5">
              {job.points.map((point) => (
                <li key={point} className="flex gap-2 text-sm leading-relaxed text-dim">
                  <span aria-hidden="true" className="text-accent">
                    ▸
                  </span>
                  {point}
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="rounded-breeze border border-edge bg-view p-4">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h3 className="flex items-center gap-2 font-semibold">
              <FiBookOpen className="h-4 w-4 text-accent" />
              {education.school}
            </h3>
            <span className="text-sm text-dim">{education.degree}</span>
            <span className="ml-auto font-mono text-xs text-dim">{education.period}</span>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-dim">{education.detail}</p>
        </div>

        <div className="rounded-breeze border border-edge bg-view p-4">
          <h3 className="flex items-center gap-2 font-semibold">
            <FiAward className="h-4 w-4 text-accent" />
            Certifications
          </h3>

          <ul className="mt-3 space-y-2">
            {certifications.map((cert) => (
              <li key={cert.name} className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                <span className="text-sm">{cert.name}</span>
                <span className="text-sm text-dim">— {cert.issuer}</span>
                <span className="ml-auto font-mono text-xs text-dim">{cert.year}</span>
                <p className="w-full text-sm leading-relaxed text-dim">{cert.detail}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
