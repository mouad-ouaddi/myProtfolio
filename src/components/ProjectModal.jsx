import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, X } from 'lucide-react'
import { useI18n, useT, tr } from '../i18n'
import { GithubIcon } from './icons'

export default function ProjectModal({ project, onClose }) {
  const { lang } = useI18n()
  const t = useT()
  const tagline = tr(project.tagline, lang)
  const description = tr(project.description, lang)
  const overview = tr(project.overview, lang)

  useEffect(() => {
    if (!project) return undefined
    const original = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = original
      window.removeEventListener('keydown', onKey)
    }
  }, [project, onClose])

  if (!project) return null

  return (
    <div
      className="fixed inset-0 z-[70] flex items-end justify-center p-0 sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={t('projects.detailsAria', { name: project.name })}
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
        className="relative max-h-[88vh] w-full overflow-y-auto rounded-t-3xl border border-line bg-paper shadow-card-lg sm:max-w-lg sm:rounded-3xl dark:border-ink-line dark:bg-ink-soft"
      >
        <button
          type="button"
          onClick={onClose}
          autoFocus
          aria-label={t('projects.close')}
          className="absolute top-4 right-4 z-10 flex size-9 items-center justify-center rounded-full border border-line bg-paper/80 text-gray-700 backdrop-blur-sm transition-colors hover:border-primary hover:text-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none dark:border-ink-line dark:bg-ink-soft/80 dark:text-mint dark:hover:text-primary-600"
        >
          <X className="size-4" />
        </button>

        <div className="p-6 sm:p-8">
          <span className="font-mono text-xs font-semibold tracking-[0.25em] text-primary uppercase dark:text-primary-600">
            {t('projects.projectLabel', { year: project.year })}
          </span>
          <h3 className="font-display mt-2 text-2xl font-bold text-gray-900 dark:text-mint">
            {project.name}
          </h3>
          <p className="mt-1 text-sm font-medium text-gray-500 dark:text-ink-muted">
            {tagline}
          </p>

          <p className="mt-5 text-sm leading-relaxed text-gray-600 dark:text-ink-muted">
            {description}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-ink-muted">
            {overview}
          </p>

          <ul className="mt-6 flex flex-wrap gap-2" aria-label="Technologies">
            {project.tech.map((tech) => (
              <li
                key={tech}
                className="rounded-md bg-mint px-2.5 py-1 font-mono text-xs text-primary dark:bg-ink dark:text-primary-600"
              >
                {tech}
              </li>
            ))}
          </ul>

          <div className="mt-7 flex flex-wrap gap-2 border-t border-line pt-6 dark:border-ink-line">
            {project.github !== '#' && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-mint transition-colors hover:bg-primary-600 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
              >
                <GithubIcon className="size-4" />
                {t('projects.seeCode')}
              </a>
            )}
            {project.demo !== '#' && (
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border border-line px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:border-primary hover:text-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none dark:border-ink-line dark:text-mint dark:hover:text-primary-600"
              >
                <ArrowUpRight className="size-4" strokeWidth={1.9} />
                Live Demo
              </a>
            )}
            {project.github === '#' && project.demo === '#' && (
              <p className="font-mono text-xs text-gray-500 dark:text-ink-muted">
                {t('projects.linksSoon')}
              </p>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  )
}
