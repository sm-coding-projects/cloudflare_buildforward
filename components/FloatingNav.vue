<template>
  <nav ref="navEl" class="floating-nav" :class="{ 'is-compact': compact, 'is-open': mobileOpen }" aria-label="Primary navigation">
    <NuxtLink class="floating-nav__brand" to="/" aria-label="Build Forward Homes home" @click="closeMenu">
      <span class="floating-nav__mark" aria-hidden="true">BF</span>
      <span class="floating-nav__name">Build Forward Homes</span>
    </NuxtLink>

    <button
      class="floating-nav__toggle"
      type="button"
      :aria-expanded="mobileOpen"
      aria-controls="primary-navigation"
      @click="mobileOpen = !mobileOpen"
    >
      <span class="sr-only">Toggle navigation</span>
      <span aria-hidden="true"></span>
    </button>

    <div id="primary-navigation" class="floating-nav__links">
      <NuxtLink
        v-for="item in siteSettings.navigation"
        :key="item.href"
        class="floating-nav__link"
        :class="{ 'is-active': isActive(item.href) }"
        :to="item.href"
        :aria-current="isActive(item.href) ? 'page' : undefined"
        @click="closeMenu"
      >
        {{ item.label }}
      </NuxtLink>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { siteSettings } from '~/data/site'

const route = useRoute()
const navEl = ref<HTMLElement | null>(null)
const mobileOpen = ref(false)
const compact = ref(false)
const reducedMotion = useReducedMotion()

let trigger: { kill: () => void } | undefined
let ctx: { revert: () => void } | undefined

const isActive = (href: string) => {
  if (href === '/projects') {
    return route.path === '/projects' || route.path.startsWith('/projects/')
  }

  return route.path === href
}

const closeMenu = () => {
  mobileOpen.value = false
}

watch(
  () => route.fullPath,
  () => closeMenu()
)

watch(mobileOpen, (isOpen) => {
  if (import.meta.client) {
    document.documentElement.classList.toggle('nav-open', isOpen)
  }
})

onMounted(() => {
  if (reducedMotion.value || !shouldUseRichMotion() || !navEl.value) {
    return
  }

  const { $gsap, $ScrollTrigger } = useNuxtApp() as unknown as {
    $gsap: typeof import('gsap').gsap
    $ScrollTrigger: typeof import('gsap/ScrollTrigger').default
  }

  ctx = $gsap.context(() => {
    $gsap.fromTo(navEl.value, { y: -18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' })
  }, navEl.value)

  trigger = $ScrollTrigger.create({
    start: 10,
    end: 'max',
    onUpdate: (self) => {
      compact.value = self.scroll() > 32
    }
  })
})

onBeforeUnmount(() => {
  trigger?.kill()
  ctx?.revert()
  document.documentElement.classList.remove('nav-open')
})
</script>
