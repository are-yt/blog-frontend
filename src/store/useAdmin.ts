import { reactive } from 'vue'
import { defineStore } from 'pinia'
interface Info {
  id: number
  name: string
  nickname: string
  signature: string
  avatar: string
  articleTotal: number
  tagsTotal: number
  cateTotal: number
}
export const useAdmin = defineStore('admin', () => {
  const adminInfo = reactive({
    id: 0,
    name: '',
    nickname: '',
    avatar: '',
    signature: '',
    articleTotal: 0,
    tagsTotal: 0,
    cateTotal: 0
  })
  const updateInfo = (info: Info) => {
    const {
      id,
      name,
      nickname,
      signature,
      avatar,
      articleTotal,
      tagsTotal,
      cateTotal
    } = info
    adminInfo.id = id
    adminInfo.name = name
    adminInfo.signature = signature
    adminInfo.nickname = nickname
    adminInfo.avatar = avatar
    adminInfo.articleTotal = articleTotal
    adminInfo.tagsTotal = tagsTotal
    adminInfo.cateTotal = cateTotal
  }
  return {
    adminInfo,
    updateInfo
  }
})
