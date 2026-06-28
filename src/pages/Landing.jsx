import { useLayoutEffect, useRef, useMemo } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import TrustMarquee from '../components/TrustMarquee.jsx'

gsap.registerPlugin(ScrollTrigger)

const BASE = import.meta.env.BASE_URL
const CALENDLY = 'https://calendly.com/kamran1-sou9/new-meeting'

// 3D bullseye target — a disc tilted slightly on its side (CSS perspective).
// Concentric rings on a front face + a recessed back face give it real thickness,
// a glowing cyan bull sits at center, and a faint reticle crosses it. It rocks
// gently so you read its dimension. The arrow flies head-on into the bull.
function Target3D() {
  return (
    <div className="target-stage" aria-hidden="true">
      <div className="target3d">
        <div className="t-back" />
        <div className="t-face">
          <span className="t-ring r1" />
          <span className="t-ring r2" />
          <span className="t-ring r3" />
          <span className="t-cross h" />
          <span className="t-cross v" />
          <span className="t-ripple" />
          <span className="t-bull" />
        </div>
      </div>
    </div>
  )
}

export default function Landing() {
  const rootRef = useRef(null)

  // Ambient arrow field — each starts off-screen SW and sweeps NE on scroll to its
  // base spot (full-screen cover), then lingers faint. Fewer/smaller on phones.
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

      gsap.set('.arrow-wrapper', { xPercent: -80, yPercent: -16, opacity: 0 })

      if (!reduce) {
        const fromX = -Math.min(950, vw * 0.74)
        const fromY  = Math.min(740, vh * 0.68)
        const exitX  =  Math.min(520, vw * 0.40)
        const exitY  = -Math.min(400, vh * 0.36)

        const TRAVEL = 0.80

        const intro = gsap.timeline()

        // Phase 1 — BULLET ENTRY
        // Arrow image naturally points NE (tip at 80%, 16% of image = upper-right).
        // Wrapper translates from far SW to bull center — no rotation needed.
        intro
          // Wrapper: translates from far SW to bull, tip locked NE
          .fromTo('.arrow-wrapper',
            { x: fromX, y: fromY, scale: 0.12, opacity: 0 },
            { x: 0,     y: 0,     scale: 1,    opacity: 1, duration: TRAVEL, ease: 'power3.out' }
          )
          // Trail: grows from nothing at the tail as the arrow accelerates in
          .fromTo('.arrow-trail',
            { scaleX: 0, transformOrigin: '100% 50%', opacity: 0 },
            { scaleX: 1, opacity: 1, duration: TRAVEL * 0.75, ease: 'power2.out' },
            TRAVEL * 0.1
          )

        // Phase 2 — IMPACT: trail flares then vanishes at the hit
        .to('.arrow-trail', { scaleX: 1.3, opacity: 0, duration: 0.12, ease: 'power3.in' }, '>-0.04')
        .to('.t-bull',   { scale: 4,    boxShadow: '0 0 150px 65px rgba(220,248,255,1)', duration: 0.05 }, '<')
        .to('.target3d', { scale: 1.14, duration: 0.05 }, '<')

        // Phase 3 — SHATTER: every piece flies a different direction
        .to('.r1', { x: -vw*0.14, y: -vh*0.11, scale: 3.6, rotation: -78, opacity: 0, duration: 0.55, ease: 'expo.out' }, '<0.02')
        .to('.r2', { x:  vw*0.13, y:  vh*0.14, scale: 2.9, rotation:  62, opacity: 0, duration: 0.50, ease: 'expo.out' }, '<')
        .to('.r3', { x: -vw*0.07, y:  vh*0.16, scale: 2.5, rotation: -50, opacity: 0, duration: 0.45, ease: 'expo.out' }, '<')
        .to('.t-cross',  { scaleX: 7, scaleY: 0, opacity: 0, duration: 0.17, ease: 'power3.out' }, '<')
        .to('.t-bull',   { scale: 11, opacity: 0, duration: 0.28, ease: 'expo.out' }, '<')
        .to('.t-back',   { scale: 2.4, opacity: 0, duration: 0.36, ease: 'expo.out' }, '<')
        .to('.t-ripple', { scale: 5.5, opacity: 0, duration: 0.42, ease: 'power2.out' }, '<')
        .set('.target3d', { animation: 'none' }, '<')

        // Phase 4 — PIERCE THROUGH: wrapper exits straight NE, tip still forward, fades out
        .to('.arrow-wrapper', {
          x: exitX, y: exitY,
          scale: 0.20, opacity: 0,
          duration: 0.44, ease: 'power2.in'
        }, '>-0.26')

        window.__heroIntro = intro
      } else {
        gsap.set('.arrow-wrapper', { x: 0, y: 0, scale: 1, opacity: 1 })
      }

      // ---- SCROLL: hero figure recedes, ambient wave sweeps in, copy reveals ----
      if (reduce) { gsap.set('.barrage-arrow', { opacity: 0 }); return }
      const arrows = gsap.utils.toArray('.barrage-arrow')
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: document.documentElement,
          start: 'top top',
          end: '+=' + Math.round(vh * 0.42),
          scrub: 0.6,                 // smoother follow
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
      {/* fixed ambient arrow field (behind everything) */}
      <div className="barrage" aria-hidden="true">
        {barrage.map((b, i) => (
          <img key={i} src={`${BASE}arrow-mark-t.png`} className="barrage-arrow" alt=""
            style={{ left: `${b.left}vw`, top: `${b.top}vh`, width: `${b.size}px` }} />
        ))}
      </div>

      <div className="page">
        {/* ===== HERO FIGURE — 3D tilted target + arrow flying head-on into it ===== */}
        <section className="hero-stage">
          <div className="hero-figure">
            <Target3D />
            <div className="arrow-wrapper" aria-hidden="true">
              <div className="arrow-trail" />
              <img className="hero-arrow" src={`${BASE}arrow-mark-t.png`} alt="" />
            </div>
          </div>
        </section>

        {/* ===== HERO COPY — reveals as you scroll down ===== */}
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

        {/* ===== TWO OFFERS ===== */}
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
        .barrage-arrow { position: absolute; opacity: 0; will-change: transform, opacity; filter: drop-shadow(0 2px 7px rgba(0,0,0,.35)); }
        .page { position: relative; z-index: 1; }

        .hero-stage { min-height: 100vh; min-height: 100svh; display: flex; align-items: center; justify-content: center; }
        .hero-figure {
          position: relative; width: clamp(230px, 33vw, 380px); height: clamp(230px, 33vw, 380px);
          display: flex; align-items: center; justify-content: center; will-change: transform, opacity;
          perspective: 600px;
        }
        .hero-figure::before {
          content: ''; position: absolute; inset: -28%;
          background: radial-gradient(circle, rgba(70,140,255,.16), rgba(40,90,210,.05) 45%, transparent 70%);
          filter: blur(18px); pointer-events: none;
        }

        /* ---- 3D tilted target ---- */
        .target-stage { perspective: 1100px; perspective-origin: 42% 42%; }
        .target3d {
          position: relative; width: clamp(150px, 22vw, 250px); aspect-ratio: 1 / 1;
          transform-style: preserve-3d; transform: rotateX(15deg) rotateY(-30deg);
          animation: targetRock 9s ease-in-out infinite;
          filter: drop-shadow(0 22px 34px rgba(0,0,0,.55));
        }
        @keyframes targetRock {
          0%, 100% { transform: rotateX(16deg) rotateY(-34deg); }
          50%      { transform: rotateX(10deg) rotateY(-15deg); }
        }
        .t-back {
          position: absolute; inset: 0; border-radius: 50%; transform: translateZ(-18px);
          background: radial-gradient(circle at 38% 32%, #122139, #05090f 72%);
          box-shadow: 0 0 0 2px rgba(120,170,255,.16), inset 0 0 42px rgba(0,0,0,.6);
        }
        .t-face {
          position: absolute; inset: 0; border-radius: 50%; transform-style: preserve-3d;
          background: radial-gradient(circle at 40% 34%, rgba(20,34,58,.55), rgba(6,11,22,.12) 72%);
        }
        .t-ring {
          position: absolute; border-radius: 50%; border-style: solid;
          border-color: rgba(255,255,255,.92); box-shadow: 0 0 9px rgba(120,180,255,.45);
        }
        .t-ring.r1 { inset: 3%;  border-width: 5px; }
        .t-ring.r2 { inset: 23%; border-width: 5px; }
        .t-ring.r3 { inset: 43%; border-width: 5px; border-color: rgba(160,215,255,.95); }
        .t-cross { position: absolute; left: 50%; top: 50%; background: rgba(255,255,255,.42); }
        .t-cross.h { width: 86%; height: 2px; transform: translate(-50%, -50%); }
        .t-cross.v { height: 86%; width: 2px; transform: translate(-50%, -50%); }
        .t-ripple {
          position: absolute; inset: 30%; border-radius: 50%;
          border: 3px solid rgba(160,215,255,.9); opacity: 0; pointer-events: none;
        }
        .t-bull {
          position: absolute; inset: 60%; border-radius: 50%;
          background: radial-gradient(circle at 42% 38%, #aee4ff, #2e86ff 72%);
          box-shadow: 0 0 14px 3px rgba(90,170,255,.85);
        }

        /* ---- arrow: wrapper handles position/animation, img handles drill-spin ---- */
        .arrow-wrapper {
          position: absolute; left: 50%; top: 50%;
          opacity: 0; pointer-events: none; will-change: transform, opacity; z-index: 3;
          transform-style: preserve-3d;
        }
        .hero-arrow {
          display: block; width: clamp(95px, 14vw, 175px); height: auto;
          filter: drop-shadow(0 0 14px rgba(52,214,240,.7));
          position: relative; z-index: 1;
        }
        /* Comet tail — extends LEFT in the wrapper's local space = SW in screen space.
           Right edge anchors at the arrow tail (~8% from left of image).
           Outer glow + hot white core give the "bullet trailing fire" look. */
        .arrow-trail {
          position: absolute;
          right: 88%;
          top: 50%;
          transform: translateY(-50%);
          width: 500px; height: 28px;
          background: linear-gradient(to right,
            transparent 0%,
            rgba(31,224,164,.05) 30%,
            rgba(52,214,240,.20) 60%,
            rgba(52,214,240,.50) 82%,
            rgba(210,250,255,.70) 100%
          );
          filter: blur(6px);
          pointer-events: none;
        }
        .arrow-trail::after {
          content: '';
          position: absolute;
          right: 0; top: 50%;
          transform: translateY(-50%);
          width: 55%; height: 5px;
          background: linear-gradient(to right, transparent, rgba(255,255,255,.85));
          filter: blur(1.5px);
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
        @media (prefers-reduced-motion: reduce) {
          .target3d { animation: none; }
        }
      `}</style>
    </div>
  )
}
