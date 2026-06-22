const CALENDLY = 'https://calendly.com/kamran1-sou9/new-meeting'
const BASE = import.meta.env.BASE_URL

// Temporary gate for pages that aren't public yet (About copy + offer pages).
// Swap the route back to the real page in App.jsx when each one is ready.
export default function ComingSoon({ title = 'Coming soon' }) {
  return (
    <section className="section" style={{ minHeight: '72vh', display: 'flex', alignItems: 'center' }}>
      <div className="container center">
        <img src={`${BASE}arrow-mark.png`} alt="" style={{ width: 54, height: 54, margin: '0 auto 26px', opacity: 0.9 }} />
        <div className="eyebrow" style={{ display: 'block' }}>{title}</div>
        <h1 className="h2" style={{ maxWidth: '16ch', margin: '0 auto' }}>
          This one's <span className="grad-text">in the build.</span>
        </h1>
        <p className="lead center" style={{ margin: '18px auto 30px' }}>
          We're shipping pages fast. Want the walkthrough before it's public? Book a call and we'll show you live.
        </p>
        <a className="btn" href={CALENDLY} target="_blank" rel="noreferrer">Book a call</a>
      </div>
    </section>
  )
}
