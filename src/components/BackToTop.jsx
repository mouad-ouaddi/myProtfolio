import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useT } from '../i18n'

export default function BackToTop() {
  const [visible, setVisible] = useState(false)
  const reduce = useReducedMotion()
  const t = useT()

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.a
      href="#top"
      aria-label={t('footer.backTop')}
      title={t('footer.backTop')}
      initial={false}
      animate={
        visible
          ? { opacity: 1, x: '-50%', y: 0 }
          : { opacity: 0, x: '-50%', y: reduce ? -8 : -16 }
      }
      transition={{ duration: 0.3, ease: 'easeOut' }}
      tabIndex={visible ? 0 : -1}
      className="pointer-events-auto fixed top-24 left-1/2 z-40 inline-flex items-center gap-1.5 rounded-full border border-line bg-paper px-4 py-2 text-xs font-semibold text-gray-700 shadow-card transition-colors duration-200 hover:border-primary hover:bg-primary hover:text-mint focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none dark:border-ink-line dark:bg-ink-soft dark:text-mint dark:hover:bg-primary"
    >
      <ArrowUp className="size-3.5" strokeWidth={2.2} />
      {t('footer.backTop')}
    </motion.a>
  )
}
