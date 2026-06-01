<template>
  <div>
    <section class="page-hero page-hero--contact" aria-labelledby="contact-title">
      <p class="eyebrow">Contact</p>
      <TextReveal id="contact-title" as="h1" text="Start a considered build conversation." />
      <p>We build across New South Wales. Tell us about your project and the Build Forward Homes team will get in touch.</p>
    </section>

    <section class="contact-layout" aria-label="Contact Build Forward Homes">
      <form class="contact-form" action="https://formsubmit.co/info@buildforward.com.au" method="POST">
        <input type="text" name="_honey" tabindex="-1" autocomplete="off" aria-hidden="true" class="honeypot" />
        <input type="hidden" name="_subject" value="Build Forward Homes website enquiry" />

        <label>
          <span>Name</span>
          <input required name="name" autocomplete="name" />
        </label>

        <label>
          <span>Email</span>
          <input required type="email" name="email" autocomplete="email" />
        </label>

        <label>
          <span>Phone</span>
          <input name="phone" autocomplete="tel" />
        </label>

        <label>
          <span>Build location</span>
          <input name="build_location" autocomplete="address-level2" />
        </label>

        <label>
          <span>Project type</span>
          <select name="project_type">
            <option value="">Select a project type</option>
            <option>Custom home</option>
            <option>Knockdown rebuild</option>
            <option>New residence</option>
            <option>Other</option>
          </select>
        </label>

        <label>
          <span>Budget range</span>
          <select name="budget_range">
            <option value="">Select a budget range</option>
            <option>$500k - $750k</option>
            <option>$750k - $1m</option>
            <option>$1m - $1.5m</option>
            <option>$1.5m+</option>
            <option>Prefer to discuss</option>
          </select>
        </label>

        <label>
          <span>Timeline</span>
          <select name="timeline">
            <option value="">Select a timeline</option>
            <option>Ready to start</option>
            <option>3 - 6 months</option>
            <option>6 - 12 months</option>
            <option>12+ months</option>
          </select>
        </label>

        <label class="contact-form__message">
          <span>Message</span>
          <textarea required name="message" rows="7"></textarea>
        </label>

        <button class="button button--primary" type="submit">Send enquiry</button>
      </form>

      <aside class="contact-panel">
        <p class="eyebrow">General enquiries</p>
        <h2>Build Forward Homes</h2>
        <p>
          <a :href="`mailto:${siteSettings.contact.email}`">{{ siteSettings.contact.email }}</a><br />
          <a :href="siteSettings.contact.phoneHref">{{ siteSettings.contact.phoneDisplay }}</a>
        </p>
        <p class="muted">Service area: {{ siteSettings.contact.serviceAreas.join(', ') }}</p>
      </aside>
    </section>
  </div>
</template>

<script setup lang="ts">
import { siteSettings } from '~/data/site'

useSeoMeta({
  title: siteSettings.seo.contact.title,
  description: siteSettings.seo.contact.description,
  ogTitle: siteSettings.seo.contact.title,
  ogDescription: siteSettings.seo.contact.description
})
</script>
