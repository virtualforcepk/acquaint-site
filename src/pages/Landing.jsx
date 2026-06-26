import { useLayoutEffect, useRef, useMemo } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import TrustMarquee from '../components/TrustMarquee.jsx'

gsap.registerPlugin(ScrollTrigger)

const BASE = import.meta.env.BASE_URL
const CALENDLY = 'https://calendly.com/kamran1-sou9/new-meeting'

// White bullseye target with an X at the center — the hero "mark" that dissolves
// into the arrow wave on scroll.
function Bullseye() {
  return (
    <svg className="stick" viewBox="0 0 120 120" fill="none" aria-hidden="true">
      <circle cx="60" cy="60" r="52" stroke="#fff" strokeWidth="5" />
      <circle cx="60" cy="60" r="34" stroke="#fff" strokeWidth="5" />
      <circle cx="60" cy="60" r="17" stroke="#fff" strokeWidth="5" />
      <line x1="49" y1="49" x2="71" y2="71" stroke="#fff" strokeWidth="5" strokeLinecap="round" />
      <line x1="71" y1="49" x2="49" y2="71" stroke="#fff" strokeWidth="5" strokeLinecap="round" />
    </svg>
  )
}

export default function Landing() {
  const rootRef = useRef(null)

  // Arrow field — each arrow starts off-screen SW and sweeps NE to its base spot
  // (full-screen cover), then lingers as the faint ambient background. Fewer &
  // smaller on phones so the rain doesn't crowd a narrow screen.
  const barrage = useMemo(() => {
    const mobile = window.innerWidth && window.innerWidth < 760
    const count = mobile ? 24 : 38
    const maxSize = mobile ? 17 : 26
    return Array.from({ length: count }, () => ({
      left: -4 + Math.random() * 108,         // vw — base spot, spread across the full screen
      top: -4 + Math.random() * 108,          // vh
      size: 12 + Math.random() * maxSize,     // px
      fromMul: 0.4 + Math.random() * 0.5,     // how far off-screen SW it starts (× viewport)
      op: 0.10 + Math.random() * 0.24,        // faint
    }))
  }, [])

  // Scroll transition: the instant you scroll, the centered bullseye fades out and a
  // wave of arrows sweeps in from off-screen bottom-left (SW), flying NE to fill the
  // whole screen — all inside the first ~1/3 page. The copy sits a bit further down so
  // it only reveals (via [data-reveal]) once the figure's gone and the arrows cover.
  useLayoutEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      if (reduce) { gsap.set('.barrage-arrow', { opacity: 0 }); return }

      const vw = window.innerWidth || 1280, vh = window.innerHeight || 800
      const arrows = gsap.utils.toArray('.barrage-arrow')

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: document.documentElement,
          start: 'top top',
          end: '+=' + Math.round(vh * 0.32),   // snappy — figure gone + wave covering inside ~1/3 page
          scrub: 0.3,
        },
      })
      // bullseye starts fading the instant you scroll but lingers, so the wave is
      // visibly closing in on it by the time it's gone
      tl.to('.hero-figure', { scale: 0.92, opacity: 0, ease: 'none', duration: 0.6 }, 0)
      // wave: each arrow rushes in from off-screen SW to its base spot (full-screen
      // cover), staggered along the SW→NE diagonal so it reads as one sweeping wave.
      arrows.forEach((el, i) => {
        const c = barrage[i]
        const dx = (c.left + 4) / 108, dy = (c.top + 4) / 108
        const phase = Math.min(1, Math.max(0, (dx + (1 - dy)) / 2))
        const at = phase * 0.15
        tl.fromTo(el,
          { x: -vw * c.fromMul, y: vh * c.fromMul, scale: 0.7 },
          { x: 0, y: 0, scale: 1, ease: 'none', duration: 0.6 },
          at)
        // fade in fast so each arrow shows the instant it starts moving (kept at 0 at rest)
        tl.fromTo(el, { opacity: 0 }, { opacity: c.op, ease: 'none', duration: 0.12 }, at)
      })
      window.__heroScrollTL = tl

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
            style={{ left: `${b.left}vw`, top: `${b.top}vh`, width: `${b.size}px` }} />
        ))}
      </div>

      <div className="page">
        {/* ===== HERO FIGURE — centered bullseye target ===== */}
        <section className="hero-stage">
          <div className="hero-figure" aria-hidden="true"><Bullseye /></div>
        </section>

        {/* ===== HERO COPY — reveals as you scroll down ===== */}
        <section className="hero-copy-wrap">
          <div className="container">
            <div className="hero-copy">
              <div className="eyebrow" data-reveal>Lead Gen · Websites & Apps</div>
              <h1 className="h1" data-reveal>
                Always pointed at your next <span className="grad-text">customer.</span>
              </h1>
              <p className="lead hero-sub" data-reveal style={{ margin: '22px auto 0' }}>
                Lead-gen systems that find them & conversion-built sites that close them, engineered, shipped, & running. Not campaigns. Systems.
              </p>
              <div className="cta-row hero-cta" data-reveal style={{ marginTop: 32, justifyContent: 'center' }}>
                <a className="btn" href={CALENDLY} target="_blank" rel="noreferrer">Book a call</a>
                <a className="btn-ghost" href={CALENDLY} target="_blank" rel="noreferrer">Get a free audit</a>
              </div>
            </div>
          </div>
        </section>

        {/* ===== TRUST ===== */}
        <TrustMarquee />

        {/* ===== TWO OFFERS ===== */}
        <section className="section">
          <div className="container">
            <div className="eyebrow" data-reveal style={{ display: 'block', textAlign: 'center' }}>
              What we build
            </div>
            <h2 className="h2" data-reveal style={{ textAlign: 'center', maxWidth: '16ch', margin: '0 auto 50px' }}>
              Two systems. One outcome: <span className="grad-text">revenue.</span>
            </h2>
            <div className="offer-grid">
              <Link to="/lead-gen" className="card offer-card" data-reveal>
                <div className="kicker-num">01 · Your offense</div>
                <h3 className="h3">Lead Gen</h3>
                <p>
                  We find your next customer & turn them into a sale: targeting, multi-channel outreach,
                  AI lead-scoring, & follow-up, run as one system.
                </p>
                <span className="offer-link">Explore lead gen →</span>
              </Link>
              <Link to="/web-automation" className="card offer-card" data-reveal>
                <div className="kicker-num">02 · Your defense</div>
                <h3 className="h3">Development</h3>
                <p>
                  Websites that close & the system that runs your front desk. A fast custom site from{' '}
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
              The systems run at scale, every day.
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
              Thirty minutes, no pitch. We'll show you where your pipeline's leaking & exactly what we'd build.
            </p>
            <div className="cta-row" data-reveal style={{ justifyContent: 'center' }}>
              <a className="btn" href={CALENDLY} target="_blank" rel="noreferrer">Book a call</a>
            </div>
          </div>
        </section>
      </div>

      <style>{`
        .barrage { position: fixed; inset: 0; z-index: -1; pointer-events: none; overflow: hidden; }
        .barrage-arrow { position: absolute; opacity: 0; will-change: transform, opacity; mix-blend-mode: screen; filter: drop-shadow(0 2px 7px rgba(0,0,0,.35)); }
        .page { position: relative; z-index: 1; }

        .hero-stage { min-height: 100vh; min-height: 100svh; display: flex; align-items: center; justify-content: center; }
        .hero-figure { will-change: transform, opacity; }
        .stick { width: clamp(110px, 15vw, 180px); height: auto; display: block; }

        .hero-copy-wrap { padding: 35vh 0 8px; text-align: center; }
        .hero-copy { max-width: 820px; margin: 0 auto; }
        .hero-copy .h1 { font-size: clamp(44px, 7.5vw, 96px); }
        .hero-copy .lead { margin-left: auto; margin-right: auto; }

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
