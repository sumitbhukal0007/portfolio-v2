import { SectionHeading } from "@/components/section-heading"
import { sectionNumbers, skills } from "@/data/portfolio"

export default function Skills() {
  if (!skills.length) return null

  return (
    <section id="stack" aria-labelledby="stack-title" className="scroll-mt-24 border-y border-border bg-surface/60 px-5 py-20 sm:px-8 sm:py-24 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <SectionHeading id="stack-title" eyebrow="Technology" title="Built with a focused stack." description="The technologies used to design and build this portfolio." number={sectionNumbers.stack} file="stack.json" />
        <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {skills.map((technology) => (
            <li key={technology.name} className="flex min-h-32 flex-col justify-between gap-6 rounded-2xl border border-border bg-background p-5 sm:min-h-36 sm:p-6">
              <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">{technology.role}</span>
              <span className="font-display text-xl font-semibold tracking-[-0.02em] sm:text-2xl">{technology.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
