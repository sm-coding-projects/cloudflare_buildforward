export const shouldUseRichMotion = () => {
  if (import.meta.server) {
    return false
  }

  return !window.matchMedia('(prefers-reduced-motion: reduce), (pointer: coarse), (max-width: 760px)').matches
}
