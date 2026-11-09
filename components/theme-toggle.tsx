"use client"

import { Monitor, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useSyncExternalStore } from "react"

const themes = [
  { value: "system", label: "System", Icon: Monitor },
  { value: "light", label: "Light", Icon: Sun },
  { value: "dark", label: "Dark", Icon: Moon },
] as const

const subscribe = () => () => {}

/** Cycles System → Light → Dark. The stored preference is only known after hydration. */
export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const mounted = useSyncExternalStore(subscribe, () => true, () => false)
  const index = mounted ? Math.max(0, themes.findIndex((option) => option.value === theme)) : 0
  const current = themes[index]
  const next = themes[(index + 1) % themes.length]
  const label = mounted ? `Theme: ${current.label}. Switch to ${next.label}.` : "Change color theme"

  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      data-theme-choice={mounted ? current.value : undefined}
      onClick={() => setTheme(next.value)}
      className="inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-border bg-surface text-ink transition-colors hover:border-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      <current.Icon aria-hidden="true" className="size-[18px]" />
    </button>
  )
}
