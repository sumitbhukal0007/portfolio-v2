type SectionHeadingProps = {
  id: string
  eyebrow: string
  title: string
  description?: string
  number?: string
  /** Small workspace-style file label, shown as secondary decoration. */
  file?: string
}

export function SectionHeading({ id, eyebrow, title, description, number, file }: SectionHeadingProps) {
  return (
    <div className="mb-10 md:mb-14">
      <div className="mb-5 flex items-center justify-between gap-4 border-b border-border pb-3 font-mono text-xs">
        <p className="uppercase tracking-[0.18em] text-accent-ink">
          {number ? <span className="text-muted">{number} / </span> : null}
          {eyebrow}
        </p>
        {file ? <span aria-hidden="true" className="text-[11px] text-muted-subtle">{file}</span> : null}
      </div>
      <div className="max-w-3xl">
        <h2 id={id} className="text-balance font-display text-4xl font-semibold leading-[0.98] tracking-[-0.04em] sm:text-5xl">
          {title}
        </h2>
        {description ? <p className="mt-4 max-w-xl text-base leading-7 text-muted">{description}</p> : null}
      </div>
    </div>
  )
}
