import { useEffect, useState } from 'react'
import { Routes, Route, Link, NavLink, useLocation } from 'react-router-dom'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Landing from './pages/Landing.jsx'
import About from './pages/About.jsx'
import Website from './pages/Website.jsx'
import AppDev from './pages/AppDev.jsx'
import LeadGen from './pages/LeadGen.jsx'
import { initAnalytics, trackPageView } from './analytics.js'

gsap.registerPlugin(ScrollTrigger)
const BASE = import.meta.env.BASE_URL
const CALENDLY = 'https://calendly.com/kamran1-sou9/new-meeting'

const PAGE_TITLES = {
  '/': 'Acquaint Media | AI Lead-Gen & Websites That Convert',
  '/website': 'Website | Acquaint Media',
  '/app': 'App | Acquaint Media',
  '/lead-gen': 'Lead Gen | Acquaint Media',
  '/about': 'About | Acquaint Media',
}

function ScrollFX() {
  const { pathname } = useLocation()
  useEffect(() => {
    initAnalytics()
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true })
    lenis.on('scroll', ScrollTrigger.update)
    const raf = (t) => lenis.raf(t * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)
    return () => { gsap.ticker.remove(raf); lenis.destroy() }
  }, [])
  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = PAGE_TITLES[pathname] || 'Acquaint Media'
    trackPageView(pathname)
    const ctx = gsap.context(() => {
      gsap.utils.toArray('[data-reveal]').forEach((el) =>
        gsap.to(el, {
          opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 86%' },
        }),
      )
    })
    const t = setTimeout(() => ScrollTrigger.refresh(), 200)
    return () => { clearTimeout(t); ctx.revert() }
  }, [pathname])
  return null
}

function Nav() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  // close on navigation + on Escape
  useEffect(() => { setOpen(false) }, [pathname])
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
      <nav className="nav">
        <Link to="/" className="brand" onClick={() => setOpen(false)}>
          <span>Acquaint</span>
          <img src={`${BASE}arrow-mark-t.png`} alt="" className="brand-mark" />
        </Link>
        <div className="nav-links">
          <NavLink to="/website">Website</NavLink>
          <NavLink to="/app">App</NavLink>
          <NavLink to="/lead-gen">Lead Gen</NavLink>
          <NavLink to="/about">About</NavLink>
          <a href={CALENDLY} target="_blank" rel="noreferrer" className="btn nav-cta">Book a call</a>
        </div>
        <button className="nav-burger" aria-label="Open menu" aria-expanded={open} onClick={() => setOpen((v) => !v)}>
          <span></span><span></span><span></span>
        </button>
      </nav>

      {/* mobile slide-in menu — tap the backdrop (anywhere outside the panel) to close */}
      <div className={'nav-sheet' + (open ? ' open' : '')} onClick={() => setOpen(false)} aria-hidden={!open}>
        <aside className="nav-panel" role="dialog" aria-label="Site menu" onClick={(e) => e.stopPropagation()}>
          <button className="nav-close" aria-label="Close menu" onClick={() => setOpen(false)}>
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="5" y1="5" x2="19" y2="19" /><line x1="19" y1="5" x2="5" y2="19" />
            </svg>
          </button>
          <NavLink to="/website" className="nav-panel-link" onClick={() => setOpen(false)}>Website</NavLink>
          <NavLink to="/app" className="nav-panel-link" onClick={() => setOpen(false)}>App</NavLink>
          <NavLink to="/lead-gen" className="nav-panel-link" onClick={() => setOpen(false)}>Lead Gen</NavLink>
          <NavLink to="/about" className="nav-panel-link" onClick={() => setOpen(false)}>About</NavLink>
          <a href={CALENDLY} target="_blank" rel="noreferrer" className="btn nav-panel-cta" onClick={() => setOpen(false)}>Book a call</a>
        </aside>
      </div>

      <style>{`
        .nav { position: fixed; top: 0; left: 0; right: 0; z-index: 50; display: flex; align-items: center; justify-content: space-between;
          padding: 16px var(--pad-x); backdrop-filter: blur(12px); background: linear-gradient(180deg, rgba(5,8,15,.72), rgba(5,8,15,0)); }
        .brand { display: flex; align-items: center; gap: 10px; font-family: var(--display); font-weight: 600; font-size: 20px; letter-spacing: -0.01em; color: var(--ink); }
        .brand-mark { width: 30px; height: 30px; object-fit: contain; }
        .nav-links { display: flex; align-items: center; gap: 28px; }
        .nav-links a { font-size: 15px; color: var(--muted); transition: color .2s; }
        .nav-links a:hover, .nav-links a.active { color: var(--ink); }
        .nav-cta { color: #03131c !important; padding: 11px 20px; font-size: 15px; }

        .nav-burger { display: none; flex-direction: column; justify-content: center; gap: 5px; width: 44px; height: 40px; padding: 8px 9px; background: transparent; border: 0; cursor: pointer; }
        .nav-burger span { display: block; width: 26px; height: 2px; border-radius: 2px; background: var(--ink); transition: background .2s; }
        .nav-burger:hover span { background: var(--cyan); }

        .nav-sheet { position: fixed; inset: 0; z-index: 60; overflow: hidden; display: flex; justify-content: flex-end;
          background: rgba(3,6,12,0); opacity: 0; pointer-events: none; transition: opacity .3s ease, backdrop-filter .3s ease; }
        .nav-sheet.open { background: rgba(3,6,12,.55); opacity: 1; pointer-events: auto; backdrop-filter: blur(3px); }
        .nav-panel { position: relative; width: min(82vw, 300px); height: 100%;
          background: linear-gradient(180deg, var(--bg-3), var(--bg-2)); border-left: 1px solid var(--line-2);
          padding: 88px 26px 34px; display: flex; flex-direction: column; gap: 4px;
          transform: translateX(100%); transition: transform .34s cubic-bezier(.4, 0, .2, 1); }
        .nav-sheet.open .nav-panel { transform: translateX(0); }
        .nav-close { position: absolute; top: 18px; right: 18px; display: flex; align-items: center; justify-content: center; width: 40px; height: 40px; background: transparent; border: 0; color: var(--ink); cursor: pointer; }
        .nav-panel-link { font-family: var(--display); font-weight: 600; font-size: 23px; color: var(--ink-dim); padding: 14px 0; border-bottom: 1px solid var(--line); transition: color .2s; }
        .nav-panel-link:hover, .nav-panel-link.active { color: var(--ink); }
        .nav-panel-cta { margin-top: 24px; justify-content: center; }

        @media (max-width: 760px) {
          .nav-links { display: none; }
          .nav-burger { display: flex; }
        }
      `}</style>
    </>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <div className="brand" style={{ marginBottom: 10 }}>
            <span>Acquaint</span>
            <img src={`${BASE}arrow-mark-t.png`} alt="" className="brand-mark" />
          </div>
          <p className="footer-tag">AI lead-gen systems and conversion-built websites. Mississauga, serving all of Canada.</p>
        </div>
        <div className="footer-cols">
          <div>
            <div className="footer-h">Offers</div>
            <Link to="/website">Website</Link>
            <Link to="/app">App</Link>
            <Link to="/lead-gen">Lead Gen</Link>
          </div>
          <div>
            <div className="footer-h">Company</div>
            <Link to="/about">About</Link>
            <a href={CALENDLY} target="_blank" rel="noreferrer">Book a call</a>
          </div>
          <div>
            <div className="footer-h">Connect</div>
            <a href="https://www.linkedin.com/company/acquaintmedia" target="_blank" rel="noreferrer">LinkedIn</a>
          </div>
        </div>
      </div>
      <div className="container footer-meta">
        <span>© 2026 Acquaint Media · Mississauga, Ontario</span>
        <span>Mon–Fri 9–9 · Sat–Sun by request</span>
      </div>
      <style>{`
        .footer { border-top: 1px solid var(--line); padding: 64px 0 40px; margin-top: 40px; }
        .footer-grid { display: flex; justify-content: space-between; gap: 40px; flex-wrap: wrap; }
        .footer-tag { color: var(--muted); max-width: 34ch; font-size: 15px; }
        .footer-cols { display: flex; gap: 56px; flex-wrap: wrap; }
        .footer-h { font-family: var(--mono); font-size: 12px; letter-spacing: .16em; text-transform: uppercase; color: var(--cyan); margin-bottom: 14px; }
        .footer-cols a { display: block; color: var(--ink-dim); font-size: 15px; margin-bottom: 10px; transition: color .2s; }
        .footer-cols a:hover { color: var(--ink); }
        .footer-meta { display: flex; justify-content: space-between; gap: 16px; flex-wrap: wrap; margin-top: 48px; padding-top: 22px; border-top: 1px solid var(--line); color: var(--muted); font-family: var(--mono); font-size: 12.5px; }
      `}</style>
    </footer>
  )
}

const Stub = ({ title }) => (
  <section className="section">
    <div className="container center">
      <div className="eyebrow">Acquaint</div>
      <h1 className="h2">{title}</h1>
      <p className="lead center" style={{ marginTop: 18 }}>This page is being built out next.</p>
    </div>
  </section>
)

export default function App() {
  return (
    <>
      <ScrollFX />
      <Nav />
      <main>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/website" element={<Website />} />
          <Route path="/app" element={<AppDev />} />
          <Route path="/lead-gen" element={<LeadGen />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}
