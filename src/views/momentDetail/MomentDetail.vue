<template>
  <div class="moment-detail">
    <PageTop
      title="说说"
      bg="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fblog%2F202008%2F27%2F20200827175725_6a381.thumb.1000_0.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1669695229&t=8c6380784ececf8dc37cd5f0d7363659"
    />
    <Transition name="page-content" appear>
      <div class="container">
        <div class="content">
          <div v-if="Object.keys(detailInfo).length" class="moment">
            <img v-if="detailInfo.avatar" :src="detailInfo.avatar" />
            <img v-else src="~@/assets/imgs/avatar.svg" />
            <div class="info">
              <div>{{ detailInfo.nickname }}</div>
              <div>{{ detailInfo.createAt.replace('.000000', '') }}</div>
              <div v-html="detailInfo.content"></div>
              <div class="control">
                <div>
                  <i
                    class="iconfont icon-dianzan"
                    :style="{ color: islike ? '#90d7ec' : '#999' }"
                    @click="like"
                  ></i>
                  <span>{{ detailInfo.likecount }}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="comment-container">
            <Comment ref="comment" @reply="reply" />
          </div>
          <div class="comment-list">
            <CommentList
              :list="list"
              :url="`/moment/reply/${props.id}`"
              :total="total"
              @push-comment="pushComment"
            />
          </div>
          <ElButton
            v-if="total > list.length"
            type="primary"
            class="btn"
            @click="getMomentCommentList"
          >
            加载更多
          </ElButton>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import PageTop from '@/components/common/PageTop.vue'
import Comment from '@/components/common/Comment.vue'
import CommentList from '@/components/common/CommentList.vue'
import { ref } from 'vue'
import { request } from '@/request'
import { useAccount } from '@/store'
import { ElMessage } from 'element-plus'
const accountStore = useAccount()
const comment = ref<InstanceType<typeof Comment> | null>()
const props = defineProps<{
  id: string
  isLike: string
}>()
const islike = ref(props.isLike === 'true' ? true : false)
const detailInfo = ref<any>({})
const list = ref<any>([])
const total = ref(0)
let pageIndex = 0
let pageSize = 4
// 根据id查询对应说说的详情
const getMomentDetail = () => {
  request
    .request({
      url: `/moment/detail/${props.id}`,
      method: 'GET'
    })
    .then(res => {
      if (res.data.errorCode) {
        return
      }
      detailInfo.value = res.data.data
    })
}
getMomentDetail()
// 点赞操作
const like = () => {
  if (accountStore.account.id === 0) {
    return ElMessage.warning({ message: '需要先登录' })
  }
  request
    .request({
      url: `/moment/like/${accountStore.account.id}/${props.id}`,
      method: 'POST'
    })
    .then(res => {
      if (res.data.errorCode) {
        return ElMessage.warning({ message: res.data.message })
      }
      const { like } = res.data
      if (like) {
        ElMessage.success({ message: '点赞成功' })
        islike.value = true
        detailInfo.value.likecount++
      } else {
        ElMessage.success({ message: '点赞取消' })
        islike.value = false
        detailInfo.value.likecount--
      }
    })
}
// 根据说说id查询评论信息
const getMomentCommentList = () => {
  request
    .request({
      url: `/moment/comment/${props.id}/${pageIndex}/${pageSize}`,
      method: 'GET'
    })
    .then(res => {
      if (!res.data.errorCode) {
        res.data.list.forEach((item: any) => (item.showCount = 4))
        list.value.push(...res.data.list)
        total.value = res.data.total
        pageIndex++
        console.log(res)
      }
    })
}
getMomentCommentList()

// 发表顶层说说
const reply = (htmlContent: string) => {
  request
    .request({
      url: `/moment/reply/${props.id}`,
      method: 'POST',
      data: {
        parent_id: undefined,
        reply_id: undefined,
        user_id: accountStore.account.id,
        content: htmlContent
      }
    })
    .then(res => {
      if (res.data.errorCode) {
        // 评论失败
        return ElMessage.warning({ message: res.data.message })
      }
      // 评论成功
      ElMessage.success({ message: '评论成功' })
      comment.value?.resetContent()
      list.value.push({
        commentId: res.data.id,
        content: htmlContent,
        showCount: 4,
        name: accountStore.account.name,
        children: [],
        createAt: '刚刚',
        email: accountStore.account.email,
        avatar: accountStore.account.avatar
      })
    })
}
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
    avatar: accountStore.account.avatar,
    commentId: id,
    reply_id,
    content,
    createAt: '刚刚'
  })
}
</script>

<style scoped lang="less">
.container {
  padding: 1rem 0;
  background: var(--main-background-color);
  .content {
    padding: 1.5rem 1rem;
    width: 60%;
    margin: 0 auto;
    background: #fff;
    border-radius: 10px;
    .moment {
      display: flex;
      justify-content: space-around;
      padding: 1rem 0;
      box-shadow: 0 0 10px 1px #ccc;
      margin: 1rem auto;
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
          margin: 0.5rem 0;
        }
        .control {
          margin: 0.5rem 0;
          div > i.iconfont {
            font-size: 20px;
            position: relative;
            top: 2px;
            margin-right: 0.5rem;
            cursor: pointer;
          }
        }
      }
    }
    .btn {
      display: block;
      margin: 1rem auto;
    }
  }
}
</style>

<style scoped lang="less">
@media (max-width: 1260px) {
  .container {
    .content {
      width: 85%;
    }
  }
}
</style>
