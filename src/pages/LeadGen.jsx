const CALENDLY = 'https://calendly.com/kamran1-sou9/new-meeting'

const SYSTEM = [
  { t: 'Targeting', d: 'We pinpoint who your next customer actually is and build the list — no spray-and-pray.' },
  { t: 'Multi-channel outreach', d: 'We reach them where they are, at volume, on your behalf — your pipeline fills while you work.' },
  { t: 'AI lead-scoring', d: 'Every lead is scored and ranked, so your time goes to the ones ready to buy.' },
  { t: 'Follow-up + CRM', d: 'Automated follow-up so nothing goes cold — every lead tracked in one place.' },
]
const METRICS = [
  { n: '88,000+', l: 'prospects sourced' },
  { n: '30,000+', l: 'leads AI-scored & ranked' },
  { n: '1,700+', l: 'leads actively worked' },
]
const CLIENTS = ['Lease At Ease', 'Lamar Donair', 'Ricco Decor', 'Empire Protection', 'Jawanda Consulting']

export default function LeadGen() {
  return (
    <>
      {/* ===== INTRO ===== */}
      <section className="section lg-hero">
        <div className="container center">
          <div className="eyebrow" data-reveal>Lead Gen · Your offense</div>
          <h1 className="h1" data-reveal style={{ maxWidth: '16ch', margin: '0 auto' }}>
            We find your next customer — and turn them into a <span className="grad-text">sale.</span>
          </h1>
          <p className="lead center" data-reveal style={{ margin: '22px auto 0' }}>
            Not campaigns you babysit — a system that sources, scores, and works your leads every day. Engineered,
            shipped, and running while you close.
          </p>
          <div className="cta-row" data-reveal style={{ justifyContent: 'center', marginTop: 30 }}>
            <a className="btn" href={CALENDLY} target="_blank" rel="noreferrer">Book a call</a>
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="section">
        <div className="container">
          <div className="eyebrow" data-reveal>How it works</div>
          <h2 className="h2" data-reveal style={{ maxWidth: '18ch', marginBottom: 40 }}>
            One system. <span className="grad-text">Four moving parts.</span>
          </h2>
          <div className="lg-steps">
            {SYSTEM.map((s, i) => (
              <div className="card lg-step" data-reveal key={s.t}>
                <div className="kicker-num">0{i + 1}</div>
                <h3 className="h3">{s.t}</h3>
                <p>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== RESULTS ===== */}
      <section className="section">
        <div className="container">
          <div className="eyebrow" data-reveal>The system at scale</div>
          <h2 className="h2" data-reveal style={{ maxWidth: '18ch' }}>
            Numbers from a system that runs <span className="grad-text">every day.</span>
          </h2>
          <div className="metrics" data-reveal>
            {METRICS.map((m) => (
              <div className="metric" key={m.l}>
                <div className="metric-n grad-text">{m.n}</div>
                <div className="metric-l">{m.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PROOF / CASE STUDY ===== */}
      <section className="section">
        <div className="container">
          <div className="eyebrow" data-reveal>Proof</div>
          <h2 className="h2" data-reveal style={{ maxWidth: '18ch', marginBottom: 36 }}>
            Real businesses. Real pipelines.
          </h2>
          <div className="card case-feature" data-reveal>
            <div className="case-result grad-text">3× qualified leads</div>
            <blockquote className="case-quote">
              “The results were nothing short of exceptional — a fresh, data-driven approach to our campaigns.”
            </blockquote>
            <cite className="case-cite">— Harry Jawanda, Founder · Jawanda Consulting</cite>
          </div>
          {/* TODO: add Lamar Donair / Ricco Decor / Empire Protection case studies once their results are in */}
          <p className="case-more" data-reveal>More case studies as we grow.</p>
        </div>
      </section>

      {/* ===== TRUSTED BY ===== */}
      <section className="trust">
        <div className="container center">
          <div className="trust-label">Trusted by Canadian businesses</div>
          <div className="trust-row">
            {CLIENTS.map((c) => <span key={c}>{c}</span>)}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="section cta-final">
        <div className="container center">
          <h2 className="h2" data-reveal style={{ maxWidth: '18ch', margin: '0 auto' }}>
            Let's fill your <span className="grad-text">pipeline.</span>
          </h2>
          <p className="lead center" data-reveal style={{ margin: '20px auto 32px' }}>
            Thirty minutes, no pitch. We'll show you where your next customers are and exactly how we'd reach them.
          </p>
          <div className="cta-row" data-reveal style={{ justifyContent: 'center' }}>
            <a className="btn" href={CALENDLY} target="_blank" rel="noreferrer">Book a call</a>
          </div>
        </div>
      </section>

      <style>{`
        .lg-hero { padding-top: 150px; }
        .lg-steps { display: grid; grid-template-columns: repeat(2, 1fr); gap: 22px; }
        .lg-step { display: flex; flex-direction: column; gap: 12px; }
        .lg-step p { color: var(--muted); line-height: 1.55; }
        .metrics { display: flex; gap: 64px; flex-wrap: wrap; margin-top: 36px; }
        .metric-n { font-family: var(--display); font-weight: 600; font-size: clamp(34px, 4vw, 52px); line-height: 1; }
        .metric-l { font-family: var(--mono); font-size: 13px; color: var(--muted); margin-top: 8px; }
        .case-feature { display: flex; flex-direction: column; gap: 16px; max-width: 760px; }
        .case-result { font-family: var(--display); font-weight: 600; font-size: clamp(30px, 4vw, 44px); line-height: 1; }
        .case-quote { font-family: var(--display); font-weight: 500; font-size: clamp(19px, 2.2vw, 26px); line-height: 1.35; color: var(--ink); }
        .case-cite { font-style: normal; font-size: 15px; color: var(--muted); }
        .case-more { font-family: var(--mono); font-size: 13px; letter-spacing: .04em; color: var(--muted); margin-top: 26px; }
        .trust { padding: 10px 0 40px; }
        .trust-label { font-family: var(--mono); font-size: 12px; letter-spacing: .16em; text-transform: uppercase; color: var(--muted); margin-bottom: 18px; }
        .trust-row { display: flex; gap: 40px; flex-wrap: wrap; justify-content: center; font-family: var(--display); font-weight: 600; font-size: 20px; color: var(--ink-dim); opacity: .82; }
        @media (max-width: 760px) {
          .lg-steps { grid-template-columns: 1fr; }
          .metrics { gap: 36px; }
        }
      `}</style>
    </>
  )
}
