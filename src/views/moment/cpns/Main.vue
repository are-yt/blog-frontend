<template>
  <div class="main">
    <div v-if="list.length" class="list">
      <template v-for="item in list" :key="item.momentId">
        <div class="item" @click="detail(item.momentId)">
          <img v-if="item.avatar" :src="item.avatar" />
          <img v-else src="~@/assets/imgs/avatar.svg" />
          <div class="info">
            <div>{{ item.name }}</div>
            <div>{{ item.createAt.replace('.000000', '') }}</div>
            <div v-html="item.content"></div>
            <div class="control">
              <div>
                <i
                  class="iconfont icon-dianzan"
                  :style="{
                    color: userLikeList.includes(item.momentId)
                      ? '#90d7ec'
                      : '#999'
                  }"
                  @click.stop="like(item.momentId)"
                ></i>
                <span>{{ item.likecount }}</span>
              </div>
              <div>
                <i class="iconfont icon-duihuakuang"></i>
                <span>{{ item.replycount }}</span>
              </div>
            </div>
          </div>
        </div>
      </template>
      <ElButton
        v-if="list.length !== total"
        class="btn"
        type="primary"
        @click="loadmore"
      >
        加载更多
      </ElButton>
    </div>
    <div v-else class="no-list">没有获取到说说数据~</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { request } from '@/request'
import { useAccount } from '@/store'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
const accountStore = useAccount()
const router = useRouter()
let pageSize = 4
let pageIndex = 0
const list = ref<any>([])
const total = ref(0)
const userLikeList = ref<any>([])
// 获取说说分页列表
const getList = () => {
  request
    .request({
      url: `/moment/list/${pageIndex}/${pageSize}`,
      method: 'GET'
    })
    .then(res => {
      total.value = res.data.total
      list.value.push(...res.data.data)
    })
}
getList()
const loadmore = () => {
  pageIndex += 1
  getList()
}
// 点赞
const like = (momentId: number) => {
  if (accountStore.account.id === 0) {
    return ElMessage.warning({ message: '需要先登录~' })
  }
  request
    .request({
      url: `/moment/like/${accountStore.account.id}/${momentId}`,
      method: 'POST'
    })
    .then(res => {
      console.log(res)
      if (res.data.errorCode) {
        return ElMessage.warning({ message: res.data.message })
      }
      const { like } = res.data
      if (like) {
        ElMessage.success({ message: '点赞成功' })
        const index = list.value.findIndex(
          (item: any) => item.momentId === momentId
        )
        list.value[index].likecount++
        userLikeList.value.push(momentId)
      } else {
        ElMessage.success({ message: '取消点赞' })
        const index = list.value.findIndex(
          (item: any) => item.momentId === momentId
        )
        list.value[index].likecount--
        const index2 = userLikeList.value.findIndex(
          (item: any) => item === momentId
        )
        userLikeList.value.splice(index2, 1)
      }
    })
}
// 获取用户点赞过的帖子
const getUserLikeList = () => {
  request
    .request({
      url: `/moment/like/list/${accountStore.account.id}`,
      method: 'GET'
    })
    .then(res => {
      if (res.data.errorCode) {
        return false
      }
      userLikeList.value = res.data.list
    })
}
getUserLikeList()
const detail = (momentId: number) => {
  router.push({ name: 'momentDetail', params: { id: momentId, isLike: userLikeList.value.includes(momentId) } })
}
</script>

<style scoped lang="less">
.main {
  width: 60%;
  margin: 0 auto;
  padding: 1rem;
  background: #fff;
  border-radius: 10px;
  .list {
    width: 90%;
    margin: 1rem auto;
    .item {
      padding: 0.5rem 0;
      display: flex;
      justify-content: space-around;
      border-radius: 10px;
      box-shadow: 0 0 10px 1px #ccc;
      margin: 2rem 0;
      cursor: pointer;
      transition: all 0.5s;
      &:hover {
        box-shadow: 0 0 20px 2px #ccc;
        transform: translateY(-10px);
      }
      img {
        width: 40px;
        height: 40px;
        border-radius: 40px;
      }
      .info {
        flex: 0.96;
        div:nth-child(2) {
          font-size: 12px;
          color: #999;
          margin: 1rem 0;
        }
        .control {
          display: flex;
          align-items: center;
          div {
            font-size: 14px;
            color: #00000080;
            cursor: pointer;
            i.iconfont {
              font-size: 20px;
              position: relative;
              top: 2px;
            }
            span {
              margin-left: 0.5rem;
            }
          }
          div:nth-child(1) {
            margin-right: 1rem;
          }
        }
      }
    }
    .pagination {
      margin: 1rem 0;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 1rem 0;
    }
  }
  .no-list {
    text-align: center;
  }
}
</style>

<style scoped lang="less">
@media (max-width: 1260px) {
  .main {
    width: 85%;
  }
}
</style>
