"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

type NavLinksProps = { items: Array<{ label: string; href: string }> }

export function NavLinks({ items }: NavLinksProps) {
  const [activeHref, setActiveHref] = useState<string | null>(null)

  useEffect(() => {
    const sections = items
      .map((item) => document.querySelector<HTMLElement>(item.href))
      .filter((section): section is HTMLElement => section !== null)
    const visible = new Set<string>()

    // A section counts as active while it crosses a band just below the floating navigation.
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const href = `#${entry.target.id}`
        if (entry.isIntersecting) visible.add(href)
        else visible.delete(href)
      })
      setActiveHref(items.find((item) => visible.has(item.href))?.href ?? null)
    }, { rootMargin: "-35% 0px -60% 0px" })

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [items])

  return (
    <ul className="flex items-center">
      {items.map((item) => {
        const active = item.href === activeHref
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={active ? "location" : undefined}
              className="relative inline-flex min-h-10 items-center whitespace-nowrap rounded-full px-1.5 text-[11px] text-muted transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-accent aria-[current=location]:bg-background aria-[current=location]:text-ink min-[360px]:px-2.5 min-[360px]:text-xs sm:px-3.5 sm:text-sm"
            >
              {item.label}
              <span aria-hidden="true" className={`absolute bottom-1.5 left-1/2 size-1 -translate-x-1/2 rounded-full bg-accent transition-opacity ${active ? "opacity-100" : "opacity-0"}`} />
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
