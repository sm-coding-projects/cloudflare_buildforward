<template>
  <component :is="as" ref="root" class="text-reveal" :class="className" :aria-label="text">
    <span v-for="(word, index) in words" :key="`${word}-${index}`" class="text-reveal__mask" aria-hidden="true">
      <span class="text-reveal__word">{{ word }}{{ index < words.length - 1 ? ' ' : '' }}</span>
    </span>
  </component>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    as?: string
    text: string
    className?: string
    delay?: number
  }>(),
  {
    as: 'p',
    className: '',
    delay: 0
  }
)

const root = ref<HTMLElement | null>(null)
const words = computed(() => props.text.split(' '))
const reducedMotion = useReducedMotion()

let ctx: { revert: () => void } | undefined

onMounted(() => {
  if (reducedMotion.value || !shouldUseRichMotion() || !root.value) {
    root.value?.classList.add('is-visible')
    return
  }

  const { $gsap, $ScrollTrigger } = useNuxtApp() as unknown as {
    $gsap: typeof import('gsap').gsap
    $ScrollTrigger: typeof import('gsap/ScrollTrigger').default
  }

  ctx = $gsap.context(() => {
    $gsap.fromTo(
      '.text-reveal__word',
      { yPercent: 112, opacity: 0 },
      {
        yPercent: 0,
        opacity: 1,
        duration: 0.9,
        delay: props.delay,
        ease: 'power4.out',
        stagger: 0.035,
        scrollTrigger: {
          trigger: root.value,
          start: 'top 82%',
          once: true
        }
      }
    )

    $ScrollTrigger.refresh()
  }, root.value)
})

onBeforeUnmount(() => {
  ctx?.revert()
})
</script>
