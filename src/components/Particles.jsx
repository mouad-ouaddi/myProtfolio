import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'

const MAX_COUNT = 240

export default function Particles() {
  const reduce = useReducedMotion()
  const canvasRef = useRef(null)

  useEffect(() => {
    if (reduce) return
    if (typeof window === 'undefined') return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let raf = 0
    let width = 0
    let height = 0
    let dpr = 1
    let mouseX = -9999
    let mouseY = -9999
    const particles = []

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = window.innerWidth
      height = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const init = () => {
      particles.length = 0
      const count = Math.min(MAX_COUNT, Math.max(48, Math.round((width * height) / 6500)))
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          r: Math.random() * 1.8 + 0.6,
          speed: Math.random() * 0.25 + 0.08,
          sway: Math.random() * 0.4 + 0.12,
          phase: Math.random() * Math.PI * 2,
          alpha: Math.random() * 0.45 + 0.15,
        })      }
    }

    let t = 0
    const tick = () => {
      t += 0.012
      ctx.clearRect(0, 0, width, height)

      const isDark = document.documentElement.classList.contains('dark')
      const color = isDark ? 'rgba(135, 167, 150,' : 'rgba(6, 91, 50,'

      for (const p of particles) {
        p.y -= p.speed
        p.x += Math.sin(t * 0.6 + p.phase) * 0.25
        if (p.y < -12) {
          p.y = height + 12
          p.x = Math.random() * width
        }
        if (p.x < -12) p.x = width + 12
        if (p.x > width + 12) p.x = -12

        const dx = p.x - mouseX
        const dy = p.y - mouseY
        const dist = Math.hypot(dx, dy)
        const radius = 110
        if (dist < radius && dist > 0.001) {
          const force = ((radius - dist) / radius) * 2.2
          p.x += (dx / dist) * force
          p.y += (dy / dist) * force
        }

        const pulse = 0.5 + 0.5 * Math.sin(t * 0.9 + p.phase * 3)
        const alpha = p.alpha * pulse
        ctx.save()
        ctx.shadowColor = `${color}${alpha * 0.9})`
        ctx.shadowBlur = 8
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `${color}${alpha})`
        ctx.fill()
        ctx.restore()
      }

      raf = requestAnimationFrame(tick)
    }

    resize()
    init()
    tick()

    const onResize = () => {
      resize()
      init()
    }
    const onMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY + window.scrollY
    }
    const onScroll = () => {
      resize()
    }
    window.addEventListener('resize', onResize)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('mousemove', onMove, { passive: true })

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('mousemove', onMove)
    }
  }, [reduce])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-[-1]"
      aria-hidden="true"
    />
  )
}
