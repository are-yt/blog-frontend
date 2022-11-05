import { reactive } from 'vue'
import { defineStore } from 'pinia'
interface Account {
  id: number
  name: string
  avatar: string
  email: string
  token: string
}
export const useAccount = defineStore('account', () => {
  const account = reactive<Account>({
    id: 0,
    name: '',
    avatar: '',
    email: '',
    token: ''
  })
  const updateAccountInfo = (obj: Account) => {
    const { id, name, avatar, email, token } = obj
    account.id = id
    account.name = name
    account.avatar = avatar
    account.email = email
    account.token = token
  }
  return {
    account,
    updateAccountInfo
  }
})
