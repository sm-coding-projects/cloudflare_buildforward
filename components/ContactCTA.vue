<template>
  <section ref="root" class="contact-cta" aria-labelledby="contact-cta-title">
    <div>
      <p class="eyebrow">Start your build</p>
      <h2 id="contact-cta-title">Tell us where you want to build next.</h2>
    </div>
    <div>
      <p>
        Share your location, timeline, and the type of home you are planning. Build Forward Homes will respond using the original enquiry details preserved from the legacy site.
      </p>
      <NuxtLink class="button button--primary" to="/contact">Request a callback</NuxtLink>
    </div>
  </section>
</template>

<script setup lang="ts">
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
      root.value,
      { clipPath: 'inset(8% 4% 8% 4%)', opacity: 0.7 },
      {
        clipPath: 'inset(0% 0% 0% 0%)',
        opacity: 1,
        duration: 1,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: root.value,
          start: 'top 78%',
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
