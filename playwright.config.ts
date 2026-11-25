import { defineConfig, devices } from "@playwright/test"
import { resolve } from "node:path"

process.env.PLAYWRIGHT_BROWSERS_PATH ??= resolve(".playwright-browsers")

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  reporter: "list",
  use: {
    baseURL: "http://localhost:3000",
    trace: "retain-on-failure",
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    // Playwright's Firefox build occasionally crashes the page while axe runs (about 1 in 10
    // runs on Windows, also against the production build). Retry once; retried passes are reported as flaky.
    { name: "firefox", retries: 1, use: { ...devices["Desktop Firefox"] } },
    { name: "webkit", use: { ...devices["Desktop Safari"] } },
  ],
  webServer: {
    command: "bun run dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
})
