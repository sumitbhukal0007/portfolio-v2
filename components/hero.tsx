import Link from "next/link"
import { ArrowDownRight, ArrowUpRight } from "lucide-react"
import { profile } from "@/data/portfolio"
import { HeroWorkspace } from "@/components/hero-workspace"

const introductionEmphasis = "web applications"

export default function Hero() {
  const [beforeEmphasis, afterEmphasis] = profile.introduction.split(introductionEmphasis)

  return (
    <section id="home" aria-labelledby="hero-title" className="scroll-mt-24 px-5 pb-20 pt-28 sm:px-8 sm:pt-36 lg:flex lg:min-h-[820px] lg:items-center lg:px-12 lg:pb-24">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] lg:gap-16">
        <div className="max-w-2xl">
          <p className="mb-7 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.13em] text-muted">
            <span aria-hidden="true" className="size-2 rounded-full bg-secondary" />
            {profile.title}
          </p>
          <h1 id="hero-title" className="hero-enter font-display text-[clamp(3.5rem,11vw,8rem)] font-semibold leading-[0.86] tracking-[-0.065em]">
            {profile.name.split(" ").map((part, index) => <span key={`${part}-${index}`} className="block">{part}</span>)}
          </h1>
          <p className="hero-enter hero-enter-copy mt-8 max-w-xl text-pretty text-xl leading-snug tracking-[-0.01em] text-ink sm:text-2xl sm:leading-[1.35]">
            {afterEmphasis === undefined ? profile.introduction : <>{beforeEmphasis}<span className="text-accent-ink">{introductionEmphasis}</span>{afterEmphasis}</>}
          </p>
          <p className="hero-enter hero-enter-copy mt-5 max-w-lg text-[15px] leading-7 text-muted">{profile.supportingDescription}</p>
          <div className="hero-enter hero-enter-actions mt-9 flex flex-wrap items-center gap-3">
            <Link href="#about" className="hero-primary-action group inline-flex min-h-12 items-center gap-3 rounded-full bg-ink px-5 text-sm font-medium text-background transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent motion-reduce:hover:translate-y-0">
              How I approach the work <ArrowDownRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
            </Link>
            <Link href="#experience" className="inline-flex min-h-12 items-center gap-2 rounded-full px-4 text-sm font-medium text-ink transition-colors hover:text-accent-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">
              View experience <ArrowUpRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
        </div>

        <div className="hero-enter hero-enter-workspace w-full min-w-0 lg:max-w-[620px] lg:justify-self-end">
          <HeroWorkspace />
        </div>
      </div>
    </section>
  )
}
