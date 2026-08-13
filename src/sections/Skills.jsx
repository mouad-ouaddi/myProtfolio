import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Database, Monitor, Server, Webhook, Wrench } from 'lucide-react'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import { skillCategories } from '../data/skills'
import { useI18n, useT } from '../i18n'
import {
  CssIcon,
  DockerIcon,
  ExpressIcon,
  FigmaIcon,
  GitIcon,
  GithubBrandIcon,
  HtmlIcon,
  JavaScriptIcon,
  LaravelIcon,
  MongodbIcon,
  MysqlIcon,
  NextJsIcon,
  NodeJsIcon,
  OracleIcon,
  PhpIcon,
  PythonIcon,
  ReactIcon,
  SpringBootIcon,
} from '../components/icons'

const ICONS = {
  Monitor,
  Server,
  Database,
  Wrench,
}

const TOOL_ICONS = {
  React: ReactIcon,
  JavaScript: JavaScriptIcon,
  Html: HtmlIcon,
  Css: CssIcon,
  NextJs: NextJsIcon,
  Laravel: LaravelIcon,
  Php: PhpIcon,
  NodeJs: NodeJsIcon,
  Express: ExpressIcon,
  Python: PythonIcon,
  SpringBoot: SpringBootIcon,
  Api: Webhook,
  Mysql: MysqlIcon,
  Mongodb: MongodbIcon,
  Oracle: OracleIcon,
  Git: GitIcon,
  GitHub: GithubBrandIcon,
  Figma: FigmaIcon,
  Docker: DockerIcon,
}

export default function Skills() {
  const [selected, setSelected] = useState(skillCategories.fr[0].id)
  const { lang } = useI18n()
  const t = useT()
  const categories = skillCategories[lang]
  const category = categories.find((c) => c.id === selected)

  return (
    <section id="skills" className="scroll-mt-28 bg-paper/50 py-20 sm:py-28 dark:bg-ink-soft/30">
      <div className="section-shell">
        <SectionHeading
          eyebrow={t('skills.eyebrow')}
          title={t('skills.title')}
          description={t('skills.description')}
        />

        <div className="mx-auto max-w-4xl">
          <Reveal>
            <div
              role="tablist"
              aria-label={t('skills.tabsAria')}
              className="flex flex-wrap justify-center gap-2"
            >
              {categories.map((cat) => {
                const CatIcon = ICONS[cat.icon]
                const isActive = selected === cat.id
                return (
                  <button
                    key={cat.id}
                    type="button"
                    role="tab"
                    id={`tab-${cat.id}`}
                    aria-selected={isActive}
                    aria-controls={`panel-${cat.id}`}
                    onClick={() => setSelected(cat.id)}
                    className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition-all duration-200 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none ${
                      isActive
                        ? 'border-primary bg-primary text-mint shadow-card'
                        : 'border-line bg-paper text-gray-600 hover:border-primary hover:text-primary dark:border-ink-line dark:bg-ink-soft dark:text-ink-muted dark:hover:text-primary-600'
                    }`}
                  >
                    <CatIcon className="size-4" strokeWidth={2} />
                    {cat.label}
                  </button>
                )
              })}
            </div>
          </Reveal>

          <Reveal delay={0.1} className="mt-8">
            <div
              role="tabpanel"
              id={`panel-${category.id}`}
              aria-labelledby={`tab-${category.id}`}
              className="rounded-2xl border border-line bg-paper p-6 shadow-card sm:p-8 dark:border-ink-line dark:bg-ink-soft"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="flex flex-wrap justify-center gap-6" aria-label={category.label}>
                    {category.skills.map((skill) => {
                      const ToolIcon = TOOL_ICONS[skill.icon]
                      return (
                        <div key={skill.name} className="flex w-20 flex-col items-center gap-2">
                          <span
                            title={skill.name}
                            aria-label={skill.name}
                            className="flex size-16 items-center justify-center rounded-2xl border border-line bg-mint text-gray-700 transition-colors duration-200 hover:border-primary hover:text-primary dark:border-ink-line dark:bg-ink dark:text-mint dark:hover:text-primary-600"
                          >
                            <ToolIcon className="size-8" />
                          </span>
                          <span className="text-center text-sm font-medium text-gray-800 dark:text-mint">
                            {skill.name}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
