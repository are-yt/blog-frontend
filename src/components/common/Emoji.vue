<template>
  <div class="emoji">
    <img
      v-for="(value, key) of EmojiList"
      :key="value"
      :src="value"
      @click="addEmoji(value, key)"
    />
  </div>
</template>

<script setup lang="ts">
// emoji图片列表
import EmojiList from '@/assets/js/emoji'
const emits = defineEmits<{
  (e: 'addEmoji', url: string, key: string): void
}>()
const addEmoji = (value: string, key: string) => {
  emits('addEmoji', value, key)
}
</script>

<style scoped lang="less">
.emoji {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  padding: 0.5rem;
  margin: 0.5rem 0;
  img {
    width: 25px;
    height: 25px;
    margin: 0.5rem 0.5rem 0 0;
    cursor: pointer;
  }
}
</style>
