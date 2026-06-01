# Build Forward Homes

Premium Nuxt 3 rebuild of the Build Forward Homes website, using the original static site content as the source of truth and preserving the Home, About, Projects, and Contact structure.

## Stack

- Nuxt 3 / Vue
- GSAP with ScrollTrigger, registered in `plugins/gsap.client.ts`
- Lenis smooth scrolling through `composables/useLenis.ts`
- Local Storyblok-ready data structures in `data/site.ts` and `data/projects.ts`
- Vercel-ready Nuxt build output

## Install

```bash
npm install
```

## Run Locally

```bash
npm run dev
```

The dev server starts at `http://localhost:3000` unless Nuxt selects another available port.

## Build

```bash
npm run build
```

Preview a production build with:

```bash
npm run preview
```

## Cloudflare Pages

Use Cloudflare Pages as a static Nuxt deployment:

```text
Build command: npm run generate
Build output directory: .output/public
Environment variable: NODE_VERSION=22
```

Manual CLI deploy:

```bash
npm install
npm run generate
npx wrangler pages deploy .output/public --project-name=build-forward-homes
```

## Content

Project and site content is intentionally kept out of page components:

- `data/projects.ts` contains the preserved Wallangarra, Beldale, and Pilaster project data, gallery paths, descriptions, features, and SEO text.
- `data/site.ts` contains navigation, contact details, service areas, brand colours, page SEO, about copy, schema data, and editable process copy.
- Served images live in `public/photos/`. Responsive JPG and WebP variants live in `public/photos/responsive/` at 480, 768, 1200, 1600, and 2200 widths.

The local data shape includes `contentType` and `storyblokComponent` fields so it can later map to Storyblok `project`, `page`, and `site_settings` content types.

## Animations

- GSAP is registered client-side only in `plugins/gsap.client.ts`.
- GSAP and ScrollTrigger are dynamically imported only when rich motion is allowed. Mobile/coarse-pointer and reduced-motion browsers skip the desktop animation payload.
- Component-level animations run in `onMounted` and clean up with `ctx.revert()` or killed ScrollTriggers on unmount.
- Text reveals are defined in `components/TextReveal.vue`.
- Image clip/scale reveals are defined in `components/ImageReveal.vue`.
- Project scroll storytelling is defined in `components/ProjectScroller.vue`.
- Navigation scroll state is defined in `components/FloatingNav.vue`.
- Reduced-motion handling is centralised in `composables/useReducedMotion.ts`.
- Mobile/coarse-pointer rich-motion gating is centralised in `composables/useRichMotion.ts`.
- Google Analytics is deferred in `plugins/analytics.client.ts` so it does not sit in the initial mobile render path.

## Mobile Optimisation

- Project images use `picture`, WebP `source`, `srcset`, and `sizes` so mobile browsers request smaller generated variants instead of the original large JPGs.
- Low-DPR mobile testing selected 480px WebP images; high-DPR mobile testing selected 1200px WebP images.
- Lenis smooth scrolling, GSAP timeline setup, ScrollTrigger reveals, and scrubbed parallax are disabled for coarse-pointer/mobile viewports.
- External Google Fonts were removed from the critical path in favour of system font stacks.
- The mobile navigation was tested at 390px wide with touch enabled.
- All primary routes were checked for horizontal overflow on mobile.

## Routes

- `/`
- `/about`
- `/projects`
- `/projects/wallangarra`
- `/projects/beldale`
- `/projects/pilaster`
- `/contact`

Legacy hash routes such as `/#/home` and `/#/project/wallangarra` are redirected client-side to the new Nuxt routes.

## Storyblok Integration Later

Replace imports from `data/site.ts` and `data/projects.ts` with Storyblok API fetches while keeping the same component props:

- `site_settings` maps to navigation, contact details, service areas, colours, and global SEO.
- `page` maps to Home, About, and Contact page sections.
- `project` maps to project title, slug, location, summary, description, hero image, gallery, features, and SEO.

The process/approach copy in `data/site.ts` is marked as editable because the legacy static site only contained a shorter process outline.
