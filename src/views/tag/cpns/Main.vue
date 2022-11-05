<template>
  <div class="main">
    <div class="title">标签 - {{ list.length }}</div>
    <div class="list">
      <template v-for="item in list" :key="item.id">
        <div
          class="item"
          :style="{ fontSize: Math.random() * 10 > 5 ? '1.5rem' : '1rem' }"
          @click="tagArticle(item)"
        >
          {{ item.name }}
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { request } from '@/request'
import { useRouter } from 'vue-router'
const router = useRouter()
const list = ref<any>([])
// 请求标签数据
request
  .request({
    url: '/tags/list',
    method: 'GET'
  })
  .then(res => {
    list.value.push(...res.data)
  })
const tagArticle = (item: any) => {
  const { id, name } = item
  router.push({ name: 'tag-article', params: { id, name } })
}
</script>

<style scoped lang="less">
.main {
  width: 60%;
  margin: 0 auto;
  background: #fff;
  border-radius: 10px;
  padding: 2rem 1rem;
  .title {
    font-size: 2rem;
    font-weight: bold;
    text-align: center;
  }
  .list {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    .item {
      margin: 1rem 1rem 0 0;
      cursor: pointer;
      &:hover {
        color: #90d7ec;
      }
    }
  }
}
</style>
<style scoped lang="less">
@media (max-width: 960px) {
  .main {
    width: 85%;
  }
}
</style>
