export default defineNuxtPlugin(async () => {
  const richMotionAllowed = !window.matchMedia('(prefers-reduced-motion: reduce), (pointer: coarse), (max-width: 760px)').matches

  if (!richMotionAllowed) {
    return {
      provide: {
        gsap: null,
        ScrollTrigger: null
      }
    }
  }

  const [{ default: gsap }, { default: ScrollTrigger }] = await Promise.all([import('gsap'), import('gsap/ScrollTrigger')])

  gsap.registerPlugin(ScrollTrigger)

  return {
    provide: {
      gsap,
      ScrollTrigger
    }
  }
})
