import Link from "next/link"
import { profile, navigationItems } from "@/data/portfolio"
import { NavLinks } from "@/components/nav-links"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Navigation() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-2 pt-3 min-[360px]:px-3 sm:px-6 sm:pt-5">
      <nav aria-label="Main navigation" className="mx-auto flex max-w-7xl items-center justify-between gap-0 rounded-full border border-border/80 bg-surface/90 py-1.5 pl-3 pr-1 shadow-[0_8px_32px_rgba(20,32,43,0.08)] backdrop-blur-xl sm:gap-3 sm:pl-5">
        <Link href="#home" className="inline-flex min-h-10 shrink-0 items-center rounded-full font-display text-sm font-semibold tracking-tight focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:text-base">
          <span className="sm:hidden">{profile.name.split(" ")[0]}</span><span className="hidden sm:inline">{profile.name}</span><span className="ml-2 hidden font-mono text-[10px] font-normal uppercase tracking-[0.12em] text-muted md:inline">/ portfolio</span>
        </Link>
        <NavLinks items={navigationItems} />
        <ThemeToggle />
      </nav>
    </header>
  )
}
