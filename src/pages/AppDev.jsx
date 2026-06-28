const CALENDLY = 'https://calendly.com/kamran1-sou9/new-meeting'

const FEATURES = [
  'Everything in the Website tier',
  "An inbound AI receptionist that answers, books, & qualifies every call, 24/7, in your brand's voice",
  'A CRM that captures every lead & follows up so none go cold',
  'A company AI brain that learns your business and answers like you would',
  'Custom automations built around how your company actually runs',
  'Monthly strategy session',
]

export default function AppDev() {
  return (
    <>
      {/* ===== INTRO ===== */}
      <section className="section app-hero">
        <div className="container center">
          <div className="eyebrow" data-reveal>App · Early Access</div>
          <h1 className="h1" data-reveal style={{ maxWidth: '17ch', margin: '0 auto' }}>
            The brand that answers its own <span className="grad-text">phone.</span>
          </h1>
          <p className="lead center" data-reveal style={{ margin: '22px auto 0' }}>
            A full inbound stack: AI receptionist, CRM, company brain, and custom automations — running 24/7 so your
            front desk never goes to voicemail.
          </p>
        </div>
      </section>

      {/* ===== PRICING ===== */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="app-card card" data-reveal style={{ border: '2px solid var(--blue-deep)', position: 'relative' }}>
            <div className="app-flag">In development · early access</div>
            <div className="app-card-inner">
              <div>
                <div className="kicker-num">What's included</div>
                <h2 className="h2" style={{ maxWidth: '16ch', marginTop: 8 }}>
                  Your full inbound <span className="grad-text">front desk.</span>
                </h2>
                <ul className="app-list">
                  {FEATURES.map((x) => <li key={x}>{x}</li>)}
                </ul>
              </div>
              <div className="app-price-block">
                <div className="app-price"><span className="grad-text">$997</span><span className="app-per">/mo + tax</span></div>
                <div className="app-setup">+ one-time setup (custom)</div>
                <p className="app-note">Early-access pricing while we build it out with founding clients. Rate is locked for the life of your contract.</p>
                <a className="btn app-cta" href={CALENDLY} target="_blank" rel="noreferrer">Book a call →</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== INBOUND / DEFENSE ===== */}
      <section className="section">
        <div className="container">
          <div className="eyebrow" data-reveal>Inbound only · your defense</div>
          <h2 className="h2" data-reveal style={{ maxWidth: '20ch' }}>
            The call you'd have missed becomes the <span className="grad-text">booking you didn't.</span>
          </h2>
          <p className="lead" data-reveal style={{ marginTop: 18, maxWidth: '62ch' }}>
            Behind it is a company AI brain that learns how your business actually works, then runs your front desk:
            every inbound call answered, booked, & qualified, day or night, in your voice. It never cold-calls &
            never chases; it plays defense. Lead Gen finds the customer; the brain makes sure not one of them hits a
            voicemail.
          </p>
          <p className="app-dev-note" data-reveal>
            The app is in active development. This is early-access pricing while we build it out with founding clients.
          </p>
        </div>
      </section>

      {/* ===== BESPOKE CALLOUT ===== */}
      <section className="section depth-band">
        <div className="container">
          <div className="eyebrow" data-reveal>Beyond the tiers</div>
          <h2 className="h2" data-reveal style={{ maxWidth: '20ch' }}>
            We don't just build sites. We build <span className="grad-text">systems.</span>
          </h2>
          <p className="lead" data-reveal style={{ marginTop: 18, maxWidth: '62ch' }}>
            The tiers are the productized front door. Behind them, we build the harder things: multi-agent systems,
            custom tools, & automations. The lead-gen engine behind one of our clients sources & scores 88,000+
            prospects every day. We built it, we run it.
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
            Lock in early-access <span className="grad-text">pricing.</span>
          </h2>
          <p className="lead center" data-reveal style={{ margin: '20px auto 32px' }}>
            Thirty minutes, no pitch. We'll show you what we'd build & which tier fits.
          </p>
          <div className="cta-row" data-reveal style={{ justifyContent: 'center' }}>
            <a className="btn" href={CALENDLY} target="_blank" rel="noreferrer">Book a call</a>
          </div>
        </div>
      </section>

      <style>{`
        .app-hero { padding-top: 150px; }
        .app-flag { position: absolute; top: 0; right: 18px; transform: translateY(-50%); background: var(--grad); color: #03131c; font-family: var(--mono); font-size: 11px; font-weight: 500; padding: 4px 12px; border-radius: 999px; white-space: nowrap; }
        .app-card { padding: 52px; }
        .app-card-inner { display: grid; grid-template-columns: 1fr auto; gap: 56px; align-items: start; }
        .app-list { list-style: none; display: flex; flex-direction: column; gap: 12px; margin-top: 28px; }
        .app-list li { color: var(--muted); line-height: 1.5; padding-left: 24px; position: relative; }
        .app-list li::before { content: '↗'; position: absolute; left: 0; color: var(--cyan); }
        .app-price-block { display: flex; flex-direction: column; gap: 10px; min-width: 220px; }
        .app-price { font-family: var(--display); font-weight: 600; font-size: 52px; line-height: 1; display: flex; align-items: baseline; gap: 6px; }
        .app-per { font-family: var(--mono); font-size: 13px; color: var(--muted); font-weight: 400; }
        .app-setup { font-family: var(--mono); font-size: 12px; color: var(--muted); }
        .app-note { font-family: var(--mono); font-size: 12px; color: var(--muted); line-height: 1.5; max-width: 28ch; border-left: 2px solid var(--line-2); padding-left: 12px; margin-top: 4px; }
        .app-cta { margin-top: 14px; }
        .app-dev-note { font-family: var(--mono); font-size: 13px; color: var(--muted); margin-top: 18px; border-left: 2px solid var(--line-2); padding-left: 16px; max-width: 60ch; }
        .depth-note { font-size: 15px; color: var(--ink-dim); margin-top: 22px; }
        .depth-note a { color: var(--cyan); font-weight: 600; }
        @media (max-width: 760px) {
          .app-card { padding: 28px 20px; }
          .app-card-inner { grid-template-columns: 1fr; gap: 32px; }
        }
      `}</style>
    </>
  )
}
