import { useId } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { useI18n } from '../i18n'

const LANGS = [
  { code: 'fr', label: 'FR' },
  { code: 'en', label: 'EN' },
]

export default function LanguageToggle({ className = '' }) {
  const { lang, setLang } = useI18n()
  const reduce = useReducedMotion()
  const layoutId = useId().replace(/[^a-zA-Z0-9]/g, '')

  return (
    <div
      role="group"
      aria-label="Language"
      className={`relative inline-flex items-center rounded-full border border-line bg-paper p-1 dark:border-ink-line dark:bg-ink-soft ${className}`}
    >
      {LANGS.map(({ code, label }) => {
        const isActive = lang === code
        return (
          <button
            key={code}
            type="button"
            onClick={() => setLang(code)}
            aria-pressed={isActive}
            className="relative rounded-full px-3 py-1.5 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
          >
            {isActive && (
              <motion.span
                layoutId={layoutId}
                className="absolute inset-0 rounded-full bg-primary shadow-card"
                transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 500, damping: 40 }}
              />
            )}
            <span
              className={`relative z-10 font-mono text-xs font-semibold transition-colors duration-200 ${
                isActive
                  ? 'text-mint'
                  : 'text-gray-500 hover:text-primary dark:text-ink-muted dark:hover:text-primary-600'
              }`}
            >
              {label}
            </span>
          </button>
        )
      })}
    </div>
  )
}
