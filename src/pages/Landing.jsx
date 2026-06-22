import { useLayoutEffect, useRef, useMemo } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import ArrowHero from '../components/ArrowHero.jsx'

const BASE = import.meta.env.BASE_URL
const CALENDLY = 'https://calendly.com/kamran1-sou9/new-meeting'
const CLIENTS = ['Lease At Ease', 'Lamar Donair', 'Ricco Decor', 'Empire Protection', 'Jawanda Consulting']

// Headline split into words so they can cascade in. `1` = carries the gradient.
const H1_WORDS = [
  ['Always'], ['pointed'], ['at'], ['your'], ['next'], ['customer.', 1],
]

export default function Landing() {
  const rootRef = useRef(null)

  // stable random barrage layout (memoised so it doesn't re-roll each render)
  const barrage = useMemo(
    () => Array.from({ length: 18 }, () => ({
      left: -10 + Math.random() * 34,   // start band: lower-left
      top: 56 + Math.random() * 56,
      size: 13 + Math.random() * 30,
    })),
    [],
  )

  useLayoutEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      const words = gsap.utils.toArray('.hw')
      if (reduce) {
        gsap.set(['.hero-arrow-fly', '.hero-copy .eyebrow', ...words, '.hero-sub', '.hero-cta'],
          { opacity: 1, x: 0, y: 0, scale: 1 })
        gsap.set('.barrage-arrow', { opacity: 0 })
        return
      }
      const T = Math.max(window.innerWidth, 900) * 1.1 // NE travel distance

      // initial (hidden) states — set in useLayoutEffect so there's no flash
      gsap.set('.hero-arrow-fly', { opacity: 0, xPercent: -85, yPercent: 85, scale: 0.55 })
      gsap.set('.hero-copy .eyebrow', { opacity: 0, y: 14 })
      gsap.set(words, { opacity: 0, y: 22 })
      gsap.set(['.hero-sub', '.hero-cta'], { opacity: 0, y: 16 })
      gsap.set('.barrage-arrow', { opacity: 0, x: 0, y: 0 })

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      // 1 — the lead arrow flies in along its NE axis and settles into place
      tl.to('.hero-arrow-fly', { opacity: 1, xPercent: 0, yPercent: 0, scale: 1, duration: 1.05, ease: 'power4.out' }, 0.1)
      // 2 — the barrage: a volley streaming NE across the hero
      tl.to('.barrage-arrow', {
        keyframes: { x: [0, T], y: [0, -T], opacity: [0, 0.95, 0.9, 0], easeEach: 'none' },
        duration: 1.15, ease: 'power1.in',
        stagger: { each: 0.05, from: 'start' },
      }, 0.5)
      // 3 — the words arrive (overlapping the tail of the barrage)
      tl.to('.hero-copy .eyebrow', { opacity: 1, y: 0, duration: 0.6 }, 0.95)
      tl.to(words, { opacity: 1, y: 0, duration: 0.55, stagger: 0.045 }, 1.2)
      tl.to('.hero-sub', { opacity: 1, y: 0, duration: 0.6 }, '>-0.25')
      tl.to('.hero-cta', { opacity: 1, y: 0, duration: 0.6 }, '<+0.12')

      window.__heroTL = tl // dev aid: seek the timeline to capture frames
    }, rootRef)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={rootRef}>
      {/* ===== HERO ===== */}
      <section className="hero">
        <div className="barrage" aria-hidden="true">
          {barrage.map((b, i) => (
            <img key={i} src={`${BASE}arrow-mark.png`} className="barrage-arrow" alt=""
              style={{ left: `${b.left}%`, top: `${b.top}%`, width: `${b.size}px`, opacity: 0 }} />
          ))}
        </div>
        <div className="container hero-grid">
          <div className="hero-copy">
            <div className="eyebrow">AI Lead-Gen · Websites · Automation</div>
            <h1 className="h1">
              {H1_WORDS.map(([w, grad], i) => (
                <span key={i} className={'hw' + (grad ? ' grad-text' : '')}>{w}</span>
              ))}
            </h1>
            <p className="lead hero-sub" style={{ marginTop: 24 }}>
              Lead-gen systems that find them, and conversion-built sites that close them — engineered, shipped, and running.
              Not campaigns. Systems.
            </p>
            <div className="cta-row hero-cta" style={{ marginTop: 34 }}>
              <a className="btn" href={CALENDLY} target="_blank" rel="noreferrer">Book a call</a>
              <a className="btn-ghost" href={CALENDLY} target="_blank" rel="noreferrer">Get a free audit</a>
            </div>
          </div>
          <div className="hero-arrow">
            <div className="hero-arrow-fly"><ArrowHero /></div>
          </div>
        </div>
      </section>

      {/* ===== TRUST ===== */}
      <section className="trust">
        <div className="container">
          <div className="trust-label">Trusted by Canadian businesses</div>
          <div className="trust-row">
            {CLIENTS.map((c) => (
              <span key={c}>{c}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TWO OFFERS ===== */}
      <section className="section">
        <div className="container">
          <div className="eyebrow" data-reveal style={{ display: 'block', textAlign: 'center' }}>
            What we build
          </div>
          <h2 className="h2" data-reveal style={{ textAlign: 'center', maxWidth: '16ch', margin: '0 auto 50px' }}>
            Two systems. One outcome — <span className="grad-text">revenue.</span>
          </h2>
          <div className="offer-grid">
            <Link to="/lead-gen" className="card offer-card" data-reveal>
              <div className="kicker-num">01</div>
              <h3 className="h3">Lead-Gen Systems</h3>
              <p>
                We dig your next customer out of the noise and turn them into a sale — targeting, multi-channel outreach,
                AI lead-scoring, and CRM automation, engineered as one system.
              </p>
              <span className="offer-link">Explore lead gen →</span>
            </Link>
            <Link to="/web-automation" className="card offer-card" data-reveal>
              <div className="kicker-num">02</div>
              <h3 className="h3">Websites + Automation</h3>
              <p>
                The front-end that closes them — plus the AI front desk that answers, follows up, and books appointments
                24/7. Exhibit A: this site.
              </p>
              <span className="offer-link">Explore web + automation →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ===== PROOF ===== */}
      <section className="section proof">
        <div className="container">
          <div className="eyebrow" data-reveal>Built, not bolted on</div>
          <h2 className="h2" data-reveal style={{ maxWidth: '18ch' }}>
            The systems run at scale — every day.
          </h2>
          <div className="metrics" data-reveal>
            <div className="metric">
              <div className="metric-n grad-text">88,000+</div>
              <div className="metric-l">prospects sourced</div>
            </div>
            <div className="metric">
              <div className="metric-n grad-text">30,000+</div>
              <div className="metric-l">leads AI-scored &amp; ranked</div>
            </div>
            <div className="metric">
              <div className="metric-n grad-text">1,700+</div>
              <div className="metric-l">leads actively worked</div>
            </div>
          </div>
          <blockquote className="quote" data-reveal>
            “The results were nothing short of exceptional — a fresh, data-driven approach to our campaigns.”
            <cite>
              — Harry Jawanda, Founder · Jawanda Consulting · <strong>3× qualified leads</strong>
            </cite>
          </blockquote>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="section cta-final">
        <div className="container center">
          <h2 className="h2" data-reveal style={{ maxWidth: '16ch', margin: '0 auto' }}>
            Let's build your <span className="grad-text">system.</span>
          </h2>
          <p className="lead center" data-reveal style={{ margin: '20px auto 32px' }}>
            Thirty minutes, no pitch. We'll show you where your pipeline's leaking and exactly what we'd build.
          </p>
          <div className="cta-row" data-reveal style={{ justifyContent: 'center' }}>
            <a className="btn" href={CALENDLY} target="_blank" rel="noreferrer">Book a call</a>
          </div>
        </div>
      </section>

      <style>{`
        .hero { position: relative; overflow: hidden; padding: 150px 0 30px; min-height: 92vh; display: flex; align-items: center; }
        .barrage { position: absolute; inset: 0; z-index: 0; pointer-events: none; }
        .barrage-arrow { position: absolute; will-change: transform, opacity; filter: drop-shadow(0 2px 8px rgba(0,0,0,.4)); }
        .hero-grid { position: relative; z-index: 1; display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 40px; align-items: center; }
        .hero-arrow { height: 540px; display: flex; align-items: center; justify-content: center; }
        .hero-arrow-fly { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; will-change: transform, opacity; }
        .hw { display: inline-block; margin-right: 0.22em; will-change: transform, opacity; }
        .trust { padding: 8px 0 26px; }
        .trust-label { font-family: var(--mono); font-size: 12px; letter-spacing: .16em; text-transform: uppercase; color: var(--muted); margin-bottom: 18px; }
        .trust-row { display: flex; gap: 40px; flex-wrap: wrap; font-family: var(--display); font-weight: 600; font-size: 20px; color: var(--ink-dim); opacity: .82; }
        .offer-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 22px; }
        .offer-card { display: flex; flex-direction: column; gap: 14px; min-height: 256px; }
        .offer-card p { color: var(--muted); line-height: 1.55; }
        .offer-link { margin-top: auto; color: var(--cyan); font-weight: 600; }
        .metrics { display: flex; gap: 64px; flex-wrap: wrap; margin: 40px 0; }
        .metric-n { font-family: var(--display); font-weight: 600; font-size: clamp(34px, 4vw, 52px); line-height: 1; }
        .metric-l { font-family: var(--mono); font-size: 13px; color: var(--muted); margin-top: 8px; }
        .quote { font-family: var(--display); font-weight: 500; font-size: clamp(20px, 2.4vw, 30px); line-height: 1.32; color: var(--ink); max-width: 26ch; margin-top: 12px; }
        .quote cite { display: block; font-family: var(--body); font-weight: 400; font-style: normal; font-size: 15px; color: var(--muted); margin-top: 18px; }
        .quote cite strong { color: var(--cyan); }
        @media (max-width: 860px) {
          .hero { padding: 120px 0 20px; }
          .hero-grid { grid-template-columns: 1fr; }
          .hero-arrow { height: 400px; order: -1; }
          .offer-grid { grid-template-columns: 1fr; }
          .metrics { gap: 36px; }
        }
      `}</style>
    </div>
  )
}
