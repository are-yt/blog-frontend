<template>
  <div class="tag">
    <PageTop
      title="标签"
      bg="https://img2.baidu.com/it/u=2142303490,3829625758&fm=253&fmt=auto&app=138&f=JPEG?w=576&h=360"
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
  padding: 2rem 0;
  min-height: var(--container-height);
  background: var(--main-background-color);
}
</style>
