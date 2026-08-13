import { useEffect, useState } from 'react'
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'framer-motion'

const DOTS = {
  backgroundImage:
    'radial-gradient(circle at center, currentColor 1.5px, transparent 2px)',
  backgroundSize: '24px 24px',
}

const BIG_DOTS = {
  backgroundImage:
    'radial-gradient(circle at center, currentColor 3px, transparent 3.5px)',
  backgroundSize: '24px 24px',
}

function Aurora({ className, animate, transition }) {
  return (
    <motion.div
      className={`absolute rounded-full blur-[100px] ${className}`}
      animate={animate}
      transition={transition}
      aria-hidden="true"
    />
  )
}

export default function Background() {
  const reduce = useReducedMotion()
  const [enabled, setEnabled] = useState(false)

  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const x = useSpring(rawX, { stiffness: 120, damping: 24, mass: 0.4 })
  const y = useSpring(rawY, { stiffness: 120, damping: 24, mass: 0.4 })

  const mask = useMotionTemplate`radial-gradient(circle 150px at ${x}px ${y}px, black 45%, transparent 80%)`

  useEffect(() => {
    if (reduce) return
    if (typeof window === 'undefined') return
    if (!window.matchMedia('(hover: hover)').matches) return
    setEnabled(true)
    const onMove = (e) => {
      rawX.set(e.clientX)
      rawY.set(e.clientY + window.scrollY)
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [reduce, rawX, rawY])

  const drift = (duration, delay = 0) => ({
    animate: reduce
      ? undefined
      : { x: [0, 45, -35, 0], y: [0, -30, 35, 0], scale: [1, 1.12, 0.96, 1] },
    transition: reduce
      ? undefined
      : { duration, delay, repeat: Infinity, ease: 'easeInOut' },
  })

  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
      {/* base dot grid — light / dark variants */}
      <div
        className="absolute inset-0 text-primary/25 dark:text-primary-600/15 dark:opacity-0"
        style={{
          ...DOTS,
          maskImage: 'radial-gradient(ellipse at 50% 0%, black 55%, transparent 92%)',
          WebkitMaskImage: 'radial-gradient(ellipse at 50% 0%, black 55%, transparent 92%)',
        }}
      />
      <div
        className="absolute inset-0 text-ink-muted/25 opacity-0 dark:opacity-100"
        style={{
          ...DOTS,
          maskImage: 'radial-gradient(ellipse at 50% 0%, black 55%, transparent 92%)',
          WebkitMaskImage: 'radial-gradient(ellipse at 50% 0%, black 55%, transparent 92%)',
        }}
      />

      {/* magnifier — bigger dots in a circle that follows the cursor */}
      {enabled && (
        <>
          <motion.div
            className="absolute inset-0 text-primary/55 dark:text-primary-600/35 dark:opacity-0"
            style={{ ...BIG_DOTS, WebkitMaskImage: mask, maskImage: mask }}
          />
          <motion.div
            className="absolute inset-0 text-ink-muted/55 opacity-0 dark:opacity-100"
            style={{ ...BIG_DOTS, WebkitMaskImage: mask, maskImage: mask }}
          />
        </>
      )}

      {/* aurora blobs */}
      <div className="absolute inset-0">
        <Aurora
          className="top-[-10%] left-[-8%] h-[520px] w-[620px] bg-primary/25 dark:bg-primary/30"
          {...drift(16)}
        />
        <Aurora
          className="top-[22%] right-[-10%] h-[480px] w-[560px] bg-primary-600/25 dark:bg-primary-600/35"
          {...drift(18, 2)}
        />
        <Aurora
          className="bottom-[-20%] left-[15%] h-[560px] w-[680px] bg-primary-700/20 dark:bg-primary-700/25"
          {...drift(20, 4)}
        />
      </div>
    </div>
  )
}
