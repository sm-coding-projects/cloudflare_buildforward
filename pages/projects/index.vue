<template>
  <div>
    <section class="page-hero" aria-labelledby="projects-title">
      <p class="eyebrow">Projects</p>
      <TextReveal id="projects-title" as="h1" text="Selected homes across New South Wales." />
      <p>Explore the preserved Build Forward Homes project set, rebuilt as a premium animated index.</p>
    </section>

    <section class="project-index" aria-label="Project index">
      <ProjectCard
        v-for="(project, index) in projects"
        :key="project.slug"
        :project="project"
        :number="String(index + 1).padStart(2, '0')"
      />
    </section>

    <ContactCTA />
  </div>
</template>

<script setup lang="ts">
import { projects } from '~/data/projects'
import { siteSettings } from '~/data/site'

useSeoMeta({
  title: siteSettings.seo.projects.title,
  description: siteSettings.seo.projects.description,
  ogTitle: siteSettings.seo.projects.title,
  ogDescription: siteSettings.seo.projects.description
})
</script>
