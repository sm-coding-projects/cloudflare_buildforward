<template>
  <div>
    <HeroSection
      eyebrow="Established 2020"
      title="About Build Forward Homes"
      :lead="aboutContent.intro"
      :image="aboutContent.image"
      image-alt="Build Forward Homes studio mark"
      image-caption="Build Forward Homes"
      primary-href="/projects"
      primary-label="View projects"
      secondary-href="/contact"
      secondary-label="Start a conversation"
      compact
    />

    <section class="split-section" aria-labelledby="philosophy-title">
      <div>
        <p class="eyebrow">Philosophy</p>
        <TextReveal id="philosophy-title" as="h2" text="Striking to see. Effortless to live in." />
      </div>
      <div>
        <p>{{ aboutContent.philosophy }}</p>
        <p class="muted">{{ aboutContent.establishedLine }}</p>
      </div>
    </section>

    <ApproachSection />
    <ContactCTA />
  </div>
</template>

<script setup lang="ts">
import { aboutContent, siteSettings } from '~/data/site'

useSeoMeta({
  title: siteSettings.seo.about.title,
  description: siteSettings.seo.about.description,
  ogTitle: siteSettings.seo.about.title,
  ogDescription: siteSettings.seo.about.description
})
</script>
