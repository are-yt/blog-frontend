import { ref, onMounted } from 'vue'
export const useScroll = (): any => {
  const y = ref(0)
  onMounted(() => {
    window.addEventListener('scroll', () => {
      y.value = document.documentElement.scrollTop || document.body.scrollTop
    })
  })
  return {
    y
  }
}
