<template>
  <section ref="root" class="approach-section" aria-labelledby="approach-title">
    <div class="section-heading">
      <p class="eyebrow">Approach</p>
      <h2 id="approach-title">A calmer path from brief to handover.</h2>
    </div>

    <ol class="approach-list">
      <li v-for="(step, index) in approachSteps" :key="step.title" class="approach-item">
        <span>{{ String(index + 1).padStart(2, '0') }}</span>
        <div>
          <h3>{{ step.title }}</h3>
          <p>{{ step.text }}</p>
        </div>
      </li>
    </ol>
  </section>
</template>

<script setup lang="ts">
import { approachSteps } from '~/data/site'

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
      '.approach-item',
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.75,
        ease: 'power3.out',
        stagger: 0.08,
        scrollTrigger: {
          trigger: root.value,
          start: 'top 72%',
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
