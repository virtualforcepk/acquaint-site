import { useEffect, useRef } from 'react'

const BASE = import.meta.env.BASE_URL
const HEAD = `${BASE}diamond-solid-white.png`

// Flat 2D connected arrow that stays ALIVE: a rAF loop continuously rotates it so its
// tip aims at the "Book a call" button (.nav-cta), re-aiming smoothly as you scroll.
// A faint idle sway keeps it breathing when the page is still. IntersectionObserver
// pauses the math when it scrolls out of view; reduced-motion snaps without sway.
export default function ArrowHero() {
  const svgRef = useRef(null)

  useEffect(() => {
    const svg = svgRef.current
    if (!svg) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let raf, cur = 45, visible = true
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting }, { rootMargin: '140px' })
    io.observe(svg)

    const tick = (t) => {
      raf = requestAnimationFrame(tick)
      if (!visible) return
      const a = svg.getBoundingClientRect()
      const ax = a.left + a.width / 2
      const ay = a.top + a.height / 2
      const cta = document.querySelector('.nav-cta')
      let target = 45
      if (cta) {
        const c = cta.getBoundingClientRect()
        target = Math.atan2((c.top + c.height / 2) - ay, (c.left + c.width / 2) - ax) * 180 / Math.PI + 90
      }
      if (!reduce) target += Math.sin(t / 950) * 2 // subtle idle breathing
      cur += (target - cur) * (reduce ? 1 : 0.1)   // smooth follow
      svg.style.transform = `rotate(${cur.toFixed(2)}deg)`
    }
    raf = requestAnimationFrame(tick)
    return () => { cancelAnimationFrame(raf); io.disconnect() }
  }, [])

  return (
    <div className="arrow-stage">
      <div className="arrow-aura" />
      <svg ref={svgRef} className="arrow-2d" viewBox="0 0 264 470" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="inv" x="-5%" y="-5%" width="110%" height="110%">
            <feColorMatrix type="matrix" values="-1 0 0 0 1  0 -1 0 0 1  0 0 -1 0 1  0 0 0 1 0" />
          </filter>
          <clipPath id="flL"><path d="M132 252 C108 274, 90 302, 91 334 C94 364, 110 378, 118 408 Z" /></clipPath>
          <clipPath id="flR"><path d="M132 252 C156 274, 174 302, 173 334 C170 364, 154 378, 146 408 Z" /></clipPath>
        </defs>
        {/* shaft first — runs up into the head and down into the fletching (the connector) */}
        <rect x="127.5" y="78" width="10" height="298" rx="5" fill="#e9f0fb" />
        {/* head: clean solid diamond-A */}
        <image href={HEAD} x="31" y="-2" width="202" height="202" />
        {/* fletching */}
        <path d="M132 252 C108 274, 90 302, 91 334 C94 364, 110 378, 118 408 Z" fill="#e9f0fb" />
        <path d="M132 252 C156 274, 174 302, 173 334 C170 364, 154 378, 146 408 Z" fill="#e9f0fb" />
        <g clipPath="url(#flL)"><line x1="132" y1="258" x2="118" y2="408" stroke="#0a0f1a" strokeWidth="2.6" /></g>
        <g clipPath="url(#flR)"><line x1="132" y1="258" x2="146" y2="408" stroke="#0a0f1a" strokeWidth="2.6" /></g>
      </svg>
      <style>{`
        .arrow-stage { position: relative; display: flex; align-items: center; justify-content: center; width: 100%; height: 100%; }
        .arrow-aura { position: absolute; width: 360px; height: 360px; left: 50%; top: 50%; transform: translate(-50%,-50%);
          background: radial-gradient(circle, rgba(233,240,251,.09), transparent 68%); filter: blur(18px); pointer-events: none; }
        .arrow-2d { height: 440px; width: auto; transform: rotate(45deg); transform-origin: 50% 50%; will-change: transform;
          filter: drop-shadow(0 6px 20px rgba(0,0,0,.45)); }
        /* rotation is driven live by JS — it tracks the Book-a-call button as you scroll */
      `}</style>
    </div>
  )
}
