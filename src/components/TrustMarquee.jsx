const CLIENTS = ['Lease At Ease', 'Lamar Donair', 'Ricco Decor', 'Empire Protection', 'Jawanda Consulting']

// "Trusted by Canadian businesses" as a continuous, looping marquee. CSS-animated
// (no rAF), duplicated list for a seamless loop, fade edges, pause on hover.
export default function TrustMarquee() {
  const loop = [...CLIENTS, ...CLIENTS]
  return (
    <section className="tm">
      <div className="container center">
        <div className="tm-label">Trusted by Canadian businesses</div>
      </div>
      <div className="tm-marquee">
        <div className="tm-track">
          {loop.map((c, i) => (
            <span className="tm-item" key={i}>
              {c}<span className="tm-sep" aria-hidden="true">·</span>
            </span>
          ))}
        </div>
      </div>
      <style>{`
        .tm { padding: 12px 0 40px; }
        .tm-label { font-family: var(--mono); font-size: 12px; letter-spacing: .16em; text-transform: uppercase; color: var(--muted); margin-bottom: 22px; text-align: center; }
        .tm-marquee { overflow: hidden; width: 100%;
          -webkit-mask-image: linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent);
          mask-image: linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent); }
        .tm-track { display: inline-flex; white-space: nowrap; animation: tmScroll 30s linear infinite; will-change: transform; }
        .tm-marquee:hover .tm-track { animation-play-state: paused; }
        .tm-item { display: inline-flex; align-items: center; font-family: var(--display); font-weight: 600; font-size: clamp(18px, 2vw, 24px); color: var(--ink-dim); opacity: .85; }
        .tm-sep { color: var(--cyan); margin: 0 30px; opacity: .55; font-weight: 400; }
        @keyframes tmScroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @media (prefers-reduced-motion: reduce) { .tm-track { animation: none; } }
      `}</style>
    </section>
  )
}
