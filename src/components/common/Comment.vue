<template>
  <div class="comment">
    <div v-if="!props.hideTitle" class="title">
      <img src="~@/assets/imgs/comments.svg" />
      <span>评论</span>
    </div>
    <div
      class="container"
      :style="{ border: props.showBorder ? '1px solid #999' : '' }"
    >
      <img src="~@/assets/imgs/avatar.svg" />
      <div class="input-box">
        <textarea v-model="content" :placeholder="props.placeholder"></textarea>
        <div class="control">
          <img src="~@/assets/imgs/emoji.svg" @click="showEmoji = !showEmoji" />
          <button @click="reply()">发表</button>
        </div>
        <Emoji v-if="showEmoji" @add-emoji="addEmoji" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Emoji from './Emoji.vue'
import emojiList from '@/assets/js/emoji'
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
const props = withDefaults(
  defineProps<{
    hideTitle?: boolean
    placeholder?: string
    showBorder?: boolean
  }>(),
  {
    hideTitle: false,
    placeholder: '说点什么吗~',
    showBorder: true
  }
)
const emits = defineEmits<{
  (e: 'reply', content: string): void
}>()
const content = ref('')
const showEmoji = ref(false)
const addEmoji = (url: string, key: string) => {
  content.value += key
}
const reply = () => {
  if (!content.value.trim().length) {
    return ElMessage.warning({ message: '缺少评论内容~' })
  }
  let _content = content.value
  for (let item in emojiList) {
    // 将发表内容中的emoji字符串替换为html文本
    if (_content.indexOf(item) >= 0) {
      // 有该表情占位符，替换为html文本
      let _item: string | string[] = item
      _item = item.split('')
      _item.unshift('\\')
      _item.splice(_item.length - 1, 0, '\\')
      _item = _item.join('')
      const reg = eval('/' + _item + '/g')
      _content = _content.replace(
        reg,
        `<img src="${
          (emojiList as any)[item]
        }" style="width: 20px; height: 20px" />`
      )
    }
  }
  // 最后保存处理后的content
  emits('reply', _content)
}
const resetContent = () => {
  content.value = ''
}
defineExpose({ resetContent })
</script>

<style scoped lang="less">
.comment {
  .title {
    img {
      width: 20px;
      height: 20px;
      margin-right: 0.5rem;
    }
    span {
      font-size: 18px;
      font-weight: bold;
      position: relative;
      top: 3px;
    }
  }
  .container {
    margin: 1rem 0;
    display: flex;
    justify-content: space-between;
    padding: 0.5rem;
    border-radius: 5px;
    img {
      width: 40px;
      height: 40px;
    }
    .input-box {
      flex: 0.98;
      position: relative;
      textarea {
        resize: none;
        width: 100%;
        height: 180px;
        border: none;
        &:focus {
          outline: none;
          outline-offset: 0;
        }
      }
      .control {
        display: flex;
        align-items: center;
        justify-content: space-between;
        img {
          width: 25px;
          height: 25px;
          cursor: pointer;
        }
        button {
          border: none;
          background: #90d7ec;
          color: #fff;
          padding: 3px 0.5rem;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
