import { ArrowUpRight } from "lucide-react"
import { SectionHeading } from "@/components/section-heading"
import { projects } from "@/data/portfolio"

export default function Projects() {
  if (!projects.length) return null

  return (
    <section id="work" aria-labelledby="work-title" className="scroll-mt-24 border-y border-border bg-surface/65 px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <SectionHeading id="work-title" eyebrow="Selected work" title="Useful things, thoughtfully made." number="01" file="projects.ts" />
        <div className="grid gap-5 md:grid-cols-2">
          {projects.map((project, index) => (
            <article key={project.name} className="group flex min-h-72 flex-col justify-between rounded-3xl border border-border bg-background p-6 transition-transform hover:-translate-y-1 sm:p-8">
              <div className="flex items-start justify-between gap-4">
                <span className="font-mono text-xs text-muted">{project.type ?? "Independent project"} / 0{index + 1}</span>
                <div className="flex gap-2">
                  {project.githubUrl ? <a href={project.githubUrl} aria-label={`${project.name} source code`} className="rounded-full p-2 text-muted transition-colors hover:bg-surface hover:text-ink focus-visible:outline-2 focus-visible:outline-accent"><ArrowUpRight aria-hidden="true" className="size-5" /></a> : null}
                  {project.liveDemoUrl ? <a href={project.liveDemoUrl} aria-label={`${project.name} live demo`} className="rounded-full p-2 text-muted transition-colors hover:bg-surface hover:text-ink focus-visible:outline-2 focus-visible:outline-accent"><ArrowUpRight aria-hidden="true" className="size-5" /></a> : null}
                </div>
              </div>
              <div>
                <h3 className="font-display text-3xl font-semibold tracking-tight">{project.name}</h3>
                {project.shortDescription ? <p className="mt-3 max-w-lg text-sm leading-6 text-muted">{project.shortDescription}</p> : null}
                {project.technologies?.length ? <ul className="mt-6 flex flex-wrap gap-2">{project.technologies.map((technology) => <li key={technology} className="rounded-full border border-border px-3 py-1 font-mono text-[10px] text-muted">{technology}</li>)}</ul> : null}
              </div>
            </article>
          ))}
        </div>
        <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">Independent work approved for public sharing.</p>
      </div>
    </section>
  )
}
