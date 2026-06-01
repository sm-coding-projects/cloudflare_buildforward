<template>
  <figure ref="root" class="image-reveal" :class="[{ 'is-portrait': portrait }, className]">
    <div class="image-reveal__media">
      <picture>
        <source v-if="webpSrcset" type="image/webp" :srcset="webpSrcset" :sizes="sizes || undefined" />
        <img
          :src="src"
          :srcset="srcset || undefined"
          :sizes="sizes || undefined"
          :alt="alt"
          :loading="loading"
          :fetchpriority="fetchpriority"
          decoding="async"
        />
      </picture>
    </div>
    <figcaption v-if="caption || eyebrow" class="image-reveal__caption">
      <span v-if="eyebrow">{{ eyebrow }}</span>
      <strong v-if="caption">{{ caption }}</strong>
    </figcaption>
  </figure>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    src: string
    alt: string
    caption?: string
    eyebrow?: string
    srcset?: string
    webpSrcset?: string
    sizes?: string
    loading?: 'lazy' | 'eager'
    fetchpriority?: 'high' | 'low' | 'auto'
    portrait?: boolean
    className?: string
  }>(),
  {
    caption: '',
    eyebrow: '',
    srcset: '',
    webpSrcset: '',
    sizes: '',
    loading: 'lazy',
    fetchpriority: 'auto',
    portrait: false,
    className: ''
  }
)

const root = ref<HTMLElement | null>(null)
const reducedMotion = useReducedMotion()
let ctx: { revert: () => void } | undefined

onMounted(() => {
  if (reducedMotion.value || !shouldUseRichMotion() || !root.value) {
    root.value?.classList.add('is-visible')
    return
  }

  const { $gsap } = useNuxtApp() as unknown as { $gsap: typeof import('gsap').gsap }

  ctx = $gsap.context(() => {
    const image = root.value?.querySelector('img')

    $gsap.fromTo(
      root.value,
      { clipPath: 'inset(18% 10% 18% 10%)', opacity: 0.65 },
      {
        clipPath: 'inset(0% 0% 0% 0%)',
        opacity: 1,
        duration: 1.1,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: root.value,
          start: 'top 84%',
          once: true
        }
      }
    )

    if (image) {
      $gsap.fromTo(
        image,
        { scale: 1.12 },
        {
          scale: 1,
          duration: 1.3,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: root.value,
            start: 'top 84%',
            once: true
          }
        }
      )
    }
  }, root.value)
})

onBeforeUnmount(() => {
  ctx?.revert()
})
</script>
