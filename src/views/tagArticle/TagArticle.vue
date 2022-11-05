<template>
  <div class="tag-article">
    <PageTop
      :title="`标签-${props.name}`"
      bg="http:///p0.qhimg.com/t0167d058db771b6c4d.jpg"
    />
    <Transition name="page-content" appear>
      <div class="container">
        <div class="list">
          <template v-if="list.length">
            <div v-for="item in list" :key="item.id" class="item" @click="articleDetail(item.id)">
              <img :src="item.surface" />
              <div class="info">
                <div>{{ item.title }}</div>
                <div class="time-and-cate">
                  <span>{{ item.createAt }}</span>
                  <span>
                    <img src="~@/assets/imgs/tag.svg" />
                    {{ item.cateName }}
                  </span>
                </div>
                <div class="tags">
                  <span v-for="item2 in item.tags" :key="item2">{{
                    item2
                  }}</span>
                </div>
              </div>
            </div>
          </template>
        </div>
        <ElButton v-if="total > list.length" type="primary" class="btn" @click="getArticleByTag">加载更多</ElButton>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import PageTop from '@/components/common/PageTop.vue'
import { request } from '@/request'
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
const router = useRouter()
const props = defineProps<{
  id: string
  name: string
}>()
// 根据标签获取对应文章数据
let pageIndex = 0
let pageSize = 6
const list = ref<any>([])
const total = ref(0)
const getArticleByTag = () => {
  request
    .request({
      url: `/article/tag/${props.id}/${pageIndex}/${pageSize}`,
      method: 'GET'
    })
    .then(res => {
      if (res.data.errorCode) {
        return ElMessage.warning({ message: res.data.message })
      }
      pageIndex++
      pageSize = 3
      list.value = res.data.list
      total.value = res.data.total
      console.log(list.value)
    })
}
getArticleByTag()
const articleDetail = (id: number) => {
  router.push({ name: 'articleDetail', params: { id } })
}
</script>

<style scoped lang="less">
.container {
  padding: 1rem 0;
  background: var(--main-background-color);
  .list {
    width: 70%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin: 0 auto;
    .item {
      background: #fff;
      border-radius: 10px;
      margin: 1rem 0;
      cursor: pointer;
      img {
        display: block;
        width: 300px;
        height: 210px;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
      }
      .info {
        padding: 0.5rem;
        .time-and-cate {
          display: flex;
          justify-content: space-between;
          align-items: center;
          span {
            display: flex;
            align-items: center;
            img {
              width: 20px;
              height: 20px;
              margin-right: 0.5rem;
            }
          }
          padding: 0.5rem 0;
          font-size: 14px;
          color: #00000080;
          border-bottom: 1px solid #000;
        }
        .tags {
          display: flex;
          flex-wrap: wrap;
          margin: 0.5rem 0;
          span {
            margin-right: 1rem;
            padding: 5px 10px;
            border-radius: 10px;
            font-size: 14px;
            background: linear-gradient(to left, #008c8c, #12b886, #63e6be);
          }
        }
      }
    }
  }
  .btn {
    display: block;
    margin: 1rem auto;
  }
}
</style>

<style scoped lang="less">
@media (max-width: 860px) {
  .container {
    .list {
      width: 80%;
    }
  }
}
@media (max-width: 750px) {
  .container {
    .list {
      .item {
        margin: 1rem auto;
      }
    }
  }
}
</style>
