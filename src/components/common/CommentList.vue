<template>
  <div class="comment-list" @click="hideComment">
    <div class="title">{{ total }} 个顶层评论</div>
    <div class="list">
      <template v-for="item in list" :key="item.commentId">
        <div class="item">
          <div class="top-comment">
            <img v-if="item.avatar" :src="item.avatar" />
            <img v-else src="~@/assets/imgs/avatar.svg" />
            <div class="info">
              <div class="name">{{ item.name }}</div>
              <div class="time">{{ item.createAt }}</div>
              <div v-html="item.content"></div>
            </div>
            <!-- 回复顶层评论，不保留reply_id，保留所属评论id即可 -->
            <div class="right" @click.stop="startReply(item.commentId)">
              回复
            </div>
          </div>
          <Comment
            v-if="item.commentId === parent_id && isReply && !reply_id"
            hide-title
            :placeholder="`回复@${item.name}`"
            @reply="reply"
            @click.stop="isReply = true"
          />
          <div v-if="item.children.length" class="children">
            <template
              v-for="(item2, index) in item.children"
              :key="item2.commentId"
            >
              <div v-if="index + 1 <= item.showCount" class="item2">
                <img v-if="item2.avatar" :src="item2.avatar" />
                <img v-else src="~@/assets/imgs/avatar.svg" />
                <div class="info">
                  <div class="name">{{ item2.name }}</div>
                  <div class="time">{{ item2.createAt }}</div>
                  <div v-html="item2.reply"></div>
                  <div class="content">
                    <span>
                      {{ findReplyName(item.commentId, item2.reply_id) }}
                    </span>
                    <span v-html="item2.content"></span>
                  </div>
                </div>
                <!-- 回复子评论，保留所属评论id和回复评论id -->
                <div
                  class="right"
                  @click.stop="startReply(item.commentId, item2.commentId)"
                >
                  回复
                </div>
              </div>
              <Comment
                v-if="item2.commentId === reply_id && isReply"
                hide-title
                :placeholder="`回复@${item2.name}`"
                @reply="reply"
                @click.stop="isReply = true"
              />
            </template>
            <div
              v-if="item.showCount < item.children.length"
              class="show-more"
              @click="showMore(item.commentId)"
            >
              共{{ item.children.length }},点击查看更多
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import Comment from './Comment.vue'
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useAccount } from '@/store'
import { request } from '@/request'
const reply_id = ref(0)
const parent_id = ref(0)
const accountStore = useAccount()
const isReply = ref(false)
const props = defineProps<{
  total: number
  list: any[]
  url: string
  articleId?: string
}>()
const emits = defineEmits<{
  (
    e: 'pushComment',
    parent_id: number,
    reply_id: number,
    content: string,
    id: number
  ): void
  (e: 'showMore', commentId: number): void
}>()
const findReplyName = (comment_id: number, reply_id: number) => {
  const index = props.list.findIndex(item => item.commentId === comment_id)
  if (props.list[index].children.length === 0) {
    return ''
  }
  const index2 = props.list[index].children.findIndex(
    (item: any) => item.commentId === reply_id
  )
  return index2 >= 0
    ? '回复@' + props.list[index].children[index2].name + ': '
    : ''
}
const startReply = (parentId: number, replyId = 0) => {
  parent_id.value = parentId
  reply_id.value = replyId
  isReply.value = true
}
const hideComment = () => {
  parent_id.value = 0
  reply_id.value = 0
  isReply.value = false
}
const reply = (htmlContent: string) => {
  if (accountStore.account.id === 0) {
    return ElMessage.warning({ message: '请先登录' })
  }
  request
    .request({
      url: props.url,
      method: 'POST',
      data: {
        parent_id: parent_id.value || undefined,
        reply_id: reply_id.value || undefined,
        user_id: accountStore.account.id,
        content: htmlContent,
        article_id: props.articleId ? props.articleId : null
      }
    })
    .then(res => {
      if (res.data.errorCode) {
        // 评论失败
        return ElMessage.warning({ message: res.data.message })
      }
      // 评论成功
      emits(
        'pushComment',
        parent_id.value,
        reply_id.value,
        htmlContent,
        res.data.id
      )
      ElMessage.success({ message: '评论成功' })
      parent_id.value = 0
      reply_id.value = 0
    })
}
// 展示更多子评论
const showMore = (commentId: number) => {
  emits('showMore', commentId)
}
</script>

<style scoped lang="less">
.comment-list {
  .title {
    font-weight: bold;
    font-size: 18px;
  }
  .list {
    margin: 1rem 0;
    .item {
      .top-comment {
        display: flex;
        justify-content: space-between;
        font-size: 14px;
        margin-bottom: 1rem;
        img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }
        .info {
          flex: 0.98;
          .time {
            margin: 1rem 0;
            font-size: 12px;
            color: #999;
          }
        }
        .right {
          color: #999;
          cursor: pointer;
          &:hover {
            color: #90d7ec;
          }
        }
      }
      .children {
        padding-left: 2rem;
        .item2 {
          display: flex;
          justify-content: space-between;
          font-size: 14px;
          margin: 2rem 0 1rem 0;
          img {
            width: 40px;
            height: 40px;
            border-radius: 50%;
          }
          .info {
            flex: 0.98;
            .time {
              color: #999;
              font-size: 12px;
              margin: 0.5rem 0;
            }
          }
          .right {
            color: #999;
            cursor: pointer;
            &:hover {
              color: #90d7ec;
            }
          }
        }
        .show-more {
          color: #90d7ec;
          font-size: 12px;
          cursor: pointer;
          margin: 1rem;
        }
      }
    }
  }
}
</style>
