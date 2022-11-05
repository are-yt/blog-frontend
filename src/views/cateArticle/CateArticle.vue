<template>
  <div class="cate-article">
    <PageTop
      :title="`分类-${props.name}: ${props.total}`"
      bg="http:///p4.qhimg.com/t014fff6ed91935cd74.jpg"
    />
    <Transition name="page-content" appear>
      <div class="container">
        <div class="list">
          <template v-if="list.length">
            <div
              v-for="item in list"
              :key="item.id"
              class="item"
              @click="articleDetail(item.id)"
            >
              <img :src="item.surface" />
              <div class="info">
                <div>{{ item.title }}</div>
                <div class="time-and-cate">
                  <span>
                    {{ item.createAt.replace('.000000', '').split(' ')[0] }}
                  </span>
                  <span>
                    <img src="~@/assets/imgs/tag.svg" />
                    {{ props.name }}
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
        <ElButton
          v-if="Number(props.total) > list.length"
          type="primary"
          class="btn"
          @click="getArticleByCate"
        >
          加载更多
        </ElButton>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import PageTop from '@/components/common/PageTop.vue'
import { request } from '@/request'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
const router = useRouter()
const props = defineProps<{
  total: string
  name: string
  id: string
}>()
const list = ref<any>([])
// 根据分类id获取对应文章列表
let pageIndex = 0
let pageSize = 6
const getArticleByCate = () => {
  request
    .request({
      url: `/article/cate/${props.id}/${pageIndex}/${pageSize}`,
      method: 'GET'
    })
    .then(res => {
      if (res.data.errorCode) {
        return ElMessage.warning({ message: res.data.message })
      }
      list.value = res.data.list
      pageSize = 3
      pageIndex++
    })
}
getArticleByCate()
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
    padding: 1rem;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .item {
      width: 300px;
      margin: 1rem 0;
      background: #fff;
      border-radius: 10px;
      cursor: pointer;
      img {
        display: block;
        width: inherit;
        height: 220px;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
      }
      .info {
        padding: 1rem;
        .time-and-cate {
          display: flex;
          justify-content: space-between;
          font-size: 14px;
          color: #00000080;
          padding: 0.5rem 0;
          border-bottom: 1px solid #00000080;
          span {
            font-size: 14px;
            display: flex;
            align-items: center;
            img {
              width: 20px;
              height: 20px;
              margin-right: 0.5rem;
            }
          }
        }
        .tags {
          display: flex;
          flex-wrap: wrap;
          margin-top: 0.5rem;
          span {
            padding: 5px 0.5rem;
            border-radius: 10px;
            background: linear-gradient(to right, #1ba6c9, #15acdb, #90d7ec);
            margin-right: 1rem;
            font-size: 12px;
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
@media (max-width: 960px) {
  .container {
    .list {
      width: 90%;
    }
  }
}
@media (max-width: 660px) {
  .container {
    .list {
      .item {
        margin: 0.5rem auto;
      }
    }
  }
}
</style>
