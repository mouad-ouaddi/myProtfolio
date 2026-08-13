import { useEffect, useState } from 'react'
import { motion, useSpring, useReducedMotion, useMotionValue } from 'framer-motion'

export default function CustomCursor() {
  const reduce = useReducedMotion()
  const [enabled, setEnabled] = useState(false)
  const [hoverable, setHoverable] = useState(false)

  const rawX = useMotionValue(-9999)
  const rawY = useMotionValue(-9999)
  const x = useSpring(rawX, { stiffness: 400, damping: 30, mass: 0.4 })
  const y = useSpring(rawY, { stiffness: 400, damping: 30, mass: 0.4 })

  useEffect(() => {
    if (reduce) return
    if (typeof window === 'undefined') return
    if (!window.matchMedia('(hover: hover)').matches) return
    setEnabled(true)

    const onMove = (e) => {
      rawX.set(e.clientX)
      rawY.set(e.clientY)
    }
    const onOver = (e) => {
      const target = e.target
      if (
        target.closest('a, button, [role="button"], input, select, textarea, .cursor-pointer')
      ) {
        setHoverable(true)
      } else {
        setHoverable(false)
      }
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseover', onOver, { passive: true })
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
    }
  }, [reduce, rawX, rawY])

  if (reduce || !enabled) return null

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-[9999]"
      aria-hidden="true"
      style={{ x, y }}
    >
      <motion.div
        className="absolute top-0 left-0 -mt-3 -ml-3 h-6 w-6 rounded-full"
        style={{
          backgroundColor: hoverable
            ? 'rgba(11, 122, 68, 0.15)'
            : 'rgba(6, 91, 50, 0.08)',
          border: hoverable
            ? '2px solid #0b7a44'
            : '1px solid #065b32',
        }}
        animate={{ scale: hoverable ? 1.6 : 1 }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      />
      <motion.div
        className="absolute top-0 left-0 -mt-1.5 -ml-1.5 h-3 w-3 rounded-full bg-primary"
        animate={{ scale: hoverable ? 0 : 1 }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      />
    </motion.div>
  )
}
