// Google Analytics (GA4) via gtag, env-configurable.
// Set VITE_GA_ID (e.g. G-XXXXXXXXXX) in .env to enable. No ID = no-op,
// so local/dev builds never pollute the analytics property.
const GA_ID = import.meta.env.VITE_GA_ID || ''

let started = false

export function initAnalytics() {
  if (!GA_ID || started || typeof window === 'undefined') return
  started = true

  const s = document.createElement('script')
  s.async = true
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
  document.head.appendChild(s)

  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag() { window.dataLayer.push(arguments) }
  window.gtag('js', new Date())
  // This is a HashRouter SPA — we send page_view manually on each route change,
  // so turn off the automatic one to avoid double-counting the first load.
  window.gtag('config', GA_ID, { send_page_view: false })
}

export function trackPageView(path) {
  if (!GA_ID || typeof window === 'undefined' || !window.gtag) return
  window.gtag('event', 'page_view', {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
  })
}
