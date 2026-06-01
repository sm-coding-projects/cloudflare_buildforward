<template>
  <footer class="footer-section">
    <div>
      <NuxtLink class="footer-section__brand" to="/">
        <span aria-hidden="true">BF</span>
        Build Forward Homes
      </NuxtLink>
      <p>{{ siteSettings.positioning }}</p>
    </div>

    <div>
      <h2>Service Area</h2>
      <p>{{ siteSettings.contact.serviceAreas.join(', ') }}</p>
    </div>

    <div>
      <h2>Contact</h2>
      <p>
        <a :href="`mailto:${siteSettings.contact.email}`">{{ siteSettings.contact.email }}</a><br />
        <a :href="siteSettings.contact.phoneHref">{{ siteSettings.contact.phoneDisplay }}</a>
      </p>
    </div>

    <p class="footer-section__fine">© Build Forward Homes. All rights reserved.</p>
  </footer>
</template>

<script setup lang="ts">
import { siteSettings } from '~/data/site'
</script>
