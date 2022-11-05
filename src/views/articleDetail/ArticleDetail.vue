<template>
  <div class="article-detail">
    <div v-if="article.content" class="content">
      <div class="uploader">
        <img v-if="article.avatar" :src="article.avatar" />
        <img v-else src="~@/assets/imgs/avatar.svg" />
        <span>{{ article.nickname }}</span>
      </div>
      <div class="time">
        <span>最近一次修改: {{ article.updateAt }}</span>
      </div>
      <div class="info">
        <span class="cate">分类: {{ article.cateName }}</span>
        <span>
          <span>标签: </span>
          <span v-for="item in article.tags" :key="item" class="tag">
            {{ item }}
          </span>
        </span>
      </div>
      <div class="title">{{ article.title }}</div>
      <div :class="$style['article-img']" v-html="article.content"></div>
    </div>
    <div class="comment-wrapper">
      <Comment ref="comment" :show-border="false" @reply="reply" />
    </div>
    <div class="list-wrapper">
      <CommentList
        :list="list"
        :total="total"
        :article-id="props.id"
        url="/comment/article/reply"
        @push-comment="pushComment"
        @show-more="showMore"
      />
      <ElButton
        v-if="total > list.length"
        type="primary"
        class="btn"
        @click="getCommentList"
      >
        加载更多
      </ElButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { request } from '@/request'
import { ElMessage } from 'element-plus'
import { ref, watch } from 'vue'
import { useAccount } from '@/store'
import Comment from '@/components/common/Comment.vue'
import CommentList from '@/components/common/CommentList.vue'
const accountStore = useAccount()
const article = ref({
  nickname: '',
  title: '',
  description: '',
  content: '',
  updateAt: '',
  avatar: '',
  cateName: '',
  tags: []
})
const list = ref<any>([])
const total = ref(0)
let pageIndex = 0
let pageSize = 3
const comment = ref<InstanceType<typeof Comment>>()
const props = defineProps<{
  id: string
}>()
// 由于文章详情页存在复用情况(只是页面参数改变则会造成复用)，这里需要监听一下页面id参数的改变
// watch侦听器是懒执行的，所以无论是复用还是首次进入都不会造成二次重复加载
watch(
  () => props.id,
  () => {
    pageIndex = 0
    list.value = []
    getArticleDetailById()
    getCommentList()
  }
)
// 根据文章id获取文章详情
const getArticleDetailById = () => {
  request
    .request({
      url: '/article/detail/' + props.id,
      method: 'GET'
    })
    .then(res => {
      if (res.data.errorCode) {
        // 获取文章详情失败
        return ElMessage.warning({ message: res.data.message })
      }
      // 获取成功
      article.value = res.data.data
    })
}
getArticleDetailById()
// 评论
const reply = (htmlContent: string) => {
  // 这是发布该文章的顶级评论
  request
    .request({
      url: '/comment/article/reply',
      method: 'POST',
      data: {
        user_id: accountStore.account.id,
        article_id: Number(props.id),
        content: htmlContent
      }
    })
    .then(res => {
      if (res.data.errorCode) {
        // 评论失败
        return ElMessage.warning({ message: res.data.message })
      }
      // 评论成功
      ElMessage.success({ message: '评论成功~' })
      comment.value?.resetContent()
      list.value.unshift({
        name: accountStore.account.name,
        email: accountStore.account.email,
        createAt: '刚刚',
        content: htmlContent,
        avatar: accountStore.account.avatar,
        children: [],
        commentId: res.data.id,
        showCount: 4
      })
    })
}
// 回复成功的钩子-添加进评论列表
const pushComment = (
  parent_id: number,
  reply_id: number,
  content: string,
  id: number
) => {
  const index = list.value.findIndex(
    (item: any) => item.commentId === parent_id
  )
  list.value[index].children.push({
    name: accountStore.account.name,
    email: accountStore.account.email,
    commentId: id,
    reply_id,
    content,
    avatar: accountStore.account.avatar,
    createAt: '刚刚'
  })
}
// 查看更多子评论
const showMore = (commentId: number) => {
  const index = list.value.findIndex(
    (item: any) => item.commentId === commentId
  )
  list.value[index].showCount += 4
}
// 获取当前文章评论
const getCommentList = () => {
  request
    .request({
      url: `/comment/article/list/${props.id}/${pageIndex}/${pageSize}`,
      method: 'GET'
    })
    .then(res => {
      list.value.push(...res.data.data)
      total.value = res.data.total
      list.value.forEach((item: any) => {
        item.showCount = 4
      })
      pageIndex++
    })
}
getCommentList()
</script>

<style module lang="less">
.article-img {
  img {
    display: block;
    width: 80%;
    margin: 0 auto;
  }
}
</style>

<style scoped lang="less">
.article-detail {
  width: 100%;
  min-height: 100vh;
  background: var(--main-background-color);
  padding: 55px 0;
  .content {
    width: 70%;
    margin: 0 auto;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #f7f7f7;
    border-radius: 5px;
    .uploader {
      display: flex;
      align-items: center;
      img {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        margin-right: 1rem;
      }
    }
    .time {
      color: #999;
      margin: 1rem 0;
    }
    .info {
      color: #999;
      .cate {
        margin-right: 1rem;
      }
      .tag {
        margin-right: 1rem;
      }
    }
    .title {
      margin: 3rem 0 1rem 0;
      font-size: 1.5rem;
      font-weight: bold;
    }
  }
  .comment-wrapper {
    width: 70%;
    padding: 1rem;
    margin: 2rem auto;
    background: #fff;
    border-radius: 10px;
    transition: all 0.5s;
    box-sizing: border-box;
    &:hover {
      box-shadow: 0 0 10px 2px #ccc;
      transform: translateY(-10px);
    }
  }
  .list-wrapper {
    width: 70%;
    padding: 1rem;
    background: #fff;
    border-radius: 10px;
    margin: 0 auto;
    transition: all 0.5s;
    &:hover {
      box-shadow: 0 0 10px 2px #ccc;
      transform: translateY(-10px);
    }
    .btn {
      display: block;
      margin: 1rem auto;
    }
  }
}
</style>
