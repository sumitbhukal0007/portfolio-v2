export type Project = {
  name: string
  shortDescription?: string
  detailedDescription?: string
  technologies?: string[]
  image?: string
  screenshots?: string[]
  githubUrl?: string
  liveDemoUrl?: string
  type?: "Personal" | "Open source"
  technicalDecisions?: string[]
  challengesAndSolutions?: Array<{ challenge: string; solution: string }>
  verifiedOutcomes?: string[]
}

type ExperienceEntry = {
  role: string
  current?: boolean
  summary?: string
  startDate?: string
  endDate?: string
  responsibilityGroups: Array<{ title: string; items: string[] }>
}

export const profile = {
  name: "Sumit Bhukal",
  title: "Full-Stack Developer",
  introduction:
    "I build web applications with a focus on clean architecture, practical engineering and thoughtful user experiences.",
  supportingDescription:
    "I enjoy working across the stack, from building responsive interfaces to designing APIs and backend systems. I'm particularly interested in understanding how software works beneath the surface and making technical decisions that lead to maintainable, reliable applications.",
}

export const about = [
  "I'm a full-stack developer interested in building useful, maintainable web applications.",
  "I enjoy working across frontend and backend development, understanding how different parts of an application fit together, and making thoughtful technical decisions.",
  "My approach is to prioritize clarity, maintainability and practical solutions over unnecessary complexity. I also enjoy exploring new technologies and improving my understanding of software architecture and system design.",
]

export const experience: ExperienceEntry[] = [
  {
    role: "Full-Stack Developer / Project Associate",
    current: true,
    summary:
      "I work across frontend and backend development, building maintainable web applications and focusing on practical engineering decisions.",
    // Groups reorganize the approved responsibilities only; do not add new items without verification.
    responsibilityGroups: [
      {
        title: "Frontend development",
        items: [
          "Frontend application development.",
          "Responsive and maintainable user interfaces.",
          "Authentication and application state management.",
        ],
      },
      {
        title: "Backend and API integration",
        items: [
          "Backend API development and integration.",
          "Integration of external services and APIs.",
        ],
      },
      {
        title: "Application engineering and maintenance",
        items: [
          "Containerized development and deployment workflows.",
          "Debugging, performance improvements and code maintenance.",
        ],
      },
    ],
  },
]

// Only technologies verified in this portfolio implementation are displayed.
// Add professional technologies after their use in actual development is confirmed.
// `role` describes what the technology is, not a proficiency level.
export const skills: Array<{ name: string; role: string }> = [
  { name: "React", role: "UI library" },
  { name: "Next.js", role: "Framework" },
  { name: "TypeScript", role: "Language" },
  { name: "Tailwind CSS", role: "Styling" },
]

// Key facts shown beside the About copy. Every value is drawn from approved profile copy.
export const aboutFacts: Array<{ label: string; value: string }> = [
  { label: "Role", value: "Full-Stack Developer" },
  { label: "Works across", value: "Frontend, backend and APIs" },
  { label: "Focus", value: "Clean architecture and practical engineering" },
  { label: "Approach", value: "Clarity over unnecessary complexity" },
]

// Add independently developed projects only after details and publication rights are verified.
export const projects: Project[] = []

// No public email is shown. A contact form is planned; until a contact method exists, the
// Contact section and its navigation link stay hidden.
export const contact: { email?: string } = {}

export const socialLinks: Array<{ label: string; href: string }> = []

export const hasContactMethod = Boolean(contact.email) || socialLinks.length > 0

export const education: Array<{
  institution?: string
  qualification?: string
  startDate?: string
  endDate?: string
}> = []

export const siteMetadata = {
  title: `${profile.name} — ${profile.title}`,
  description: profile.introduction,
  themeColor: { light: "#EDF0F3", dark: "#080808" },
}

export const navigationItems = [
  ...(projects.length ? [{ label: "Work", href: "#work" }] : []),
  { label: "Experience", href: "#experience" },
  { label: "Stack", href: "#stack" },
  { label: "About", href: "#about" },
  ...(hasContactMethod ? [{ label: "Contact", href: "#contact" }] : []),
]

export const sectionNumbers = {
  experience: projects.length ? "02" : "01",
  stack: projects.length ? "03" : "02",
  about: projects.length ? "04" : "03",
  contact: projects.length ? "05" : "04",
}
