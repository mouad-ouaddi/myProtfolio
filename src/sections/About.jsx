import { GraduationCap, Heart, MapPin } from 'lucide-react'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import { profile } from '../data/profile'
import { useI18n, useT } from '../i18n'

export default function About() {
  const { lang } = useI18n()
  const t = useT()
  const p = profile[lang]

  return (
    <section id="about" className="scroll-mt-28 py-20 sm:py-28">
      <div className="section-shell">
        <SectionHeading
          eyebrow={t('about.eyebrow')}
          title={t('about.title')}
          description={t('about.description')}
        />

        <div className="grid gap-10 md:grid-cols-5 md:gap-12">
          <div className="md:col-span-3">
            <div className="space-y-4">
              {p.about.paragraphs.map((paragraph, i) => (
                <Reveal key={i} delay={i * 0.08}>
                  <p className="text-base leading-relaxed text-gray-600 sm:text-lg dark:text-ink-muted">
                    {paragraph}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="md:col-span-2">
            <Reveal delay={0.05}>
              <div className="mb-6 flex justify-center">
                <img
                  src="/img/avatar.webp"
                  alt={t('common.alt')}
                  width={512}
                  height={683}
                  loading="lazy"
                  decoding="async"
                  className="size-32 rounded-full border-4 border-paper bg-mint object-cover shadow-card ring-2 ring-primary/60 dark:border-ink-soft dark:bg-ink sm:size-40"
                />
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="rounded-2xl border border-line bg-paper p-6 shadow-card dark:border-ink-line dark:bg-ink-soft">
                <h3 className="font-display text-sm font-bold tracking-wider text-gray-900 uppercase dark:text-mint">
                  {t('about.inBrief')}
                </h3>
                <dl className="mt-5 space-y-4 text-sm">
                  <div className="flex gap-3">
                    <MapPin className="mt-0.5 size-4 shrink-0 text-primary dark:text-primary-600" strokeWidth={2} />
                    <div>
                      <dt className="font-medium text-gray-900 dark:text-mint">{t('about.location')}</dt>
                      <dd className="text-gray-600 dark:text-ink-muted">{p.location}</dd>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <GraduationCap className="mt-0.5 size-4 shrink-0 text-primary dark:text-primary-600" strokeWidth={2} />
                    <div>
                      <dt className="font-medium text-gray-900 dark:text-mint">{t('about.education')}</dt>
                      <dd className="text-gray-600 dark:text-ink-muted">{p.education}</dd>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Heart className="mt-0.5 size-4 shrink-0 text-primary dark:text-primary-600" strokeWidth={2} />
                    <div>
                      <dt className="font-medium text-gray-900 dark:text-mint">{t('about.outsideCode')}</dt>
                      <dd className="text-gray-600 dark:text-ink-muted">
                        {p.interests.join(' · ')}
                      </dd>
                    </div>
                  </div>
                </dl>
              </div>
            </Reveal>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 dark:border-ink-line dark:bg-ink-line">
          {p.stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.1} className="bg-paper dark:bg-ink-soft">
              <div className="flex flex-col items-center gap-1 px-6 py-8 text-center">
                <span className="font-display text-4xl font-extrabold text-primary dark:text-primary-600">
                  {stat.value}
                </span>
                <span className="text-sm text-gray-600 dark:text-ink-muted">{stat.label}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
