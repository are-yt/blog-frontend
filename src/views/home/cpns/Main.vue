<template>
  <div class="main">
    <div class="content">
      <div class="left">
        <!-- 说说通知栏 -->
        <div class="moments" @click="moment">
          <img src="~@/assets/imgs/liuyan.svg" />
          <Transition mode="out-in">
            <span :key="listIndex" v-html="list[listIndex]"></span>
          </Transition>
          <img src="~@/assets/imgs/more.svg" />
        </div>
        <!-- 帖子列表 -->
        <div class="blog-list">
          <template v-for="(item, index) in articleList" :key="item.articleId">
            <BlogItem :item="item" :index="index" @click="articleDetail(item.articleId)" />
          </template>
        </div>
      </div>
      <div class="right">
        <div class="info">
          <img class="avatar" :src="adminStore.adminInfo.avatar" />
          <div class="nickname">{{ adminStore.adminInfo.nickname }}</div>
          <div class="join">
            <i class="iconfont icon-biaoqian_o"></i>
            <span @click="joinBookSign">加入书签</span>
            <div></div>
          </div>
          <div class="data">
            <div class="item">
              <div>文章</div>
              <span>{{ adminStore.adminInfo.articleTotal }}</span>
            </div>
            <div class="item">
              <div>标签</div>
              <span>{{ adminStore.adminInfo.tagsTotal }}</span>
            </div>
            <div class="item">
              <div>分类</div>
              <span>{{ adminStore.adminInfo.cateTotal }}</span>
            </div>
          </div>
        </div>
        <div class="notice">
          <img src="~@/assets/imgs/notice.svg" />
          <div class="content">
            <span>公告</span>
            <div>{{ notice }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, nextTick, effectScope } from 'vue'
import { request } from '@/request'
import { useAdmin } from '@/store'
import { useScroll } from '@/tools'
import { useRouter } from 'vue-router'
import { ElMessage, ElNotification } from 'element-plus'
import BlogItem from '@/components/common/BlogItem.vue'
const router = useRouter()
const y = useScroll().y
const adminStore = useAdmin()
const list = ref<string[]>([])
const listIndex = ref(0)
const notice = ref('')
const pageSize = ref(3)
const pageIndex = ref(1)
const articleList = ref<any>([])
const articleTotal = ref(0)
let scrollHeight = 0
// 请求说说列表
const getList = () => {
  request
    .request({
      url: '/moment/list/0/3',
      method: 'GET'
    })
    .then(res => {
      res.data.data.forEach((item: any) => {
        list.value.push(item.content)
      })
      // 开启说说通知栏循环
      setInterval(() => {
        if (listIndex.value === 2) {
          listIndex.value = 0
        } else {
          listIndex.value++
        }
      }, 5000)
    })
}
getList()
// 请求公告信息
request
  .request({
    url: '/basic',
    method: 'GET'
  })
  .then(res => {
    notice.value = res.data.data.notice
  })
// 请求帖子列表
const getArticleList = () => {
  request
    .request({
      url: `/article/list/${pageIndex.value - 1}/${pageSize.value}`,
      method: 'GET'
    })
    .then(async res => {
      articleList.value.push(...res.data.data)
      articleTotal.value = res.data.total
      await nextTick()
      scrollHeight =
        (document.documentElement.scrollHeight || document.body.scrollHeight) -
        (document.documentElement.clientHeight || document.body.clientHeight)
    })
}
getArticleList()
onMounted(() => {
  scrollHeight =
    (document.documentElement.scrollHeight || document.body.scrollHeight) -
    (document.documentElement.clientHeight || document.body.clientHeight)
  const scope = effectScope()
  scope.run(() => {
    watch(y, (val: number, oldval: number) => {
      if (
        oldval - val < 0 &&
        scrollHeight - val <= 0 &&
        articleTotal.value > articleList.value.length
      ) {
        // 当向下滑动且距离页面底部50px距离时，开始加载下一页帖子分页数据
        pageIndex.value += 1
        getArticleList()
      }
      if (
        oldval - val < 0 &&
        scrollHeight - val <= 0 &&
        articleTotal.value === articleList.value.length
      ) {
        // 已加载全部
        ElMessage.success({ message: '已加载全部', duration: 2000 })
        scope.stop()
      }
    })
  })
})
// 加入书签
const joinBookSign = () => {
  ElNotification.success({
    title: '提示',
    message: 'CTRL + D加入书签'
  })
}
// 前往说说页面
const moment = () => {
  router.push('/moment')
}
// 前往文章详情
const articleDetail = (id: number) => {
  router.push({ name: 'articleDetail', params: { id } })
}
</script>

<style scoped lang="less">
.v-enter-from {
  transform: translateY(200%);
}
.v-leave-to {
  transform: translateY(-200%);
}
.v-enter-active,
.v-leave-active {
  transition: all 1s;
}
.main {
  padding: 20px;
  background: var(--main-background-color);
  display: flex;
  justify-content: space-between;
  .content {
    width: 80%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    position: relative;
    .left {
      width: 75%;
      .moments {
        padding: 10px;
        border-radius: 10px;
        background: #fff;
        display: flex;
        justify-content: space-between;
        align-items: center;
        overflow: hidden;
        img {
          width: 20px;
          height: 20px;
          &:nth-child(3) {
            width: 15px;
            height: 15px;
            margin-right: 30px;
            animation: check 2s infinite;
            cursor: pointer;
            @keyframes check {
              0% {
                transform: translateX(0);
                opacity: 1;
              }
              50% {
                transform: translateX(30px);
                opacity: 0.3;
              }
              100% {
                transform: translateX(0);
                opacity: 1;
              }
            }
          }
        }
        span {
          flex: 0.9;
          text-align: center;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          cursor: pointer;
          &:hover {
            color: #90d7ec;
          }
        }
      }
    }
    .right {
      flex: 0.96;
      height: 300px;
      position: sticky;
      top: 0;
      right: 0;
      .info {
        background: #fff;
        border-radius: 10px;
        padding: 2rem 0;
        text-align: center;
        .avatar {
          display: block;
          width: 80px;
          height: 80px;
          margin: 0 auto;
          border-radius: 50%;
        }
        .nickname {
          margin-top: 1.5rem;
          font-size: 20px;
          font-weight: bold;
        }
        .join {
          width: 80%;
          margin: 1.5rem auto;
          background: #90d7ec;
          padding: 0.5rem 0;
          color: #fff;
          cursor: pointer;
          position: relative;
          &:hover div {
            display: block;
          }
          i.iconfont {
            font-size: 20px;
            margin-right: 10px;
            position: relative;
            top: 3px;
            z-index: 1;
          }
          span {
            position: relative;
            z-index: 1;
          }
          div {
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            width: 0;
            animation: layer 1s ease forwards;
            display: none;
            background: #bac8ff;
            @keyframes layer {
              0% {
                width: 0;
              }
              80% {
                width: 100%;
              }
              90% {
                width: 90%;
              }
              100% {
                width: 100%;
              }
            }
          }
        }
        .data {
          width: 80%;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          text-align: center;
          .item {
            div {
              margin: 0.5rem 0;
            }
            cursor: pointer;
          }
        }
      }
      .notice {
        padding: 1rem;
        background: #fff;
        border-radius: 10px;
        margin-top: 1rem;
        display: flex;
        img {
          width: 20px;
          height: 20px;
          margin-right: 0.5rem;
        }
        .content {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          span {
            font-weight: bold;
          }
          div {
            font-size: 14px;
            margin-top: 10px;
          }
        }
      }
    }
  }
}
</style>

<style scoped lang="less">
@media (max-width: 1260px) {
  .content {
    width: 90% !important;
    .left {
      width: 70% !important;
    }
  }
}
@media (max-width: 980px) {
  .right {
    display: none !important;
  }
  .content {
    width: 95% !important;
    .left {
      width: inherit !important;
      margin: 0 auto !important;
    }
  }
}
@media (max-width: 400px) {
  .content {
    width: 99% !important;
  }
}
</style>
