import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { X } from 'lucide-react'
import { navLinks } from '../data/nav'
import { profile } from '../data/profile'
import { useI18n, useT } from '../i18n'
import LanguageToggle from './LanguageToggle'
import SocialLinks from './SocialLinks'

const overlay = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.25 } },
}

const list = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
}

const item = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
}

export default function MobileMenu({ onClose }) {
  const { lang } = useI18n()
  const t = useT()
  const links = navLinks[lang]
  const p = profile[lang]

  useEffect(() => {
    const original = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = original
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={t('mobileMenu.aria')}
      variants={overlay}
      initial="hidden"
      animate="show"
      exit="exit"
      className="fixed inset-0 z-[60] flex flex-col bg-mint/95 backdrop-blur-xl lg:hidden dark:bg-ink/95"
    >
      <div className="section-shell flex items-center justify-between pt-4">
        <span className="font-display text-lg font-bold text-gray-900 dark:text-mint">
          {profile.name}
        </span>
        <button
          type="button"
          onClick={onClose}
          aria-label={t('navbar.closeMenu')}
          autoFocus
          className="flex size-10 items-center justify-center rounded-full border border-line text-gray-700 transition-colors hover:border-primary hover:text-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none dark:border-ink-line dark:text-mint dark:hover:text-primary-600"
        >
          <X className="size-5" />
        </button>
      </div>

      <motion.ul
        variants={list}
        initial="hidden"
        animate="show"
        className="section-shell flex flex-1 flex-col justify-center gap-1"
      >
        {links.map((link) => (
          <motion.li key={link.href} variants={item}>
            <a
              href={link.href}
              onClick={onClose}
              className="font-display group flex items-baseline gap-4 py-2 text-3xl font-bold text-gray-900 transition-colors hover:text-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none rounded-lg sm:text-4xl dark:text-mint dark:hover:text-primary-600"
            >
              <span className="font-mono text-sm text-primary dark:text-primary-600">
                0{links.indexOf(link) + 1}
              </span>
              {link.label}
            </a>
          </motion.li>
        ))}
      </motion.ul>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0, transition: { delay: 0.35 } }}
        exit={{ opacity: 0, transition: { duration: 0.15 } }}
        className="section-shell border-t border-line py-6 dark:border-ink-line"
      >
        <div className="mb-4 flex items-center justify-between gap-3">
          <p className="text-sm text-gray-600 dark:text-ink-muted">
            {p.location} · {p.role}
          </p>
          <LanguageToggle />
        </div>
        <SocialLinks />
      </motion.div>
    </motion.div>
  )
}
