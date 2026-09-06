import skillGroups from '../data/skills'

export default function Skills() {
  return (
    <section id="skills" className="scroll-mt-4 border-b border-edge px-6 py-8 sm:px-10">
      <h2 className="section-title">Skills &amp; tools</h2>

      <dl className="mt-4 space-y-4">
        {skillGroups.map((group) => (
          <div key={group.category} className="sm:grid sm:grid-cols-[11rem_1fr] sm:gap-4">
            <dt className="text-sm text-dim">{group.category}</dt>
            <dd className="mt-2 flex flex-wrap gap-1.5 sm:mt-0">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="rounded-breeze border border-edge bg-surface px-2 py-1 text-xs transition-colors hover:border-accent hover:text-accent"
                >
                  {item}
                </span>
              ))}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
