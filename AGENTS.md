
# Agent Instructions

## Purpose

This file contains stable working rules for AI coding agents contributing to this repository.

Project-specific product requirements, design choices, technical decisions, and their evolution belong in `PROJECT_SPEC.md`, not here.

Before starting a task, read:
1. This `AGENTS.md`.
2. `PROJECT_SPEC.md`.
3. Relevant official documentation and existing code.

## 1. Source of Truth

- Follow `PROJECT_SPEC.md` for current portfolio goals, approved design direction, technology choices, architecture preferences, content rules, and project constraints.
- Treat the approved technology decisions recorded in `PROJECT_SPEC.md` as requirements; do not substitute a different framework, runtime, package manager, language, styling version, or deployment direction without approval.
- If the codebase conflicts with the specification, inspect the history and current implementation before changing either. Explain the conflict.
- Do not silently invent requirements or treat suggestions as approved decisions.
- For Next.js-specific decisions, the latest applicable official Next.js documentation is the primary authority: https://nextjs.org/docs
- Prefer stable, documented APIs. Avoid deprecated, experimental, or canary APIs unless explicitly approved and justified.

## 2. Next.js Development

- Inspect the installed Next.js version before using framework-specific APIs.
- Check for version-matched documentation bundled with the installed package, including `node_modules/next/dist/docs/`, when available.
- Otherwise consult official documentation and relevant official migration guides.
- Follow the App Router conventions supported by the installed version.
- Prefer Server Components. Use Client Components only when client-side state, event handlers, browser APIs, or other client-only behavior require them.
- Use the simplest official Next.js approach that satisfies the requirement.
- Do not add framework features just because they exist.

- When relevant, inspect official Next.js skills and AI development
  resources. Use skills only when they match the installed framework
  version and the task being performed.
- Do not assume that a skill, MCP server, or API is compatible
  simply because it appears in the latest documentation.

Official AI coding agents guidance:
https://nextjs.org/docs/app/guides/ai-agents


## 3. Changes and Dependencies

- Use the package manager and runtime decisions recorded in `PROJECT_SPEC.md`.
- Inspect `package.json`, lockfiles, installed versions, scripts, and Git state before changing dependencies.
- Prefer compatible stable releases.
- Review official release notes and migration guides before major upgrades.
- Do not run blanket `latest` upgrades.
- Do not remove dependencies until their usage has been checked.
- Do not mix multiple package-manager lockfiles as competing sources of truth.
- Do not delete or regenerate lockfiles until the current Git state and migration plan have been checked.
- Avoid unnecessary dependencies, abstractions, configuration files, and custom infrastructure.

Before and after dependency changes, verify relevant install, lint, type-check, test, and production-build commands.

Do not claim checks passed unless they were actually run and succeeded.

## 4. Code Quality

- Inspect relevant existing code before editing.
- Follow sound existing conventions.
- Make focused changes rather than unrelated refactors.
- Keep components, data, and utilities understandable and appropriately scoped.
- Prefer simple composition over premature abstraction.
- Keep content separate from presentation where it makes updates easier.
- Use semantic HTML, accessible names, keyboard support, visible focus states, and appropriate heading hierarchy.
- Respect `prefers-reduced-motion`.
- Check responsive behavior and avoid horizontal overflow.
- Consider performance, bundle size, rendering behavior, and layout stability.
- Do not make essential functionality hover-only.

## 5. Truthfulness, Privacy and Security

- Never invent projects, achievements, metrics, employers, responsibilities, testimonials, links, or technical experience.
- Do not expose confidential employer information, private repositories, internal PRs, screenshots, team details, or non-public project information.
- Do not publish project claims, screenshots, repository links, or demo links until verified.
- Do not present non-functional controls as working features.
- Do not expose secrets, credentials, private environment values, or personal data in source code, logs, screenshots, or documentation.

## 6. Required Workflow

For each task:

1. Read `AGENTS.md` and `PROJECT_SPEC.md`.
2. Inspect the current Git branch and working tree. Preserve unrelated user changes.
3. Inspect the relevant implementation and documentation.
4. Identify the smallest suitable change.
5. Implement without unrelated refactoring.
6. Run appropriate checks (lint, type-check, tests, production build).
7. Inspect the final diff.
8. Report what changed, why, checks actually run, checks not run, and remaining risks.

Never claim that a test, build, migration, deployment, or verification succeeded unless it was actually executed and succeeded.

For broad tasks such as repository modernization or the V2 rebuild:
- Start with a repository audit and proposed sequence of work.
- Do not perform destructive changes, major upgrades, lockfile removal, or large rewrites before understanding the repository and explaining the plan.
- This is an independent repository with its own clean Git history on `main`. The original V1 repository and its production deployment are separate and must remain untouched.
- Do not stage, commit, push, add remotes, create GitHub repositories, or deploy without explicit user authorization.
- Confirm the current branch and working tree before creating any branch.

## 7. Keeping Documentation Current

Treat `PROJECT_SPEC.md` as the living record of project-specific requirements and approved decisions.

Treat this file as stable agent operating guidance.

When you discover outdated, incomplete, contradictory, or missing documentation:

1. Mention the issue in your task findings, with the relevant file/section and evidence.
2. Recommend the exact change and explain why it is needed.
3. You may directly correct clear, low-risk factual inaccuracies or implementation details that follow an already-approved decision. Explain the edit in your final report.
4. Ask the user before changing material product, design, architecture, privacy, dependency-policy, framework, or runtime decisions.
5. Record approved project-specific decisions and changes in `PROJECT_SPEC.md`, not in this file.
6. Update `AGENTS.md` only when the general rules for how agents should work have genuinely changed.
7. Do not create extra instruction files or duplicate this guidance for individual agents unless a tool demonstrably requires an adapter. Keep any required adapter minimal and refer back to this file.

Whenever either document changes, report:

- Which file and sections changed.
- Why the change was needed.
- Whether the change reflects an already-approved decision or needs user review.

## 8. Working Files and Documentation

This repository is public. Keep its documentation small and useful.

- Permanent public documentation is limited to `README.md`, this file, `PROJECT_SPEC.md`, and a license or contributing guide once the user approves one. Do not create new root-level Markdown files without a clear, lasting purpose.
- Put temporary AI-generated material in the ignored `.local/` directory:
  - `.local/agent-reports/`: task reports, audits, completion and release reports.
  - `.local/execution/`: execution plans, status, logs and private deployment notes.
  - `.local/research/`: research notes, screenshots, captures and design references.
- Never stage or commit `.local/` contents or other private execution documentation. Do not force-add ignored files.
- Do not add a blanket `*.md` ignore rule. Ignore specific directories instead.
- `.gitignore` does not affect files that are already tracked. Untrack them explicitly when required.
- Review every new or changed file before staging it, including screenshots and generated assets (check them for local paths, personal data and third-party content).
- Enable the pre-commit guard once per clone with `git config core.hooksPath .githooks`. It blocks known private paths and `.env` files. Do not bypass it.
