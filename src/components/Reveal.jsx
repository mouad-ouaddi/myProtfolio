import { motion, useReducedMotion } from 'framer-motion'

// Scroll-reveal wrapper. Fades/slides content in when it enters the viewport.
// Respects prefers-reduced-motion.
export default function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
  once = true,
  ...props
}) {
  const reduce = useReducedMotion()

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-80px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      {...props}
    >
      {children}
    </motion.div>
  )
}
