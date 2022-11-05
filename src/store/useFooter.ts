import { ref } from 'vue'
import { defineStore } from 'pinia'
export const useFooter = defineStore('footer', () => {
  const isShow = ref(true)
  return {
    isShow
  }
})
