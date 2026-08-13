import { ArrowUp } from 'lucide-react'
import { navLinks } from '../data/nav'
import { profile } from '../data/profile'
import { useI18n, useT } from '../i18n'
import SocialLinks from './SocialLinks'

export default function Footer() {
  const year = new Date().getFullYear()
  const { lang } = useI18n()
  const t = useT()
  const links = navLinks[lang]

  return (
    <footer className="bg-paper/60 dark:bg-ink-soft/40">
      <div className="section-shell py-12 sm:py-14">
        <div className="flex flex-col items-center gap-8 text-center">
          <a href="#top" className="font-display text-lg font-bold text-gray-900 dark:text-mint">
            {profile.name}
          </a>

          <p className="-mt-4 font-mono text-xs tracking-[0.25em] text-gray-500 uppercase dark:text-ink-muted">
            {profile[lang].role}
          </p>

          <nav aria-label={t('footer.navAria')}>
            <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-gray-600 transition-colors hover:text-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none rounded dark:text-ink-muted dark:hover:text-primary-600"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <SocialLinks />

          <div className="flex w-full items-center justify-between border-t border-line pt-6 dark:border-ink-line">
          <p className="text-xs text-gray-500 dark:text-ink-muted">
            {t('footer.builtWith', { year, name: profile.fullName })}
          </p>
            <a
              href="#top"
              aria-label={t('footer.backTop')}
              title={t('footer.backTop')}
              className="flex size-9 items-center justify-center rounded-full border border-line text-gray-600 transition-colors hover:border-primary hover:text-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none dark:border-ink-line dark:text-ink-muted dark:hover:text-primary-600"
            >
              <ArrowUp className="size-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
