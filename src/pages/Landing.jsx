import { useLayoutEffect, useRef, useMemo } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import TrustMarquee from '../components/TrustMarquee.jsx'

gsap.registerPlugin(ScrollTrigger)

const BASE = import.meta.env.BASE_URL
const CALENDLY = 'https://calendly.com/kamran1-sou9/new-meeting'
const VOLLEY = 7

export default function Landing() {
  const rootRef = useRef(null)

  const barrage = useMemo(() => {
    const mobile = window.innerWidth && window.innerWidth < 760
    const count = mobile ? 22 : 34
    const maxSize = mobile ? 16 : 24
    return Array.from({ length: count }, () => ({
      left: -4 + Math.random() * 108,
      top: -4 + Math.random() * 108,
      size: 12 + Math.random() * maxSize,
      fromMul: 0.4 + Math.random() * 0.5,
      op: 0.08 + Math.random() * 0.20,
    }))
  }, [])

  useLayoutEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      const vw = window.innerWidth || 1280, vh = window.innerHeight || 800

      // tip of arrow-mark-t.png sits at ~80% left, ~16% top of the image
      gsap.set('.volley-arrow', { xPercent: -80, yPercent: -16, opacity: 0 })
      gsap.set('.hero-mono', { opacity: 0, scale: 0.8 })

      if (!reduce) {
        const baseFromX = -Math.min(720, vw * 0.56)
        const baseFromY  =  Math.min(520, vh * 0.52)

        // Single timeline — more reliable in React Strict Mode than individual tweens with delays
        const intro = gsap.timeline({ delay: 0.18 })
        gsap.utils.toArray('.volley-arrow').forEach((el, i) => {
          const perp = (i - (VOLLEY - 1) / 2) * 30
          intro.fromTo(el,
            {
              xPercent: -80, yPercent: -16,
              x: baseFromX + perp * 0.55,
              y: baseFromY - perp * 0.55,
              scale: 0.22,
              opacity: 0,
            },
            {
              x: 0, y: 0,
              scale: 1,
              opacity: 1,
              duration: 0.60,
              ease: 'power2.out',
            },
            i * 0.09   // stagger position within the timeline
          )
        })

        // Last arrow lands at (VOLLEY-1)*0.09 + 0.60 = 1.14s from intro start
        // Dissolve volley → crystallise into monogram
        intro
          .to('.volley-arrow', { opacity: 0, duration: 0.28, ease: 'power1.in' }, '-=0.32')
          .to('.hero-mono',    { opacity: 1, scale: 1, duration: 0.46, ease: 'back.out(1.4)' }, '<')

        window.__heroIntro = intro
      } else {
        gsap.set('.hero-mono', { opacity: 1, scale: 1 })
      }

      // ---- SCROLL: hero recedes, ambient barrage sweeps in ----
      if (reduce) { gsap.set('.barrage-arrow', { opacity: 0 }); return }
      const arrows = gsap.utils.toArray('.barrage-arrow')
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: document.documentElement,
          start: 'top top',
          end: '+=' + Math.round(vh * 0.42),
          scrub: 0.6,
        },
      })
      tl.to('.hero-figure', { scale: 0.9, opacity: 0, ease: 'power1.inOut', duration: 0.7 }, 0)
      arrows.forEach((el, i) => {
        const c = barrage[i]
        const dx = (c.left + 4) / 108, dy = (c.top + 4) / 108
        const phase = Math.min(1, Math.max(0, (dx + (1 - dy)) / 2))
        const at = phase * 0.16
        tl.fromTo(el,
          { x: -vw * c.fromMul, y: vh * c.fromMul, scale: 0.7 },
          { x: 0, y: 0, scale: 1, ease: 'power1.out', duration: 0.7 },
          at)
        tl.fromTo(el, { opacity: 0 }, { opacity: c.op, ease: 'none', duration: 0.14 }, at)
      })
      window.__heroScrollTL = tl

      ScrollTrigger.refresh()
    }, rootRef)
    return () => ctx.revert()
  }, [barrage])

  return (
    <div ref={rootRef}>
      {/* fixed ambient arrow field */}
      <div className="barrage" aria-hidden="true">
        {barrage.map((b, i) => (
          <img key={i} src={`${BASE}arrow-mark-t.png`} className="barrage-arrow" alt=""
            style={{ left: `${b.left}vw`, top: `${b.top}vh`, width: `${b.size}px` }} />
        ))}
      </div>

      <div className="page">
        {/* ===== HERO: volley of arrows converges → monogram ===== */}
        <section className="hero-stage">
          <div className="hero-figure">
            {/* the volley — each arrow flies tip-first from SW */}
            <div className="volley" aria-hidden="true">
              {Array.from({ length: VOLLEY }, (_, i) => (
                <img key={i} className="volley-arrow" src={`${BASE}arrow-mark-t.png`} alt="" />
              ))}
            </div>
            {/* monogram — crystallises at center after the volley dissolves */}
            <img className="hero-mono" src={`${BASE}arrow-mark-t.png`} alt="Acquaint" />
          </div>
        </section>

        {/* ===== HERO COPY ===== */}
        <section className="hero-copy-wrap">
          <div className="container">
            <div className="hero-copy">
              <div className="eyebrow" data-reveal>Website · App · Lead Gen</div>
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

        {/* ===== OFFERS ===== */}
        <section className="section">
          <div className="container">
            <div className="eyebrow" data-reveal style={{ display: 'block', textAlign: 'center' }}>
              What we build
            </div>
            <h2 className="h2" data-reveal style={{ textAlign: 'center', maxWidth: '18ch', margin: '0 auto 50px' }}>
              Three offers. One outcome: <span className="grad-text">revenue.</span>
            </h2>
            <div className="offer-grid offer-grid-3">
              <Link to="/website" className="card offer-card" data-reveal>
                <div className="kicker-num">01 · Your presence</div>
                <h3 className="h3">Website</h3>
                <p>
                  A fast, custom site built around your brand — designed to turn visitors into booked leads.
                  Maintained weekly, hosting included, from <strong>$97/mo</strong>.
                </p>
                <span className="offer-link">Explore website →</span>
              </Link>
              <Link to="/app" className="card offer-card" data-reveal>
                <div className="kicker-num">02 · Your defense</div>
                <h3 className="h3">App</h3>
                <p>
                  An inbound AI receptionist that answers, books, & qualifies every call 24/7 in your voice —
                  plus a CRM and company AI brain. From <strong>$997/mo</strong>.
                </p>
                <span className="offer-link">Explore app →</span>
              </Link>
              <Link to="/lead-gen" className="card offer-card" data-reveal>
                <div className="kicker-num">03 · Your offense</div>
                <h3 className="h3">Lead Gen</h3>
                <p>
                  We find your next customer & turn them into a sale: targeting, multi-channel outreach,
                  AI lead-scoring, & follow-up, run as one system.
                </p>
                <span className="offer-link">Explore lead gen →</span>
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
              "The results were nothing short of exceptional — a fresh, data-driven approach to our campaigns."
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
        .barrage-arrow { position: absolute; opacity: 0; will-change: transform, opacity; filter: drop-shadow(0 2px 7px rgba(0,0,0,.35)); }
        .page { position: relative; z-index: 1; }

        .hero-stage { min-height: 100vh; min-height: 100svh; display: flex; align-items: center; justify-content: center; }
        .hero-figure {
          position: relative; width: clamp(230px, 33vw, 380px); height: clamp(230px, 33vw, 380px);
          display: flex; align-items: center; justify-content: center; will-change: transform, opacity;
        }
        .hero-figure::before {
          content: ''; position: absolute; inset: -28%;
          background: radial-gradient(circle, rgba(52,214,240,.12), rgba(40,90,210,.04) 45%, transparent 70%);
          filter: blur(22px); pointer-events: none;
        }

        /* Volley: 7 small arrows GSAP-translated from SW, tip locked NE */
        .volley { position: absolute; inset: 0; pointer-events: none; }
        .volley-arrow {
          position: absolute; left: 50%; top: 50%;
          width: clamp(55px, 8.5vw, 100px); height: auto;
          filter: drop-shadow(0 0 10px rgba(52,214,240,.60));
          opacity: 0;
          will-change: transform, opacity;
        }

        /* Monogram — large crystallised form revealed at center */
        .hero-mono {
          width: clamp(140px, 22vw, 220px); height: auto;
          position: relative; z-index: 2; opacity: 0;
          filter: drop-shadow(0 0 32px rgba(52,214,240,.60)) drop-shadow(0 0 10px rgba(52,214,240,.35));
          animation: monoBreath 4s ease-in-out infinite;
        }
        @keyframes monoBreath {
          0%, 100% { filter: drop-shadow(0 0 32px rgba(52,214,240,.60)) drop-shadow(0 0 10px rgba(52,214,240,.35)); }
          50%       { filter: drop-shadow(0 0 48px rgba(52,214,240,.85)) drop-shadow(0 0 18px rgba(52,214,240,.55)); }
        }

        .hero-copy-wrap { padding: 35vh 0 8px; text-align: center; }
        .hero-copy { max-width: 820px; margin: 0 auto; }
        .hero-copy .h1 { font-size: clamp(44px, 7.5vw, 96px); }
        .hero-copy .lead { margin-left: auto; margin-right: auto; }

        .offer-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 22px; }
        .offer-grid-3 { grid-template-columns: 1fr 1fr 1fr; }
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

        @media (max-width: 900px) {
          .offer-grid-3 { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 760px) {
          .offer-grid { grid-template-columns: 1fr; }
          .offer-grid-3 { grid-template-columns: 1fr; }
          .metrics { gap: 36px; }
        }
      `}</style>
    </div>
  )
}
