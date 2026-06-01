<template>
  <div v-if="project">
    <section class="project-detail-hero" aria-labelledby="project-title">
      <div>
        <NuxtLink class="text-link" to="/projects">Projects</NuxtLink>
        <p class="eyebrow">{{ project.location }}</p>
        <TextReveal id="project-title" as="h1" :text="project.title" class-name="project-detail-hero__title" />
        <p>{{ project.description }}</p>
      </div>
      <ImageReveal
        :src="project.heroImage"
        :srcset="project.heroSrcset"
        :webp-srcset="project.heroWebpSrcset"
        sizes="(max-width: 760px) 96vw, (max-width: 1080px) 92vw, 54vw"
        :alt="`${project.title} home design in ${project.location}`"
        loading="eager"
        fetchpriority="high"
      />
    </section>

    <section class="project-facts" aria-label="Project details">
      <div v-for="feature in project.features" :key="feature">
        <span>{{ feature }}</span>
      </div>
    </section>

    <section class="project-gallery" aria-label="Project gallery">
      <ImageReveal
        v-for="(image, index) in project.gallery"
        :key="image.src"
        :src="image.src"
        :srcset="image.srcset"
        :webp-srcset="image.webpSrcset"
        :sizes="index % 3 === 0 ? '(max-width: 760px) 96vw, (max-width: 1080px) 92vw, 86vw' : image.sizes"
        :alt="image.alt"
        :caption="`${project.title} ${String(index + 1).padStart(2, '0')}`"
      />
    </section>

    <section v-if="nextProject" class="next-project" aria-labelledby="next-project-title">
      <div>
        <p class="eyebrow">Next project</p>
        <h2 id="next-project-title">{{ nextProject.title }}</h2>
        <p>{{ nextProject.summary }}</p>
      </div>
      <NuxtLink class="button button--primary" :to="`/projects/${nextProject.slug}`">View {{ nextProject.title }}</NuxtLink>
    </section>
  </div>
</template>

<script setup lang="ts">
import { getNextProject, getProject } from '~/data/projects'
import { siteSettings } from '~/data/site'

const route = useRoute()
const slug = String(route.params.slug || '')
const project = getProject(slug)

if (!project) {
  throw createError({ statusCode: 404, statusMessage: 'Project not found' })
}

const nextProject = getNextProject(project.slug)

useSeoMeta({
  title: project.seo.title,
  description: project.seo.description,
  ogTitle: project.seo.title,
  ogDescription: project.seo.description,
  ogImage: `${siteSettings.url}${project.heroImage}`
})
</script>
