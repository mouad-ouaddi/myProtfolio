import { motion } from 'framer-motion'
import { ArrowUpRight, Info } from 'lucide-react'
import { useI18n, useT, tr } from '../i18n'
import { GithubIcon } from './icons'

// Renders a real link, or a "bientôt disponible" button for placeholder URLs ('#').
function ProjectLink({ href, label, icon: Icon, style, t }) {
  const isPlaceholder = href === '#'
  const classes = `inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-medium transition-all duration-200 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none ${style}`

  if (isPlaceholder) {
    return (
      <button
        type="button"
        title={t('projects.comingSoon')}
        aria-disabled="true"
        className={`${classes} cursor-not-allowed opacity-60`}
        tabIndex={-1}
      >
        <Icon className="size-4" strokeWidth={1.9} />
        {label}
        <span className="font-mono text-[10px] uppercase opacity-70">{t('projects.soon')}</span>
      </button>
    )
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={classes}
    >
      <Icon className="size-4" strokeWidth={1.9} />
      {label}
    </a>
  )
}

export default function ProjectCard({ project, onOpen, variants }) {
  const { lang } = useI18n()
  const t = useT()
  const tagline = tr(project.tagline, lang)
  const description = tr(project.description, lang)

  return (
    <motion.article
      variants={variants}
      className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-paper shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card-lg dark:border-ink-line dark:bg-ink-soft"
    >
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-display text-xl font-bold text-gray-900 dark:text-mint">
              {project.name}
            </h3>
            <p className="mt-1 text-sm font-medium text-primary dark:text-primary-600">
              {tagline}
            </p>
          </div>
          <span className="font-mono shrink-0 rounded-md border border-line px-2 py-1 text-[11px] text-gray-500 dark:border-ink-line dark:text-ink-muted">
            {project.year}
          </span>
        </div>

        <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-ink-muted">
          {description}
        </p>

        <ul className="mt-4 flex flex-wrap gap-2" aria-label="Technologies">
          {project.tech.map((tech) => (
            <li
              key={tech}
              className="rounded-md bg-mint px-2.5 py-1 font-mono text-xs text-primary dark:bg-ink dark:text-primary-600"
            >
              {tech}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-line pt-5 dark:border-ink-line">
          <ProjectLink
            href={project.github}
            label="GitHub"
            icon={GithubIcon}
            t={t}
            style="bg-primary text-mint hover:bg-primary-600 hover:shadow-card"
          />
          <ProjectLink
            href={project.demo}
            label="Live Demo"
            icon={ArrowUpRight}
            t={t}
            style="border border-line text-gray-700 hover:border-primary hover:text-primary dark:border-ink-line dark:text-mint dark:hover:text-primary-600"
          />
          <button
            type="button"
            onClick={() => onOpen(project)}
            className="inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-medium text-gray-700 transition-all duration-200 hover:text-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none dark:text-mint dark:hover:text-primary-600"
          >
            <Info className="size-4" strokeWidth={1.9} />
            {t('projects.details')}
          </button>
        </div>
      </div>
    </motion.article>
  )
}
