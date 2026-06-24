import TrustMarquee from '../components/TrustMarquee.jsx'

const CALENDLY = 'https://calendly.com/kamran1-sou9/new-meeting'

const SYSTEM = [
  { t: 'Targeting', d: 'We pinpoint who your next customer actually is & build the list. No spray-and-pray.' },
  { t: 'Multi-channel outreach', d: 'We reach them where they are, at volume, on your behalf. Your pipeline fills while you work.' },
  { t: 'AI lead-scoring', d: 'Every lead is scored and ranked, so your time goes to the ones ready to buy.' },
  { t: 'Follow-up + CRM', d: 'Automated follow-up so nothing goes cold, every lead tracked in one place.' },
]
const METRICS = [
  { n: '88,000+', l: 'prospects sourced' },
  { n: '30,000+', l: 'leads AI-scored & ranked' },
  { n: '1,700+', l: 'leads actively worked' },
]
const EXPERIENCE = [
  'Paid ad campaigns',
  'Lead-gen systems',
  'Cold outreach',
  'Landing funnels',
  'CRM & follow-up',
  'Multi-agent outreach',
]
export default function LeadGen() {
  return (
    <>
      {/* ===== INTRO ===== */}
      <section className="section lg-hero">
        <div className="container center">
          <div className="eyebrow" data-reveal>Lead Gen · Your offense</div>
          <h1 className="h1" data-reveal style={{ maxWidth: '16ch', margin: '0 auto' }}>
            We find your next customer & turn them into a <span className="grad-text">sale.</span>
          </h1>
          <p className="lead center" data-reveal style={{ margin: '22px auto 0' }}>
            Not campaigns you babysit. A system that sources, scores, & works your leads every day. Engineered,
            shipped, & running while you close.
          </p>
          <div className="cta-row" data-reveal style={{ justifyContent: 'center', marginTop: 30 }}>
            <a className="btn" href={CALENDLY} target="_blank" rel="noreferrer">Book a call</a>
          </div>
        </div>
      </section>

      {/* ===== EXPERIENCE ===== */}
      <section className="section">
        <div className="container">
          <div className="eyebrow" data-reveal>Experience</div>
          <h2 className="h2" data-reveal style={{ maxWidth: '18ch' }}>
            If it attracts customers, <span className="grad-text">we've run it.</span>
          </h2>
          <p className="lead" data-reveal style={{ marginTop: 18, maxWidth: '62ch' }}>
            Years of getting small businesses in front of the people ready to buy. Paid ad campaigns, full lead-gen
            systems, cold outreach, funnels that follow up, across local services, trades, retail & consulting. The
            unglamorous work that actually fills a pipeline, we've done a lot of it.
          </p>
          <div className="exp-chips" data-reveal>
            {EXPERIENCE.map((e) => <span className="exp-chip" key={e}>{e}</span>)}
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
          <div className="case-grid">
            <div className="card case-card" data-reveal>
              <div className="case-name">Lease At Ease</div>
              <div className="case-result grad-text">Real-estate lead-gen</div>
              <p>A property business running our full system. We source, score, & work their pipeline every day. They're behind the numbers above.</p>
            </div>
            {/* De-identified corporate case study (originally the Amazon / AKFB multi-agent build). Per the
                client's brand wishes we don't name them on the page; framed as a corporate-level build. */}
            <div className="card case-card" data-reveal>
              <div className="case-name">Multi-agent outreach system</div>
              <div className="case-result grad-text">Corporate-grade</div>
              <p>Built to enterprise spec & cleared at scale. Today that same systems-first approach runs lead-gen for businesses across Canada.</p>
            </div>
            <div className="card case-card" data-reveal>
              <div className="case-name">Jawanda Consulting</div>
              <div className="case-result grad-text">3× qualified leads</div>
              <p>“The results were nothing short of exceptional — a fresh, data-driven approach to our campaigns.” — Harry Jawanda, Founder</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TRUSTED BY ===== */}
      <TrustMarquee />

      {/* ===== CTA ===== */}
      <section className="section cta-final">
        <div className="container center">
          <h2 className="h2" data-reveal style={{ maxWidth: '18ch', margin: '0 auto' }}>
            Let's fill your <span className="grad-text">pipeline.</span>
          </h2>
          <p className="lead center" data-reveal style={{ margin: '20px auto 32px' }}>
            Thirty minutes, no pitch. We'll show you where your next customers are & exactly how we'd reach them.
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
        .case-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px; }
        .case-card { display: flex; flex-direction: column; gap: 10px; }
        .case-name { font-family: var(--mono); font-size: 12px; letter-spacing: .14em; text-transform: uppercase; color: var(--muted); }
        .case-result { font-family: var(--display); font-weight: 600; font-size: clamp(24px, 2.6vw, 32px); line-height: 1.05; }
        .case-card p { color: var(--ink-dim); line-height: 1.5; font-size: 15px; }
        .exp-chips { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 28px; }
        .exp-chip { font-family: var(--mono); font-size: 13px; color: var(--ink-dim); border: 1px solid var(--line); border-radius: 999px; padding: 8px 16px; }
        @media (max-width: 760px) {
          .lg-steps { grid-template-columns: 1fr; }
          .case-grid { grid-template-columns: 1fr; }
          .metrics { gap: 36px; }
        }
      `}</style>
    </>
  )
}
