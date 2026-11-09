import { ArrowUpRight, Mail } from "lucide-react"
import { SectionHeading } from "@/components/section-heading"
import { contact, hasContactMethod, profile, sectionNumbers, socialLinks, skills } from "@/data/portfolio"

export default function Contact() {
  return (
    <>
      {hasContactMethod ? <section id="contact" aria-labelledby="contact-title" className="scroll-mt-24 border-t border-border px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <SectionHeading id="contact-title" eyebrow="Contact" title="Get in touch." number={sectionNumbers.contact} file="contact.ts" />
          {contact.email ? (
            <a
              href={`mailto:${contact.email}`}
              className="group grid grid-cols-[auto_minmax(0,1fr)] items-center gap-x-6 gap-y-5 rounded-3xl border border-border bg-surface p-6 transition-colors hover:border-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:grid-cols-[auto_minmax(0,1fr)_auto] sm:p-8"
            >
              <span aria-hidden="true" className="col-start-1 row-start-1 flex size-12 items-center justify-center rounded-2xl bg-accent/10 text-accent-ink"><Mail className="size-5" /></span>
              <span className="col-span-2 min-w-0 sm:col-span-1 sm:col-start-2 sm:row-start-1">
                <span className="block font-mono text-[11px] uppercase tracking-[0.14em] text-muted">Email</span>
                <span className="mt-1 block break-all font-display text-xl font-semibold tracking-[-0.02em] sm:text-2xl">{contact.email}</span>
              </span>
              <span aria-hidden="true" className="col-start-2 row-start-1 inline-flex size-11 items-center justify-center justify-self-end rounded-full border border-border bg-background text-ink transition-colors group-hover:border-accent group-hover:text-accent-ink sm:col-start-3">
                <ArrowUpRight className="size-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transform-none" />
              </span>
            </a>
          ) : null}
          {socialLinks.length ? (
            <ul className="mt-6 flex flex-wrap gap-3">
              {socialLinks.map((link) => <li key={link.label}><a href={link.href} className="inline-flex min-h-10 items-center rounded-full px-3 text-sm text-muted underline-offset-4 hover:text-ink hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">{link.label}</a></li>)}
            </ul>
          ) : null}
        </div>
      </section> : null}
      <footer className="border-t border-border px-5 py-7 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {profile.name}</p>
          <p className="font-mono">Built with {skills.map((technology) => technology.name).join(" · ")}</p>
        </div>
      </footer>
    </>
  )
}
