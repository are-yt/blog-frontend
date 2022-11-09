<template>
  <div class="barrage-item" :style="{ background: props.bg }">
    <img v-if="item.avatar" :src="item.avatar" />
    <img v-else src="~@/assets/imgs/avatar.svg" />
    <span>{{ props.item.name }}: </span>
    <span>{{ props.item.content }}</span>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  item: any
  w: string
  bg: string
}>()
</script>

<style scoped lang="less">
.barrage-item {
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: absolute;
  border-radius: 20px;
  color: #fff;
  background: #00000050;
  right: 0;
  padding: 0.5rem 1rem;
  top: v-bind('props.item.top');
  animation: barrage v-bind('props.item.speed') linear;
  transform: translateX(100%);
  white-space: nowrap;
  img {
    width: 25px;
    height: 25px;
    border-radius: 50%;
  }
  @keyframes barrage {
    0% {
      transform: translateX(100%);
    }
    100% {
      transform: translateX(v-bind('props.w'));
    }
  }
}
</style>
