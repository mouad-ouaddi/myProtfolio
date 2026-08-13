import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
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

          <motion.img
            src="/img/hero-rect.png"
            alt={t('common.alt')}
            width={1086}
            height={1448}
            decoding="async"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.16 }}
            className="mt-6 h-auto w-52 rounded-2xl border-2 border-primary object-cover shadow-[0_0_24px_rgba(6,91,50,0.5)] sm:w-64 dark:shadow-[0_0_24px_rgba(11,122,68,0.55)]"
          />

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
