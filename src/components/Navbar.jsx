import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, Moon, Sun } from 'lucide-react'
import { navLinks } from '../data/nav'
import { profile } from '../data/profile'
import { useActiveSection } from '../hooks/useActiveSection'
import { useI18n, useT } from '../i18n'
import LanguageToggle from './LanguageToggle'
import MobileMenu from './MobileMenu'

export default function Navbar({ theme, toggleTheme }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const active = useActiveSection()
  const { lang } = useI18n()
  const t = useT()

  const links = navLinks[lang]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        <div
          className={`transition-colors duration-300 ${
            scrolled
              ? 'border-b border-line/80 bg-paper/85 shadow-card backdrop-blur-xl dark:border-ink-line/70 dark:bg-ink/85'
              : 'border-b border-transparent bg-transparent'
          }`}
        >
          <nav
            aria-label={t('nav.aria')}
            className="section-shell flex items-center justify-between px-4 py-2.5 sm:px-5"
          >
            <a
              href="#top"
              className="font-display text-lg font-bold text-gray-900 rounded-lg focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none dark:text-mint"
            >
            {profile.name}
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {links.map((link) => {
              const isActive = active === link.href.slice(1)
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={`relative rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none ${
                      isActive
                        ? 'text-primary dark:text-primary-600'
                        : 'text-gray-600 hover:text-gray-900 dark:text-ink-muted dark:hover:text-mint'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span
                        className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-primary"
                        aria-hidden="true"
                      />
                    )}
                  </a>
                </li>
              )
            })}
          </ul>

          <div className="flex items-center gap-2">
            <LanguageToggle />

            <button
              type="button"
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? t('navbar.light') : t('navbar.dark')}
              className="flex size-10 items-center justify-center rounded-full border border-line text-gray-600 transition-colors duration-200 hover:border-primary hover:text-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none dark:border-ink-line dark:text-ink-muted dark:hover:text-primary-600"
            >
              <AnimatePresence mode="wait" initial={false}>
                <AnimateThemeIcon key={theme} dark={theme === 'dark'} />
              </AnimatePresence>
            </button>

            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label={t('navbar.openMenu')}
              aria-expanded={open}
              className="flex size-10 items-center justify-center rounded-full border border-line text-gray-700 transition-colors duration-200 hover:border-primary hover:text-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none lg:hidden dark:border-ink-line dark:text-mint dark:hover:text-primary-600"
            >
              <Menu className="size-5" />
            </button>
          </div>
          </nav>
        </div>
      </header>

      <AnimatePresence>
        {open && <MobileMenu open={open} onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </>
  )
}

function AnimateThemeIcon({ dark }) {
  const Icon = dark ? Sun : Moon
  return (
    <motion.span
      key={dark ? 'sun' : 'moon'}
      initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
      animate={{ rotate: 0, opacity: 1, scale: 1 }}
      exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
      transition={{ duration: 0.25 }}
      className="flex"
    >
      <Icon className="size-[18px]" strokeWidth={1.9} />
    </motion.span>
  )
}
