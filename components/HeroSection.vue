<template>
  <section ref="hero" class="hero-section" :class="{ 'hero-section--compact': compact }">
    <div v-if="intro" ref="introEl" class="site-intro" aria-hidden="true">
      <div class="site-intro__mark">BF</div>
      <div class="site-intro__text">Build Forward Homes</div>
    </div>

    <div class="hero-section__content">
      <p class="eyebrow">{{ eyebrow }}</p>
      <TextReveal as="h1" :text="title" class-name="hero-section__title" />
      <p class="hero-section__lead">{{ lead }}</p>

      <div v-if="primaryHref || secondaryHref" class="hero-section__actions">
        <NuxtLink v-if="primaryHref" class="button button--primary" :to="primaryHref">{{ primaryLabel }}</NuxtLink>
        <NuxtLink v-if="secondaryHref" class="button button--ghost" :to="secondaryHref">{{ secondaryLabel }}</NuxtLink>
      </div>
    </div>

    <div class="hero-section__visual">
      <ImageReveal
        :src="image"
        :srcset="imageSrcset"
        :webp-srcset="imageWebpSrcset"
        :sizes="imageSizes"
        :alt="imageAlt"
        loading="eager"
        fetchpriority="high"
        :caption="imageCaption"
      />
    </div>

    <div class="hero-section__scroll" aria-hidden="true">
      <span>Scroll</span>
      <i></i>
    </div>
  </section>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    eyebrow: string
    title: string
    lead: string
    image: string
    imageSrcset?: string
    imageWebpSrcset?: string
    imageSizes?: string
    imageAlt: string
    imageCaption?: string
    primaryHref?: string
    primaryLabel?: string
    secondaryHref?: string
    secondaryLabel?: string
    intro?: boolean
    compact?: boolean
  }>(),
  {
    imageCaption: '',
    imageSrcset: '',
    imageWebpSrcset: '',
    imageSizes: '(max-width: 760px) 96vw, (max-width: 1080px) 86vw, 42vw',
    primaryHref: '',
    primaryLabel: 'Explore',
    secondaryHref: '',
    secondaryLabel: 'Enquire',
    intro: false,
    compact: false
  }
)

const hero = ref<HTMLElement | null>(null)
const introEl = ref<HTMLElement | null>(null)
const reducedMotion = useReducedMotion()
let ctx: { revert: () => void } | undefined

onMounted(() => {
  if (reducedMotion.value || !shouldUseRichMotion() || !hero.value) {
    introEl.value?.remove()
    return
  }

  const { $gsap } = useNuxtApp() as unknown as { $gsap: typeof import('gsap').gsap }

  ctx = $gsap.context(() => {
    if (introEl.value) {
      const timeline = $gsap.timeline({ delay: 0.15 })
      timeline
        .fromTo('.site-intro__mark', { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.55, ease: 'power3.out' })
        .fromTo('.site-intro__text', { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.55, ease: 'power3.out' }, '<0.08')
        .to(introEl.value, { yPercent: -100, duration: 0.9, ease: 'power4.inOut', delay: 0.2 })
        .set(introEl.value, { display: 'none' })
    }

    $gsap.fromTo(
      '.hero-section__lead, .hero-section__actions, .hero-section__scroll, .eyebrow',
      { y: 22, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', stagger: 0.08, delay: introEl.value ? 1.35 : 0.1 }
    )
  }, hero.value)
})

onBeforeUnmount(() => {
  ctx?.revert()
})
</script>
