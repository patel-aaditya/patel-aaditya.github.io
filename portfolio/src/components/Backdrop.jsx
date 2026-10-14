import { useEffect, useRef } from 'react'

const REDUCED = typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches
const INK = '#050505'
const PAPER = '#f5f5f0'
const TILT = -0.34

// Ribbons that run between two sine-wave edges. y is the centre as a fraction of the long side, t the thickness,
// a the wave height, k how many waves fit across, s the speed in radians per second (the sign is the direction)
// and p the starting phase. `edge` puts a thin white line along one side of a black ribbon.
const RIBBONS = [
  { y: -0.5, t: 0.1, a: 0.045, k: 1.1, s: 0.22, p: 0.0, c: INK, edge: 1 },
  { y: -0.27, t: 0.05, a: 0.06, k: 1.5, s: -0.3, p: 1.7, c: INK, edge: -1 },
  { y: -0.06, t: 0.14, a: 0.04, k: 0.9, s: 0.18, p: 3.1, c: INK, edge: 1 },
  { y: 0.12, t: 0.032, a: 0.05, k: 1.2, s: 0.24, p: 0.8, c: PAPER, edge: 0 },
  { y: 0.26, t: 0.06, a: 0.055, k: 1.3, s: -0.26, p: 4.4, c: INK, edge: -1 },
  { y: 0.44, t: 0.1, a: 0.05, k: 1.0, s: 0.2, p: 5.5, c: INK, edge: 1 },
]

const mix = (r, u, t, surge) => {
  const dir = Math.sign(r.s)
  const wave = Math.sin(Math.PI * 2 * r.k * u + r.s * t + r.p + surge * dir)
  const swell = 1 + 0.3 * Math.sin(Math.PI * 2 * r.k * 0.7 * u + r.s * 0.8 * t + r.p * 1.3)
  return { c: r.y + r.a * wave, th: r.t * swell }
}

// Slow, smooth blue waves with black and white ribbons and a halftone drift. `kick` changes whenever the
// highlighted word changes, and sends a single ripple through the waves.
export default function Backdrop({ kick = 0 }) {
  const ref = useRef(null)
  const state = useRef({ last: kick, v: 0 })

  useEffect(() => {
    if (state.current.last !== kick) {
      state.current.last = kick
      state.current.v = 1
    }
  }, [kick])

  useEffect(() => {
    const cv = ref.current
    const ctx = cv.getContext('2d')
    let w = 0
    let h = 0
    let dpr = 1
    let raf = 0
    let t = 0
    let prev = 0
    const dots = document.createElement('canvas')

    // halftone dots: big at the bottom left, fading out toward the top right. Drawn once per resize.
    const buildDots = () => {
      const pad = 90
      dots.width = Math.round(w + pad * 2)
      dots.height = Math.round(h + pad * 2)
      const d = dots.getContext('2d')
      d.clearRect(0, 0, dots.width, dots.height)
      d.fillStyle = 'rgba(4,16,150,0.55)'
      const step = 17
      for (let y = 0; y < dots.height; y += step) {
        for (let x = 0; x < dots.width; x += step) {
          const f = 1 - (x / dots.width) * 0.7 - (1 - y / dots.height) * 0.7
          const r = Math.max(0, Math.min(1, f)) * 5.6
          if (r < 0.6) continue
          d.beginPath()
          d.arc(x + ((y / step) % 2 ? step / 2 : 0), y, r, 0, Math.PI * 2)
          d.fill()
        }
      }
    }

    const draw = () => {
      const s = state.current
      const surge = s.v * 1.1
      const S = Math.max(w, h)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const g = ctx.createRadialGradient(w * 0.6, h * 0.42, 0, w * 0.6, h * 0.42, Math.max(w, h) * 0.85)
      g.addColorStop(0, '#2b55ff')
      g.addColorStop(0.55, '#1138ff')
      g.addColorStop(1, '#0a22bf')
      ctx.fillStyle = g
      ctx.fillRect(0, 0, w, h)

      ctx.drawImage(dots, -90 + Math.sin(t * 0.05) * 36, -90 + Math.cos(t * 0.04) * 28, dots.width / 1, dots.height / 1)

      ctx.save()
      ctx.translate(w / 2, h / 2)
      ctx.rotate(TILT)
      const N = 64
      const path = (r, side, offset) => {
        for (let i = 0; i <= N; i++) {
          const u = -0.75 + (1.5 * i) / N
          const m = mix(r, u, t, surge)
          const y = (m.c + side * (m.th / 2 + offset)) * S
          if (i === 0) ctx.moveTo(u * S, y)
          else ctx.lineTo(u * S, y)
        }
      }
      for (const r of RIBBONS) {
        ctx.beginPath()
        path(r, -1, 0)
        for (let i = N; i >= 0; i--) {
          const u = -0.75 + (1.5 * i) / N
          const m = mix(r, u, t, surge)
          ctx.lineTo(u * S, (m.c + m.th / 2) * S)
        }
        ctx.closePath()
        ctx.fillStyle = r.c
        ctx.fill()
        if (r.edge) {
          // a thin white line riding just outside one edge of the black ribbon
          const side = r.edge
          const gap = 0.012
          const lw = 0.011
          ctx.beginPath()
          for (let i = 0; i <= N; i++) {
            const u = -0.75 + (1.5 * i) / N
            const m = mix(r, u, t, surge)
            const y = (m.c + side * (m.th / 2 + gap)) * S
            if (i === 0) ctx.moveTo(u * S, y)
            else ctx.lineTo(u * S, y)
          }
          for (let i = N; i >= 0; i--) {
            const u = -0.75 + (1.5 * i) / N
            const m = mix(r, u, t, surge)
            ctx.lineTo(u * S, (m.c + side * (m.th / 2 + gap + lw)) * S)
          }
          ctx.closePath()
          ctx.fillStyle = PAPER
          ctx.fill()
        }
      }
      ctx.restore()

      const v = ctx.createRadialGradient(w / 2, h / 2, Math.min(w, h) * 0.4, w / 2, h / 2, Math.hypot(w, h) * 0.62)
      v.addColorStop(0, 'rgba(0,0,0,0)')
      v.addColorStop(1, 'rgba(0,0,0,0.5)')
      ctx.fillStyle = v
      ctx.fillRect(0, 0, w, h)
    }

    const resize = () => {
      const r = cv.getBoundingClientRect()
      dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      w = r.width
      h = r.height
      cv.width = Math.max(1, Math.round(w * dpr))
      cv.height = Math.max(1, Math.round(h * dpr))
      buildDots()
      draw()
    }

    const loop = (now) => {
      const dt = prev ? Math.min(0.05, (now - prev) / 1000) : 0
      prev = now
      t += dt
      state.current.v *= Math.exp(-dt * 2.4)
      draw()
      raf = requestAnimationFrame(loop)
    }

    resize()
    let ro = null
    if (window.ResizeObserver) {
      ro = new ResizeObserver(resize)
      ro.observe(cv)
    } else {
      window.addEventListener('resize', resize)
    }
    if (!REDUCED) raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      if (ro) ro.disconnect()
      else window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={ref} className="backdrop" aria-hidden="true" />
}
