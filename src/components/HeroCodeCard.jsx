import { motion, useReducedMotion } from 'framer-motion'
import { Braces, Coffee } from 'lucide-react'
import { GithubIcon } from './icons'
import { useI18n, useT } from '../i18n'

// Syntax-styled code card shown in the hero. Pure visual decoration.

function Token({ children, color }) {
  return <span className={color}>{children}</span>
}

const LINE_NUMS = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10']

const developer = {
  fr: {
    role: 'Développeur Full Stack',
    location: 'Casablanca',
    education: 'Bac+3',
    status: 'disponible',
    languages: ["'Français'", "'Arabe'", "'Anglais'"],
    focus: 'code propre · belle UI',
    funFact: 'code & café obligatoires',
  },
  en: {
    role: 'Full Stack Developer',
    location: 'Casablanca',
    education: 'Bac+3',
    status: 'available',
    languages: ["'French'", "'Arabic'", "'English'"],
    focus: 'clean code · nice UI',
    funFact: 'code & coffee required',
  },
}

export default function HeroCodeCard() {
  const reduce = useReducedMotion()
  const { lang } = useI18n()
  const t = useT()
  const d = developer[lang]

  return (
    <div className="relative mx-auto w-full max-w-md">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="relative"
      >
        {/* floating chips */}
        <motion.span
          animate={reduce ? {} : { y: [0, -8, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          className="font-mono absolute -top-5 -left-4 z-10 hidden items-center gap-1.5 rounded-lg border border-line bg-paper px-3 py-1.5 text-xs text-gray-700 shadow-card sm:flex dark:border-ink-line dark:bg-ink-soft dark:text-mint"
        >
          <Coffee className="size-3.5 text-primary dark:text-primary-600" strokeWidth={2} />
          {t('hero.card.chips')}
        </motion.span>
        <motion.span
          animate={reduce ? {} : { y: [0, 8, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
          className="font-mono absolute -right-4 -bottom-5 z-10 hidden items-center gap-1.5 rounded-lg border border-line bg-paper px-3 py-1.5 text-xs text-gray-700 shadow-card sm:flex dark:border-ink-line dark:bg-ink-soft dark:text-mint"
        >
          <GithubIcon className="size-3.5 text-primary dark:text-primary-600" />
          {t('hero.card.availableChip')}
        </motion.span>

        <div className="overflow-hidden rounded-2xl border border-line bg-paper shadow-card-lg dark:border-ink-line dark:bg-ink-soft">
          <div className="flex min-w-0 items-center gap-2 border-b border-line px-4 py-3 dark:border-ink-line">
            <span className="size-3 rounded-full bg-[#ff5f56]" aria-hidden="true" />
            <span className="size-3 rounded-full bg-[#ffbd2e]" aria-hidden="true" />
            <span className="size-3 rounded-full bg-[#27c93f]" aria-hidden="true" />
            <span className="font-mono ml-2 flex min-w-0 items-center gap-1.5 text-xs text-gray-500 dark:text-ink-muted">
              <Braces className="size-3.5 shrink-0 text-primary dark:text-primary-600" />
              <span className="truncate">developer.mouad</span>
            </span>
          </div>

          <div className="flex overflow-x-auto p-4 sm:p-6">
            <pre className="font-mono flex shrink-0 flex-col gap-1 text-[11px] leading-6 select-none sm:text-[13px]">
              {LINE_NUMS.map((n) => (
                <span key={n} className="pr-3 text-right text-gray-300 dark:text-ink-line sm:pr-4">
                  {n}
                </span>
              ))}
            </pre>
            <pre className="font-mono text-[11px] leading-6 sm:text-[13px]">
              <code>
                <Token color="text-primary-600">const</Token>{' '}
                <Token color="text-gray-800 dark:text-mint">developer</Token> = {'{'}{'\n'}
                {'  '}
                <Token color="text-gray-500 dark:text-ink-muted">name</Token>:{' '}
                <Token color="text-[#0b7a44]">'Mouad'</Token>,{'\n'}
                {'  '}
                <Token color="text-gray-500 dark:text-ink-muted">role</Token>:{' '}
                <Token color="text-[#0b7a44]">'{d.role}'</Token>,{'\n'}
                {'  '}
                <Token color="text-gray-500 dark:text-ink-muted">location</Token>:{' '}
                <Token color="text-[#0b7a44]">'{d.location}'</Token>,{'\n'}
                {'  '}
                <Token color="text-gray-500 dark:text-ink-muted">education</Token>:{' '}
                <Token color="text-[#0b7a44]">'{d.education}'</Token>,{'\n'}
                {'  '}
                <Token color="text-gray-500 dark:text-ink-muted">status</Token>:{' '}
                <Token color="text-[#0b7a44]">'{d.status}'</Token>,{'\n'}
                {'  '}
                <Token color="text-gray-500 dark:text-ink-muted">ready</Token>:{' '}
                <Token color="text-primary-600">true</Token>,{'\n'}
                {'  '}
                <Token color="text-gray-500 dark:text-ink-muted">languages</Token>:{' ['}
                <Token color="text-primary-600">{d.languages.join(', ')}</Token>
                {']'},{'\n'}
                {'  '}
                <Token color="text-gray-500 dark:text-ink-muted">focus</Token>:{' '}
                <Token color="text-[#0b7a44]">'{d.focus}'</Token>,{'\n'}
                {'  '}
                <Token color="text-gray-500 dark:text-ink-muted">funFact</Token>:{' '}
                <Token color="text-[#0b7a44]">'{d.funFact}'</Token>{'\n'}
                {'}'};
              </code>
            </pre>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
