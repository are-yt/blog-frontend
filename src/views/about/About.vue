<template>
  <div class="about">
    <PageTop
      title="关于我"
      bg="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F201606%2F24%2F20160624202121_dvArN.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1669602695&t=ac33ed871c896e58a0de0c234566f414"
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
