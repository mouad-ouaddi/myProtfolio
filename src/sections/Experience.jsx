import { Briefcase, FolderKanban, GraduationCap } from 'lucide-react'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import { experienceItems } from '../data/experience'
import { useI18n, useT, tr } from '../i18n'

const TYPE_STYLES = {
  education: 'bg-primary text-mint',
  project: 'border border-primary text-primary dark:text-primary-600',
  internship: 'border border-line text-gray-600 dark:border-ink-line dark:text-ink-muted',
}

const TYPE_ICONS = {
  education: GraduationCap,
  project: FolderKanban,
  internship: Briefcase,
}

function TimelineCard({ item, index, lang, t }) {
  const Icon = TYPE_ICONS[item.type]
  const title = tr(item.title, lang)
  const subtitle = tr(item.subtitle, lang)
  const description = tr(item.description, lang)
  const bullets = tr(item.bullets, lang) ?? []

  return (
    <Reveal delay={Math.min(index * 0.07, 0.35)} className="h-full">
      <article
        className={`group flex h-full flex-col rounded-2xl border bg-paper p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-lg dark:bg-ink-soft ${
          item.highlight
            ? 'border-primary/50 dark:border-primary-600/50'
            : 'border-line hover:border-primary/40 dark:border-ink-line dark:hover:border-primary-600/40'
        }`}
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 font-mono text-[11px] font-semibold tracking-wide uppercase ${TYPE_STYLES[item.type]}`}
            >
              {Icon && <Icon className="size-3.5" strokeWidth={2.2} />}
              {t(`experience.${item.type}`)}
            </span>
            {item.highlight && (
              <span className="rounded-md bg-mint px-2.5 py-1 font-mono text-[11px] font-semibold tracking-wide text-primary uppercase dark:bg-ink dark:text-primary-600">
                {t('experience.mostRecent')}
              </span>
            )}
          </div>
          <span className="font-mono text-xs text-gray-500 dark:text-ink-muted">{item.period}</span>
        </div>
        <h3 className="font-display mt-4 text-lg font-bold text-gray-900 dark:text-mint">
          {title}
        </h3>
        {subtitle && (
          <p className="font-mono mt-1 text-xs text-gray-500 dark:text-ink-muted">{subtitle}</p>
        )}
        <p className="mt-0.5 text-sm font-medium text-primary dark:text-primary-600">
          {item.organization}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-ink-muted">
          {description}
        </p>
        {bullets.length > 0 && (
          <ul className="mt-3 grid gap-1.5 text-sm text-gray-600 dark:text-ink-muted sm:grid-cols-2">
            {bullets.map((bullet) => (
              <li key={bullet} className="flex items-center gap-2">
                <span className="size-1.5 shrink-0 rounded-full bg-primary dark:bg-primary-600" aria-hidden="true" />
                {bullet}
              </li>
            ))}
          </ul>
        )}
        {item.tags.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-2">
            {item.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-md bg-mint px-2 py-1 font-mono text-xs text-primary dark:bg-ink dark:text-primary-600"
              >
                {tag}
              </li>
            ))}
          </ul>
        )}
      </article>
    </Reveal>
  )
}

export default function Experience() {
  const { lang } = useI18n()
  const t = useT()

  return (
    <section
      id="experience"
      className="scroll-mt-28 bg-paper/50 py-20 sm:py-28 dark:bg-ink-soft/30"
    >
      <div className="section-shell">
        <SectionHeading
          eyebrow={t('experience.eyebrow')}
          title={t('experience.title')}
          description={t('experience.description')}
        />

        <div className="relative mx-auto max-w-4xl">
          <span
            className="absolute top-0 bottom-0 left-[13px] w-px bg-line md:left-1/2 md:-translate-x-1/2 dark:bg-ink-line"
            aria-hidden="true"
          />
          <ul className="space-y-10">
            {experienceItems.map((item, i) => {
              const cardOnRight = i % 2 === 0
              return (
                <li key={i} className="group relative md:grid md:grid-cols-2 md:gap-14">
                  <span
                    className="absolute top-3 left-[13px] size-3 -translate-x-1/2 rounded-full border-2 border-primary bg-paper transition-transform duration-300 group-hover:scale-125 group-hover:bg-primary md:left-1/2 dark:bg-ink"
                    aria-hidden="true"
                  />
                  <div className={`pl-10 md:pl-0 ${cardOnRight ? 'md:col-start-1' : 'md:col-start-2'}`}>
                    <TimelineCard item={item} index={i} lang={lang} t={t} />
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}
