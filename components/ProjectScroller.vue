<template>
  <section ref="root" class="project-scroller" aria-labelledby="featured-projects">
    <div class="project-scroller__rail">
      <p class="eyebrow">Signature projects</p>
      <h2 id="featured-projects">Homes with a sharper line of sight.</h2>
      <p>
        Selected Build Forward residences are arranged as a scroll-led project sequence, preserving the original portfolio while giving each home room to speak.
      </p>
      <NuxtLink class="text-link" to="/projects">View all projects</NuxtLink>
    </div>

    <div class="project-scroller__track">
      <article v-for="(project, index) in projects" :key="project.slug" class="project-story">
        <NuxtLink class="project-story__media" :to="`/projects/${project.slug}`">
          <picture>
            <source
              type="image/webp"
              :srcset="project.heroWebpSrcset"
              sizes="(max-width: 760px) 96vw, (max-width: 1080px) 92vw, 56vw"
            />
            <img
              :src="project.heroImage"
              :srcset="project.heroSrcset"
              sizes="(max-width: 760px) 96vw, (max-width: 1080px) 92vw, 56vw"
              :alt="`${project.title} home design in ${project.location}`"
              loading="lazy"
              decoding="async"
            />
          </picture>
        </NuxtLink>
        <div class="project-story__copy">
          <span>{{ String(index + 1).padStart(2, '0') }}</span>
          <h3>{{ project.title }}</h3>
          <p>{{ project.summary }}</p>
          <dl>
            <div>
              <dt>Location</dt>
              <dd>{{ project.location }}</dd>
            </div>
            <div>
              <dt>Type</dt>
              <dd>{{ project.features[0] }}</dd>
            </div>
          </dl>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
import { projects } from '~/data/projects'

const root = ref<HTMLElement | null>(null)
const reducedMotion = useReducedMotion()
let ctx: { revert: () => void } | undefined

onMounted(() => {
  if (reducedMotion.value || !shouldUseRichMotion() || !root.value) {
    return
  }

  const { $gsap } = useNuxtApp() as unknown as { $gsap: typeof import('gsap').gsap }

  ctx = $gsap.context(() => {
    const stories = $gsap.utils.toArray<HTMLElement>('.project-story')

    stories.forEach((story) => {
      const image = story.querySelector('img')
      const copy = story.querySelector('.project-story__copy')

      $gsap.fromTo(
        story,
        { opacity: 0.45 },
        {
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: story,
            start: 'top 72%',
            end: 'bottom 42%',
            scrub: true
          }
        }
      )

      if (image) {
        $gsap.fromTo(
          image,
          { scale: 1.14, yPercent: -4 },
          {
            scale: 1,
            yPercent: 4,
            ease: 'none',
            scrollTrigger: {
              trigger: story,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true
            }
          }
        )
      }

      if (copy) {
        $gsap.fromTo(
          copy,
          { y: 38, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.75,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: story,
              start: 'top 68%',
              once: true
            }
          }
        )
      }
    })
  }, root.value)
})

onBeforeUnmount(() => {
  ctx?.revert()
})
</script>
