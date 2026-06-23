const CALENDLY = 'https://calendly.com/kamran1-sou9/new-meeting'

const PRINCIPLES = [
  { t: 'Systems, not campaigns', d: 'A campaign ends. A system runs. We build the machine, targeting, outreach, scoring, follow-up, & keep it running.' },
  { t: 'We run it, not you', d: 'No dashboard to babysit, no learning curve. We build the system, run it every day, & hand you the booked calls.' },
  { t: "Lead with what's real", d: "No inflated promises, no vanity metrics. The numbers are the numbers, & we'll show you exactly how they're made." },
]

const BUILDING = [
  { t: 'The AI front desk', d: 'An always-on agent that answers, qualifies, & books appointments 24/7, so no inbound call goes cold. In active development.' },
  { t: 'Lead-gen, more channels', d: 'Expanding the sourcing & outreach engine across more of the places your next customer actually is.' },
  { t: 'A growing case-study library', d: 'Every site & automation we ship becomes the next proof point. The Lead Gen & Development pages grow as we do.' },
]

export default function About() {
  return (
    <>
      {/* ===== INTRO ===== */}
      <section className="section about-hero">
        <div className="container">
          <div className="eyebrow" data-reveal>About Acquaint</div>
          <h1 className="h1" data-reveal style={{ maxWidth: '15ch' }}>
            We build the system, & we <span className="grad-text">run it.</span>
          </h1>
          <p className="lead" data-reveal style={{ marginTop: 22, maxWidth: '60ch' }}>
            Acquaint Media is a founder-led shop out of Mississauga, serving businesses across Canada. We find your
            next customer & build the sites that close them, then keep the whole system running, so you don't have to.
          </p>
        </div>
      </section>

      {/* ===== FOUNDER ===== */}
      <section className="section">
        <div className="container founder-grid">
          <div className="founder-card" data-reveal>
            <div className="founder-avatar">KB</div>
            <div className="founder-name">Kamran Butt</div>
            <div className="founder-role">Founder</div>
            <a className="founder-link" href="https://www.linkedin.com/in/kb1017" target="_blank" rel="noreferrer">LinkedIn ↗</a>
          </div>
          <div data-reveal>
            <div className="eyebrow">Why Acquaint exists</div>
            <h2 className="h3" style={{ margin: '6px 0 18px' }}>Systems beat campaigns. Every time.</h2>
            <p className="story-p">
              Too many good businesses lose customers they never knew they had, not to a bad product, but to slow,
              manual follow-up. The moment a lead goes cold it's gone, & most owners never see it happen.
            </p>
            <p className="story-p">
              So instead of running campaigns, Kamran builds <strong>systems</strong>, machines that source, score,
              & work leads every day without dropping one. He builds multi-agent AI systems from the ground up,
              including one that earned Amazon's approval, & today that same systems-first approach runs lead-gen for
              businesses across Canada.
            </p>
            {/* Kamran: if you want a more personal, first-person origin line, drop it in here. */}
          </div>
        </div>
      </section>

      {/* ===== PRINCIPLES ===== */}
      <section className="section">
        <div className="container">
          <div className="eyebrow" data-reveal>How we work</div>
          <h2 className="h2" data-reveal style={{ maxWidth: '18ch', marginBottom: 40 }}>
            Three things we don't <span className="grad-text">compromise on.</span>
          </h2>
          <div className="about-cards">
            {PRINCIPLES.map((p, i) => (
              <div className="card about-card" data-reveal key={p.t}>
                <div className="kicker-num">0{i + 1}</div>
                <h3 className="h3">{p.t}</h3>
                <p>{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PROOF - LAE (client) ===== */}
      <section className="section proof-band">
        <div className="container">
          <div className="eyebrow" data-reveal>Proof, not promises</div>
          <h2 className="h2" data-reveal style={{ maxWidth: '20ch' }}>
            We don't just build lead-gen systems. <span className="grad-text">We run them.</span>
          </h2>
          <p className="lead" data-reveal style={{ marginTop: 18, maxWidth: '58ch' }}>
            These are live numbers from the lead-gen system we built & run for <strong>Lease At Ease</strong>, a
            property-management client. It works their pipeline every single day:
          </p>
          <div className="metrics" data-reveal>
            <div className="metric"><div className="metric-n grad-text">88,000+</div><div className="metric-l">prospects sourced</div></div>
            <div className="metric"><div className="metric-n grad-text">30,000+</div><div className="metric-l">leads AI-scored &amp; ranked</div></div>
            <div className="metric"><div className="metric-n grad-text">1,700+</div><div className="metric-l">leads actively worked</div></div>
          </div>
        </div>
      </section>

      {/* ===== TEAM ===== */}
      <section className="section">
        <div className="container">
          <div className="eyebrow" data-reveal>The team</div>
          <h2 className="h2" data-reveal style={{ maxWidth: '20ch', marginBottom: 18 }}>
            Founder-led. <span className="grad-text">AI-leveraged.</span>
          </h2>
          <p className="lead" data-reveal style={{ maxWidth: '62ch' }}>
            Kamran builds & runs the systems directly, & a bench of AI agents & trained specialists handles the
            volume: sourcing, scoring, follow-up, & the round-the-clock front desk. You work with the person who
            builds your system, not an account manager three layers removed.
          </p>
        </div>
      </section>

      {/* ===== BUILDING ===== */}
      <section className="section">
        <div className="container">
          <div className="eyebrow" data-reveal>What we're building</div>
          <h2 className="h2" data-reveal style={{ maxWidth: '18ch', marginBottom: 40 }}>
            The roadmap, <span className="grad-text">in the open.</span>
          </h2>
          <div className="about-cards">
            {BUILDING.map((b) => (
              <div className="card about-card" data-reveal key={b.t}>
                <h3 className="h3">{b.t}</h3>
                <p>{b.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="section cta-final">
        <div className="container center">
          <h2 className="h2" data-reveal style={{ maxWidth: '20ch', margin: '0 auto' }}>
            Let's point a system at <span className="grad-text">your</span> next customer.
          </h2>
          <p className="lead center" data-reveal style={{ margin: '20px auto 32px' }}>
            Thirty minutes, no pitch. We'll show you where your pipeline's leaking & exactly what we'd build.
          </p>
          <div className="cta-row" data-reveal style={{ justifyContent: 'center' }}>
            <a className="btn" href={CALENDLY} target="_blank" rel="noreferrer">Book a call</a>
          </div>
        </div>
      </section>

      <style>{`
        .about-hero { padding-top: 150px; }
        .founder-grid { display: grid; grid-template-columns: 0.7fr 1.3fr; gap: 40px; align-items: start; }
        .founder-card { border: 1px solid var(--line); border-radius: var(--radius); background: linear-gradient(180deg, rgba(17,26,43,0.55), rgba(10,15,26,0.55)); padding: 30px; text-align: center; }
        .founder-avatar { width: 96px; height: 96px; border-radius: 50%; margin: 0 auto 18px; display: flex; align-items: center; justify-content: center; font-family: var(--display); font-weight: 600; font-size: 34px; color: #03131c; background: var(--grad); }
        .founder-name { font-family: var(--display); font-weight: 600; font-size: 22px; }
        .founder-role { color: var(--muted); font-family: var(--mono); font-size: 13px; margin-top: 4px; }
        .founder-link { display: inline-block; margin-top: 16px; color: var(--cyan); font-weight: 600; font-size: 14px; }
        .story-p { color: var(--ink-dim); line-height: 1.7; margin-bottom: 16px; max-width: 62ch; }
        .story-p strong { color: var(--ink); }
        .about-cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px; }
        .about-card { display: flex; flex-direction: column; gap: 12px; }
        .about-card p { color: var(--muted); line-height: 1.6; }
        .metrics { display: flex; gap: 64px; flex-wrap: wrap; margin-top: 36px; }
        .metric-n { font-family: var(--display); font-weight: 600; font-size: clamp(34px, 4vw, 52px); line-height: 1; }
        .metric-l { font-family: var(--mono); font-size: 13px; color: var(--muted); margin-top: 8px; }
        @media (max-width: 860px) {
          .founder-grid { grid-template-columns: 1fr; }
          .about-cards { grid-template-columns: 1fr; }
          .metrics { gap: 36px; }
        }
      `}</style>
    </>
  )
}
