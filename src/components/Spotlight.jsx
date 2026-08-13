import { useEffect, useState } from 'react'
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'framer-motion'

export default function Spotlight() {
  const reduce = useReducedMotion()
  const [enabled, setEnabled] = useState(false)
  const x = useMotionValue(-600)
  const y = useMotionValue(-600)
  const sx = useSpring(x, { stiffness: 60, damping: 25, mass: 0.6 })
  const sy = useSpring(y, { stiffness: 60, damping: 25, mass: 0.6 })

  const light = useMotionTemplate`radial-gradient(480px circle at ${sx}px ${sy}px, rgba(6,91,50,0.08), transparent 65%)`
  const dark = useMotionTemplate`radial-gradient(480px circle at ${sx}px ${sy}px, rgba(11,122,68,0.12), transparent 65%)`

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (!window.matchMedia('(hover: hover)').matches) return
    setEnabled(true)
  }, [])

  useEffect(() => {
    if (!enabled) return
    const onMove = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [enabled, x, y])

  if (reduce || !enabled) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-[5]" aria-hidden="true">
      <motion.div className="absolute inset-0 opacity-100 dark:opacity-0" style={{ background: light }} />
      <motion.div className="absolute inset-0 opacity-0 dark:opacity-100" style={{ background: dark }} />
    </div>
  )
}
