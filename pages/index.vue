<template>
  <div>
    <HeroSection
      :eyebrow="`Boutique builder - ${serviceAreaLine}`"
      :title="siteSettings.name"
      :lead="`${siteSettings.heroLine} ${siteSettings.positioning}`"
      :image="projects[0].heroImage"
      :image-srcset="projects[0].heroSrcset"
      :image-webp-srcset="projects[0].heroWebpSrcset"
      :image-alt="`${projects[0].title} home design in ${projects[0].location}`"
      :image-caption="`${projects[0].title}, ${projects[0].location}`"
      primary-href="/projects"
      primary-label="Explore projects"
      secondary-href="/contact"
      secondary-label="Enquire"
      intro
    />

    <section class="editorial-section" aria-labelledby="home-intro-title">
      <p class="eyebrow">Modern functional homes</p>
      <TextReveal
        id="home-intro-title"
        as="h2"
        text="We craft homes that balance luxury detail with everyday function."
        class-name="editorial-section__title"
      />
      <p>
        Build Forward Homes preserves a boutique construction process across New South Wales, bringing considered design decisions and disciplined delivery into each residence.
      </p>
    </section>

    <ProjectScroller />
    <ApproachSection />
    <ServiceAreaSection />
    <ContactCTA />
  </div>
</template>

<script setup lang="ts">
import { projects } from '~/data/projects'
import { siteSettings } from '~/data/site'

const serviceAreaLine = siteSettings.contact.serviceAreas.join(', ')

useSeoMeta({
  title: siteSettings.seo.home.title,
  description: siteSettings.seo.home.description,
  ogTitle: siteSettings.seo.home.title,
  ogDescription: siteSettings.positioning,
  ogImage: `${siteSettings.url}${projects[0].heroImage}`
})
</script>
