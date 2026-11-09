"use client"

import { RotateCcw } from "lucide-react"
import { useEffect, useRef, useState, useSyncExternalStore, type AnimationEvent as ReactAnimationEvent, type CSSProperties } from "react"
import { profile } from "@/data/portfolio"

type Segment = { value: string; className?: string }
type CodeLine = { segments: Segment[]; delay: number; duration: number }
type PlaybackPhase = "idle" | "running" | "paused" | "complete"

const codeLines: CodeLine[] = [
  { segments: [{ value: "type", className: "code-keyword" }, { value: " Profile = {" }], delay: 180, duration: 400 },
  { segments: [{ value: "  " }, { value: "name", className: "text-secondary" }, { value: ": string" }], delay: 650, duration: 380 },
  { segments: [{ value: "  " }, { value: "title", className: "text-secondary" }, { value: ": string" }], delay: 1110, duration: 400 },
  { segments: [{ value: "  " }, { value: "introduction", className: "text-secondary" }, { value: ": string" }], delay: 1580, duration: 620 },
  { segments: [{ value: "}" }], delay: 2280, duration: 90 },
  { segments: [], delay: 0, duration: 0 },
  { segments: [{ value: "function", className: "code-keyword" }, { value: " ProfilePreview", className: "text-accent-ink" }, { value: "(" }], delay: 2480, duration: 500 },
  { segments: [{ value: "  { " }, { value: "profile", className: "text-secondary" }, { value: " }: {" }], delay: 3050, duration: 380 },
  { segments: [{ value: "    " }, { value: "profile", className: "text-secondary" }, { value: ": Profile" }], delay: 3500, duration: 430 },
  { segments: [{ value: "  }," }], delay: 3990, duration: 120 },
  { segments: [{ value: ") {" }], delay: 4170, duration: 100 },
  { segments: [{ value: "  " }, { value: "return", className: "code-keyword" }, { value: " (" }], delay: 4330, duration: 250 },
  { segments: [{ value: "    <article>" }], delay: 4640, duration: 320 },
  { segments: [{ value: "      <h1>", className: "code-keyword" }, { value: "{" }, { value: "profile", className: "text-secondary" }, { value: ".name}</h1>", className: "code-keyword" }], delay: 5020, duration: 600 },
  { segments: [{ value: "      <p>", className: "code-keyword" }, { value: "{" }, { value: "profile", className: "text-secondary" }, { value: ".title}</p>", className: "code-keyword" }], delay: 5680, duration: 560 },
  { segments: [{ value: "      <p>", className: "code-keyword" }], delay: 6300, duration: 160 },
  { segments: [{ value: "        {" }, { value: "profile", className: "text-secondary" }, { value: ".introduction}" }], delay: 6480, duration: 650 },
  { segments: [{ value: "      </p>", className: "code-keyword" }], delay: 7140, duration: 150 },
  { segments: [{ value: "    </article>", className: "code-keyword" }], delay: 7330, duration: 270 },
  { segments: [{ value: "  )" }], delay: 7670, duration: 100 },
  { segments: [{ value: "}" }], delay: 7840, duration: 80 },
]

const previewMilestones = [
  { at: 0, stage: 1 },
  { at: 430, stage: 2 },
  { at: 880, stage: 3 },
  { at: 1450, stage: 4 },
  { at: 2200, stage: 5 },
] as const
const previewDuration = previewMilestones.at(-1)?.at ?? 2200
const typingScale = 0.72
const motionPreference = "(prefers-reduced-motion: reduce)"

function subscribeToReducedMotion(onChange: () => void) {
  const query = window.matchMedia(motionPreference)
  query.addEventListener("change", onChange)
  return () => query.removeEventListener("change", onChange)
}

function getReducedMotionPreference() {
  return window.matchMedia(motionPreference).matches
}

export function HeroWorkspace() {
  const workspaceRef = useRef<HTMLDivElement>(null)
  const replayRef = useRef<(() => void) | null>(null)
  const completeEditorRef = useRef<(() => void) | null>(null)
  const [phase, setPhase] = useState<PlaybackPhase>("idle")
  const [stage, setStage] = useState(5)
  const [editorComplete, setEditorComplete] = useState(true)
  const [cycle, setCycle] = useState(0)
  const reducedMotion = useSyncExternalStore(subscribeToReducedMotion, getReducedMotionPreference, () => false)

  useEffect(() => {
    const reducedMotionQuery = window.matchMedia(motionPreference)
    const timers: number[] = []
    let previewElapsed = 0
    let segmentStartedAt = 0
    let viewportVisible = false
    let hasPlayed = false
    let editorHasCompleted = false
    let previewHasStarted = false
    let previewStartPending = false
    let lastPreviewStage = 0
    let runId = 0
    let currentPhase: PlaybackPhase = "idle"

    const clearTimers = () => {
      timers.forEach(window.clearTimeout)
      timers.length = 0
    }

    const changePhase = (next: PlaybackPhase) => {
      currentPhase = next
      setPhase(next)
    }

    const finishImmediately = () => {
      clearTimers()
      runId += 1
      previewStartPending = false
      previewElapsed = previewDuration
      editorHasCompleted = true
      previewHasStarted = true
      setEditorComplete(true)
      setStage(5)
      changePhase("complete")
    }

    const scheduleMilestones = () => {
      segmentStartedAt = performance.now()
      previewMilestones.forEach(({ at, stage: nextStage }) => {
        if (nextStage <= lastPreviewStage) return
        timers.push(window.setTimeout(() => {
          lastPreviewStage = nextStage
          setStage(nextStage)
          if (nextStage === 5) {
            previewElapsed = previewDuration
            changePhase("complete")
          }
        }, Math.max(0, at - previewElapsed)))
      })
    }

    const beginPreviewAfterPaint = () => {
      if (!editorHasCompleted || previewHasStarted || previewStartPending || currentPhase !== "running" || reducedMotionQuery.matches) return
      previewStartPending = true
      const scheduledRunId = runId

      requestAnimationFrame(() => {
        if (scheduledRunId !== runId) return
        if (currentPhase !== "running" || !viewportVisible || document.hidden) {
          previewStartPending = false
          return
        }

        requestAnimationFrame(() => {
          if (scheduledRunId !== runId) return
          previewStartPending = false
          if (currentPhase !== "running" || !viewportVisible || document.hidden || reducedMotionQuery.matches) return
          previewHasStarted = true
          previewElapsed = 0
          lastPreviewStage = 0
          scheduleMilestones()
        })
      })
    }

    const startPreviewAfterEditor = () => {
      if (currentPhase !== "running" || editorHasCompleted || reducedMotionQuery.matches) return
      editorHasCompleted = true
      setEditorComplete(true)
      beginPreviewAfterPaint()
    }

    const start = (replay = false) => {
      if (reducedMotionQuery.matches) {
        hasPlayed = true
        finishImmediately()
        return
      }
      if (!replay && hasPlayed) return
      hasPlayed = true
      clearTimers()
      runId += 1
      previewStartPending = false
      previewElapsed = 0
      editorHasCompleted = false
      previewHasStarted = false
      lastPreviewStage = 0
      setEditorComplete(false)
      setStage(0)
      setCycle((current) => current + 1)
      changePhase("running")
    }

    const pause = () => {
      if (currentPhase !== "running") return
      if (previewHasStarted) {
        previewElapsed = Math.min(previewDuration, previewElapsed + performance.now() - segmentStartedAt)
      }
      clearTimers()
      changePhase("paused")
    }

    const resume = () => {
      if (currentPhase !== "paused") return
      changePhase("running")
      if (previewHasStarted) scheduleMilestones()
      else if (editorHasCompleted) beginPreviewAfterPaint()
    }

    const updateVisibility = () => {
      const visible = viewportVisible && !document.hidden
      if (visible && currentPhase === "paused") resume()
      else if (!visible && currentPhase === "running") pause()
      else if (visible && currentPhase === "idle" && !hasPlayed) start()
    }

    const observer = new IntersectionObserver(([entry]) => {
      viewportVisible = entry.isIntersecting
      updateVisibility()
    }, { threshold: 0.18 })

    if (workspaceRef.current) observer.observe(workspaceRef.current)
    replayRef.current = () => start(true)
    completeEditorRef.current = startPreviewAfterEditor

    const onMotionPreferenceChange = () => {
      if (reducedMotionQuery.matches) {
        hasPlayed = true
        finishImmediately()
      }
    }
    const onDocumentVisibilityChange = updateVisibility

    reducedMotionQuery.addEventListener("change", onMotionPreferenceChange)
    document.addEventListener("visibilitychange", onDocumentVisibilityChange)

    return () => {
      runId += 1
      currentPhase = "complete"
      previewStartPending = false
      clearTimers()
      observer.disconnect()
      replayRef.current = null
      completeEditorRef.current = null
      reducedMotionQuery.removeEventListener("change", onMotionPreferenceChange)
      document.removeEventListener("visibilitychange", onDocumentVisibilityChange)
    }
  }, [])

  const onFinalCodeAnimationEnd = (event: ReactAnimationEvent<HTMLSpanElement>) => {
    if (event.animationName === "workspace-code-reveal") completeEditorRef.current?.()
  }

  const initials = profile.name.split(" ").map((part) => part[0]).join("")
  const workspaceState = phase === "running" || phase === "paused" ? "workspace-sequence-running" : ""
  const className = [
    "workspace-card overflow-hidden rounded-[1.5rem] border border-border bg-surface shadow-[0_24px_80px_rgba(20,32,43,0.12)]",
    workspaceState,
    phase === "paused" ? "workspace-sequence-paused" : "",
  ].filter(Boolean).join(" ")

  return (
    <div ref={workspaceRef} className={className} data-animation-phase={phase} data-editor-complete={editorComplete} data-preview-stage={stage}>
      <div className="flex items-center justify-between border-b border-border px-4 py-3 sm:px-5">
        <div className="flex items-center gap-1.5" aria-hidden="true"><span className="size-2.5 rounded-full bg-[#e98b78]" /><span className="size-2.5 rounded-full bg-[#e9bc62]" /><span className="size-2.5 rounded-full bg-[#79b99a]" /></div>
        <p className="font-mono text-[11px] text-muted-subtle">profile.tsx</p>
        <button
          type="button"
          title={reducedMotion ? "Animation disabled by reduced motion preference" : undefined}
          disabled={reducedMotion}
          onClick={() => replayRef.current?.()}
          className="inline-flex min-h-8 items-center gap-1.5 rounded-full border border-border px-3 font-mono text-[11px] text-muted transition-colors hover:border-accent hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:border-border disabled:hover:text-muted"
        >
          <RotateCcw aria-hidden="true" className="size-3.5" />
          Replay<span className="sr-only">{reducedMotion ? " animation (disabled by reduced motion preference)" : " workspace animation"}</span>
        </button>
      </div>

      <div className="grid md:grid-cols-[1.08fr_0.92fr]">
        <div className="overflow-x-auto p-4 font-mono text-xs leading-[1.9] focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-accent sm:p-6 sm:text-[13px]" role="region" aria-label="Scrollable TypeScript profile preview" tabIndex={0}>
          <div key={cycle} className="workspace-code-lines" role="img" aria-label="TypeScript component that renders the approved portfolio profile">
            {codeLines.map((line, index) => {
              const characterCount = line.segments.reduce((count, segment) => count + segment.value.length, 0)
              const style = {
                "--typing-duration": `${Math.round(line.duration * typingScale)}ms`,
                "--typing-delay": `${Math.round(line.delay * typingScale)}ms`,
                "--typing-steps": Math.max(1, characterCount),
                "--typing-width": `${characterCount}ch`,
                "--typing-blinks": Math.max(1, Math.floor(line.duration * typingScale / 260)),
              } as CSSProperties & Record<`--${string}`, string | number>

              return (
                <div key={index} className="grid min-h-[1.9em] min-w-max grid-cols-[2.25rem_max-content]" aria-hidden="true">
                  <span className="select-none pr-3 text-muted-subtle">{String(index + 1).padStart(2, "0")}</span>
                  <span className="workspace-code-line" style={style}>
                    <span
                      className="workspace-code-content"
                      data-final-code-line={index === codeLines.length - 1 ? "true" : undefined}
                      data-code-complete={index === codeLines.length - 1 && editorComplete ? "true" : undefined}
                      onAnimationEnd={index === codeLines.length - 1 ? onFinalCodeAnimationEnd : undefined}
                    >
                      {line.segments.map((segment, segmentIndex) => <span key={segmentIndex} className={segment.className}>{segment.value}</span>)}
                    </span>
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        <div className="workspace-preview relative flex min-h-[360px] flex-col justify-between border-t border-border bg-background/75 p-5 md:border-l md:border-t-0 sm:min-h-[390px] sm:p-6" aria-label="Rendered profile preview">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-subtle">Live preview</p>
            <div className={`workspace-preview-step mt-6 flex size-14 items-center justify-center rounded-2xl bg-accent/10 font-display text-xl font-semibold text-accent-ink ${stage >= 1 ? "is-visible" : ""}`}>
              {initials}
            </div>
            <p className={`workspace-preview-step mt-4 font-display text-2xl font-semibold tracking-tight ${stage >= 2 ? "is-visible" : ""}`}>{profile.name}</p>
            <p className={`workspace-preview-step mt-1 text-sm text-muted ${stage >= 3 ? "is-visible" : ""}`}>{profile.title}</p>
          </div>
          <div className="mt-8 border-t border-border pt-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-subtle">Profile introduction</p>
            <p className={`workspace-preview-step mt-2 text-sm leading-6 text-muted ${stage >= 4 ? "is-visible" : ""}`}>{profile.introduction}</p>
          </div>
          <p className="sr-only" aria-live="off">{stage === 5 ? "Preview ready" : "Preview is being rendered"}</p>
          {stage === 0 && <p className="workspace-preview-placeholder absolute inset-0 flex items-center justify-center bg-inherit font-mono text-xs text-muted-subtle" aria-hidden="true">Waiting for component…</p>}
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-border px-4 py-3 font-mono text-[10px] text-muted-subtle sm:px-5">
        <span>UTF-8</span><span>TypeScript React</span><span>{stage === 5 ? "Preview ready" : "Rendering profile"}</span>
      </div>
    </div>
  )
}
