import { useLayoutEffect, useRef, useMemo } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const BASE = import.meta.env.BASE_URL
const CALENDLY = 'https://calendly.com/kamran1-sou9/new-meeting'
const CLIENTS = ['Lease At Ease', 'Lamar Donair', 'Ricco Decor', 'Empire Protection', 'Jawanda Consulting']

// Headline split into words so they cascade in. `1` = carries the gradient.
const H1_WORDS = [
  ['Always'], ['pointed'], ['at'], ['your'], ['next'], ['customer.', 1],
]

export default function Landing() {
  const rootRef = useRef(null)

  // Ambient arrow field — some are in view from the start, the rest stream up
  // from below as you scroll. All fly NE (toward the Book-a-call corner).
  const barrage = useMemo(
    () => Array.from({ length: 28 }, () => ({
      left: -6 + Math.random() * 108,    // vw
      top: 6 + Math.random() * 200,      // vh — spread across + far below the fold
      size: 12 + Math.random() * 30,     // px
      speed: 0.7 + Math.random() * 1.4,  // travel multiplier
      op: 0.10 + Math.random() * 0.26,   // faint
    })),
    [],
  )

  // Hero intro: the headline + supporting copy cascade in (no arrow anymore).
  useLayoutEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      const words = gsap.utils.toArray('.hw')
      if (reduce) {
        gsap.set(['.hero-copy .eyebrow', ...words, '.hero-sub', '.hero-cta'], { opacity: 1, x: 0, y: 0 })
        return
      }
      gsap.set('.hero-copy .eyebrow', { opacity: 0, y: 14 })
      gsap.set(words, { opacity: 0, y: 22 })
      gsap.set(['.hero-sub', '.hero-cta'], { opacity: 0, y: 16 })

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.to('.hero-copy .eyebrow', { opacity: 1, y: 0, duration: 0.6 }, 0.1)
      tl.to(words, { opacity: 1, y: 0, duration: 0.55, stagger: 0.05 }, 0.3)
      tl.to('.hero-sub', { opacity: 1, y: 0, duration: 0.6 }, '>-0.15')
      tl.to('.hero-cta', { opacity: 1, y: 0, duration: 0.6 }, '<+0.1')
      window.__heroTL = tl
    }, rootRef)
    return () => ctx.revert()
  }, [])

  // Scroll barrage: each arrow streams NE, scrubbed to scroll progress.
  useLayoutEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      if (reduce) { gsap.set('.barrage-arrow', { opacity: 0 }); return }
      const span = window.innerHeight * 2.4
      gsap.utils.toArray('.barrage-arrow').forEach((el, i) => {
        const c = barrage[i]
        gsap.to(el, {
          x: span * c.speed, y: -span * c.speed, ease: 'none',
          scrollTrigger: { trigger: document.documentElement, start: 'top top', end: 'bottom bottom', scrub: 0.6 },
        })
      })
      ScrollTrigger.refresh()
    }, rootRef)
    return () => ctx.revert()
  }, [barrage])

  return (
    <div ref={rootRef}>
      {/* fixed background arrow field (behind everything) */}
      <div className="barrage" aria-hidden="true">
        {barrage.map((b, i) => (
          <img key={i} src={`${BASE}arrow-mark.png`} className="barrage-arrow" alt=""
            style={{ left: `${b.left}vw`, top: `${b.top}vh`, width: `${b.size}px`, opacity: b.op }} />
        ))}
      </div>

      <div className="page">
        {/* ===== HERO — text-forward, barrage carries the visual ===== */}
        <section className="hero">
          <div className="container hero-stack">
            <div className="hero-copy">
              <div className="eyebrow">Lead-Gen · Websites · The voice that answers</div>
              <h1 className="h1">
                {H1_WORDS.map(([w, grad], i) => (
                  <span key={i} className={'hw' + (grad ? ' grad-text' : '')}>{w}</span>
                ))}
              </h1>
              <p className="lead hero-sub" style={{ margin: '22px auto 0' }}>
                Lead-gen systems that find them, and conversion-built sites that close them — engineered, shipped, and running. Not campaigns. Systems.
              </p>
              <div className="cta-row hero-cta" style={{ marginTop: 32, justifyContent: 'center' }}>
                <a className="btn" href={CALENDLY} target="_blank" rel="noreferrer">Book a call</a>
                <a className="btn-ghost" href={CALENDLY} target="_blank" rel="noreferrer">Get a free audit</a>
              </div>
            </div>
          </div>
        </section>

        {/* ===== TRUST ===== */}
        <section className="trust">
          <div className="container center">
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
                <div className="kicker-num">01 · Your offense</div>
                <h3 className="h3">Lead Gen</h3>
                <p>
                  We find your next customer and turn them into a sale — targeting, multi-channel outreach,
                  AI lead-scoring, and follow-up, run as one system.
                </p>
                <span className="offer-link">Explore lead gen →</span>
              </Link>
              <Link to="/web-automation" className="card offer-card" data-reveal>
                <div className="kicker-num">02 · Your defense</div>
                <h3 className="h3">Development</h3>
                <p>
                  Websites that close — and the system that runs your front desk. A fast custom site from{' '}
                  <strong>$97/mo</strong>, or the full app with an inbound AI receptionist that never misses a call,{' '}
                  <strong>$997/mo</strong>.
                </p>
                <span className="offer-link">Explore development →</span>
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
      </div>

      <style>{`
        .barrage { position: fixed; inset: 0; z-index: -1; pointer-events: none; overflow: hidden; }
        .barrage-arrow { position: absolute; will-change: transform; filter: drop-shadow(0 2px 7px rgba(0,0,0,.35)); }
        .page { position: relative; z-index: 1; }

        .hero { min-height: 82vh; display: flex; align-items: center; padding: 132px 0 48px; }
        .hero-stack { display: flex; flex-direction: column; align-items: center; text-align: center; }
        .hero-copy { max-width: 820px; }
        .hero-copy .h1 { font-size: clamp(46px, 8vw, 104px); }
        .hw { display: inline-block; margin-right: 0.22em; will-change: transform, opacity; }
        .hero-copy .lead { margin-left: auto; margin-right: auto; }

        .trust { padding: 10px 0 30px; }
        .trust-label { font-family: var(--mono); font-size: 12px; letter-spacing: .16em; text-transform: uppercase; color: var(--muted); margin-bottom: 18px; }
        .trust-row { display: flex; gap: 40px; flex-wrap: wrap; justify-content: center; font-family: var(--display); font-weight: 600; font-size: 20px; color: var(--ink-dim); opacity: .82; }
        .offer-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 22px; }
        .offer-card { display: flex; flex-direction: column; gap: 14px; min-height: 256px; }
        .offer-card p { color: var(--muted); line-height: 1.55; }
        .offer-card p strong { color: var(--ink); font-weight: 600; }
        .offer-link { margin-top: auto; color: var(--cyan); font-weight: 600; }
        .metrics { display: flex; gap: 64px; flex-wrap: wrap; margin: 40px 0; }
        .metric-n { font-family: var(--display); font-weight: 600; font-size: clamp(34px, 4vw, 52px); line-height: 1; }
        .metric-l { font-family: var(--mono); font-size: 13px; color: var(--muted); margin-top: 8px; }
        .quote { font-family: var(--display); font-weight: 500; font-size: clamp(20px, 2.4vw, 30px); line-height: 1.32; color: var(--ink); max-width: 26ch; margin-top: 12px; }
        .quote cite { display: block; font-family: var(--body); font-weight: 400; font-style: normal; font-size: 15px; color: var(--muted); margin-top: 18px; }
        .quote cite strong { color: var(--cyan); }

        @media (max-width: 760px) {
          .offer-grid { grid-template-columns: 1fr; }
          .metrics { gap: 36px; }
        }
      `}</style>
    </div>
  )
}
