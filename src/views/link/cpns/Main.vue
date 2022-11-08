<template>
  <div class="main">
    <List />
    <div class="join">
      <div class="title">
        <img src="~@/assets/imgs/join.svg" />
        <span>添加友链</span>
      </div>
      <div class="desc1">
        <p>名称: cy丶个人博客</p>
        <p>签名/介绍: 勤能补拙是良训、一份辛苦一份才</p>
        <p>头像: http://xxxxxxx</p>
      </div>
      <p>需要上友链列表请在下方留言哦</p>
      <div class="desc2">
        <p>友链展示需要，友链信息需要包括：头像、名称、介绍/签名、地址</p>
      </div>
    </div>
    <Comment ref="comment" @reply="reply" />
    <CommentList
      :total="total"
      :list="list"
      url="/comment/link/reply"
      @push-comment="pushComment"
      @show-more="showMore"
    />
    <ElButton
      v-if="total > list.length"
      class="btn"
      type="primary"
      @click="getCommentList"
    >
      加载更多
    </ElButton>
  </div>
</template>

<script setup lang="ts">
import List from './List.vue'
import Comment from '@/components/common/Comment.vue'
import CommentList from '@/components/common/CommentList.vue'
import { request } from '@/request'
import { useAccount } from '@/store'
import { ElMessage } from 'element-plus'
import { ref } from 'vue'
const comment = ref<InstanceType<typeof Comment>>()
const accountStore = useAccount()
const list = ref<any>([])
const total = ref(0)
let pageSize = 3
let pageIndex = 0
const reply = (htmlContent: string) => {
  if (accountStore.account.id === 0) {
    return ElMessage.warning({ message: '请先登陆后发表评论' })
  }
  // 发表
  request
    .request({
      url: '/comment/link/reply',
      method: 'POST',
      data: {
        reply_id: undefined,
        parent_id: undefined,
        user_id: accountStore.account.id,
        content: htmlContent
      }
    })
    .then(res => {
      if (res.data.errorCode) {
        // 发表失败
        return ElMessage.error({ message: res.data.message })
      }
      // 发表成功
      ElMessage.success({ message: '发表成功' })
      comment.value?.resetContent()
      list.value.unshift({
        name: accountStore.account.name,
        email: accountStore.account.email,
        createAt: '刚刚',
        commentId: res.data.id,
        children: [],
        content: htmlContent,
        avatar: accountStore.account.avatar,
        showCount: 4
      })
    })
}
// 子评论
const pushComment = (
  parent_id: number,
  reply_id: number,
  content: string,
  commentId: number
) => {
  const index = list.value.findIndex(
    (item: any) => item.commentId === parent_id
  )
  console.log(accountStore.account.avatar)
  list.value[index].children.push({
    commentId,
    name: accountStore.account.name,
    email: accountStore.account.email,
    avatar: accountStore.account.avatar,
    reply_id,
    content,
    createAt: '刚刚'
  })
}
// 获取评论列表
const getCommentList = () => {
  request
    .request({
      url: `/comment/link/list/${pageIndex}/${pageSize}`,
      method: 'GET'
    })
    .then(res => {
      res.data.data.forEach((item: any) => (item['showCount'] = 4))
      list.value.push(...res.data.data)
      total.value = res.data.total
      pageIndex += 1
    })
}
getCommentList()
// 展示更多子评论
const showMore = (commentId: number) => {
  const index = list.value.findIndex(
    (item: any) => item.commentId === commentId
  )
  list.value[index].showCount += 4
}
</script>

<style scoped lang="less">
.main {
  width: 60%;
  margin: 0 auto;
  background: #fff;
  border-radius: 10px;
  padding: 1rem;
  .join {
    margin: 2rem 0;
    .title {
      img {
        width: 20px;
        height: 20px;
        margin-right: 0.5rem;
      }
      span {
        font-size: 20px;
        font-weight: bold;
        position: relative;
        top: 3px;
      }
    }
    .desc1,
    .desc2 {
      background: #90d7ec80;
      border-radius: 10px;
      border-left: 4px solid #90d7ec;
      padding: 0.5rem 0 0.5rem 1rem;
      margin: 1rem 0;
    }
  }
  .btn {
    display: block;
    margin: 1rem auto;
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
