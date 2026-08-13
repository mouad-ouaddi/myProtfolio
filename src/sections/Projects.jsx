import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import ProjectCard from '../components/ProjectCard'
import ProjectModal from '../components/ProjectModal'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import { projects } from '../data/projects'
import { useT } from '../i18n'

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
}

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
}

export default function Projects() {
  const [selected, setSelected] = useState(null)
  const t = useT()

  return (
    <section id="projects" className="scroll-mt-28 py-20 sm:py-28">
      <div className="section-shell">
        <SectionHeading
          eyebrow={t('projects.eyebrow')}
          title={t('projects.title')}
          description={t('projects.description')}
        />

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="grid gap-6 sm:grid-cols-2"
        >
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} variants={cardVariants} onOpen={setSelected} />
          ))}
        </motion.div>

        <Reveal delay={0.1} className="mt-12 text-center">
          <p className="font-mono text-sm text-gray-500 dark:text-ink-muted">
            {t('projects.otherProjectsBefore')}{' '}
            <a
              href="#contact"
              className="text-primary underline-offset-4 transition-colors hover:text-primary-600 hover:underline focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none rounded dark:text-primary-600"
            >
              {t('projects.contactWord')}
            </a>{' '}
            {t('projects.otherProjectsAfter')}
          </p>
        </Reveal>
      </div>

      <AnimatePresence>
        {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  )
}
