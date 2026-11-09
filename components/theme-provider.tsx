'use client'

import * as React from 'react'
import { useEffect } from 'react'
import {
  ThemeProvider as NextThemesProvider,
  useTheme,
  type ThemeProviderProps,
} from 'next-themes'
import { siteMetadata } from '@/data/portfolio'

function ThemeColorSync() {
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    if (!resolvedTheme) return
    const color = resolvedTheme === 'dark' ? siteMetadata.themeColor.dark : siteMetadata.themeColor.light
    document.querySelectorAll<HTMLMetaElement>('meta[name="theme-color"]').forEach((meta) => {
      meta.content = color
    })
  }, [resolvedTheme])

  return null
}

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider {...props}>
      <ThemeColorSync />
      {children}
    </NextThemesProvider>
  )
}
