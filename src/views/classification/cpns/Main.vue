<template>
  <div class="main">
    <div class="timeline">
      <template v-for="(item, index) in list" :key="index">
        <span class="time">{{ item.updateAt }}</span>
        <div
          v-for="item2 in item.list"
          :key="item2.id"
          class="item"
          @click="detail(item2)"
        >
          <p class="title">{{ item2.title }}</p>
          <p class="desc">{{ item2.desc }}</p>
          <u-divider position="left">
            {{ item2.updateAt.replace('.000000', '') }}
          </u-divider>
        </div>
      </template>
    </div>
    <div class="pagination">
      <el-pagination
        layout="prev, pager, next"
        :page-size="pageSize"
        :total="total"
        @current-change="pageChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { request } from '@/request'
import { ElMessage } from 'element-plus'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const list = ref<any>([])
const pageSize = ref(2)
const total = ref(0)
const pageIndex = ref(0)
// 请求归档分页数据
const getClassificationList = () => {
  request
    .request({
      url: `/article/classification/${pageIndex.value}/${pageSize.value}`,
      method: 'GET'
    })
    .then(res => {
      if (res.data.errorCode) {
        return ElMessage.warning({ message: res.data.message })
      }
      total.value = res.data.total
      list.value = res.data.list
    })
}
getClassificationList()
const pageChange = (index: number) => {
  pageIndex.value = index - 1
  getClassificationList()
}
const detail = (item: any) => {
  router.push({ name: 'articleDetail', params: { id: item.id } })
}
</script>

<style scoped lang="less">
.main {
  width: 60%;
  margin: 0 auto;
  background: #fff;
  border-radius: 10px;
  padding: 2rem 1rem;
  .timeline {
    .time {
      font-weight: bold;
      color: #90d7ec;
    }
    .item {
      margin: 1rem 0;
      padding: 1rem;
      background: #90d7ec;
      cursor: pointer;
      .title {
        font-weight: bold;
      }
      .desc {
        font-size: 12px;
        color: #999;
      }
    }
  }
  .pagination {
    padding: 40px 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
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
