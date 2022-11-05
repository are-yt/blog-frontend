<template>
  <div class="classification">
    <PageTop
      bg="https://img1.baidu.com/it/u=3997907910,2929140655&fm=253&fmt=auto&app=120&f=JPEG?w=1296&h=800"
      title="归档"
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
  padding: 1rem 0;
  min-height: var(--container-height);
  background: var(--main-background-color);
}
</style>
