import { experience, sectionNumbers } from "@/data/portfolio"
import { SectionHeading } from "@/components/section-heading"

export default function Experience() {
  if (!experience.length) return null

  return (
    <section id="experience" aria-labelledby="experience-title" className="scroll-mt-24 px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <SectionHeading id="experience-title" eyebrow="Experience" title="Experience across the stack." number={sectionNumbers.experience} file="experience.ts" />
        <ol className="space-y-16">
          {experience.map((item) => (
            <li key={item.role} className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)] lg:gap-16">
              <div className="lg:sticky lg:top-28 lg:self-start">
                {item.current ? (
                  <p className="mb-4 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                    <span aria-hidden="true" className="size-1.5 rounded-full bg-secondary" />
                    Current role
                  </p>
                ) : null}
                <h3 className="text-balance font-display text-2xl font-semibold leading-tight tracking-[-0.02em] sm:text-3xl">{item.role}</h3>
                {item.startDate || item.endDate ? (
                  <p className="mt-3 font-mono text-xs text-muted">
                    {item.startDate ? <time dateTime={item.startDate}>{item.startDate}</time> : null}
                    {item.startDate && item.endDate ? " — " : null}
                    {item.endDate ? <time dateTime={item.endDate}>{item.endDate}</time> : null}
                  </p>
                ) : null}
                {item.summary ? <p className="mt-5 max-w-md text-base leading-7 text-muted sm:text-lg sm:leading-8">{item.summary}</p> : null}
              </div>
              <div className="border-t border-border">
                {item.responsibilityGroups.map((group, index) => (
                  <section key={group.title} aria-labelledby={`experience-group-${index}`} className="grid gap-3 border-b border-border py-6 sm:grid-cols-[minmax(0,13rem)_minmax(0,1fr)] sm:gap-8">
                    <h4 id={`experience-group-${index}`} className="flex gap-3 text-sm font-medium text-ink">
                      <span aria-hidden="true" className="font-mono text-xs leading-5 text-accent-ink">{String(index + 1).padStart(2, "0")}</span>
                      {group.title}
                    </h4>
                    <ul className="space-y-2 text-[15px] leading-6 text-muted">
                      {group.items.map((responsibility) => <li key={responsibility}>{responsibility}</li>)}
                    </ul>
                  </section>
                ))}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
