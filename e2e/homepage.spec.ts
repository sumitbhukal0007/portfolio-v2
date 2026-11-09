import AxeBuilder from "@axe-core/playwright"
import { expect, test, type Page } from "@playwright/test"

const themeButton = (page: Page) => page.getByRole("button", { name: /^Theme:/ })

async function chooseTheme(page: Page, value: "system" | "light" | "dark") {
  const button = themeButton(page)
  await expect(button).toHaveAttribute("data-theme-choice", /.+/)
  for (let attempt = 0; attempt < 3; attempt += 1) {
    if (await button.getAttribute("data-theme-choice") === value) break
    await button.click()
  }
  await expect(button).toHaveAttribute("data-theme-choice", value)
}

async function expectThemeColor(page: Page, color: string) {
  const metas = page.locator('meta[name="theme-color"]')
  await expect(metas).toHaveCount(2)
  for (const meta of await metas.all()) await expect(meta).toHaveAttribute("content", color)
}

test("homepage uses approved profile content and hides unavailable content", async ({ page }) => {
  await page.goto("/")

  await expect(page).toHaveTitle("Sumit Bhukal — Full-Stack Developer")
  await expect(page.getByRole("heading", { level: 1, name: "Sumit Bhukal" })).toBeVisible()
  await expect(page.locator("#home .hero-enter-copy").first()).toContainText("I build web applications with a focus on clean architecture, practical engineering and thoughtful user experiences.")
  await expect(page.getByText("I'm a full-stack developer interested in building useful, maintainable web applications.")).toBeVisible()
  await expect(page.getByRole("heading", { name: "Full-Stack Developer / Project Associate" })).toBeVisible()
  await expect(page.getByText("I work across frontend and backend development, building maintainable web applications and focusing on practical engineering decisions.")).toBeVisible()
  for (const group of ["Frontend development", "Backend and API integration", "Application engineering and maintenance"]) {
    await expect(page.getByRole("heading", { level: 4, name: group })).toBeVisible()
  }
  for (const responsibility of [
    "Frontend application development.",
    "Backend API development and integration.",
    "Responsive and maintainable user interfaces.",
    "Authentication and application state management.",
    "Integration of external services and APIs.",
    "Containerized development and deployment workflows.",
    "Debugging, performance improvements and code maintenance.",
  ]) await expect(page.locator("#experience li li", { hasText: responsibility })).toHaveCount(1)
  await expect(page.locator("#stack li")).toHaveText([/React/, /Next\.js/, /TypeScript/, /Tailwind CSS/])
  await expect(page.getByText(/Hello, I.m Sumit/)).toHaveCount(0)
  await expect(page.getByText("Under the hood")).toHaveCount(0)
  await expect(page.getByText(/coming soon|lorem ipsum|placeholder/i)).toHaveCount(0)
  await expect(page.getByRole("navigation", { name: "Main navigation" }).getByRole("link", { name: "Work" })).toHaveCount(0)
  await expect(page.locator("#work")).toHaveCount(0)
  await expect(page.locator('a[href^="mailto:"]')).toHaveCount(0)
  await expect(page.getByText(/@gmail\.com/)).toHaveCount(0)
  await expect(page.locator("form")).toHaveCount(0)
  await expect(page.getByRole("heading", { name: "Education" })).toHaveCount(0)
  await expect(page.locator('a[href*="github.com"], a[href*="linkedin.com"]')).toHaveCount(0)
  await expect(page.getByText(/Django|FastAPI|Redux Toolkit|TanStack Query|PostgreSQL|Firebase/)).toHaveCount(0)
  await expect(page.getByText(/years of experience|company project/i)).toHaveCount(0)
  await expect(page.getByText("DevLink", { exact: true })).toHaveCount(0)
})

test("theme control cycles system, light and dark and persists the choice", async ({ page }) => {
  await page.goto("/")
  const root = page.locator("html")
  const cssVar = (name: string) => root.evaluate((element, property) => getComputedStyle(element).getPropertyValue(property).trim(), name)

  await expect(themeButton(page)).toHaveAttribute("data-theme-choice", "system")
  await expect(themeButton(page)).toHaveAccessibleName("Theme: System. Switch to Light.")
  await expect(root).not.toHaveClass(/dark/)
  await expectThemeColor(page, "#EDF0F3")
  await expect.poll(() => cssVar("--background")).toBe("210 21% 94%")
  await expect.poll(() => cssVar("--surface")).toBe("200 27% 98%")

  await themeButton(page).click()
  await expect(themeButton(page)).toHaveAttribute("data-theme-choice", "light")
  await expect(root).not.toHaveClass(/dark/)

  await themeButton(page).click()
  await expect(themeButton(page)).toHaveAttribute("data-theme-choice", "dark")
  await expect(root).toHaveClass(/dark/)
  await expectThemeColor(page, "#080808")
  await expect.poll(() => cssVar("--background")).toBe("0 0% 3.1%")
  await expect.poll(() => cssVar("--surface")).toBe("0 0% 6.7%")
  await expect.poll(() => cssVar("--surface-raised")).toBe("0 0% 10.2%")
  await expect.poll(() => cssVar("--surface-elevated")).toBe("0 0% 12.5%")
  await expect.poll(() => root.evaluate((element) => getComputedStyle(element).colorScheme)).toBe("dark")

  await page.reload()
  await expect(root).toHaveClass(/dark/)
  await expect(themeButton(page)).toHaveAttribute("data-theme-choice", "dark")
  expect(await page.evaluate(() => localStorage.getItem("theme"))).toBe("dark")

  await themeButton(page).click()
  await expect(themeButton(page)).toHaveAttribute("data-theme-choice", "system")
  await expect(root).not.toHaveClass(/dark/)
  await expectThemeColor(page, "#EDF0F3")
})

test("system theme follows the operating system preference", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "dark" })
  await page.goto("/")
  const root = page.locator("html")

  await expect(root).toHaveClass(/dark/)
  await expect(themeButton(page)).toHaveAttribute("data-theme-choice", "system")
  await expectThemeColor(page, "#080808")

  await page.emulateMedia({ colorScheme: "light" })
  await expect(root).not.toHaveClass(/dark/)
  await expectThemeColor(page, "#EDF0F3")

  await chooseTheme(page, "dark")
  await page.emulateMedia({ colorScheme: "light" })
  await expect(root).toHaveClass(/dark/)
})

test("navigation anchors resolve and the active section is indicated", async ({ page }) => {
  await page.goto("/")
  const nav = page.getByRole("navigation", { name: "Main navigation" })
  const links = nav.getByRole("list").getByRole("link")

  await expect(links).toHaveText(["Experience", "Stack", "About"])
  const hrefs = [
    ...await links.evaluateAll((elements) => elements.map((element) => element.getAttribute("href"))),
    ...await page.locator('main a[href^="#"]').evaluateAll((elements) => elements.map((element) => element.getAttribute("href"))),
  ]
  for (const href of hrefs) await expect(page.locator(href ?? "#missing"), `${href} target`).toHaveCount(1)

  await expect(nav.locator('[aria-current="location"]')).toHaveCount(0)
  await nav.getByRole("link", { name: "Stack" }).click()
  await expect(nav.getByRole("link", { name: "Stack" })).toHaveAttribute("aria-current", "location")
  await expect(nav.locator('[aria-current="location"]')).toHaveCount(1)

  await page.locator("#about").evaluate((element) => element.scrollIntoView({ block: "start" }))
  await expect(nav.getByRole("link", { name: "About" })).toHaveAttribute("aria-current", "location")
  await expect(nav.getByRole("link", { name: "Stack" })).not.toHaveAttribute("aria-current", "location")
})

test("page has one h1 and a heading outline without skipped levels", async ({ page }) => {
  await page.goto("/")
  const levels = await page.locator("h1, h2, h3, h4, h5, h6").evaluateAll((elements) => elements.map((element) => Number(element.tagName[1])))

  expect(levels.filter((level) => level === 1)).toHaveLength(1)
  expect(levels[0]).toBe(1)
  levels.forEach((level, index) => {
    if (index > 0) expect(level - levels[index - 1], `heading ${index} level jump`).toBeLessThanOrEqual(1)
  })
})

test("mobile navigation keeps every control visible with adequate tap targets", async ({ page }) => {
  for (const width of [320, 375, 390]) {
    await page.setViewportSize({ width, height: 800 })
    await page.goto("/")
    const nav = page.getByRole("navigation", { name: "Main navigation" })
    const navBox = await nav.boundingBox()
    expect(navBox).not.toBeNull()
    for (const control of await nav.locator("a, button").all()) {
      const box = await control.boundingBox()
      expect(box, `control box at ${width}px`).not.toBeNull()
      expect(box!.height, `control height at ${width}px`).toBeGreaterThanOrEqual(40)
      expect(box!.width, `control width at ${width}px`).toBeGreaterThanOrEqual(24)
      expect(box!.x + box!.width, `control fits nav at ${width}px`).toBeLessThanOrEqual(navBox!.x + navBox!.width)
      expect(box!.x, `control fits viewport at ${width}px`).toBeGreaterThanOrEqual(0)
    }
  }
})

test("metadata, icons and indexing rules are configured for launch review", async ({ page, request }) => {
  await page.goto("/")
  await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", "I build web applications with a focus on clean architecture, practical engineering and thoughtful user experiences.")
  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute("content", "Sumit Bhukal — Full-Stack Developer")
  await expect(page.locator('meta[property="og:description"]')).toHaveAttribute("content", /clean architecture/)
  await expect(page.locator('meta[property="og:site_name"]')).toHaveAttribute("content", "Sumit Bhukal Portfolio")
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/)
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /nofollow/)

  const iconHrefs = await page.locator('link[rel="icon"], link[rel="apple-touch-icon"]').evaluateAll((elements) => elements.map((element) => element.getAttribute("href") ?? ""))
  expect(iconHrefs.some((href) => href.includes("favicon.ico"))).toBe(true)
  expect(iconHrefs.some((href) => href.includes("/icon"))).toBe(true)
  expect(iconHrefs.some((href) => href.includes("/apple-icon"))).toBe(true)
  for (const href of iconHrefs) {
    const response = await request.get(href)
    expect(response.status(), href).toBe(200)
    expect(response.headers()["content-type"], href).toMatch(/image\//)
  }
})

test("contact section and its navigation link stay hidden until a contact method exists", async ({ page }) => {
  await page.goto("/")

  await expect(page.locator("#contact")).toHaveCount(0)
  await expect(page.getByRole("navigation", { name: "Main navigation" }).getByRole("link", { name: "Contact" })).toHaveCount(0)
  await expect(page.locator('a[href^="mailto:"]')).toHaveCount(0)
  await expect(page.getByText(/pending|being confirmed|will be published/i)).toHaveCount(0)
  await expect(page.locator("footer")).toBeVisible()
})

test("keyboard users can skip directly to the main content", async ({ page }) => {
  await page.goto("/")
  await page.keyboard.press("Tab")

  const skipLink = page.getByRole("link", { name: "Skip to content" })
  await expect(skipLink).toBeFocused()
  await expect(skipLink).toBeVisible()
  await expect(skipLink).toHaveAttribute("href", "#main-content")
})

test("mobile layout has no horizontal page overflow", async ({ page }) => {
  await page.goto("/")

  for (const width of [320, 375, 390, 768, 1024, 1280, 1600, 1920]) {
    await page.setViewportSize({ width, height: 900 })
    const pageWidths = await page.evaluate(() => ({
      viewport: document.documentElement.clientWidth,
      document: document.documentElement.scrollWidth,
      body: document.body.scrollWidth,
    }))

    expect(pageWidths.document, `document width at ${width}px`).toBeLessThanOrEqual(pageWidths.viewport)
    expect(pageWidths.body, `body width at ${width}px`).toBeLessThanOrEqual(pageWidths.viewport)
  }
})

test("reduced-motion preference removes smooth page scrolling", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" })
  await page.goto("/")

  await expect.poll(() => page.locator("html").evaluate((element) => getComputedStyle(element).scrollBehavior)).toBe("auto")
  await expect(page.locator("#hero-title")).toHaveCSS("animation-name", "none")
  await expect(page.locator("#hero-title")).toHaveCSS("opacity", "1")
  const workspace = page.locator(".workspace-card")
  await expect(workspace).toHaveAttribute("data-animation-phase", "complete")
  await expect(workspace).toHaveAttribute("data-editor-complete", "true")
  await expect(workspace).toHaveAttribute("data-preview-stage", "5")
  await expect(workspace.getByRole("button", { name: /replay animation/i })).toBeDisabled()
  await expect(workspace.locator(".workspace-preview-step").nth(3)).toHaveCSS("opacity", "1")
})

test("workspace typing and live preview stay synchronized, pause offscreen, and replay", async ({ page }) => {
  const errors: string[] = []
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text())
  })
  page.on("pageerror", (error) => errors.push(error.message))

  await page.setViewportSize({ width: 1440, height: 1000 })
  await page.goto("/")
  const workspace = page.locator(".workspace-card")
  const code = workspace.locator(".workspace-code-content")
  const finalCodeLine = workspace.locator(".workspace-code-content[data-final-code-line='true']")
  const profileHeading = workspace.locator(".workspace-preview").getByText("Sumit Bhukal", { exact: true })
  const profileTitle = workspace.getByText("Full-Stack Developer", { exact: true })
  const profileDescription = workspace.getByText("I build web applications with a focus on clean architecture, practical engineering and thoughtful user experiences.")

  await expect(workspace).toHaveAttribute("data-animation-phase", "running")
  await expect(workspace).toHaveAttribute("data-preview-stage", "0")
  await expect(workspace).toHaveAttribute("data-editor-complete", "false")
  await expect(workspace.locator(".workspace-preview-placeholder")).toBeVisible()
  await expect(code.nth(1)).toHaveCSS("animation-name", "workspace-code-reveal")
  await expect.poll(() => code.nth(0).evaluate((element) => getComputedStyle(element, "::after").animationName)).toContain("workspace-caret-blink")

  const initialBox = await workspace.boundingBox()
  const completionEvidencePromise = finalCodeLine.evaluate((element) => new Promise<{
    previewStageAtEditorEnd: string | null
    editorCompleteAtEvent: string | null
    finalLine: string | undefined
  }>((resolve) => {
    element.addEventListener("animationend", (nativeEvent) => {
      const event = nativeEvent as AnimationEvent
      if (event.animationName !== "workspace-code-reveal") return
      const root = element.closest(".workspace-card")
      const eventState = {
        previewStageAtEditorEnd: root?.getAttribute("data-preview-stage") ?? null,
        editorCompleteAtEvent: root?.getAttribute("data-editor-complete") ?? null,
        finalLine: element.textContent?.trim(),
      }
      resolve(eventState)
    })
  }))

  const completionEvidence = await completionEvidencePromise
  expect(completionEvidence.previewStageAtEditorEnd).toBe("0")
  expect(completionEvidence.editorCompleteAtEvent).toBe("false")
  expect(completionEvidence.finalLine).toBe("}")
  await expect(workspace).toHaveAttribute("data-editor-complete", "true")
  await expect(finalCodeLine).toHaveAttribute("data-code-complete", "true")
  await expect(finalCodeLine).toHaveCSS("clip-path", "none")
  await expect(workspace).toHaveAttribute("data-preview-stage", "1")
  expect(await finalCodeLine.getAttribute("data-code-complete")).toBe("true")
  await expect(profileHeading).toHaveCSS("opacity", "0")

  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
  await expect(workspace).toHaveAttribute("data-animation-phase", "paused")
  await page.waitForTimeout(350)
  await expect(workspace).toHaveAttribute("data-preview-stage", "1")
  await page.evaluate(() => window.scrollTo(0, 0))
  await expect(workspace).toHaveAttribute("data-animation-phase", "running")

  await expect(workspace).toHaveAttribute("data-preview-stage", "2")
  await expect(profileHeading).toHaveCSS("opacity", "1")
  await expect(workspace).toHaveAttribute("data-preview-stage", "3")
  await expect(profileTitle).toHaveCSS("opacity", "1")
  await expect(workspace).toHaveAttribute("data-preview-stage", "4")
  await expect(profileDescription).toHaveCSS("opacity", "1")
  await expect(workspace).toHaveAttribute("data-preview-stage", "5")
  await expect(workspace).toHaveAttribute("data-animation-phase", "complete")

  const completedBox = await workspace.boundingBox()
  expect(Math.abs((completedBox?.width ?? 0) - (initialBox?.width ?? 0))).toBeLessThan(1)
  expect(Math.abs((completedBox?.height ?? 0) - (initialBox?.height ?? 0))).toBeLessThan(1)

  await chooseTheme(page, "dark")
  await expect(page.locator("html")).toHaveClass(/dark/)
  await expect(workspace).toHaveAttribute("data-preview-stage", "5")
  await expect(profileDescription).toHaveCSS("opacity", "1")

  const replay = workspace.getByRole("button", { name: "Replay workspace animation" })
  await expect(replay).toBeVisible()
  await expect(replay).toContainText("Replay")
  await replay.click()
  await expect(workspace).toHaveAttribute("data-animation-phase", "running")
  await expect(workspace).toHaveAttribute("data-preview-stage", "0")
  await expect(workspace).toHaveAttribute("data-editor-complete", "false")
  await page.waitForTimeout(250)
  await expect(workspace).toHaveAttribute("data-preview-stage", "0")
  await expect(workspace).toHaveAttribute("data-editor-complete", "false")
  await expect(errors).toEqual([])
})

test("theme changes and reloads produce no browser or hydration errors", async ({ page }) => {
  const errors: string[] = []
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text())
  })
  page.on("pageerror", (error) => errors.push(error.message))

  await page.goto("/")
  await chooseTheme(page, "dark")
  await expect(page.locator("html")).toHaveClass(/dark/)
  await chooseTheme(page, "light")
  await expect(page.locator("html")).not.toHaveClass(/dark/)
  await chooseTheme(page, "system")
  await page.reload()
  await expect(themeButton(page)).toHaveAttribute("data-theme-choice", "system")

  expect(errors).toEqual([])
})

test("homepage meets automated WCAG 2.2 AA checks in both themes", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" })
  await page.goto("/")

  for (const theme of ["light", "dark"] as const) {
    await chooseTheme(page, theme)
    const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"]).analyze()

    expect(results.violations, `${theme} theme accessibility violations`).toEqual([])
  }
})
