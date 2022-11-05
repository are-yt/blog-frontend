<template>
  <div class="footer">
    <div>邮箱: 2821458718@qq.com</div>
    <div>源码: https://github.com/are-yt/cy-blog</div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="less">
.footer {
  height: var(--footer-height);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  background: linear-gradient(-45deg, #ee7752, #ce3e75, #23a6d5, #23d5ab);
  background-size: 400% 400%;
  animation: togglebg 10s ease infinite;
  text-align: center;
  line-height: 2rem;
  color: #fff;
  position: relative;
  z-index: var(--footer-z-index);
  @keyframes togglebg {
    0% {
      background-position: 0 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0 50%;
    }
  }
}
</style>
