interface LenisControls {
  destroy: () => void
}

export const useLenis = async (): Promise<LenisControls> => {
  if (import.meta.server) {
    return { destroy: () => undefined }
  }

  const { default: Lenis } = await import('lenis')
  const nuxtApp = useNuxtApp() as unknown as { $ScrollTrigger?: { update: () => void } }
  const lenis = new Lenis({
    duration: 1.08,
    smoothWheel: true,
    wheelMultiplier: 0.85,
    touchMultiplier: 1.2
  })

  lenis.on('scroll', () => nuxtApp.$ScrollTrigger?.update())

  let frame = 0
  const raf = (time: number) => {
    lenis.raf(time)
    frame = window.requestAnimationFrame(raf)
  }

  frame = window.requestAnimationFrame(raf)

  return {
    destroy: () => {
      window.cancelAnimationFrame(frame)
      lenis.destroy()
    }
  }
}
