<template>
  <NuxtLink ref="root" class="project-card" :to="`/projects/${project.slug}`" :aria-label="`View ${project.title} project`">
    <span class="project-card__image">
      <picture>
        <source
          type="image/webp"
          :srcset="project.heroWebpSrcset"
          sizes="(max-width: 760px) 96vw, (max-width: 1080px) 48vw, 33vw"
        />
        <img
          :src="project.heroImage"
          :srcset="project.heroSrcset"
          sizes="(max-width: 760px) 96vw, (max-width: 1080px) 48vw, 33vw"
          :alt="`${project.title} home design in ${project.location}`"
          loading="lazy"
          decoding="async"
        />
      </picture>
    </span>
    <span class="project-card__content">
      <span class="project-card__count">{{ number }}</span>
      <span>
        <strong>{{ project.title }}</strong>
        <em>{{ project.location }}</em>
      </span>
    </span>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { ComponentPublicInstance } from 'vue'
import type { Project } from '~/data/projects'

defineProps<{
  project: Project
  number: string
}>()

const root = ref<HTMLElement | ComponentPublicInstance | null>(null)
const reducedMotion = useReducedMotion()
let ctx: { revert: () => void } | undefined

const getRootElement = () => {
  if (root.value instanceof HTMLElement) {
    return root.value
  }

  return (root.value?.$el as HTMLElement | undefined) || null
}

onMounted(() => {
  const element = getRootElement()

  if (reducedMotion.value || !shouldUseRichMotion() || !element) {
    return
  }

  const { $gsap } = useNuxtApp() as unknown as { $gsap: typeof import('gsap').gsap }

  ctx = $gsap.context(() => {
    $gsap.fromTo(
      element,
      { y: 42, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 86%',
          once: true
        }
      }
    )
  }, element)
})

onBeforeUnmount(() => {
  ctx?.revert()
})
</script>
