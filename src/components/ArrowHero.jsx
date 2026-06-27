import { useEffect, useRef } from 'react'

const BASE = import.meta.env.BASE_URL
const ENERGY = `${BASE}arrow-energy-up.png`

// Energy diamond-A arrow that stays ALIVE: a rAF loop continuously rotates it so its
// tip aims at the "Book a call" button (.nav-cta), re-aiming smoothly as you scroll.
// A faint idle sway keeps it breathing; IntersectionObserver pauses the math off-screen;
// reduced-motion snaps without sway. The asset itself carries the glow + twister tail.
export default function ArrowHero() {
  const elRef = useRef(null)

  useEffect(() => {
    const el = elRef.current
    if (!el) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let raf, cur = 45, visible = true
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting }, { rootMargin: '140px' })
    io.observe(el)

    const tick = (t) => {
      raf = requestAnimationFrame(tick)
      if (!visible) return
      const a = el.getBoundingClientRect()
      const ax = a.left + a.width / 2
      const ay = a.top + a.height / 2
      const cta = document.querySelector('.nav-cta')
      let target = 45
      if (cta) {
        const c = cta.getBoundingClientRect()
        target = Math.atan2((c.top + c.height / 2) - ay, (c.left + c.width / 2) - ax) * 180 / Math.PI + 90
      }
      if (!reduce) target += Math.sin(t / 950) * 2
      cur += (target - cur) * (reduce ? 1 : 0.1)
      el.style.transform = `rotate(${cur.toFixed(2)}deg)`
    }
    raf = requestAnimationFrame(tick)
    return () => { cancelAnimationFrame(raf); io.disconnect() }
  }, [])

  return (
    <div className="arrow-stage">
      <div className="arrow-aura" />
      <img ref={elRef} className="arrow-2d" src={ENERGY} alt="Acquaint — energy diamond-A arrow" />
      <style>{`
        .arrow-stage { position: relative; display: flex; align-items: center; justify-content: center; width: 100%; height: 100%; }
        .arrow-aura { position: absolute; width: 400px; height: 400px; left: 50%; top: 50%; transform: translate(-50%,-50%);
          background: radial-gradient(circle, rgba(90,170,255,.16), rgba(45,110,235,.06) 42%, transparent 70%); filter: blur(20px); pointer-events: none; }
        .arrow-2d { height: 500px; width: auto; transform: rotate(45deg); transform-origin: 50% 50%; will-change: transform; }
      `}</style>
    </div>
  )
}
