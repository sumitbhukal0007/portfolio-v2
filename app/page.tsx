import Hero from "@/components/hero"
import About from "@/components/about"
import Experience from "@/components/experience"
import Projects from "@/components/projects"
import Skills from "@/components/skills"
import Contact from "@/components/contact"
import Navigation from "@/components/navigation"

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-ink">
      <a href="#main-content" className="sr-only fixed left-4 top-4 z-[60] rounded-lg bg-ink px-4 py-3 text-background focus:not-sr-only focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
        Skip to content
      </a>
      <Navigation />
      <main id="main-content">
        <Hero />
        <Projects />
        <Experience />
        <Skills />
        <About />
        <Contact />
      </main>
    </div>
  )
}
