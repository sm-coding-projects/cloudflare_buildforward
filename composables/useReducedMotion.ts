export const useReducedMotion = () => {
  const prefersReducedMotion = useState('prefers-reduced-motion', () => false)

  if (import.meta.client) {
    let query: MediaQueryList | undefined
    let update: (() => void) | undefined

    onMounted(() => {
      query = window.matchMedia('(prefers-reduced-motion: reduce)')
      update = () => {
        if (!query) {
          return
        }

        prefersReducedMotion.value = query.matches
        document.documentElement.classList.toggle('reduced-motion', query.matches)
      }

      update()
      query.addEventListener('change', update)
    })

    onBeforeUnmount(() => {
      if (query && update) {
        query.removeEventListener('change', update)
      }
    })
  }

  return prefersReducedMotion
}
