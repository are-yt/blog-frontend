<template>
  <div class="main">
    <img :src="adminStore.adminInfo.avatar" />
    <span>占位信息...</span>
  </div>
</template>

<script setup lang="ts">
import { useAdmin } from '@/store'
const adminStore = useAdmin()
</script>

<style scoped lang="less">
.main {
  width: 60%;
  margin: 0 auto;
  padding: 1rem;
  background: #fff;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  line-height: 4rem;
  img {
    width: 90px;
    height: 90px;
    border-radius: 50%;
  }
}
</style>

<style scoped>
@media (max-width: 960px) {
  .main {
    width: 85%;
  }
}
</style>
