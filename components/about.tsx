import { about, aboutFacts, sectionNumbers } from "@/data/portfolio"
import { SectionHeading } from "@/components/section-heading"

export default function About() {
  const [lead, ...paragraphs] = about

  return (
    <section id="about" aria-labelledby="about-title" className="scroll-mt-24 px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <SectionHeading id="about-title" eyebrow="About" title="A practical, thoughtful approach." number={sectionNumbers.about} file="about.ts" />
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,0.85fr)] lg:gap-16">
          <div className="max-w-[65ch] space-y-5 text-base leading-7 text-muted sm:text-lg sm:leading-8">
            <p className="text-xl leading-8 text-ink sm:text-2xl sm:leading-9">{lead}</p>
            {paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
          {aboutFacts.length ? (
            <dl className="self-start rounded-3xl border border-border bg-surface p-6 sm:p-7">
              {aboutFacts.map((fact) => (
                <div key={fact.label} className="border-b border-dashed border-border py-4 first:pt-0 last:border-0 last:pb-0">
                  <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">{fact.label}</dt>
                  <dd className="mt-1.5 text-[15px] font-medium leading-6 text-ink">{fact.value}</dd>
                </div>
              ))}
            </dl>
          ) : null}
        </div>
      </div>
    </section>
  )
}
