<template>
  <Transition name="pagetop" appear>
    <div
      class="page-top"
      :style="{
        background: `url(${props.bg}) no-repeat`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }"
    >
      <span class="title" :style="{ fontSize: props.fontSize }">
        {{ props.title }}
      </span>
    </div>
  </Transition>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    bg: string
    title: string
    fontSize?: string
  }>(),
  {
    fontSize: '2.5rem'
  }
)
</script>

<style scoped lang="less">
.pagetop-enter-from {
  opacity: 0;
  transform: translateY(-20px);
}
.pagetop-enter-active {
  transition: all 0.5s;
}
.pagetop-enter-from .title {
  opacity: 0;
  transform: scale(0.5);
}
.pagetop-enter-active .title {
  transition: all 0.5s;
}
.page-top {
  height: var(--page-top-height);
  background: #000;
  display: flex;
  justify-content: space-around;
  align-items: center;
  span {
    font-size: 2.5rem;
    color: #fff;
    letter-spacing: 3px;
    margin-top: 1rem;
    font-weight: bold;
  }
}
</style>
