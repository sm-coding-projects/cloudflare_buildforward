<template>
  <div class="site-shell">
    <NuxtLoadingIndicator color="#00ff4a" :height="2" />
    <AppHeader />
    <main id="main-content" class="site-main" tabindex="-1">
      <NuxtPage />
    </main>
    <FooterSection />
  </div>
</template>

<script setup lang="ts">
import { siteSettings, structuredData } from '~/data/site'

const route = useRoute()
const router = useRouter()
const reducedMotion = useReducedMotion()

let lenisControls: { destroy: () => void } | undefined

useHead({
  titleTemplate: (titleChunk) => (titleChunk ? `${titleChunk}` : siteSettings.seo.home.title),
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(structuredData)
    }
  ]
})

const getLegacyPath = (hash: string) => {
  const legacy = hash.replace(/^#\/?/, '').replace(/\/$/, '').toLowerCase()

  if (!legacy || legacy === 'home') {
    return '/'
  }

  if (legacy === 'about' || legacy === 'projects' || legacy === 'contact') {
    return `/${legacy}`
  }

  if (legacy.startsWith('project/')) {
    const slug = legacy.split('/')[1]
    return slug ? `/projects/${slug}` : '/projects'
  }

  return ''
}

const redirectLegacyHashRoutes = async () => {
  if (!window.location.hash.startsWith('#/')) {
    return
  }

  const path = getLegacyPath(window.location.hash)

  if (path && path !== route.path) {
    await router.replace(path)
  }

  window.history.replaceState(null, '', path || route.path)
}

onMounted(async () => {
  await redirectLegacyHashRoutes()
  window.addEventListener('hashchange', redirectLegacyHashRoutes)

  if (!reducedMotion.value && shouldUseRichMotion()) {
    lenisControls = await useLenis()
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('hashchange', redirectLegacyHashRoutes)
  lenisControls?.destroy()
})
</script>
