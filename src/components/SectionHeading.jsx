import Reveal from './Reveal'

export default function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="mx-auto mb-14 max-w-2xl text-center sm:mb-16">
      <Reveal>
        <span className="font-mono text-xs font-semibold tracking-[0.25em] text-primary uppercase">
          {eyebrow}
        </span>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="font-display mt-3 text-3xl font-bold text-balance text-gray-900 sm:text-4xl dark:text-mint">
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={0.16}>
          <p className="mt-4 text-base leading-relaxed text-gray-600 sm:text-lg dark:text-ink-muted">
            {description}
          </p>
        </Reveal>
      )}
    </div>
  )
}
