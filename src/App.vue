<template>
  <div id="app">
    <Navigator :y="y" />
    <router-view #="{ Component }">
      <component :is="Component"></component>
    </router-view>
    <GlobalFooter v-if="footerStore.isShow" />
  </div>
</template>

<script lang="ts">
export default {
  name: 'App'
}
</script>

<script setup lang="ts">
import Navigator from './components/global/navigator/Navigator.vue'
import GlobalFooter from './components/global/footer/Footer.vue'
import { useScroll } from './tools'
import { request } from '@/request'
import { useAdmin, useAccount, useFooter } from '@/store'
const adminStore = useAdmin()
const footerStore = useFooter()

const y = useScroll().y

// 请求站主信息
request
  .request({
    url: '/admin/info',
    method: 'GET'
  })
  .then(res => {
    // 保存站主信息到store中
    const {
      id,
      name,
      nickname,
      signature,
      avatar,
      articleTotal,
      tagsTotal,
      cateTotal
    } = res.data
    const obj = {
      id,
      name,
      nickname,
      signature,
      avatar,
      articleTotal,
      tagsTotal,
      cateTotal
    }
    adminStore.updateInfo(obj)
  })
// 将用户信息放入store
const userInfo = localStorage.getItem('cyblog-user-info')
if (userInfo) {
  useAccount().updateAccountInfo(JSON.parse(userInfo))
}
</script>

<style src="normalize.css"></style>
<style src="./assets/css/common.css"></style>
<style src="./assets/css/styles.css"></style>
<style src="./assets/css/font/icon.css"></style>
<style scoped lang="less">
body,
#app {
  width: 100%;
  height: 100vh;
}
</style>
