import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Download, X } from 'lucide-react'
import { profile } from '../data/profile'
import { useT } from '../i18n'

export default function CvModal({ onClose }) {
  const t = useT()

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
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center p-0 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={t('cvModal.title')}
    >
      <motion.button
        type="button"
        aria-label={t('projects.closeDetails')}
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-ink/60 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      />

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.98 }}
        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
        className="relative flex h-[88vh] w-full max-w-3xl flex-col overflow-hidden rounded-t-3xl border border-line bg-paper shadow-card-lg sm:rounded-3xl dark:border-ink-line dark:bg-ink-soft"
      >
        <div className="flex items-center justify-between gap-3 border-b border-line px-5 py-3.5 dark:border-ink-line">
          <span className="font-display text-sm font-bold text-gray-900 dark:text-mint">
            {t('cvModal.title')}
          </span>
          <div className="flex items-center gap-2">
            <a
              href={profile.cvUrl}
              download
              className="inline-flex items-center gap-1.5 rounded-lg border border-line px-3 py-2 text-xs font-medium text-gray-700 transition-colors hover:border-primary hover:text-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none dark:border-ink-line dark:text-mint dark:hover:text-primary-600"
            >
              <Download className="size-3.5" strokeWidth={2} />
              {t('hero.cvCta')}
            </a>
            <button
              type="button"
              onClick={onClose}
              aria-label={t('projects.close')}
              className="flex size-9 items-center justify-center rounded-full border border-line text-gray-700 transition-colors hover:border-primary hover:text-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none dark:border-ink-line dark:text-mint dark:hover:text-primary-600"
            >
              <X className="size-4" />
            </button>
          </div>
        </div>

        <iframe
          src={profile.cvUrl}
          title={t('cvModal.title')}
          type="application/pdf"
          className="min-h-0 flex-1 bg-paper dark:bg-ink"
        />
      </motion.div>
    </div>
  )
}
