<template>
  <div class="item">
    <div class="border-bottom"></div>
    <i :class="props.iconStr" :style="{ fontSize: props.fontSize + 'px' }"></i>
    <div class="name">{{ props.name }}</div>
    <i v-if="select" class="iconfont icon-select"></i>
    <div v-if="select" class="select">
      <slot name="select"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    iconStr: string
    name: string
    hoverColor?: string
    select?: boolean
    fontSize?: number
  }>(),
  {
    hoverColor: '',
    select: false,
    fontSize: 16
  }
)
</script>

<style scoped lang="less">
.item {
  margin-left: 1rem;
  display: flex;
  align-items: center;
  font-size: 16px;
  cursor: pointer;
  position: relative;
  &:hover {
    color: v-bind('props.hoverColor');
  }
  .border-bottom {
    position: absolute;
    left: 0;
    bottom: -5px;
    width: 0;
    height: 1;
    border-bottom: 2px solid var(--color-blue-main);
    transition: all 0.5s;
  }
  &:hover .border-bottom {
    width: 100%;
  }
  i {
    font-size: 1.2rem;
  }
  .name {
    margin-left: 5px;
  }
  .select {
    width: 100px;
    text-align: center;
    position: absolute;
    left: -10px;
    top: 1rem;
    color: #000;
    padding-top: 1rem;
    display: none;
    font-size: 14px;
    .item {
      padding: 0.5rem;
      margin: 0;
      display: flex;
      justify-content: space-around;
      align-items: center;
      font-size: 14px;
      background: #fff;
      i {
        font-size: 14px;
      }
      &:hover {
        background: #90d7ec;
        color: #000;
      }
      .border-bottom {
        border: none;
      }
    }
  }
  &:hover {
    .select {
      display: block;
    }
  }
}
</style>
