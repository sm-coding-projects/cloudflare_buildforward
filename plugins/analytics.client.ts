export default defineNuxtPlugin(() => {
  const loadAnalytics = () => {
    if (document.querySelector('script[data-build-forward-analytics]')) {
      return
    }

    const analyticsWindow = window as typeof window & {
      dataLayer?: unknown[][]
      gtag?: (...args: unknown[]) => void
    }

    analyticsWindow.dataLayer = analyticsWindow.dataLayer || []
    analyticsWindow.gtag = (...args: unknown[]) => {
      analyticsWindow.dataLayer?.push(args)
    }

    analyticsWindow.gtag('js', new Date())
    analyticsWindow.gtag('config', 'G-TJ4WG7FPR3')

    const script = document.createElement('script')
    script.src = 'https://www.googletagmanager.com/gtag/js?id=G-TJ4WG7FPR3'
    script.async = true
    script.dataset.buildForwardAnalytics = 'true'
    document.head.appendChild(script)
  }

  const schedule = () => {
    window.setTimeout(() => {
      if ('requestIdleCallback' in window) {
        window.requestIdleCallback(loadAnalytics, { timeout: 2500 })
      } else {
        loadAnalytics()
      }
    }, 3500)
  }

  if (document.readyState === 'complete') {
    schedule()
  } else {
    window.addEventListener('load', schedule, { once: true })
  }
})
