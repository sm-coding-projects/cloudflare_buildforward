<template>
  <section ref="root" class="service-area" aria-labelledby="service-area-title">
    <p class="eyebrow">Service area</p>
    <h2 id="service-area-title">Building across New South Wales.</h2>
    <div class="service-area__words" aria-label="Greater Sydney, Blue Mountains, Illawarra and Central Coast">
      <span v-for="area in siteSettings.contact.serviceAreas" :key="area">{{ area }}</span>
    </div>
  </section>
</template>

<script setup lang="ts">
import { siteSettings } from '~/data/site'

const root = ref<HTMLElement | null>(null)
const reducedMotion = useReducedMotion()
let ctx: { revert: () => void } | undefined

onMounted(() => {
  if (reducedMotion.value || !shouldUseRichMotion() || !root.value) {
    return
  }

  const { $gsap } = useNuxtApp() as unknown as { $gsap: typeof import('gsap').gsap }

  ctx = $gsap.context(() => {
    $gsap.fromTo(
      '.service-area__words span',
      { yPercent: 70, opacity: 0 },
      {
        yPercent: 0,
        opacity: 1,
        duration: 0.75,
        ease: 'power4.out',
        stagger: 0.07,
        scrollTrigger: {
          trigger: root.value,
          start: 'top 68%',
          once: true
        }
      }
    )
  }, root.value)
})

onBeforeUnmount(() => {
  ctx?.revert()
})
</script>
