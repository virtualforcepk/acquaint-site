const CALENDLY = 'https://calendly.com/kamran1-sou9/new-meeting'

const FEATURES = [
  'Built from scratch around your brand, never a recycled template',
  'Hosting included, always on',
  'Weekly site updates — we handle everything',
  'Monthly strategy session',
  'Designed to turn visitors into booked leads',
]

export default function Website() {
  return (
    <>
      {/* ===== INTRO ===== */}
      <section className="section ws-hero">
        <div className="container center">
          <div className="eyebrow" data-reveal>Website</div>
          <h1 className="h1" data-reveal style={{ maxWidth: '18ch', margin: '0 auto' }}>
            A site built to close, not just <span className="grad-text">look good.</span>
          </h1>
          <p className="lead center" data-reveal style={{ margin: '22px auto 0' }}>
            Custom-built around your brand. Fast, conversion-focused, and maintained weekly — so you never touch it.
          </p>
          <div className="cta-row" data-reveal style={{ marginTop: 32, justifyContent: 'center' }}>
            <a className="btn" href={CALENDLY} target="_blank" rel="noreferrer">Book a call</a>
            <a className="btn-ghost" href={CALENDLY} target="_blank" rel="noreferrer">Get a free audit</a>
          </div>
        </div>
      </section>

      {/* ===== PRICING ===== */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="ws-card card" data-reveal>
            <div className="ws-card-inner">
              <div>
                <div className="kicker-num">What's included</div>
                <h2 className="h2" style={{ maxWidth: '14ch', marginTop: 8 }}>
                  Everything to go live & <span className="grad-text">keep converting.</span>
                </h2>
                <ul className="ws-list">
                  {FEATURES.map((x) => <li key={x}>{x}</li>)}
                </ul>
              </div>
              <div className="ws-price-block">
                <div className="ws-price"><span className="grad-text">$97</span><span className="ws-per">/mo + tax</span></div>
                <div className="ws-setup">+ one-time setup (custom)</div>
                <p className="ws-note">Setup covers discovery, design, copy, & build. Quoted after your call.</p>
                <a className="btn ws-cta" href={CALENDLY} target="_blank" rel="noreferrer">Book a call →</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== WHY CUSTOM ===== */}
      <section className="section">
        <div className="container">
          <div className="eyebrow" data-reveal>No templates, ever</div>
          <h2 className="h2" data-reveal style={{ maxWidth: '20ch' }}>
            Your site should feel like <span className="grad-text">you built it.</span>
          </h2>
          <p className="lead" data-reveal style={{ marginTop: 18, maxWidth: '62ch' }}>
            Template sites look like every competitor's site. We start from zero — your brand, your voice, your offer —
            and build something visitors remember. Then we maintain it weekly so it stays sharp as your business grows.
          </p>
        </div>
      </section>

      {/* ===== BESPOKE CALLOUT ===== */}
      <section className="section depth-band">
        <div className="container">
          <div className="eyebrow" data-reveal>Beyond the site</div>
          <h2 className="h2" data-reveal style={{ maxWidth: '20ch' }}>
            Need the phone answered too?
          </h2>
          <p className="lead" data-reveal style={{ marginTop: 18, maxWidth: '62ch' }}>
            The App tier adds an inbound AI receptionist that qualifies & books every call, a CRM, and a company AI brain —
            all running 24/7 in your voice.{' '}
            <a href="/app" style={{ color: 'var(--cyan)', fontWeight: 600 }}>See the App tier →</a>
          </p>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="section cta-final">
        <div className="container center">
          <h2 className="h2" data-reveal style={{ maxWidth: '18ch', margin: '0 auto' }}>
            Let's build the site that <span className="grad-text">closes.</span>
          </h2>
          <p className="lead center" data-reveal style={{ margin: '20px auto 32px' }}>
            Thirty minutes, no pitch. We'll show you what we'd build & what it would cost.
          </p>
          <div className="cta-row" data-reveal style={{ justifyContent: 'center' }}>
            <a className="btn" href={CALENDLY} target="_blank" rel="noreferrer">Book a call</a>
          </div>
        </div>
      </section>

      <style>{`
        .ws-hero { padding-top: 150px; }
        .ws-card { padding: 52px; }
        .ws-card-inner { display: grid; grid-template-columns: 1fr auto; gap: 56px; align-items: start; }
        .ws-list { list-style: none; display: flex; flex-direction: column; gap: 12px; margin-top: 28px; }
        .ws-list li { color: var(--muted); line-height: 1.5; padding-left: 24px; position: relative; }
        .ws-list li::before { content: '↗'; position: absolute; left: 0; color: var(--cyan); }
        .ws-price-block { display: flex; flex-direction: column; gap: 10px; min-width: 220px; }
        .ws-price { font-family: var(--display); font-weight: 600; font-size: 52px; line-height: 1; display: flex; align-items: baseline; gap: 6px; }
        .ws-per { font-family: var(--mono); font-size: 13px; color: var(--muted); font-weight: 400; }
        .ws-setup { font-family: var(--mono); font-size: 12px; color: var(--muted); }
        .ws-note { font-family: var(--mono); font-size: 12px; color: var(--muted); line-height: 1.5; max-width: 28ch; border-left: 2px solid var(--line-2); padding-left: 12px; margin-top: 4px; }
        .ws-cta { margin-top: 14px; }
        @media (max-width: 760px) {
          .ws-card { padding: 28px 20px; }
          .ws-card-inner { grid-template-columns: 1fr; gap: 32px; }
        }
      `}</style>
    </>
  )
}
