<template>
  <div class="link">
    <PageTop
      title="友情链接"
      bg="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202005%2F13%2F20200513183619_xslhq.png&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1669432061&t=329c3fdec27ef1914c1cc4533c6b956c"
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
  background: var(--main-background-color);
}
</style>
