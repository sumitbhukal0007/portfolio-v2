import type React from "react"
import type { Metadata, Viewport } from "next"
import localFont from "next/font/local"
import { ThemeProvider } from "@/components/theme-provider"
import { profile, siteMetadata } from "@/data/portfolio"
import "./globals.css"

const displayFont = localFont({ src: "./fonts/bricolage-grotesque-latin.woff2", variable: "--font-bricolage", display: "swap", weight: "200 800" })
const bodyFont = localFont({ src: "./fonts/ibm-plex-sans-latin.woff2", variable: "--font-plex", display: "swap", weight: "100 700" })
const codeFont = localFont({ src: "./fonts/jetbrains-mono-latin.woff2", variable: "--font-jetbrains", display: "swap", weight: "100 800" })

export const metadata: Metadata = {
  title: {
    default: siteMetadata.title,
    template: `%s — ${profile.name}`,
  },
  description: siteMetadata.description,
  applicationName: `${profile.name} Portfolio`,
  authors: [{ name: profile.name }],
  creator: profile.name,
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    siteName: `${profile.name} Portfolio`,
    type: "website",
    locale: "en",
  },
  twitter: {
    card: "summary",
    title: siteMetadata.title,
    description: siteMetadata.description,
  },
  // Keep indexing disabled until public launch is separately approved.
  robots: { index: false, follow: false },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: siteMetadata.themeColor.light },
    { media: "(prefers-color-scheme: dark)", color: siteMetadata.themeColor.dark },
  ],
  colorScheme: "light dark",
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${displayFont.variable} ${bodyFont.variable} ${codeFont.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
