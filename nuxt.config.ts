export default defineNuxtConfig({
  ssr: true,
  devtools: { enabled: false },
  experimental: {
    appManifest: false
  },
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      htmlAttrs: {
        lang: 'en-AU'
      },
      title: 'Build Forward Homes - Luxury Custom Home Builder NSW',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'Build Forward Homes - Luxury custom home builder in NSW. Specializing in modern, functional homes across Greater Sydney, Blue Mountains, Illawarra and Central Coast since 2020.'
        },
        {
          name: 'keywords',
          content:
            'custom home builder, luxury homes, modern homes, NSW home builder, Sydney home builder, Blue Mountains builder'
        },
        { name: 'author', content: 'Build Forward Homes' },
        { name: 'theme-color', content: '#050705' },
        { property: 'og:title', content: 'Build Forward Homes - Luxury Custom Home Builder NSW' },
        {
          property: 'og:description',
          content: 'Boutique builder crafting modern, functional homes across New South Wales since 2020.'
        },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://www.buildforward.com.au' },
        { property: 'og:image', content: 'https://www.buildforward.com.au/photos/Wallangarra/1.jpg' }
      ],
      link: [
        { rel: 'canonical', href: 'https://www.buildforward.com.au' },
        { rel: 'sitemap', type: 'application/xml', title: 'Sitemap', href: '/sitemap.xml' }
      ]
    },
    pageTransition: { name: 'page', mode: 'out-in' }
  },
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/', '/about', '/projects', '/projects/wallangarra', '/projects/beldale', '/projects/pilaster', '/contact']
    }
  },
  routeRules: {
    '/**': {
      headers: {
        'X-Frame-Options': 'DENY',
        'X-Content-Type-Options': 'nosniff',
        'Referrer-Policy': 'strict-origin-when-cross-origin',
        'Permissions-Policy': 'geolocation=(), microphone=(), camera=()'
      }
    }
  },
  typescript: {
    strict: true
  },
  compatibilityDate: '2025-05-15'
})
