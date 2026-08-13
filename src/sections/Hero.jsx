import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowDown, ArrowUpRight, Braces } from 'lucide-react'
import CvModal from '../components/CvModal'
import HeroCodeCard from '../components/HeroCodeCard'
import Reveal from '../components/Reveal'
import SocialLinks from '../components/SocialLinks'
import { profile } from '../data/profile'
import { useI18n, useT } from '../i18n'
import { useTypewriter } from '../hooks/useTypewriter'

function PdfIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-4 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <text
        x="7"
        y="18"
        fontSize="6.5"
        fontWeight="700"
        fill="currentColor"
        stroke="none"
        fontFamily="monospace"
      >
        PDF
      </text>
    </svg>
  )
}

export default function Hero() {
  const reduce = useReducedMotion()
  const { lang } = useI18n()
  const t = useT()
  const p = profile[lang]
  const [cvOpen, setCvOpen] = useState(false)
  const { text, showCaret } = useTypewriter(p.roles, { disabled: reduce })

  return (
    <section id="top" className="relative overflow-hidden pt-36 pb-20 sm:pt-44 sm:pb-28">
      <div className="section-shell grid items-center gap-14 lg:grid-cols-2 lg:gap-10">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.05 }}
            className="font-mono text-sm text-primary dark:text-primary-600"
          >
            {t('hero.hi')}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="font-display mt-2 text-5xl leading-[1.05] font-extrabold tracking-tight text-balance text-gray-900 sm:text-6xl dark:text-mint"
          >
            {profile.name}
            <span className="text-primary dark:text-primary-600">.</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.16 }}
            className="relative mt-6 w-[60vw] max-w-[15rem] sm:max-w-none sm:w-64 lg:w-72"
          >
            {/* glowing orb behind the image */}
            <motion.div
              className="absolute -inset-6 -z-10 rounded-full bg-primary/30 blur-3xl dark:bg-primary-600/30"
              animate={reduce ? {} : { scale: [1, 1.12, 1], opacity: [0.6, 0.9, 0.6] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              aria-hidden="true"
            />

            {/* floating role chip — top left */}
            <motion.span
              animate={reduce ? {} : { y: [0, -6, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
              className="font-mono absolute -top-3 -left-2 z-10 flex items-center gap-1.5 rounded-lg border border-line bg-paper px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-card dark:border-ink-line dark:bg-ink-soft dark:text-mint sm:-top-4 sm:-left-4 sm:px-3"
            >
              <Braces className="size-3.5 text-primary dark:text-primary-600" strokeWidth={2} />
              {p.role}
            </motion.span>

            {/* floating status chip — bottom right */}
            <motion.span
              animate={reduce ? {} : { y: [0, 6, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
              className="font-mono absolute -right-2 -bottom-2 z-10 flex items-center gap-1.5 rounded-lg border border-line bg-paper px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-card dark:border-ink-line dark:bg-ink-soft dark:text-mint sm:-right-3 sm:-bottom-3 sm:px-3"
            >
              <span className="relative flex size-2" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60 dark:bg-primary-600" />
                <span className="relative inline-flex size-2 rounded-full bg-primary dark:bg-primary-600" />
              </span>
              {t('hero.card.availableChip')}
            </motion.span>

            <div className="relative aspect-square w-[60vw] max-w-[15rem] overflow-hidden rounded-full border-4 border-paper shadow-[0_0_32px_rgba(6,91,50,0.45)] ring-4 ring-primary/60 dark:border-ink-soft dark:ring-primary-600/60 dark:shadow-[0_0_32px_rgba(11,122,68,0.5)] sm:max-w-none sm:w-64 lg:w-72">
              <img
                src="/img/hero.webp"
                alt={t('common.alt')}
                width={720}
                height={960}
                decoding="async"
                className="h-full w-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" aria-hidden="true" />
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-display mt-4 text-xl font-semibold text-gray-800 sm:text-2xl dark:text-ink-muted"
          >
            {text}
            {showCaret && (
              <span className="caret-blink ml-0.5 font-medium text-primary dark:text-primary-600" aria-hidden="true">
                |
              </span>
            )}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.28 }}
            className="mt-5 max-w-lg text-base leading-relaxed text-gray-600 sm:text-lg dark:text-ink-muted"
          >
            {p.heroIntro}
            <span className="mt-1 block text-gray-500 dark:text-ink-muted/80">
              {t('hero.basedIn', { location: p.location })}
            </span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.36 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-mint shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary-600 hover:shadow-card-lg focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
            >
              Voir mes projets
              <ArrowDown className="size-4 transition-transform duration-200 group-hover:translate-y-0.5" strokeWidth={2.2} />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-xl border border-line bg-paper px-5 py-3 text-sm font-semibold text-gray-800 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary hover:text-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none dark:border-ink-line dark:bg-transparent dark:text-mint dark:hover:text-primary-600"
            >
              {t('hero.contactCta')}
              <ArrowUpRight className="size-4" strokeWidth={2.2} />
            </a>
            <button
              type="button"
              onClick={() => setCvOpen(true)}
              className="inline-flex items-center gap-2 rounded-xl border border-primary/40 bg-primary/5 px-4 py-3 text-sm font-semibold text-primary shadow-[0_0_0_1px_rgb(6_91_50/0.10),0_0_16px_rgb(6_91_50/0.28)] transition-all duration-200 hover:-translate-y-0.5 hover:border-primary hover:bg-primary/10 hover:shadow-[0_0_0_1px_rgb(6_91_50/0.20),0_0_28px_rgb(6_91_50/0.5)] focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none dark:border-primary-600/40 dark:bg-primary/10 dark:text-primary-600 dark:shadow-[0_0_16px_rgb(11_122_68/0.3)] dark:hover:border-primary-600 dark:hover:text-primary-600 dark:hover:shadow-[0_0_28px_rgb(11_122_68/0.55)]"
            >
              <PdfIcon />
              {t('hero.cvPreview')}
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.44 }}
            className="mt-8 flex items-center gap-4"
          >
            <SocialLinks iconClassName="size-11" />
            <span className="font-mono hidden text-xs text-gray-400 sm:inline dark:text-ink-muted/70">
              {t('hero.available')}
            </span>
          </motion.div>
        </div>

        <Reveal delay={0.1} y={reduce ? 0 : 32} className="lg:justify-self-end lg:self-start">
          <HeroCodeCard />
        </Reveal>
      </div>

      <AnimatePresence>
        {cvOpen && <CvModal onClose={() => setCvOpen(false)} />}
      </AnimatePresence>
    </section>
  )
}
