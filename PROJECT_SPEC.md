
# Portfolio V2 — Project Specification

This document records the current project-specific goals, approved direction, constraints, and decisions for Portfolio V2.

It is separate from `AGENTS.md`, which contains stable instructions for AI coding agents.

Treat this as a living specification. Do not silently change material decisions. Propose changes and obtain user approval where indicated.

## 1. Project Goal

Rebuild the existing personal portfolio as a polished, credible, responsive portfolio for a full-stack web developer.

V2 is a redesign, not a requirement to preserve the V1 implementation.

Retain useful configuration and code when it genuinely helps, but do not carry forward outdated UI, placeholder content, abandoned projects, or unnecessary dependencies merely for compatibility.

The portfolio should be distinctive without being over-engineered.

It should be easy to maintain and straightforward to update as projects, skills, and professional information change.

## 2. Visual Direction

The approved direction combines three concepts.

### Editorial Identity

- Oversized name and hero typography.
- Generous whitespace.
- Cool-neutral light surfaces, neutral near-black dark surfaces, and restrained accent colours.
- Terminal/status-panel visual treatment where appropriate.

### Developer Workspace

- Code-editor-style hero element.
- Syntax highlighting.
- Live profile preview.
- Optional replay/typing animation.
- Animation must not delay or hide the actual profile content.

### Bento Layout

- Modular project and content cards.
- Compact floating navigation treatment where it works well.
- Subtle hover and cursor effects, primarily for pointer-based desktop devices.

### Overall Design Principles

- Both light and dark themes, selectable as Light, Dark or System (System follows the operating-system preference). The choice persists in the browser.
- Subtle, purposeful motion.
- Avoid excessive gradients, 3D effects, visual noise, and animation that harms readability or performance.
- Mobile, tablet, laptop, and wide desktop layouts must all be considered.
- Essential functionality must not depend on hover.

## 3. Typography and Initial Colour Tokens

Typography direction:

- Bricolage Grotesque for display typography.
- IBM Plex Sans for body text.
- JetBrains Mono for code-like labels and technical details.

### Light Palette

| Token | Value |
|---|---|
| Background | `#EDF0F3` |
| Surface | `#F8FAFB` |
| Primary text | `#14202B` |
| Muted text | `#5B6874` |
| Border | `#CDD5DC` |
| Accent | `#D9480F` |
| Secondary | `#1C7C74` |

### Dark Palette

| Token | Value |
|---|---|
| Background | `#080808` |
| Surface | `#111111` |
| Raised surface | `#1A1A1A` |
| Elevated surface | `#202020` |
| Primary text | `#F5F5F5` |
| Secondary text | `#A1A1AA` |
| Muted text | `#8C8C8C` (adjusted from `#71717A` for contrast) |
| Border | `#2A2A2A` |
| Accent | `#FF7A45` |
| Secondary | `#4FC1B5` |

These are starting design tokens, not immutable values.

Check contrast and adjust where necessary. Keep theme values centralized, preferably with CSS variables.

## 4. Technology decisions

The following technology direction is approved for Portfolio V2.

| Area | Decision |
|---|---|
| Framework | Next.js App Router 16.4.5 |
| UI library | React 19.3.1 |
| Language | TypeScript 5.x |
| Package manager | Bun 1.4.4 |
| Initial application runtime | Node.js 24.21.0 |
| Styling | Tailwind CSS 4.3.5 (mandatory) |
| Animation | Motion, used selectively |
| Icons | Lucide React |
| Hosting | Evaluate Vercel |
| Backend | Not required for the initial portfolio |
| Database | Not required for the initial portfolio |

### Dependency modernization

- Use mutually compatible stable releases.
- Follow official migration guides.
- Tailwind CSS v4 is a confirmed requirement, not an optional evaluation.
- Check Next.js and React compatibility before selecting versions.
- Avoid blanket dependency upgrades.
- Use one authoritative lockfile (`bun.lock`).

The repository began with a populated `package-lock.json` and an incomplete `pnpm-lock.yaml`. Bun 1.4.4 migrated the npm lockfile into text-based `bun.lock`; all 292 unique package/version pairs matched the npm baseline. A frozen Bun install completed successfully. On 2026-11-07, after re-verifying the Bun package manager and a clean frozen install, the non-authoritative `package-lock.json` and incomplete `pnpm-lock.yaml` were removed; `bun.lock` is the single authoritative lockfile.

`package.json` records `bun@1.4.4` as the package manager and Node.js `24.21.0` as the application runtime. Do not change the application runtime to Bun. The active configuration and versioned lockfile are verified.

Tailwind CSS v4 is mandatory for V2. Inspect the existing CSS, theme configuration, plugins, and browser support before migrating, and use the official upgrade guide: https://tailwindcss.com/docs/upgrade-guide.

## 5. Framework Documentation Policy

The latest applicable official Next.js documentation is the primary authority for Next.js implementation decisions:

https://nextjs.org/docs

Relevant official AI coding agents guide:

https://nextjs.org/docs/app/guides/ai-agents

Use version-matched documentation where possible.

Check documentation bundled with the installed Next.js package (for example, `node_modules/next/dist/docs/`) before relying on general memory or older tutorials.

Use stable, documented APIs.

Follow the App Router conventions supported by the installed version.

Prefer Server Components by default and use Client Components only when client-side behavior requires them.

Google Modern Web Guidance and Vercel Agent Skills may supplement official Next.js documentation for browser APIs, accessibility, UI quality, and React engineering practices.

They do not override official Next.js guidance.

### Useful References

- Google Chrome Modern Web Guidance:
  https://github.com/GoogleChrome/modern-web-guidance

- Vercel Web Design Guidelines:
  https://github.com/vercel-labs/agent-skills/tree/main/skills/web-design-guidelines

- Vercel React Best Practices:
  https://github.com/vercel-labs/agent-skills/tree/main/skills/react-best-practices

## 6. Architecture and Maintainability Preferences

Keep the existing root-level Next.js structure unless repository inspection shows a clear reason to change it.

A `src/` directory is optional. Do not introduce it merely for consistency.

Architecture preferences:

- Keep editable content separate from UI where practical.
- Centralize profile, projects, experience, skills, navigation, and site metadata where useful.
- Keep feature-specific UI and behavior together.
- Keep genuinely shared primitives in a shared components area.
- Reuse project data for both project listings and detail pages.
- Keep theme tokens centralized.
- Prefer straightforward composition over excessive abstraction.

Possible organizational areas include `features/`, `data/`, and `config/`, but these are not mandatory Next.js conventions.

Inspect the repository and choose the smallest clear structure that supports the actual requirements.

Do not create unnecessary folders, wrapper components, hooks, utilities, or configuration files.

## 7. Intended Content and Pages

Intended site areas:

- Home/hero.
- Selected projects.
- Professional experience.
- Technical skills/stack.
- About.
- Contact.

Potential routes:

- `/about`
- `/work`
- `/work/[slug]`

Create routes only when they add real value.

A well-composed homepage matters more than the number of routes.

### Projects

- Wait for new independent personal projects; company projects must not be presented as independent work.
- Show up to three featured projects after they exist and their functionality, claims, screenshots, repository links, and demo links have been verified.
- Until then, hide the Selected Work section and its navigation link. Do not use fictional project cards, "coming soon" cards, abandoned V1 projects, or invented placeholder projects.
- The project model should allow optional detailed descriptions, technologies, screenshots, repository/demo links, project type, technical decisions, challenges/solutions, and verified outcomes.

### Approved profile copy

- Name: Sumit Bhukal.
- Public title: Full-Stack Developer.
- Hero introduction: “I build web applications with a focus on clean architecture, practical engineering and thoughtful user experiences.”
- Supporting description: “I enjoy working across the stack, from building responsive interfaces to designing APIs and backend systems. I'm particularly interested in understanding how software works beneath the surface and making technical decisions that lead to maintainable, reliable applications.”
- About copy is maintained in `data/portfolio.ts` from the user-approved draft. Keep the language concise and natural; do not add unsupported seniority or achievements.

### Experience and Privacy

- The user has one current employer; do not fabricate a multi-company career history.
- Show the role as Full-Stack Developer / Project Associate, with responsibilities limited to the approved general areas.
- Do not display the employer name, company project names, internal repositories/PRs, confidential implementation details, or employer metrics.
- Dates and duration may be displayed only when verified. Do not infer a duration or approximate experience count; keep date fields optional.
- Do not expose confidential work, internal project names, private PRs, team details, screenshots, or employer metrics.

### Education

Education is deferred. Keep it optional in content data, but do not show an empty education section.

Social profile links are also deferred. Do not invent URLs or show unavailable social links.

### Contact

No email address is shown publicly (user decision, 2026-11-09). A contact form is planned for a later release.

Until a contact method exists, the Contact section and its navigation link are hidden; the footer remains. Do not show a placeholder or a non-functional form. The form's implementation approach (backend endpoint, third-party form service, spam protection, data handling) has not been decided and requires user approval before it is built.

## 8. Responsive Design, Accessibility and Performance

- Design mobile-first and verify larger breakpoints.
- Use semantic HTML and correct heading hierarchy.
- Provide accessible names and keyboard support for interactive controls.
- Provide visible focus indicators.
- Check text and interactive-state contrast in both themes.
- Respect `prefers-reduced-motion`.
- Avoid layout shifts and oversized client bundles.
- Use image, font, metadata, and rendering optimizations documented for the installed Next.js version.
- Defer non-critical visual effects where appropriate.
- Avoid expensive global event handlers and unnecessary re-renders.
- Cursor-following effects and elaborate hover interactions should not impair touch devices or keyboard users.

## 9. V2 Implementation Sequence

### Phase 1 — Repository Audit

Inspect:

- Git branch, working tree, tracked lockfiles, and relevant history.
- Current Next.js, React, Node.js, Bun, TypeScript, Tailwind, and linting versions/configuration.
- Existing scripts and whether lint, type-check, tests, and production build work.
- Existing routes, components, styles, assets, and reusable code.
- Unused or redundant dependencies/components, with evidence before recommending removal.
- Deployment assumptions and environment-variable handling.
- Gaps between V1 and the agreed V2 direction.

Deliver an audit covering current state, risks, reusable code, replacement/removal candidates, dependency migration sequence, and implementation plan.

### Phase 2 — V2 Foundation

- Maintain V2 in the independent `portfolio-v2` repository, whose initial branch is `main` and whose clean Git history is separate from the original V1 repository.
- Preserve the existing production branch and deployment until V2 is verified.
- Migrate package management to Bun carefully.
- Modernize compatible stable dependencies.
- Establish the agreed project structure, theme foundation, and agent instructions.

### Phase 3 — Design System and Homepage

- Typography, colours, themes, responsive foundations, navigation.
- Hero and interactive code-editor presentation.
- Selected projects, experience, skills, about, and contact sections.

### Phase 4 — Project Detail Pages

- Reusable detail pages driven by verified project data.
- Real screenshots, features, architecture, engineering decisions, and links.

### Phase 5 — Quality and Deployment

- Accessibility.
- Responsive testing.
- Performance.
- SEO.
- Browser compatibility.
- Tests.
- Deployment verification.

Do not begin the full redesign before the repository audit and high-impact decisions are clear.

## 10. V2.0 Release State and Decisions

### V2.0 initial release (2026-11-07)

The initial V2.0 implementation is complete locally. It is not deployed, and indexing remains disabled (`noindex, nofollow`) until public launch is separately approved.

V2.0 presentation decisions:

- **Hero:** the large name is the primary element. One identity statement (a title pill) appears above it, and the approved introduction is emphasised typographically. Decorative shapes that competed with the code workspace were removed. The workspace has a visible, labelled Replay control.
- **Section headings:** each heading has one number (`NN / Eyebrow`) and a small decorative file label (for example `experience.ts`).
- **Experience:** an editorial ledger with the approved summary. The seven approved responsibilities are grouped under Frontend development, Backend and API integration, and Application engineering and maintenance. The employer, dates and duration remain hidden.
- **Technology:** a compact row of the four technologies verified for this portfolio, each with a factual description of what it is. There are no proficiency indicators.
- **About:** the approved copy at a readable measure, beside a key/value block drawn only from approved copy.
- **Contact:** originally a card-style `mailto:` link. The email was removed on 2026-11-09; the section is hidden until the planned contact form exists (see §7 Contact).
- **Navigation:** an active-section indicator, with tap targets of at least 40 px height.
- **Theme control:** a single control that cycles System → Light → Dark. It defaults to System.
- **Metadata:** app icons use an approved-colour "SB." monogram. The share image is deferred until a domain is confirmed, because it requires `metadataBase`.

### Future additions (V2.1 and later)

Each addition requires verified, user-approved content:

- A contact form (approach to be approved).
- Independent personal projects. Up to three can be featured; the `Project` data model is ready.
- Verified education details.
- Additional employment information, including dates only if the user wants them shown.
- Social profile links.
- Further verified technologies.
- A domain, canonical metadata, a share image, sitemap/robots files and public launch. All of these require approval.

## 10a. Decisions Still to Confirm

Approved content decisions:

- Show the role and approved general responsibilities only; never show the employer name.
- Defer education and social profile links.
- No public email address. A contact form is planned; its implementation approach still needs approval.
- Feature up to three new independent personal projects once verified; do not show company work.
- Keep additional routes driven by verified project content and actual user needs.

Still awaiting content:

- Verified employment dates, if they should be shown.
- New independent personal projects and approved publication details.
- Professional technologies beyond those verified through this portfolio implementation.

## 11. Updating This Specification

This file should evolve as the project develops.

- Record approved project-specific decisions here.
- Keep a concise record of material changes in the change history below.
- Agents may correct clear factual inaccuracies or implementation details that follow approved decisions, explaining the edit in their report.
- Agents must propose material changes to product direction, design, architecture, privacy, dependency policy, framework, or runtime and obtain user approval before applying them.
- Do not put general agent workflow instructions here; those belong in `AGENTS.md`.

### Change History

- Initial specification created from the Portfolio V2 planning discussion.
- Initial toolchain decision: Bun package manager, Node.js application runtime.
- Initial toolchain assessment: Bun was terminal-accessible; the populated npm lockfile and incomplete pnpm lockfile were preserved before migration.
- Framework authority: latest applicable official Next.js documentation.
- Approved V2 tooling: latest compatible stable Next.js, React, and TypeScript; mandatory Tailwind CSS v4; Bun package manager; Node.js runtime; evaluate Vercel for deployment.
- V2 implementation baseline: Next.js 16.4.5, React 19.3.1, TypeScript 5.x, Bun 1.4.4, Node.js 24.21.0, and Tailwind CSS 4.3.5. Bun lockfile migration preserved npm-resolved versions; legacy lockfiles remain pending cleanup approval.
- Approved personal content rules: Full-Stack Developer; role/responsibilities without employer; education/social links deferred; email-only contact; independent personal projects only; no unverified dates, technology claims, company projects, or invented details.
- Approved neutral near-black dark theme direction: page `#080808`, surface `#111111`, raised `#1A1A1A`, elevated `#202020`, border `#2A2A2A`, primary text `#F5F5F5`, secondary text `#A1A1AA`, and muted text `#8C8C8C` adjusted from the proposed `#71717A` to meet contrast on elevated surfaces. Orange `#FF7A45` and teal `#4FC1B5` accents retained; light palette remains unchanged.
- Repository cleanup (2026-11-07): removed unused generated V1 shadcn primitives, duplicate hooks, `lib/utils.ts`, the unused `styles/globals.css`, v0 placeholder images, 41 dependencies used only by that code, and the legacy npm/pnpm lockfiles after verifying a clean frozen Bun install. The detailed report was a private working note and is not part of this repository.
- Light-theme wording corrected (2026-11-07): the approved light palette is cool-neutral (`#EDF0F3`/`#F8FAFB`); the earlier "warm neutral" wording was inconsistent with the approved tokens, which remain unchanged.
- Theme control (2026-11-07): three-state Light/Dark/System selector using `next-themes`, defaulting to System, persisted in local storage.
- V2.0 initial release completed locally (2026-11-07): Hero, section headings, Experience, Technology, About, Contact, navigation, metadata and icons finalized; stale `components.json` removed; package renamed from the `my-v0-project` scaffold name to `sumit-bhukal-portfolio`. The completion report was a private working note and is not part of this repository.
- Contact email confirmed (2026-11-07) and rendered as a `mailto:` link; pending placeholder removed. (Superseded on 2026-11-09; see below.)
- Public repository preparation (2026-11-07): private execution plans, status/logs, research, reports and visual-review captures moved to the ignored `.local/` directory; README and a pre-commit guard added; working-file policy recorded in `AGENTS.md` §8. Not committed or published; license, default-branch strategy and publication still require user approval.
- Clean repository (2026-11-08): this repository was created from an allowlisted copy of the V2 working tree with fresh Git history (branch `main`). V1 history, private working notes, design-research captures, IDE state and the third-party agent skill files (`.agents/`, `skills-lock.json`, pending licensing review) were not carried over.
- Contact email removed (2026-11-09): at the user's request the public email and `mailto:` link were removed. A contact form is planned for later; until a contact method exists, the Contact section and its navigation link are hidden.
