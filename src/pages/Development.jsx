const CALENDLY = 'https://calendly.com/kamran1-sou9/new-meeting'

const TIER1 = [
  'Built from scratch around your brand — never a recycled template',
  'Loads instantly, always on',
  'Designed to turn visitors into booked leads',
  'One-time setup — custom',
]
const TIER2 = [
  'Everything in the Website tier',
  'Automated follow-up, so no inquiry goes cold',
  "An inbound AI receptionist that answers every call, books, and qualifies — 24/7, in your brand's voice",
  'Never miss a call again',
  'One-time setup — custom',
]

export default function Development() {
  return (
    <>
      {/* ===== INTRO ===== */}
      <section className="section dev-hero">
        <div className="container center">
          <div className="eyebrow" data-reveal>Development</div>
          <h1 className="h1" data-reveal style={{ maxWidth: '17ch', margin: '0 auto' }}>
            A site that closes — and a front desk that <span className="grad-text">never sleeps.</span>
          </h1>
          <p className="lead center" data-reveal style={{ margin: '22px auto 0' }}>
            Two ways in: a fast custom site that turns visitors into booked leads — or the full app that answers your
            phone, books, and qualifies every inbound call on its own.
          </p>
        </div>
      </section>

      {/* ===== TIERS ===== */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="tier-grid">
            <div className="card tier" data-reveal>
              <div className="tier-head">
                <div className="kicker-num">Tier 1</div>
                <h3 className="h3">Website</h3>
              </div>
              <div className="tier-price"><span className="grad-text">$97</span><span className="tier-per">/mo + tax</span></div>
              <div className="tier-setup">+ one-time setup (custom)</div>
              <p className="tier-tagline">A fast, custom site built around your brand.</p>
              <ul className="tier-list">
                {TIER1.map((x) => <li key={x}>{x}</li>)}
              </ul>
              <a className="btn-ghost tier-cta" href={CALENDLY} target="_blank" rel="noreferrer">Book a call</a>
            </div>

            <div className="card tier tier-feature" data-reveal>
              <div className="tier-flag">In development · early access</div>
              <div className="tier-head">
                <div className="kicker-num">Tier 2</div>
                <h3 className="h3">App</h3>
              </div>
              <div className="tier-price"><span className="grad-text">$997</span><span className="tier-per">/mo + tax</span></div>
              <div className="tier-setup">+ one-time setup (custom)</div>
              <p className="tier-tagline">The brand that answers its own phone.</p>
              <ul className="tier-list">
                {TIER2.map((x) => <li key={x}>{x}</li>)}
              </ul>
              <a className="btn tier-cta" href={CALENDLY} target="_blank" rel="noreferrer">Book a call</a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== INBOUND / DEFENSE ===== */}
      <section className="section talks-back">
        <div className="container">
          <div className="eyebrow" data-reveal>Inbound only — your defense</div>
          <h2 className="h2" data-reveal style={{ maxWidth: '20ch' }}>
            The call you'd have missed becomes the <span className="grad-text">booking you didn't.</span>
          </h2>
          <p className="lead" data-reveal style={{ marginTop: 18, maxWidth: '60ch' }}>
            The receptionist answers the phone — it never cold-calls, never chases. It picks up every inbound call,
            day or night, books the appointment, and qualifies the lead, all in your brand's voice. Lead Gen finds
            the customer; this makes sure not one of them hits a voicemail.
          </p>
          <p className="talks-note" data-reveal>
            The app is in active development — Tier 2 is early-access pricing while we build it out with founding clients.
          </p>
        </div>
      </section>

      {/* ===== BEYOND THE TIERS — depth signal for high-ticket ===== */}
      <section className="section depth-band">
        <div className="container">
          <div className="eyebrow" data-reveal>Beyond the tiers</div>
          <h2 className="h2" data-reveal style={{ maxWidth: '20ch' }}>
            We don't just build sites. We build <span className="grad-text">systems.</span>
          </h2>
          <p className="lead" data-reveal style={{ marginTop: 18, maxWidth: '62ch' }}>
            The tiers above are the productized front door. Behind them, we build the harder things — multi-agent
            systems, custom tools, and automations. Our own lead-gen engine — 88,000+ prospects sourced and scored —
            is one we built and run ourselves, every day.
          </p>
          <p className="depth-note" data-reveal>
            Need something bespoke? That's a conversation, not a tier.{' '}
            <a href={CALENDLY} target="_blank" rel="noreferrer">Tell us what you're building →</a>
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
            Thirty minutes, no pitch. We'll show you what we'd build and which tier fits.
          </p>
          <div className="cta-row" data-reveal style={{ justifyContent: 'center' }}>
            <a className="btn" href={CALENDLY} target="_blank" rel="noreferrer">Book a call</a>
          </div>
        </div>
      </section>

      <style>{`
        .dev-hero { padding-top: 150px; }
        .tier-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 22px; max-width: 880px; margin: 0 auto; }
        .tier { display: flex; flex-direction: column; gap: 14px; position: relative; }
        .tier-feature { border: 2px solid var(--blue-deep); }
        .tier-flag { position: absolute; top: 0; right: 18px; transform: translateY(-50%); background: var(--grad); color: #03131c; font-family: var(--mono); font-size: 11px; font-weight: 500; padding: 4px 12px; border-radius: 999px; white-space: nowrap; }
        .tier-head { display: flex; flex-direction: column; gap: 4px; }
        .tier-price { font-family: var(--display); font-weight: 600; font-size: 46px; line-height: 1; display: flex; align-items: baseline; gap: 6px; }
        .tier-per { font-family: var(--mono); font-size: 13px; color: var(--muted); font-weight: 400; }
        .tier-setup { font-family: var(--mono); font-size: 12px; color: var(--muted); margin-top: -8px; }
        .tier-tagline { color: var(--ink-dim); font-weight: 500; }
        .tier-list { list-style: none; display: flex; flex-direction: column; gap: 10px; margin-top: 2px; }
        .tier-list li { color: var(--muted); line-height: 1.5; padding-left: 24px; position: relative; }
        .tier-list li::before { content: '↗'; position: absolute; left: 0; color: var(--cyan); }
        .tier-cta { margin-top: auto; justify-content: center; text-align: center; }
        .talks-back { text-align: left; }
        .talks-note { font-family: var(--mono); font-size: 13px; color: var(--muted); margin-top: 18px; border-left: 2px solid var(--line-2); padding-left: 16px; max-width: 60ch; }
        .depth-note { font-size: 15px; color: var(--ink-dim); margin-top: 22px; }
        .depth-note a { color: var(--cyan); font-weight: 600; }
        @media (max-width: 760px) { .tier-grid { grid-template-columns: 1fr; } }
      `}</style>
    </>
  )
}
