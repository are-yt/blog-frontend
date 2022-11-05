<template>
  <div class="cate">
    <PageTop
      bg="https://img1.baidu.com/it/u=273301481,339367011&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500"
      title="分类"
    />
    <Transition name="page-content" appear>
      <div class="container">
        <Main />
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import PageTop from '@/components/common/PageTop.vue'
import Main from './cpns/Main.vue'
</script>

<style scoped lang="less">
.container {
  background: var(--main-background-color);
  min-height: var(--container-height);
  padding: 1rem 0;
}
</style>
