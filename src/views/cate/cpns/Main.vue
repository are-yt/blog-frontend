<template>
  <div class="main">
    <div class="title">分类-6</div>
    <div class="list">
      <template v-for="item in cateList" :key="item.id">
        <div class="item" @click="cateArticle(item)">
          <i class="iconfont icon-circle"></i>
          <span>{{ item.name }} ({{ item.total }})</span>
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
const cateList = ref<any>([])
// 获取分类列表
request
  .request({
    url: '/cate/list',
    method: 'GET'
  })
  .then(res => {
    cateList.value.push(...res.data)
  })
const cateArticle = (item: any) => {
  const { total, name, id } = item
  router.push({ name: 'cate-article', params: { total, name , id} })
}
</script>

<style scoped lang="less">
.main {
  width: 60%;
  margin: 0 auto;
  padding: 2rem 1rem;
  background: #fff;
  border-radius: 10px;
  .title {
    font-size: 2.5rem;
    font-weight: bold;
    text-align: center;
    margin: 1.5rem 0;
  }
  .list {
    .item {
      margin-bottom: 1rem;
      cursor: pointer;
      &:hover {
        color: #90d7ec;
      }
      span {
        margin-left: 0.5rem;
      }
    }
  }
}
</style>

<style scoped lang="less">
.main {
  width: 85%;
}
</style>
