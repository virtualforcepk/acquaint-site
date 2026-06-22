import { useEffect } from 'react'
import { Routes, Route, Link, NavLink, useLocation } from 'react-router-dom'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Landing from './pages/Landing.jsx'

gsap.registerPlugin(ScrollTrigger)
const BASE = import.meta.env.BASE_URL
const CALENDLY = 'https://calendly.com/kamran1-sou9/new-meeting'

function ScrollFX() {
  const { pathname } = useLocation()
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true })
    lenis.on('scroll', ScrollTrigger.update)
    const raf = (t) => lenis.raf(t * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)
    return () => { gsap.ticker.remove(raf); lenis.destroy() }
  }, [])
  useEffect(() => {
    window.scrollTo(0, 0)
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
  return (
    <nav className="nav">
      <Link to="/" className="brand">
        <img src={`${BASE}arrow-mark.png`} alt="" className="brand-mark" />
        <span>Acquaint</span>
      </Link>
      <div className="nav-links">
        <NavLink to="/lead-gen">Lead Gen</NavLink>
        <NavLink to="/web-automation">Websites</NavLink>
        <NavLink to="/about">About</NavLink>
        <a href={CALENDLY} target="_blank" rel="noreferrer" className="btn nav-cta">Book a call</a>
      </div>
      <style>{`
        .nav { position: fixed; top: 0; left: 0; right: 0; z-index: 50; display: flex; align-items: center; justify-content: space-between;
          padding: 16px var(--pad-x); backdrop-filter: blur(12px); background: linear-gradient(180deg, rgba(5,8,15,.72), rgba(5,8,15,0)); }
        .brand { display: flex; align-items: center; gap: 10px; font-family: var(--display); font-weight: 600; font-size: 20px; letter-spacing: -0.01em; color: var(--ink); }
        .brand-mark { width: 30px; height: 30px; object-fit: contain; margin-left: -2px; }
        .nav-links { display: flex; align-items: center; gap: 28px; }
        .nav-links a { font-size: 15px; color: var(--muted); transition: color .2s; }
        .nav-links a:hover, .nav-links a.active { color: var(--ink); }
        .nav-cta { color: #03131c !important; padding: 11px 20px; font-size: 15px; }
        @media (max-width: 760px) { .nav-links a:not(.nav-cta) { display: none; } }
      `}</style>
    </nav>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <div className="brand" style={{ marginBottom: 10 }}>
            <img src={`${BASE}arrow-mark.png`} alt="" className="brand-mark" />
            <span>Acquaint</span>
          </div>
          <p className="footer-tag">AI lead-gen systems and conversion-built websites. Mississauga, serving all of Canada.</p>
        </div>
        <div className="footer-cols">
          <div>
            <div className="footer-h">Offers</div>
            <Link to="/lead-gen">Lead Gen</Link>
            <Link to="/web-automation">Websites + Automation</Link>
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
          <Route path="/lead-gen" element={<Stub title="Lead-Gen Systems" />} />
          <Route path="/web-automation" element={<Stub title="Websites + Automation" />} />
          <Route path="/about" element={<Stub title="About Acquaint" />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}
